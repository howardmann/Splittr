// AllDebts receives items json and renders individual debts
class AllDebts extends React.Component{
  render(){
    var debts = this.props.debts.map((debt) => {
      return (
        <Debt key={debt.id} debt={debt}
          updateDelete={this.props.updateDelete.bind(this,'debts',debt.id)}/>
      )
    });

    return (
      <div>
        <table>
          <tbody>
          <tr>
            <th>User</th>
            <th>Mobile</th>
            <th>Delete</th>
          </tr>
          {debts}
          </tbody>
        </table>

      </div>
    )
  }
}
