import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientEditComponent } from './client-edit/client-edit.component';
import { ClientsComponent } from './clients/clients.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrderEditComponent } from './order-edit/order-edit.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductsComponent } from './products/products.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'users', component: UsersComponent},
  { path: 'login', component: LoginComponent},
  { path: 'users/new', component: UserEditComponent},
  { path: 'users/:id', component: UserEditComponent},
  { path: 'products', component: ProductsComponent},
  { path: 'products/new', component: ProductEditComponent},
  { path: 'products/:id', component: ProductEditComponent},
  { path: 'clients', component: ClientsComponent},
  { path: 'clients/new', component: ClientEditComponent},
  { path: 'clients/:id', component: ClientEditComponent},
  { path: 'orders', component: OrdersComponent},
  { path: 'orders/new', component: OrderEditComponent},
  { path: 'orders/:id', component: OrderEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
