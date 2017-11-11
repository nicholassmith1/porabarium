import React, { Component } from 'react';
import DrinkDetails from './DrinkDetails';

/*
 The list component will take the list of items passed in as a property
 and create an HTML list with those item. In this example, we are passing in the
 filtered produce list, but this component can be used for other types of items

  as long as it has a name.

*/
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show_item: "",
    };
  }

  // onPreviewClick = (item) => {
  //   console.log(item.trim().toLowerCase());

  //   this.setState({show_item: item.trim().toLowerCase()});
  // }

  renderList() {
       const items = this.props.items.map(item => {
           return <div key={item.name} className={"list-preview"} onClick={() => this.props.filterlist.onShowRecipe(item.name)}>
                {item.type}
                <h2>{item.name}</h2>
                complexity: {item.complexity}
                rating: {item.rating}
            </div>
       });

    return items;
  }

  // renderList() {
  //      const items = this.props.items.map(item => {
  //          return <div key={item.name} className={"list-preview"} onClick={() => this.onPreviewClick(item.name)}>
  //               {item.type}
  //               <h2>{item.name}</h2>
  //               complexity: {item.complexity}
  //               rating: {item.rating}
  //           </div>
  //      });

  //   return items;
  // }

  /*
  render() {
    var idx = this.props.items.findIndex(i => i.name.toLowerCase() === this.state.show_item.toLowerCase())
    console.log("index " + idx + " " + this.state.show_item);

    if (idx >= 0) {
      return (
          <div>
            <this.renderList()}
            <div className={"list-container"}>
              {this.renderList()}
            </div>
            <DrinkDetails item={this.props.items[idx]}/>
          </div>
         );
    } else {
      return (
          <div>
            <div className={"list-container"}>
              {this.renderList()}
            </div>
            <div></div>
          </div>
         );
      }
    }
    */

    render() {
      return (
          <div className="list-container">
            {this.renderList()}
          </div>
         );
    }
}

export default List;