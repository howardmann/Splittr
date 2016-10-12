class BillDebt extends React.Component{

  render(){
    let items = this.props.debt.items.map((item)=>{
        return (
          <BillItem key={item.id} item={item}
            updateReduce={this.props.updateReduce.bind(this,'debts',item.id, this.props.debt.user_id)}/>
        )
    });

    let total = this.props.debt.items.reduce((sum,item)=>{
      return sum += parseInt(item.subtotal);
    },0);

    let userClass;
    if (this.props.currentUser === this.props.debt.user_id) {
      userClass = "current-user";
    } else {
      userClass = "user";
    }

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
        <tr>
          <td colSpan="3"><strong>{debtTotal}</strong></td>
          <td><strong>{total.toFixed(1)}</strong></td>
        </tr>
      </tbody>
    )
  }
}
