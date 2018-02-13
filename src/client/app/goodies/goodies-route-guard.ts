import { CanActivate } from '@angular/router';
import { Injectable, ViewContainerRef } from '@angular/core';
import { LocalStorageService, LocalStorage } from 'angular-web-storage';
import { ToastsManager, ToastOptions } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class GoodiesGuard implements CanActivate {
  value: any = [];
  constructor(private local: LocalStorageService, private toastr: ToastsManager, private toastOpts: ToastOptions) {
    this.toastOpts.toastLife = 2000;
    this.toastOpts.animate = 'slideDown';
    this.toastOpts.positionClass = 'toast-top-full-width';
    this.toastOpts.maxShown = 1;
  }

  canActivate() {
    this.value.campaign = this.local.get('campaign');
    if(this.value.campaign !== null &&
        (this.value.campaign.newHeadline.length > 0 && this.value.campaign.newUnternehmenstext.length > 0)) {
      return true;
    } else {
      this.toastr.warning('Bitte füllen Sie die rot markierten Felder aus bevor Sie fortfahren können.');
      return false;
    }
  }
}
