import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GenerateNewKeyComponent } from './generate-new-key/generate-new-key.component';
import { ConceptIntroComponent } from './concept-intro/concept-intro.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ImportKeyComponent } from './import-key/import-key.component';
import { ViewMetadataComponent } from './view-metadata/view-metadata.component';
import { PrettyHexPipe } from './pretty-hex.pipe';
import { CopyStringDirective } from './copy-string.directive';
import { ConnectComponent } from './connect/connect.component';

import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import { ExportKeyComponent } from './export-key/export-key.component';

@NgModule({
  declarations: [
    AppComponent,
    GenerateNewKeyComponent,
    ConceptIntroComponent,
    ImportKeyComponent,
    ViewMetadataComponent,
    PrettyHexPipe,
    CopyStringDirective,
    ConnectComponent,
    ExportKeyComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatStepperModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
