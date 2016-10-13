// AllItems receives items json and renders individual item
class AllItems extends React.Component {
  render() {
    var items = this.props.items.map((item) => {
      return (<Item key={item.id} item={item} updateDelete={this.props.updateDelete.bind(this, 'items', item.id)}/>)
    });

    return (
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

              {items}

              <tr className="table-total">
                <td colSpan="3">
                  <strong>GRAND TOTAL:</strong>
                </td>
                <td>
                  <strong>{this.props.cartTotal}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
