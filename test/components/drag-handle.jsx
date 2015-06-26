'use strict';

var React = require('react');
var DragSource = require('react-dnd').DragSource;

var DragHandle = React.createClass({

  render: function() {
    var connectDragSource = this.props.connectDragSource;
    
    return connectDragSource(
      <div className="scaffold-drag-handle" onClick={this.onClick}>|||</div>
    );
  },
  
  onClick: function() {
    this.props.scaffoldObject.delete();
  }
});


var spec = {
  beginDrag: function(props, monitor, component) {
    return {id: props.scaffoldObject.getId()};
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

function determineItemType(props) {
  return props.scaffoldObjectType;
}

module.exports = DragSource(determineItemType, spec, collect)(DragHandle);
