let diceCount; // さいころの個数
let squareSize;
let squareSpan;
let textWidthSize;
let diceDefaultEyes = ['1', '2', '3', '4' ,'5', '6'];
let diceEyes = [];
let customDiceEyes = ['船1', '船2', '船3', '黄', '青', '緑'];
let diceHistory = [];
let currentResult = [];
let elementMargin = 16;
let buttonWidth = 100;
let dice2text;
let dice2InputArray = [];
let diceRollFrameCount = 0;
const diceRollTime = 0.6* 60; // 秒間

function setup() { 
  createCanvas(windowWidth, windowHeight);
 
  diceCount=2;
  diceEyes = [
    diceDefaultEyes,
    diceDefaultEyes,
    ['a','b','c','d','e','f']
  ]
  
  rectMode(CENTER);
  textAlign(CENTER);
  textSize(textWidthSize);
  
  const diceTextWidth = 60;
  const inputWidth = 30;
  const domLineHeight = 40;
  
  // 画面幅とdomからcenter表示するための初期xを算出する(1段目or2段目)
  let domTotalWidth1 = diceTextWidth + elementMargin +
      (inputWidth + elementMargin)*6 - elementMargin;
  
  let domTotalWidth2 = elementMargin +
      (buttonWidth + elementMargin)*3 - elementMargin;
  
  let domTotalWidth = (domTotalWidth1 > domTotalWidth2) ? 
      domTotalWidth1 : domTotalWidth2;
  
  let startPositionX = windowWidth/2 - domTotalWidth/2;
  
  dice2text = createElement('h4', 'dice2');
  dice2text.position(startPositionX, windowHeight*3/4);
  dice2text.size(diceTextWidth);
  dice2text.style('color', '#000');
  dice2text.style('background-color',  '#FFF');
  
  for (let i=0; i<6; i++) { // TODO: window widthが小さい場合のレイアウトを作る
    var input = createInput();
    var positionX = dice2text.x + dice2text.width +
        elementMargin + (inputWidth + elementMargin)*i;
    var positionY = windowHeight*3/4;
    input.position(positionX, positionY);
    input.size(inputWidth);
    input.value(diceEyes[1][i]);
    dice2InputArray.push(input);
  }
                                 
  const rollButtonWidth = 160;
  var positionY = windowHeight*2/3;
  var positionX = windowWidth/2 - rollButtonWidth/2;
  var rollButton = createButton('Roll the Dice!');
  rollButton.class('btn btn-primary btn-lg');
  rollButton.position(positionX, positionY);
  rollButton.size(rollButtonWidth);
  rollButton.mouseReleased(rollTheDice);
  
  positionY = windowHeight*3/4 + domLineHeight;
  
  positionX = startPositionX + elementMargin;
  var dice2UpdateButton = createDomButton('update', positionX, positionY);
  dice2UpdateButton.mousePressed(dice2Update);
  
  positionX = dice2UpdateButton.x + dice2UpdateButton.width + elementMargin;
  var dice2ColorButton = createDomButton('color', positionX, positionY);
  
  positionX = dice2ColorButton.x + dice2ColorButton.width + elementMargin;
  var dice2RemoveButton = createDomButton('remove', positionX, positionY);
  dice2RemoveButton.mousePressed(dice2Remove);
}

function rollTheDice() {
  diceRollFrameCount = diceRollTime;
  // draw()にて減数していく
}

function dice2Update() {
  diceCount = 2;
  let isInputEmpty = true;
  let inputTextArray = [];
  // 入力値について判定する
  for (let dice2Input of dice2InputArray) {
    if (!dice2Input.value()) {
      continue;
    }
    isInputEmpty = false;
    inputTextArray.push(dice2Input.value());
  }
  // 全項目未入力の場合は、さいころの目を割り当てる
  diceEyes[1] = isInputEmpty ? diceDefaultEyes : inputTextArray;
  for (let i=0; i<diceEyes[1].length; i++) {
    dice2InputArray[i].value(diceEyes[1][i]);
  }
}

function dice2Remove() {
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
  return button;
}

function draw() {
  squareSize = windowWidth/6;
  squareSpan = squareSize + windowWidth/10;
  textWidthSize = windowWidth/20;
  
  background(240);
  textSize(textWidthSize);
  text('Press Screen to Roll the Dice!', windowWidth/2, windowHeight*1/4);
  text('log: '+currentResult, windowWidth/2, windowHeight*1/4 + 30); 
  
  if (diceRollFrameCount > 0) {
    diceRollFrameCount += -1;
    var resultArray = [];
    for (let i=0; i<diceCount; i++) {
      resultArray.push(random(diceEyes[i]));
    }
    currentResult = resultArray;
  }
  
  if (diceCount <= 2){
    for (let i=0; i<diceCount; i++) {
      let x = windowWidth/2 + squareSpan*(-diceCount/2 + 1/2 + i);
      let y = windowHeight/2;
      if (array_equal(diceEyes[i], diceDefaultEyes)) {
        drawSquare(x, y, squareSize, currentResult[i]);
      } else {
        drawTextSquare(x, y, squareSize, currentResult[i]);
      }
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

// function rollFinished() {
//   if (currentResult.length > 0) {
//     diceHistory.push(currentResult);
//   }
// }

function drawTextSquare(centerX, centerY, size, eyeText) {
  const textWidthSize = size/2;
  const squareCornerRound = size/5;
  fill(250, 250, 250);
  rect(centerX, centerY, size, size, squareCornerRound);
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
    case '1':
      circle(
        centerX,
        centerY,
        botSize
      );
      break;
    case '2':
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
    case '3':
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
    case '4':
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
    case '5':
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
    case '6':
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

function array_equal(a, b) {
  if (!Array.isArray(a))    return false;
  if (!Array.isArray(b))    return false;
  if (a.length != b.length) return false;
  for (var i = 0, n = a.length; i < n; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}