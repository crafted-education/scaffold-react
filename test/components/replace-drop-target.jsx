'use strict';

var React = require('react');
var DndDropTarget = require('react-dnd').DropTarget;

var contentId = 1;

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
    
    var placeContentInRightColumn = false;
    if(this.props.side === 'left') {
       placeContentInRightColumn = true;
    }
    
    scaffold.replaceContentWithColumns(this.props.cell, placeContentInRightColumn);
    
    var newContentCell = scaffold.createContentCell({id: 'DROP-' + contentId++});
    
    var index = (this.props.side === 'left') ? 0 : 1;
    
    this.props.cell.getParentColumn().getParentCell().getChildColumns()[index].addChildCell(newContentCell);
    
  }
});


var spec = {
  drop: function(props, monitor, component) {
    console.log('drop', props, monitor, component);
    
    var scaffold = component.props.scaffoldSettings.scaffold;
    var cellId = monitor.getItem().id;
    var cell = scaffold.getCellById(cellId);

    var placeContentInRightColumn = false;
    if(props.side === 'left') {
       placeContentInRightColumn = true;
    }    
    
    scaffold.replaceContentWithColumns(props.cell, placeContentInRightColumn);
     
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
