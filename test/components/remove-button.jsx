'use strict';

var React = require('react');

var RemoveButton = React.createClass({

  render: function() {
    return (
      <div className="scaffold-remove-button" onClick={this.onClick}>X</div>
    );
  },
  
  onClick: function() {
    this.props.scaffoldObject.delete();
  }
});

module.exports = RemoveButton;
