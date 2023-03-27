const util = require('util')

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("../phase1-ml5/node_modules/socket.io/dist");
const io = new Server(server);


app.use(express.static('public'));


let connected = [];
let rooms = [];
let maxPerRoom = 5;


function allocateRoomIdxFor(newPersonId){
    //!!!help find the room that still have seats for the clients
    let roomWithSpot = rooms.findIndex(room=>{
        return room.members.length < maxPerRoom && room.members.length != 0 
    })
    console.log("allocating", roomWithSpot);
    if(roomWithSpot == -1){
        let newIdx = rooms.length
        rooms.push({
            name: "room-"+newIdx,
            members: [newPersonId],
            parts:{
              lefteye: {
                id: newPersonId,
                imgData:''
              },
              righteye: {
                id:'',
                imgData:''
              },
              mouth: {
                id:'',
                imgData:''
              },
              forehead: {
                id: '' ,
                imgData:''
              },
              nose: {
                id:'',
                imgData:''
              },
            }
        })
        return newIdx;
    }else{
        rooms[roomWithSpot].members.push(newPersonId);
        // which role should I tke, which role does not 
        // have someone assigned yet?
        let objParts = rooms[roomWithSpot].parts
        for (i of Object.keys(objParts)){
          if (objParts[i].id==''){
            rooms[roomWithSpot].parts[i].id = newPersonId;
            break;
          }
          console.log(objParts.i);
        }
        return roomWithSpot;
    }
  }


io.on('connection', (socket) => {
//   all we want to do with the client, we need to do in here.
    console.log('------------------------------------');
    console.log('[+] a user connected', socket.id);
    let clientObject = {
        id: socket.id,
        roomIdx: allocateRoomIdxFor(socket.id),
        // color: getRandomColor()
    }


    let num = clientObject.roomIdx;
    console.log("hiiiiiiiii", num);

    // clientObject.face= getFacePart()
    
    socket.join('room-'+clientObject.roomIdx);
   


//method1:
    function getPart(){
      if( socket.id == rooms[num].parts.lefteye.id){
        return "lefteye"
      } else if(socket.id == rooms[num].parts.righteye.id){
        return "righteye"
      }else if(socket.id == rooms[num].parts.mouth.id){
        return "mouth"
      }else if(socket.id == rooms[num].parts.forehead.id){
        return "forehead"
      }else if(socket.id == rooms[num].parts.nose.id){
        return "nose"
      }
    }
  
    // let idx = rooms[num].members.length - 1
    // console.log("heiakdbakjsbdkasnbdkajsndkasndoia",idx)
    clientObject["part"]=getPart();

    connected.push(clientObject);
    socket.emit('socketInfo', clientObject);
    // connected[0]["part"]=getPart();

    // function getFacePart(){
    //   console.log("hiiiiiiiii", num);
    //   let id = socket.id;
    //   if(rooms[num].members.indexOf(id) == 0){
    //    return "lefteye"
    //   }
    //   if(rooms[num].members.indexOf(id) == 1){
    //     return "righteye"
    //   }
    //   if(rooms[num].members.indexOf(id) == 2){
    //     return "mouth"
    //   }
    //   if(rooms[num].members.indexOf(id) == 3){
    //     return "forehead"
    //   }
    //   if(rooms[num].members.indexOf(id) == 4){
    //     return "nose"
    //   }
    // }
  




    // tell socket who else is in their room
    socket.emit('onlineInYourRoom', rooms[clientObject.roomIdx].members.map(id=>connected.find(elm=>elm.id == id)));



    // tell others in their room that they have a new member
    socket.to('room-'+clientObject.roomIdx).emit("newPerson", clientObject)





    // socket.on("colorChange", newColor=>{
    //     console.log('------------------------------------');
    //     console.log("✨", socket.id, "changed their color", newColor);
    //     // update color in connected array
    //     let elm = connected.find(el=>el.id == socket.id)
    //     elm.color = newColor;
    //     console.log("connected", connected)

    //     // tell rest of the room about the updated color
    //     socket.to('room-'+clientObject.roomIdx).emit("newColor", elm)

    // })


    socket.on("imgChange", newImg=>{
      console.log('------------------------------------');
      console.log("🙀", socket.id, "changed their img");
      // update color in connected array

      if( socket.id == rooms[num].parts.lefteye.id){
        rooms[num].parts.lefteye.imgData = newImg
      } else if(socket.id == rooms[num].parts.righteye.id){
        rooms[num].parts.righteye.imgData = newImg
      }else if(socket.id == rooms[num].parts.mouth.id){
        rooms[num].parts.mouth.imgData = newImg
      }else if(socket.id == rooms[num].parts.forehead.id){
        rooms[num].parts.forehead.imgData = newImg
      }else if(socket.id == rooms[num].parts.nose.id){
        rooms[num].parts.nose.imgData = newImg
      }

    
      // // tell rest of the room about the updated img
      //QUESTIONNN:  ??not emitting to the person itself???
      // socket.to('room-'+clientObject.roomIdx).emit(clientObject.part, newImg)
      io.to('room-'+clientObject.roomIdx).emit(clientObject.part, newImg)
      console.log("connected", connected)
      // console.log("room", rooms)
      console.log(util.inspect(rooms, false, null, true /* enable colors */))
  })


  let data;
         let lefteye = rooms[num].parts.lefteye.imgData.imgChange
         let righteye = rooms[num].parts.righteye.imgData.imgChange
         let forehead = rooms[num].parts.forehead.imgData.imgChange
         let nose = rooms[num].parts.nose.imgData.imgChange
         let mouth = rooms[num].parts.mouth.imgData.imgChange
         data = {lefteye, righteye, forehead, nose, mouth}

      socket.emit("update", data)
    



    socket.on('disconnect', () => {
        console.log('------------------------------------');
        console.log('[-] user disconnected', socket.id);
        let idx = connected.findIndex(elm=>elm.id==socket.id)
        let roomIdx = connected[idx].roomIdx;

      
          if( socket.id == rooms[roomIdx].parts.lefteye.id){
            console.log("lefteye")
           rooms[roomIdx].parts.lefteye.id = '';
          } else if(socket.id == rooms[roomIdx].parts.righteye.id){
            console.log("righteye")
           rooms[roomIdx].parts.righteye.id = '';
          }else if(socket.id == rooms[roomIdx].parts.mouth.id){
            console.log("mouth")
           rooms[roomIdx].parts.mouth.id = '';
          }else if(socket.id == rooms[roomIdx].parts.forehead.id){
            console.log("forehead")
           rooms[roomIdx].parts.forehead.id = '';
          }else if(socket.id == rooms[roomIdx].parts.nose.id){
            console.log("nose")
           rooms[roomIdx].parts.nose.id = '';
          }
        
        let memberIdx = rooms[roomIdx].members.findIndex(elm => elm==socket.id);
        rooms[roomIdx].members.splice(memberIdx, 1);
        

        if(rooms[roomIdx].members.length == 0 && roomIdx == rooms.length-1){
            rooms.splice(roomIdx, 1);
        }else if(rooms[roomIdx].members.length != 0){
            // let other in this room know 
            socket.to('room-'+clientObject.roomIdx).emit("personLeft", socket.id)
        }
        connected.splice(idx, 1);


        console.log("connected", connected)
        // console.log("rooms", rooms);
        console.log(util.inspect(rooms, false, null, true /* enable colors */))
    });


});


server.listen(3000, () => {
  console.log('listening on *:3000');
});


// //return random color
// function getRandomColor() {
//     var letters = '0123456789ABCDEF';
//     var color = '#';
//     for (var i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
//   }

  
