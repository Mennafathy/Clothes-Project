import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CartComponent } from './components/cart/cart.component';
import { BrandsComponent } from './components/brands/brands.component';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthGuard } from './guards/auth.guard';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CheckOutComponent } from './components/check-out/check-out.component';

const routes: Routes = [
  {path:" ",redirectTo:"home",pathMatch:'full'},
  {path:"home",canActivate:[AuthGuard],component:HomeComponent},
  {path:"about" ,canActivate:[AuthGuard],component:AboutComponent},
  {path:"categories",canActivate:[AuthGuard] ,component:CategoriesComponent},
  {path:"cart",canActivate:[AuthGuard] ,component:CartComponent},
  {path:"brands",canActivate:[AuthGuard] ,component:BrandsComponent},
  {path:"checkout",canActivate:[AuthGuard] ,component:CheckOutComponent},
  {path:"productdetails/:id",canActivate:[AuthGuard] ,component:ProductDetailsComponent},
  {path:"login" ,component:LoginComponent},
  {path:"register" ,component:SignUpComponent},
  {path:'settings',loadChildren:()=>import("./modules/settings/settings.module").then((load)=>load.SettingsModule)},
  {path:"**" ,canActivate:[AuthGuard] ,component:NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes ,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
