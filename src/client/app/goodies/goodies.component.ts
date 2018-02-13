import { Component, OnInit, Injectable, ViewContainerRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NameListService } from '../shared/name-list/name-list.service';
import { Goodie } from '../shared/models/goodie';


/**
 * This class represents the lazy loaded GoodiesComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-goodies',
  templateUrl: 'goodies.component.html',
  styleUrls: ['goodies.component.css'],
  providers: [Goodie]
})
export class GoodiesComponent implements OnInit {
  goodies: any[];
  model = new Goodie();

  newName: string = '';
  errorMessage: string;
  names: any[] = [];
  toasteroptions: any = [];

  currentGoodie: number = 0;

  winHeadline: string = '';
  winHeadlineLenght: any = '45';
  winHeadlineRemaining: any = this.winHeadlineLenght;

  winBeschreibung: string = '';
  winBeschreibungLenght: any = '500';
  winBeschreibungRemaining: any = this.winBeschreibungLenght;

  gTypeDefault: any = '';
  gTypeLenght: any ='490';
  gTypeRemaining: any = this.gTypeLenght;
  gTypeCustom: any = '';

  gLegalDefault: any = '';
  gLegalLenght: any ='500';
  gLegalRemaining: any = this.gLegalLenght;

  campaignInfo: any = '';
  companyName: any = '';
  companyDescr: any = '';

  KEY = 'goodies';
  value: any = null;

  options: any[];
  legaloptions: any[];

  totalGoodies: number = 0;

  viewportHeight: number = 0;
  viewportWidth: number = 0;

  /**
   * Creates an instance of the GoodiesComponent with the injected
   * NameListService.
   *
   * @param {NameListService} nameListService - The injected NameListService.
   */
  constructor(public toastr: ToastsManager, _vcr: ViewContainerRef,
              public nameListService: NameListService, private sanitizer: DomSanitizer, private forms: FormsModule,
              public local: LocalStorageService, public session: SessionStorageService, public router: Router) {

    this.options = [
      {id: 0, name: '', default: '', custom: '', start: true},
      {id: 1, name: 'Cashback', default: '• Kaufe im Laden deiner Wahl\n• Mache ein Foto des Kassenbons mit der App (die gesamte Rechnung muss zu sehen sein, inkl. Datum, Uhrzeit und Summe)\n• Lass dir dein Guthaben ab €10,- auf dein PayPal Konto auszahlen\n• Die Rechnung darf nur bei einem Cashbackanbieter verwendet werden\n• Rechnungen von Online-Bestellungen sind von der Rechnungsüberprüfung ausgeschlossen (siehe ANBs)\n• Jede Rechnung kann entsprechend der Anzahl der gekauften Produkte eingereicht werden', custom: ''},
      {id: 2, name: 'Online Code', default: 'Klicke auf Einlösen, kopiere den Code und gib diesen im Onlineshop ein.\n(Sobald du "weiter" gedrückt hast, ist das Goody unter "bereits eingelöst" zu finden aber wieder aufrufbar!)', custom: ''},
      {id: 3, name: 'Link', default: 'Klicke auf Einlösen und lass dich automatisch zu deinem Goody weiterleiten.\n(Sobald du "weiter" gedrückt hast, ist das Goody unter "bereits eingelöst" zu finden aber wieder aufrufbar!)', custom: ''},
      // {isDivider: true},
      {id: 4, name: 'PIN Code', default: 'Klicke vor Ort auf Einlösen und lass das Personal den Code zum Entwerten eingeben.', custom: ''},
      {id: 5, name: 'EAN Barcode', default: 'Klicke auf Einlösen und zeige den dargestellten Barcode dem Personal an der Kasse.', custom: ''},
      {id: 6, name: 'Shipping', default: 'Klicke auf Einlösen und fülle das Kontaktformular aus, damit wir dir dein Goody zusenden können.\nACHTUNG: Es wird nur ein Zustellversuch unternommen, bitte achte darauf, dass dein Name, deine E-Mail-Adresse und deine Postadresse richtig und vollständig angegeben sind und mit dem Namen an deinem Türschild übereinstimmen.\nDein Goody macht sich dann schnellstmöglich auf den Weg zu dir, sodass es innerhalb von 14 Werktagen bei dir eintreffen sollte.', custom: ''}
    ];

    this.legaloptions = [{
        id: 1
      , name: 'General Leagal'
      , default: 'Pro Person ist nur ein Goody bzw. ein Gutschein einlösbar. Gutscheine sind nicht mit anderen Aktionen oder Gutscheinen kombinierbar. Eine Barauszahlung und der Rechtsweg sind ausgeschlossen.'
      , custom: ''
    }];

    this.toastr.setRootViewContainerRef(_vcr);

  }

  /**
   * Get the names OnInit
   */
  ngOnInit() {
    //get the screensize
    this.viewportWidth = window.screen.width;
    this.viewportHeight = window.screen.height;

    //get the local values from localstorage
    this.goodies = (this.local.get(this.KEY)) ? this.local.get(this.KEY) : [] ;
    this.totalGoodies = this.goodies.length;
    this.manageGoodies();
    //console.log(this.goodies);

    //get the needed campaign info
    this.campaignInfo = (this.local.get('campaign')) ? this.local.get('campaign') : [] ;
    this.companyName = this.campaignInfo.newUnternehmensName;
    this.companyDescr = this.campaignInfo.newUnternehmenstext;

    //console.log(this.model.gTypeCustom);
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

  scrollElement(el: any, loc: number) {
    //el.scrollIntoView({behavior:"smooth"});
    el.scrollTo({ top: loc, left: 0, behavior: 'smooth' });
  }

  /**
   * Handle the symbol characters remaining
   */
  changedInputwinHeadline() {
    this.winHeadlineRemaining = this.winHeadlineLenght - this.model.winHeadline.length;
  }

  changedwinBeschreibung() {
    this.winBeschreibungRemaining = this.winBeschreibungLenght - this.model.winBeschreibung.length;
  }

  changedgTypeCustom() {
    this.gTypeRemaining = this.gTypeLenght - this.model.gTypeCustom.length;
  }

  changedgLegalCustom() {
    this.gLegalRemaining = this.gLegalLenght - this.model.gLegalCustom.length;
  }

  addGoodie(i: number = 0, expired: number = 0) {
    this.model = new Goodie();
    this.goodies.push(this.model);
    this.local.set(this.KEY, this.goodies, expired, 's');
    //console.log('Adding new goodie number ' + i + '... Voala!');
    //get the local values from localstorage
    this.goodies = (this.local.get(this.KEY)) ? this.local.get(this.KEY) : [] ;
    this.totalGoodies = this.goodies.length;
    this.askGoodie(this.totalGoodies - 1, true);
    //this.toastr.success('Preis hinzugefügt!');
    this.toastr.success('Preis hinzugefügt!', '', {})
        .then(( toast ) => {
            	// DO some stuff here
            	// and based on the condition dismiss the toast
                //this.toastr.dismissToast(toast);
        });
  }

  askGoodie(i: number, currentGoodieCompleted: boolean) {
    //console.log('Requested goodie number: ' + i);
    //console.log('Current goodie is completed: ' + currentGoodieCompleted);
    //alert if unfinished goodie form
    if(currentGoodieCompleted === false) {
      if (confirm('Deine bisher eingegebenen Daten gehen verloren! Dieses Goody wirklich verlassen? ')) {
          // Save it!
          //alert('will not be saved! Will go on!');
          this.currentGoodie = i;
          this.manageGoodies(i);
      } else {
          // Do nothing!
          //alert('Stop and dont move!');
      }
    } else {
      this.currentGoodie = i;
      this.manageGoodies(i);
    }


  }

  removeGoodie(i: number, expired: number = 0) {
    if (confirm('Willst du diesen Preis wirklich löschen?')) {
        // Remove it!
        // alert('1');
        //console.log('Removing goodie:' + i);
        this.goodies.splice(this.goodies.indexOf(i));
        this.local.set(this.KEY, this.goodies, expired, 's');
        this.askGoodie(i - 1, true);
        this.toastr.error('Preis gelöscht!');
    } else {
        // Do nothing!
        //console.log('Not removing goodie:' + i);
        // alert('0');
    }


  }

  manageGoodies(i: number = 0) {
    //get the local values from localstorage
    this.goodies = (this.local.get(this.KEY)) ? this.local.get(this.KEY) : [] ;
    this.value = this.goodies[i];
    if (this.value) {
      //console.log(`There is a value in localstorage: ${JSON.stringify(this.value)}`);
      this.model.winBeschreibung = (this.value.winBeschreibung !== null) ? this.value.winBeschreibung : '' ;
      this.model.winHeadline = (this.value.winHeadline !== null) ? this.value.winHeadline : '';
      this.model.gType = (this.value.gType !== null) ? this.value.gType : '' ;
      this.model.gTypeText = (this.value.gTypeText !== null) ? this.value.gTypeText : false ;
      this.model.gTypeCustom = (this.value.gTypeCustom !== null) ? this.value.gTypeCustom : '' ;
      this.model.gLegal = (this.value.gLegal !== null) ? this.value.gLegal : '' ;
      this.model.gLegalText = (this.value.gLegalText !== null) ? this.value.gLegalText : false ;
      this.model.gLegalCustom = (this.value.gLegalCustom !== null) ? this.value.gLegalCustom : '' ;

      if (!this.model.gTypeText) {
        //get the selected value
        //console.log('the preselected type is:' + this.model.gType);
        this.gTypeDefault = this.options.filter(
              options => options.name === this.model.gType);
        this.gTypeDefault = (this.gTypeDefault[0] && this.gTypeDefault[0]['default']) ? this.gTypeDefault[0]['default'] : '';
      }

      if (!this.model.gLegalText) {
        //get the selected value
        //console.log('the preselected legal is: ' + this.model.gLegal);
        this.gLegalDefault = this.legaloptions.filter(
              legaloptions => legaloptions.name === this.model.gLegal);
        this.gLegalDefault = (this.gLegalDefault[0] && this.gLegalDefault[0]['default']) ? this.gLegalDefault[0]['default'] : '';
      }

    } else {
      //console.log('There is NO value in localstorage.');
    }
  }


  saveGoodiesDetails(goodiesForm: any, expired: number = 0) {

    //for testing
    //console.log(JSON.stringify(goodiesForm));

    this.model.gLegal = goodiesForm.gLegal;
    this.model.gLegalText = goodiesForm.gLegalText;
    this.model.gLegalCustom = goodiesForm.gLegalCustom;
    this.model.gType = goodiesForm.gType;
    this.model.gTypeText = goodiesForm.gTypeText;
    this.model.gTypeCustom = goodiesForm.gTypeCustom;
    this.model.winBeschreibung= goodiesForm.winBeschreibung;
    this.model.winHeadline= goodiesForm.winHeadline;

    //add to goodies
    //this.goodies.push(this.model);
    this.goodies[this.currentGoodie] = this.model;

    //save to localhost
    this.local.remove(this.KEY);
    this.local.set(this.KEY, this.goodies, expired, 's');

    //console.log(`Saving goodiesForm data to session storage...`);
    //this.session.set(this.KEY, this.model, expired, 's');

    //read it
    this.value = this.local.get(this.KEY);
    //console.log(`Saving goodiesForm data to local storage... ${JSON.stringify(this.value)}`);
    this.toastr.success('Daten wurden erfolgreich gesichert!');
  }

  readGoodiesDetails() {
    this.value = this.local.get(this.KEY);
    //console.log(`Data read from local storage... ${JSON.stringify(this.value)}`);
    //console.log(`Current cookie use: ${JSON.stringify(localStorage).length}`);

    this.value = this.session.get(this.KEY);
    //console.log(`Data read from session storage... ${JSON.stringify(this.value)}`);
  }

  resetGoodiesForm(expired: number = 0) {
      if (confirm('Willst du wirklich alle Preise zurücksetzen?')) {
          // Save it!
          // alert('1');
          this.model = new Goodie();
          this.remove();
          this.manageGoodies();
          //calculate chars for all
          this.changedInputwinHeadline();
          this.changedwinBeschreibung();
          this.changedgTypeCustom();
          this.changedgLegalCustom();
      } else {
          // Do nothing!
          // alert('0');
      }
  }

  goAccountInfo(timeout: number = 0) {
    setTimeout((router: Router) => {
      this.router.navigateByUrl('/account');
    }, timeout);
  }

  // goAccountInfo() {
  //   this.router.navigateByUrl('/account');
  // }

  calcCharPercent(maxChars: any, curChars: any) {
    var theCalc = (curChars / maxChars)*100;
    return this.sanitizer.bypassSecurityTrustStyle('width: ' + theCalc + '%;');
  }

  onChangeGType(newObj:any) {
    if (newObj) {
      this.gTypeDefault = this.options.filter(
            options => options.name === newObj);
      this.gTypeDefault = (this.gTypeDefault[0]['default']) ? this.gTypeDefault[0]['default'] : '';
    }
    this.model.gTypeText = false;
    //console.log(this.gTypeDefault[0]['default']);
    // ... do other stuff here ...
  }

  onChangeGLegal(newObj:any) {
    //console.log(JSON.stringify(newObj));
    if (newObj) {
      this.gLegalDefault = this.legaloptions.filter(
            legaloptions => legaloptions.name === newObj);
      this.gLegalDefault = (this.gLegalDefault[0]['default']) ? this.gLegalDefault[0]['default'] : '';
    }
    this.model.gLegalText = false;
    //console.log(this.gTypeDefault[0]['default']);
    // ... do other stuff here ...
  }

  gTypeToCustom() {
    //console.log('changing to custom....');
    this.model.gTypeText = true;
  }

  gLegalToCustom() {
    //console.log('changing to custom....');
    this.model.gLegalText = true;
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

  warnRouteToast(state: boolean) {
    console.log(state);
  }

  // TODO: Remove this when we're done
  //get diagnostic() { return JSON.stringify(this.model); }
  get diagnostic() { return JSON.stringify(this.model); }

}
