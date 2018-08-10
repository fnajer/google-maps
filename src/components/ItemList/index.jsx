import React, { PureComponent } from 'react';
import { Draggable } from 'react-beautiful-dnd';

class ItemList extends PureComponent {

  getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    background: isDragging ? 'lightgreen' : 'grey',
  
    ...draggableStyle,
  })

  render() {
    const { marker, handleClick, index } = this.props;
    return (
      <Draggable draggableId={marker.id} index={index}>
        {
          (provided, snapshot) => (
            <li
              className="d-flex list-group-item list-group-item-dark justify-content-between align-items-center"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={
                this.getItemStyle(
                  snapshot.isDragging,
                  provided.draggableProps.style
                )
              }
            >
              Point of routes {marker.id}

              <button
                className="badge badge-primary badge-pill"
                onClick={() => handleClick(marker.id)}
              >X</button>
            </li>
          )
        }
      </Draggable>
    );
  }
}

export default ItemList;
