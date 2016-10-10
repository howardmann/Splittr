class BillItem extends React.Component{
  render(){
    return (
      <tr>
        <td>x{this.props.item.quantity}</td>
        <td>{this.props.item.description}</td>
        <td>{this.props.item.price}</td>
        <td>{this.props.item.subtotal}</td>
        <td>Click</td>
      </tr>
    )
  }
}
