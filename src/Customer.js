import domUpdates from "./domUpdates";

class Customer {
  constructor(id, name, bookings = [], rooms = [], orders = []) {
    this.id = id;
    this.name = name;
    this.currentRoom = null;
    this.bookings = bookings;
    this.allRooms = rooms;
    this.orders = orders;
  }

  open() {
    domUpdates.showCustomerOrders(this.name, this.orders);
    domUpdates.showCustomerBookings(this.name, this.bookings);
    domUpdates.displayName(this.name)
  }

  getCurrentService() {}

  upgradeRoom() {}

  bookRoom() {}

  unBookRoom() {}

  orderRoomService() {}

  calculateTotalBill() {}

  totalRoomServiceByDate() {}
}

export default Customer;