import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr'
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { LoaderComponent } from './components/loader/loader.component';

import { HttpInterceptorProviders } from './interceptors/http.interceptors';
import { LoaderService } from './services/loader.service';
import { AuthHomeComponent } from './components/auth-home/auth-home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CountdownComponent } from './components/countdown/countdown.component';
import { MonthlyExpensesComponent } from './components/monthly-expenses/monthly-expenses.component';
import { DailyExpensesComponent } from './components/daily-expenses/daily-expenses.component';
import { ReportsComponent } from './components/reports/reports.component';
import { SinglePeriodComponent } from './components/single-period/single-period.component';
import { ComparisonComponent } from './components/comparison/comparison.component';
import { SearchComponent } from './components/search/search.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { OverviewComponent } from './components/overview/overview.component';
import { ErrorComponent } from './components/error/error.component';
import { AddMonthlyDataComponent } from './components/add-monthly-data/add-monthly-data.component';
import { UpdateMonthlyDataComponent } from './components/update-monthly-data/update-monthly-data.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    LoaderComponent,
    AuthHomeComponent,
    SidebarComponent,
    HeaderComponent,
    DashboardComponent,
    CountdownComponent,
    MonthlyExpensesComponent,
    DailyExpensesComponent,
    ReportsComponent,
    SinglePeriodComponent,
    ComparisonComponent,
    SearchComponent,
    PasswordResetComponent,
    OverviewComponent,
    ErrorComponent,
    AddMonthlyDataComponent,
    UpdateMonthlyDataComponent,
    ImageUploadComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    NgxMyDatePickerModule.forRoot(),
    ChartsModule,
    AppRoutingModule,
  ],
  providers: [
              LoaderService,
              HttpInterceptorProviders
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
