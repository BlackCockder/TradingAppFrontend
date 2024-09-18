import {Routes} from "@angular/router";
import {DevComponent} from "./dev/Dev.component";

export const routes: Routes = [
//   {path: 'register', component: RegisterComponent},
//   {path: 'guide', component: SellerGuideComponent},
  {path: '', redirectTo: '/dev', pathMatch: 'full'},
//   {path: 'welcome', component: WelcomeComponent},
//   {path: 'profiles', component: ProfilesComponent},
//   {
//     path: 'market',
//     children:
//       [
//         {
//           path: ':game',
//           component: GameTabComponent,
//           resolve: {
//             game: marketResolver
//           }
//         }
//
//       ], component: MarketComponent
//   },
//   {path: 'dashboard', component: DashboardComponent},
//   {path: 'companies', component: CompaniesComponent},
//   {path: 'home', component: HomeComponent},
//   {path: 'about-us', component: AboutUsComponent},
//   {path: 'contact-us', component: ContactUsComponent},
//   {path: 'help-center', component: HelpCenterComponent},
//   {path: 'news', component: NewsComponent, canActivate: [isAdminGuard]},
//   {path: 'blog', component: BlogComponent},
  {path: 'dev', component: DevComponent},
//   {path: '**', component: Page404Component}
];
