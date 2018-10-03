import { NgModule } from '@angular/core';
import { HeadComponent } from './head/head';
import { IonicModule } from 'ionic-angular';
@NgModule({
	declarations: [HeadComponent],
	imports: [IonicModule],
	exports: [HeadComponent]
})
export class ComponentsModule {}
