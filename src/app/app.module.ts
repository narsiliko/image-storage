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
import { ImageSearchComponent } from './components/image-search/image-search.component';
import { ImageStorageComponent } from './components/image-storage/image-storage.component';
import { SearchCardComponent } from './components/search-card/search-card.component';
import { StorageCardComponent } from './components/storage-card/storage-card.component';

import { FilterImagesByNamePipe } from './core/pipes/filter-images-by-name.pipe';


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    ImageSearchComponent,
    ImageStorageComponent,
    SearchCardComponent,
    StorageCardComponent,
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
