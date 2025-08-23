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
  weight: string;
  price: string;
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


export type IWishlistItem = {
  id: number;
  wishlist_id: number;
  product_id: number;
  variant_id: null | number;
  quantity: number;
  created_at: string;
  updated_at: string;
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



export type IRainLabUser = {
  id: number;
  name: Nullable<string>;
  email: string;
  permissions: Nullable<string>;
  is_activated: boolean;
  activated_at: Nullable<string>;
  last_login: Nullable<string>;
  created_at: Nullable<string>;
  updated_at: Nullable<string>;
  username: Nullable<string>;
  surname: Nullable<string>;
  deleted_at: Nullable<string>;
  last_seen: Nullable<string>;
  is_guest: 0 | 1;
  is_superuser: 0 | 1;
  created_ip_address: Nullable<string>;
  last_ip_address: Nullable<string>;
};


export type IOrderCurrency = {
  id: number;
  code: string;
  symbol: string;
  rate: number;
  decimals: number;
  format: string;
  sort_order: number;
  is_default: boolean;
  created_at: string;
  updated_at: string;
  rounding: unknown; // todo: check type
};

export type IOrderProduct = {
  id: number;
  order_id: number;
  product_id: number;
  variant_id: Nullable<number>;
  name: string;
  variant_name: Nullable<string>;
  description: Nullable<string>;
  quantity: number;
  price_pre_taxes: number;
  price_taxes: number;
  price_post_taxes: number;
  total_pre_taxes: number;
  total_taxes: number;
  total_post_taxes: number;
  tax_factor: number;
  weight: Nullable<number>;
  width: Nullable<number>;
  length: Nullable<number>;
  height: Nullable<number>;
  total_weight: Nullable<number>;
  stackable: boolean;
  shippable: boolean;
  property_values: Nullable<any[]>; // jsonable
  property_description: Nullable<any[]>; //  jsonable
  service_options: Nullable<any[]>; // jsonable
  custom_field_values: any[]; // jsonable
  brand: Nullable<any[]>;
  taxes: any[]; // jsonable
  item: IProduct & {
    price: IPrice;
  };
  created_at: Nullable<string>;
  updated_at: Nullable<string>;
  deleted_at: Nullable<string>;
  product: IProduct;
};

enum ORDER_STATES {
  NEW = 1,
  IN_PROGRESS = 2,
  DISPUTED = 3,
  CANCELLED = 4,
  COMPLETE = 5,
}

export type IOrder = {
  id: number;
  session_id: Nullable<string>;
  order_number: Nullable<number>;
  invoice_number: Nullable<string>;
  currency: IOrderCurrency;
  payment_state: string;
  order_state_id: ORDER_STATES;
  shipping_address_same_as_billing: Nullable<boolean>;
  custom_fields: any[]; //jsonable
  shipping: null | {
    method: IShippingMethod; // todo: extend this type
    preTaxes: number;
    taxes: number;
    total: number;
    appliedDiscount: unknown; // todo: check type
  };
  taxes: any[]; // jsonable
  payment: {
    method: IPaymentMethod;
    preTaxes: number;
    taxes: number;
    total: number;
  };
  discounts: any[]; // jsonable
  payment_method_id: Nullable<number>;
  payment_id: Nullable<string>;
  payment_hash: Nullable<string>;
  total_shipping_pre_taxes: Nullable<number>;
  total_shipping_taxes: Nullable<number>;
  total_shipping_post_taxes: Nullable<number>;
  total_payment_pre_taxes: Nullable<number>;
  total_payment_taxes: Nullable<number>;
  total_payment_post_taxes: Nullable<number>;
  total_product_pre_taxes: Nullable<number>;
  total_product_taxes: Nullable<number>;
  total_product_post_taxes: Nullable<number>;
  total_taxes: Nullable<number>;
  total_pre_payment: Nullable<number>;
  total_pre_taxes: Nullable<number>;
  total_post_taxes: Nullable<number>;
  tracking_number: Nullable<string>;
  tracking_url: Nullable<string>;
  is_virtual: 0 | 1;
  credit_card_last4_digits: Nullable<number>;
  card_holder_name: Nullable<string>;
  card_type: Nullable<string>;
  lang: string;
  total_weight: Nullable<number>;
  customer_notes: Nullable<string>;
  admin_notes: Nullable<string>;
  payment_transaction_id: Nullable<string>;
  ip_address: Nullable<string>;
  customer_id: Nullable<number>;
  paid_at: Nullable<string>;
  delete_at: Nullable<string>;
  updated_at: Nullable<string>;
  shipped_at: Nullable<string>;
  spot_id: Nullable<number>;
  customer_payment_method_id: Nullable<number>;
  products: IOrderProduct[];
  order_state: IOrderState;
};

export type IOrderState = {
  id: number;
  name: string;
  description: string;
  color: string;
  sort_order: number;
  flag: string;
  created_at: Nullable<string>;
  updated_at: Nullable<string>;
  deleted_at: Nullable<string>;
};

export type ICustomer = {
  firstname: string;
  lastname: string;
  is_guest: boolean;
  default_shipping_address_id: number | null;
  default_billing_address_id: number | null;
  orders: IOrder[];
};

export type IUser = IRainLabUser & {
  offline_mall_customer_group_id: number | null;
  phone: string | null;
  customer: ICustomer | null;
  is_call_center_admin: boolean;
  bonus_amount: number;
};

export type RegisterResData = {
  data: {
    expires: string;
    token: string;
    user: IUser;
  };
};

export type LoginResData = {
  data: {
    user: IUser;
    expires: string;
    token: string;
  };
};

export type IFetchUserResData = IUser;

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
