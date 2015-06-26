'use strict';

var React = require('react');
var DndDropTarget = require('react-dnd').DropTarget;

var blockId = 1;

var ReplaceDropTarget = React.createClass({

  render: function() {
    var connectDropTarget = this.props.connectDropTarget;

    var styles = {};
    if(this.props.isOver) {
       styles.opacity = 1;
    }

    return connectDropTarget(
      <div className={"scaffold-replace-drop-target " + this.props.side} style={styles} onClick={this.onClick}>+</div>
    );
  },
  
  onClick: function() {
    var scaffold = this.props.scaffoldSettings.scaffold;
    
    var placeBlockInRightColumn = false;
    if(this.props.side === 'left') {
       placeBlockInRightColumn = true;
    }
    
    scaffold.replaceBlockWithColumns(this.props.cell, placeBlockInRightColumn);
    
    var newBlockCell = scaffold.createBlockCell({id: 'DROP-' + blockId++});
    
    var index = (this.props.side === 'left') ? 0 : 1;
    
    this.props.cell.getParentColumn().getParentCell().getChildColumns()[index].addChildCell(newBlockCell);
    
  }
});


var spec = {
  drop: function(props, monitor, component) {
    console.log('drop', props, monitor, component);
    
    var scaffold = component.props.scaffoldSettings.scaffold;
    var cellId = monitor.getItem().id;
    var cell = scaffold.getCellById(cellId);

    var placeBlockInRightColumn = false;
    if(props.side === 'left') {
       placeBlockInRightColumn = true;
    }    
    
    scaffold.replaceBlockWithColumns(props.cell, placeBlockInRightColumn);
     
    var index = (props.side === 'left') ? 0 : 1;
    
    var newParentColumn = props.cell.getParentColumn().getParentCell().getChildColumns()[index];
    
    scaffold.moveCell(cell, newParentColumn);
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


module.exports = DndDropTarget(['cell', 'column'], spec, collect)(ReplaceDropTarget);
