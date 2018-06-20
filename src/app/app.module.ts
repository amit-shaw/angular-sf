import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { NaicsCodeComponent } from './naics-code/naics-code.component';
import { Select2Module } from 'ng2-select2';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { NaicsCodeEditComponent } from './naics-code-edit/naics-code-edit.component';
import {MatDialogModule} from '@angular/material/dialog';
import { CompanyProfileEditComponent } from './company-profile-edit/company-profile-edit.component';
import { RegistrationQuestionComponent } from './registration-question/registration-question.component';
import { BasicInfoEditComponent } from './basic-info-edit/basic-info-edit.component';
import { WorkAddressEditComponent } from './work-address-edit/work-address-edit.component';
import { ProjectInfoEditComponent } from './project-info-edit/project-info-edit.component';
import { RegistrationQuestionEditComponent } from './registration-question-edit/registration-question-edit.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { SalesforceService } from './../service/salesforce.service';
import { GetdataService } from './getdata.service';
import { CompanyContactComponent } from './company-contact/company-contact.component';



@NgModule({
  declarations: [
    AppComponent,
    BasicInfoComponent,
    NaicsCodeComponent,
    CompanyProfileComponent,
    NaicsCodeEditComponent,
    CompanyProfileEditComponent,
    RegistrationQuestionComponent,
    BasicInfoEditComponent,
    WorkAddressEditComponent,
    ProjectInfoEditComponent,
    RegistrationQuestionEditComponent,
    CompanyContactComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    Select2Module,
    AngularFontAwesomeModule,
    MatDialogModule,
    MatExpansionModule
  ],
  providers: [SalesforceService,GetdataService],
  bootstrap: [AppComponent],
  entryComponents: [NaicsCodeEditComponent,CompanyProfileEditComponent,BasicInfoEditComponent,WorkAddressEditComponent,CompanyContactComponent]

})

export class AppModule { }
