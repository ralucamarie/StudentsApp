import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './Guards/auth.guard';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentComponent } from './student/student.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { StudentSearchComponent } from './student-search/student-search.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClassesComponent } from './components/classes/classes.component';

import { StudentClassesComponent } from './components/student-classes/student-classes.component';
import { ClassesDetailsComponent } from './components/classes-details/classes-details.component';
import { ClassStudentsComponent } from './components/class-students/class-students.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { TeacherDetailsComponent } from './components/teacher-details/teacher-details.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { TeacherClassesComponent } from './components/teacher-classes/teacher-classes.component';

export function tokenGetter() {
  return localStorage.getItem('jwt');
}
@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    LoginComponent,
    HomeComponent,
    StudentSearchComponent,
    StudentDetailsComponent,
    DashboardComponent,
    ClassesComponent,
    TeachersComponent,
    StudentClassesComponent,
    ClassesDetailsComponent,
    ClassStudentsComponent,
    TeacherDetailsComponent,
    TeacherClassesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:7029'],
        disallowedRoutes: [],
      },
    }),
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}

//RouterModule.forRoot(ROUTES),
