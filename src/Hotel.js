class Hotel {
  constructor(userData, today) {
    this.customers = userData;
    this.currentDate = today;
    this.currentCustomer;
  }
  findCurrentCustomer(name) {
    this.currentCustomer = this.customers.find(user => {
      return user.name.toLocaleUpperCase().includes(name.toLocaleUpperCase());
    })
    return this.currentCustomer;
  }

  addNewCustomer(inputName) {
    this.currentCustomer = { id: (this.customers.length + 1), name: inputName}
    this.customers.push(this.currentCustomer)
  }

  getTotalRevenueByDate() {
    
  }

}

export default Hotel;