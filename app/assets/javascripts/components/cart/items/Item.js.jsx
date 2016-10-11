// Item displays individual items
class Item extends React.Component{
  render(){
    return (
      <tr onClick={this.props.updateDelete}>
        <td>x{this.props.item.quantity}</td>
        <td>{this.props.item.description}</td>
        <td>{this.props.item.price}</td>
        <td>{this.props.item.subtotal}</td>
      </tr>
    )
  }
}
