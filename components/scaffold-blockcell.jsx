'use strict';

var React = require('react');

var ScaffoldBlockCell = React.createClass({

  render: function() {
    var settings = this.props.scaffoldSettings;
    var canReplace = settings.scaffold.canReplaceBlockWithColumns(this.props.cell);
    
    var removeButton = null;
    if(settings.includeRemoveButtons && settings.removeButtonComponent) {
      removeButton = <settings.removeButtonComponent scaffoldObject={this.props.cell} />;
    }
    
    var dragHandle = null;
    if(settings.includeDragHandles && settings.dragHandleComponent) {
      dragHandle = <settings.dragHandleComponent scaffoldObjectType="cell" scaffoldObject={this.props.cell} />;
    }
    
    var leftDropTarget = null;
    var rightDropTarget = null;
    if(settings.includeReplaceDropTargets && settings.replaceDropTargetComponent && canReplace) {
      leftDropTarget = <settings.replaceDropTargetComponent cell={this.props.cell} side="left" scaffoldSettings={settings} />;
      rightDropTarget = <settings.replaceDropTargetComponent cell={this.props.cell} side="right" scaffoldSettings={settings} />;
    }

    return (
      <div className="scaffold-block-cell">
        {leftDropTarget}
        <this.props.scaffoldSettings.blockComponent cell={this.props.cell} block={this.props.cell.getChildBlock()} />
        {rightDropTarget}
        {removeButton}
        {dragHandle}
      </div>
    );
  }
});

module.exports = ScaffoldBlockCell;
