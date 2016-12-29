import {ForumOwner} from "./forum-owner";

export class Forum {
  id: number;
  name: string;
  owner: ForumOwner;
  location: string;
  category: string;

  constructor(
    id: number,
    name: string,
    owner: ForumOwner,
    location: string,
    category: string
  ) {
    this.id = id;
    this.name = name;
    this.owner = owner;
    this.location = location;
    this.category = category;
  };

}
