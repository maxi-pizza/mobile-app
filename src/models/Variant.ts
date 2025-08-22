import { IVariant } from '~/api';


export class Variant {
  json: IVariant;
  constructor(json: IVariant) {
    this.json = json;
  }

  get id() {
    return this.json.id;
  }

  get additionalPrices() {
    return this.json.additional_prices || [];
  }

  get propertyValues() {
    return this.json.property_values || [];
  }

  get posterId() {
    return this.json.poster_id;
  }

  get prices() {
    return this.json.prices || [];
  }

  get oldPrice() {
    return this.additionalPrices.length > 0
        ? this.additionalPrices[0]
        : undefined;
  }

  get newPrice() {
    return this.prices.length > 0 ? this.prices[0] : undefined;
  }
}
