import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { DropzoneComponent, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { UploadService } from 'src/app/shared/upload.service';
import { environment } from 'src/environments/environment.prod';
import { Colors } from 'src/app/constants/colors.service';
import { PredictService } from 'src/app/shared/predict.service';
import { PredictResultService } from 'src/app/shared/predict-result.service';
import { PredictResult } from 'src/app/models/predictResult.model';
import { AuthService } from 'src/app/shared/auth.service';
import { PostService } from 'src/app/shared/post.service';
import { Post } from 'src/app/models/post.model';
import { UserRecordsService } from 'src/app/shared/user-records.service';

@Component({
  selector: 'app-predict',
  templateUrl: './predict.component.html',
})
export class PredictComponent implements OnInit {

  // References to the dropzone component
  @ViewChild(DropzoneComponent) componentRef: DropzoneComponent;
  dropzone: any;

  @Input() userAuthorized: firebase.User;

  /** Lifecycle hook that is called after a this component's view has been fully initialized */
  ngAfterViewInit() {
    // Get a reference ot the dropzone component
    this.dropzone = this.componentRef.directiveRef.dropzone();
  }

  constructor(
    private authService: AuthService,
    private uploadService: UploadService,
    private notifications: NotificationsService,
    private predictService: PredictService,
    private predictResultService: PredictResultService,
    private postService: PostService,
    private userRecordsService: UserRecordsService
  ) { }

  ngOnInit(): void {
  }

  predictImage: string = '';
  predictedResults = null;
  predictedLabel = ''
  isLoading = false
  barChartData = null
  predictResultID = ''
  predictResult = {
    userID: this.authService.user.uid,
    status: 'private',
  } as PredictResult

  recommentedPost = [] as Post[];

  //#region /** Configuration for dropzone: apiUrl, tempplate,... */

  // upload api url
  uploadApiUrl = `${environment.apiBackUrl}upload/image`;

  // preview image template upload
  previewTemplate = `
  <div class="dz-preview dz-file-preview mb-3">
    <div class="d-flex flex-row ">
      <div class="p-0 w-30 position-relative">
        <div class="dz-error-mark">
          <span><i></i></span>
        </div>
        <div class="dz-success-mark">
          <span><i></i></span>
        </div>
        <div class="preview-container">
          <img data-dz-thumbnail class="img-thumbnail border-0" />
          <i class="simple-icon-doc preview-icon"></i>
        </div>
      </div>
      <div class="pl-3 pt-2 pr-2 pb-1 w-70 dz-details position-relative">
        <div>
          <span data-dz-name></span>
        </div>
        <div class="text-primary text-extra-small" data-dz-size>
          <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress>
            </span>
          </div>
          <div class="dz-error-message">
            <span data-dz-errormessage></span>
          </div>
        </div>
      </div>
      <a href="#/" class="remove" data-dz-remove><i class="glyph-icon simple-icon-trash"></i></a>
    </div>
  </div>
  `
  // path to save on server
  bucketPath: string = `classifier/`;

  // configuration for dropzone avatar
  configAvatar: DropzoneConfigInterface = {
    url: this.uploadApiUrl,
    method: 'POST',
    acceptedFiles: 'image/*',
    maxFiles: 1,
    maxFilesize: 2,
    paramName: 'image',
    previewTemplate: this.previewTemplate,
  };

  //#endregion


  //#region /** Method event for DropZone */

  // check form with dropzone
  checkAvatar(form: NgForm) {
    return !this.predictImage?.length && form.submitted;
  }

  // event for dropzone
  onSending(event): void {
    // get formData
    const formData = event[2];
    // add parameter for formData
    formData.append('bucketPath', this.bucketPath);
  }

  // event for upload error
  onUploadError(event) {
    // show message
    this.notifications.create(
      `Upload failed!`,
      event[1],
      NotificationType.Error,
      {
        theClass: 'error',
        timeOut: 3000,
        pauseOnHover: true,
        showProgressBar: true,
        clickToClose: true
      });
    // remove url image if upload failed
    this.predictImage = '';
  }

  // event for upload success
  onUploadSuccess(event) {
    // show message
    this.notifications.create(
      `Upload successful!`,
      `Image uploaded successfully.`,
      NotificationType.Success,
      {
        theClass: 'success',
        timeOut: 3000,
        pauseOnHover: true,
        showProgressBar: true,
        clickToClose: true
      });
  }

  // onUploadSuccess for avatar
  onUploadSuccessAvatar(event) {
    this.onUploadSuccess(event);
    // get link image for thumbnail
    // try change avatar to demo for user
    this.predictImage = event[1].imageURL;
  }

  // onRemovedFile with thumbnail
  onRemovedFileAvatar(event) {
    try {
      // if avatar new exists, remove and give value = null
      if (this.predictImage.length && !this.predictedResults && !this.predictedLabel) {
        // get response
        let response = JSON.parse(event.xhr.response);
        // delete image on database
        this.uploadService.deleteFile(response.imageURL).subscribe();
      }
      // try give value = null with predictImage
      this.predictImage = ''
      this.predictedResults = null
      this.predictedLabel = ''
      this.showRecommented = false

    } catch (error) { }
    // show message
    this.notifications.create(
      `Deleted successfully!`,
      `Deleted uploaded photos successfully!`,
      NotificationType.Success,
      {
        theClass: 'success',
        timeOut: 3000,
        pauseOnHover: true,
        showProgressBar: true,
        clickToClose: true
      });
  }

  //#endregion


  barChartOptions = {
    legend: {
      display: false,
      position: 'bottom',
      labels: {
        padding: 30,
        usePointStyle: true,
        fontSize: 12
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          gridLines: {
            display: true,
            lineWidth: 1,
            color: 'rgba(0,0,0,0.1)',
            drawBorder: false
          },
          ticks: {
            beginAtZero: true,
            stepSize: 20,
            min: 0,
            max: 100,
            padding: 20
          }
        }
      ],
      xAxes: [
        {
          gridLines: {
            display: false
          }
        }
      ]
    },
    tooltips: {
      backgroundColor: Colors.getColors().foregroundColor,
      titleFontColor: Colors.getColors().primaryColor,
      borderColor: Colors.getColors().separatorColor,
      borderWidth: 0.5,
      bodyFontColor: Colors.getColors().primaryColor,
      bodySpacing: 10,
      xPadding: 15,
      yPadding: 15,
      cornerRadius: 0.15
    }
  };

  savePredictResult() {
    this.predictResult.dateCreated = new Date();
    this.predictResult.imageURL = this.predictImage;
    this.predictResult.labelPredict = this.predictedLabel;
    this.predictResult.probability = this.predictedResults;

    this.predictResultService.addPredictResult(this.predictResult)
      .subscribe(
        (next) => {
          this.predictResultID = next["predictResult"].id
        }
      )
  }

  saveByUser() {
    this.predictResult.status = 'public';
    this.predictResultService.updatePredictResult(this.predictResultID, this.predictResult)
      .subscribe(
        (next) => { },
        (error) => { },
        () => {
          this.notifications.create(
            `Save result successfully!`,
            ``,
            NotificationType.Success,
            {
              theClass: 'success',
              timeOut: 3000,
              pauseOnHover: true,
              showProgressBar: true,
              clickToClose: true
            });
        }
      )
  }

  saveFavorite(style: string) {
    this.userRecordsService.saveFavorite(this.authService.user.uid.toString(), style).
      subscribe(
        (next) => { },
        (error) => { },
        () => { }
      );
  }

  predict() {
    this.isLoading = true
    if (this.predictImage) {
      this.predictService.predictImage(this.predictImage)
        .subscribe(
          (next) => {
            this.isLoading = false
            this.predictedLabel = next['label']

            this.getRecommentedPostByCatergory();

            this.predictedResults = next['result'].map(function (each_element) {
              return Number(each_element.toFixed(2));
            });
            // Save predict result
            this.savePredictResult();

            // Save favorite
            this.saveFavorite(this.predictedLabel);

            this.barChartData = {
              labels: ['ArtDecor', 'HiTech', 'Indochina', 'Industrial', 'Scandinavian'],
              datasets: [
                {
                  borderColor: Colors.getColors().themeColor1,
                  backgroundColor: Colors.getColors().themeColor1_10,
                  data: this.predictedResults,
                  borderWidth: 2
                },
              ]
            };
          }
        )
    }
    else {
      this.isLoading = false
      // show message
      this.notifications.create(
        `Please upload photos!`,
        `Please upload pictures to predict!`,
        NotificationType.Error,
        {
          theClass: 'error',
          timeOut: 3000,
          pauseOnHover: true,
          showProgressBar: true,
          clickToClose: true
        });
    }
  }

  showRecommented = false;
  getRecommentedPostByCatergory() {
    this.showRecommented = false;
    this.postService.getPostsByCategory(this.predictedLabel, 7)
      .subscribe(
        (next) => {
          console.log(next['posts']);
          this.recommentedPost = next['posts'];
          this.showRecommented = true;
        },
        (error) => {
          console.log(error);
          this.showRecommented = false;
        },
        () => { } // complete
      )
  }

  predictEvent() {
    this.predict();
  }

}
