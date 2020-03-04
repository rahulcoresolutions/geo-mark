import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TakePicturePage } from './take-picture.page';

const routes: Routes = [
  {
    path: '',
    component: TakePicturePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TakePicturePageRoutingModule {}
