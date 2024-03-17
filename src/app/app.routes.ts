import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { FolderContentPageComponent } from './Pages/folder-content-page/folder-content-page.component';
import { MatchesComponent } from './Components/matches/matches.component';
import { FaqComponent } from './Pages/faq/faq.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'folder-content-page/:folderId/:folderName',
    component: FolderContentPageComponent,
  },
  {
    path: 'matches',
    component: MatchesComponent,
  },
  {
    path: '',
    component: FaqComponent,
  },
];
