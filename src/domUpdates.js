import $ from 'jquery';

export default {

  displayAvailableRooms(rooms) {
    $('#rooms-today').text(`${rooms}`)
  },

  displayTotalRevenue (total) {
    $('#total-revenue').text(`$${total}`)
  },

  displayOccupancy(percent) {
    $('#percent-available').text(`%${percent}`);
  }







}