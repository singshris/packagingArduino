let counter = 0;
const increment = 120;
let integerVals = [2, 3, 4];
let roundedness = 80;
let arr = [];
let startingPos;
let LR;
let xMultiplier;
let qVertex; //vertex 
let newqVertex; //vertex
let nextPoint;

// save your sheet ID and name of the tab as variables for use
let sheetID = "1nCU1F2b95B7Q6nvter0rGSlAIavyHjx-PcrlM0YKumU";
let tabName = "Sheet1";
let opensheet_url = `https://opensheet.elk.sh/${sheetID}/${tabName}`;
let myData = [];
let indexSlider;
let generateButton;
let textInput;
let index = 0;
let thickness;
let shapeType;
let radius = 20;
let yourName = '';

let sourceSerif;

function preload(){
sourceSerif = loadFont("SourceSerif4-Light.ttf");
}

function setup() {
  createCanvas(640, 880);
  getData();
  noFill();
}


function getData() {
  loadJSON(opensheet_url, gotData);
}

function gotData(data) {
  if (data) {
    myData = data;

    let controls = select(".controls");
    let inputSection = createDiv();
    // Create a label for the input field
    let label = createElement('h6'," Start here");
    label.parent(inputSection);
    inputSection.parent(controls)
   
    inputSection.class("inputSection");
    textInput = createInput("     FIRST NAME");
    textInput.changed(nameLabel);
    textInput.parent(inputSection);
    textInput.class("textInput");

    let sliderSection = createDiv();
    sliderSection.parent(controls)
    // sliderSection.
    sliderSection.class("sliderSection")
    indexLabel = createElement('h6', "Explore the Arduino board collection")
    indexLabel.parent(sliderSection);
    indexSlider = createSlider(0, 14, 1);
    indexSlider.changed(makePackage);
    indexSlider.parent(sliderSection);
    indexSlider.class("indexSlider");
  
    let buttonSection = createDiv();
    buttonSection.parent(controls);
    buttonSection.class("buttonSection");

    let buttonLabel = createElement('h6', 'Try a different design')
    buttonLabel.parent(buttonSection);
    generateButton = createButton('GENERATE');
    generateButton.mousePressed(makePackage);
    generateButton.parent(buttonSection);
    generateButton.class("buttonGen");

     //onLoad
     push()
     fill(color("#50B2C0"));
     for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        square(80 * i, 80 * j, 80);
      }
    } 
    rect(0, width, width, height - width);
    pop()

  } else {
    console.log("error");
  }
}


function makePackage() {
  console.log(myData);
  let datapoint = myData[indexSlider.value()];
  console.log(datapoint);
  // let pins = floor(map(datapoint.PINS, 8, 76, 10, 30));
  let pins = floor(mapExp(datapoint.PINS, 8, 76, 10, 40));
  let strokeColor = datapoint.strokeColor;
  thickness = map(datapoint.WEIGHT, 5, 54, 2, 12);
  shapeType = datapoint.shape;
  strokeWeight(thickness);
  background(datapoint.bgColor);
  stroke(color(datapoint.strokeColor));
  
  
  
  for(let i = 0; i<pins;i++){
  package()
  quadPoints(arr, roundedness, strokeColor);
  arr.splice(0, arr.length);
  }
  
  

  let brandName = "ARDUINO BOARD"
  noStroke();

  push()
  fill(strokeColor)
  rect(0, width, width, height - width);
  fill(255); 
  textFont(sourceSerif);
  textSize(60)
  text(yourName, width / 10-20, height - 90);
  pop()

  push()
  //family name and variant
  textFont('Source Code Pro');
  fill(datapoint.bgColor)
  textSize(20);
  text(brandName, width - textWidth(brandName) - textWidth(brandName)/2, height - 90)
  highlightBox(width - textWidth(brandName) - textWidth(brandName)/2, height - 150, datapoint.bgColor, strokeColor, datapoint.FORM, datapoint.type);
  pop()

}

function highlightBox(x, y, c1, c2, name, famName) {
  let padding = 15; 
  let boxWidth = textWidth(name) + 2 * padding;
  let boxHeight = 2 * padding;
  // Draw the highlight box behind the text
  fill(255); 
  text(famName, x+padding + boxWidth, y+padding*1.5)
  fill(c1); 
  noStroke();
  rect(x, y, boxWidth,  boxHeight);
  fill(c2);
  text(name, x+padding, y+padding*1.5);
}

function nameLabel() {
  yourName = this.value() + "'s";
  console.log(yourName);
  makePackage()
  return yourName 
}

//this is the one that will complete one shape
function package() {
  startingPoint();
  secondPoint(arr[0].x, arr[0].y);
  endPoint(arr[1].x, arr[1].y);
}

function startingPoint() {
  let edge = Math.floor(random(4));
  if (edge === 0) {
    // Top edge
    arr.push({ x: round(random(0, width / increment)) * increment, y:  0  });
  } else if (edge === 1) {
    // Right edge
    arr.push({ x: width, y: round(random(0, width / increment)) * increment });
  } else if (edge === 2) {
    // Bottom edge
    arr.push({ x: round(random(0, width / increment)) * increment, y: width });
  } else {
    // Left edge
    arr.push({ x: 0, y: round(random(0, width / increment)) * increment });
  }

  // ellipse(arr[0].x, arr[0].y, 30, 30);
}

function secondPoint(xPos, yPos) {
  xMultiplier = randomFromArray(integerVals);
  if (xPos === 0) {
    arr.push({ x: xPos + xMultiplier * increment, y: yPos });
    LR = true;
  } else if (yPos === 0) {
    arr.push({ x: xPos, y: yPos + xMultiplier * increment });
    LR = false;
  } else if (yPos === width ) {
    arr.push({ x: xPos, y: yPos - xMultiplier * increment });
    LR = false;
  } else if (xPos === width ) {
    arr.push({ x: xPos - xMultiplier * increment, y: yPos });
    LR = true;
  }
}

function endPoint(x, y) {
  let currentX = x;
  let currentY = y;
  let linesDrawn = 2;
  let maxLines = floor(max(random(2, 6)));

  while (linesDrawn < maxLines) {
    if (LR) {
      if (Math.random() < 0.5) {
        nextPoint = { x: currentX, y: currentY - xMultiplier * increment };
      } else {
        nextPoint = { x: currentX, y: currentY + xMultiplier * increment };
      }
      LR = false;
    } else {
      if (Math.random() < 0.5) {
        nextPoint = { x: currentX - increment * xMultiplier, y: currentY };
      } else {
        nextPoint = { x: currentX + increment * xMultiplier, y: currentY };
      }
      LR = true;
    }

    let newPos = { x: nextPoint.x, y: nextPoint.y };
    arr.push(newPos); //arr[2].x  arr[2].y
    currentX = nextPoint.x;
    currentY = nextPoint.y;
    linesDrawn++;
  }
}

function quadPoints(points, radius, c){
  beginShape()
  vertex(points[0].x, points[0].y)
  for(i=1; i <points.length -1; i++){
    let corner = { x: points[i].x, y: points[i].y };
    let previous = { x: points[i - 1].x, y: points[i - 1].y };
    let next = { x: points[i + 1].x, y: points[i + 1].y };
    
    let start = walkPoint(corner, previous, radius);
    let end = walkPoint(corner, next, radius)
    
    vertex(start.x, start.y);
    quadraticVertex(corner.x, corner.y, end.x, end.y)
  
  }
  vertex(points[points.length-1].x, points[points.length-1].y);
  push()
  endSymbol(points[points.length-1].x, points[points.length-1].y, c)
  pop()
  endShape()
}

function endSymbol(x, y, c){
    if (shapeType === "circle") {
    fill(color(c));
    circle(x,y, radius);
  } else if (shapeType === "dash") {
    fill(color(c));
    rectMode(CENTER);
    square(x,y, radius);
  } else if (shapeType === "outline") {
    translate(x,y)
    fill(color(c));
    rectMode(CENTER)
    rotate(PI/4);
    square(0,0, radius)
  } 
   else if (shapeType === "cross") {
  let offset = radius/2
  line(x - offset, y - offset, x + offset, y + offset);
  line(x + offset, y - offset, x - offset, y + offset);
  } 
}

function walkPoint(start, end, distance) {
  let length = dist(start.x, start.y, end.x, end.y);
  let n = distance / length;
  return {
    x: lerp(start.x, end.x, n),
    y: lerp(start.y, end.y, n),
  };
}

function randomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function mapExp(value, start1, stop1, start2, stop2) {
  // Map the value exponentially using the exp function
  return exp(map(value, start1, stop1, log(start2), log(stop2)));
}