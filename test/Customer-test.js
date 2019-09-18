/* eslint-disable max-len */
import chai from 'chai';
import domUpdates from '../src/domUpdates'
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);

import Customer from '../src/Customer';
import Bookings from '../src/Bookings'
import RoomService from '../src/RoomService';
let sampleRooms = [ { number: 1,
  roomType: 'residential suite',
  bidet: false,
  bedSize: 'twin',
  numBeds: 1,
  costPerNight: 265.03 },
{ number: 2,
  roomType: 'single room',
  bidet: true,
  bedSize: 'full',
  numBeds: 1,
  costPerNight: 228.01 },
{ number: 3,
  roomType: 'suite',
  bidet: false,
  bedSize: 'twin',
  numBeds: 1,
  costPerNight: 275.99 },
{ number: 4,
  roomType: 'junior suite',
  bidet: false,
  bedSize: 'full',
  numBeds: 1,
  costPerNight: 177.03 },
{ number: 5,
  roomType: 'junior suite',
  bidet: false,
  bedSize: 'king',
  numBeds: 2,
  costPerNight: 246.65 },
{ number: 6,
  roomType: 'suite',
  bidet: false,
  bedSize: 'king',
  numBeds: 1,
  costPerNight: 211.42 },
{ number: 7,
  roomType: 'residential suite',
  bidet: false,
  bedSize: 'full',
  numBeds: 2,
  costPerNight: 376.56 },
{ number: 8,
  roomType: 'suite',
  bidet: false,
  bedSize: 'full',
  numBeds: 1,
  costPerNight: 177.04 },
{ number: 9,
  roomType: 'residential suite',
  bidet: true,
  bedSize: 'twin',
  numBeds: 1,
  costPerNight: 327.76 },
{ number: 10,
  roomType: 'single room',
  bidet: false,
  bedSize: 'queen',
  numBeds: 2,
  costPerNight: 296.48 },
{ number: 11,
  roomType: 'single room',
  bidet: true,
  bedSize: 'queen',
  numBeds: 1,
  costPerNight: 216.05 },
{ number: 12,
  roomType: 'single room',
  bidet: false,
  bedSize: 'queen',
  numBeds: 1,
  costPerNight: 247.86 },
{ number: 13,
  roomType: 'residential suite',
  bidet: false,
  bedSize: 'full',
  numBeds: 1,
  costPerNight: 372.83 },
{ number: 14,
  roomType: 'junior suite',
  bidet: false,
  bedSize: 'twin',
  numBeds: 2,
  costPerNight: 207.64 },
{ number: 15,
  roomType: 'suite',
  bidet: false,
  bedSize: 'king',
  numBeds: 1,
  costPerNight: 163.1 },
{ number: 16,
  roomType: 'single room',
  bidet: true,
  bedSize: 'king',
  numBeds: 1,
  costPerNight: 229.8 },
{ number: 17,
  roomType: 'junior suite',
  bidet: false,
  bedSize: 'king',
  numBeds: 2,
  costPerNight: 393.97 },
{ number: 18,
  roomType: 'single room',
  bidet: true,
  bedSize: 'queen',
  numBeds: 1,
  costPerNight: 332.07 },
{ number: 19,
  roomType: 'residential suite',
  bidet: true,
  bedSize: 'queen',
  numBeds: 2,
  costPerNight: 356.33 },
{ number: 20,
  roomType: 'suite',
  bidet: true,
  bedSize: 'king',
  numBeds: 1,
  costPerNight: 356.72 },
{ number: 21,
  roomType: 'suite',
  bidet: false,
  bedSize: 'queen',
  numBeds: 2,
  costPerNight: 480.56 },
{ number: 22,
  roomType: 'residential suite',
  bidet: false,
  bedSize: 'queen',
  numBeds: 1,
  costPerNight: 190.26 },
{ number: 23,
  roomType: 'single room',
  bidet: false,
  bedSize: 'full',
  numBeds: 2,
  costPerNight: 245.42 },
{ number: 24,
  roomType: 'suite',
  bidet: true,
  bedSize: 'queen',
  numBeds: 1,
  costPerNight: 174.95 },
{ number: 25,
  roomType: 'junior suite',
  bidet: true,
  bedSize: 'queen',
  numBeds: 1,
  costPerNight: 307.49 }];

let sampleOrders = [{
  userID: 5,
  date: "2019/09/06",
  food: "Practical Concrete Sandwich",
  totalCost: 11.49
},
{
  userID: 6,
  date: "2019/10/28",
  food: "Licensed Metal Sandwich",
  totalCost: 17.77
}];

let person = { id: 4, name: "Brook Christiansen" };
let userBookings = [
  { userID: 4, date: "2019/09/18", roomNumber: 22 },
  { userID: 4, date: "2019/08/09", roomNumber: 23 },
  { userID: 4, date: "2019/10/04", roomNumber: 7 },
  { userID: 4, date: "2019/10/02", roomNumber: 19 },
  { userID: 4, date: "2019/10/19", roomNumber: 15 },
  { userID: 4, date: "2019/09/22", roomNumber: 10 },
  { userID: 4, date: "2019/10/02", roomNumber: 20 },
  { userID: 4, date: "2019/10/11", roomNumber: 16 },
  { userID: 4, date: "2019/07/28", roomNumber: 18 },
  { userID: 4, date: "2019/08/10", roomNumber: 6 }
];
let sampleBookings = [{ userID: 1, date: '2019/09/12', roomNumber: 20 },
  { userID: 1, date: '2019/09/16', roomNumber: 15 },
  { userID: 1, date: '2019/09/29', roomNumber: 19 },
  { userID: 1, date: '2019/08/22', roomNumber: 6 },
  { userID: 1, date: '2019/08/15', roomNumber: 5 }];

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

let allBookings = [...sampleBookings, ...userBookings];


describe('Customer', () => {
  let guest, guestRoomService, guestBookings;
  beforeEach(() => {
    guestBookings = new Bookings(sampleRooms, allBookings);
    guestRoomService = new RoomService(sampleOrders);
    guest = new Customer(person, userBookings, guestBookings.findRoomsForCustomer(4), orders);
    chai.spy.on(domUpdates, ['displayBookingStats', 'displayAvailableRooms', 'displayOccupancy'], () => { })
  });
  afterEach(() => {
    chai.spy.restore(domUpdates);
  });
  describe('customer properties', () => {
    it('should have a name', () => {
      expect(guest.name).to.equal('Brook Christiansen')
    });
    it('should have an id', () => {
      expect(guest.id).to.equal(4)
    });
    it('should have all past bookings', () => {
      expect(guest.bookings).to.eql([
        { userID: 4, date: "2019/09/18", roomNumber: 22 },
        { userID: 4, date: "2019/08/09", roomNumber: 23},
        { userID: 4, date: "2019/10/04", roomNumber: 7 },
        { userID: 4, date: "2019/10/02", roomNumber: 19 },
        { userID: 4, date: "2019/10/19", roomNumber: 15 },
        { userID: 4, date: "2019/09/22", roomNumber: 10 },
        { userID: 4, date: "2019/10/02", roomNumber: 20 },
        { userID: 4, date: "2019/10/11", roomNumber: 16 },
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
      guest.bookRoom(5, guestBookings, '2019/09/06');
      expect(guest.currentRoom).to.eql({
        "bedSize": "king",
        "bidet": false,
        "costPerNight": 246.65,
        "numBeds": 2,
        "number": 5,
        "roomType": "junior suite"
      })
    });
    it('should have increased its bookings after booking a room', () => {
      expect(guest.bookings.length).to.equal(11);
      guest.bookRoom(5, guestBookings, '2019/09/06');
      expect(guest.bookings.length).to.equal(12);
    });
    it('should have added its new booking to all bookings', () => {
      expect(guestBookings.bookings.length).to.equal(17);
      guest.bookRoom(5, guestBookings, '2019/09/06');
      expect(guestBookings.bookings.length).to.equal(18);
    });
  });
  describe('orderRoomService', () => {
    afterEach(() => {
      guestRoomService.orders.pop();
    });
    it('should increase its orders', () => {
      expect(guest.orders.length).to.equal(2);
      guest.orderRoomService(9.89, 'Refined Rubber Sandwich', '2019/09/06', guestRoomService.orders);
      expect(guest.orders.length).to.equal(3);
    });
    it('should add its order to all orders', () => {
      expect(guestRoomService.orders.length).to.equal(2);
      guest.orderRoomService(9.89, 'Refined Rubber Sandwich', '2019/09/06', guestRoomService.orders);
      expect(guestRoomService.orders.length).to.equal(3);
    });
    it('its order should be an object', () => {
      guest.orderRoomService(9.89, 'Refined Rubber Sandwich', '2019/09/06', guestRoomService.orders);
      expect(guestRoomService.orders[(guestRoomService.orders.length - 1)]).to.eql({
        userID: 4,
        date: '2019/09/06',
        food: 'Refined Rubber Sandwich',
        totalCost: 9.89
      });
    });
  });
  it('should calculate total bill for bookings', () => {
    expect(guest.calculateTotalBookingsBill().toFixed(2)).to.equal('2758.16')
  });
  it('should calculate total bill for orders', () => {
    expect(guest.calculateTotalRoomService().toFixed(2)).to.equal('24.28')
  });
  it('should calculate total bill for orders AND bookings', () => {
    expect(guest.calculateTotalBill().toFixed(2)).to.equal('2782.44')
  });

});
