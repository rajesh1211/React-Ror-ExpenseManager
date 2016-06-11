var Summary = React.createClass({
  render: function() {
      return (
              <div className="summary-box">
                <div className="summary">
                    <h2 className="summary-heading">
                        Records
                    </h2>
                    <ul className="summary-list">
                        <Tile style="summary-tile summary-tile--credit" heading="Credit" data={this.props.data.credit}></Tile>
                        <Tile style="summary-tile summary-tile--debit" heading="Debit" data={this.props.data.debit}></Tile>
                        <Tile style="summary-tile summary-tile--bal" heading="Balance" data={this.props.data.balance}></Tile>
                    </ul>
                </div>
            </div>
      );
  }
});

