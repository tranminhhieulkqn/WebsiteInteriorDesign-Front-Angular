export class CONFIGS {

  private static host: string = "http://localhost:3000/";

  constructor() { }


  public static get HOST() : string {
    return this.host;
  }


}
