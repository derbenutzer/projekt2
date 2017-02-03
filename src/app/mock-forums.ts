
import { Forum } from './forum';
import {ForumList} from "./forum-list";


let forums: Forum[] = [
  new Forum('Mr. Nice',"testOwner",["test"]),
  new Forum('Narco',"testOwner",["test"]),
  new Forum('Bombasto',"testOwner",["test"]),
  new Forum('Celeritas',"testOwner",["test"]),
  new Forum('Magneta',"testOwner",["test"]),
  new Forum('RubberMan',"testOwner",["test"]),
  new Forum('Dynama',"testOwner",["test"]),
  new Forum('Dr IQ',"testOwner",["test"]),
  new Forum('Magma',"testOwner",["test"]),
  new Forum('Tornado',"testOwner",["test"])
];


export const FORUMS = new ForumList(forums);
