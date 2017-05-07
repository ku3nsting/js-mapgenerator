//Langton's Ant Map Generator
//To do:
//Add mountain generator
//Keep teleportation markers on land only
//use a diceroll to encode different city types
//Add desert generator
//Add user input options for colors
//add start menu that takes grid size, terrain type, start position, etc. as parameters



//define table sizeToContent
var tableSize = 51;

//get the table element
var myTable = document.createElement("table");

//set some attributes

myTable.style.width = '600px';
myTable.style.height = '300px';
myTable.style.marginLeft = 'auto';
myTable.style.marginRight = 'auto';
myTable.cellSpacing = "0px";
myTable.style.tableLayout = "fixed";
//myTable.setAttribute('border', '1 px');

//td array to hold ids of all table data elements
var tdArray = [];

//append a cell to the row - pass content as a string
//include which kind of cell (header or data) and array to store ids
function addCell(content, whichRow, whichKind, array){
	if (whichKind == "edge"){
		var cell = document.createElement("td");
		cell.innerHTML = content;
		whichRow.appendChild(cell);
		array.push(cell);
		cell.style.textAlign = "center";
		cell.style.fontSize = "8px";
		cell.style.color = "navy";
		cell.style.backgroundColor = "white";
	}
	
	else{
	var cell = document.createElement(whichKind);
	cell.innerHTML = content;
	whichRow.appendChild(cell);
	array.push(cell);
	cell.style.textAlign = "center";
	cell.style.fontSize = "8px";
	cell.style.borderStype = "1px solid black"
	cell.style.color = "green";
	var randNum = (Math.floor(Math.random() * 8) + 1)
	if(randNum < 3){
		cell.style.backgroundColor = "#336699";
	}
	else if(randNum < 5){
		cell.style.backgroundColor = "#2d5986";
	}
	else{
		cell.style.backgroundColor = "#264d73";
	}
	
	if (whichKind == "th"){
		cell.style.color = "navy";
		cell.style.backgroundColor = "white";
	}
	}
	cell.id = "newCell" + (array.length);
}

//append all rows to the table
var headerRow = document.createElement("tr");
myTable.appendChild(headerRow);
for(var x = 0; x < tableSize; x++){
	addCell(x, headerRow, "th", tdArray);
}
		
var y = 1;

for(var x = 0; x < tableSize; x++){
	var row = document.createElement("tr");
		myTable.appendChild(row);
		
		for(var i =  0; i < tableSize; i++){
			if(i == 0){
				addCell(y, row, "edge", tdArray);
				y++;
			}
			else{
				addCell(' ', row, "td", tdArray);
			}
		}
}

//append table to html document
document.body.appendChild(myTable);

//designate starting "selected" cell
//var half = Math.round(tableSize/2);
//var halftimes = half * (tableSize + 1);
//var x = tableSize + 2 + halftimes;

//or start random
var tableSq = Math.pow(tableSize, 2);
var x = (Math.floor(Math.random() * tableSq)) + (tableSize + 1);

//PUT THE CELL IN THE MAP!!!!!
var currentCell = document.getElementById("newCell" + x);
console.log("ACTIVE McCELL: " + currentCell.id);

function randomLocation(){
	var tableSquared = Math.pow(tableSize, 2);
	var location = (Math.floor(Math.random() * tableSquared)) + (tableSize + 1);
	x = newLocation;
	console.log(x);
	
	if((x >= (tableSize + 2)) && (((x - 1) % tableSize) != 0)){
		return location;
	}
	else{
		randomLocation();
	}
}


//Movement Functions
function visibleSelect(current){
	current.style.border = "1px solid yellow";
	currentCell.style.backgroundColor = "burlywood";
}

function unSelect(current){
	current.style.border = "0px";
}

//starting state of selected cell:
visibleSelect(currentCell);


function markIt(){
	currentCell.style.backgroundColor = "yellow";
}

function markRiver(){
	currentCell.style.backgroundColor = "#2d5986";
}

function markW(){
	if(color == "o"){
		var randNum = (Math.floor(Math.random() * 40) + 1);
		if(randNum < 40){
		currentCell.style.backgroundColor = "#267326";
		}
		else{
			currentCell.style.backgroundColor = "#cc4400";
		}
	}
	else{
		var randNum = (Math.floor(Math.random() * 5) + 1);
		if(randNum < 4){
		currentCell.style.backgroundColor = "tan";
		}
		else{
			currentCell.style.backgroundColor = "#fff2c";
		}
	}
}

function markB(){
		var randNum = (Math.floor(Math.random() * 20) + 1);
		if(randNum < 15){
		currentCell.style.backgroundColor = "#248f24";
		}
		else if(randNum < 17){
		currentCell.style.backgroundColor = "#2eb82e";
		}
		else{
			currentCell.style.backgroundColor = "#29a329";
		}
}

function goRight(){
	x = (x + 1);
	if(x < (tableSize) * (tableSize + 1) && (x >= (tableSize + 2)) && ((x - 1) % tableSize) != 0){
		unSelect(currentCell);
		currentCell = document.getElementById("newCell" + x);
		visibleSelect(currentCell);
	}
	else{
		hopRandom("right");
	}
}

function goRightUnmarked(){
	x = (x + 1);
	if(x < (tableSize) * (tableSize + 1) && (x >= (tableSize + 2)) && ((x - 1) % tableSize) != 0){
		unSelect(currentCell);
		currentCell = document.getElementById("newCell" + x);
	}
	else{
		hopRandom("right");
	}
}

function goLeft(isMarked){
	if(isMarked == "unmarked"){
	x = (x - 1);
	if((x >= (tableSize + 2)) && ((x - 1) % tableSize != 0)){
		unSelect(currentCell);
		currentCell = document.getElementById("newCell" + x);
		//visibleSelect(currentCell);
	}
	else{
		hopRandom("left");
	}	
	}
	else{
	x = (x - 1);
	if((x >= (tableSize + 2)) && ((x - 1) % tableSize != 0)){
		unSelect(currentCell);
		currentCell = document.getElementById("newCell" + x);
		visibleSelect(currentCell);
	}
	else{
		hopRandom("left");
	}
	}
}

function hopRandom(dir){
	//hop to random location
	var tableSquared = Math.pow(tableSize, 2);
	var newLocation = (Math.floor(Math.random() * tableSquared)) + (tableSize + 1);
	x = newLocation;
	console.log(x);
	
	if((x >= (tableSize + 2)) && (((x - 1) % tableSize) != 0)){
		unSelect(currentCell);
		currentCell = document.getElementById("newCell" + x);
		visibleSelect(currentCell);
		currentCell.style.backgroundColor = "brown";
		
		if(dir == "left"){
			goLeft();
		}
		else if(dir == "right"){
			goRight();
		}
		else if(dir == "up"){
			goUp();
		}
		else if(dir == "none"){
			
		}
		else{
			goDown();
		}
		
	}
	else{
		hopRandom(dir);
		console.log("doublehop");
		}
}

function goUp(isMarked){
	if(isMarked == "unmarked"){
	x = (x - tableSize);
	if(x > tableSize){
		unSelect(currentCell);
		currentCell = document.getElementById("newCell" + x);
		//visibleSelect(currentCell);
	}
	else{
		hopRandom("up");
	}
	}
	else{
		x = (x - tableSize);
		if(x > tableSize){
			unSelect(currentCell);
			currentCell = document.getElementById("newCell" + x);
			visibleSelect(currentCell);
		}
	else{
		hopRandom("up");
		}
	}
}

function goDown(isMarked){
	if(isMarked == "unmarked"){
		x = (x + tableSize);
		if(x <= (tableSize + 1) * (tableSize)){
		unSelect(currentCell);
		currentCell = document.getElementById("newCell" + x);
		//visibleSelect(currentCell);
	}
	else{
		hopRandom("down");
	}
	}
	else{
	x = (x + tableSize);
	if(x <= (tableSize + 1) * (tableSize)){
		unSelect(currentCell);
		currentCell = document.getElementById("newCell" + x);
		visibleSelect(currentCell);
	}
	else{
		hopRandom("down");
	}
	}
}

function goRiver(){
	hopRandom("none");
	var riverLength = tableSize;
	
	
	var pickDir = (Math.floor(Math.random() * 2)) + (1);
	
	
	for(var i = 0; i < riverLength; i++){
		markRiver();
		
		if(pickDir == 1){
		
		//generally east river:
			var thisMove = (Math.floor(Math.random() * 6)) + (1);
			//up and right
			if(thisMove < 3){
				goRightUnmarked();
				goUp("unmarked");
			}
			else if(thisMove < 5){
			//up
			goUp("unmarked");
			}
			else if(thisMove < 6){
			//go right
			goRightUnmarked();
			}
			else{
			//go right and down
			goRightUnmarked();
			goDown("unmarked");
			}
		}
		else{
		//generally west river:
			var thisMove = (Math.floor(Math.random() * 6)) + (1);
			//up and left
			if(thisMove < 3){
				goLeft("unmarked");
				goUp("unmarked");
			}
			else if(thisMove < 5){
			//up
			goUp("unmarked");
			}
			else if(thisMove < 6){
			//go left
			goLeft("unmarked");
			}
			else{
			//go left and down
			goLeft("unmarked");
			goDown("unmarked");
			}
		}
	}
}

function goAntStyle(){
	
	var direction = 'N';
	color = currentCell.innerHTML;
	
	for(var i = 0; i < 1000; i++){
		
	if(color != '-'){
		
		markW();
		currentCell.innerHTML = '-';
		
		if (direction == 'N'){
			direction = 'E';
			goRight();
		}
		else if (direction == 'E'){
			direction = 'S';
			goDown();
		}
		else if (direction == 'S'){
			direction = 'W';
			goLeft();
		}
		else if (direction == 'W'){
			direction = 'N';
			goUp();
		}
		
		color = currentCell.innerHTML;
	}
	
	if(color == '-'){
		markB();
		currentCell.innerHTML = 'o';
		
		if (direction == 'N'){
			direction = 'W';
			goLeft();
		}
		else if (direction == 'W'){
			direction = 'S';
			goDown();
		}
		else if (direction == 'S'){
			direction = 'E';
			goRight();
		}
		else if (direction == 'E'){
			direction = 'N';
			goUp();
		}

		color = currentCell.innerHTML;
	}
}
}

//Make a div for formatting purposes
var butDiv = document.createElement("div");
var mDiv = document.createElement("div");

//Make some buttons
var butUp = document.createElement("button");	
	butUp.style.width = '25%';
	butUp.style.height = '20px';
	var upLabel = document.createTextNode("UP");
	butUp.appendChild(upLabel);
	butUp.id = "butUp";
	
var butDwn = document.createElement("button");	
	butDwn.style.width = '25%';
	butDwn.style.height = '20px';
	var dwnLabel = document.createTextNode("DOWN");
	butDwn.appendChild(dwnLabel);
	butDwn.id = "butDwn";
	
var butLft = document.createElement("button");	
	butLft.style.width = '25%';
	butLft.style.height = '20px';
	var lftLabel = document.createTextNode("LEFT");
	butLft.appendChild(lftLabel);
	butLft.id = "butLft";
	
var butRt = document.createElement("button");
	butRt.id = "butRt";
	butRt.style.width = '25%';
	butRt.style.height = '20px';
	var rtLabel = document.createTextNode("Add River");
	butRt.appendChild(rtLabel);
	butRt.id = "butRt";
	
butDiv.style.marginLeft = 'auto';
butDiv.style.marginRight = 'auto';
butDiv.style.width = "50%";
butDiv.style.backgroundColor = "white";

document.body.appendChild(butDiv);
	butDiv.appendChild(butUp);
	butDiv.appendChild(butDwn);
	butDiv.appendChild(butLft);
	butDiv.appendChild(butRt);
	
mDiv.style.margin = 'auto';
mDiv.style.width = "50%";
mDiv.style.backgroundColor = "white";

document.body.appendChild(mDiv);
var butM = document.createElement("button");
	butM.style.marginLeft = '37.5%';
	butM.display = "block";
	butM.style.width = '25%';
	butM.style.height = '30px';
	var mrkLabel = document.createTextNode("Generate Map");
	butM.appendChild(mrkLabel);
	mDiv.appendChild(butM);
	butM.id = "butM";


document.getElementById("butM").addEventListener("click", goAntStyle);
document.getElementById("butRt").addEventListener("click", goRiver);
document.getElementById("butLft").addEventListener("click", goLeft);
document.getElementById("butUp").addEventListener("click", goUp);
document.getElementById("butDwn").addEventListener("click", goDown);