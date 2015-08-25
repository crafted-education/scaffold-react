'use strict';

var React = require('react');

var Content = React.createClass({

  render: function() {
    return (
       <div>CONTENT CELL - id: {this.props.cell.getId()}, contentId: {this.props.content.id}, customProp: {this.props.testProp}</div>
    );
  }
});

module.exports = Content;
