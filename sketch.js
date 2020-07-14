let diceCount; // さいころの個数
let squareSize;
let squareSpan;
let textWidthSize;
let diceEyes = [1, 2, 3, 4 ,5, 6];
let customDiceEyes = ['船1', '船2', '船3', '黄', '青', '緑'];
let diceHistory = [];
let currentResult = [];
let elementMargin = 20;
let updateButtonWidth = 80;
let isMousePressedObject = false;

function setup() { 
  createCanvas(windowWidth, windowHeight);
  
  squareSize = windowWidth/6;
  squareSpan = squareSize + windowWidth/10;
  textWidthSize = windowWidth/20;
  diceCount=2;
  
  rectMode(CENTER);
  textAlign(CENTER);
  textSize(textWidthSize);
  
//   input = createInput();
//   input.position(elementMargin, windowHeight*3/4);
//   input.size(windowWidth - elementMargin*3 - updateButtonWidth);
//   input.mousePressed(setMousePressedTrue);
//   input.mouseReleased(setMousePressedFalse);

//   button = createButton('update');
//   button.position(input.x + input.width + elementMargin, windowHeight*3/4);
//   button.size(updateButtonWidth);
//   button.mousePressed(setMousePressedTrue);
//   button.mouseReleased(setMousePressedFalse);
  
} 

function draw() {
  background(240);
  textSize(textWidthSize);
  text('Press Screen to Roll the Dice!', windowWidth/2, windowHeight*1/4);
  if (mouseIsPressed == true && !isMousePressedObject) {
    var resultArray = [];
    for (let i=0; i<diceCount; i++) {
      resultArray.push(random(diceEyes));
    }
    resultArray.push(random(customDiceEyes)); // 最後の要素はテキスト版
    currentResult = resultArray;
  }
  
  for (let i=0; i<diceCount; i++) {
    drawSquare(
      windowWidth/2 + squareSpan*(-diceCount/2 + 1/2 + i),
      windowHeight/2,
      squareSize,
      currentResult[i]
    )
  }
  
  drawTextSquare(
    windowWidth/2,
    windowHeight/2 + 100,
    squareSize,
    currentResult[currentResult.length-1]
  );
}

function setMousePressedTrue() {
  isMousePressedObject = true;
}

function setMousePressedFalse() {
  isMousePressedObject = false;
}

function mouseReleased() {
  if (currentResult.length > 0) {
    diceHistory.push(currentResult);
  }
}

function drawTextSquare(centerX, centerY, size, eyeText) {
  const textWidthSize = size/2;
  const squareCornerRound = size/5;
  fill(250, 250, 250);
  rect(
    centerX,
    centerY,
    size,
    size,
    squareCornerRound
  );
  fill(0);
  textSize(textWidthSize);
  text(eyeText, centerX, centerY+size*0.2);//0.2は微調整分
}

function drawSquare(centerX, centerY, size, eyes) {
  const botSize = size/5;
  const squareCornerRound = size/5;
  fill(250, 250, 250);
  rect(
    centerX,
    centerY,
    size,
    size,
    squareCornerRound
  );
  fill(0);
  switch(eyes) {
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
