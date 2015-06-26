'use strict';

var React = require('react');

var ScaffoldContentCell = React.createClass({

  render: function() {
    var settings = this.props.scaffoldSettings;
    var canReplace = settings.scaffold.canReplaceContentWithColumns(this.props.cell);
    
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
      <div className="scaffold-content-cell">
        {leftDropTarget}
        <this.props.scaffoldSettings.contentComponent cell={this.props.cell} content={this.props.cell.getChildContent()} />
        {rightDropTarget}
        {removeButton}
        {dragHandle}
      </div>
    );
  }
});

module.exports = ScaffoldContentCell;
