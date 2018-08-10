import React, { PureComponent } from 'react';

class ListMarkers extends PureComponent {
  render() {
    return (
      <div>
        <ul className="list-group">
          {
            this.props.listMarkers.map(marker => (
              <li 
                className="d-flex list-group-item list-group-item-dark justify-content-between align-items-center"
                key={marker.id}
              >
                Point of routes {marker.id}

                <button
                  className="badge badge-primary badge-pill"
                  onClick={() => this.props.handleClick(marker.id)}
                >X</button>
              </li> 
            ))
          }
        </ul>
      </div>
    );
  }
}

export default ListMarkers;