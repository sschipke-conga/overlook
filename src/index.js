import $ from 'jquery';
import './css/base.scss';
import './images/reception.svg';
import './images/network.svg';
import './images/hotel.svg';
import './images/room-service.svg';
import './images/sunset.jpg'
import domUpdates from './domUpdates'
import Hotel from './Hotel';
import { stringify } from 'querystring';

let hotel;
let today = getCurrentDate();

Promise.all([
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users').then(response => response.json()),
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms').then(response => response.json()),
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings').then(response => response.json()),
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/room-services/roomServices').then(response => response.json()),
]).then(data => hotel = new Hotel(data[0].users, data[1].rooms, data[2].bookings, data[3].roomServices, today)).then(data => hotel.open())

let $earchInput = $('#customer-search');
let $Rooms = $('#rooms');


$earchInput.keyup(searchCustomers);

$('body').click(e => {
  if (e.target.classList.contains('cancel-order')) {
    removeModal();
  }
  if (e.target.classList.contains('order-item')) {
    orderRoomService();
  }
  makeNewBooking(e);

})

$('.search').click(e => {
  handleCustomerClick(e);
  makeNewCustomer(e)
})

$Rooms.click(e  => {
  handleMakeNewBookingModal(e);
})

$('#orders').click(e => {
  handleNewRoomService(e);
})


$('#main-date').text(displayCurrentDate())
//these control the tabs
$('.tabs-stage div').hide();
$('.tabs-stage div:first').show();
$('.tabs-nav li:first').addClass('tab-active');

// Change tab class and display content
$('.tabs-nav a').on('click', function (event) {
  event.preventDefault();
  $('.tabs-nav li').removeClass('tab-active');
  $(this).parent().addClass('tab-active');
  $('.tabs-stage div').hide();
  $($(this).attr('href')).show();
});
////

function getCurrentDate() {
  let date = new Date();
  let day = String(date.getDate()).padStart(2, "0");
  let m = String(date.getMonth() + 1).padStart(2, "0");
  let year = date.getFullYear();
  return `${year}/${m}/${day}`;
}

function displayCurrentDate() {
  let date = new Date()
  let options = {weekday: "long", year: "numeric", month: "long", day: "numeric"};
  return date.toLocaleDateString("en-US", options);
}

function searchCustomers() {
  let $results = $('.search-results')
  if ($earchInput.val() === '') {
    $results.empty();
  } else {
    $results.empty();
    var searchGuests = hotel.customers.filter(guest => guest.name.toLowerCase().includes($earchInput.val().toLowerCase()))
}
  if (!searchGuests || !searchGuests.length) {
    $results.empty();
    makeNewCustomerPrompt()
  } else {
    $results.append(`${domUpdates.displaySearchGuests(searchGuests)}</ul>`)
  }
}

const handleCustomerClick = (e) => {
  if (e.target.classList.contains('searched')) {
    let id = parseInt(e.target.dataset.id);
    hotel.findCurrentCustomer(id).open();
    $('.search-results').empty();
    $earchInput.val('');
  }
}

function makeNewCustomerPrompt() {
  $('.search-results').append(`
  <section class="add-customer-section">
    <p class="add-customer-prompt">No matching customer found. Please add a new customer below: </p>
    <input type="text" class="add-customer-input" placeholder="Enter new customer name">
    <button type="button" class="add-customer-button">Make New Customer</button>
  </section>`)
}

const makeNewCustomer = (e) => {
  let $addInput = $('.add-customer-input');
  if ($addInput.val() !== '' && e.target.classList.contains('add-customer-button')) {
    hotel.addNewCustomer($addInput.val());
    hotel.currentCustomer.open();
    $addInput.val('');
    $earchInput.val('');
    $('.add-customer-section').remove();
    console.log(hotel.customers)
  }
}

const handleMakeNewBookingModal = (e) => {
  if (e.target.classList.contains('make-booking')) {
    makeBookingsModal();
  }
}
const makeBookingsModal = () => {
  $('body').prepend(
    `<div class="modal bookings-modal">
      <div class="modal-content content-bookings-modal">
        <h3 class="h3-available-rooms">Here are the available Rooms: </h3>
        ${showAvailableRooms()}</ul>
        <button class="cancel-order" type="button">Cancel</button>
      </div>
    </div>`
  ).fadeIn(2000)
}

function showAvailableRooms() {
  let availableRooms = `<ul class="available-rooms">`;
  hotel.bookings.availableRooms.forEach(room => {
    availableRooms += `
    <h5> Room: ${room.number}, ${room.roomType.toUpperCase()}, $${room.costPerNight}</h5>
    <h6>- bed: ${room.bedSize.toUpperCase()}, Quantity: ${room.numBeds}, bidet: ${room.bidet}</h6>
    <button class="book-room" id="${room.number}">Book this room</button>
    `
  })
  return availableRooms
}

function makeNewBooking(e) {
  let guest = hotel.currentCustomer;
  if (e.target.classList.contains('book-room') && !guest.currentRoom) {
    let roomNumber = parseInt(e.target.id);
    guest.bookRoom(roomNumber, hotel.bookings, today);
    $('.span-room-total').text(`${guest.calculateTotalBookingsBill().toFixed(2)}`);
    $('.span-all-total').text(`${guest.calculateTotalBill().toFixed(2)}`);
    $('#total-revenue').text(`$${hotel.getTotalRevenueByDate()}`);
    domUpdates.showCustomerBookings(guest.name, guest.bookings)
    $Rooms.append(`${showCurrentRoom(guest.currentRoom)}`)
    removeModal();
  }
}

const handleNewRoomService = e => {
  if (e.target.classList.contains('order-service')) {
    makeMenuModal();
  }
}

const makeMenuModal = () => {
  $('body').prepend(
    `<div class="modal menu-modal">
      <div class="modal-content menu">
      <label for="menu-items" class="label-menu">
        Please select from the following:
        </label>
        ${showMenu()}
        </select>
        <button class="order-item" type="button">Order Item</button>
        <button class="cancel-order" type="button">Cancel</button>
      </div>
    </div>`
  )
}

function showMenu() {
  let selection = `<select id="menu-items">`
  hotel.orders.menu.forEach(item => {
    selection += `<option alt="${item.food} "value="${item.price}">${item.food} for <b>$${item.price}</b></option>`
  })
  return selection;
}

function removeModal() {
  $('.modal').remove();
}

function orderRoomService() {
  let selectedItem = $('#menu-items');
  hotel.currentCustomer.orderRoomService(parseFloat(selectedItem.val()), $('#menu-items option:selected').attr('alt'), today, hotel.orders.orders);
  $('.span-orders-total').text(`${hotel.currentCustomer.calculateTotalRoomService().toFixed(2)}`);
  $('.span-all-total').text(`${hotel.currentCustomer.calculateTotalBill().toFixed(2)}`);
  $('#total-revenue').text(`$${hotel.getTotalRevenueByDate()}`);
  removeModal();
  domUpdates.showCustomerOrders(hotel.currentCustomer.name, hotel.currentCustomer.orders);
}

function showCurrentRoom(room){
  $('.section-current-room').remove();
  let roomText = `<section class="section-current-room">
  <h3 class="h3-current-room">Currently Booked Room Number: ${room.number}</h3>
  <h4 class="h4-current-room">${room.roomType.toUpperCase()}: ${room.numBeds} ${room.bedSize} bed(s)</h4>
  <h5>bidet? ${room.bidet}</h5>
  <h5>Cost each night: $${room.costPerNight}</h5>
  </section>`
  return roomText;
}