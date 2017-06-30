window.onload = function() {
	showStartMenu();
}

function showStartMenu(){
	$('#start-menu').addClass('fadeIn');

	//init the canvas
}

function startGame(){
	$('canvas').show();
	$('#start-menu').removeClass('fadeIn')
		.addClass('fadeOut');
	setTimeout(function(){
		$('#start-menu').hide()
	}, 600);
	$('#game-container').show();
	game.init();

}




//constants
var MAC_AND_CHEESE = "Mac & Cheese";
var BACON_EGG_CHEESE = "Bacon Egg & Cheese"

var lks = {
	getRecipe: function(recipeName){
		switch(recipeName){
			case MAC_AND_CHEESE:
				var mac = {
					Water: 0,
					Butter: 0,
					Cheese: 0,
					Pasta: 0,
					Milk: 0
				}
				mac.hasWater = false;
				mac.instructions = "Boil water for 10 seconds. Cook pasta for 10 seconds. Mix Cheese and Butter to Complete."
				return mac;
			break;
		}
	}
}
var game = {
	init: function() {
		game.inv = [];
		game.currItem = null;
		game.selectedRecipe = lks.getRecipe(MAC_AND_CHEESE);
		game.stopTimer = false;
		game.stopBoiling = false;
		game.timerStarted = false;
		game.timer = 0;
		displayRecipeDetails();
		displayRecipesList();
	},




	updateCurrItem: function(currItem){
		game.currItem = currItem;
	}
}

function displayRecipesList(){
	var item = lks.getRecipe(MAC_AND_CHEESE);
	/*$("#recipe-list").append(
		"<div class='recipe-item'>" 
			+ item
			+ "</div>");*/
}

function displayRecipeDetails(recipeName){
	for (var name in lks.getRecipe(MAC_AND_CHEESE)) {
		$("#recipe-details").show();
		
	}
}

function showRecipe(){
	$("#recipe-steps").show();
	$("#recipe-list").hide();
	$("#top").show();
}

function hideRecipe(){
	$("#recipe-steps").hide();
}
function startTimerButton(){
	if(!game.timerStarted){
		game.stopTimer= false;
		startTimer();
	}
	game.timerStarted = true;
}
function startTimer(){
	setTimeout(function(){
		if(game.stopTimer == false){
			timerAddSecond();
		}
	}, 1000);
}
function timerAddSecond(){
	game.timer++;
	$("#timer-count").empty();
	$("#timer-count").html(game.timer);
	startTimer();
}

function stopTimer(){
	game.timerStarted = false;
	game.stopTimer = true;
	game.timer = 0;
	$("#timer-count").empty();
	$("#timer-count").html("0");
}


function addUnit(item){
	switch (item){
		case 'butter':
			game.selectedRecipe.Butter++;
			$("#num-butter").empty();
			$("#num-butter").html(game.selectedRecipe.Butter);
		break;
		case 'cheese':
			game.selectedRecipe.Cheese++;
			$("#num-cheese").empty();
			$("#num-cheese").html(game.selectedRecipe.Cheese);
		break;
	}
}

function minusUnit(item){
	switch (item){
		case 'butter':
		if(game.selectedRecipe.Butter > 0) {
			game.selectedRecipe.Butter--;
			$("#num-butter").empty();
			$("#num-butter").html(game.selectedRecipe.Butter);
		}
		break;
		case 'cheese':
		if(game.selectedRecipe.Cheese > 0) {
			game.selectedRecipe.Cheese--;
			$("#num-cheese").empty();
			$("#num-cheese").html(game.selectedRecipe.Cheese);
		}
		break;
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

function boilWater(){
	if(game.selectedRecipe.Water < 10){
		setTimeout(function(){
		if(game.stopBoiling == false){
			$("#boil-button").html("Stove On");
			incrementWater();
		}
	}, 1000);
	} else {
		$("#water").html("Water </br> Boiled!");
		$("#boil-button").html("Stove Off");
	}
}

function incrementWater(){
	game.selectedRecipe.Water++;
	$("#water").empty();
	$("#water").html("Water <br/> Boiling");
	boilWater();
}

function validate(){
	if(game.selectedRecipe.Water == 10 &&
		game.selectedRecipe.Butter == 1 &&
		game.selectedRecipe.Pasta == 1 &&
		game.selectedRecipe.Cheese == 3 &&
		game.selectedRecipe.Milk == 1){
		$("#level-screen").show();
		$("#level-screen").html("Level Complete!");
	} else{
		$("#level-screen").show();
		$("#level-screen").html("Failed- Try your recipe again");

	}
}