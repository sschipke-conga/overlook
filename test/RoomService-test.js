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
  });

  it('should be able to get orders for a specific customer', () => {
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
      }
    ]);
  })
  it('should be able to make a menu', () => {
    expect(roomService.findMenu()).to.eql([
  { food: 'Rustic Soft Sandwich', price: 6.78 },
  { food: 'Refined Rubber Sandwich', price: 9.89 },
  { food: 'Practical Concrete Sandwich', price: 11.49 },
  { food: 'Sleek Steel Sandwich', price: 12.79 },
  { food: 'Practical Granite Sandwich', price: 14.87 },
  { food: 'Licensed Metal Sandwich', price: 17.77 },
  { food: 'Unbranded Concrete Sandwich', price: 22.8 }
])
  });
  it('should find total revenue for a day', () => {
    expect(roomService.findTotalRevenue('2019/09/06')).to.equal(11.49)
  });

  it('should be able open and display results', () => {
    roomService.open('2019/09/06');
    expect(domUpdates.displayOrders).to.have.been.called(1)
  })
});
