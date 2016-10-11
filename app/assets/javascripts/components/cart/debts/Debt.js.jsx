// Debt displays individual debt.user
class Debt extends React.Component{
  render(){
    return (
      <tr onClick={this.props.updateDelete}>
        <td>{this.props.debt.name}</td>
        <td>{this.props.debt.mobile}</td>
      </tr>
    )
  }
}
