import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import en from '@angular/common/locales/en';

import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';

import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzEmptyModule } from 'ng-zorro-antd/empty';

import { AppComponent } from './app.component';
import { ImagesSearchComponent } from './components/images-search/images-search.component';
import { ImagesDisplayComponent } from './components/images-display/images-display.component';
import { SearchResultCardComponent } from './components/search-result-card/search-result-card.component';
import { StoredImageCardComponent } from './components/stored-image-card/stored-image-card.component';

import { FilterImagesByNamePipe } from './core/pipes/filter-images-by-name.pipe';


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    ImagesSearchComponent,
    ImagesDisplayComponent,
    SearchResultCardComponent,
    StoredImageCardComponent,
    FilterImagesByNamePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzInputModule,
    NzIconModule,
    NzGridModule,
    NzButtonModule,
    NzCardModule,
    NzTagModule,
    NzDividerModule,
    NzEmptyModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
