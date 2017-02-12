import { Injectable } from '@angular/core';

@Injectable()
export class ConfigurationService {

  constructor() { }

  public get orderUrl(): string {
    return this.baseUrl + 'Order';
  }

  public get orderSynchUrl(): string {
    return this.baseUrl + 'OrderSynch';
  }

  public get productUrl(): string {
    return this.baseUrl + 'Product';
  }

  public get productSynchUrl(): string {
    return this.baseUrl + 'ProductSynch';
  }

  public get inventoryUrl(): string {
    return this.baseUrl + 'Inventory';
  }

  public get dashboardUrl(): string {
    return this.baseUrl + 'Dashboard';
  }

  private get baseUrl(): string {
      return 'http://fakesynchhub.azurewebsites.net/api/';
  }
}
