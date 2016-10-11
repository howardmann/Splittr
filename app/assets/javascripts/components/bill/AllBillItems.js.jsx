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
        <tr className="username">
          <td colSpan="4">AllBillItems</td>
        </tr>

        {items}
        <tr>
          <td colSpan="3"><strong>Total</strong></td>
          <td><strong>{this.props.total}</strong></td>
        </tr>
      </tbody>
    )
  }
}
