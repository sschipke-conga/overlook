class Bookings {
  constructor(roomsData, bookingsData, date) {
    this.rooms = roomsData;
    this.bookings = bookingsData
    this.currentDate = date;
    this.guest;
    this.availableRooms = null;
    this.bookedRooms = null;
  }

  open(date) {
    this.getAvailableRoomsByDate(date)
  } 

  getBookingsByDate(date) {
    return this.bookings.filter(booking => booking.date === date)
  }

  getAvailableRoomsByDate(date) { 
    let bookingsByDate = this.getBookingsByDate(date).map(booking => booking.roomNumber);
    this.bookedRooms = this.rooms.filter(room => bookingsByDate.includes(room.number))
    this.availableRooms = this.rooms.filter(room => !bookingsByDate.includes(room.number));
    return this.availableRooms;
  }
  
  findMostPopularDay() {

  }

  findLeastPopularDay() {

  }

  findDataByCustomer(id) {
    return this.bookings.filter(booking => booking.userID === id);
  }

}

export default Bookings;