// NewDebt for posting ajax requests and updating Cart debt and users view
class NewDebt extends React.Component{
  render(){
    return (
      <div>
        <h3>Add People:</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input ref="name" placeholder="Name" required="true" />
          <input ref="mobile" placeholder="Mobile No." size="14" required="true"/>
          <input type="submit" value="Add User"/>
        </form>
      </div>
    )
  }

  handleSubmit(e){
    e.preventDefault();
    let id = Math.random()*10000;
    let name = this.refs.name.value;
    let mobile = this.refs.mobile.value;
    let debt = {id, name, mobile};
    console.log("NewDebt clicked", name, mobile);
    this.props.updateAdd('debts', debt);

    // Clear out forms
    this.refs.name.value = "";
    this.refs.mobile.value = "";
  }
}
