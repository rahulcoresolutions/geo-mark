import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TakePicturePageRoutingModule } from './take-picture-routing.module';

import { TakePicturePage } from './take-picture.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TakePicturePageRoutingModule
  ],
  declarations: [TakePicturePage]
})
export class TakePicturePageModule {}
