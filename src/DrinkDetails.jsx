import React, { Component } from 'react';

/*
 The list component will take the list of items passed in as a property
 and create an HTML list with those item. In this example, we are passing in the
 filtered produce list, but this component can be used for other types of items

  as long as it has a name.

*/
class DrinkDetails extends Component {
	constructor(props) {
    	super(props);
	}

	renderIngredients() {
		const items = this.props.item.ingredients.map(item => {
        	return <tr>
           		<td>{item.a}</td><td>{item.i}</td>
           	</tr>
    	});

    	return items;
	}

	render() {
		//console.log("db " + this.props.item.name)
		if (this.props.item == null) {
			return (
				<div className="drinkdetails_div"></div>
			);
		}

    	return (
    		<div className="drinkdetails_div">
	    		<img src="fixme" />
	    		<h1>{this.props.item.name}</h1>
	    		<h1>Ingredients</h1>
	    			<table>
	    				<tbody>
	    				{this.renderIngredients()}
	    				</tbody>
	    			</table>
	    		<h1>Instructions</h1>
	    		{this.props.item.instructions}
        	</div>
       );
   }

}

export default DrinkDetails;