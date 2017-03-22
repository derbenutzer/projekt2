import {User} from "../../users/model/user";

export class Institution extends User{
  _id:string;
  isInstitution:boolean = true;
  institutionName:string;
  isVerified: boolean;
  ownerOf: string[];
}
