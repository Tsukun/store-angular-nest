import { authReducerInternal } from './store/auth/auth.reducer';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './footer/footer.component';
import { ShowcaseItemComponent } from './elements/showcase-item/showcase-item.component';
import { ScrollDirective } from './scroll.directive';
import { NewsItemComponent } from './elements/news-item/news-item.component';
import { SecondNavbarComponent } from './second-navbar/second-navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { StoreModule } from '@ngrx/store';
import { httpInterceptorProvider } from './http-interceptors';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    MainComponent,
    NavbarComponent,
    FooterComponent,
    ShowcaseItemComponent,
    ScrollDirective,
    NewsItemComponent,
    SecondNavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({ auth: authReducerInternal }, {}),
  ],
  providers: [AuthService, httpInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
