import $ from 'jquery';
import './css/base.scss';
import './images/reception.svg'
import './images/network.svg'
import './images/hotel.svg'
import './images/room-service.svg'
import Hotel from './Hotel';

let hotel;
let today = getCurrentDate();
console.log(today)
let usersFetch = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users').then(data => data.json()).then(data => makeHotel(data.users))
let roomsFetch = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms').then(data => data.json());
let bookingsFetch = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings').then(data => data.json()).then(data => console.log(data.bookings));
let roomServicesFetch = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/room-services/roomServices');

const makeHotel = (data) => {
  hotel = new Hotel(data);
  console.log(hotel)
}


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