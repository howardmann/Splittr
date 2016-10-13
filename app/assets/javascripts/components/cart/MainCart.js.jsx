// Cart submits ajax requests, stores state and renders other components
class MainCart extends React.Component{
  constructor(){
    super();
    this.state = {
      cartTotal: [],
      items: [],
      debts: []
    }
  }

  // Fetch json data and store in state before rendering components
  fetchServer(){
    $.ajax({
      url: `/carts/${this.props.current_cart}.json`,
      type: 'GET'
    }).done((response)=>{
      this.setState({
        cartTotal: response.total,
        items: response.items,
        debts: response.debts
      });
    });
  }

  componentWillMount(){
    this.fetchServer();
  }

  // Sync State with Server in intervals calling the handleSync method
  componentDidMount(){
    let syncTimer = setInterval(()=> {this.handleSync();},10000);
    this.setState({syncTimer});
  }

  // Clear timer when leaving page
  componentWillUnmount(){
    clearInterval(this.state.syncTimer);
    console.log('Cleared');
  }

  // Render NewItems/Debts passing in updateAdd state callbacks. Render AllItems/ AllDebts passing in state props and updateDelete callbacks
  render(){
    return (
      <div>
        <NewItem updateAdd={this.updateAdd.bind(this)}/>
        <br/>
        <AllItems items={this.state.items} cartTotal={this.state.cartTotal} updateDelete={this.updateDelete.bind(this)}/>
        <hr/>
        <NewDebt updateAdd={this.updateAdd.bind(this)}/>
        <br/>
        <AllDebts debts={this.state.debts}
          updateDelete={this.updateDelete.bind(this)}/>
        <button className="btn new-bill" onClick={this.navigateBillNew.bind(this)}>New Bill</button>
      </div>
    )
  }

  // Dynamically update state when item/debts are added
  updateAdd(property, response){
    this.state[property].unshift(response);

    this.setState({
      [property]:this.state[property]
    });

    if (property === 'items') {
      this.updateCartTotal(property);
    }
  }

  // Dynamically update state when item/debts are deleted. Use JS filter method
  updateDelete(property, id){
    var newState = this.state[property].filter((el)=>{
      return el.id != id;
    });

    this.setState({
      [property]: newState
    });

    if (property === 'items') {
      this.updateCartTotal(property);
    }
  }

  // Callback to update cartTotal when item is modified
  updateCartTotal(property){
    let newCartTotal = this.state[property].reduce(function(sum,el){
      return sum+= parseInt(el.subtotal);
    },0).toFixed(1);
    this.setState({
      cartTotal: newCartTotal
    });
  }

  // Post data to Rails api for batch creation and deletion
  handleSync(){
    let newCart = {
      items: this.state.items,
      debts: this.state.debts
    };

    var self = this;

    $.ajax({
      url: '/carts/sync',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({newCart})
    });
  }

  // Validations for navigating to new bill page
  navigateBillNew(){
    this.handleSync();
    if (this.state.items.length === 0){
      alert("Please add items");
    } else if (this.state.debts.length < 1){
      alert("Please add at least 1 person");
    } else {
      location.assign('/bills/new');
    }
  }
}
