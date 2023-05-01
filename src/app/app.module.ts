import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MainSliderComponent } from './components/main-slider/main-slider.component';
import { BuyPipe } from './pipes/buy.pipe';
import { SeemorePipe } from './pipes/seemore.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { LoadingPageComponent } from './components/loading-page/loading-page.component';
import { ToastrModule } from 'ngx-toastr';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { HeaderInterceptor } from './interceptors/header.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    BrandsComponent,
    CartComponent,
    CategoriesComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    NotfoundComponent,
    RegisterComponent,
    SignUpComponent,
    ProductDetailsComponent,
    MainSliderComponent,
    BuyPipe,
    SeemorePipe,
    SearchPipe,
    ChangePasswordComponent,
    LoadingPageComponent,
    CheckOutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    CarouselModule,
    FormsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',

    })
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:HeaderInterceptor,
      multi:true
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:ErrorInterceptor,
      multi:true
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
