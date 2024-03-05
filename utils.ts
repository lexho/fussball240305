
/*let seed = new Date().getMilliseconds();

export function getRandomInt(max : number) {
    let value = seed;

  return function() {
    value = (value * Math.random()*100) % 100 // 16807 % 2147483647;
    return value;
  }
    
}*/

/*let generator = getRandomInt(1);

console.log(generator()); // 16807
console.log(generator()); // 16807
console.log(generator()); // 16807
console.log(generator()); // 16807*/

export function pseudoRandom(seed) {
  let value = seed;

  /*return function() {
    value = value * Math.random()*100 * 16807 % 2147483647;
    return value % 100 / 100;
  }*/
  return function(max) {
    value = value * Math.random()*100 * 16807 % 2147483647;
    value =  value % 100 / 100;
    return Math.floor(value * max);
  }
}

let generator = pseudoRandom(1);

/*for(let i = 0; i < 100; i++)
    console.log(generator(9));*/

/*console.log(generator()); // 282475249
console.log(generator()); // 1622650073*/

/*console.log(generator(5)); // 16807
console.log(generator(5)); // 282475249
console.log(generator(5));*/

/*class PseudoRandom {
    value : number;

    constructor (seed : number) {
        this.value = seed;
    }
  
    //return function() {
    next() {
      this.value = this.value * 16807 % 2147483647;
      return this.value;
    }
  }
  
  let generator = new PseudoRandom(1);*/