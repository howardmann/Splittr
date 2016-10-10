// NewItem for posting ajax requests and updating Cart view
class NewItem extends React.Component{
  render(){
    return (
      <div>
        <h3>Add Items:</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input ref="description" placeholder="Description" autoFocus="autofocus" required="true" />
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

    // Clear out forms
    this.refs.description.value = "";
    this.refs.price.value = "";
    this.refs.quantity.value = 1;
  }
}
