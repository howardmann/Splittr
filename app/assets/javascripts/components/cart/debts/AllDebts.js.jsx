// AllDebts receives items json and renders individual debts
class AllDebts extends React.Component {
  render() {
    var debts = this.props.debts.map((debt) => {
      return (<Debt key={debt.id} debt={debt} updateDelete={this.props.updateDelete.bind(this, 'debts', debt.id)}/>)
    });

    return (
      <div className="row">
        <div className="col sm-col-12 col-8 offset-2 center">
          <table>
            <tbody>
              <tr>
                <th>User</th>
                <th>Mobile</th>
              </tr>
              {debts}
            </tbody>
          </table>

        </div>
      </div>
    )
  }
}
