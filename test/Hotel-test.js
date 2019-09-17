import chai from 'chai';
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);

import Hotel from '../src/Hotel'
import Bookings from '../src/Bookings'
import RoomService from '../src/RoomService'
import Customer from '../src/Customer'
import sampleBookings from './sampleBookings'
import sampleRooms from './sampleRooms'
import sampleRoomService from '../test/sampleRoomService'
import sampleGuest from './sampleGuest'
import domUpdates from '../src/domUpdates'

// chai.spy.on(domUpdates, ['displayTotalRevenue '])

const users = [{ id: 1, name: "Matilde Larson" },
  { id: 2, name: "Chadrick Lowe" },
  { id: 3, name: "Christian Sporer" },
  { id: 4, name: "Brook Christiansen" },
  { id: 5, name: "Noemy Little" },
  { id: 6, name: "Winnifred Kris" },
  { id: 7, name: "Josianne Huels" },
  { id: 8, name: "Zachery Abbott" },
  { id: 9, name: "Paula Anderson" },
  { id: 10, name: "Chyna Gulgowski" }];



describe('Hotel', () => {

  let hotel;
  beforeEach(() => {
    hotel = new Hotel(users, sampleRooms, sampleBookings, sampleRoomService, '2019/09/06');
    chai.spy.on(domUpdates, ['displayTotalRevenue', 'displayAvailableRooms', 'displayOccupancy', 'displayBoookingStats', 'displayOrders'], () => {})
    hotel.open();
  });
  afterEach(() => {
    chai.spy.restore(domUpdates)
  });
  describe('hotel properties', () => {
    it('should have access to the bookings', () => {
      expect(hotel.bookings).to.be.an.instanceOf(Bookings)
    });
    it('should have access to room service', () => {
      expect(hotel.orders).to.be.an.instanceOf(RoomService)
    });
    it('should have customers', () => {
      expect(hotel.customers).to.eql(users);
      it('should NOT start out with a current customer', () => {
        expect(hotel.currentCustomer).to.equal(undefined)
      })
    })
  });

  describe('findCurrentCustomer method', () => {
    it('should be able to find a current customer', () => {
      hotel.findCurrentCustomer(4)
      expect(hotel.currentCustomer.name).to.equal('Brook Christiansen')
    });
    it('its current customer should be an instance of Customer', () => {
      hotel.findCurrentCustomer(4)
      expect(hotel.currentCustomer).to.be.an.instanceOf(Customer)
    });
  });

  it('should be able to add a new customer', () => {
    hotel.addNewCustomer('Steve Gupta')
    expect(hotel.currentCustomer).to.eql({
      id: 11,
      name: "Steve Gupta",
      "orders": [],
      "allRooms": [],
      "bookings": []
    });
    expect(hotel.customers.length).to.equal(11)
  })

});
