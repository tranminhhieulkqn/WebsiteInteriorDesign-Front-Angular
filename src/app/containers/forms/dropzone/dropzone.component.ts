import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html'
})
export class DropzoneComponent implements OnInit {
  @Input() title: String;

  config = {
    url: 'https://interiordesign-back.herokuapp.com/upload/image',
    paramName: 'image',
    thumbnailWidth: 160,
    // tslint:disable-next-line: max-line-length
    previewTemplate:
      `
    <div class="dz-preview dz-file-preview mb-3">
    <div class="d-flex flex-row">
      <div class="p-0 w-30 position-relative">
        <div class="dz-error-mark">
          <span><i></i></span>
        </div>
        <div class="dz-success-mark">
          <span><i></i></span>
        </div>
        <div class="preview-container"><img data-dz-thumbnail class="img-thumbnail border-0" /><i class="simple-icon-doc preview-icon"></i></div>
      </div>
      <div class="pl-3 pt-2 pr-2 pb-1 w-70 dz-details position-relative">
        <div><span data-dz-name></span></div>
        <div class="text-primary text-extra-small" data-dz-size></div>
        <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
        <div class="dz-error-message"><span data-dz-errormessage></span></div>
      </div>
    </div>
      <a href="#/" class="remove" data-dz-remove><i class="glyph-icon simple-icon-trash"></i></a>
    </div>
    `
  };

  constructor() { }

  ngOnInit() {
  }

  onUploadError(event) {
    console.log(event);
  }

  onUploadSuccess(event) {
    console.log(event);
  }

  onFileRemoved(event) {
    // console.log("Hello")
    // console.log(event);
    // console.log(event.xhr);
    // console.log(event.xhr.response);
    // var x = JSON.parse(event.xhr.response);
    // console.log(x);
    console.log(JSON.parse(event.xhr.response).imageURL);
  }

  files: File[] = [];

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

}
