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

import { PrintProfileComponent } from './print-profile/print-profile.component';
import { RegistrationQuestionEditComponent } from './registration-question-edit/registration-question-edit.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { SalesforceService } from './../service/salesforce.service';
import { GetdataService } from './getdata.service';
import { CompanyContactComponent } from './company-contact/company-contact.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SocailMediaEditComponent } from './socail-media-edit/socail-media-edit.component';
import { MatSnackBarModule } from '@angular/material';
import { DiversityEditComponent } from './diversity-edit/diversity-edit.component';
import { CommoditiesComponent } from './commodities/commodities.component';
import { CompanyContactEditComponent } from './company-contact-edit/company-contact-edit.component';
import { ProjectInfoComponent } from './project-info/project-info.component';
import { CustomerRefComponent } from './customer-ref/customer-ref.component';
import { SimpleTinyComponent } from './tinymce.component';

//import {disableDeprecatedForms, provideForms} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogService } from './confirmation-dialog/confirmation-dialog.service';
//import { LinkFormat } from './link-format';
import { SafeHtmlPipe } from './safe-html';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { DisplayTicketsComponent } from './display-tickets/display-tickets.component';
import { YoutubeEditComponent } from './youtube-edit/youtube-edit.component';
import { OtherInfoEditComponent } from './other-info-edit/other-info-edit.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';



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
    PrintProfileComponent,
    CompanyContactComponent,
    EditProfileComponent,
    SocailMediaEditComponent,
    DiversityEditComponent,
    CommoditiesComponent,
    CompanyContactEditComponent,
    ProjectInfoComponent,
    CustomerRefComponent,
    SimpleTinyComponent,
    SafeHtmlPipe,
    RegistrationQuestionEditComponent,
    ConfirmationDialogComponent,
    DisplayTicketsComponent,
    YoutubeEditComponent,
    OtherInfoEditComponent,
   // LinkFormat
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
    MatExpansionModule,
    MatSnackBarModule,
    AngularMultiSelectModule,
    NgbModule.forRoot(),
  ],
  providers: [SalesforceService,GetdataService,ConfirmationDialogService],
  bootstrap: [AppComponent],
  entryComponents: [
    NaicsCodeEditComponent,CompanyProfileEditComponent,BasicInfoEditComponent,
    WorkAddressEditComponent,CompanyContactComponent,
    SocailMediaEditComponent,DiversityEditComponent,
    CommoditiesComponent,CompanyContactEditComponent,
    ProjectInfoEditComponent,CustomerRefComponent,
    RegistrationQuestionEditComponent,ConfirmationDialogComponent,
    DisplayTicketsComponent,YoutubeEditComponent,OtherInfoEditComponent
  ]

})

export class AppModule { }
