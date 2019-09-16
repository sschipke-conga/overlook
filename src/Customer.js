import domUpdates from "./domUpdates";

class Customer {
  constructor(guest, bookings = [], rooms = [], orders = []) {
    Object.assign(this, guest);
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