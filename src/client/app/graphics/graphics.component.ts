import { Component, OnInit, Injectable, ViewContainerRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';

import { Graphics } from '../shared/models/graphics';

/**
 * This class represents the lazy loaded GraphicsComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-graphics',
  templateUrl: 'graphics.component.html',
  styleUrls: ['graphics.component.css'],
  providers: [Graphics]
})
export class GraphicsComponent implements OnInit {
  model = new Graphics();
  KEY = 'graphics';
  value: any = null;

  isComplete: boolean = false;

  // toastr: any = null;

  constructor(public toastr: ToastsManager, vcr: ViewContainerRef,
              private sanitizer: DomSanitizer, private forms: FormsModule,
              public local: LocalStorageService, public session: SessionStorageService) {

  }

  /**
   * Do something OnInit
   */
  ngOnInit() {
    this.value = this.local.get(this.KEY);

  }


  // TODO: Remove this when we're done
  //get diagnostic() { return JSON.stringify(this.model); }

}
