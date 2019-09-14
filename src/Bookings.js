import domUpdates from "./domUpdates";

class Bookings {
  constructor(roomsData, bookingsData, date) {
    this.rooms = roomsData;
    this.bookings = bookingsData
    this.guest;
    this.availableRooms;
    this.bookedRooms;
    this.bookingRevenue;
  }

  open(date) {
    this.findTotalRoomRevenue(date)
  } 

  getBookingsByDate(date) {
    return this.bookings.filter(booking => booking.date === date)
  }

  getAvailableRoomsByDate(date) { 
    let bookingsByDate = this.getBookingsByDate(date).map(booking => booking.roomNumber);
    this.bookedRooms = this.rooms.filter(room => bookingsByDate.includes(room.number))
    this.availableRooms = this.rooms.filter(room => !bookingsByDate.includes(room.number));
    domUpdates.displayAvailableRooms(this.availableRooms)
    return this.availableRooms;
  }
  
  findMostPopularDay() {

  }

  findLeastPopularDay() {

  }

  findDataByCustomer(id) {
    return this.bookings.filter(booking => booking.userID === id);
  }

  findTotalRoomRevenue(date) {
    this.getAvailableRoomsByDate(date)
    let total = this.bookedRooms.reduce((acc, room) => {
      acc += room.costPerNight;
      return acc;
    }, 0)
    return parseFloat(total.toFixed(2))
  }
}

export default Bookings;