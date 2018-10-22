import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImagePage } from './image';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ImagePage,
  ],
  imports: [
    IonicPageModule.forChild(ImagePage),
    ComponentsModule
  ],
})
export class ImagePageModule {}
