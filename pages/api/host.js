import React,{useState} from 'react';
import fetch from 'node-fetch';
import Cors from 'cors'

// Initializing the cors middleware
const cors = Cors({
  methods: ['POST', 'GET'],
  origin: '*',
  "Access-Control-Allow-Origin" :  "*",
  cors:"no-cors"

})


function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}



export  default async function  Delta (req,res){
  await runMiddleware(req, res, cors)

  if (req.method === 'POST') {
    const query= `
    {
      genres(first: 100 skip:0){
        id
        name
      }
    }
    `
    const query2 = `mutation{
      addHost(
        name : "name"
        bio : "delta asdasdasdasda"
        phone:"5555555555"
        ){
        id
      }
  }`
  const query3 = `
  mutation{
    addMember(
      email:"Lasnamejac2@hotmail.com  "
      password:"123456789"
      fname:"Name"
      lname:"Lasname"
      formatted_address:"delta delta Delta city Miami 00926"
      host_id: 253
      firebase_id:"123456789"
      ){
      id
    }
  }
  `

  const query4 = `
  mutation{addVenue(
    phone:"5555555555"
    formatted_address:"delta delta Delta city Miami 00926"
    host_id:253
  ){
    id
  }
  }
  `

  const query5 = `
  mutation{
    alfa:addAttributeToEvent(event_id:2,attribute_id:1){
       id
     }
   beta:addAttributeToEvent(event_id:2,attribute_id:2){
       id
     }
   gama:addAttributeToEvent(event_id:2,attribute_id:3){
       id
     }
   }
`     
let body = req.body
let body2 = JSON.parse(body)
let UsuarioActual = body2.currentUser
let UserPhoto = body2.UserPhoto // The image file
let UserName = body2.UserName // name  of the user
let UserEmail = body2.UserEmail // email
let UserUID = body2.UserUID //firebase id
let nameUser = "DELTA MUNDO" // name
let ZipCode = body2.ZipCode //zipcode
let selectState = body2.selectState // estado
let statecity = body2.statecity //adress city
let statestreet = body2.statestreet //adress line1
let statestreet2 = body2.statestreet2 //adress line2
let ratiogroup1 = body2.ratiogroup1  // Public || Private || A mix
let smook = body2.smook  //Yes || No
let doorsout = body2.doorsout // Indoor || OutDoor || combination
let radioDrinks = body2.radioDrinks // boolean Drinks
let radioSnack = body2.radioSnack // boolean Snacks
let radioBYOB = body2.radioBYOB // boolean BYOB
let radioKit = body2.radioKitq // boolean Kit
let radioPet = body2.radioPet // boolean Pets
let radioProof = body2.radioProof // boolean Proof the pets property
let radioMask = body2.radioMask // boolean Mask
let radioVaccination = body2.radioVaccination // boolean Vaccination
let radioNegative = body2.radioNegative  // boolean Negative
let ratiogroup4 = body2.ratiogroup4 //100% Guest || 100% Host || 50/50
let CalendarioState = body2.CalendarioState // 2021-10-01T21:49:01.000Z  //--hacer un split a T
let DoorsOpen = body2.DoorsOpen // 12:23:23
let ConcertStart = body2.ConcertStart // 12:23:23
let EventEnds = body2.EventEnds // 12:23:23
let ratiogroup6 = body2.ratiogroup6 // range edad
let StateDropZone = body2.StateDropZone // []
let nameDropZone = body2.nameDropZone // []
let files = body2.files // name files
let PhoneNumbreStep = body2.PhoneNumbreStep //{"phone":"+1 (231) 123-1231"}
let BIO = body2.BIO // string

const numberPhone =PhoneNumbreStep?.phone ?? "+15555555555"
const formatAdrres = `${statestreet+' '+statestreet2+' '+statecity+ ' ' + selectState + ' ' + ZipCode}`

let eventAtrributes = []

//function que dependiendo la variable se asigne o no el valor
function addAttributeToEvent(){
  if(radioMask === true){
    eventAtrributes.push(18)
  } 
  if(radioVaccination === true){
    eventAtrributes.push(25)
  }
  if(radioNegative === true){
    eventAtrributes.push(26)
  }
  if(radioDrinks === true){
    eventAtrributes.push(20)
  }
  if(radioBYOB === true){
    eventAtrributes.push(10)
  }
  if(radioSnack === true){
    eventAtrributes.push(21)
  }
  if(radioKit === true){
    eventAtrributes.push(22)
  }
  if(radioPet === true){
    eventAtrributes.push(23)
  }
  if(radioProof === true){
    eventAtrributes.push(24)
  }
  if(doorsout === 27 || 28 ||29){
    eventAtrributes.push(parseInt(doorsout,10))
  }
  if(smook === "Yes"){
    eventAtrributes.push(11)
  }
  if(ratiogroup1 === 1 || 2 ||3){
    eventAtrributes.push(parseInt(ratiogroup1,10))
  }
  if(ratiogroup6 == 24||34||40){
    eventAtrributes.push(parseInt(ratiogroup6,10))
  }
  console.log(eventAtrributes)
}

  //una function fetch que se ejecute multiples veces por un array
  async function fetchArray(array,jwt,eventid){
    let arrayFetch = []
    console.log(array)
    console.log(eventid)
    for(let i = 0; i < array.length; i++){
      let response = await fetch('https://grpahql.DOMAIN.com/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${jwt}`
        },
        body: JSON.stringify({
          query: `
          mutation{
            resultAtrib:addAttributeToEvent(event_id:${eventid},attribute_id:${array[i]}){
               id
             }
            `
        })
      })
      let data = await response.json()
      arrayFetch.push(data)
      console.log(data)
    }
  }

let tokenn ;
let arrayFetch = [] ;
let idHost;
//peticiones fetch encadenadas
console.log("-------------------")
console.log(body2.UserName)
console.log(body2.UserUID)
console.log(body2.ratiogroup1)
console.log(body2.ratiogroup4)
console.log(body2.ratiogroup6)
console.log("--------------")
const queryHost = `
mutation{
  addHost(
    name : "${body2.UserName}"
    bio : "${BIO}"
    phone:"${numberPhone}"
    ){
    id
  }
}
`

//funcion para separar una ca

//function para separar una cadena de texto en dos por el caracter " "
function splitString(string, separator) {
  return string.split(separator).filter(function(e) {
    return e != "";
  });
}
// console.log(splitString(body2.UserName, " "))
const separatorName = splitString(body2.UserName, " ")
const separatorConcertDate = splitString(body2.CalendarioState, "T")
const parsingDoorsOpent = `${separatorConcertDate[0]} ${body2.DoorsOpen}`
const parsingStartConcert = `${separatorConcertDate[0]} ${body2.ConcertStart}`
const partsingEndConcert = `${separatorConcertDate[0]} ${body2.EventEnds}`
const queryEvent = `
mutation{
  addMember(
    email:"${UserEmail}"
    password:"11111111"
    fname:"tony"
    lname:"mat"
    formatted_address:"delta delta delta City Maiami 00926"
    host_id: ${idHost}
    firebase_id: "${UserUID}"
  	){
    id
  }
}
`// una consulta al api admin para genererar mi token

  await  fetch('https://API.DOMAIN/admin/login', {
      method: 'POST',
      headers: {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
},
body: JSON.stringify({
  email: 'email@email.com',
  pwd: '12345687890DummyPassword'
})
})
.then(res => res.json())
.then(json => {
  const newJsonParse = JSON.parse(JSON.stringify(json))
  const jwt = newJsonParse.jwt;
console.log("----------------")
console.log("Token",jwt)
console.log("----------------")

// console.log(json);
  fetch('https://grpahql.DOMAIN.com/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${jwt}`
    },
    body: JSON.stringify({
      query: `${queryHost}`
    })
  })
    .then(r => r.text())
    .then(dataHost => {
      //-- dataHost
      const newDataHost = JSON.parse(dataHost)
      const idHost = newDataHost?.data.addHost.id
      console.log("----------------")
      console.log("DataHost",newDataHost)
      console.log("----------------")
      addAttributeToEvent()
      fetch('https://grpahql.DOMAIN.com/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${jwt}`
    },
    body: JSON.stringify({
      query: `
      mutation{
        addMember(
          email:"${UserEmail}"
          password:"11111111"
          fname: "${separatorName[0]}"
          lname:"${separatorName[1]}"
          formatted_address:"${formatAdrres}"
          host_id: ${idHost}
          firebase_id: "${UserUID}"
          ){
          id
        }
      }
      `
    })
  })
    .then(r => r.json())
    .then(dataMember => {
      //-- dataMember
      const newDataMember = JSON.parse(JSON.stringify(dataMember))
      const idMember = newDataMember?.data.addMember.id
      console.log("----------------")
      console.log("DataMember",dataMember)
      console.log("newDataMember",newDataMember)
      console.log("id",idMember)
      console.log("----------------")
      fetch('https://grpahql.DOMAIN.com/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${jwt}`
    },
    body: JSON.stringify({
      query: `
      mutation{
        addVenue(
        phone:"${PhoneNumbreStep}"
        formatted_address:"${formatAdrres}"
        host_id:${idHost}
      ){
        id
      }
        
      }
      `
    })
  })
    .then(r => r.json())
    .then(dataVenue => {
      //-- dataVenue
      const newDataVenue = JSON.parse(JSON.stringify(dataVenue))
      const idVenue = newDataVenue?.data.addVenue.id
      console.log("----------------")
      console.log("DataVenue",newDataVenue)
      console.log("id",idVenue)
       var  VenueResponse = idVenue;
      console.log("----------------")

      fetch('https://grpahql.DOMAIN.com/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${jwt}`
    },
    body: JSON.stringify({
      query: `
      mutation{
          addEvent(
          host_id : ${idHost}
		      venue_id : ${idVenue}
		      start_at : "${parsingStartConcert}"
          end_at : "${partsingEndConcert}"
          doors_open_at : "${parsingDoorsOpent}"
          visibility_type:${body2.ratiogroup1}
          pay_split:${body2.ratiogroup4}
          max_attendees:${body2.ratiogroup6}

        ){
          id
        }
      }
      `
    })
    }).then(r => r.json())
    .then(dataEvent => {
      //-- dataEvent
      const newDataEvent = JSON.parse(JSON.stringify(dataEvent))
      const idEvent = newDataEvent?.data.addEvent.id
      console.log("----------------")
      console.log("DataEvent",newDataEvent)
      console.log("id",idEvent)
      // console.log("----------------")
      // fetchArray(eventAtrributes,jwt,idEvent);
      for(let i = 0; i < eventAtrributes.length; i++){
        console.log("----------------??")
        console.log(eventAtrributes[i])
        console.log(idEvent)
        fetch('https://grpahql.DOMAIN.com/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${jwt}`
          },
          body: JSON.stringify({
            query: `
            mutation{
              resultatrib:addAttributeToEvent(event_id:${idEvent},attribute_id:${eventAtrributes[i]}){
                 id
               }
              }
              `
          })
        }).then(r => r.json())
        .then(data => {
          //-- data
          const newData = JSON.parse(JSON.stringify(data))
          console.log("----------------")
          console.log("Data",newData)
          console.log("----------------")
          arrayFetch.push(newData)

        }).catch(err => {
          console.log("error en los atrributes")
          console.log(err)
        })
      }
      


      
      res.status(200).json({"idHost":idHost,"idMember":idMember,"idVenue":idVenue,"idEvent":idEvent})
    })
    })
    })
    .catch(e => {
      console.log(e)
      res.status(502).send(e)
    });
    })
    .catch(e => {
      console.log(e)
      res.status(502).send(e)
    });
})
.catch(e => console.log(e));
  }else{
   
    res.status(403).send('Not access') 
   }

}
