import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { AccountGuard } from './account-route-guard';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { AccountRoutingModule } from './account-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, AccountRoutingModule, ToastModule],
  declarations: [AccountComponent],
  exports: [AccountComponent, ToastModule]
})
export class AccountModule { }
