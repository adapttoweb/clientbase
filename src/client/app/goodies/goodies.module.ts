import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GoodiesComponent } from './goodies.component';
//import { GoodiesGuard } from './goodies-route-guard';
import { GoodiesRoutingModule } from './goodies-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, GoodiesRoutingModule],
  declarations: [GoodiesComponent],
  exports: [GoodiesComponent]
})
export class GoodiesModule { }
