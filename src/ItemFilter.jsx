import React, { Component } from 'react';

/*
 * Reusable component for adding and removing filters for
 * recipies based on contained components
 *
 * required properties:
 * -filterlist:      implements xxx_cb
 * -item_type:       used in callbacks
 * -items:           all items that can be selected
 * -selected_items:  currently selected
 * -add_item_cb:     (fitlerlist, item_type, item) -> adds 'item' to 'selected_items' in fitlerlist
 * -remove_item_cb:  (filterlist, item_type, itme) -> adds 'item' to 'selected_items' in filterlist
 */
class ItemFilter extends Component {
	constructor(props) {
    	super(props);
	}

	/* 
	 * Create select options for all in items that not also in
	 * selected_items
	 */
	renderSelectableItems() {
     	const my_selected_items = this.props.selected_items;
     	const ret = this.props.items.filter(function( el ) {
  			return my_selected_items.indexOf(el) < 0;
		}).sort(this.sortAlphabetical).map(item => {
        	return <option key={item}>{item}</option>
        });
        return ret;
    }

    /*
     * Create a button for each selected_item with a callback
     * to remove the specified item
     */
    renderSelectedItems() {
     	const ret = this.props.selected_items.map(ingredient => {
        	return <a key={ingredient} onClick={() => this.props.remove_item_cb(this.props.filterlist, this.props.item_type, {ingredient})}>{ingredient} - X</a>
        });
        return ret;
    }

    /* Add the item selected in the select input */
    addSelectItem() {
    	var e = document.getElementById(this.props.item_type);
		var item = e.options[e.selectedIndex].value;
		this.props.add_item_cb(this.props.filterlist, this.props.item_type, item);
		// console.log("stuff " + ingredient);
		// TODO - ensure that this is a copy operation...
		// this.setState({selected_liquor: this.state.selected_liquor.slice().concat(ingredient)});
    }

    render() {
       return (
            <div className="itemfilter_div">
                <div>
                    <select placeholder="{this.props.item_type}" id={this.props.item_type}>
                    	{this.renderSelectableItems()}
                    </select>
                    <input type="button"value="add" onClick={() => this.addSelectItem()}></input>
                </div>

                {this.renderSelectedItems()}
            </div>
    	);
   }
}

export default ItemFilter;