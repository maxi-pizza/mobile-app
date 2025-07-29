import { AxiosResponse } from "axios";
import { IGetProductsParams, IGetProductsRes, AxiosAuthRefreshRequestConfig, IGetCategoriesParams, IGetCategoriesRes, IGetCartRes, IGetPaymentMethodsRes, IGetWishlistRes, IGetShippingMethodsRes, IGetBannersRes, RegisterResData, LoginResData, IAddress, IGetCitiesParams, IGetSpotsRes, ISpot, ICity, IGetCitiesRes } from "./types";
export declare function createEmojisushiAgent(options: {
    service: string;
}): {
    axiosClient: import("axios").AxiosInstance;
    getProducts: (params: IGetProductsParams, axiosConfig?: AxiosAuthRefreshRequestConfig) => Promise<AxiosResponse<IGetProductsRes, any>>;
    getCategories: (params: IGetCategoriesParams, axiosConfig?: AxiosAuthRefreshRequestConfig) => Promise<AxiosResponse<IGetCategoriesRes, any>>;
    getIngredients: (params?: {}, axiosConfig?: AxiosAuthRefreshRequestConfig) => Promise<AxiosResponse<any, any>>;
    placeOrder: (params: {
        phone: string;
        firstname?: string;
        lastname?: string;
        email?: string;
        shipping_method_id: number;
        payment_method_id: number;
        spot_id: number;
        address?: string;
        comment?: string;
        sticks?: number;
        change?: string;
    }, axiosConfig?: AxiosAuthRefreshRequestConfig) => Promise<AxiosResponse<any, any>>;
    placeOrderV2: (params: {
        phone: string;
        firstname?: string;
        lastname?: string;
        email?: string;
        shipping_method_id: number;
        payment_method_id: number;
        spot_id: number;
        address?: string;
        comment?: string;
        sticks?: number;
        change?: string;
        cart: {
            items: {
                id: string;
                variant_id?: string;
                quantity: number;
            }[];
        };
        bonuses_to_use?: number;
    }, axiosConfig?: AxiosAuthRefreshRequestConfig) => Promise<AxiosResponse<any, any>>;
    getCartProducts: (params?: {}, axiosConfig?: AxiosAuthRefreshRequestConfig) => Promise<IGetCartRes>;
    addCartProduct: (data: {
        product_id: number;
        variant_id?: number;
        quantity: number;
    }, axiosConfig?: AxiosAuthRefreshRequestConfig) => Promise<IGetCartRes>;
    removeCartProduct: (cart_product_id: string, axiosConfig?: AxiosAuthRefreshRequestConfig) => Promise<IGetCartRes>;
    clearCart: (data?: {}, axiosConfig?: AxiosAuthRefreshRequestConfig) => Promise<AxiosResponse<IGetCartRes, any>>;
    getPaymentMethods: (params?: {}, axiosConfig?: AxiosAuthRefreshRequestConfig) => Promise<AxiosResponse<IGetPaymentMethodsRes>>;
    getWishlists: (params?: {}, axiosConfig?: AxiosAuthRefreshRequestConfig) => Promise<AxiosResponse<IGetWishlistRes, any>>;
    addWishlistItem: (params: {
        product_id: number;
        quantity?: number | null;
    }, axiosConfig?: AxiosAuthRefreshRequestConfig) => Promise<AxiosResponse<any, any>>;
    getShippingMethods: (params?: {}, axiosConfig?: AxiosAuthRefreshRequestConfig) => Promise<AxiosResponse<IGetShippingMethodsRes>>;
    getBanners: (params?: {}, axiosConfig?: AxiosAuthRefreshRequestConfig) => Promise<IGetBannersRes>;
    register: (data: {
        email: string;
        password: string;
        password_confirmation: string;
        name: string;
        surname: string;
        activate: boolean;
        auto_login: boolean;
        agree: boolean;
    }, axiosConfig?: AxiosAuthRefreshRequestConfig) => Promise<AxiosResponse<RegisterResData, any>>;
    login: (data: {
        email: string;
        password: string;
    }, axiosConfig?: AxiosAuthRefreshRequestConfig) => Promise<AxiosResponse<LoginResData, any>>;
    restorePassword: (data: {
        email: string;
        redirect_url: string;
    }, axiosConfig?: AxiosAuthRefreshRequestConfig) => Promise<AxiosResponse<any, any>>;
    resetPassword: (data: {
        code: string;
        password: string;
    }, axiosConfig?: AxiosAuthRefreshRequestConfig) => Promise<AxiosResponse<any, any>>;
    updateUserPassword: (data: {
        password_old: string;
        password: string;
        password_confirmation: string;
    }, axiosConfig?: AxiosAuthRefreshRequestConfig) => Promise<AxiosResponse<any, any>>;
    fetchUser: (params?: {}, axiosConfig?: AxiosAuthRefreshRequestConfig) => Promise<AxiosResponse<import("./types").IUser, any>>;
    updateUser: (data: {
        name?: string;
        surname?: string;
        phone?: string;
    }, axiosConfig?: AxiosAuthRefreshRequestConfig) => Promise<AxiosResponse<any, any>>;
    updateCustomer: (data: {
        firstname?: string;
        lastname?: string;
    }, axiosConfig?: AxiosAuthRefreshRequestConfig) => Promise<AxiosResponse<any, any>>;
    addAddress: (data: {
        name: string;
        lines: string;
        zip: string;
        city: string;
        two_letters_country_code?: string;
    }, axiosConfig?: AxiosAuthRefreshRequestConfig) => Promise<AxiosResponse<IAddress, any>>;
    deleteAddress: (data: {
        id: number;
    }, axiosConfig?: AxiosAuthRefreshRequestConfig) => Promise<AxiosResponse<any, any>>;
    makeAddressDefault: (data: {
        id: number;
    }, axiosConfig?: AxiosAuthRefreshRequestConfig) => Promise<AxiosResponse<any, any>>;
    getCity: (params: {
        slug_or_id: string | number;
    }, axiosConfig?: AxiosAuthRefreshRequestConfig) => Promise<AxiosResponse<ICity, any>>;
    getMainSpot: (params?: {}, axiosConfig?: AxiosAuthRefreshRequestConfig) => Promise<AxiosResponse<ISpot, any>>;
    getMainCity: (params?: {}, axiosConfig?: AxiosAuthRefreshRequestConfig) => Promise<AxiosResponse<ICity, any>>;
    getCities: (params?: IGetCitiesParams, axiosConfig?: AxiosAuthRefreshRequestConfig) => Promise<IGetCitiesRes>;
    getSpot: (params: {
        slug_or_id: string | number;
    }, axiosConfig?: AxiosAuthRefreshRequestConfig) => Promise<AxiosResponse<ISpot, any>>;
    getSpots: (params?: {}, axiosConfig?: AxiosAuthRefreshRequestConfig) => Promise<IGetSpotsRes>;
    log: (data: any, version: string) => void;
};
//# sourceMappingURL=emojisushi-agent.d.ts.map