import chai from 'chai';
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);

import Bookings from '../src/Bookings';
import sampleBookings from './sampleBookings';
import sampleRooms from './sampleRooms';
import availableRooms from './availableRooms';
import domUpdates from '../src/domUpdates';
import sampleGuest from './sampleGuest';


describe('Bookings', () => {
  let bookings;
  beforeEach(() => {
    bookings = new Bookings(sampleRooms, sampleBookings);
    chai.spy.on(domUpdates, ['displayAvailableRooms', 'displayOccupancy', 'displayBoookingStats' ], () => true);
  });
  afterEach(() => {
    chai.spy.restore(domUpdates)
  });

  describe('Bookings properties', () => {
    it('should hold all the rooms', () => {
      expect(bookings.rooms).to.eql(sampleRooms)
    });
    it('should hold all the bookings', () => {
      expect(bookings.bookings).to.eql(sampleBookings)
    });
    it('should start off not knowing available rooms', () => {
      expect(bookings.availableRooms).to.equal(undefined)
    });
    it('should start off not knowing which rooms are booked', () => {
      expect(bookings.bookedRooms).to.equal(undefined)
    });
  });


  it("should get specific bookings by date", () => {
    expect(bookings.getBookingsByDate("2019/10/21")).to.eql([
      { userID: 2, date: "2019/10/21", roomNumber: 31 }
    ]);
  });
  describe("getAvailableRoomsByDate method", () => {
    it("should get available rooms for a specific date", () => {
      expect(bookings.getAvailableRoomsByDate("2019/09/16")).to.eql(
        availableRooms);
    });
    it('should update availableRooms property', () => {
      bookings.getAvailableRoomsByDate("2019/09/16")
      expect(bookings.availableRooms).to.eql(availableRooms);
    });
    it('should update bookedRooms property', () => {
      bookings.getAvailableRoomsByDate("2019/09/16")
      expect(bookings.bookedRooms).to.eql([
        {
          "bedSize": "king",
          "bidet": false,
          "costPerNight": 163.1,
          "numBeds": 1,
          "number": 15,
          "roomType": "suite"
        },
        {
          "bedSize": "full",
          "bidet": false,
          "costPerNight": 245.42,
          "numBeds": 2,
          "number": 23,
          "roomType": "single room"
        },
        {
          "bedSize": "queen",
          "bidet": true,
          "costPerNight": 174.95,
          "numBeds": 1,
          "number": 24,
          "roomType": "suite"
        }
      ]);
    });
  });
  it('should find the most and least popular day', () => {
    expect(bookings.findMostAndLeastPopularDay()).to.eql([{ day: '2019/08/10', number: 4 }, { day: '2019/08/25', number: 1 }]);
  });

  it('should find bookings by customer using their id', () => {
    expect(bookings.findBookingsByCustomer(4)).to.eql(sampleGuest.bookings)
  });

  it('should find all the rooms a customer has ever booked', () => {
    expect(bookings.findRoomsForCustomer(4)).to.eql(sampleGuest.allRooms)
  });

  it('should return the total revenue of booked rooms for a specific date', () => {
    expect(bookings.findTotalRoomRevenue("2019/09/16")).to.equal(583.47);
  });

  it('should find the occupancy (percentage of rooms booked)', () => {
    bookings.getAvailableRoomsByDate('2019/09/16');
    expect(bookings.findOccupancy()).to.equal(12);
  });
  it('should be able to open', () => {
    bookings.open()
    expect(domUpdates.displayAvailableRooms).to.have.been.called(1);
    expect(domUpdates.displayOccupancy).to.have.been.called(1)
    expect(domUpdates.displayBoookingStats).to.have.been.called(1)
  });


})
