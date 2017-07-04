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
		game.timer = [];
		game.timer.active = false;
		game.timer.value = 0;
		game.boil = 0;
		game.boiled = false;
		game.timerStarted = false;
		game.stove = false;
		game.sink = false;
		game.valid = 0;
		game.amounts =[];
		game.amounts.cups = 0;
		game.amounts.tsp = 0;
		game.amounts.tbs = 0;
		game.amounts.oz = 0;

		displayRecipeDetails();
		displayRecipesList();
	},

	isBoiling: function(){
		if(game.boiling > 10){
			return true;
		}
		return false;
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

}

function loadRecipeGame(){
	$("#top").show();
	$("#recipe-list").hide();
	$("#inv-screen").show();
	$("#button-bar").show();
}

function showRecipe(){
	$("#recipe-steps").show();
	$("#recipe-list").hide();
	$("#top").show();
	$("#inv-screen").hide();
}

function hideRecipe(){
	$("#recipe-steps").hide();
	$("#inv-screen").show();
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

//STOVE
function toggleStove(){
	if(!game.stove){
		$('#stove-fire').show();
		game.stove = true;
		$('#stove').html("On")
			.addClass("green")
			.removeClass("darkred");
		boilWater();
	} else {
		$('#stove-fire').hide();
		game.stove = false;
		$('#stove').html("Off")
			.addClass("darkred")
			.removeClass("green");
		decayBoil();
	}
}
//SINK
function toggleSink(){
	if(!game.sink){
		game.sink = true;
		$("#sink-water").show();
		//update button
		$("#sink").html("On")
			.addClass("green")
			.removeClass("darkred");
		fillWater();
	} else {
		game.sink = false;
		$("#sink-water").hide();
		//update button
		$("#sink").html("Off")
			.addClass("darkred")
			.removeClass("green");
	}
}

function boilWater(){
	if(game.selectedRecipe.Water < 10){
		setTimeout(function(){
		if(game.stove == true){
			updateWaterUi();
		}
	}, 1000);
	} else {
		$("#boil-button").html("Stove Off");
	}
}

function validate(){
		$("#level-screen").show();
}