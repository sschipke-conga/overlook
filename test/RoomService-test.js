import chai from 'chai';
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);

import RoomService from '../src/RoomService'
import sampleRoomService from '../test/sampleRoomService'
import domUpdates from '../src/domUpdates'


describe('RoomService', () => {
  let roomService;
  beforeEach(() => {
    roomService = new RoomService(sampleRoomService);
    chai.spy.on(domUpdates, ['displayOrders'], () => {})
  });
  afterEach(() => {
    chai.spy.restore(domUpdates)
  })

  it('should be able to get orders for a specifict customer', () => {
    expect(roomService.findOrdersByCustomer(3)).to.eql([
      {
        userID: 3,
        date: "2019/10/23",
        food: "Rustic Soft Sandwich",
        totalCost: 6.78
      },
      {
        userID: 3,
        date: "2019/10/22",
        food: "Unbranded Concrete Sandwich",
        totalCost: 22.8
      }
    ]);
  });
  it('should return orders for a specific date' , () => {
    expect(roomService.findOrdersByDate("2019/09/06")).to.eql([
      {
        userID: 5,
        date: "2019/09/06",
        food: "Practical Concrete Sandwich",
        totalCost: 11.49
      },
      {
        userID: 19,
        date: "2019/09/06",
        food: "Awesome Metal Sandwich",
        totalCost: 12.56
      }
    ]);
  })
  it('should be able to make a menu', () => {
    expect(roomService.findMenu()).to.eql([ { food: 'Refined Rubber Sandwich', price: 9.89 },
  { food: 'Rustic Soft Sandwich', price: 6.78 },
  { food: 'Unbranded Concrete Sandwich', price: 22.8 },
  { food: 'Sleek Steel Sandwich', price: 12.79 },
  { food: 'Practical Concrete Sandwich', price: 11.49 },
  { food: 'Licensed Metal Sandwich', price: 17.77 },
  { food: 'Practical Granite Sandwich', price: 14.87 },
  { food: 'Tasty Concrete Sandwich', price: 12.01 },
  { food: 'Refined Metal Sandwich', price: 12.32 },
  { food: 'Handcrafted Metal Sandwich', price: 12.36 },
  { food: 'Small Metal Sandwich', price: 22.75 },
  { food: 'Rustic Concrete Sandwich', price: 14.9 },
  { food: 'Awesome Granite Sandwich', price: 18.34 },
  { food: 'Gorgeous Concrete Sandwich', price: 24.79 },
  { food: 'Tasty Granite Sandwich', price: 9.23 },
  { food: 'Fantastic Metal Sandwich', price: 21.6 },
  { food: 'Generic Soft Sandwich', price: 12.77 },
  { food: 'Ergonomic Wooden Sandwich', price: 24.79 },
  { food: 'Generic Cotton Sandwich', price: 21.66 },
  { food: 'Awesome Metal Sandwich', price: 12.56 }
])
  });
  it('should find total revenue for a day', () => {
    expect(roomService.findTotalRevenue('2019/09/06')).to.equal(24.05)
  });

  it('should be able open and display results', () => {
    roomService.open('2019/09/06');
    expect(domUpdates.displayOrders).to.have.been.called(1)
  })
});