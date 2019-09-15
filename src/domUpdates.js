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
    $('.show-orders').append(`
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
  },


  displayBoookingStats(dates) {
    $('.most-booked').after(`<p class="popular"><b>${dates[0].day}</b> with <b>${dates[0].number}</b> bookings</p>`);
    $('.least-booked').after(`<p class="popular"><b>${dates[1].day}</b> with <b>${dates[1].number}</b> bookings</p>`);
  },

  displaySearchGuests(guests) {
    let list = `<ul class="search-list"></ul>`
    guests.forEach(guest => {
      list += `<li class="searched" data-id="${guest.id}"> ${guest.name} </li>`
    })
    return list;
  },

  showCustomerOrders(name, orders) {
    let $orders = $('.show-orders');
    $orders.empty();
    $('.orders--h3').text(`Here are the orders for ${name}:`)
    $orders.append(`<table class="cusom-orders">
    ${showOrders(orders)} </table> `)
    function showOrders() {
      let table = `<tr>
      <th>Date</th><th>Item</th><th>Price</th>
    </tr>`;
      orders.forEach(order => {
        table += `<tr>
        <td>${order.date}</td><td>${order.food}</td><td>${order.totalCost}</td>
        </tr>`
      })
      return table;
    }  
  }






}