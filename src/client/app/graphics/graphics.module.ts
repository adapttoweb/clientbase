import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GraphicsComponent } from './graphics.component';
import { GraphicsGuard } from './graphics-route-guard';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { GraphicsRoutingModule } from './graphics-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, GraphicsRoutingModule, ToastModule],
  declarations: [GraphicsComponent],
  exports: [GraphicsComponent, ToastModule]
})
export class GraphicsModule { }
