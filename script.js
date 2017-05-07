//define table sizeToContent
var tableSize = 4;

//get the table element
var myTable = document.createElement("table");

//set some attributes
myTable.style.width = '400px';
myTable.setAttribute('border', '1 px');

//append all rows to the table
var row1 = document.createElement("tr");
	myTable.appendChild(row1);
	
var row2 = document.createElement("tr");
	myTable.appendChild(row2);
	
var row3 = document.createElement("tr");
	myTable.appendChild(row3);
	
var row4 = document.createElement("tr");
	myTable.appendChild(row4);

//td array to hold ids of all table data elements
var tdArray = [];

//append a cell to the row - pass content as a string
//include which kind of cell (header or data) and array to store ids
function addCell(content, whichRow, whichKind, array){
	var cell = document.createElement(whichKind);
	cell.innerHTML = content;
	whichRow.appendChild(cell);
	array.push(cell);
	cell.id = "newCell" + (array.length - 4);
}

//fill the rows with cells
for(var i =  0; i < tableSize; i++){
	addCell("\tHeader " + (i+1), row1, "th", tdArray);
}
for(var i =  0; i < tableSize; i++){
	addCell(" 1, " + (i+1), row2, "td", tdArray);
}
for(var i =  0; i < tableSize; i++){
	addCell(" 2, " + (i+1), row3, "td", tdArray);
}
for(var i =  0; i < tableSize; i++){
	addCell(" 3, " + (i+1), row4, "td", tdArray);
}

//print the array of cell ids to check that it worked
//for(var i = 0; i < 16; i++){
//	console.log(tdArray[i].id);
//}

//append table to html document
document.body.appendChild(myTable);

//designate starting "selected" cell
var x = 1;
var currentCell = document.getElementById("newCell" + x);
//console.log("ACTIVE McCELL: " + currentCell.id);


//Movement Functions
function visibleSelect(current){
	current.style.border = "2px solid";
}

function unSelect(current){
	current.style.border = "1px inset";
}

//starting state of selected cell:
visibleSelect(currentCell);


function markIt(){
	currentCell.style.backgroundColor = "yellow";
	//console.log("call went through! " + x);
}

function goRight(){
	x = (x + 1);
	if(x <= 12 && x != 5 && x != 9){ //get rid of 5 and 9 comparisons to let left and right wrap between rows
		unSelect(currentCell);
		currentCell = document.getElementById("newCell" + x);
		visibleSelect(currentCell);
	}
	else{
		x = (x - 1);
	}
}

function goLeft(){
	x = (x - 1);
	if(x >= 1 && x != 4 && x != 8){  //get rid of 4 and 8 comparisons to let left and right wrap between rows
		unSelect(currentCell);
		currentCell = document.getElementById("newCell" + x);
		visibleSelect(currentCell);
	}
	else{
		x = (x + 1);
	}
}

function goUp(){
	x = (x - 4);
	if(x >= 1){
		unSelect(currentCell);
		currentCell = document.getElementById("newCell" + x);
		visibleSelect(currentCell);
	}
	else{
		x = (x + 4);
	}
}

function goDown(){
	x = (x + 4);
	if(x <= 12){
		unSelect(currentCell);
		currentCell = document.getElementById("newCell" + x);
		visibleSelect(currentCell);
	}
	else{
		x = (x - 4);
	}
}

//Make a div for formatting purposes
var butDiv = document.createElement("div");

//Make some buttons
var butUp = document.createElement("button");	
	butUp.style.width = '100px';
	butUp.style.height = '30px';
	var upLabel = document.createTextNode("UP");
	butUp.appendChild(upLabel);
	butUp.id = "butUp";
	
var butDwn = document.createElement("button");	
	butDwn.style.width = '100px';
	butDwn.style.height = '30px';
	var dwnLabel = document.createTextNode("DOWN");
	butDwn.appendChild(dwnLabel);
	butDwn.id = "butDwn";
	
var butLft = document.createElement("button");	
	butLft.style.width = '100px';
	butLft.style.height = '30px';
	var lftLabel = document.createTextNode("LEFT");
	butLft.appendChild(lftLabel);
	butLft.id = "butLft";
	
var butRt = document.createElement("button");
	butRt.id = "butRt";
	butRt.style.width = '100px';
	butRt.style.height = '30px';
	var rtLabel = document.createTextNode("RIGHT");
	butRt.appendChild(rtLabel);
	butRt.id = "butRt";
	
document.body.appendChild(butUp);
document.body.appendChild(butDwn);
document.body.appendChild(butLft);
document.body.appendChild(butRt);
document.body.appendChild(butDiv);

var butM = document.createElement("button");
	butM.style.width = '400px';
	butM.style.height = '30px';
	var mrkLabel = document.createTextNode("MARK CELL");
	butM.appendChild(mrkLabel);
	document.body.appendChild(butM);
	butM.id = "butM";


document.getElementById("butM").addEventListener("click", markIt);
document.getElementById("butRt").addEventListener("click", goRight);
document.getElementById("butLft").addEventListener("click", goLeft);
document.getElementById("butUp").addEventListener("click", goUp);
document.getElementById("butDwn").addEventListener("click", goDown);