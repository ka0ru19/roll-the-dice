let diceCount; // さいころの個数
let squareSize;
let squareSpan;
let textWidthSize;
let diceEyes = [1, 2, 3, 4 ,5, 6];
let customDiceEyes = ['船1', '船2', '船3', '黄', '青', '緑'];
let diceHistory = [];
let currentResult = [];
let elementMargin = 16;
let buttonWidth = 100;
let isMousePressedObject = false;
let dice2text;
let dice2InputArray = [];

function setup() { 
  createCanvas(windowWidth, windowHeight);
 
  diceCount=2;
  
  rectMode(CENTER);
  textAlign(CENTER);
  textSize(textWidthSize);
  
  const diceTextWidth = 60;
  dice2text = createElement('h4', 'dice2');
  dice2text.position(elementMargin, windowHeight*3/4);
  dice2text.size(diceTextWidth);
  dice2text.style('color', '#000');
  dice2text.style('background-color',  '#FFF');
  
  const inputWidth = 30;
  const domLineHeight = 40;
  for (let i=0; i<6; i++) { // TODO: window widthが小さい場合のレイアウトを作る
    var input = createInput();
    var positionX = dice2text.x + dice2text.width + elementMargin + (inputWidth + elementMargin)*i;
    var positionY = windowHeight*3/4;
    input.position(positionX, positionY);
    input.size(inputWidth);
    input.value(diceEyes[i]);
    input.mousePressed(setMousePressedTrue);
    input.mouseReleased(setMousePressedFalse);
    dice2InputArray.push(input);
  }
  
  positionY = windowHeight*3/4 + domLineHeight;
  var dice2UpdateButton = createDomButton(
    'update',
    elementMargin*2,
    positionY
  );
  dice2UpdateButton.mousePressed(dice2Update);
  
  var dice2ColorButton = createDomButton(
    'color',
    dice2UpdateButton.x + dice2UpdateButton.width + elementMargin,
    positionY
  );
  
  var dice2RemoveButton = createDomButton(
    'remove',
    dice2ColorButton.x + dice2ColorButton.width + elementMargin,
    positionY
  );
  dice2RemoveButton.mousePressed(dice2Remove);
}

function dice2Update() {
  setMousePressedTrue();
  diceCount = 2;
  let isInputEmpty = true;
  // 入力値について判定する
  for (let dice2Input of dice2InputArray) {
    if (dice2Input.value()) {
      isInputEmpty = false;
      break;
    }
  }
  if (isInputEmpty) {
    for (let i=0; i<diceEyes.length; i++) {
      dice2InputArray[i].value(diceEyes[i]);
    }
  }
}

function dice2Remove() {
  setMousePressedTrue();
  diceCount = 1;
  dice2text.style('color', '#000');
  dice2text.style('background-color',  '#FFF');
  for (let dice2Input of dice2InputArray) {
    dice2Input.value('');
  }
}

function createDomButton(txt, x, y) {
  var button = createButton(txt);
  button.class('btn btn-outline-dark');
  button.position(x, y);
  button.size(buttonWidth);
  button.mousePressed(setMousePressedTrue);
  button.mouseReleased(setMousePressedFalse);
  return button;
}

function draw() {
  squareSize = windowWidth/6;
  squareSpan = squareSize + windowWidth/10;
  textWidthSize = windowWidth/20;
  
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
  
  if (diceCount <= 2){
    for (let i=0; i<diceCount; i++) {
      drawSquare(
        windowWidth/2 + squareSpan*(-diceCount/2 + 1/2 + i),
        windowHeight/2,
        squareSize,
        currentResult[i]
      );
    }  
  }
  if (diceCount > 2) {
    for (let i=0; i<2; i++) {
      drawSquare(
        windowWidth/2 + squareSpan*(-diceCount/2 + 1/2 + i),
        windowHeight/2,
        squareSize,
        currentResult[i]
      );
    }
    drawTextSquare(
      windowWidth/2,
      windowHeight/2 + squareSpan,
      squareSize,
      currentResult[currentResult.length-1]
    );  
  }
  
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
