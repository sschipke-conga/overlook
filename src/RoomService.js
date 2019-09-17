import domUpdates from "./domUpdates";

class RoomService {
  constructor(serviceData) {
    this.orders = serviceData
    this.dateOrders;
    this.menu;
    this.dateOrders;
  }

  open(date) {
    this.findTotalRevenue(date)
    this.findMenu();
    domUpdates.displayOrders(this.dateOrders);
  }

  findOrdersByCustomer(guestID) {
    return this.orders.filter(orders => orders.userID === guestID)
  
  }
  
  findOrdersByDate(date) {
    this.dateOrders = this.orders.filter(order => order.date === date)
    return this.dateOrders;
  }

  findTotalRevenue(date) {
    this.findOrdersByDate(date);
    return this.dateOrders.reduce((bill, order) => {
      bill += order.totalCost;
      return bill
    }, 0)
  }

  findMenu() {
    this.menu = this.orders.reduce((menu, item) => {
      if (!menu.includes(item.food)) {
        let order = {food: item.food, price: item.totalCost }
        menu.push(order)
      }
      return menu
    }, []).sort((a, b) => a.price - b.price);
    return this.menu
  }

}

export default RoomService;