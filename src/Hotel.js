import RoomService from "./RoomService";
import Customer from "./Customer";
import Bookings from "./Bookings"

class Hotel {
  constructor(userData, roomsData, bookingsData, ordersData, today) {
    this.bookings = new Bookings(roomsData, bookingsData)
    this.orders = new RoomService(ordersData)
    this.customers = userData;
    this.currentDate = today;
    this.currentCustomer;
  }
  findCurrentCustomer(name) {
    let guest = this.customers.find(user => {
      return user.name.toLocaleUpperCase().includes(name.toLocaleUpperCase());
    })
    this.currentCustomer = new Customer(guest.id, guest.name, this.bookings.findDataByCustomer(guest.id));
    return this.currentCustomer;
  }

  addNewCustomer(inputName) {
    let guest = { id: (this.customers.length + 1), name: inputName};
    this.currentCustomer = new Customer(guest.id, guest.name)
    this.customers.push(guest);
  }

  getTotalRevenueByDate() {
    return this.bookings.findTotalRoomRevenue(this.currentDate) + this.orders.findTotalRevenue(this.currentDate)
  }

}

export default Hotel;