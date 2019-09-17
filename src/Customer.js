import domUpdates from "./domUpdates";

class Customer {
  constructor(guest, bookings = [], rooms = [], orders = []) {
    Object.assign(this, guest);
    this.bookings = bookings;
    this.allRooms = rooms;
    this.currentRoom;
    this.orders = orders;
  }

  open() {
    domUpdates.showCustomerOrders(this.name, this.orders);
    domUpdates.showCustomerBookings(this.name, this.bookings);
    domUpdates.displayName(this.name)
    domUpdates.displayBills(this.name, this.calculateTotalBookingsBill(), this.calculateTotalRoomService(), this.calculateTotalBill());
  }

  bookRoom(roomNumber, bookings, day) {
      let index = bookings.getAvailableRoomsByDate(day).findIndex(room => room.number === roomNumber);
      let newRoom = bookings.availableRooms.splice(index, 1)[0];
      bookings.bookedRooms.push(newRoom);
      this.currentRoom = newRoom;
    let booking = { userID: this.id, date: day, roomNumber: newRoom.number}
    this.bookings.push(booking);
    this.allRooms.push(newRoom);
    bookings.bookings.push(booking);
  }

  unBookRoom() {

  }

  orderRoomService(price, item, day, orders) {
    let newOrder = {userID: this.id, date: day, food: item, totalCost: price};
    this.orders.push(newOrder);
    orders.push(newOrder)
  }

  calculateTotalRoomService() {
    let serviceBill = this.orders.reduce((bill, order) => {
      bill += order.totalCost;
      return bill;
    }, 0)
    return serviceBill
  }

  calculateTotalBookingsBill() {
    let bookingsBill = this.allRooms.reduce((bill, room) => {
      bill += room.costPerNight
    return bill;
    }, 0)
    return bookingsBill
  }

  calculateTotalBill() {
    return (this.calculateTotalRoomService() + this.calculateTotalBookingsBill())
  }
}

export default Customer;
