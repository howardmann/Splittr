// NewItem for posting ajax requests and updating Cart view
class NewItem extends React.Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col col-12 center">
            <h3>Add items</h3>
          </div>
        </div>

        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="row">
            <div className="col sm-col-12 col-8 offset-2">
              <div className="col col-1">
                <span className="currency">$</span>
              </div>
              <div className="col col-3">
                <input type="tel" pattern="\d+(\.\d*)?" className="atm" defaultValue="0.00" ref="price" required="true" autoFocus="autofocus"/>
              </div>
              <div className="col col-6">
                <input ref="description" className="required" placeholder="Description" required="true"/>
              </div>
              <div className="col col-2">
                <input type="tel" ref="quantity" defaultValue="1" pattern="^\d+$" title="Enter a valid positive quantity" size="4"/>
              </div>
            </div>
          </div>
          <input className="submit-button" type="submit" value="Add Item"/>
        </form>
      </div>
    )
  }

  handleSubmit(e) {
    e.preventDefault();
    let id = Math.random() * 10000;
    let description = this.refs.description.value;
    let price = parseInt(this.refs.price.value).toFixed(1);
    let quantity = this.refs.quantity.value;
    let subtotal = parseInt(price * quantity).toFixed(1);
    let item = {
      id,
      description,
      price,
      quantity,
      subtotal
    };

    if (description.length < 1) {
      alert("Please enter a description");
      return false;
    }
    this.props.updateAdd('items', item);

    // Clear out forms
    this.refs.description.value = "";
    this.refs.price.value = "0.00";
    this.refs.quantity.value = 1;
    input = ""; // Clear out input varialbe for .atm decimal
  }
}
