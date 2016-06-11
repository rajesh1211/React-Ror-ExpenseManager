var Tile = React.createClass({displayName: "Tile",
    render: function() {
        return (
                React.createElement("li", {className: this.props.style}, 
                    React.createElement("div", {className: "tile-inner"}, 
                        React.createElement("h3", {className: "summary-tile-heading"}, 
                            this.props.heading
                        ), 
                        React.createElement("div", {className: "summary-tile-body"}, 
                            this.props.data
                        )
                    )
                )
        );
    }
});

