import chai from 'chai';
import domUpdates from '../src/domUpdates'
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);

import Customer from '../src/Customer';
import Bookings from '../src/Bookings'
import sampleBookings from './sampleBookings';
import sampleRooms from './sampleRooms';
import availableRooms from './availableRooms';
import sampleGuest from './sampleGuest';

let bookings = new Bookings(sampleRooms, sampleBookings);

let person = { id: 4, name: "Brook Christiansen" };
let userBookings = [
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
  let guest;
  beforeEach(() => {
    guest = new Customer(person, userBookings, bookings.findRoomsForCustomer(4), orders);
    chai.spy.on(domUpdates, ['displayBookingStats', 'displayAvailableRooms', 'displayOccupancy'], () => { })
  });
  afterEach(() => {
    chai.spy.restore(domUpdates)
  })
  describe('customer properties', () => {
    it('should have a name', () => {
      expect(guest.name).to.equal('Brook Christiansen')
    });
    it('should have an id', () => {
      expect(guest.id).to.equal(4)
    });
    it('should have all past bookings', () => {
      expect(guest.bookings).to.eql([
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
      ])
    });
    it('should have all past orders', () => {
      expect(guest.orders).to.eql([
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
      ])
    })
  });

  describe('bookRoom method', () => {
    it('should have a current room once booked', () => {
      expect(guest.currentRoom).to.equal(undefined)
      guest.bookRoom(5, bookings, '2019/09/06');
      expect(guest.currentRoom).to.eql({
        "bedSize": "king",
        "bidet": false,
        "costPerNight": 246.65,
        "numBeds": 2,
        "number": 5,
        "roomType": "junior suite"
      })
    });
    it('should have incresed its bookings after booking a room', () => {
      guest.bookRoom(5, bookings, '2019/09/06')
    })
  })

});
