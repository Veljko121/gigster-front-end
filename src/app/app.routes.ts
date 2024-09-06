import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegistrationComponent } from './components/auth/registration/registration.component';
import { HomeComponent } from './components/layout/home/home.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { SearchPageComponent } from './components/search/search-page/search-page.component';

export const routes: Routes = [
    { path: '', redirectTo: 'search', pathMatch: 'full' },
    { path: 'home', redirectTo: '', pathMatch: 'full' },
    { path: 'register', component: RegistrationComponent },
    { path: 'login', component: LoginComponent },
    { path: 'profile', component: UserProfileComponent },
    { path: 'search', component: SearchPageComponent },
];
