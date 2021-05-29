import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TitleComponent } from './title/title.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { UsersComponent } from './users/users.component';
import { LoginService } from 'src/services/login.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { UserService } from 'src/services/user.service';
import { UserEditComponent } from './user-edit/user-edit.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductsComponent } from './products/products.component';
import { ClientsComponent } from './clients/clients.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductService } from './services/product.service';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ClientService } from './services/client.service';
import { OrderService } from './services/order.service';
import { ClientEditComponent } from './client-edit/client-edit.component';
import { OrderEditComponent } from './order-edit/order-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    NavigationComponent,
    LoginComponent,
    FooterComponent,
    UsersComponent,
    HomeComponent,
    UserEditComponent,
    ProductsComponent,
    ClientsComponent,
    OrdersComponent,
    ProductEditComponent,
    ClientEditComponent,
    OrderEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [LoginService, UserService, ProductService, ClientService, OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
