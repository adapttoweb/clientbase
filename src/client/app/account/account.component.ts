import { Component, OnInit, Injectable, ViewContainerRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';

import { MailGunService } from '../shared/mailgun/mailgun.service';

import { Account } from '../shared/models/account';

/**
 * This class represents the lazy loaded AccountComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-account',
  templateUrl: 'account.component.html',
  styleUrls: ['account.component.css'],
  providers: [Account]
})
export class AccountComponent implements OnInit {
  model = new Account();
  KEY = 'account';
  value: any = null;

  isComplete: boolean = false;

  // toastr: any = null;

  constructor(public toastr: ToastsManager, vcr: ViewContainerRef,
              public mg: MailGunService, private sanitizer: DomSanitizer, private forms: FormsModule,
              public local: LocalStorageService, public session: SessionStorageService) {

  }

  /**
   * Do something OnInit
   */
  ngOnInit() {
    this.value = this.local.get(this.KEY);
    //console.log(JSON.stringify(this.value));
    //and assign them to form model
    this.model.companyName = (this.value !== null) ? this.value.companyName : '' ;
    this.model.contactPerson = (this.value !== null) ? this.value.contactPerson : '' ;
    this.model.contactEmail = (this.value !== null) ? this.value.contactEmail : '' ;
    this.model.contactPhone = (this.value !== null) ? this.value.contactPhone : '' ;
    this.model.contactWebsite = (this.value !== null) ? this.value.contactWebsite : '' ;
    this.model.facebookPage = (this.value !== null) ? this.value.facebookPage : '' ;
    this.model.supportEmail = (this.value !== null) ? this.value.supportEmail : '' ;
    this.model.supportPhone = (this.value !== null) ? this.value.supportPhone : '' ;
  }

  completeOrder() {
    this.value.campaign = JSON.stringify(this.local.get('campaign'));
    this.value.goodies = JSON.stringify(this.local.get('goodies'));
    this.value.account = JSON.stringify(this.local.get('account'));

    this.isComplete = true;

    this.mg.sendEmail('j.pivovarnikova@rublys.com','subject',this.value.campaign, this.value.goodies, this.value.account);

    this.toastr.success('Daten würden erfolgreich überdnomen. Danke!');
  }

  saveAccountDetails(accountForm: any, expired: number = 0) {
    //for testing
    //console.log('The form:' + JSON.stringify(accountForm));

    //save to localhost
    this.local.set(this.KEY, accountForm, expired, 's');

    //read it
    this.value = this.local.get(this.KEY);
    //console.log(`Saving account data to local storage... ${JSON.stringify(this.value)}`);
  }

  resetAccountForm() {
    if (confirm('Willst du wirklich alle Felder zurücksetzen?')) {
        // Save it!
        this.model = new Account();
        this.local.remove(this.KEY);
        this.toastr.error('Account info gelöscht!');
        //this.local.set(this.KEY, this.model, expired, 's');
    } else {
        // Do nothing!
        // alert('0');
    }
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

}
