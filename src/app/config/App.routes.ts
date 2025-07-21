import {Routes} from "@angular/router";
import {DevComponent} from "../dev/Dev.component";
import {DashboardComponent} from "../features/dashboard/Dashboard.component";
import {ManagementComponent} from "../features/dashboard/components/management/management.component";
import {OffersComponent} from "../features/dashboard/components/offers/offers.component";
import {ClientPanelComponent} from "../features/dashboard/components/client-panel/client-panel.component";
import {CompanyComponent} from "../features/dashboard/components/company/company.component";
import {SocialComponent} from "../features/dashboard/components/social/social.component";
import {AccountComponent} from "../features/dashboard/components/account/account.component";
import {SettingsComponent} from "../features/dashboard/components/settings/settings.component";
import {CreatorComponent} from "../features/dashboard/components/creator/creator.component";
import {dashboardGuard} from "../auth/routeGuards/Dashboard.guard";
import {balancesResolver} from "../features/dashboard/components/dashboardHeader/resolvers/balances.resolver";
import {RegisterComponent} from "../features/register/Register.component";
import {GuideComponent} from "../features/guide/Guide.component";
import {CompaniesComponent} from "../features/companies/Companies.component";
import {AboutUsComponent} from "../features/aboutUs/AboutUs.component";
import {ContactUsComponent} from "../features/contactUs/ContactUs.component";
import {HelpCenterComponent} from "../features/helpCenter/HelpCenter.component";
import {BlogComponent} from "../features/blog/Blog.component";
import {Page404Component} from "../shared/components/page404/page404.component";
import {ProfilesComponent} from "../features/profiles/Profiles.component";
import {MarketComponent} from "../features/market/Market.component";
import {GameComponent} from "../features/market/components/game/Game.component";
import {ItemsComponent} from "../features/market/components/game/components/items/Items.component";
import {CurrenciesComponent} from "../features/market/components/game/components/currencies/Currencies.component";
import {AccountsComponent} from "../features/market/components/game/components/accounts/Accounts.component";
import {ServicesComponent} from "../features/market/components/game/components/services/Services.component";
import {gameResolver} from "../features/market/resolvers/Game.resolver";
import {OfferComponent} from "../features/market/components/offer/Offer.component";

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
  {path: 'companies', component: CompaniesComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'contact-us', component: ContactUsComponent},
  {path: 'help-center', component: HelpCenterComponent},
  {path: 'blog', component: BlogComponent},
  {path: 'dev', component: DevComponent},
  {path: '**', component: Page404Component}
];
