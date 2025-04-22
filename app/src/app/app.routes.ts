import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { CartComponent } from './Pages/cart/cart.component';
import { ProductPageComponent } from './Pages/product-page/product-page.component';
import { LoginComponent } from './Pages/auth/login/login.component';
import { SignupComponent } from './Pages/auth/signup/signup.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent
    },
    {
        path:'cart',
        component:CartComponent
    },
    { 
        path: 'product/:productName',
        component: ProductPageComponent 
    },
    {
        path:'auth/login',
        component:LoginComponent
    },
    {
        path:'auth/signup',
        component:SignupComponent
    }
    
];
