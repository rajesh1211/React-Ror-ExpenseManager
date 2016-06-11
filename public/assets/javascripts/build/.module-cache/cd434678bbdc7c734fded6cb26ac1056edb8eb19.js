var Summary = React.createClass({displayName: "Summary",
  render: function() {
      return (
              React.createElement("div", {className: "summary-box"}, 
                React.createElement("div", {className: "summary"}, 
                    React.createElement("h2", {className: "summary-heading"}, 
                        "Records"
                    ), 
                    React.createElement("ul", {className: "summary-list"}, 
                        React.createElement(Tile, {style: "summary-tile summary-tile--credit", heading: "Credit", data: this.props.data.credit}), 
                        React.createElement(Tile, {style: "summary-tile summary-tile--debit", heading: "Debit", data: this.props.data.debit}), 
                        React.createElement(Tile, {style: "summary-tile summary-tile--bal", heading: "Balance", data: this.props.data.balance})
                    )
                )
            )
      );
  }
});

