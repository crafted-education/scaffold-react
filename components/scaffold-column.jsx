'use strict';

var React = require('react');
var ContentCell = require('scaffold').ContentCell;
var ColumnGroupCell = require('scaffold').ColumnGroupCell;
var ContentCellComponent = require('./scaffold-contentcell.jsx');
var ColumnGroupCellComponent = require('./scaffold-columngroupcell.jsx');

var ScaffoldColumn = React.createClass({
  
  render: function() {
    var isRoot = this.props.isRoot;
    var settings = this.props.scaffoldSettings;

    var renderCell = function(cell) {
      var cellComponent = null;
      
      if(cell instanceof ContentCell) {
        cellComponent = <ContentCellComponent key={cell.getId()} cell={cell} scaffoldSettings={settings} />;
      }
      else if(cell instanceof ColumnGroupCell) {
        cellComponent = <ColumnGroupCellComponent key={cell.getId()} cell={cell} ColumnComponent={ScaffoldColumn} scaffoldSettings={settings}/>;
      }
      
      var beforeCellDropTarget = null;
      if(settings.includeDropTargets && settings.dropTargetComponent) {
        beforeCellDropTarget = <settings.dropTargetComponent beforeCell={cell} parentColumn={cell.getParentColumn()} scaffoldSettings={settings} />
      }      
        
        return [beforeCellDropTarget, cellComponent];
      }

    var endOfColumnDropTarget = null;
    if(this.props.scaffoldSettings.includeDropTargets && this.props.scaffoldSettings.dropTargetComponent) {
      endOfColumnDropTarget = <this.props.scaffoldSettings.dropTargetComponent beforeCell={null} parentColumn={this.props.column} scaffoldSettings={this.props.scaffoldSettings} />
    }
        
    var dragHandle = null;
    if(settings.includeDragHandles && settings.dragHandleComponent && !isRoot) {
      dragHandle = <settings.dragHandleComponent scaffoldObjectType="column" scaffoldObject={this.props.column} />;
    }

    var removeButton = null;
    if(settings.includeRemoveButtons && settings.removeButtonComponent && !isRoot) {
      removeButton = <settings.removeButtonComponent scaffoldObject={this.props.column} />;
    }

    var rootClassName = '';
    if(isRoot) {
      rootClassName = 'scaffold-root ';
    }

    var childCells = this.props.column.getChildCells();
    return (
      <div className={rootClassName + "scaffold-column"} style={{"flexGrow": this.props.column.getWidth(), "flexBasis":  this.props.column.getWidth()}}>
        <div className="scaffold-column-id">COLUMN - id: {this.props.column.getId()}, width: {this.props.column.getWidth()}</div>
        {childCells.map(renderCell)}
        {endOfColumnDropTarget}
        {dragHandle}
        {removeButton}
      </div>
    );
  }
});

module.exports = ScaffoldColumn;
