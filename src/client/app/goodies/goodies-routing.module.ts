import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GoodiesComponent } from './goodies.component';
import { GoodiesGuard } from './goodies-route-guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'goodies',
        component: GoodiesComponent,
        canActivate: [GoodiesGuard]
      }
    ])
  ],
  exports: [RouterModule],
  providers: [GoodiesGuard]
})
export class GoodiesRoutingModule { }
