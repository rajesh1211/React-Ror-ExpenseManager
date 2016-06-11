var Tile = React.createClass({
    render: function() {
        return (
                <li className={this.props.style}>
                    <div className="tile-inner">
                        <h3 className="summary-tile-heading">
                            {this.props.heading}
                        </h3>
                        <div className="summary-tile-body">
                            {this.props.data}
                        </div>
                    </div>
                </li>
        );
    }
});

