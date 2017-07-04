

function decrementWater(){
	if(game.selectedRecipe.Water >0){
		game.selectedRecipe.Water--;
	}
}

function incrementPasta(){
	if(game.selectedRecipe.Pasta <1 && game.selectedRecipe.Water == 10){
		game.selectedRecipe.Pasta++;
		$("#pasta").empty();
		$("#pasta").html("Pasta Cooked");
		$("#pasta-button").hide();
	}
}
function incrementMilk(){
	if(game.selectedRecipe.Milk <1){
		game.selectedRecipe.Milk++;
		$("#milk-button").hide();
	}
}

//WATER
function fillWater(){
	incrementWater()
}
function incrementWater(){
	var incr = setInterval(function(){
		if(game.sink && game.selectedRecipe.Water <10){
			game.selectedRecipe.Water++;
			updateUi();
			return
		} else {
			clearInterval(incr);
		}
	}, 1000);
	
}


function updateUi(){
	//WATER
	var waterPerc =calculateWaterUi(game.selectedRecipe.Water);
	$("#water-level-color")
		.css("height", waterPerc +"%");

	//STOVE
}
function calculateWaterUi(level){
	var percent = level*10;
	if(level > 10){
		var percent = 100;
	}
	return percent;
}

