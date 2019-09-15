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


$earchInput.keyup(searchCustomers);

$('.search').click(e => {
  handleCustomerClick(e)
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
  let searchGuests = hotel.customers.filter(guest => guest.name.toLowerCase().includes($earchInput.val().toLowerCase()));
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
