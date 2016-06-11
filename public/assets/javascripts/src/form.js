var Form = React.createClass({
  updateStatus: false,
  addExpense: function () {
    var self = this;
    if (! self.updateStatus) {
      self.updateStatus = true;
      var params = {};
      params.date = this.refs.date.getDOMNode().value;
      params.description = this.refs.description.getDOMNode().value;
      params.amount = this.refs.amount.getDOMNode().value;

      var btn = this.refs.createBtn.getDOMNode();
      btn.classList.add('disabled');
      if (this.validateForm(params)) {
        this.props.addExpense(params, function() {
          btn.classList.remove('disabled');
        });
        this.resetForm();
        self.updateStatus = false;
      } else {
        btn.classList.remove('disabled');
        self.updateStatus = false;
      }
    }  
  },
  componentDidMount: function() {
    $("#datepicker").datepicker();
  },
  validateForm: function (params) {
    if (params.date == null || params.date == "") {
      confirm.initConfirm('alert','Date Field cannot be empty',function() {return false;})
      return false;
    }else if (params.description == null || params.description == "") {
      confirm.initConfirm('alert','Description Field cannot be empty',function() {return false;})
      return false;
    }else if (params.amount == null || params.amount == "") {
      confirm.initConfirm('alert','Amount Field cannot be empty',function() {return false;})
      return false;
    }else if (params.amount != null || params.amount != "") {
      if (params.amount.isNAN) {
        confirm.initConfirm('alert','Please enter the valid amount',function() {return false;})
        return false;
      }
    }
    return true;
  },
  resetForm: function() {
    for(item in this.refs) {
      this.refs[item].getDOMNode().value = null;
    }
  },
  render: function() {
    return (
            <div className="add-record-form form-inline">
                <input ref="date" id="datepicker" type="text" placeholder="Date" className="form-control"/>
                <input ref="description" type="text" placeholder="Title" className="form-control"/>
                <input ref="amount" type="number" placeholder="Amount" className="form-control"/>
                <button ref="createBtn" className="btn btn-primary" onClick={this.addExpense}>
                    <span className="active-txt">Create record</span>
                    <span className="disabled-txt">Creating</span>
                </button>
            </div>
    );
  }
});

