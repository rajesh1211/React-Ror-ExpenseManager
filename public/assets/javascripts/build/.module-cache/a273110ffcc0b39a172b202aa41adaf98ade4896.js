var Expense = React.createClass({displayName: "Expense",
  getInitialState: function() {
    return {
      expenses: [],
      summary: {
        credit: 0,
        debit: 0,
        balance: 0
      }
    };
  },
  componentWillMount: function() {
    var self = this;
    $.ajax({
      url: '/expenses',
      method: 'GET',
      success: function(response) {
        var summary = self.updateSummary(response)
        self.setState({
          expenses : response,
          summary: summary
        });
      },
      error: function(error) {
        console.log(error);
        responseMessage.showError('Something went wrong');
      }      
    });
  },
  updateSummary: function(expenses) {
    var summary = {
      credit: 0,
      debit: 0,
      balance: 0
    } 
    for(item in expenses) {
      if (parseFloat(expenses[item].amount) < 0) {
        summary.credit += (parseFloat(expenses[item].amount || 0) * -1)
      }else{
        summary.debit += parseFloat(expenses[item].amount || 0)
      }
    }
    summary.debit = summary.debit.toFixed(2)
    summary.credit = summary.credit.toFixed(2)
    summary.balance = (summary.debit - summary.credit).toFixed(2);
    return summary;
  },
  addExpense: function (expense, callback) {
    var self = this;
    var params = {
      date: expense.date,
      description: expense.description,
      amount: expense.amount
    }
    $.ajax({
      url: '/expenses',
      method: 'POST',
      data: params,
      success: function(response) {
        var expenses = self.state.expenses;
        expenses.unshift(response);
        var summary = self.state.summary;
        summary = self.updateSummary(expenses);
        self.setState({
          expenses : expenses,
          summary: summary
        });
        callback();
        responseMessage.showSuccess('Expense added successfully');
      },
      error: function(error) {
        console.log(error);
        callback();
        responseMessage.showError('Something went wrong');
      }            
    });
  },
  updateExpense: function (expense, index, callback) {
    var self = this;
    var params = {
      id: expense.id,
      date: expense.date,
      description: expense.description,
      amount: expense.amount
    }
    $.ajax({
      url: '/expenses/'+params.id,
      method: 'PATCH',
      data: params,
      success: function(response) {
        var expenses = self.state.expenses;
        expenses[index] = response;
        var summary = self.state.summary;
        summary = self.updateSummary(expenses);
        self.setState({
          expenses : expenses,
          summary: summary
        });
        callback();
        responseMessage.showSuccess('Expense updated successfully');
      },
      error: function(error) {
        console.log(error);
        callback();
        responseMessage.showError('Something went wrong');
      }      
    });
  },
  deleteExpense: function (id, index, callback) {
    var self = this;
    $.ajax({
      url: '/expenses/'+id,
      method: 'DELETE',
      success: function(response) {
        var expenses = self.state.expenses;
        expenses.splice(index, 1);
        var summary = self.state.summary;
        summary = self.updateSummary(expenses);
        self.setState({
          expenses : expenses,
          summary: summary
        });
        callback();
        responseMessage.showSuccess('Expense deleted successfully');
      },
      error: function(error) {
        console.log(error);
        callback();
        responseMessage.showError('Something went wrong');
      }     
    });
  },
  createForm: function() {
    return (
      React.createElement(Form,{addExpense: this.addExpense},null)
    );  
  },
  createTable: function() {
    return (
      React.createElement(Table,
        {
          data: this.state.expenses,
          deleteExpense: this.deleteExpense,
          updateExpense: this.updateExpense
        },null)
    );  
  },
  render: function() {
    return (
            React.createElement("div", {className: "expense"}, 
                React.createElement(Summary, {data: this.state.summary}), 
                this.createForm(), 
                this.createTable()
            )
    );
  }
});

