var Row = React.createClass({displayName: "Row",
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
  cancelUpdate: function () {
    this.setState({editRow: false});
  },
  updateExpense: function () {
    debugger;
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
            React.createElement("div", {className: "tr"}, 
                React.createElement("span", {className: "td"}, 
                    this.props.date
                ), 
                React.createElement("span", {className: "td"}, 
                    this.props.description
                ), 
                React.createElement("span", {className: "td"}, 
                    this.props.amount
                ), 
                React.createElement("span", {className: "td"}, 
                  React.createElement("button", {ref: "editBtn", className: "btn btn-default", onClick: this.editExpense}, 
                    "Edit"
                  ), 
                  React.createElement("button", {ref: "deleteBtn", className: "btn btn-danger", onClick: this.deleteExpense}, 
                    React.createElement("span", {className: "active-txt"}, "Delete"), 
                    React.createElement("span", {className: "disabled-txt"}, "Deleting..")
                  )
                )
            )
            );
    },
    renderForm: function() {
        return (
              React.createElement("div", {className: "tr tr-form"}, 
                  React.createElement("span", {className: "td"}, 
                      React.createElement("input", {type: "date", className: "form-control", placeholder: "date", ref: "date", defaultValue: this.props.date})
                  ), 
                  React.createElement("span", {className: "td"}, 
                      React.createElement("input", {type: "text", className: "form-control", placeholder: "Title", ref: "description", defaultValue: this.props.description})
                  ), 
                  React.createElement("span", {className: "td"}, 
                      React.createElement("input", {type: "text", className: "form-control", placeholder: "Amount", ref: "amount", defaultValue: this.props.amount})
                  ), 
                  React.createElement("span", {className: "td"}, 
                      React.createElement("button", {ref: "updateBtn", className: "btn btn-default", onClick: this.updateExpense}, 
                        React.createElement("span", {className: "active-txt"}, "Update"), 
                        React.createElement("span", {className: "disabled-txt"}, "Updating..")
                      ), 
                      React.createElement("button", {className: "btn btn-danger", onClick: this.cancelUpdate}, 
                        "Cancel"
                      )
                  )
              )
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