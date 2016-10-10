class MainBill extends React.Component {
  constructor(){
    super();
    this.state = {
      id: "",
      location: "",
      date: "",
      total: "",
      items: [],
      debts_owed: [],
      debts_owing: []
    }
  }

  // Fetch json data and store in state before rendering components
  fetchServer(){
    $.ajax({
      url: `/bills/${this.props.bill}.json`,
      type: 'GET'
    }).done((response)=>{
      console.log('Bill fetched /bills/:id', response);
      this.setState({
        id: response.id,
        location: response.location,
        date: response.date,
        total: response.total,
        items: response.items,
        debts_owed: response.debts_owed,
        debts_owing: response.debts_owing
      });
    });
  }

  componentWillMount(){
    this.fetchServer();
  }

  render(){
    return (
      <div>
        <h1>Bill Summary</h1>
        <p>Location: {this.state.location} | Date: {this.state.date}</p>
        <AllBillItems items={this.state.items} total={this.state.total}/>
      </div>
    )
  }
}
