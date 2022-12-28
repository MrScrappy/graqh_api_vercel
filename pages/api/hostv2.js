import React,{useState} from 'react';
import { parse, format, compareAsc, fromUnixTime, addHours } from "date-fns/";
import fetch from 'node-fetch';
import Cors from 'cors'
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz'


// Initializing the cors middleware
let whitelist = ['http://localhost:3000', 'https://DOMAIN.com']

const cors = Cors({
  methods: ['POST', 'GET'],
  origin: '*',
  "Access-Control-Allow-Origin": "*",
  // cors:"no-cors"
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

  //MUTACIONES DE EJEMPLO
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
let UserName = body2.user.name // name  of the user
let UserEmail = body2.user.email // email of the user
let UserUID = body2.user.uid // uid of the user
let ZipCode = body2.user.Secction1HostInfo.zipCode // zipCode of the user
let selectState = body2.user.Secction1HostInfo.estado // estado
let stateCity = body2.user.Secction1HostInfo.city // ciudad
let stateStreet1 = body2.user.Secction1HostInfo.addressLine1 // calle 1
let statestreet2 = body2.user.Secction1HostInfo.addressLine2 // calle 1
//section 2
let TypeEventPublic = body2.user.Secction3HostInfo.persons // tipo de evento publico // public || private || a mix
let EventSmook = body2.user.Secction4HostInfo.smook // smook || yes == 11 || No == 0
let TypeEventDoor = body2.user.Secction4HostInfo.tpeEventDoor // tipo de puerta // open  == 27 || closed  == 28 || a mix == 29 
let radioDrinks = body2.user.Secction4HostInfo.radioDrinks // drinks || yes == 'on' || No == false
let radioSnack = body2.user.Secction4HostInfo.radioSnack // snack || yes == 'on' || No == false
let radioBYOB = body2.user.Secction4HostInfo.radioBYOB // BYOB || yes == 'on' || No == false
let radioKit = body2.user.Secction4HostInfo.radioKit // kit || yes == 'on' || No == false
let radioPet = body2.user.Secction4HostInfo.radioPet // pet || yes == 'on' || No == false
let radioProof = body2.user.Secction4HostInfo.radioProof // proof || yes == 'on' || No == false
let radioMask = body2.user.Secction4HostInfo.radioMask // mask || yes == 'on' || No == false
let radioVaccination = body2.user.Secction4HostInfo.radioVaccination // vaccination || yes == 'on' || No == false
let radioNegative = body2.user.Secction4HostInfo.radioNegative // negative || yes == 'on' || No == false
let TypePaid = body2.user.Secction3HostInfo.paid // paid || %100 guest == 1 || 100% host == 2 || 50&50 == 3
let CalendarioState = body2.user.Secction2HostInfo.dateConcert.seconds // parseUNIX to Date yyyy-mm-dd
// format_id is //Comment is person || 1 ==virtual || 2 == persona
// spoken_language // Comment : || string EN  
const dates = fromUnixTime(CalendarioState);
const newFroamt = format(new Date(dates), "yyyy-MM-dd");

let DoorsOpen = body2.user.Secction2HostInfo.DoorConcert
let StartConcert = body2.user.Secction2HostInfo.StartConcert
let EndConcert = body2.user.Secction2HostInfo.EndConcert
let AgeEvent = body2.user.Secction2HostInfo.AgeEvent // string transform to number => Options 24 || 34 ||40
let parseAgeEvent = parseInt(AgeEvent,10)
let PhoneNumbreStep = body2.user.Secction6HostInfo.phone // {"phone":"+1 (231) 123-1231"}
let PhoneNumbreStep2 = `${PhoneNumbreStep}`
let bio = body2.user.Secction6HostInfo.bio // {"bio":"delta asdasdasdasda"}
// generos
let genresHost = body2.user.Secction3HostInfo.genresartist // [ { id: 4, name: 'Bachata' }, { id: 7, name: 'BeatBox' } ]
const formatAdrres = `${stateStreet1+' '+statestreet2+' '+stateCity+ ' ' + selectState + ' ' + ZipCode}`

//console.log de todas las variables y su tipo de dato
console.log(body2)
console.log(UserName, typeof(UserName))
console.log(UserEmail, typeof(UserEmail))
console.log(UserUID, typeof(UserUID))
console.log(ZipCode, typeof(ZipCode))
console.log(selectState, typeof(selectState))
console.log(stateCity, typeof(stateCity))
console.log(stateStreet1, typeof(stateStreet1))
console.log(statestreet2, typeof(statestreet2))
console.log("--------------------")
console.log(TypeEventPublic, typeof(TypeEventPublic))
console.log("--------------------")
console.log(EventSmook, typeof(EventSmook))
console.log(TypeEventDoor, typeof(TypeEventDoor))
console.log(radioDrinks, typeof(radioDrinks))
console.log(radioSnack, typeof(radioSnack))
console.log(radioBYOB, typeof(radioBYOB))
console.log(radioKit, typeof(radioKit))
console.log(radioPet, typeof(radioPet))
console.log(radioProof, typeof(radioProof))
console.log(radioMask, typeof(radioMask))
console.log(radioVaccination, typeof(radioVaccination))
console.log(radioNegative, typeof(radioNegative))
console.log(TypePaid, typeof(TypePaid))
console.log(CalendarioState, typeof(CalendarioState))
console.log(newFroamt, typeof(newFroamt))
console.log(DoorsOpen, typeof(DoorsOpen))
console.log(StartConcert, typeof(StartConcert))
console.log(EndConcert, typeof(EndConcert))
console.log(AgeEvent, typeof(AgeEvent))
console.log(parseAgeEvent, typeof(parseAgeEvent))
console.log(PhoneNumbreStep, typeof(PhoneNumbreStep))
console.log(PhoneNumbreStep2, typeof(PhoneNumbreStep2))
console.log(bio, typeof(bio))
console.log(body2.user.Secction5HostInfo)
console.log(genresHost, typeof(genresHost))
console.log(formatAdrres, typeof(formatAdrres))

// --- event Atributes
let eventAtrributes = []

//function que dependiendo la variable se asigne o no el valor
function addAttributeToEvent(){
  if(radioMask == 'on' || radioMask == true){
    eventAtrributes.push(18)
  } 
  if(radioVaccination == 'on' || radioVaccination == true){
    eventAtrributes.push(25)
  }
  if(radioNegative == 'on' || radioNegative == true){
    eventAtrributes.push(26)
  }
  if(radioDrinks == 'on' || radioDrinks == true){
    eventAtrributes.push(20)
  }
  if(radioBYOB == 'on' || radioBYOB == true){
    eventAtrributes.push(10)
  }
  if(radioSnack == 'on' || radioSnack == true){
    eventAtrributes.push(21)
  }
  if(radioKit == 'on' || radioKit == true){
    eventAtrributes.push(22)
  }
  if(radioPet == 'on' || radioPet == true){
    eventAtrributes.push(23)
  }
  if(radioProof == 'on' || radioProof == true ){
    eventAtrributes.push(24)
  }
  if(TypeEventDoor == 27 || 28 ||29){
    eventAtrributes.push(parseInt(TypeEventDoor,10))
  }
  if(EventSmook == 11){
    eventAtrributes.push(11)
  }
  if(TypeEventPublic == 1 || 2 ||3){
    eventAtrributes.push(parseInt(TypeEventPublic,10))
  }
  if(AgeEvent == '24'||'34'||'40'){
    eventAtrributes.push(parseInt(AgeEvent,10))
  }
  console.log(eventAtrributes)
}

//una function fetch que se ejecute multiples veces por un array
async function fetchArray(array,jwt,eventid){
    let arrayFetch = []
    console.log(array)
    console.log(eventid)
    for(let i = 0; i < array.length; i++){
      let response = await fetch('https://grpahql.DOMAIN.com', {
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

  async function fetchArrayGenres(array,jwt,eventid){
    let arrayFetchGenres = []
    console.log(array)
    console.log(eventid)
    for(let i = 0; i < array.length; i++){
      let response = await fetch('https://grpahql.DOMAIN.com', {
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
      arrayFetchGenres.push(data)
      console.log(data)
    }
  }
// variables
let tokenn ;
let arrayFetch = [] ;
let arrayFetchGenres = [] ;
let idHost;

const queryHost = `
mutation{
  addHost(
    name: "${UserName}"
    bio: "${bio}"
    phone:"${PhoneNumbreStep2}"
    postal_code: "${ZipCode}"
    administrative_area_level_1: "${selectState}"
    formatted_address: "${formatAdrres}"
    locality: "${stateCity}"
    active:${0}
    ){
    id
  }
}
`

//function para separar una cadena de texto en dos por el caracter " "
function splitString(string, separator) {
    return string.split(separator).filter(function(e) {
      return e != "";
    });
  }


  // const formatInTimeZone = (date, fmt, tz) =>{
  
  //   return format(utcToZonedTime(date, tz), fmt, { timeZone: 'UTC' });
  //  }
//separator
  const separatorName = splitString(UserName, " ")
//   const separatorConcertDate = 1 // parse info
  const parsingDoorsOpent = `${newFroamt}T${DoorsOpen}.000Z`
  const parsingStartConcert = `${newFroamt}T${StartConcert}.000Z`
  const partsingEndConcert = `${newFroamt}T${EndConcert}.000Z`
  // const UTCparsingDoorsOpen= format(parsingDoorsOpent, 'yyyy-MM-dd HH:mm:ss', { timeZone: 'UTC' })
  // const UTCparsingStartConcert = format(parsingStartConcert, 'yyyy-MM-dd HH:mm:ss', {timeZone: 'UTC'})
  // const UTCparsingEndConcert = format(partsingEndConcert, 'yyyy-MM-dd HH:mm:ss', {timeZone: 'UTC'})
  const UTCparsingDoorsOpen = new Date(Date.UTC(parsingDoorsOpent));
  // const UTCparsingStartConcert = new Date(Date.UTC(parsingStartConcert));
  const date = new Date(parsingDoorsOpent); //! FIRST THIS
  const date2 = new Date(parsingStartConcert);
  const date3 = new Date(partsingEndConcert);  // const dateUTC = new Date(Date.UTC(d);

  // const datess = getDatePickerValue() // e.g. 2014-06-25 10:00:00 (picked in any time zone)
  // const timeZone = getTimeZoneValue() // e.g. America/Los_Angeles

const utcDateDoorsOpent = zonedTimeToUtc(date, "America/New_York") // e.g. 2014-06-25 10:00:00 (in UTC)}
const utcDateStartConcert = zonedTimeToUtc(date2, "America/New_York")
const utcDateEndConcert = zonedTimeToUtc(date3, "America/New_York")
const DateUtc1 = utcToZonedTime(utcDateDoorsOpent, "America/New_York")
const DateUtc2 = utcToZonedTime(utcDateStartConcert, "America/New_York")
const DateUtc3 = utcToZonedTime(utcDateEndConcert, "America/New_York")

// AGREGANDOLE 5 HORAS MAS MIAMI
const NEWparsingDoorsOpent = addHours(date, 5)
const NEWparsingStartConcert = addHours(date2, 5)
const NEWpartsingEndConcert = addHours(date3, 5)
 
const NEWUTCparsingDoorsOpen = format(NEWparsingDoorsOpent, 'yyyy-MM-dd HH:mm:ss', { timeZone: 'UTC' })
const NEWUTCparsingStartConcert = format(NEWparsingStartConcert, 'yyyy-MM-dd HH:mm:ss', {timeZone: 'UTC'})
const NEWUTCparsingEndConcert = format(NEWpartsingEndConcert, 'yyyy-MM-dd HH:mm:ss', {timeZone: 'UTC'})


// formatear a otro formato una fecha
const formateDates = (datalton) => {
  console.log("date into function ",datalton)
  const d = new Date(datalton);
  console.log("detla into function",d)
  const restformat = format(d, 'yyyy-MM-dd HH:mm:ss', {locale: es, timeZone: 'UTC'});
  console.log("restformat into function",restformat)
  return restformat
}

const formateDates2 = (datalton) => {
  // console.log("date into function ",datalton)
  const current_datetimeold = new Date(datalton);
  const current_datetime = addHours(current_datetimeold, 6)

  let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();
  return formatted_date;
}

// console.log("____________________________")
//   console.log("horario transformado en fecha",date)
//   console.log("horario parseado de America Miami",utcDateDoorsOpent)
//   console.log("horario transformado de UTC a fecha en America Miami",DateUtc1)
//   console.log("horario transformado en fecha por DATE FNS UTC",NEWparsingDoorsOpent)
//   console.log("horario transformado en fecha por DATE FNS UTC para base",NEWUTCparsingDoorsOpen)
//   console.log("funcion de prueba", formateDates2(NEWparsingDoorsOpent))
//   console.log("____________________________")
//   console.log("horario transformado en fecha",date2)
//   console.log("horario parseado de America Miami",utcDateStartConcert)
//   console.log("horario transformado de UTC a fecha en America Miami",DateUtc2)
//   console.log("horario transformado en fecha por DATE FNS UTC",NEWparsingStartConcert)
//   console.log("horario transformado en fecha por DATE FNS UTC para base",NEWUTCparsingStartConcert)
//   console.log("funcion de prueba", formateDates2(NEWparsingStartConcert))
//   console.log("____________________________")
//   console.log("horario transformado en fecha",date3)
//   console.log("horario parseado de America Miami",utcDateEndConcert)
//   console.log("horario transformado de UTC a fecha en America Miami",DateUtc3)
//   console.log("horario transformado en fecha por DATE FNS UTC",NEWpartsingEndConcert)
//   console.log("horario transformado en fecha por DATE FNS UTC para base",NEWUTCparsingEndConcert)
//   console.log("funcion de prueba", formateDates2(NEWpartsingEndConcert))

  const NEWUTCparsingDoorsOpen2 = formateDates2(NEWparsingDoorsOpent)
  const NEWUTCparsingStartConcert2 = formateDates2(NEWparsingStartConcert)
  const NEWUTCparsingEndConcert2 = formateDates2(NEWpartsingEndConcert)
  

  const queryEvent = `
  mutation{
    addMember(
      email:"${UserEmail}"
      password:"11111111"
      fname:"tony"
      lname:"mat"
      active:${0}
      formatted_address:"delta delta delta City Maiami 00926"
      host_id: ${idHost}
      firebase_id: "${UserUID}"
        ){
      id
    }
  }
  ` 
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
fetch('https://grpahql.DOMAIN.com', {
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
    fetch('https://grpahql.DOMAIN.com', {
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
        host_id: ${idHost}
        firebase_id: "${UserUID}"
        postal_code: "${ZipCode}"
        country: "${selectState}" 
        formatted_address: "${formatAdrres}"
        active:${0}
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
    fetch('https://grpahql.DOMAIN.com', {
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
      phone:"${PhoneNumbreStep2}"
      formatted_address:"${formatAdrres}"
      host_id:${idHost}
      addr1: "${stateStreet1}"
    addr2: "${statestreet2}"
    city: "${stateCity}",
    email: "${UserEmail}",
    postal_code: "${ZipCode}",
    country: "${selectState}",
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

    fetch('https://grpahql.DOMAIN.com', {
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
        doors_open_at : "${NEWUTCparsingDoorsOpen2}"
        start_at : "${NEWUTCparsingStartConcert2}"
        end_at : "${NEWUTCparsingEndConcert2}"
        format_id: ${2}
        spoken_language: "EN"
        visibility_type:${TypeEventPublic}
        pay_split:${TypePaid}
        max_attendees:${parseAgeEvent}
        active:${0}

      ){
        id
      }
    }
    `
  })
  }).then(r => r.json())
  .then(dataEvent => {
    //-- dataEvent
    // extraer addEvent de dataEvent
    const newDataEvent = JSON.parse(JSON.stringify(dataEvent))
    console.log(newDataEvent)
    const idEvent = newDataEvent?.data.addEvent.id
    // const idEvent = 1
    console.log("----------------")
    console.log("DataEvent",newDataEvent)
    console.log("id",idEvent)
    // console.log("----------------")
    // fetchArray(eventAtrributes,jwt,idEvent);
    // Esta misma funcion para los generos
    for(let i = 0; i < eventAtrributes.length; i++){
      console.log("----------------??")
      console.log(eventAtrributes[i])
      console.log(idEvent)
      fetch('https://grpahql.DOMAIN.com', {
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
        // res.status(200).json({
        //   message: "Evento creado",
        //   data: newData
        // })
      }).catch(err => {
        console.log("error en los atrributes")
        console.log(err)
      })
    }
    

    const leta = [
      { id: 3, name: 'Alternative' },
      { name: 'Balada-Pop', id: 6 },
      { id: 9, name: 'Bohemia Experimental' }
    ]

    for(let i = 0; i < genresHost.length; i++){
      console.log("----------------??")
      console.log(genresHost[i])
      console.log(idEvent)
      fetch('https://grpahql.DOMAIN.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${jwt}`
        },
        body: JSON.stringify({
          query: `
          mutation {
            addGenreEvent(event_id: ${idEvent}, genre_id: ${genresHost[i].id}) {
              id
              genre_id
              event_id
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
        // res.status(200).json({
        //   message: "Evento creado",
        //   data: newData
        // })
      }).catch(err => {
        console.log("error en los generos")
        console.log(err)
      })
    }
//response
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
}).catch(err => {
    console.log(err)
    res.status(502).send(err)
    }); 
  }else{
   
    res.status(403).send('Not access') 
   }
}
