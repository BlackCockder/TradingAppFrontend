import {Routes} from "@angular/router";
import {DevComponent} from "../dev/Dev.component";
import {DashboardComponent} from "../features/dashboard/Dashboard.component";
import {CompanyComponent} from "../features/dashboard/components/company/Company.component";
import {CreatorComponent} from "../features/dashboard/components/creator/Creator.component";
import {dashboardGuard} from "../auth/routeGuards/Dashboard.guard";
import {RegisterComponent} from "../features/register/Register.component";
import {GuideComponent} from "../features/guide/Guide.component";
import {CompaniesComponent} from "../features/companies/Companies.component";
import {AboutUsComponent} from "../features/aboutUs/AboutUs.component";
import {ContactUsComponent} from "../features/contactUs/ContactUs.component";
import {HelpCenterComponent} from "../features/helpCenter/HelpCenter.component";
import {BlogComponent} from "../features/blog/Blog.component";
import {Page404Component} from "../shared/components/page404/Page404.component";
import {ProfilesComponent} from "../features/profiles/Profiles.component";
import {MarketComponent} from "../features/market/Market.component";
import {GameComponent} from "../features/market/components/game/Game.component";
import {ItemsComponent} from "../features/market/components/game/components/items/Items.component";
import {CurrenciesComponent} from "../features/market/components/game/components/currencies/Currencies.component";
import {AccountsComponent} from "../features/market/components/game/components/accounts/Accounts.component";
import {ServicesComponent} from "../features/market/components/game/components/services/Services.component";
import {gameResolver} from "../features/market/resolvers/Game.resolver";
import {OfferComponent} from "../features/market/components/offer/Offer.component";
import {OfferResolver} from "../features/market/components/offer/resolvers/Offer.resolver"
import {MyBusinessComponent} from "../features/dashboard/components/myBusiness/MyBusiness.component";
import {MyOrdersComponent} from "../features/dashboard/components/my-orders/my-orders.component";
import {DisputesComponent} from "../features/dashboard/components/disputes/Disputes.component";
import {ProfileSettingsComponent} from "../features/dashboard/components/profileSettings/ProfileSettings.component";
import {AutomationAPIComponent} from "../features/dashboard/components/automationAPI/AutomationAPI.component";

export const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'guide', component: GuideComponent},
  {path: '', redirectTo: '/dev', pathMatch: 'full'},
  {path: 'profiles', component: ProfilesComponent},
  {
    path: 'market',
    children: [
        {
          path: ':game',
          component: GameComponent,
          resolve: {
            game: gameResolver
          },
          children: [
            {
              path: 'items',
              component: ItemsComponent,
              children: [
                {
                  path: ':offerId',
                  component: OfferComponent,
                  resolve: {
                    offerId: OfferResolver
                  }
                }
              ]
            },
            {
              path: 'currencies',
              component: CurrenciesComponent,
              children: [
                {
                  path: ':offerId',
                  component: OfferComponent,
                  resolve: {
                    offerId: OfferResolver
                  }
                }
              ]
            },
            {
              path: 'accounts',
              component: AccountsComponent,
              children: [
                {
                  path: ':offerId',
                  component: OfferComponent,
                  resolve: {
                    offerId: OfferResolver
                  }
                }
              ]
            },
            {
              path: 'services',
              component: ServicesComponent,
              children: [
                {
                  path: ':offerId',
                  component: OfferComponent,
                  resolve: {
                    offerId: OfferResolver
                  }
                }
              ]
            }

          ]
        }
        ],
    component: MarketComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [dashboardGuard],
    children: [
      {
        path: 'my-business',
        component: MyBusinessComponent
      },
      {
        path: 'my-orders',
        component: MyOrdersComponent
      },
      {
        path: 'disputes',
        component: DisputesComponent
      },
      {
        path: 'creator',
        component: CreatorComponent
      },
      {
        path: 'company',
        component: CompanyComponent
      },
      {
        path: 'profile-and-settings',
        component: ProfileSettingsComponent
      },
      {
        path: 'automation-and-api',
        component: AutomationAPIComponent
      }
    ]
  },
  {path: 'companies', component: CompaniesComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'contact-us', component: ContactUsComponent},
  {path: 'help-center', component: HelpCenterComponent},
  {path: 'blog', component: BlogComponent},
  {path: 'dev', component: DevComponent},
  {path: '**', component: Page404Component}
];
