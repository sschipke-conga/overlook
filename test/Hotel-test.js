import chai from 'chai';
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);

import Hotel from '../src/Hotel'
import Bookings from '../src/Bookings'
import RoomService from '../src/RoomService'
import sampleBookings from './sampleBookings'
import sampleRooms from './sampleRooms'
import sampleRoomService from '../test/sampleRoomService'
import domUpdates from '../src/domUpdates'

chai.spy.on(domUpdates, ['displayTotalRevenue '])

const users = [{ id: 1, name: "Matilde Larson" },
  { id: 2, name: "Chadrick Lowe" },
  { id: 3, name: "Christian Sporer" },
  { id: 4, name: "Brook Christiansen" },
  { id: 5, name: "Noemy Little" },
  { id: 6, name: "Winnifred Kris" },
  { id: 7, name: "Josianne Huels" },
  { id: 8, name: "Zachery Abbott" },
  { id: 9, name: "Paula Anderson" },
  { id: 10, name: "Chyna Gulgowski" }]

describe('Hotel', () => {
  // let needed variables be DECLARED here
  let hotel;
  beforeEach(() => {
    hotel = new Hotel(users, sampleRooms, sampleBookings, sampleRoomService, '2019/06/19');
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
      hotel.findCurrentCustomer(6)
      expect(hotel.currentCustomer).to.eql({id: 5, 
        name: "Noemy Little"})
    });
  });

  it.skip('should get the to', () => {
    
  });

  it.skip('should be able to add a new customer', () => {
    hotel.addNewCustomer('Steve Gupta')
    expect(hotel.currentCustomer).to.eql({
      id: 11,
      name: "Steve Gupta"
    });
    expect(hotel.customers.length).to.equal(11)
    })

});