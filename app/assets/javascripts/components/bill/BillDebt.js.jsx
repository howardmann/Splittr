class BillDebt extends React.Component{

  render(){
    // Instantiate new BillItem components by iterating and passing through the items prop received. Also pass in updateReduce callback when clicked on
    let items = this.props.debt.items.map((item)=>{
        return (
          <BillItem key={item.id} item={item}
            updateReduce={this.props.updateReduce.bind(this,'debts',item.id, this.props.debt.user_id)}/>
        )
    });

    // Calculate and cache total dollar amount of debt
    let total = this.props.debt.items.reduce((sum,item)=>{
      return sum += parseInt(item.subtotal);
    },0);

    // Determine if debt user is same as current_user and then save class name accordingly
    let userClass;
    if (this.props.currentUser === this.props.debt.user_id) {
      userClass = "current-user";
    } else {
      userClass = "user";
    }

    // Determine if debt user paid or owes money for the bill
    let paidUser = this.props.paidUser;
    let paidStatus;
    let debtTotal;
    if (this.props.debt.paid) {
      paidStatus = "Paid";
      debtTotal = "Total share of bill"
    } else {
      paidStatus = "Owes";
      debtTotal = `${this.props.debt.name} owes ${paidUser}`
    }

    return (
      <tbody>
        <tr className={userClass}>
          <td colSpan="4">{this.props.debt.name} ({this.props.debt.mobile}) - {paidStatus}</td>
        </tr>
        {items}
        <tr className="table-total">
          <td colSpan="3"><strong>{debtTotal}</strong></td>
          <td><strong>{total.toFixed(1)}</strong></td>
        </tr>
      </tbody>
    )
  }
}
