import React, { PureComponent } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import ItemList from '../ItemList';




class ListMarkers extends PureComponent {
  getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
  })

  reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  }

  onDragEnd = result => {
    if (!result.destination) {
      return;
    }
    
    const items = this.reorder(
      this.props.listMarkers,
      result.source.index,
      result.destination.index
    );

    this.props.handleState(items);
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {
            (provided, snapshot) => (
              <ul 
                className="list-group"
                ref={provided.innerRef}
                style={this.getListStyle(snapshot.isDraggingOver)}
              >
                {
                  this.props.listMarkers.map((marker, index) => (
                    <ItemList 
                      key={marker.id}
                      index={index}
                      marker={marker} 
                      handleClick={this.props.handleClick} 
                    />
                  ))
                }
                {provided.placeholder}
              </ul>
            )
          }
        </Droppable>
      </DragDropContext>
    );
  }
}

export default ListMarkers;