export interface ListingPayload {
  title: String,
  description: String,
  quantity: number,
  price: number,
  isForTrade: boolean,
  isForSale: boolean,
  isNegotiable: boolean,
  isQuickBuy: boolean,
  photosAsMultipart: File[] | null,
  gameName: String,
  categoryName: String
}
