import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeetingDetailPage } from './meeting-detail';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    MeetingDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MeetingDetailPage),
    ComponentsModule
  ],
})
export class MeetingDetailPageModule {}
