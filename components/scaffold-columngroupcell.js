'use strict';

var React = require('react');

var ScaffoldColumnGroupCell = React.createClass({

  render: function() {
    var self = this;
    var settings = this.props.scaffoldSettings;
    var canResizeColumns = this.props.cell.canColumnsResize();
    var canAddColumn = this.props.cell.canAddColumn(4);
    
    var renderColumn = function(column, index) {

      var beforeColumnResizer = null;
      if(settings.includeColumnResizers && settings.columnResizerComponent && canResizeColumns && index !== 0) {
        beforeColumnResizer = React.createElement(settings.columnResizerComponent,  {"key": "cr-" + column.getId(), "cell":self.props.cell, "scaffoldSettings": settings});
      }      

      var beforeColumnDropTarget = null;
      if(settings.includeColumnDropTargets && settings.columnDropTargetComponent && canAddColumn) {
        beforeColumnDropTarget = React.createElement(settings.columnDropTargetComponent, {"key": "cdt-" + column.getId(), "beforeColumn": column, "parentCell": column.getParentCell(), "scaffoldSettings": settings});
      }      
        
      return [
        beforeColumnResizer,
        beforeColumnDropTarget,
        React.createElement(self.props.ColumnComponent,  {"key":column.getId(), "column":column, "scaffoldSettings": self.props.scaffoldSettings})
      ];
    };

    var endOfColumnGroupDropTarget = null;
    if(settings.includeColumnDropTargets && settings.columnDropTargetComponent && canAddColumn) {
      endOfColumnGroupDropTarget = React.createElement(settings.columnDropTargetComponent,  {"key": "ecgdt-" + this.props.cell.getId(), "beforeColumn": null, "parentCell":this.props.cell, "scaffoldSettings": settings});
    }      

    var childColumns = this.props.cell.getChildColumns();
    return React.createElement('div', {"className": 'scaffold-column-group-cell'}, [
        childColumns.map(renderColumn),
        endOfColumnGroupDropTarget
      ]);
  }
});

module.exports = ScaffoldColumnGroupCell;
