import { CanActivate } from '@angular/router';
import { Injectable, ViewContainerRef } from '@angular/core';
import { LocalStorageService, LocalStorage } from 'angular-web-storage';
import { ToastsManager, ToastOptions } from 'ng2-toastr/ng2-toastr';

@Injectable()
export class GraphicsGuard implements CanActivate {
  value: any = [];
  constructor(private local: LocalStorageService, private toastr: ToastsManager, private toastOpts: ToastOptions) {
    this.toastOpts.toastLife = 2000;
    // this.toastOpts.animate = 'slideDown';
    this.toastOpts.positionClass = 'toast-top-full-width';

    this.toastOpts.maxShown = 1;
  }

  canActivate() {
    this.value.campaign = this.local.get('campaign');
    if(this.value.campaign && this.value.campaign !== null &&
        (this.value.campaign.newHeadline.length > 0 && this.value.campaign.newUnternehmenstext.length > 0)) {
          this.value.goodies = this.local.get('goodies');
          if(this.value.goodies && this.value.goodies[0] !== null &&
              (this.value.goodies[0].winHeadline.length > 0
                && this.value.goodies[0].gType.length > 0
                && this.value.goodies[0].gLegal.length > 0)) {
            return true;
          } else {
            this.toastr.warning('Bitte füllen Sie die rot markierten Felder aus bevor Sie fortfahren können.');
            return false;
          }
    } else {
      this.toastr.warning('Bitte füllen Sie die rot markierten Felder aus bevor Sie fortfahren können.');
      return false;
    }
  }
}
