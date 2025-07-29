import axios from 'axios';

function createEmojisushiAgent(options) {
    const { service } = options;
    const axiosClient = axios.create({
        baseURL: service,
    });
    const client = axiosClient;
    function log(data, version) {
        axiosClient.post("/log", Object.assign({ version: version, navigator: {
                userAgent: navigator.userAgent,
                online: navigator.onLine,
            } }, data));
    }
    function getProducts(params, axiosConfig = {}) {
        return client.get("products", Object.assign({ params, skipAuthRefresh: true }, axiosConfig));
    }
    function getCategories(params, axiosConfig = {}) {
        return client.get("categories", Object.assign({ params, skipAuthRefresh: true }, axiosConfig));
    }
    function getIngredients(params = {}, axiosConfig = {}) {
        return client.get("ingredients", Object.assign({ params, skipAuthRefresh: true }, axiosConfig));
    }
    function placeOrder(params, axiosConfig = {}) {
        return client.post("order/place", params, axiosConfig);
    }
    function placeOrderV2(params, axiosConfig = {}) {
        return client.post("order/v2/place", params, axiosConfig);
    }
    function getCartProducts(params = {}, axiosConfig = {}) {
        return client
            .get("cart/products", Object.assign({ params, skipAuthRefresh: true }, axiosConfig))
            .then((res) => res.data);
    }
    function addCartProduct(data, axiosConfig = {}) {
        return client
            .post("cart/add", data, Object.assign({ skipAuthRefresh: true }, axiosConfig))
            .then((res) => res.data);
    }
    function removeCartProduct(cart_product_id, axiosConfig = {}) {
        return client
            .post("cart/remove", {
            cart_product_id,
        }, Object.assign({ skipAuthRefresh: true }, axiosConfig))
            .then((res) => res.data);
    }
    function clearCart(data = {}, axiosConfig = {}) {
        return client.post("cart/clear", data, Object.assign({ skipAuthRefresh: true }, axiosConfig));
    }
    function getPaymentMethods(params = {}, axiosConfig = {}) {
        return client.get("payments", Object.assign({ params }, axiosConfig));
    }
    function addWishlistItem(params, axiosConfig = {}) {
        return client.get("wishlist/add", Object.assign({ params }, axiosConfig));
    }
    function getWishlists(params = {}, axiosConfig = {}) {
        return client.get("wishlist/list", Object.assign({ params }, axiosConfig));
    }
    function getShippingMethods(params = {}, axiosConfig = {}) {
        return client.get("shipping", Object.assign({ params }, axiosConfig));
    }
    function getBanners(params = {}, axiosConfig = {}) {
        return client
            .get("banners", Object.assign({ params, skipAuthRefresh: true }, axiosConfig))
            .then((res) => res.data);
    }
    function register(data, axiosConfig = {}) {
        return client.post("auth/register", data, axiosConfig);
    }
    function login(data, axiosConfig = {}) {
        return client.post("auth/login", data, axiosConfig);
    }
    function restorePassword(data, axiosConfig = {}) {
        return client.post("auth/restore-password", data, axiosConfig);
    }
    function resetPassword(data, axiosConfig = {}) {
        return client.post("auth/reset-password", data, axiosConfig);
    }
    function updateUserPassword(data, axiosConfig = {}) {
        return client.post("user/password", data, axiosConfig);
    }
    function fetchUser(params = {}, axiosConfig = {}) {
        return client.get("user", Object.assign({ params }, axiosConfig));
    }
    function updateUser(data, axiosConfig = {}) {
        return client.post("user", data, axiosConfig);
    }
    function updateCustomer(data, axiosConfig = {}) {
        return client.post("user/customer", data, axiosConfig);
    }
    function addAddress(data, axiosConfig = {}) {
        return client.post("user/address", data, axiosConfig);
    }
    function deleteAddress(data, axiosConfig = {}) {
        return client.delete("user/address", Object.assign({ data }, axiosConfig));
    }
    function makeAddressDefault(data, axiosConfig = {}) {
        return client.post("user/address/default", data, axiosConfig);
    }
    const getCitiesDefaults = {
        includeSpots: false,
    };
    function getSpots(params = {}, axiosConfig = {}) {
        return client
            .get("spots", Object.assign({ params, skipAuthRefresh: true }, axiosConfig))
            .then((res) => res.data);
    }
    function getSpot(params, axiosConfig = {}) {
        return client.get("spot", Object.assign({ params, skipAuthRefresh: true }, axiosConfig));
    }
    function getMainSpot(params = {}, axiosConfig = {}) {
        return client.get("spot-main", Object.assign({ skipAuthRefresh: true, params }, axiosConfig));
    }
    function getCity(params, axiosConfig = {}) {
        return client.get("city", Object.assign({ params, skipAuthRefresh: true }, axiosConfig));
    }
    function getMainCity(params = {}, axiosConfig = {}) {
        return client.get("city-main", Object.assign({ skipAuthRefresh: true, params }, axiosConfig));
    }
    function getCities(params = getCitiesDefaults, axiosConfig = {}) {
        return client
            .get("cities", Object.assign({ params, skipAuthRefresh: true }, axiosConfig))
            .then((res) => res.data);
    }
    return {
        axiosClient,
        getProducts,
        getCategories,
        getIngredients,
        placeOrder,
        placeOrderV2,
        getCartProducts,
        addCartProduct,
        removeCartProduct,
        clearCart,
        getPaymentMethods,
        getWishlists,
        addWishlistItem,
        getShippingMethods,
        getBanners,
        register,
        login,
        restorePassword,
        resetPassword,
        updateUserPassword,
        fetchUser,
        updateUser,
        updateCustomer,
        addAddress,
        deleteAddress,
        makeAddressDefault,
        getCity,
        getMainSpot,
        getMainCity,
        getCities,
        getSpot,
        getSpots,
        log,
    };
}

var ShippingMethodCodeEnum;
(function (ShippingMethodCodeEnum) {
    ShippingMethodCodeEnum["Takeaway"] = "takeaway";
    ShippingMethodCodeEnum["Courier"] = "courier";
})(ShippingMethodCodeEnum || (ShippingMethodCodeEnum = {}));
var PaymentMethodCodeEnum;
(function (PaymentMethodCodeEnum) {
    PaymentMethodCodeEnum["Cash"] = "cash";
})(PaymentMethodCodeEnum || (PaymentMethodCodeEnum = {}));
var ORDER_STATES;
(function (ORDER_STATES) {
    ORDER_STATES[ORDER_STATES["NEW"] = 1] = "NEW";
    ORDER_STATES[ORDER_STATES["IN_PROGRESS"] = 2] = "IN_PROGRESS";
    ORDER_STATES[ORDER_STATES["DISPUTED"] = 3] = "DISPUTED";
    ORDER_STATES[ORDER_STATES["CANCELLED"] = 4] = "CANCELLED";
    ORDER_STATES[ORDER_STATES["COMPLETE"] = 5] = "COMPLETE";
})(ORDER_STATES || (ORDER_STATES = {}));

export { PaymentMethodCodeEnum, ShippingMethodCodeEnum, createEmojisushiAgent };
