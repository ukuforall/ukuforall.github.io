

function drawCanvas(elementID, width, height){
	var c = document.getElementById(elementID);
	c.width = width;
	c.height = height;
	return c.getContext("2d");
}

function drawLine(canvasContext, start, end, width, color) {
	
	canvasContext.beginPath();
	canvasContext.moveTo(start, 0);
	canvasContext.lineTo(start, end);
	canvasContext.closePath();

	canvasContext.lineWidth = width;
	canvasContext.strokeStyle = color;
	canvasContext.stroke();
}

function drawCircle(canvasContext, circleX, circleY, circleSize, color) {
	
	canvasContext.beginPath();
	// Y = circleY - (fretGap / 2)
	// Y = circleY - (40/2)
	// Y = circleY - 20

	canvasContext.arc(circleX, circleY - 30, circleSize, 0, 2 * Math.PI);
	canvasContext.lineWidth = circleSize;
	canvasContext.fillStyle = color;
	canvasContext.fill();
}

function drawFret(canvasContext, startX, endX, starY_endY, width, color){
	canvasContext.beginPath();
	canvasContext.moveTo(startX, starY_endY);
	canvasContext.lineTo(endX, starY_endY);
	canvasContext.closePath();

	canvasContext.lineWidth = width;
	canvasContext.strokeStyle = color;
	canvasContext.stroke();
}

function drawBoard(canvasContext, noString, noFret){
	
		
	width = 1;

	// in board where to start string
	stringX = 180;
	// in board where to start fret
	fretStartEndY = 50;

	stringGap = 50;
	fretGap = 60;
	fretStartX = stringX;
	fretEndX = stringGap*(noString-1) + stringX; // same as last axis Y of string
	stringY = (fretGap/2)*(noFret-1) + stringX;; // same as last axis Y of fret
	
	posString = [];
	posFret = [];

	for (var i = 0; i < noString; i++) {
		drawLine(canvasContext, stringX, stringY, width, "black");
		// console.log("string", i, stringX);
		posString.push(stringX);
		stringX += stringGap;
	}

	// UI
	drawFret(ctx, fretStartX, fretEndX, 0, 15, "black");

	for (var i = 0; i < noFret; i++) {
		drawFret(ctx, fretStartX, fretEndX, fretStartEndY ,width, "black");
		// console.log("fret",i, fretStartEndY);
		posFret.push(fretStartEndY);
		fretStartEndY += fretGap;
	}


	
	// console.log(posString);

	return [posString, posFret];
}

function getPositionOfChord(positionList) {
	stringPosition = positionList[0];
	fretPosition = positionList[1];
	positionM = [];

	for(var i = 0; i<stringPosition.length; i++){
		temp_2d = [];

		for(var j = 0; j<fretPosition.length; j++){
			temp = [ stringPosition[i], fretPosition[j] ];
			temp_2d.push(temp);
		}
		positionM.push(temp_2d);
	}

	// console.log(stringPosition);
	// console.log(fretPosition);
	// console.log(positionM);
	return positionM;
}

function drawChord(canvasContext, positionMatrix, y, x) {
	width = 8;
	circleX = positionMatrix[x-1][y-1][0];
	circleY = positionMatrix[x-1][y-1][1];
	drawCircle(ctx, circleX, circleY, width, "red");
}

function drawJs(width, height, stringSize, fretSize){

	ctx = drawCanvas("myCanvas", width, height);

	// number of string, number of fret
	positionList = drawBoard(ctx, stringSize, fretSize);
	posChord = getPositionOfChord(positionList);
	
	// chord position using axis X, axis Y
	// drawChord(ctx, posChord, 2,3);
	return [ctx,posChord];
}

function clearCanvas(context){
	// ctx.clearRect(0, 0, canvas.width, canvas.height);
	// ctx.clear();
	context.clearRect(0, 0, 500, 500);
}

console.log("draw.js");