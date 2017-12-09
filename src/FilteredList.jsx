import React, { Component } from 'react';
import List from './List';
import ItemFilter from './ItemFilter';
import DrinkDetails from './DrinkDetails';

class FilteredList extends Component {
   constructor(props) {
       super(props);

       this.state = {
           search: "",
           type: ["mixed-drink", "cocktail", "shot"],
           complexity: "any",
           sort_by: "alphabetical",
           selected_liquor: [],
           selected_mixer: [],
           selected_misc: [],

           show_recipe: ""
       };
   }

    // Sets the state whenever the user types on the search bar
   onSearch = (event) => {
       this.setState({search: event.target.value.trim().toLowerCase()});
   }

   onTypeFilter = (type_name) => {
   		var my_types;
   		// alert("db: " + event + " " + event.id);
   		// Toggle the type.
   		if (this.state.type.some(v => v === type_name.toLowerCase())) {
   			// remove from list
   			my_types = this.state.type.slice().filter(v => v !== type_name.toLowerCase());
   		} else {
   			// add to list
   			my_types = this.state.type.slice().concat(type_name.toLowerCase());
   		}

   		this.setState({type: my_types});
   		// If we ever can't see the selected recipe anymore, remove the show_recipe property
		this.setState({show_recipe: ""});
   }

   onComplexityFilter = (event) => {
   		// alert("db: " + event + " " + event.id);
   		this.setState({complexity: event.toLowerCase()});
   }

	onSortSelect = (event) => {
		this.setState({sort_by: event.target.value.trim().toLowerCase()});
	}

	onShowRecipe = (item) => {
		console.log(item);
		// var my_show_recipe = this.props.items.filter(this.filterItem).filter(el => el.name.trim().toLowerCase() === item.trim().toLowerCase());
		// // console.log(my_show_recipe);

		// if (my_show_recipe.length != 1)
		// 	my_show_recipe = null;
		// else
		// 	my_show_recipe = my_show_recipe[0];
		// this.setState({show_recipe: my_show_recipe});
		this.setState({show_recipe: item.trim().toLowerCase()});
	}

    filterItem = (item) => {
   		var should_include;
   		var ingredient_arr;

        // Checks if the current search term is contained in this item
    	should_include = item.name.toLowerCase().search(this.state.search) !== -1;
    	// Check if the current drink complexity is "any", or this item's complexity
    	should_include &= (this.state.complexity === "any") || (item.complexity === this.state.complexity);
    	// check if the current drink type is "any", or this item's type
    	// should_include &= (this.state.type === "any") || (item.type === this.state.type);
    	// check if the current drink type is in list of types
    	should_include &= this.state.type.some(v => v === item.type);
    	// console.log(this.state.type);
    	// console.log(this.state.type.some(v => v === item.type));

    	// Check if specified liquors on ingredient list
    	if (this.state.selected_liquor.length !== 0) {
    		ingredient_arr = item.ingredients.map(item => {
    			return item.i.toLowerCase();
    		});
    		should_include &= this.state.selected_liquor.every(v => ingredient_arr.indexOf(v) >= 0);
    	}
    	// Check if specified mixers on ingredient list
    	if (this.state.selected_mixer.length !== 0) {
    		ingredient_arr = item.ingredients.map(item => {
    			return item.i.toLowerCase();
    		});
    		should_include &= this.state.selected_mixer.every(v => ingredient_arr.indexOf(v) >= 0);
    	}
    	// Chick if specified misc on ingredient list
    	if (this.state.selected_misc.length !== 0) {
    		ingredient_arr = item.ingredients.map(item => {
    			return item.i.toLowerCase();
    		});
    		should_include &= this.state.selected_misc.every(v => ingredient_arr.indexOf(v) >= 0);
    	}

    	return should_include;
    }

    sortAlphabetical = (a, b) => {
    	return a.toLowerCase().localeCompare(b.toLowerCase());
    }

    sortItem = (a, b) => {
    	// alert("+++" + this.state.sort_by);
    	switch (this.state.sort_by) {
    		case "rating":
    			// Sort descending rating
    			return a.rating === b.rating ? 0 : a.rating > b.rating ? -1 : 1;
    		default:
    		case "alphabetical":
    			return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    		case "num_ing_desc":
    			return (a.ingredients.length === b.ingredients.length) ? 0 : (a.ingredients.length > b.ingredients.length) ? -1 : 1;
    		case "num_ing_ascend":
    			return (a.ingredients.length === b.ingredients.length) ? 0 : (a.ingredients.length > b.ingredients.length) ? 1 : -1;
    	}
    }

  //   	/* This is all just to generate a unique list of ingredients */
  //   	// var my_set = new Set([]);
  //   	// var str = "";
  //   	// var i;
  //   	// var j;

  //   	// for (i = 0; i < this.props.items.length; i++) {
  //   	// 	for (j = 0; j < this.props.items[i].ingredients.length; j++) {
  //   	// 		my_set.add(this.props.items[i].ingredients[j].i.toLowerCase());
  //   	// 	}
  //   	// }
  //   	// for (let ing of my_set.values()) {
  //   	// 	str += "\"" +  ing + "\", ";
  //   	// }
  //   	// console.log(str);

  //   	// const items = this.props.ingredients.map(ingredient => {
  //    //    	return <option key={ingredient}>{ingredient}</option>
  //    //    });

    /*
     * Adds the specified 'val' into the 'selected_xxxx' state. Because
     * this callback is called by ItemFilter items, 'filterlist' will
     * be passed in to be used instead of 'this'
     */
    add_item_cb(filterlist, type, val) {
    	// console.log(type + ", " + val);
    	// console.log(filterlist);
    	switch (type) {
    		case 'liquors':
    			filterlist.setState({selected_liquor: filterlist.state.selected_liquor.slice().concat(val)});
    			break;
    		case 'mixers':
    			filterlist.setState({selected_mixer: filterlist.state.selected_mixer.slice().concat(val)});
    			break;
    		case 'misc':
    			filterlist.setState({selected_misc: filterlist.state.selected_misc.slice().concat(val)});
    			break;
    		default:
    			break;
    	}
    	// If we ever can't see the selected recipe anymore, remove the show_recipe property
		filterlist.setState({show_recipe: ""});
    }

    /*
     * Removes the specified 'val' from the 'selected_xxxx' state. Because
     * this callback is called by ItemFilter items, 'filterlist' will
     * be passed in to be used instead of 'this'
     */
    remove_item_cb(filterlist, type, val) {
    	// console.log(type + ", " + val + ", " + val.ingredient);
    	// console.log(filterlist);
    	var vali = val.ingredient;
    	switch (type) {
    		case 'liquors':
    			var my_selected_liquor = filterlist.state.selected_liquor.slice().filter(function(item) { 
    				return item !== vali;
				});
    			filterlist.setState({selected_liquor: my_selected_liquor});
    			break;
    		case 'mixers':
    			var my_selected_mixer = filterlist.state.selected_mixer.slice().filter(function(item) { 
    				return item !== vali;
				});
    			filterlist.setState({selected_mixer: my_selected_mixer});
    			break;
    		case 'misc':
    			var my_selected_misc = filterlist.state.selected_misc.slice().filter(function(item) { 
    				return item !== vali;
				});
    			filterlist.setState({selected_misc: my_selected_misc});
    			break;
    		default:
    			break;
    	}
    	// If we ever can't see the selected recipe anymore, remove the show_recipe property
		filterlist.setState({show_recipe: ""});
    }

    /* Returns null if the specified drink name doesn't exist in *filtered* list, or object with recipe details*/
    getDrinkDetails(name) {
    	// console.log("test");
    	console.log("get drink details " + name);
		var my_show_recipe = this.props.items.filter(this.filterItem).filter(el => el.name.trim().toLowerCase() === name.trim().toLowerCase());

		console.log("get drink details " + my_show_recipe);
		// console.log(my_show_recipe);

		if (my_show_recipe.length !== 1) {
			my_show_recipe = null;
		} else {
			my_show_recipe = my_show_recipe[0];
		}
		return my_show_recipe;
    }

    render() {
       return (
            <div className="content_div">
            	<div className="filter_div">
            		<h3>Filters:</h3>
	                <ItemFilter filterlist={this} item_type='liquors' items={this.props.liquors} selected_items={this.state.selected_liquor} add_item_cb={this.add_item_cb} remove_item_cb={this.remove_item_cb} />
	                <ItemFilter filterlist={this} item_type='mixers' items={this.props.mixers} selected_items={this.state.selected_mixer} add_item_cb={this.add_item_cb} remove_item_cb={this.remove_item_cb} />
	                <ItemFilter filterlist={this} item_type='misc' items={this.props.misc} selected_items={this.state.selected_misc} add_item_cb={this.add_item_cb} remove_item_cb={this.remove_item_cb} />

	                <h4>Drink Type:</h4>
	                <label><input type="checkbox" name="type" id="type-mixed" onClick={() => this.onTypeFilter("mixed-drink")} defaultChecked="true"/>Mixed</label>
	                <label><input type="checkbox" name="type" id="type-cocktail" onClick={() => this.onTypeFilter("cocktail")} defaultChecked="true"/>Cocktail</label>
	                <label><input type="checkbox" name="type" id="type-shot" onClick={() => this.onTypeFilter("shot")} defaultChecked="true"/>Shot</label>
                </div>

                <div className="recipes_div">
                	<div className="itemfilter_filter_search_div">
		                <div className="sort_div">
			                <font>sort by: </font>
			                <select className="sort_select" onChange={this.onSortSelect}>
			                	<option value="alphabetical">Alphabetical</option>
			                	<option value="rating">Rating</option>
			                	<option value="num_ing_desc">Number of Ingredients, More to Less</option>
			                	<option value="num_ing_ascend">Number of Ingredients, Less to More</option>
			                	
			                </select>
		                </div>

		               <input type="text" className="search_textbox" placeholder="Search" onChange={this.onSearch} />
		            </div>
	               <List filterlist={this} items={this.props.items.filter(this.filterItem).sort(this.sortItem)} show_item={this.state.show_recipe} />
               </div>

               <DrinkDetails item={this.getDrinkDetails(this.state.show_recipe)} />
           </div>
       );
   }
}
export default FilteredList;