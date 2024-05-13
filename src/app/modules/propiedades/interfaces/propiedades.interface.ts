export default interface Propiedad {
  id?: string | null | undefined;
  baths?: number | null | undefined;
  beds?: number | null | undefined;
  transactionType: string | null | undefined;
  dimension?: number | null | undefined;
  description?: string | null | undefined;
  imgUrl: string | null | undefined;
  imgUrls: string[] | null | undefined;
  isActive: string | null | undefined;
  locationCoords: Coords | null | undefined;
  isOffer?: boolean | null | undefined;
  isSold?: boolean | null | undefined;
  priceMonth?: number | null | undefined;
  priceSale?: number | null | undefined;
  type: string | null | undefined;
  title: string | null | undefined;
  viewTitle: string | null | undefined;
  city: string | null | undefined;
  state: string | null | undefined;
}

interface Coords {
  lat: number | null | undefined;
  lng: number | null | undefined;
}

