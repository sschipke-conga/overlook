import RoomService from "./RoomService";
import Customer from "./Customer";
import Bookings from "./Bookings"
import domUpdates from "./domUpdates";

class Hotel {
  constructor(userData, roomsData, bookingsData, ordersData, day) {
    this.bookings = new Bookings(roomsData, bookingsData)
    this.orders = new RoomService(ordersData)
    this.customers = userData;
    this.currentDate = day;
    this.currentCustomer;
  }

  open() {
    this.bookings.open(this.currentDate);
    this.orders.open(this.currentDate);
    domUpdates.displayTotalRevenue(this.getTotalRevenueByDate());
    
  }

  findCurrentCustomer(id) {
    let guest = this.customers.find(user => user.id === id)
    this.currentCustomer = new Customer(guest, this.bookings.findBookingsByCustomer(guest.id), this.bookings.findRoomsForCustomer(guest.id),
    this.orders.findOrdersByCustomer(guest.id));
    return this.currentCustomer;
  }

  addNewCustomer(inputName) {
    let guest = { id: (this.customers.length + 1), name: inputName};
    this.currentCustomer = new Customer(guest)
    this.customers.push(guest);
  }

  getTotalRevenueByDate() {
    let total = this.bookings.findTotalRoomRevenue(this.currentDate) + this.orders.findTotalRevenue(this.currentDate)
    return total;
  }

}

export default Hotel;