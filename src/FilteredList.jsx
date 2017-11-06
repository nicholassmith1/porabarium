import React, { Component } from 'react';
import { DropdownButton, MenuItem} from 'react-bootstrap';
import List from './List';

class FilteredList extends Component {
   constructor(props) {
       super(props);

        // TODO: Add a new key/value pair in the state to keep track of type
       this.state = {
           search: "",
           type: "any",
           complexity: "any",
           sort_by: "alphabetical"
       };
   }

    // Sets the state whenever the user types on the search bar
   onSearch = (event) => {
       this.setState({search: event.target.value.trim().toLowerCase()});
   }

   onTypeFilter = (event) => {
   		// alert("db: " + event + " " + event.id);
   		this.setState({type: event.toLowerCase()});
   }

   onComplexityFilter = (event) => {
   		// alert("db: " + event + " " + event.id);
   		this.setState({complexity: event.toLowerCase()});
   }

	onSortSelect = (event) => {
		this.setState({sort_by: event.target.value.trim().toLowerCase()});
	}

    filterItem = (item) => {
   		var should_include;

        // Checks if the current search term is contained in this item
    	should_include = item.name.toLowerCase().search(this.state.search) !== -1;
    	// check if the current drink type is "any", or this item's type
    	should_include &= (this.state.type === "any") || (item.type === this.state.type);
    	// Check if the current drink complexity is "any", or this item's complexity
    	should_include &= (this.state.complexity === "any") || (item.complexity == this.state.complexity);

    	return should_include;
    }

    sortItem = (a, b) => {
    	// alert("+++" + this.state.sort_by);
    	switch (this.state.sort_by) {
    		case "rating":
    			// Sort descending rating
    			return a.rating == b.rating ? 0 : a.rating > b.rating ? -1 : 1;
    		default:
    		case "alphabetical":
    			return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    	}
    }

    render() {
       return (
            <div className="filter-list">
                <h1>Produce Search</h1>

                <select onChange={this.onSortSelect}>
                	<option value="alphabetical">Alphabetical</option>
                	<option value="rating">Rating</option>
                </select>

               	<label><input type="radio" name="complexity" id="complexity-any" onClick={() => this.onComplexityFilter("any")} defaultChecked="true"/>Any</label>
                <label><input type="radio" name="complexity" id="complexity-easy" onClick={() => this.onComplexityFilter("easy")}/>Easy</label>
                <label><input type="radio" name="complexity" id="complexity-medium" onClick={() => this.onComplexityFilter("medium")}/>Medium</label>
                <label><input type="radio" name="complexity" id="complexity-hard" onClick={() => this.onComplexityFilter("hard")}/>Hard</label>


                <label><input type="radio" name="type" id="type-any" onClick={() => this.onTypeFilter("any")} defaultChecked="true"/>Any</label>
                <label><input type="radio" name="type" id="type-mixed" onClick={() => this.onTypeFilter("mixed-drink")}/>Mixed</label>
                <label><input type="radio" name="type" id="type-cocktail" onClick={() => this.onTypeFilter("cocktail")}/>Cocktail</label>
                <label><input type="radio" name="type" id="type-shot" onClick={() => this.onTypeFilter("shot")}/>Shot</label>


               <input type="text" placeholder="Search" onChange={this.onSearch} />
               <List items={this.props.items.filter(this.filterItem).sort(this.sortItem)} />
           </div>
       );
   }
}
export default FilteredList;