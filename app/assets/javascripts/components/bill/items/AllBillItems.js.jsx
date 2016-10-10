class AllBillItems extends React.Component{
  render(){
    var items = this.props.items.map((item) => {
      return (
        <BillItem key={item.id} item={item} />
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
            <th>Own up!</th>
          </tr>

          {items}

          <tr>
            <td colSpan="3"><strong>Total unclaimed:</strong></td>
            <td><strong>{this.props.total}</strong></td>
            <td></td>
          </tr>
          </tbody>
        </table>

      </div>
    )
  }
}
