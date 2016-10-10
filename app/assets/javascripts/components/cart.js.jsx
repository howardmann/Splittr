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
        <NewItem updateView={this.updateView.bind(this)}/>
        <button onClick={this.handleSync.bind(this)}>Click to sync</button>
        <AllItems items={this.state.items} cartTotal={this.state.cartTotal}/>
      </div>
    )
  }

  updateView(property, response){
    let newState = this.state[property].concat(response);

    let newCartTotal = newState.reduce(function(sum,el){
      return sum += parseInt(el.subtotal);
    },0).toFixed(2);

    this.setState({
      cartTotal: newCartTotal,
      [property]:newState
    });
  }

  handleSync(){
    console.log("syncy");
    let items = this.state.items;
    $.ajax({
      url: '/items',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({items})
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
    this.props.updateView('items', item);


    // $.ajax({
    //   url: '/items',
    //   type: 'POST',
    //   data: {
    //     item: {description, price, quantity}
    //   }
    // }).done((response)=>{
    //   this.props.updateView('items', response);
    // });

  }
}

// AllItem receives items json and renders individual item
class AllItems extends React.Component{
  render(){
    var items = this.props.items.map((item) => {
      return (
        <Item key={item.id} item={item}/>
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
        <td>Delete</td>
      </tr>
    )
  }
}
