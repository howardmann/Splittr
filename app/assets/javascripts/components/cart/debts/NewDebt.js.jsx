// NewDebt for posting ajax requests and updating Cart debt and users view
class NewDebt extends React.Component{
  render(){
    return (
      <div>
        <h3>Add People:</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input ref="name" placeholder="Name" className="required" required="true" />
          <input type="tel" ref="mobile" placeholder="Mobile No." className="required" size="14" required="true" pattern="^04(\d *){8}$" title="Enter a valid 10 digit Australian mobile starting with 04 (e.g. 0412 345 678)"/>
          <input className="submit-button" type="submit" value="Add User"/>
        </form>
      </div>
    )
  }

  handleSubmit(e){
    e.preventDefault();
    let id = Math.random()*10000;
    let name = this.refs.name.value;
    let mobile = this.refs.mobile.value;

    // Client-side validatons for mobile. Note: HTML5 form required attributes do not work on mobile
    let debt = {id, name, mobile};
    var result = /^04(\d *){8}$/.test(mobile);

    if (name.length < 1) {
      alert("Please enter a name");
      return false;
    }

    if (!result) {
      alert('Enter a valid 10 digit Australian mobile starting with 04 (e.g. 0412 345 678)');
      return false;
    }

    this.props.updateAdd('debts', debt);

    // Clear out forms
    this.refs.name.value = "";
    this.refs.mobile.value = "";
  }
}
