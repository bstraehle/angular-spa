import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './home/index/index.component';
import { ListComponent } from './demo/list/list.component';
import { ViewComponent } from './demo/view/view.component';
import { AddComponent } from './demo/add/add.component';
import { UpdateComponent } from './demo/update/update.component';
import { DeleteComponent } from './demo/delete/delete.component';
import { PrivacyComponent } from './home/privacy/privacy.component';
import { ErrorComponent } from './shared/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ListComponent,
    ViewComponent,
    AddComponent,
    UpdateComponent,
    DeleteComponent,
    PrivacyComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {}
