import domUpdates from "./domUpdates";

class Bookings {
  constructor(roomsData, bookingsData) {
    this.rooms = roomsData;
    this.bookings = bookingsData
    this.availableRooms;
    this.bookedRooms;
  }

  open(date) {
    this.findTotalRoomRevenue(date)
    domUpdates.displayAvailableRooms(this.availableRooms.length)
    domUpdates.displayOccupancy((this.findOccupancy(date)))
    domUpdates.displayBoookingStats(this.findMostAndLeastPopularDay())
  } 

  getBookingsByDate(date) {
    return this.bookings.filter(booking => booking.date === date)
  }

  getAvailableRoomsByDate(date) { 
    let bookingsByDate = this.getBookingsByDate(date).map(booking => booking.roomNumber);
    this.bookedRooms = this.rooms.filter(room => bookingsByDate.includes(room.number))
    this.availableRooms = this.rooms.filter(room => !bookingsByDate.includes(room.number)).sort((roomA, roomB) => roomA.costPerNight - roomB.costPerNight );
    return this.availableRooms;
  }

  findMostAndLeastPopularDay() {
    let popularBookings = this.bookings.reduce((acc, booking) => {
      if (!acc[booking.date]) {
        acc[booking.date] = []
      }
      acc[booking.date].push(booking.date)
      return acc
    }, {})
    let dates = Object.keys(popularBookings)
    let date = dates.sort((a, b) => {
      return popularBookings[b].length - popularBookings[a].length
    })
    let mostAndLeast = [{ day: date[0], number: (popularBookings[date[0]].length) },
      { day: date[date.length - 1], number: (popularBookings[date[(date.length - 1)]].length) }];
    return mostAndLeast;
  }

  findBookingsByCustomer(id) {
    return this.bookings.filter(booking => booking.userID === id);
  }

  findRoomsForCustomer(id) {
    return this.findBookingsByCustomer(id).reduce((acc, booking)=>{
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
    let occupancy = ((this.bookedRooms.length) / (this.rooms.length) * 100);
    return occupancy;
  }
}

export default Bookings