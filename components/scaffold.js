'use strict';

var React = require('react');
var ColumnComponent = require('../components/scaffold-column.js');

var React = require('react');

var Scaffold = React.createClass({

  render: function() {
		
		var settings = {
		  "scaffold": this.props.scaffold,
		  "includeDropTargets": this.props.includeDropTargets || false,
		  "includeColumnDropTargets": this.props.includeColumnDropTargets || false,
		  "includeReplaceDropTargets": this.props.includeReplaceDropTargets || false,
		  "includeColumnResizers": this.props.includeColumnResizers || false,
		  "includeRemoveButtons": this.props.includeRemoveButtons || false,
		  "includeDragHandles": this.props.includeDragHandles || false,
		  "includeColumnDragHandles": this.props.includeColumnDragHandles || false,
		  "dropTargetComponent": this.props.dropTargetComponent,
		  "columnDropTargetComponent": this.props.columnDropTargetComponent,
		  "replaceDropTargetComponent": this.props.replaceDropTargetComponent,
		  "contentComponent": this.props.contentComponent,
		  "columnResizerComponent": this.props.columnResizerComponent,
		  "removeButtonComponent": this.props.removeButtonComponent,
		  "dragHandleComponent": this.props.dragHandleComponent
		};

		
    var root = settings.scaffold.getRootColumn();
    
    return React.createElement(ColumnComponent, {"column": root, "isRoot": true, "scaffoldSettings": settings});
  }
});

module.exports = Scaffold;
