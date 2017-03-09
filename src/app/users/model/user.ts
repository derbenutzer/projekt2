import {Post} from "../../posts/model/post";

export class User {

  private authId:string;
  registeredFor:string[];


  public getAuthId(): string {
    return this.authId;
  }

}
