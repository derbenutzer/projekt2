import { Injectable } from '@angular/core';

@Injectable()
export class ImageService {

  store: Object;

  constructor (){
    this.store={
      "1":"assets/images/animals/cats.jpg",
      "223":"assets/images/animals/nashorn.jpg",
      "007":"assets/images/animals/lama.jpg",
      "9":"assets/images/animals/donkey.jpg",
      "0":"assets/images/animals/grizzly.jpg",
      "999":"assets/images/animals/tiger.jpg",
      "9999":"assets/images/animals/seal.jpg",
    };
  };

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public getImage(cat:string){
    if(this.store[cat]){
      return this.store[cat];
    }
    else{
      return this.store["0"];
    }
  }

  public getRandomImage(cat:string){


    let cat2 = this.getRandomInt(0,6);

    console.log(cat2);

    if(this.store[cat2]){
      return this.store[cat2];
    }
    else{
      return this.store["0"];
    }

  }

}
