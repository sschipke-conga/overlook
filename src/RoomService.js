class RoomService {
  constructor(serviceData) {
    this.orders = serviceData
    this.menu;
    this.dateOrders;
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
    }, []);
    return this.menu
  }

}

export default RoomService;