var findWithAttr = function(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
};


class MainBill extends React.Component {
  constructor(){
    super();
    this.state = {
      id: "",
      location: "",
      date: "",
      total: "",
      current_user_id: "",
      items: [],
      debts: []
    }
  }

  // Fetch json data and store in state before rendering components
  fetchServer(){
    $.ajax({
      url: `/bills/${this.props.bill}.json`,
      type: 'GET'
    }).done((response)=>{
      console.log('Bill fetched /bills/:id', response);
      this.setState({
        id: response.id,
        location: response.location,
        date: response.date,
        total: response.total,
        current_user_id: response.current_user_id,
        items: response.items,
        debts: response.debts
      });
    });
  }

  componentWillMount(){
    this.fetchServer();
  }

  render(){
    let allDebts = this.state.debts.map((debt)=>{
      return (
        <BillDebt key= {debt.id} debt={debt}
          updateReduce={this.updateReduce.bind(this)}/>
      )
    });

    return (
      <div>
        <h1>Bill Summary</h1>
        <p>Location: {this.state.location} | Date: {this.state.date}</p>

        <table>
          <tbody>
          <tr>
            <th>Qty</th>
            <th>Description</th>
            <th>Unit $</th>
            <th>Total $</th>
          </tr>
          </tbody>
          <AllBillItems items={this.state.items} total={this.state.total} updateReduce={this.updateReduce.bind(this)}/>

          {allDebts}
        </table>
      </div>
    )
  }

  updateReduce(property, id, user_id){
    if (property === "items") {
      var itemIndex = findWithAttr(this.state[property],'id',id);
      var item = this.state[property][itemIndex];
    } else if (property === "debts") {
      // TOdo Validate correct user
      var debtIndex = findWithAttr(this.state[property],'user_id',this.state.current_user_id);
      var debt = this.state[property][debtIndex];

      if (debt.user_id != user_id) {
        console.log("Does not match current_user");
        return false;
      }

      var debtItemIndex = findWithAttr(debt.items, 'id', id)
      var item = debt.items[debtItemIndex];
    }

    item.quantity -= 1;
    item.subtotal = (item.quantity * parseInt(item.price)).toFixed(2);

    if (item.quantity === 0){
      this.updateDelete(property, id, debt, debtItemIndex);
    } else {
      this.setState({
        [property]: this.state[property]
      });
    }

    if (property==="items"){
      this.updateAdd(item);
    }
  }

  updateDelete(property, id, debt, debtItemIndex){
    var itemsArr;

    if (property === "items") {
      itemsArr = this.state.items;
      var newState = itemsArr.filter((el)=>{
        return el.id != id;
      });
      this.setState({
        [property]: newState
      });
    } else if (property === "debts") {
      debt.items.splice(debtItemIndex,1);
      this.setState({
        [property]: this.state[property]
      })
    }
  }

  updateAdd(item){
    var debtIndex = findWithAttr(this.state.debts,'user_id',this.state.current_user_id);
    var debt = this.state.debts[debtIndex];
    console.log(item,debt.name);
    var debtItemIndex = findWithAttr(debt.items,'description',item.description);
    var debtItem = debt.items[debtItemIndex];
    if (debtItem) {
      debtItem.quantity += 1;
      debtItem.subtotal = (debtItem.quantity * parseInt(debtItem.price)).toFixed(2);
    } else {
      let newDebtItem = Object.assign({},item);
      newDebtItem.quantity = 1;
      newDebtItem.subtotal = (newDebtItem.quantity * parseInt(newDebtItem.price)).toFixed(2);
      debt.items.push(newDebtItem);
    }

    this.setState({
      debts: this.state.debts
    })
  }

}


class BillDebt extends React.Component{
  render(){
    let items = this.props.debt.items.map((item)=>{
        return (
          <BillItem key={item.id} item={item}
            updateReduce={this.props.updateReduce.bind(this,'debts',item.id, this.props.debt.user_id)}/>
        )
    });

    return (
      <tbody>
        <tr className="username">
          <td colSpan="4">{this.props.debt.name}</td>
        </tr>
        {items}
      </tbody>
    )
  }
}
