

function decrementWater(){
	if(game.selectedRecipe.Water >0){
		game.selectedRecipe.Water--;
	}
}

function incrementPasta(){
	game.selectedRecipe.Pasta = 1;
	$("#pasta-button").hide();
}
function showAmountsMenu(food){
	$("#inv-screen").hide();
	$("#amounts-menu").show();
	$("#amounts-header").html("Recipe: Add 1 1/4 cups of " + food);
	$("#show-recipe-button").hide();

}

function addUnitMeasure(size){
	switch(size){
		case 'tbs':
			game.amounts.tbs++;
			$("#num-tbs").html(game.amounts.tbs);
		break;
		case 'tsp':
			game.amounts.tsp++;
			$("#num-tsp").html(game.amounts.tsp);
		break;
		case 'oz':
			game.amounts.oz++;
			$("#num-oz").html(game.amounts.oz);
		break;
	}
}
function minusUnitMeasure(size){
	switch(size){
		case 'tbs':
			game.amounts.tbs--;
			$("#num-tbs").html(game.amounts.tbs);
		break;
		case 'tsp':
			game.amounts.tsp--;
			$("#num-tsp").html(game.amounts.tsp);
		break;
		case 'oz':
			game.amounts.oz--;
			$("#num-oz").html(game.amounts.oz);
		break;
	}
}
function submitAmountsMenu(){
	var total = (game.amounts.tbs * 3) +
					(game.amounts.tsp) +
					(game.amounts.oz * 6);
	if(total == 60){
		$("#submit-amounts-res").html("Result: </br>SUCCESS")
		.css("background", "green");
		game.selectedRecipe.Milk = 1;
		setTimeout(function(){
			$("#amounts-menu").hide();
			$("#show-recipe-button").show();
			$("#inv-screen").show();
			$("#milk-button").hide();
		}, 2700);
	} else {
		$("#submit-amounts-res").html("Result: </br>TRY</br>AGAIN")
		.css("background", "red");
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
		} else {
			clearInterval(incr);
		}
	}, 1000);
	
}


//BOIL
function boilWater(){
	incrementBoil();
}
function incrementBoil(){
	var incr = setInterval(function(){
		if(game.stove && game.boil <10){
			game.boil++;
			updateUi();
		} else {
			if(game.selectedRecipe.Water == 10){
				game.boiled = true;
				$(".square-add-button").show();
			}
			clearInterval(incr);
		}
	}, 1000);
}
function decayBoil(){
	var incr = setInterval(function(){
		if(game.boil > 0 && !game.stove){
			game.boil--;
			updateUi();
		} else {
			clearInterval(incr);
		}
	}, 4000);
}

function updateUi(){
	//WATER
	var waterPerc =calculateLevel(game.selectedRecipe.Water);
	$("#water-level-color")
		.css("height", waterPerc +"%");

	//STOVE
	var boilPerc = calculateLevel(game.boil);
	$("#boil-level-color")
		.css("height", boilPerc + "%");

	if(game.boil > 7 && game.selectedRecipe.Water > 0){
		$("#stove-boil").show();
		$("#boil-excl").show();
	} else {
		$("#stove-boil").hide();
		$("#boil-excl").hide();
	}
}
function calculateLevel(level){
	var percent = level*10;
	if(level > 10){
		var percent = 100;
	}
	return percent;
}

