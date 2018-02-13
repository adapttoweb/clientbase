import { Component, OnInit, Injectable, ViewContainerRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NameListService } from '../shared/name-list/name-list.service';
import { Campaign } from '../shared/models/campaign';


// class Campaign {
//   newHeadline: string;
//   winHeadline: string;
//   newUnternehmenstext: string;
//   winBeschreibung: string;
// }
/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  providers: [Campaign]
})
export class HomeComponent implements OnInit {

  //model: any = '';

  newName: string = '';
  errorMessage: string;
  names: any[] = [];

  newHeadline: string = '';
  newHeadlineLenght: any = '45';
  newHeadlineRemaining: any = this.newHeadlineLenght;

  newUnternehmenstext: string = '';
  newUnternehmenstextLenght: any = '500';
  newUnternehmenstextRemaining: any = this.newUnternehmenstextLenght;

  newUnternehmensName: string = '';
  newUnternehmensNameLenght: any = '29';
  newUnternehmensNameRemaining: any = this.newUnternehmensNameLenght;

  newUnternehmensImpr: string = '';
  newUnternehmensImprLenght: any = '300';
  newUnternehmensImprRemaining: any = this.newUnternehmensImprLenght;


  KEY = 'campaign';
  value: any = null;

  model = new Campaign();

  /**
   * Creates an instance of the HomeComponent with the injected
   * NameListService.
   *
   * @param {NameListService} nameListService - The injected NameListService.
   */
  constructor(public toastr: ToastsManager, _vcr: ViewContainerRef,
              public nameListService: NameListService, private sanitizer: DomSanitizer, private forms: FormsModule,
              public local: LocalStorageService, public router: Router) {

    // this.toastr.options = {
    //   "closeButton": false,
    //   "debug": false,
    //   "newestOnTop": false,
    //   "progressBar": true,
    //   "positionClass": "toast-top-full-width",
    //   "preventDuplicates": false,
    //   "onclick": null,
    //   "showDuration": "3000",
    //   "hideDuration": "1200",
    //   "timeOut": "3000",
    //   "extendedTimeOut": "1000",
    //   "showEasing": "linear",
    //   "hideEasing": "linear",
    //   "showMethod": "slideDown",
    //   "hideMethod": "slideUp"
    // }

    this.toastr.setRootViewContainerRef(_vcr);

  }

  /**
   * Get the names OnInit
   */
  ngOnInit() {
    //this.model.newUnternehmenstext = 'Lorem ipsum dolor est....';
    //console.log(`Data from ngOnInit: ${JSON.stringify(this.model)}`)
    //get the local values
    this.value = this.local.get(this.KEY);
//console.log(JSON.stringify(this.value));
    //and assign them to form model
    this.model.newHeadline = (this.value !== null) ? this.value.newHeadline : '' ;
    this.model.newUnternehmensName = (this.value !== null) ? this.value.newUnternehmensName : '' ;
    this.model.newUnternehmenstext = (this.value !== null) ? this.value.newUnternehmenstext : '' ;
    this.model.newUnternehmensImpr = (this.value !== null) ? this.value.newUnternehmensImpr : '' ;


//console.log(JSON.stringify(this.model.newUnternehmensImpr));

    //calculate chars for all
    this.changedInputnewHeadline();
    this.changednewUnternehmensName();
    this.changednewUnternehmenstext();
    this.changednewUnternehmensImpr();


    this.getNames();
  }

  showToast() {
    // Display a warning toast, with no title
    this.toastr.warning('My name is Inigo Montoya. You killed my father, prepare to die!');

    // Display a success toast, with a title
    this.toastr.success('Miracle Max Says');

    // Display an error toast, with a title
    this.toastr.error('I do not think that word means what you think it means.');

  }

  set(expired: number = 0) {
      this.local.set(this.KEY, { a: 1, now: +new Date }, expired, 's');
  }

  remove() {
      this.local.remove(this.KEY);
  }

  get() {
      this.value = this.local.get(this.KEY);
  }

  clear() {
      this.local.clear();
  }

  /**
   * Handle the nameListService observable
   */
  getNames() {
    this.nameListService.get()
      .subscribe(
        names => this.names = names,
        error => this.errorMessage = <any>error
      );
  }

  /**
   * Handle the symbol characters remaining
   */
  changedInputnewHeadline() {
    this.newHeadlineRemaining = this.newHeadlineLenght - this.model.newHeadline.length;
  }

  changednewUnternehmenstext() {
    this.newUnternehmenstextRemaining = this.newUnternehmenstextLenght - this.model.newUnternehmenstext.length;
  }

  changednewUnternehmensName() {
    this.newUnternehmensNameRemaining = this.newUnternehmensNameLenght - this.model.newUnternehmensName.length;
  }

  changednewUnternehmensImpr() {
    this.newUnternehmensImprRemaining = this.newUnternehmensImprLenght - this.model.newUnternehmensImpr.length;
  }


  goAddGoodies(timeout: number = 0) {
    setTimeout((router: Router) => {
      this.router.navigateByUrl('/goodies');
    }, timeout);
  }

  saveCampaignDetails(campaignForm: any, expired: number = 0) {
    //console.log(`Saving campaignForm data to local storage... ${JSON.stringify(campaignForm)}`);
    this.local.remove(this.KEY);
    this.local.set(this.KEY, campaignForm, expired, 's');
    // Display a success toast, with a title
    //this.toastr.success('Daten wurden erfolgreich gesichert!');
    this.toastr.success('Daten wurden erfolgreich gesichert!', null, {}).then(( toast ) => {
            	// DO some stuff here
            	// and based on the condition dismiss the toast
                //this.toastr.dismissToast( toast );
        });

    //console.log(`Saving campaignForm data to session storage...`);
  }

  readCampaignDetails() {
    this.value = this.local.get(this.KEY);
    //console.log(`Data read from local storage... ${JSON.stringify(this.value)}`);
    //console.log(`Current cookie use: ${JSON.stringify(localStorage).length}`);

    // this.value = this.session.get(this.KEY);
    // console.log(`Data read from session storage... ${JSON.stringify(this.value)}`);
  }

  resetCampaignForm(expired: number = 0) {
    if (confirm('Willst du wirklich alle Felder zurücksetzen?')) {
        // Save it!
        this.model = new Campaign();
        this.local.set(this.KEY, this.model, expired, 's');

        //calculate chars for all
        this.changedInputnewHeadline();
        this.changednewUnternehmensName();
        this.changednewUnternehmenstext();
        this.changednewUnternehmensImpr();
    } else {
        // Do nothing!
        // alert('0');
    }
  }

  calcCharPercent(maxChars: any, curChars: any) {
    var theCalc = (curChars / maxChars)*100;
    return this.sanitizer.bypassSecurityTrustStyle('width: ' + theCalc + '%;');
  }

  /**
   * Pushes a new name onto the names array
   * @return {boolean} false to prevent default form submit behavior to refresh the page.
   */
  addTexts(): boolean {
    return false;
  }

  /**
   * Pushes a new name onto the names array
   * @return {boolean} false to prevent default form submit behavior to refresh the page.
   */
  addName(): boolean {
    // TODO: implement nameListService.post
    this.names.push(this.newName);
    this.newName = '';
    return false;
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

}
