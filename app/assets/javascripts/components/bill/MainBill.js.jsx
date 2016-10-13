var timer;
class MainBill extends React.Component {
  constructor(){
    super();
    this.state = {
      id: "",
      location: "",
      date: "",
      total: "",
      current_user_id: "",
      paid_user_name: "",
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
      this.setState({
        id: response.id,
        location: response.location,
        date: response.date,
        total: response.total,
        current_user_id: response.current_user_id,
        paid_user_name: response.paid_user_name,
        items: response.items,
        debts: response.debts
      });
    });
  }

  componentWillMount(){
    this.fetchServer();
  }

  componentDidMount(){
    let syncTimer = setInterval(()=> {
      this.fetchServer();
    },10000);
    this.setState({syncTimer});
  }

  componentWillUnmount(){
    clearInterval(this.state.syncTimer);
    console.log('Cleared');
  }

  render(){
    let allDebts = this.state.debts.map((debt)=>{
      return (
        <BillDebt key= {debt.id} debt={debt}  currentUser={this.state.current_user_id}
          paidUser = {this.state.paid_user_name}
          updateReduce={this.updateReduce.bind(this)}/>
      )
    });

    return (
      <div className="container">
        <div className="row">
          <div className="col col-12 center">
            <h3>Your bill at {this.state.location} on {this.state.date}</h3>
          </div>
        </div>
        <div className="row">
          <div className="col sm-col-12 col-8 offset-2 center">
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
        </div>
      </div>
    )
  }

  handleSync(){
    var newBillState = this.state;
    $.ajax({
      url: '/bills/sync',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({newBillState})
    }).done(()=>{
      // resume fetching
      console.log("handleSync response");
      let syncTimer = setInterval(()=> {
        this.fetchServer();
      },10000);
      this.setState({syncTimer});
    });
  }

  // Decrease quantity of item that is clicked on
  updateReduce(property, id, user_id){
    if (property === "items") {
      // Find BillItem state associated with clicked item id
      var itemIndex = findWithAttr(this.state[property],'id',id);
      var item = this.state[property][itemIndex];
    } else if (property === "debts") {
      // Find debt associated with current user
      var debtIndex = findWithAttr(this.state[property],'user_id',this.state.current_user_id);
      var debt = this.state[property][debtIndex];

      // Validate if this element belongs to current user
      if (debt.user_id != user_id) {
        console.log("Does not match current_user");
        return false;
      }
      // Find DebtItem state associated with clicked item id
      var debtItemIndex = findWithAttr(debt.items, 'id', id)
      var item = debt.items[debtItemIndex];
    }

    // Reduce item quantity and update subtotal
    item.quantity -= 1;
    item.subtotal = (item.quantity * parseInt(item.price)).toFixed(1);

    // Delete if quantity falls below 0 and update state
    if (item.quantity === 0){
      this.updateDelete(property, id, debt, debtItemIndex);
    } else {
      this.setState({
        [property]: this.state[property]
      });
    }

    // Callback to add corresponding Bill/ Debt item
    this.updateAdd(property, item);
  }

  // Callback to delete item if quantity below 0
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

  // Callback to increment corresponding Bill/Debt item. Refactor later
  updateAdd(property, item){
    if (property === "items") {
      // Find if same item belongs to a debt.user by checking description
      var debtIndex = findWithAttr(this.state.debts,'user_id',this.state.current_user_id);
      var debt = this.state.debts[debtIndex];
      var debtItemIndex = findWithAttr(debt.items,'description',item.description);
      var debtItem = debt.items[debtItemIndex];

      // If debtItem already exists increment by one, otherwise create a new item for that debt.user and setState
      if (debtItem) {
        debtItem.quantity += 1;
        debtItem.subtotal = (debtItem.quantity * parseInt(debtItem.price)).toFixed(1);
      } else {
        let newDebtItem = Object.assign({},item);
        newDebtItem.quantity = 1;
        newDebtItem.subtotal = (newDebtItem.quantity * parseInt(newDebtItem.price)).toFixed(1);
        debt.items.push(newDebtItem);
      }
      this.setState({
        debts: this.state.debts
      })
    } else if (property === "debts") {
      // Find item in bill with same description
      var billItemIndex = findWithAttr(this.state.items,'description',item.description);
      var billItem = this.state.items[billItemIndex];

      // If item already exists increment by one, otherwise create a new item for that debt.user and setState
      if (billItem) {
        billItem.quantity += 1;
        billItem.subtotal = (billItem.quantity * parseInt(billItem.price)).toFixed(1);
      } else {
        let newItem = Object.assign({},item);
        newItem.quantity = 1;
        newItem.id = Math.random();
        newItem.subtotal = (newItem.quantity * parseInt(newItem.price)).toFixed(1);
        this.state.items.push(newItem);
      }
      this.setState({
        items: this.state.items
      })
    }
    this.updateBillTotal();
    this.updateSync();
  }

  updateBillTotal(){
    let updateTotal = this.state.items.reduce((sum,el)=>{
      return sum += parseInt(el.subtotal);
    },0);
    this.setState({
      total: parseInt(updateTotal).toFixed(1)
    });
  }

  // Upon user action pause fetch requests and post sync thereafter. Resume fetching after post
  updateSync(){
    console.log('updatSync');
    clearTimeout(this.state.syncTimer);
    clearTimeout(timer);
    timer = window.setTimeout(()=>{
      this.handleSync();
    },2000);
  }
}
