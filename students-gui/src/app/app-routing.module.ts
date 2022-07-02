import { AuthGuard } from './Guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { StudentComponent } from './student/student.component';
import { ClassesComponent } from './components/classes/classes.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { ClassesDetailsComponent } from './components/classes-details/classes-details.component';
import { TeacherDetailsComponent } from './components/teacher-details/teacher-details.component';
import { TeachersComponent } from './components/teachers/teachers.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'students', component: StudentComponent, canActivate: [AuthGuard] },
  { path: 'classes', component: ClassesComponent, canActivate: [AuthGuard] },
  { path: 'teachers', component: TeachersComponent, canActivate: [AuthGuard] },
  {
    path: 'student-details/:id',
    component: StudentDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'classes-details/:id',
    component: ClassesDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'teacher-details/:id',
    component: TeacherDetailsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
