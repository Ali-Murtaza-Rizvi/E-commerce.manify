import { Routes } from '@angular/router';
import { HomeComponent } from '../app/website-layout/Pages/home/home.component';
import { CartComponent } from '../app/website-layout/Pages/cart/cart.component';
import { ProductPageComponent } from '../app/website-layout/Pages/product-page/product-page.component';
import { LoginComponent } from '../app/website-layout/Pages/auth/login/login.component';
import { SignupComponent } from '../app/website-layout/Pages/auth/signup/signup.component';
import { WebsiteLayoutComponent } from './website-layout/website-layout.component';
import { AboutUsComponent } from './website-layout/Pages/about-us/about-us.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { OrdersComponent } from './admin-layout/orders/orders.component';
import { ProductsComponent } from './admin-layout/products/products.component';
import { ReviewsComponent } from './admin-layout/reviews/reviews.component';
import { ContactUSComponent } from './website-layout/Pages/contact-us/contact-us.component';
import { ShopComponent } from './website-layout/Pages/shop/shop.component';
import { Component } from '@angular/core';
import { UserProductsComponent } from './website-layout/Pages/shop/user-products/user-products.component';
import { PaymentComponent } from './website-layout/Pages/cart/checkout/payment/payment.component';


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
                    path: 'cart/payment',
                    component: PaymentComponent
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
                {   path: 'about',
                    component: AboutUsComponent
                },
                { path: 'contact',
                    component: ContactUSComponent
                },
                {
                    path: 'shop',
                    component:ShopComponent,
                    children:[
                        {
                            path:'product',component:UserProductsComponent // change it to correct the name 
                        }
                    ]
                }
            ]
    },
    {
        path:'admin',
        component:AdminLayoutComponent,
        children: [
            { path: 'products', component: ProductsComponent },
            { path: 'orders', component: OrdersComponent },
            { path: 'reviews', component: ReviewsComponent },
            { path: '', redirectTo: 'products', pathMatch: 'full' },
          ]

    }

];
