const util = require('util')

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("./node_modules/socket.io/dist");
const io = new Server(server);


app.use(express.static('public'));




//DATABASE
let admin = require("firebase-admin");

// Fetch the service account key JSON file contents
let serviceAccount = require("./key/databaseforopenproject-firebase-adminsdk-qe1z9-b4cf6bbae8.json");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // The database URL depends on the location of the database
  databaseURL: "https://databaseforopenproject-default-rtdb.firebaseio.com"
});
// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();
var ref0 = db.ref("lefteye");
var ref1 = db.ref("righteye");
var ref2 = db.ref("nose");
var ref3 = db.ref("forehead");
var ref4 = db.ref("mouth");
// ref.push("byee")


io.on('connection', (socket) => {
//   all we want to do with the client, we need to do in here.
    console.log('------------------------------------');
    console.log('[+] a user connected', socket.id);

    
let counter = 0;

let randomLefteyeItem;
let countLefteyeCur; 
let arrLefteye = [];

//get the current numbr of the file in database to allocate part
ref0.once('value').then((snapshot) => {
  countLefteyeCur = snapshot.numChildren();
  console.log("heyyyy i am always here", countLefteyeCur)
  counter = counter + 1;
})

//tuen all the data in database into an image array
  ref0.once('value').then((snapshot) => {
    let archivalLefteyeData = snapshot.val();

    let keys;
    let dataPoint;
    keys = Object.keys(archivalLefteyeData);
    for(let i = 0; i < keys.length; i++){
      let key = keys[i];
    dataPoint = archivalLefteyeData[key].imgChange;
    arrLefteye.push(dataPoint);
  }

//get a random image data and send it out
  let time = 5000 + Math.random() * 10000;
  setInterval(() => {
    randomIndex = Math.floor(Math.random() * arrLefteye.length);
    randomLefteyeItem = arrLefteye[randomIndex];
    // console.log(randomLefteyeItem); // prints a random value from the array
    socket.emit('archivalLefteyeData', randomLefteyeItem);
  }, time); 
})



let randomRighteyeItem;
let countRighteye; //for refreshing the images from the database
let countRighteyeCur; //for allocating part
let arrRighteye = [];

ref1.once('value').then((snapshot) => {
  countRighteyeCur = snapshot.numChildren();
  console.log("heyyyy i am always here", countRighteyeCur)
  counter = counter + 1;
})

  // setInterval(()=>{
  //       ref1.once('value').then((snapshot) => {
  //        countRighteye = snapshot.numChildren();
  //       console.log("righteye total images", countRighteye);
  //     });
  //  },10000)


  ref1.once('value').then((snapshot) => {
    let archivalRighteyeData = snapshot.val();


    let keys;
    let dataPoint;
    keys = Object.keys(archivalRighteyeData);
    for(let i = 0; i < keys.length; i++){
      let key = keys[i];
    dataPoint = archivalRighteyeData[key].imgChange;
    arrRighteye.push(dataPoint);
  }



  let time = 5000 + Math.random() * 10000;
  setInterval(() => {
    randomIndex = Math.floor(Math.random() * arrRighteye.length);
    randomRighteyeItem = arrRighteye[randomIndex];
    // console.log(randomRighteyeItem); // prints a random value from the array
    socket.emit('archivalRighteyeData', randomRighteyeItem);
  }, time); 
})








let randomNoseItem; 
let countNoseCur;
let arrNose = [];

ref2.once('value').then((snapshot) => {
  countNoseCur = snapshot.numChildren();
  console.log("heyyyy i am always here", countNoseCur)
  counter = counter + 1;
})

  ref2.once('value').then((snapshot) => {
    let archivalNoseData = snapshot.val();


    let keys;
    let dataPoint;
    keys = Object.keys(archivalNoseData);
    for(let i = 0; i < keys.length; i++){
      let key = keys[i];
    dataPoint = archivalNoseData[key].imgChange;
    arrNose.push(dataPoint);
  }



  let time = 5000 + Math.random() * 1000;
  setInterval(() => {
    // console.log(arrNose.length);
    randomIndex = Math.floor(Math.random() * arrNose.length);
    randomNoseItem = arrNose[randomIndex];
    // console.log(randomNoseItem); // prints a random value from the array
    socket.emit('archivalNoseData', randomNoseItem);
  }, time); 
})




let randomForeheadItem;
let countForeheadCur; //for allocating part
    let arrForehead = [];

ref3.once('value').then((snapshot) => {
  countForeheadCur = snapshot.numChildren();
  console.log("heyyyy i am always here", countForeheadCur)
  counter = counter + 1;
})

  // setInterval(()=>{
  //       ref1.once('value').then((snapshot) => {
  //       countForehead = snapshot.numChildren();
  //       console.log("forehead total images", countForehead);
  //     });
  //  },10000)


  ref3.once('value').then((snapshot) => {
    let archivalForeheadData = snapshot.val();

    let keys;
    let dataPoint;
    keys = Object.keys(archivalForeheadData);
    for(let i = 0; i < keys.length; i++){
      let key = keys[i];
    dataPoint = archivalForeheadData[key].imgChange;
    arrForehead.push(dataPoint);
  }



  let time = 5000 + Math.random() * 10000;
  setInterval(() => {
    // console.log("This is the forehead array", arrForehead.length);
    randomIndex = Math.floor(Math.random() * arrForehead.length);
    randomForeheadItem = arrForehead[randomIndex];
    // console.log(randomForeheadItem); // prints a random value from the array
    socket.emit('archivalForeheadData', randomForeheadItem);
  }, time); 
})






let randomMouthItem;
let countMouthCur; //for allocating part
let arrMouth = [];

ref4.once('value').then((snapshot) => {
  countMouthCur = snapshot.numChildren();
  console.log("heyyyy i am always here", countMouthCur)
  counter = counter + 1;
})

  ref4.once('value').then((snapshot) => {
    let archivalMouthData = snapshot.val();

    let keys;
    let dataPoint;
    keys = Object.keys(archivalMouthData);
    for(let i = 0; i < keys.length; i++){
      let key = keys[i];
    dataPoint = archivalMouthData[key].imgChange;
    arrMouth.push(dataPoint);
  }



  let time = 5000 + Math.random() * 10000;
  setInterval(() => {
    randomIndex = Math.floor(Math.random() * arrMouth.length);
    randomMouthItem = arrMouth[randomIndex];
    // console.log(randomMouthItem); // prints a random value from the array
    socket.emit('archivalMouthData', randomMouthItem);
  }, time); 
})








let lowestValue;

let load = setInterval(() => {
  console.log("load");
  if (counter == 5){
    lowestValue = Math.min(countRighteyeCur, countLefteyeCur, countNoseCur, countForeheadCur, countMouthCur);
    console.log("I am the lowest!!!!!", lowestValue); 
  
    if(lowestValue == countRighteyeCur){
      console.log("righteye!")
      let part = "righteye";
      socket.emit('righteye', part);

    }else if(lowestValue == countLefteyeCur){
      console.log("lefteye!")
      let part = "lefteye";
      socket.emit('lefteye', part);

    }else if(lowestValue == countNoseCur){
      console.log("nose!")
      let part = "nose";
      socket.emit('nose', part);

    }else if(lowestValue == countForeheadCur){
      console.log("forehead!")
      let part = "forehead";
      socket.emit('forehead', part);

    }else if(lowestValue == countMouthCur){
      console.log("mouth!")
      let part = "mouth";
      socket.emit('mouth', part);
    }

    clearInterval(load);
  }
}, 500); 


socket.on("imgLefteyeChange", newImg=>{
  ref0.push(newImg)
  // console.log(newImg)
  arrLefteye.push(newImg.imgChange);
  countLefteyeCur = countLefteyeCur + 1;
})

socket.on("imgRighteyeChange", newImg=>{
 ref1.push(newImg)
 arrRighteye.push(newImg.imgChange);
 countRighteyeCur = countRighteyeCur + 1;
})

socket.on("imgNoseChange", newImg=>{
 ref2.push(newImg);
 arrNose.push(newImg.imgChange);
 countNoseCur = countNoseCur + 1;
})

socket.on("imgForeheadChange", newImg=>{
ref3.push(newImg)
arrForehead.push(newImg.imgChange);
countForeheadCur = countForeheadCur + 1;
})

socket.on("imgMouthChange", newImg=>{
ref4.push(newImg)
arrMouth.push(newImg.imgChange);
countMouthCur = countMouthCur + 1
})



socket.on("allocateRoom", part=>{
 console.log("heyyyyy i ammmmm the current part!", part)
let lowestValue;

let load = setInterval(() => {
    console.log("load");
    lowestValue = Math.min(countRighteyeCur, countLefteyeCur, countNoseCur, countForeheadCur, countMouthCur);
    console.log("I am the lowest!!!!!", lowestValue); 
      
    if(lowestValue == countRighteyeCur){
      console.log("righteye!")
      let part = "righteye";
      socket.emit('righteye', part);

    }else if(lowestValue == countLefteyeCur){
      console.log("lefteye!")
      let part = "lefteye";
      socket.emit('lefteye', part);

    }else if(lowestValue == countNoseCur){
      console.log("nose!")
      let part = "nose";
      socket.emit('nose', part);

    }else if(lowestValue == countForeheadCur){
      console.log("forehead!")
      let part = "forehead";
      socket.emit('forehead', part);

    }else if(lowestValue == countMouthCur){
      console.log("mouth!")
      let part = "mouth";
      socket.emit('mouth', part);
    }

    clearInterval(load);
  
}, 500); 
})



    socket.on('disconnect', () => {
        console.log('------------------------------------');
        console.log('[-] user disconnected', socket.id);

    });


});


server.listen(3000, () => {
  console.log('listening on *:3000');
});



  
