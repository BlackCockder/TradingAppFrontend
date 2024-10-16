export interface ListingPayload {
  title: string,
  description: string,
  quantity: number,
  price: number,
  isForTrade: boolean,
  isForSale: boolean,
  isNegotiable: boolean,
  isQuickBuy: boolean,
  photosAsMultipart: File[] | null,
  gameName: string,
  categoryName: string
}
