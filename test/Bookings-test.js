import chai from 'chai';
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);

import Bookings from '../src/Bookings'
import sampleBookings from './sampleBookings'
import sampleRooms from './sampleRooms'
import availableRooms from './availableRooms'
// import domUpdates from '../src/domUpdates'

// chai.spy.on(domUpdates, [array of methods])

describe('Bookings', () => {
  // let needed variables be DECLARED here
  let bookings;
  beforeEach(() => {
    bookings = new Bookings(sampleRooms, sampleBookings)
  });

  it('should hold data', () => {
    describe('Bookings properties', () => {
      it('should hold all the rooms', () => {
        expect(bookings.rooms).to.eql(sampleRooms)
      });
      it('should hold all the bookings', () => {
        expect(bookings.bookings).to.eql(sampleBookings)
      })
    })
  })

  it("should get specific bookings by date", () => {
    expect(bookings.getBookingsByDate("2019/10/21")).to.eql([
      { userID: 2, date: "2019/10/21", roomNumber: 31 }
    ]);
  });
  it('should get available rooms for a specific date', () => {
    bookings.getAvailableRoomsByDate("2019/09/16");
    expect(bookings.getAvailableRoomsByDate('2019/09/16')).to.eql(availableRooms)
  })
});