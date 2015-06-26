'use strict';

var React = require('react');

var ColumnResizer = React.createClass({

  render: function() {
    return (
      <div className="scaffold-column-resizer" onClick={this.onClick}></div>
    );
  },
  
  onClick: function() {
    var columnGroup = this.props.cell;
    var combos = columnGroup.getPossibleColumnWidthCombinations();
    
    //For now, just pick a random combo
    var randNbr = Math.floor(Math.random() * combos.length);
    columnGroup.setColumnWidths(combos[randNbr]);
  }
});

module.exports = ColumnResizer;
