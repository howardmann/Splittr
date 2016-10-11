// AllItems receives items json and renders individual item
class AllItems extends React.Component{
  render(){
    var items = this.props.items.map((item) => {
      return (
        <Item key={item.id} item={item} updateDelete={this.props.updateDelete.bind(this,'items',item.id)}/>
      )
    });

    return (
      <div>
        <table>
          <tbody>
          <tr>
            <th>Qty</th>
            <th>Description</th>
            <th>Unit $</th>
            <th>Total $</th>
          </tr>

          {items}

          <tr>
            <td colSpan="3"><strong>GRAND TOTAL:</strong></td>
            <td><strong>{this.props.cartTotal}</strong></td>
          </tr>
          </tbody>
        </table>

      </div>
    )
  }
}
