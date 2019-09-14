import RoomService from "./RoomService";
import Customer from "./Customer";
import Bookings from "./Bookings"
import domUpdates from "./domUpdates";

class Hotel {
  constructor(userData, roomsData, bookingsData, ordersData, today) {
    this.bookings = new Bookings(roomsData, bookingsData)
    this.orders = new RoomService(ordersData)
    this.customers = userData;
    this.currentDate = today;
    this.currentCustomer;
  }

  open() {
    this.bookings.open(this.currentDate);
    this.orders.open(this.currentDate);
    this.getTotalRevenueByDate()
  }

  findCurrentCustomer(name) {
    let guest = this.customers.find(user => {
      return user.name.toLocaleUpperCase().includes(name.toLocaleUpperCase());
    })
    this.currentCustomer = new Customer(guest.id, guest.name, this.bookings.findBookingByCustomer(guest.id), this.bookings.findRoomsForCustomer(guest.id),
    this.orders.findOrdersByCustomer(guest.id));
    return this.currentCustomer;
  }

  addNewCustomer(inputName) {
    let guest = { id: (this.customers.length + 1), name: inputName};
    this.currentCustomer = new Customer(guest.id, guest.name)
    this.customers.push(guest);
  }

  getTotalRevenueByDate() {
    let total = this.bookings.findTotalRoomRevenue(this.currentDate) + this.orders.findTotalRevenue(this.currentDate)
    domUpdates.displayTotalRevenue(total)
  }

}

export default Hotel;