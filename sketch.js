let canvasWidth;
let diceCount; // さいころの個数
let textWidthSize;
let diceDefaultEyes = ['1', '2', '3', '4' ,'5', '6'];
let diceEyes = [];
let diceHistory = [];
let currentResult = [];
let elementMargin = 16;
let buttonWidth = 100;
let dice2text;
let dice2InputArray = [];
let dice3text;
let dice3InputArray = [];
let diceDefaultColorArray = [
  ['#000', '#FFF'],
  ['#FF0', '#F00'],
  ['#FFF', '#F90']
];
let isDiceActiveArray = [];
let diceColorArray = [];
let diceRollFrameCount = 0;
const diceRollTime = 0.6* 60; // 秒間

function setup() { 
  diceCount=3;
  diceColorArray = diceDefaultColorArray;
  diceEyes = [
    diceDefaultEyes,
    diceDefaultEyes,
    ['船a', '船b', '船c', '黄', '青', '緑']
  ]
  isDiceActiveArray = [true, true, true];
  
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

  canvasWidth = (windowWidth > domTotalWidth) ? windowWidth : domTotalWidth;
  createCanvas(canvasWidth, windowHeight);
  
  let startPositionX = canvasWidth/2 - domTotalWidth/2;
  
  // setup dice2
  var positionY = windowHeight*5/10;
  dice2text = createElement('h4', 'dice2');
  dice2text.position(startPositionX, positionY);
  dice2text.size(diceTextWidth);
  dice2text.style('color', diceColorArray[1][0]);
  dice2text.style('background-color',  diceColorArray[1][1]);
  
  for (let i=0; i<6; i++) { // TODO: window widthが小さい場合のレイアウトを作る
    var input = createInput();
    var positionX = dice2text.x + dice2text.width +
        elementMargin + (inputWidth + elementMargin)*i;
    input.position(positionX, positionY);
    input.size(inputWidth);
    input.value(diceEyes[1][i]);
    dice2InputArray.push(input);
  }
                                 
  positionY += domLineHeight;
  
  positionX = startPositionX + elementMargin;
  var dice2UpdateButton = createDomButton('update', positionX, positionY);
  dice2UpdateButton.mousePressed(dice2Update);
  
  positionX = dice2UpdateButton.x + dice2UpdateButton.width + elementMargin;
  var dice2ColorButton = createDomButton('color', positionX, positionY);
  
  positionX = dice2ColorButton.x + dice2ColorButton.width + elementMargin;
  var dice2RemoveButton = createDomButton('remove', positionX, positionY);
  dice2RemoveButton.mousePressed(dice2Remove);
  
  // setup dice3
  positionY += domLineHeight + elementMargin;
  dice3text = createElement('h4', 'dice3');
  dice3text.position(startPositionX, positionY);
  dice3text.size(diceTextWidth);
  dice3text.style('color', diceColorArray[2][0]);
  dice3text.style('background-color',  diceColorArray[2][1]);
  
  for (let i=0; i<6; i++) { // TODO: window widthが小さい場合のレイアウトを作る
    var input = createInput();
    var positionX = dice3text.x + dice3text.width +
        elementMargin + (inputWidth + elementMargin)*i;
    input.position(positionX, positionY);
    input.size(inputWidth);
    input.value(diceEyes[2][i]);
    dice3InputArray.push(input);
  }
                                 
  positionY += domLineHeight;
  
  positionX = startPositionX + elementMargin;
  var dice3UpdateButton = createDomButton('update', positionX, positionY);
  dice3UpdateButton.mousePressed(dice3Update);
  
  positionX = dice3UpdateButton.x + dice3UpdateButton.width + elementMargin;
  var dice3ColorButton = createDomButton('color', positionX, positionY);
  
  positionX = dice3ColorButton.x + dice3ColorButton.width + elementMargin;
  var dice3RemoveButton = createDomButton('remove', positionX, positionY);
  dice3RemoveButton.mousePressed(dice3Remove);
  
  // setup rollButton
  const rollButtonWidth = canvasWidth - elementMargin*4;
  positionX = canvasWidth/2 - rollButtonWidth/2;
  positionY += domLineHeight + elementMargin*2;
  const rollButtonHeight = windowHeight - positionY - elementMargin*4;
  var rollButton = createButton('Roll the Dice!');
  const rollButtonFontsize = canvasWidth/10;
  rollButton.style('font-size', rollButtonFontsize+'px');
  rollButton.class('btn btn-primary btn-lg');
  rollButton.position(positionX, positionY);
  rollButton.size(rollButtonWidth, rollButtonHeight);
  rollButton.mouseReleased(rollTheDice);
}

function rollTheDice() {
  diceRollFrameCount = diceRollTime;
  // draw()にて減数していく
}

function dice2Update() {
  isDiceActiveArray[1] = true;
  let isInputEmpty = true;
  let inputTextArray = [];
  // 入力値について判定する
  for (let input of dice2InputArray) {
    if (!input.value()) {
      continue;
    }
    isInputEmpty = false;
    inputTextArray.push(input.value());
  }
  // 全項目未入力の場合は、さいころの目を割り当てる
  diceEyes[1] = isInputEmpty ? diceDefaultEyes : inputTextArray;
  for (let i=0; i<diceEyes[1].length; i++) {
    dice2InputArray[i].value(diceEyes[1][i]);
  }
}

function dice2Remove() {
  isDiceActiveArray[1] = false;
  dice2text.style('color', diceColorArray[1][0]);
  dice2text.style('background-color',  diceColorArray[1][1]);
  for (let input of dice2InputArray) {
    input.value('');
  }
}

function dice3Update() {
  isDiceActiveArray[2] = true;
  let isInputEmpty = true;
  let inputTextArray = [];
  // 入力値について判定する
  for (let input of dice3InputArray) {
    if (!input.value()) {
      continue;
    }
    isInputEmpty = false;
    inputTextArray.push(input.value());
  }
  // 全項目未入力の場合は、さいころの目を割り当てる
  diceEyes[2] = isInputEmpty ? diceDefaultEyes : inputTextArray;
  for (let i=0; i<diceEyes[2].length; i++) {
    dice3InputArray[i].value(diceEyes[2][i]);
  }
}

function dice3Remove() {
  isDiceActiveArray[2] = false;
  dice3text.style('color', diceColorArray[2][0]);
  dice3text.style('background-color',  diceColorArray[2][1]);
  for (let input of dice3InputArray) {
    input.value('');
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
  const squareSize = canvasWidth/6;
  const squareSpan = squareSize + canvasWidth/10;
  textWidthSize = canvasWidth/20;
  
  background(240);
  fill('#000');
  textSize(textWidthSize);
  text('Tap Button to Roll the Dice!', canvasWidth/2, windowHeight*1/10);
  text('result: '+currentResult, canvasWidth/2, windowHeight*1/10 + 60); 
  
  if (diceRollFrameCount > 0) {
    diceRollFrameCount += -1;
    var resultArray = [];
    for (let i=0; i<isDiceActiveArray.length; i++) {
      resultArray.push(isDiceActiveArray[i] ? random(diceEyes[i]) : null);
    }
    currentResult = resultArray;
  }
  
  activeDiceCount = isDiceActiveArray.filter(function(value){
    return value === true;
  }).length

  var startPositionX = canvasWidth/2 + squareSpan*(-activeDiceCount/2 + 1/2);
  for (let i=0; i<diceCount; i++) {
    if (isDiceActiveArray[i] === false) { continue; }
    let y = windowHeight*3/10;
    if (array_equal(diceEyes[i], diceDefaultEyes)) {
      drawSquare(startPositionX, y, squareSize, currentResult[i],i);
    } else {
      drawTextSquare(startPositionX, y, squareSize, currentResult[i],i);
    }
    startPositionX += squareSpan;
  }
}

function drawTextSquare(centerX, centerY, size, eyeText,diceIndex) {
  const textWidthSize = size/2;
  const squareCornerRound = size/5;
  fill(diceColorArray[diceIndex][1]);
  rect(centerX, centerY, size, size, squareCornerRound);
  fill(diceColorArray[diceIndex][0]);
  textSize(textWidthSize);
  text(eyeText, centerX, centerY+size*0.2);//0.2は微調整分
}

function drawSquare(centerX, centerY, size, eyes, diceIndex) {
  const botSize = size/5;
  const squareCornerRound = size/5;
  fill(diceColorArray[diceIndex][1]);
  rect(
    centerX,
    centerY,
    size,
    size,
    squareCornerRound
  );
  fill(diceColorArray[diceIndex][0]);
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