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
  },

  displayOrders(orders) {
    $('#orders').append(`
    ${makeOrders()} </table>`)
    function makeOrders() {
      let table = `<table class= "table-orders" >
    <tr>
      <th>Item</th> <th>Price $:</th>
    </tr>`
      orders.forEach(order => {
        table += 
        `<tr>
          <td>${order.food}</td>
          <td>${order.totalCost}</td>
        </tr>`
      });
      return table;
    }
  }







}