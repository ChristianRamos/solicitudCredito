import { Injectable } from '@angular/core';

@Injectable()
export class ENV {
  private main: string = "production";

  private development: any =
    {
      API_URL: "http://192.168.1.210/Api"
    };
  private testing: any =
    {
      API_URL: "http://192.168.1.210/Api"
    };

  private acceptance: any;
  private production: any=
    {
      API_URL: "https://testbankapi.firebaseio.com/clients.json"
    };

  constructor() {
  }

  public getEnv () {
    if ( this.main == "development" )
      return this.development;
    if ( this.main == "testing" )
      return this.testing;
    if ( this.main == "acceptance" )
      return this.acceptance;
    if ( this.main == "production" )
      return this.production;
  }
}
