let squareSize;
let squareSpan;
let textWidthSize;
let diceNumber = [1, 2, 3, 4 ,5, 6];
let diceHistory = [];
let currentResult = [];

function setup() { 
  createCanvas(windowWidth, windowHeight);
  
  squareSize = windowWidth/6;
  squareSpan = squareSize + windowWidth/10;
  textWidthSize = windowWidth/20;
  
  rectMode(CENTER);
  textAlign(CENTER);
  background(240);
  
  textSize(textWidthSize);
  text('Press Screen to Roll the Dice!', windowWidth/2, windowHeight*1/4);
  
  drawSquare(
    windowWidth/2 - squareSpan/2,
    windowHeight/2,
    squareSize,
    1
  );
  
  drawSquare(
    windowWidth/2 + squareSpan/2,
    windowHeight/2,
    squareSize,
    6
  );
} 

function draw() {
  currentResult = [
     random(diceNumber),
     random(diceNumber)
  ];
  if (mouseIsPressed == true) {
    drawSquare(
      windowWidth/2 - squareSpan/2,
      windowHeight/2,
      squareSize,
      currentResult[0]
    );
    drawSquare(
      windowWidth/2 + squareSpan/2,
      windowHeight/2,
      squareSize,
      currentResult[1]
    );
  }
}

function mouseReleased() {
  if (currentResult.length > 0) {
    diceHistory.push(currentResult);
    currentResult = [];
  }
}

function drawSquare(centerX, centerY, size, number) {
  const botSize = size/5;
  const squareCornerRound = botSize;
  fill(250, 250, 250);
  rect(
    centerX,
    centerY,
    size,
    size,
    squareCornerRound
  );
  fill(0);
  switch(number) {
    case 1:
      circle(
        centerX,
        centerY,
        botSize
      );
      break;
    case 2:
      circle(
        centerX - botSize,
        centerY + botSize,
        botSize
      );
      circle(
        centerX + botSize,
        centerY - botSize,
        botSize
      );
      break;
    case 3:
      circle(
        centerX,
        centerY,
        botSize
      );
      circle(
        centerX - botSize,
        centerY + botSize,
        botSize
      );
      circle(
        centerX + botSize,
        centerY - botSize,
        botSize
      );
      break;
    case 4:
      circle(
        centerX - botSize,
        centerY - botSize,
        botSize
      );
      circle(
        centerX + botSize,
        centerY - botSize,
        botSize
      );
      circle(
        centerX - botSize,
        centerY + botSize,
        botSize
      );
      circle(
        centerX + botSize,
        centerY + botSize,
        botSize
      );
      break;
    case 5:
      circle(
        centerX,
        centerY,
        botSize
      );
      circle(
        centerX - botSize,
        centerY - botSize,
        botSize
      );
      circle(
        centerX + botSize,
        centerY - botSize,
        botSize
      );
      circle(
        centerX - botSize,
        centerY + botSize,
        botSize
      );
      circle(
        centerX + botSize,
        centerY + botSize,
        botSize
      );
      break;
    case 6:
      circle(
        centerX - botSize,
        centerY - botSize*1.3,
        botSize
      );
      circle(
        centerX + botSize,
        centerY - botSize*1.3,
        botSize
      );
      circle(
        centerX - botSize,
        centerY,
        botSize
      );
      circle(
        centerX + botSize,
        centerY,
        botSize
      );
      circle(
        centerX - botSize,
        centerY + botSize*1.3,
        botSize
      );
      circle(
        centerX + botSize,
        centerY + botSize*1.3,
        botSize
      );
      break;
    default:
      break;
  }
}
