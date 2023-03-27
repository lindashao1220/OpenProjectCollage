var socket = io();
console.log("hiiii:)))");


// NEW1: ml5
let video;
let faceapi;
let detections;
const detection_options = {
  withLandmarks: true,
  withDescriptors: false,
}


let cnv;
var webCam;
var webCamImage;
var snap;
var slider;
let zoom = 4;
// let show = true;

let text;

const texts =[];

function setup() {
  let canvas = createCanvas(360, 270);
  canvas.parent("container");
  canvas.id("cnv");
  noCanvas();

  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide(); 
}


function modelMouthReady() {
  console.log('ready!');
  console.log(faceapi);
  faceapi.detect(gotMouthResults);
}


function modelNoseReady() {
  console.log('ready!')
  console.log(faceapi)
  faceapi.detect(gotNoseResults)
}

function modelLefteyeReady() {
  console.log('ready!')
  console.log(faceapi)
  faceapi.detect(gotLefteyeResults)
}

function modelRighteyeReady() {
  console.log('ready!')
  // console.log(faceapi)
  faceapi.detect(gotRighteyeResults)
}

function modelForeheadeyeReady() {
  console.log('ready!')
  console.log(faceapi)
  faceapi.detect(gotForeheadResults)
}



function gotMouthResults(err, result) {
  if (err) {
      console.log(err)
      return
  }
  // console.log(result)
  detections = result;

  // background(220);
  background(255);
  image(video, 0,0, width, height)
  if (detections) {
      if (detections.length > 0 && cases == 5) {
          // console.log(detections)
          drawBox(detections)
          drawMouthLandmarks(detections)
      }
  }
  faceapi.detect(gotMouthResults)
}


function gotNoseResults(err, result) {
  if (err) {
      console.log(err)
      return
  }
  // console.log(result)
  detections = result;

  // background(220);
  background(255);
  image(video, 0,0, width, height)
  if (detections) {
      if (detections.length > 0 && cases == 3) {
          // console.log(detections)
          drawBox(detections)
          drawNoseLandmarks(detections)
      }

  }
  faceapi.detect(gotNoseResults)
}


function gotLefteyeResults(err, result) {
  if (err) {
      console.log(err)
      return
  }
  // console.log(result)
  detections = result;

  // background(220);
  background(255);
  image(video, 0,0, width, height)
  if (detections) {
      if (detections.length > 0 && cases ==1) {
          // console.log(detections)
          drawBox(detections)
          drawLefteyeLandmarks(detections)
      }

  }
  faceapi.detect(gotLefteyeResults)
}

function gotRighteyeResults(err, result) {
  if (err) {
      console.log(err)
      return
  }
  // console.log(result)
  detections = result;

  // background(220);
  background(255);
  image(video, 0,0, width, height)
  if (detections) {
      if (detections.length > 0 && cases == 2) {
          // console.log(detections)
          drawBox(detections)
          drawRighteyeLandmarks(detections)
      }

  }
  faceapi.detect(gotRighteyeResults)
}


function gotForeheadResults(err, result) {
  if (err) {
      console.log(err)
      return
  }
  // console.log(result)
  detections = result;

  // background(220);
  background(255);
  image(video, 0,0, width, height)
  if (detections) {
      if (detections.length > 0 && cases == 4) {
          // console.log(detections)
          drawBox(detections)
          drawForeheadLandmarks(detections)
      }
  }
  faceapi.detect(gotForeheadResults)
}




function drawBox(detections){
  for(let i = 0; i < detections.length; i++){
      const alignedRect = detections[i].alignedRect;
      const x = alignedRect._box._x
      const y = alignedRect._box._y
      const boxWidth = alignedRect._box._width
      const boxHeight  = alignedRect._box._height

      noFill();
      stroke(161, 95, 251);
      strokeWeight(2);
      rect(x, y, boxWidth, boxHeight);
  }
  
}



let imgData;

function drawMouthLandmarks(detections){
  noFill();
  stroke(161, 95, 251)
  strokeWeight(2)


let minX = 9999;
let minY = 9999;
let maxX = 0;
let maxY = 0;

  for(let i = 0; i < detections.length; i++){
    console.log("nooooooowwwwwwww mouth");
      const mouth = detections[i].parts.mouth; 
      for(let i = 0; i < mouth.length; i++){
        if (mouth[i]._x > maxX) {
          maxX = mouth[i]._x;
        }
        if (mouth[i]._y > maxY) {
          maxY = mouth[i]._y;
        }
        if (mouth[i]._x < minX) {
          minX = mouth[i]._x;
        }
        if (mouth[i]._y < minY) {
          minY = mouth[i]._y;
        }
      }

      imgData = cropToDataUrl(video, minX-60, minY-2, maxX-minX+115, maxY-minY+40, 50, 50, maxX-minX+115, maxY-minY+40);
      copy(minX-60, minY-2, maxX-minX+115, maxY-minY+40, 50, 50, maxX-minX+115, maxY-minY+40);

      // copy(minX, minY, maxX-minX, maxY-minY, 0, 0, maxX-minX, maxY-minY);

  }
}


function drawNoseLandmarks(detections){
  noFill();
  stroke(161, 95, 251);
  strokeWeight(2);

  for(let i = 0; i < detections.length; i++){
    console.log("nooooooowwwwwwww nose");
      const nose = detections[i].parts.nose;

      let minX = 9999;
      let minY = 9999;
      let maxX = 0;
      let maxY = 0;
      for(let i = 0; i < nose.length; i++){
        if (nose[i]._x > maxX) {
          maxX = nose[i]._x;
        }
        if (nose[i]._y > maxY) {
          maxY = nose[i]._y;
        }
        if (nose[i]._x < minX) {
          minX = nose[i]._x;
        }
        if (nose[i]._y < minY) {
          minY = nose[i]._y;
        }
      }

      fill(0, 255, 0);

      imgData = cropToDataUrl(video, minX-73, minY+20, maxX-minX+150, maxY-minY-10, 50, 50, maxX-minX+150, maxY-minY-10);
      copy(minX-73, minY+20, maxX-minX+150, maxY-minY-10, 50, 50, maxX-minX+150, maxY-minY-10);
  }
}


function drawLefteyeLandmarks(detections){
  noFill();
  stroke(161, 95, 251);
  strokeWeight(2);

  for(let i = 0; i < detections.length; i++){
    console.log("nooooooowwwwwwww leftEye");
      const leftEye = detections[i].parts.rightEye;

      let minX = 9999;
      let minY = 9999;
      let maxX = 0;
      let maxY = 0;
      for(let i = 0; i < leftEye.length; i++){
        if (leftEye[i]._x > maxX) {
          maxX = leftEye[i]._x;
        }
        if (leftEye[i]._y > maxY) {
          maxY = leftEye[i]._y;
        }
        if (leftEye[i]._x < minX) {
          minX = leftEye[i]._x;
        }
        if (leftEye[i]._y < minY) {
          minY = leftEye[i]._y;
        }
      }

      fill(0, 255, 0);


      imgData = cropToDataUrl(video, minX-20, minY-10, maxX-minX+65, maxY-minY+30, 50, 50, maxX-minX+65, maxY-minY+30);

      copy(minX-20, minY-10, maxX-minX+65, maxY-minY+30, 50, 50, maxX-minX+65, maxY-minY+30);
  }
}

function drawRighteyeLandmarks(detections){
  noFill();
  stroke(161, 95, 251);
  strokeWeight(2);

  for(let i = 0; i < detections.length; i++){
    console.log("nooooooowwwwwwww rightEye");
      const rightEye = detections[i].parts.leftEye;

      // const rightEyeBrow = detections[i].parts.rightEyeBrow;
      // const leftEyeBrow = detections[i].parts.leftEyeBrow;

      let minX = 9999;
      let minY = 9999;
      let maxX = 0;
      let maxY = 0;
      for(let i = 0; i < rightEye.length; i++){
        if (rightEye[i]._x > maxX) {
          maxX = rightEye[i]._x;
        }
        if (rightEye[i]._y > maxY) {
          maxY = rightEye[i]._y;
        }
        if (rightEye[i]._x < minX) {
          minX = rightEye[i]._x;
        }
        if (rightEye[i]._y < minY) {
          minY = rightEye[i]._y;
        }
      }

      fill(0, 255, 0);

imgData = cropToDataUrl(video, minX-43, minY-10, maxX-minX+65, maxY-minY+30, 50, 50, maxX-minX+60, maxY-minY+30);
copy(minX-43, minY-10, maxX-minX+65, maxY-minY+30, 50, 50, maxX-minX+60, maxY-minY+30);

  }
}


function drawForeheadLandmarks(detections){
  noFill();
  stroke(161, 95, 251);
  strokeWeight(2);

  for(let i = 0; i < detections.length; i++){
    console.log("nooooooowwwwwwww forehead");
      const foreheadRight = detections[i].parts.rightEyeBrow;
      const foreheadLeft = detections[i].parts.leftEyeBrow;
    

      let minX = 9999;
      let minY = 9999;
      let maxX = 0;
      let maxY = 0;
      for(let i = 0; i < foreheadRight.length; i++){
        if (foreheadRight[i]._x > maxX) {
          maxX = foreheadRight[i]._x;
        }
        if (foreheadRight[i]._y > maxY) {
          maxY = foreheadRight[i]._y;
        }
        if (foreheadRight[i]._y < minY) {
          minY = foreheadRight[i]._y;
        }
      }

      for(let i = 0; i < foreheadLeft.length; i++){
      if (foreheadLeft[i]._x < minX) {
        minX = foreheadLeft[i]._x;
      }
    }

      fill(0, 255, 0);

imgData = cropToDataUrl(video, minX-25, minY-60, maxX-minX+50, maxY-minY+65, 50, 50, maxX-minX+50, maxY-minY+65);
copy(minX-25, minY-60, maxX-minX+50, maxY-minY+65, 50, 50, maxX-minX+50, maxY-minY+65);

  }
}


function drawPart(feature, closed){
  beginShape();
  for(let i = 0; i < feature.length; i++){
      const x = feature[i]._x
      const y = feature[i]._y
      vertex(x, y)
  }
  if(closed === true){
      endShape(CLOSE);
  } else {
      endShape();
  }
  
}


let cases;
socket.on("lefteye", data=>{
  console.log(data);
  if (data == "lefteye"){
    faceapi = ml5.faceApi(video, detection_options, modelLefteyeReady)
    textAlign(RIGHT);
    cases = 1;
    console.log("you are on lefteye areaaaaa pic smileee")
    console.log(faceapi);
    text = "left eye"
  }
})

socket.on("righteye", data=>{
  console.log(data);
  if (data == "righteye"){
    faceapi = ml5.faceApi(video, detection_options, modelRighteyeReady)
    textAlign(RIGHT);
    cases = 2;
    console.log("you are on righteye areaaaaa pic smileee")
    text = "right eye"
  }
})

socket.on("nose", data=>{
  console.log(data);
  if (data == "nose"){
    faceapi = ml5.faceApi(video, detection_options, modelNoseReady)
    textAlign(RIGHT);
    console.log("you are on nose areaaaaa pic smileee")
    cases = 3;
    text = "nose"
  }
})

socket.on("forehead", data=>{
  console.log(data);
  if (data == "forehead"){
    faceapi = ml5.faceApi(video, detection_options, modelForeheadeyeReady)
    textAlign(RIGHT);
    console.log("you are on foreheaddd areaaaaa pic smileee")
    cases = 4;
    text = "forehead"
  }
})

socket.on("mouth", data=>{
  console.log(data);
  if (data == "mouth"){
    faceapi = ml5.faceApi(video, detection_options, modelMouthReady)
    textAlign(RIGHT);
    cases = 5;
    console.log("you are on nose areaaaaa pic smileee")
    text = "mouth"
  }
})


function takePhoto(){
  console.log("hiiii");
  console.log(imgData);
  
  // document.getElementById('test').style.background = 'url(' + imgData + ')';
  document.getElementById("output").src = imgData;
}



let store;
let btn = document.getElementById("button");



btn.addEventListener("click", ()=>{
  console.log("the button is triggered!!!");
  console.log("contribute caseeeees", cases)

  // const confirmationResult = confirm("Can I collect your face data?");

  // if (confirmationResult == true) {
    takePhoto();
    store = imgData;
    if (imgData === undefined) {
      alert("Didn't recognise your face😞 Could you plz contribute again?");
    // } else {
    //   alert("Thanks for your contribution🤪");
    // }
  } 
  
  // else if (confirmationResult == false)  {
  //   alert("I understand your concern🙂 Plz continue enjoying the face collage🥰");
  //   return;
  // }
});



//send it to database
//not to the collage
// //send message to the server
let part;
let sendbutton = document.getElementById("send");
  sendbutton.addEventListener("click", ()=>{
    console.log("senddddddd cassess", cases)
    console.log("clicked");
        //send name message to the server(package up the data)
        let data ={imgChange: store}
        //send the message to the server
   console.log("heyyyyyy I am cases", cases)
        if (store === undefined) {
          console.log(store)
          alert("Can't submit empty image🥸")
        }else{
          if(cases == 1){
            console.log("imgLefteyeChange");
            socket.emit('imgLefteyeChange', data);
            part = "lefteye";
            document.getElementById("recieve1").src = data.imgChange;
            
          }
          else if(cases == 2){
            console.log("imgRighteyeChange");
            socket.emit('imgRighteyeChange', data);
            part = "righteye";
            document.getElementById("recieve2").src = data.imgChange;
          }
          else if(cases == 3){
            console.log("imgNoseChange");
            socket.emit('imgNoseChange', data);
            part = "nose";
            document.getElementById("recieve5").src = data.imgChange;
  
          } else if(cases == 4){
            console.log("imgForeheadChange");
            socket.emit('imgForeheadChange', data);
            part = "forehead";
            document.getElementById("recieve4").src = data.imgChange;
  
          } else if(cases == 5){
            console.log("imgMouthChange");
            socket.emit('imgMouthChange', data);
            part = "mouth";
            document.getElementById("recieve3").src = data.imgChange;
          }
        console.log(data);
        console.log(store)

        alert("Submitted successfully🤩 Hope you enjoy the collage🥳");

        socket.emit('allocateRoom', part);
      }

})


function cropToDataUrl(image, x, y, w, h) {
  let graphics = createGraphics(w, h);
  graphics.copy(image, x, y, x + w, y + h, 0, 0, x + w, y + h);
  let dataUrl = graphics.canvas.toDataURL();
  return dataUrl;
}






socket.on("archivalLefteyeData", data=>{
  console.log("archivalLefteyeData")
  document.getElementById("recieve1").src = data;
})

socket.on("archivalRighteyeData", data=>{
  console.log("archivalRighteyeData")
  document.getElementById("recieve2").src = data;
})

socket.on("archivalNoseData", data=>{
  console.log("archivalNoseData")
  document.getElementById("recieve5").src = data;
})

socket.on("archivalForeheadData", data=>{
  console.log("archivalForeheadData")
  document.getElementById("recieve4").src = data;
})

socket.on("archivalMouthData", data=>{
  console.log("archivalMouthData")
  document.getElementById("recieve3").src = data;
})



setInterval(() => {
  console.log("Current value of myVariable:", text);

}, 1000);






  texts.push("PHOTO COLLAGE",
  "照片拼贴",
  "포토 꼴라주",
  "Fotocollage",
  "collage de photos",
  "κολάζ φωτογραφιών",
  "👧👦🏼👩🏾🧑🏻‍🦰👵🏻👱🏼‍♀️")   







/*reference: https://alvarotrigo.com/blog/css-text-animations/ */
const elts = {
  text1: document.getElementById("text1"),
  text2: document.getElementById("text2")
};

const morphTime = 1;
const cooldownTime = 0.25;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

function doMorph() {
  morph -= cooldown;
  cooldown = 0;

  let fraction = morph / morphTime;

  if (fraction > 1) {
      cooldown = cooldownTime;
      fraction = 1;
  }

  setMorph(fraction);
}

function setMorph(fraction) {
  elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
  elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

  fraction = 1 - fraction;
  elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
  elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

  elts.text1.textContent = texts[textIndex % texts.length];
  elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
  morph = 0;

  elts.text2.style.filter = "";
  elts.text2.style.opacity = "100%";

  elts.text1.style.filter = "";
  elts.text1.style.opacity = "0%";
}

function animate() {
  requestAnimationFrame(animate);

  let newTime = new Date();
  let shouldIncrementIndex = cooldown > 0;
  let dt = (newTime - time) / 1000;
  time = newTime;

  cooldown -= dt;

  if (cooldown <= 0) {
      if (shouldIncrementIndex) {
          textIndex++;
      }

      doMorph();
  } else {
      doCooldown();
  }
}

animate();





const iconBtn = document.getElementById('icon-btn');
const popupBox = document.getElementById('popup-box');
const closeBtn = document.getElementById('close-btn');

iconBtn.addEventListener('click', function() {
  popupBox.classList.add('show');
});

closeBtn.addEventListener('click', function() {
  popupBox.classList.remove('show');
});



