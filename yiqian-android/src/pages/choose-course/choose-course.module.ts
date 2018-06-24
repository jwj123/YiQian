import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChooseCoursePage } from './choose-course';

@NgModule({
  declarations: [
    ChooseCoursePage,
  ],
  imports: [
    IonicPageModule.forChild(ChooseCoursePage),
  ],
})
export class ChooseCoursePageModule {}
