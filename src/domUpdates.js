import $ from 'jquery';

const domUpdates = {

  displayAvailableRooms(rooms) {
    $('#rooms-today').text(`${rooms}`)
  },

  displayTotalRevenue (total) {
    $('#total-revenue').text(`$${total.toFixed(2)}`)
  },

  displayOccupancy(percent) {
    $('#percent-available').text(`${percent}%`);
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
    let list = `<ul class="search-list">`
    guests.forEach(guest => {
      list += `<li class="searched" data-id="${guest.id}"> ${guest.name} </li>`
    })
    return list;
  },

  showCustomerOrders(name, orders) {
    let $orders = $('.show-orders');
    $orders.html('');
    $('.orders--h3').text(`Here are the orders for ${name}:`)
    $orders.append(`<table class="cusom-orders">
    ${showOrders(orders)} </table> <button class="order-service">Order Room Service</button>`)
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
  },

  displayBills(name, roomTotal, serviceTotal, allTotal) {
    $('.bill').remove();
    $('.section-rooms').prepend(`<h3 class="h3-room-total bill"> ${name}'s Total Charges for rooms: $<span class="span-room-total">${roomTotal.toFixed(2)}</span></h3>`);
    $('#orders').prepend(`<h3 class="h3-room-total bill"> ${name}'s Total Charges for services: $<span class="span-orders-total">${serviceTotal.toFixed(2)}</span></h3>`);
    $('#customer').prepend(`<h3 class="h3-total bill"> ${name}'s Total Charges: $<span class="span-all-total">${allTotal.toFixed(2)}</span></h3>`)
  },


  showCustomerBookings(name, bookings) {
    let $ection = $('.section-rooms');
    $ection.html('');
    $ection.append(`
      <h3 class="heading-bookings">Here are all bookings for ${name}: </h3>
      <section class="section-bookings-table">
        ${makeBookings()} </table>
      </section>
      <button type="button" class="make-booking"> Make a new Booking</button>
        `);
    function makeBookings() {
      let table = `<table class="bookings-table">
        <tr>
          <th>Date:</th><th>Room Number</th>
        </tr>`;
      bookings.forEach(booking => {
        table += `<tr>
          <td>${booking.date}</td><td>${booking.roomNumber}</td>
          </tr>`
      })
      return table;
    }
  },
  
  displayName(name) {
    $('.section-current-room').remove();
    $('.display-customer').remove();
    $('h1').after(`
    <div class="display-customer">
      <h4 class="current-cutomer-header">Current Guest:</h4>
      <h3 class="current-customer">${name}</h3>
    </div>`);
  }

}

export default domUpdates