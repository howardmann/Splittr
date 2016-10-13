class AllBillItems extends React.Component{
  render(){
    var items = this.props.items.map((item) => {
      return (
        <BillItem key={item.id} item={item}
          updateReduce={this.props.updateReduce.bind(this,'items',item.id)}/>
      )
    });

    return (
      <tbody>
        <tr className="bill-items">
          <td colSpan="4">Claim your items</td>
        </tr>

        {items}
        <tr className="table-total">
          <td colSpan="3"><strong>Total</strong></td>
          <td><strong>{this.props.total}</strong></td>
        </tr>
      </tbody>
    )
  }
}
