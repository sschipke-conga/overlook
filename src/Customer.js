class Customer {
  constructor(id, name, bookings = [], rooms = [], orders = []) {
    this.id = id;
    this.name = name;
    this.currentRoom = null;
    this.bookings = bookings;
    this.allRooms = rooms;
    this.orders = orders;
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