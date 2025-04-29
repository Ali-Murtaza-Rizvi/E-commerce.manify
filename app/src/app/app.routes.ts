import { Routes } from '@angular/router';
import { HomeComponent } from '../app/website-layout/Pages/home/home.component';
import { CartComponent } from '../app/website-layout/Pages/cart/cart.component';
import { ProductPageComponent } from '../app/website-layout/Pages/product-page/product-page.component';
import { LoginComponent } from '../app/website-layout/Pages/auth/login/login.component';
import { SignupComponent } from '../app/website-layout/Pages/auth/signup/signup.component';
import { WebsiteLayoutComponent } from './website-layout/website-layout.component';
import { DashboardComponent } from './admin-layout/dashboard/dashboard.component';
import { AboutUsComponent } from './website-layout/Pages/about-us/about-us.component';

// import { DashboardComponent } from './Pages/admin/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path:'',
        component:WebsiteLayoutComponent,
        children:[
                {
                path:'',
                component:HomeComponent},
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
                },
                { path: 'about', component: AboutUsComponent
                }
            ]
    },
    {
        path:'admin',
        children:[
            {
                path:'dashboard',
                component:DashboardComponent
            }
        ]
    }

];
