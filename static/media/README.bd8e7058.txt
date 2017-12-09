README


Run Instructions:
---------------------------------------------------------------
Note: These directions assume that the operator has completed the “Getting Started” section of https://docs.google.com/document/d/e/2PACX-1vTHXQJkAJLotAwqjX6l7QxrWRHS4ZLVT4q3Oaj4y4qEGC965k0ZcmPGDA-sTGHMZwNOM355QqqM95Xw/pub 
  1. In the command terminal, Navigate to “my-app/”
  2. Run the following command:
	“npm start”
  3. In your favorite browser (I developed and tested in Google Chrome, Version 62.0.3202.75), navigate to “http://localhost:3000/”

Goal:
---------------------------------------------------------------
I find my liquor cabinet full of bottles with only a finger or two of liquor left in them. I want to consolidate, but I would feel remise just pouring them out. I love trying new alcoholic concoctions, but I’m not much of a bartender myself. I (and I assume other people) would benefit from a repository of alcoholic recipes that could be searched based off of whatever ingredients you happen to have at hand.

Architecture Design:
---------------------------------------------------------------
My websiste is comprised of the following components:
  - FilteredList
  - ItemFilter
  - List
  - DrinkDetails
The FilteredList module comprises the majority of my website (everything but the page’s header). It’s initialized with an array of all recipe objects, as well as arrays of various types of ingredients (liquors, mixers, and miscellaneous). The FilteredList module is responsible for rendering the three major subcomponents of the website; the filtering region, the recipe list region, and the recipe details region.  These regions are roughly comprised of ItemFilter, List, and DrinkDetails modules, respectively. It passes the array of ingriedents to FilterList modules, an array of recipes to the List module, and a single recipe object to the DrinkDetails modules.

The filtering region is comprised of ItemFilter modules and checkboxes. The checkboxes modify FilteredList’s type state, and the ItemFilter modules modify FilteredList’s selected_liquor, selected_mixer, and selected_misc states. All four of these states are used to filter the list of recipes that are passed to the List module. Although located in the recipe list region of the screen, the “sort by” selection and search bar also modify the data that is distributed to the List module. The “sort by” drop down alters FilteredList’s sort_by state, and the search bar alters the FilteredList’s search state.
The ItemFilter module was created because I was seeing a lot of copy and pasted code for the handling of recipe filtration by ingredients. I originally started with a single list for all ingredients, but that was way too long to be useful, so I separated the ingredients into three types. Each one of the ItemFilter modules is comprised of the type name, a drop-down selection of all the ingredients in that group, and an “add” button. Each of these modules is passed its type, the set of all ingredients in that type-group, a subset of all ingredients in that type-group that are currently selected, and callbacks to add or remove ingredients. When a user clicks the “add” button, the add function in FilteredList is called, and that ingredient is added to the appropriate selected_liquor, selected_mixer, or selected_misc state. The causes the ItemFilters to be re-rendered with new ‘currently selected ingredients’ data. Any currently selected ingredients are rendered as buttons below the drop-down selection area, and each of these buttons, when clicked, will call the ‘remove ingredient’ function in FilteredList and remove it from the appropriate state.

The List module is responsible for rendering a subset of the recipes passed to the FilteredList module. Everytime one of the above states is modified, the List is passed the new subset of recipes that fulfill the filters, in the specified order. The List module generates a collection of <div> html objects populated with the appropriate recipe name, rating, complexity, and icon based on what type of recipe it is. Each one of these objects is created with an onClick handler that alters FilteredList’s show_recipe state. The result is that any time a user clicks one of the recipe summaries in the recipe list, the recipe details region is update to show that recipe.

The DrinkDetails module is responsible for rendering a more comprehensive set of information for any selected recipe. It is passed a recipe object, and renders the recipe name, and image, a full list of ingredients and amounts, and a short set of directions for creating that drink.

Design Decisions:
---------------------------------------------------------------
Clarity is at the heart of good user interfaces, and doubly so for inebriated individuals! To that end, I’ve once again opted for a minimalist, more modern design. I tried to use high contract text to background color ratios (mostly blacks on whites, with the occasional white on dark color).

I tried to implement a left-to-right workflow, with filters in the left-most column, then sortation and search functions for the expert user above a list of recipes, and finally details about those recipes in the far right.

Learning from my mistakes in the reactive design assignment, I tried to make the majority of components a percentage of the viewport width from the beginning, rather than try to resize them piecemeal under different conditional widths.




