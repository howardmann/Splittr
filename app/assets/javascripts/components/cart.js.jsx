// Cart submits ajax requests, stores state and renders other components
class Cart extends React.Component{
  constructor(){
    super();
    this.state = {
      cartTotal: [],
      items: []
    }
  }

  componentWillMount(){
    $.ajax({
      url: `/carts/${this.props.current_cart}.json`,
      type: 'GET'
    }).done((response)=>{
      console.log('Cart fetched /cart/:id');
      this.setState({
        cartTotal: response.total,
        items: response.items
      });
    });
  }

  render(){
    return (
      <div>
        <h1>Cart</h1>
        <NewItem updateAdd={this.updateAdd.bind(this)}/>
        <button onClick={this.handleSync.bind(this)}>Click to sync</button>
        <AllItems items={this.state.items} cartTotal={this.state.cartTotal} updateDelete={this.updateDelete.bind(this)}/>
      </div>
    )
  }

  updateAdd(property, response){
    let newState = this.state[property].concat(response);
    let newCartTotal = newState.reduce(function(sum,el){
      return sum += parseInt(el.subtotal);
    },0).toFixed(2);

    this.setState({
      cartTotal: newCartTotal,
      [property]:newState
    });
  }

  // Refactor to make dynamic when deleted
  updateDelete(id){
    console.log("deleted", id);
    let newItems = this.state.items.filter((el)=>{
      return el.id != id;
    });
    let newCartTotal = newItems.reduce(function(sum,el){
      return sum+= parseInt(el.subtotal);
    },0).toFixed(2);

    this.setState({
      cartTotal: newCartTotal,
      items: newItems
    });
  }

  handleSync(){
    console.log("Post request sent");
    let items = this.state.items;
    $.ajax({
      url: '/items',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({items})
    }).done((response)=>{
      console.log("Sync success");
    });
  }
}

// NewItem for posting ajax requests and updating Cart view
class NewItem extends React.Component{
  render(){
    return (
      <div>
        <h3>Add items to cart:</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input ref="description" placeholder="Description" autoFocus='autofocus' required="true" />
          <input ref="price" placeholder="Price $" size="8" required="true"/>
          <input ref="quantity" type="number" defaultValue="1" min="0" max="99"/>
          <input type="submit" value="Add Item"/>
        </form>
      </div>
    )
  }

  handleSubmit(e){
    e.preventDefault();
    let id = Math.random()*10000;
    let description = this.refs.description.value;
    let price = parseInt(this.refs.price.value).toFixed(2);
    let quantity = this.refs.quantity.value;
    let subtotal = parseInt(price * quantity).toFixed(2);

    let item = {id, description, price, quantity, subtotal};
    this.props.updateAdd('items', item);
  }
}

// AllItem receives items json and renders individual item
class AllItems extends React.Component{
  render(){
    var items = this.props.items.map((item) => {
      return (
        <Item key={item.id} item={item} updateDelete={this.props.updateDelete.bind(this,item.id)}/>
      )
    });

    return (
      <div>
        <h3>AllItems:</h3>
        <table>
          <tbody>
          <tr>
            <th>Qty</th>
            <th>Description</th>
            <th>Unit $</th>
            <th>Total $</th>
            <th>Delete</th>
          </tr>

          {items}

          <tr>
            <td colSpan="3"><strong>GRAND TOTAL:</strong></td>
            <td><strong>{this.props.cartTotal}</strong></td>
            <td></td>
          </tr>
          </tbody>
        </table>

      </div>
    )
  }
}

// Item displays individual items
class Item extends React.Component{
  render(){
    return (
      <tr>
        <td>x{this.props.item.quantity}</td>
        <td>{this.props.item.description}</td>
        <td>{this.props.item.price}</td>
        <td>{this.props.item.subtotal}</td>
        <td><button onClick={this.props.updateDelete}>Click</button></td>
      </tr>
    )
  }
}


//##################################
