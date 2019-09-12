import chai from 'chai';
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);

import Bookings from '../src/Bookings'
import sampleBookings from '../test/sampleBookings'
import sampleRooms from '../test/sampleRooms'
// import domUpdates from '../src/domUpdates'

// chai.spy.on(domUpdates, [array of methods])

describe('Bookings', () => {
  // let needed variables be DECLARED here
  let bookings;
  beforeEach(() => {
    bookings = new Bookings(sampleRooms, sampleBookings)
  });

  it('should have some data', () => {
    console.log(bookings)
  })
});