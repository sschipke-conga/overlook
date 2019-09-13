import chai from 'chai';
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);

import Customer from '../src/Customer'

let person = { id: 4, name: "Brook Christiansen" };
let bookings = [
  { userID: 4, date: "2019/09/18", roomNumber: 36 },
  { userID: 4, date: "2019/08/09", roomNumber: 50 },
  { userID: 4, date: "2019/10/04", roomNumber: 7 },
  { userID: 4, date: "2019/10/02", roomNumber: 30 },
  { userID: 4, date: "2019/10/19", roomNumber: 15 },
  { userID: 4, date: "2019/09/22", roomNumber: 10 },
  { userID: 4, date: "2019/10/02", roomNumber: 20 },
  { userID: 4, date: "2019/10/11", roomNumber: 48 },
  { userID: 4, date: "2019/07/28", roomNumber: 18 },
  { userID: 4, date: "2019/08/10", roomNumber: 6 }
];

let orders = [
  {
    userID: 4,
    date: "2019/09/08",
    food: "Sleek Steel Sandwich",
    totalCost: 12.79
  },
  {
    userID: 4,
    date: "2019/09/06",
    food: "Practical Concrete Sandwich",
    totalCost: 11.49
  }
];


describe('Customer', () => {
  // let needed variables be DECLARED here
  let guest;
  beforeEach(() => {
    guest = new Customer(person.id, person.name, bookings, orders )
  });
});