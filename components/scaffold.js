'use strict';

var React = require('react');
var ColumnComponent = require('../components/scaffold-column.js');

var React = require('react');

var Scaffold = React.createClass({

  propTypes: {
    scaffold: React.PropTypes.object.isRequired,
    includeDropTargets: React.PropTypes.bool,
    includeColumnDropTargets: React.PropTypes.bool,
    includeReplaceDropTargets: React.PropTypes.bool,
    includeColumnResizers: React.PropTypes.bool,
    includeRemoveButtons: React.PropTypes.bool,
    includeDragHandles: React.PropTypes.bool,
    includeColumnDragHandles: React.PropTypes.bool,
    dropTargetComponent: React.PropTypes.func,
    columnDropTargetComponent: React.PropTypes.func,
    replaceDropTargetComponent: React.PropTypes.func,
    contentComponent: React.PropTypes.func.isRequired,
    contentComponentProps: React.PropTypes.object,
    columnResizerComponent: React.PropTypes.func,
    removeButtonComponent: React.PropTypes.func,
    dragHandleComponent: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      includeDropTargets: false,
      includeColumnDropTargets: false,
      includeReplaceDropTargets: false,
      includeColumnResizers: false,
      includeRemoveButtons: false,
      includeDragHandles: false,
      includeColumnDragHandles: false,
      dropTargetComponent:null,
      columnDropTargetComponent: null,
      replaceDropTargetComponent: null,
      contentComponentProps: null,
      columnResizerComponent: null,
      removeButtonComponent: null,
      dragHandleComponent: null
    };
  },

  render: function() {

		var settings = {
		  "scaffold": this.props.scaffold,
		  "includeDropTargets": this.props.includeDropTargets,
		  "includeColumnDropTargets": this.props.includeColumnDropTargets,
		  "includeReplaceDropTargets": this.props.includeReplaceDropTargets,
		  "includeColumnResizers": this.props.includeColumnResizers,
		  "includeRemoveButtons": this.props.includeRemoveButtons,
		  "includeDragHandles": this.props.includeDragHandles,
		  "includeColumnDragHandles": this.props.includeColumnDragHandles,
		  "dropTargetComponent": this.props.dropTargetComponent,
		  "columnDropTargetComponent": this.props.columnDropTargetComponent,
		  "replaceDropTargetComponent": this.props.replaceDropTargetComponent,
		  "contentComponent": this.props.contentComponent,
		  "contentComponentProps": this.props.contentComponentProps,
		  "columnResizerComponent": this.props.columnResizerComponent,
		  "removeButtonComponent": this.props.removeButtonComponent,
		  "dragHandleComponent": this.props.dragHandleComponent
		};


    var root = settings.scaffold.getRootColumn();

    return React.createElement(ColumnComponent, {"column": root, "isRoot": true, "scaffoldSettings": settings});
  }
});

module.exports = Scaffold;
