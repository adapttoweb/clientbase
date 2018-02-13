import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GraphicsComponent } from './graphics.component';
import { GraphicsGuard } from './graphics-route-guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'graphics',
        component: GraphicsComponent,
        canActivate: [GraphicsGuard]
      }
    ])
  ],
  exports: [RouterModule],
  providers: [GraphicsGuard]
})
export class GraphicsRoutingModule { }
