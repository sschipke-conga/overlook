import chai from 'chai';
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);

import Hotel from '../src/Hotel'
// import userData from '../test/userData'
// import domUpdates from '../src/domUpdates'

// chai.spy.on(domUpdates, [array of methods])
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
    hotel = new Hotel(users)
  });

  it('should be able to find a current customer', () => {
    hotel.findCurrentCustomer('Noemy')
    expect(hotel.currentCustomer).to.eql({ id: 5, 
      name: "Noemy Little" })
  })

  it('should be able to add a new customer', () => {
    hotel.addNewCustomer('Steve Gupta')
    expect(hotel.currentCustomer).to.eql({
      id: 11,
      name: "Steve Gupta"
    })
  })

});