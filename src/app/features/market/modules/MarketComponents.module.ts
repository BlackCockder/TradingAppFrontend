import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GameComponent} from "../components/game/Game.component";
import {OfferComponent} from "../components/offer/Offer.component";
import {AccountsComponent} from "../components/game/components/accounts/Accounts.component";
import {CurrenciesComponent} from "../components/game/components/currencies/Currencies.component";
import {ItemsComponent} from "../components/game/components/items/Items.component";
import {ServicesComponent} from "../components/game/components/services/Services.component";



@NgModule({
  declarations: [
    GameComponent,
    OfferComponent,
    AccountsComponent,
    CurrenciesComponent,
    ItemsComponent,
    ServicesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MarketComponentsModule { }
