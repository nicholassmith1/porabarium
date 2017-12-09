import React, { Component } from 'react';

/*
 The list component will take the list of items passed in as a property
 and create an HTML list with those item. In this example, we are passing in the
 filtered produce list, but this component can be used for other types of items

  as long as it has a name.

*/
class DrinkDetails extends Component {

	renderIngredients() {
		const items = this.props.item.ingredients.map(item => {
        	return <tr key={item.i}>
           		<td className="drinkdetails_td_amount">{item.a}</td><td className="drinkdetails_td_ingredient">{item.i}</td>
           	</tr>
    	});

    	return items;
	}

	renderInstructions() {
		var ret = this.props.item.instructions.split('\n').map((item) => {
				  return <p>{item}</p>
		});

		console.log(ret);

		return ret;
	}

	render() {
		//console.log("db " + this.props.item.name)
		if (this.props.item == null) {
			return (
				<div className="drinkdetails_div">
					<img className="drinkdetails_img" src={require("./images/wine.png")} alt="wine.png" />
				</div>
			);
		}

		const image_path = this.props.item.image;
    	return (
    		<div className="drinkdetails_div">
    			<h1>{this.props.item.name}</h1>
	    		<img className="drinkdetails_img" src={require(`${image_path}`)} alt={this.props.item.image} />
	    		<h1>Ingredients</h1>
	    			<table>
	    				<tbody>
	    				{this.renderIngredients()}
	    				</tbody>
	    			</table>
	    		<h1>Instructions</h1>

				{this.renderInstructions()}
        	</div>
       );
   }

}

export default DrinkDetails;