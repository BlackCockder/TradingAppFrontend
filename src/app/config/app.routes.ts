import {Routes} from "@angular/router";
import {DevComponent} from "../dev/Dev.component";
import {DashboardComponent} from "../features/dashboard/Dashboard.component";
import {ManagementComponent} from "../features/dashboard/components/management/management.component";
import {OffersComponent} from "../features/dashboard/components/offers/offers.component";
import {ServicesComponent} from "../features/dashboard/components/services/services.component";
import {ClientPanelComponent} from "../features/dashboard/components/client-panel/client-panel.component";
import {CompanyComponent} from "../features/dashboard/components/company/company.component";
import {SocialComponent} from "../features/dashboard/components/social/social.component";
import {AccountComponent} from "../features/dashboard/components/account/account.component";
import {SettingsComponent} from "../features/dashboard/components/settings/settings.component";
import {CreatorComponent} from "../features/dashboard/components/creator/creator.component";
import {dashboardGuard} from "../auth/routeGuards/Dashboard.guard";
import {balancesResolver} from "../features/dashboard/components/dashboardHeader/resolvers/balances.resolver";
import {RegisterComponent} from "../features/register/register.component";

export const routes: Routes = [
  {path: 'register', component: RegisterComponent},
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
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [dashboardGuard],
    resolve: {balanceData: balancesResolver},
    children: [
      {
        path: 'management',
        component: ManagementComponent
      },
      {
        path: 'offers',
        component: OffersComponent
      },
      {
        path: 'services',
        component: ServicesComponent
      },
      {
        path: 'creator',
        component: CreatorComponent
      },
      {
        path: 'client-panel',
        component: ClientPanelComponent
      },
      {
        path: 'company',
        component: CompanyComponent
      },
      {
        path: 'social',
        component: SocialComponent
      },
      {
        path: 'account',
        component: AccountComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      }
    ]
  },
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
