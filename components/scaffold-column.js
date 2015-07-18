'use strict';

var React = require('react');
var ContentCell = require('scaffold').ContentCell;
var ColumnGroupCell = require('scaffold').ColumnGroupCell;
var ContentCellComponent = require('./scaffold-contentcell.js');
var ColumnGroupCellComponent = require('./scaffold-columngroupcell.js');

var ScaffoldColumn = React.createClass({
  
  render: function() {
    var isRoot = this.props.isRoot;
    var settings = this.props.scaffoldSettings;

    var renderCell = function(cell) {
      var cellComponent = null;

      if(cell.constructor.name === 'ContentCell') {
        cellComponent = React.createElement(ContentCellComponent, {"key": cell.getId(), "cell": cell, "scaffoldSettings": settings});
      }
      else if(cell.constructor.name === 'ColumnGroupCell') {
        cellComponent = React.createElement(ColumnGroupCellComponent, {"key": cell.getId(), "cell": cell, "ColumnComponent": ScaffoldColumn, "scaffoldSettings": settings});
      }
      
      var beforeCellDropTarget = null;
      if(settings.includeDropTargets && settings.dropTargetComponent) {
        beforeCellDropTarget = React.createElement(settings.dropTargetComponent, {"key": "dt-" + cell.getId(), "beforeCell": cell, "parentColumn": cell.getParentColumn(), "scaffoldSettings": settings})
      }      
        
      return [beforeCellDropTarget, cellComponent];
    }

    var endOfColumnDropTarget = null;
    if(this.props.scaffoldSettings.includeDropTargets && this.props.scaffoldSettings.dropTargetComponent) {
      endOfColumnDropTarget = React.createElement(this.props.scaffoldSettings.dropTargetComponent, {"key": "ecdt-" + this.props.column.getId(), "beforeCell": null, "parentColumn": this.props.column, "scaffoldSettings": this.props.scaffoldSettings})
    }

    var dragHandle = null;
    if(settings.includeColumnDragHandles && settings.dragHandleComponent && !isRoot) {
      dragHandle = React.createElement(settings.dragHandleComponent, {"key": "dh-" + this.props.column.getId(), "scaffoldObjectType": "column", "scaffoldObject": this.props.column});
    }

    var removeButton = null;
    if(settings.includeRemoveButtons && settings.removeButtonComponent && !isRoot) {
      removeButton = React.createElement(settings.removeButtonComponent, {"key": "rb-" + this.props.column.getId(), "scaffoldObject": this.props.column});
    }

    var rootClassName = '';
    if(isRoot) {
      rootClassName = 'scaffold-root ';
    }

    var childCells = this.props.column.getChildCells();
    return (
      React.createElement('div', {"className": rootClassName + "scaffold-column", "style": {"flexGrow": this.props.column.getWidth(), "flexBasis":  this.props.column.getWidth()}}, [
        childCells.map(renderCell),
        endOfColumnDropTarget,
        dragHandle,
        removeButton,
      ])
    );
  }
});

module.exports = ScaffoldColumn;
