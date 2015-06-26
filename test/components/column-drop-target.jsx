'use strict';

var React = require('react');
var DndDropTarget = require('react-dnd').DropTarget;

var contentId = 1;

var ColumnDropTarget = React.createClass({

  render: function() {
    var connectDropTarget = this.props.connectDropTarget;
    
    var styles = {};
    if(this.props.isOver) {
       styles.opacity = 1;
    }

    return connectDropTarget(
      <div className="scaffold-column-drop-target" style={styles} onClick={this.onClick}>+</div>
    );
  },
  
  onClick: function() {
    var scaffold = this.props.scaffoldSettings.scaffold;
    var newColumn = scaffold.createColumn(12, []);
    
    this.props.parentCell.addChildColumn(newColumn, this.props.beforeColumn);
  }
});

var spec = {
  drop: function(props, monitor, component) {
    var scaffold = component.props.scaffoldSettings.scaffold;

    switch(monitor.getItemType()) {
      case 'cell':
        var cellId = monitor.getItem().id;
        var cell = scaffold.getCellById(cellId);
        
        var newColumn = scaffold.createColumn(12, []);    
        props.parentCell.addChildColumn(newColumn, props.beforeColumn);
    
        scaffold.moveCell(cell, newColumn);
        break;
        
      case 'column':
        var columnId = monitor.getItem().id;
        var column = scaffold.getColumnById(columnId);
        scaffold.moveColumn(column, props.parentCell, props.beforeColumn);
        break;
    }
  }
};

function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  };
}


module.exports = DndDropTarget(['cell', 'column'], spec, collect)(ColumnDropTarget);
