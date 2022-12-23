
console.log("chord.js");

function addSelectOptions(ele, value){
	var temp = document.createElement("option");
	temp.text = value;
	temp.value = value;
	ele.add(temp);
}

function chordJs(elementID, chordList){
	
	var element = document.getElementById(elementID);

	for(var i = 0; i<chordList.length; i++){
		addSelectOptions(element, chordList[i]);	
	}	
}

function getChordMap(){
	var chordMap = {
		"C": [ [3, 4] ], 
		"D": [ [2,1], [2,2], [2,3] ],
		"E": [ [4,1], [4,2], [4,3], [2,4] ], 
		"F": [ [1,3], [2,1] ],
		"G": [ [2,2], [2,4], [3,3] ],
		"A": [ [1,2], [2,1] ],
		"B": [ [2,3], [2,4], [3,2], [4,1] ]
	}

	return chordMap;
}

function getChordList(){
	var chordList = [
		"C", "D", "E", "F", "G", "A", "B"
	];

	return chordList;
}

function changeChord(){

	height = 400;
	width = 500;
	n = 4;
	m = 4;

	clearCanvas(ctx);
	drawObj = drawJs(width, height, n, m);
	ctx = drawObj[0];
	chordMatrix = drawObj[1];
	
	var chordMap = getChordMap();
	var element = document.getElementById("chord");
	var tempKey = element.value;
	var title = document.getElementById("chordTitle");
	title.innerHTML = "Chord " + tempKey;
	var go = chordMap[tempKey];
	console.log(go.length);
	
	for(var i = 0; i<go.length; i++){
		// console.log(go[i]);
		drawChord(ctx, chordMatrix, go[i][0],go[i][1]);
	}
}

var chordList = getChordList();
chordJs("chord", chordList);
height = 400;
width = 500;
n = 4;
m = 4;

drawObj = drawJs(width, height, n, m);
ctx = drawObj[0];
chordMatrix = drawObj[1];