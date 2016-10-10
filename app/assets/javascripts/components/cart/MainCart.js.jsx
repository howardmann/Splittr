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

  componentWillMount(){
    this.fetchServer();
  }

  fetchServer(){
    $.ajax({
      url: `/carts/${this.props.current_cart}.json`,
      type: 'GET'
    }).done((response)=>{
      console.log('Cart fetched /cart/:id');
      this.setState({
        cartTotal: response.total,
        items: response.items,
        debts: response.debts
      });
    });
  }

  render(){
    return (
      <div>
        <h1>Cart</h1>
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

  updateAdd(property, response){
    var newState = this.state[property].concat(response);

    this.setState({
      [property]:newState
    });

    if (property === 'items') {
      this.updateCartTotal(newState);
    }
  }

  updateDelete(property, id){
    var newState = this.state[property].filter((el)=>{
      return el.id != id;
    });

    this.setState({
      [property]: newState
    });

    if (property === 'items') {
      this.updateCartTotal(newState);
    }
  }

  updateCartTotal(newState){
    let newCartTotal = newState.reduce(function(sum,el){
      return sum+= parseInt(el.subtotal);
    },0).toFixed(2);

    this.setState({
      cartTotal: newCartTotal
    });
  }

  navigateBillNew(){
    this.handleSync();
    if (this.state.items.length === 0){
      alert("Please add items");
    } else if (this.state.debts.length < 2){
      alert("Please add at least 2 people");
    } else {
      location.assign('/bills/new');
    }
  }

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
    }).done(()=>{
      self.fetchServer();
    });
  }
}
