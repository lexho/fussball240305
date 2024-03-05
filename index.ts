import { readFileSync } from 'fs';

let feld;
try {
    const data = readFileSync('./feld.txt', 'utf-8');
    console.log(data);
    feld = data;
} catch (err) {

}

class User {
  name = '';
  setName(name: string): void {
    this.name = name;
  }
}
const userA = new User();
userA.setName('Klaus');
const userB = new User();
userB.setName('Hans-Peter');

function compare(userA: User, userB: User): boolean {
  return userA.name === userB.name;
}

const cmp = (userA: User, userB: User): boolean => {
  return userA.name === userB.name;
};

console.log('compare: ', compare(userA, userB));
console.log('compare: ', cmp(userA, userB));
