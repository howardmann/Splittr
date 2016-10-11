class BillItem extends React.Component{
  render(){
    return (
      <tr onClick={this.props.updateReduce}>
        <td>x{this.props.item.quantity}</td>
        <td>{this.props.item.description}</td>
        <td>{this.props.item.price}</td>
        <td>{this.props.item.subtotal}</td>
      </tr>
    )
  }
}
