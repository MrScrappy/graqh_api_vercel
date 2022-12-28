import Cors from 'cors'
import fetch from 'node-fetch';

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




export  default async function  delta (req,res){
  await runMiddleware(req, res, cors)

  console.log("first log test")

  const { bio, is_band,
    email,
    stagename,
    fname,
    lname,
    phone,
    avatar,
    locality,
state,
formataddres,
band_member_count
} = req.body;

let data = '';

console.log(email, typeof(email))
console.log(fname, typeof(fname))
console.log(lname, typeof(lname))
console.log(phone, typeof(phone))
console.log(avatar, typeof(avatar))
console.log(locality, typeof(locality))
console.log(state, typeof(state))
console.log(formataddres, typeof(formataddres))
console.log(band_member_count, typeof(band_member_count))

if (req.method === 'POST') {
  console.log("second log test is post")
  if(is_band==0){
    console.log("third log test is not band")
   data = `mutation{
    addArtist(
    bio: "${bio}",
    is_band: ${is_band}, 
    email: "${email}", 
    stagename: "${stagename} ",
    fname: "${fname}", 
    lname: "${lname}",
    phone: "${phone}",
    avatar: "${avatar}",
    locality: "${locality}",
    administrative_area_level_1: "${state}",
    formatted_address: "${formataddres}",
    active: ${0}
    ){
      id
    }
  }
`
  }
  if(is_band==1){
    console.log("third log test is band")
    data = `mutation{
      addArtist(
      bio: "${bio}",
      is_band: ${is_band}, 
      email: "${email}", 
      stagename: "${stagename} ",
      band_member_count: ${band_member_count},
      fname: "${fname}", 
      lname: "${lname}",
      phone: "${phone}",
      avatar: "${avatar}",
      locality: "${locality}",
      administrative_area_level_1: "${state}",
      formatted_address: "${formataddres}",
      active: ${0},
      ){
        id
      }
    }
  `
  }
  let tokenPWD ;
   

  console.log(req.body)
  console.log("----------------------")
  console.log(data)

  await fetch('https://API.DOMAIN/admin/login',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      email: 'email@email.com',
      pwd: '12345687890DummyPassword'
    })
   }).then(res => res.json())
   .then(json => {
    tokenPWD= json.jwt
   }).catch(err => {
    console.log(err)
    res.status(500).json({error: err})
   })

   await fetch('https://grpahql.DOMAIN.com',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${tokenPWD}`
    },
    body: JSON.stringify({
      query: `${data}`
    })
   }).then(res => res.json())
    .then(json => {
      console.log(json)
      res.status(200).json(json)
    }).catch(err => {
      console.log(err)
      res.status(500).json({error: err})
    })
  // res.status(200).json({message: 'ok'})
    
} else {
  res.status(200).json({message:"Sorry not Sorry 403"})

}

}


