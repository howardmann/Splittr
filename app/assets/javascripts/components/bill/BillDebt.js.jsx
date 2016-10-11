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

    return (
      <tbody>
        <tr className="username">
          <td colSpan="4">{this.props.debt.name}</td>
        </tr>
        {items}
        <tr>
          <td colSpan="3"><strong>Total</strong></td>
          <td><strong>{total.toFixed(1)}</strong></td>
        </tr>
      </tbody>
    )
  }
}
