var React = require('react');
var Scaffold = require('scaffold').Scaffold;
var ScaffoldComponent = require('../components/scaffold.jsx');
var ColumnComponent = require('../components/scaffold-column.jsx');
var DropTarget = require('./components/drop-target.jsx');
var ColumnDropTarget = require('./components/column-drop-target.jsx');
var ReplaceDropTarget = require('./components/replace-drop-target.jsx');
var Content = require('./components/content.jsx');
var ColumnResizer = require('./components/column-resizer.jsx');
var RemoveButton = require('./components/remove-button.jsx');
var DragHandle = require('./components/drag-handle.jsx');

var scaffold = new Scaffold({"width": 12, "validSizes": [12, 8, 6, 4]});
var root = scaffold.getRootColumn();
var contentId = 1;
root.addChildCell(scaffold.createContentCell({"id": contentId++}));
root.addChildCell(scaffold.createContentCell({"id": contentId++}));
root.addChildCell(scaffold.createColumnGroupCell([
  scaffold.createColumn(8, [
    scaffold.createContentCell({"id": contentId++})
  ]),
  scaffold.createColumn(4, [
    scaffold.createContentCell({"id": contentId++})
  ])
]));
root.addChildCell(scaffold.createColumnGroupCell([
  scaffold.createColumn(8, [
    scaffold.createContentCell({"id": contentId++}),
    scaffold.createContentCell({"id": contentId++}),
      scaffold.createColumnGroupCell([
        scaffold.createColumn(4, [
          scaffold.createContentCell({"id": contentId++}),
          scaffold.createContentCell({"id": contentId++})
        ]),
        scaffold.createColumn(4, [])
      ])
  ]),
  scaffold.createColumn(4, [
    scaffold.createContentCell({"id": contentId++})
  ])
]));
root.addChildCell(scaffold.createColumnGroupCell([
  scaffold.createColumn(4, [
    scaffold.createContentCell({"id": contentId++}),
    scaffold.createContentCell({"id": contentId++})
  ]),
  scaffold.createColumn(4, [
    scaffold.createContentCell({"id": contentId++})
  ]),
  scaffold.createColumn(4, [
    scaffold.createContentCell({"id": contentId++})
  ])
]));
root.addChildCell(scaffold.createContentCell({"id": contentId++}));

var scaffoldSettings = {
  "scaffold": scaffold,
  "includeDropTargets": true,
  "includeColumnDropTargets": true,
  "includeReplaceDropTargets": true,
  "includeColumnResizers": true,
  "includeRemoveButtons": true,
  "includeDragHandles": true,
  "dropTargetComponent": DropTarget,
  "columnDropTargetComponent": ColumnDropTarget,
  "replaceDropTargetComponent": ReplaceDropTarget,
  "contentComponent": Content,
  "columnResizerComponent": ColumnResizer,
  "removeButtonComponent": RemoveButton,
  "dragHandleComponent": DragHandle
};

var HTML5Backend = require('react-dnd/modules/backends/HTML5');
var DragDropContext = require('react-dnd').DragDropContext;

ScaffoldComponent = DragDropContext(HTML5Backend)(ScaffoldComponent);
var rootComponent = <ScaffoldComponent scaffoldSettings={scaffoldSettings} />;

setInterval(function() {
  React.render(rootComponent, document.getElementById('main'));
}, 100);

