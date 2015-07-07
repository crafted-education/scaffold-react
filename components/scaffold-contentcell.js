'use strict';

var React = require('react');

var ScaffoldContentCell = React.createClass({

  render: function() {
    var settings = this.props.scaffoldSettings;
    var canReplace = settings.scaffold.canReplaceContentWithColumns(this.props.cell);
    
    var removeButton = null;
    if(settings.includeRemoveButtons && settings.removeButtonComponent) {
      removeButton = React.createElement(settings.removeButtonComponent, {"key": "rb-" + this.props.cell.getId(), "scaffoldObject": this.props.cell});
    }
    
    var dragHandle = null;
    if(settings.includeDragHandles && settings.dragHandleComponent) {
      dragHandle = React.createElement(settings.dragHandleComponent, {"key": "dh-" + this.props.cell.getId(), "scaffoldObjectType": "cell", "scaffoldObject": this.props.cell});
    }
    
    var leftDropTarget = null;
    var rightDropTarget = null;
    if(settings.includeReplaceDropTargets && settings.replaceDropTargetComponent && canReplace) {
      leftDropTarget = React.createElement(settings.replaceDropTargetComponent, {"key": "ldt-" + this.props.cell.getId(), "cell": this.props.cell, "side": "left", "scaffoldSettings": settings});
      rightDropTarget = React.createElement(settings.replaceDropTargetComponent, {"key": "rdt-" + this.props.cell.getId(), "cell": this.props.cell, "side": "right", "scaffoldSettings": settings});
    }

    return React.createElement('div', {"className": "scaffold-content-cell"}, [
      leftDropTarget,
      React.createElement(this.props.scaffoldSettings.contentComponent, {"key": this.props.cell.getId(), "cell": this.props.cell, "content": this.props.cell.getChildContent()}),
      rightDropTarget,
      removeButton,
      dragHandle,
    ]);
  }
});

module.exports = ScaffoldContentCell;
