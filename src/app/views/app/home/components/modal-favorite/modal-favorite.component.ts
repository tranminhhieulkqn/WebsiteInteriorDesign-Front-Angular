import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import favorite, { IFavorite } from 'src/app/data/favorite';

@Component({
  selector: 'app-modal-favorite',
  templateUrl: './modal-favorite.component.html',
})
export class ModalFavoriteComponent implements OnInit {

  @ViewChild('template_confirm', { static: true }) template_confirm: TemplateRef<any>;
  @ViewChild('template_chooses', { static: true }) template_chooses: TemplateRef<any>;
  @ViewChild('template_redirect', { static: true }) template_redirect: TemplateRef<any>;

  favorite = favorite

  modalRef: BsModalRef;
  message: string;
  constructor(
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.showConfirm();
  }

  showConfirm() { // form confirm
    this.modalRef = this.modalService.show(this.template_confirm, {
      class: 'modal-dialog-centered modal-md'
    });
  }

  openModal(template: TemplateRef<any>) {
    this.showConfirm();
  }

  yes_confirm(): void {
    this.modalRef.hide();
    this.modalRef = this.modalService.show(this.template_redirect, {
      class: 'modal-dialog-centered modal-md'
    });
  }

  later_confirm(): void {
    this.modalRef.hide();
  }

  yes_redirect(): void {
    this.modalRef.hide();
    this.router.navigate(['/app/predictor/predict']);
    // redirect to predictor
  }

  next_redirect(): void {
    this.modalRef.hide();
    this.modalRef = this.modalService.show(this.template_chooses, {
      class: 'modal-dialog-centered modal-lg'
    });
  }

  yes_chooses(): void {
    this.modalRef.hide();
  }

  cancel_chooses(): void {
    this.modalRef.hide();
  }

}
