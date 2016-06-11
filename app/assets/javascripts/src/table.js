var Table = React.createClass({
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
                <div className="record-table-wrap">
                  <div className="record-table">
                    <div className="th">
                      <span className="heading-label">
                          Date
                      </span>
                      <span className="heading-label">
                          Title
                      </span>
                      <span className="heading-label">
                          Amount
                      </span>
                      <span className="heading-label">
                          Actions
                      </span>
                    </div>
                    <div className="table-body">
                      {hasRows ?
                          this.props.data.map(this.createRow)
                      :
                          <div>
                              <div className="tr">
                                  <span className="td">
                                      No Results Found
                                  </span>
                              </div>    
                          </div>
                      }
                    </div>
                  </div>
                </div>
        );
    }
});

