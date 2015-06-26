'use strict';

var React = require('react');

var Block = React.createClass({

  render: function() {
    return (
       <div>BLOCK CELL - id: {this.props.cell.getId()}, blockId: {this.props.block.id}</div>
    );
  }
});

module.exports = Block;
