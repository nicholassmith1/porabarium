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

  renderDrinkType(type_name) {
    switch(type_name) {
      case "mixed-drink":
        return (<img className="img_icon" src={require("./images/mixed_glass.png")} alt="mixed_icon"/>);
      case "cocktail":
        return (<img className="img_icon" src={require("./images/cocktail_glass.ico")} alt="cocktail_icon"/>);
      case "shot":
        return (<img className="img_icon" src={require("./images/shot_glass.png")} alt="shot_icon"/>);
      default:
         return (<div></div>);
    }
  }

  renderList() {
       const items = this.props.items.map(item => {
           return <div key={item.name} className={"list_preview_div"} onClick={() => this.props.filterlist.onShowRecipe(item.name)}>
                {this.renderDrinkType(item.type.toLowerCase())}
                <h2 className="list_preview_name">{item.name}</h2>
                <p className="list_preview_complexity">complexity: {item.complexity}</p>
                <p className="list_preview_rating">rating: {item.rating}</p>
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