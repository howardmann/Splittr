// Debt displays individual debt.user
class Debt extends React.Component{
  render(){
    return (
      <tr>
        <td>{this.props.debt.name}</td>
        <td>{this.props.debt.mobile}</td>
        <td><button onClick={this.props.updateDelete}>Click</button></td>
      </tr>
    )
  }
}
