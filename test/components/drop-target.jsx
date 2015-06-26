'use strict';

var React = require('react');
var DndDropTarget = require('react-dnd').DropTarget;

var contentId = 1;

var DropTarget = React.createClass({

  render: function() {
    var connectDropTarget = this.props.connectDropTarget;

    var styles = {};
    if(this.props.isOver) {
       styles.opacity = 1;
    }

    return connectDropTarget(
      <div className="scaffold-drop-target" style={styles} onClick={this.onClick}>+</div>
    );
  },
  
  onClick: function() {
    var scaffold = this.props.scaffoldSettings.scaffold;
    var newContentCell = scaffold.createContentCell({id: 'DROP-' + contentId++});
    
    this.props.parentColumn.addChildCell(newContentCell, this.props.beforeCell);
  }
});


var spec = {
  drop: function(props, monitor, component) {
    var scaffold = component.props.scaffoldSettings.scaffold;

    switch(monitor.getItemType()) {
      case 'cell':
        var cellId = monitor.getItem().id;
        var cell = scaffold.getCellById(cellId);
        scaffold.moveCell(cell, props.parentColumn, props.beforeCell);
        break;

      case 'column':
        var columnId = monitor.getItem().id;
        var column = scaffold.getColumnById(columnId);
        var cells = column.getChildCells().slice();
        for (var i = 0; i < cells.length; i++) {
          scaffold.moveCell(cells[i], props.parentColumn, props.beforeCell);
        }
        column.delete();
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


module.exports = DndDropTarget(['cell', 'column'], spec, collect)(DropTarget);
