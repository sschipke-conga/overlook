class RoomService {
  constructor(serviceData) {
    this.orders = serviceData
  }

  findOrdersByCustomer(guestID) {
    return this.orders.filter(orders => orders.userID === guestID)
  
  }
  
  findOrdersByDate(date) {
    return this.orders.filter(order => order.date === date)
  }

  findMenu() {
    return this.orders.reduce((menu, item) => {
      if (!menu.includes(item.food)) {
        let order = {food:item.food, price: item.totalCost }
        menu.push(order)
      }
      return menu
    }, [])
  }

}

export default RoomService;