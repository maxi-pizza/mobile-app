import {AxiosRequestConfig} from 'axios';


export type Nullable<Type> = Type | null;

export type ICategory = {
  id: number;
  name: string;
  slug: string;
  products: IProduct[]
  image: string | null;
};

export type IOption = {
  value: string;
  poster_id: string;
};

export type IProperty = {
  id: number;
  name: string;
  slug: string;
  type: string;
  unit: Nullable<string>;
  options: IOption[];
  created_at: Nullable<string>;
  updated_at: Nullable<string>;
  deleted_at: Nullable<string>;
  poster_id: number;
};

export type IPropertyValue = {
  id: number;
  product_id: number;
  variant_id: Nullable<number>;
  property_id: number;
  value: boolean;
  index_value: string;
  created_at: Nullable<string>;
  updated_at: Nullable<string>;
  property: IProperty;
};

export type IVariant = {
  id: number;
  product_id: number;
  user_defined_id: Nullable<number>;
  image_set_id: Nullable<number>;
  stock: Nullable<number>;
  reviews_rating: Nullable<string>;
  name: string;
  weight: Nullable<number>;
  length: Nullable<number>;
  width: Nullable<number>;
  height: Nullable<number>;
  published: boolean;
  sales_count: number;
  allow_out_of_stock_purchases: boolean;
  created_at: Nullable<string>;
  updated_at: Nullable<string>;
  deleted_at: Nullable<string>;
  mpn: Nullable<string>;
  gtin: Nullable<string>;
  description_short: Nullable<string>;
  description: Nullable<string>;
  poster_id: Nullable<number>;
  hashid: string;
  product: IProduct;
  prices: IPrice[];
  property_values: IPropertyValue[];
  additional_prices: IPrice[];
};

type IProductImage = {
  id: number
  product_id: number;
  full: string;
  created_at: string;
  updated_at: string;
};

export type IProduct = {
  id: number;
  slug: string;
  name: string;
  image: string | null;
  description: null | string;
  weight: string | null;
  price: string | null;
  unit: string;
  sort_order: number;
  hidden:boolean;
  created_at: string;
  updated_at: string;
  poster_id: number;
  poster_modificator_id: null | number;
  images: IProductImage[]
}


export type IGetDataRes = {
  categories: ICategory[];
  banners: Banner[];
  payment_methods: IPaymentMethod[];
  shipping_methods: IShippingMethod[];
}



export type IPaymentMethod = {
  id: number;
  name: string;
  price: number | null;
  hidden: boolean;
  updated_at: string;
  created_at: string;
};


export type ICurrency = {
  id: number;
  code: string;
  symbol: string;
  rate: number;
  decimals: number;
};

export type IPrice = {
  id: number;
  price: number;
  price_formatted: string;
  currency: ICurrency;
  category: Nullable<{
    sort_order: number;
    code: string;
  }>;
};

export type IShippingMethod = {
  id: number;
  name: string;
  price: number | null;
  hidden: boolean;
  updated_at: string;
  created_at: string;
};


export type Banner = {
  id: number;
  name: string;
  slug: string;
  image: string;
  hidden: false;
  created_at: string;
  updated_at: string;
};



export type IUser ={
  name : string;
  email: string;
  phone: string;
  updated_at: string;
  created_at: string;
  id: number
  bonus_amount: string;
};

export type RegisterResData = {
  token: string;
  user: IUser;
};

export type LoginResData = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

export type IMeResData = IUser;

export type AxiosAuthRefreshRequestConfig = AxiosRequestConfig & {
  skipAuthRefresh?: boolean;
};

export type IBonusHistory = {
  id: number;
  order_id: number;
  user_id: number;
  use_bonus_amount: number;
  receive_bonus_amount: number;
  created_at: string;
  updated_at: string;
};

export type IGetBonusHistoryRes = IBonusHistory[];

export type IGetBonusOptionsRes = {
  bonus_enabled: boolean;
  bonus_rate: number;
  max_bonus: number;
  get_bonus_from_used_bonus: boolean;
};

export type IGetAppAllowedVersionsRes = {
  android: string;
  ios: string;
  android_link: string;
  ios_link: string;
};

export type IGetContacts = {
  instagram_display_text: string;
  instagram_app: string;
  instagram_web: string;
  phones: string[];
};
