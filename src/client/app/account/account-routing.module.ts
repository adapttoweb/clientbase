import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountComponent } from './account.component';
import { AccountGuard } from './account-route-guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'account',
        component: AccountComponent,
        canActivate: [AccountGuard]
      }
    ])
  ],
  exports: [RouterModule],
  providers: [AccountGuard]
})
export class AccountRoutingModule { }
