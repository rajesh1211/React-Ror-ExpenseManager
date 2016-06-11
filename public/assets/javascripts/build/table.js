var Table = React.createClass({displayName: "Table",
  createRow: function (data,i) {
    return (
              React.createElement(Row, 
                { 
                  index: i,
                  key: data.id,   
                  id: data.id,  
                  date: data.date,
                  amount: data.amount,
                  description: data.description,
                  deleteExpense: this.props.deleteExpense,
                  updateExpense: this.props.updateExpense
                }, null)
          );
  },
    render: function() {
        var hasRows = false;
        if (this.props.data.length > 0) {
            hasRows = true;
        }
        return (
                React.createElement("div", {className: "record-table-wrap"}, 
                  React.createElement("div", {className: "record-table"}, 
                    React.createElement("div", {className: "th"}, 
                      React.createElement("span", {className: "heading-label"}, 
                          "Date"
                      ), 
                      React.createElement("span", {className: "heading-label"}, 
                          "Title"
                      ), 
                      React.createElement("span", {className: "heading-label"}, 
                          "Amount"
                      ), 
                      React.createElement("span", {className: "heading-label"}, 
                          "Actions"
                      )
                    ), 
                    React.createElement("div", {className: "table-body"}, 
                      hasRows ?
                          this.props.data.map(this.createRow)
                      :
                          React.createElement("div", null, 
                              React.createElement("div", {className: "tr"}, 
                                  React.createElement("span", {className: "td"}, 
                                      "No Results Found"
                                  )
                              )
                          )
                      
                    )
                  )
                )
        );
    }
});

