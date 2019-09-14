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
    this.findOccupancy(date)
  } 

  getBookingsByDate(date) {
    return this.bookings.filter(booking => booking.date === date)
  }

  getAvailableRoomsByDate(date) { 
    let bookingsByDate = this.getBookingsByDate(date).map(booking => booking.roomNumber);
    this.bookedRooms = this.rooms.filter(room => bookingsByDate.includes(room.number))
    this.availableRooms = this.rooms.filter(room => !bookingsByDate.includes(room.number));
    domUpdates.displayAvailableRooms(this.availableRooms.length )
    return this.availableRooms;
  }
  
  findMostPopularDay() {

  }

  findLeastPopularDay() {

  }

  findBookingsByCustomer(id) {
    return this.bookings.filter(booking => booking.userID === id);
  }

  findRoomsForCustomer(id) {
  this.findBookingsByCustomer(id).reduce((acc, booking)=>{
    let matchingRoom = this.rooms.find(room => room.number === booking.roomNumber);
    acc.push(matchingRoom);
    return acc;
  }, [])
  }

  findTotalRoomRevenue(date) {
    this.getAvailableRoomsByDate(date)
    let total = this.bookedRooms.reduce((acc, room) => {
      acc += room.costPerNight;
      return acc;
    }, 0)
    return parseFloat(total.toFixed(2))
  }

  findOccupancy() {
    let occupancy = ((this.bookedRooms.length - this.rooms.length) / (this.rooms.length) * 100);
    domUpdates.displayOccupancy(-occupancy)
  }
}

export default Bookings