var Row = React.createClass({
  updateStatus: false,
  getInitialState: function() {
    return {
      editRow: false
    };
  },
  editExpense: function () {
    this.setState({editRow: true});
  },
  deleteExpense: function () {
    var self = this;
    if (! self.updateStatus) {
      confirm.initConfirm('confirm','Are you sure , you want to delete this expense ?',function () {
        self.updateStatus = true;
        var btn = self.refs.deleteBtn.getDOMNode();
        btn.classList.add('disabled');
        self.props.deleteExpense(self.props.id, self.props.index, function () {
          btn.classList.remove('disabled');
          self.updateStatus = false;
        })  
      }, function () {
        return false;
      })
      
    }  
  },
  componentDidUpdate: function() {
    $("#date"+this.props.id).datepicker();
  },
  cancelUpdate: function () {
    this.setState({editRow: false});
  },
  updateExpense: function () {
    if (! self.updateStatus) {
      self.updateStatus = true;
      var expense = {};
      expense.id = this.props.id;
      expense.date = this.refs.date.getDOMNode().value;
      expense.description = this.refs.description.getDOMNode().value;
      expense.amount = this.refs.amount.getDOMNode().value;
      var btn = this.refs.updateBtn.getDOMNode();
      btn.classList.add('disabled');
      if (this.validateForm(expense,btn)) {
        this.props.updateExpense(expense, this.props.index, function () {
          btn.classList.remove('disabled');
          self.updateStatus = false;
        });
        this.setState({editRow: false});
        self.updateStatus = false;
      }  
    }  
  },

  validateForm: function (params,targetBtn) {
    var self = this;
    if (params.date == null || params.date == "") {
      confirm.initConfirm('alert','Date Field cannot be empty',
        function() { 
          targetBtn.classList.remove('disabled');
          self.updateStatus = false;
        }
      )
      return false;
    }else if (params.description == null || params.description == "") {
      confirm.initConfirm('alert','Description Field cannot be empty',
        function() { 
          targetBtn.classList.remove('disabled');
          self.updateStatus = false;
        }
      )
      return false;
    }else if (params.amount == null || params.amount == "") {
      confirm.initConfirm('alert','Amount Field cannot be empty',
        function() { 
          targetBtn.classList.remove('disabled');
          self.updateStatus = false;
        }
      )
      return false;
    }else if (params.amount != null || params.amount != "") {
      if (params.amount.isNAN) {
        confirm.initConfirm('alert','Please enter the valid amount',
          function() { 
            targetBtn.classList.remove('disabled');
            self.updateStatus = false;
          }
        )
        return false;
      }
    }
    return true;
  },

  renderDisplay: function() {
        return (
            <div className="tr">
                <span className="td">
                    {this.props.date}
                </span>
                <span className="td">
                    {this.props.description}
                </span>
                <span className="td">
                    {this.props.amount}
                </span>
                <span className="td">
                  <button ref="editBtn" className="btn btn-default" onClick={this.editExpense}>
                    Edit
                  </button>
                  <button ref="deleteBtn" className="btn btn-danger" onClick={this.deleteExpense}>
                    <span className="active-txt">Delete</span>
                    <span className="disabled-txt">Deleting..</span>
                  </button>
                </span>
            </div>
            );
    },
    renderForm: function() {
        return (
              <div className="tr tr-form">
                  <span className="td">
                      <input type="text" id={"date" + this.props.id} className="form-control" placeholder="date" ref="date" defaultValue={this.props.date}/>
                  </span>
                  <span className="td">
                      <input type="text" className="form-control" placeholder="Title" ref="description" defaultValue={this.props.description}/>
                  </span>
                  <span className="td">
                      <input type="text" className="form-control" placeholder="Amount" ref="amount" defaultValue={this.props.amount}/>
                  </span>
                  <span className="td">
                      <button ref="updateBtn" className="btn btn-default" onClick={this.updateExpense}>
                        <span className="active-txt">Update</span>
                        <span className="disabled-txt">Updating..</span>
                      </button>
                      <button className="btn btn-danger" onClick={this.cancelUpdate}>
                        Cancel
                      </button>
                  </span>
              </div>
            )

    },
  render: function() {
    if (this.state.editRow) {
      return this.renderForm();
    }
    else {
      return this.renderDisplay();
    }
  }
});