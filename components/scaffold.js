'use strict';

var React = require('react');
var ColumnComponent = require('../components/scaffold-column.js');

var React = require('react');

var Scaffold = React.createClass({

  render: function() {
    var settings = this.props.scaffoldSettings;
    var root = settings.scaffold.getRootColumn();
    
    return React.createElement(ColumnComponent, {"column": root, "isRoot": true, "scaffoldSettings": settings});
  }
});

module.exports = Scaffold;
