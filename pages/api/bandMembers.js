import Cors from 'cors'
import fetch from 'node-fetch';

// Initializing the cors middleware
const cors = Cors({
  methods: ['POST', 'GET'],
  //ACEPTAR PETICIONES DE TODOS LOS DOMINIOS
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

if (req.method === 'POST') {
    
  const {
    parent_id,
    stagename,
    band_name,
    role,
    email, } = req.body;


  let data = `mutation{
    addBandMember(
        parent_id: ${parent_id},
        stagename: "${stagename}",
        band_name: "${band_name}",
        role: "${role}",
        email:  "${email}",
    ){
      id
    }
  }
`

  let tokenPWD ;
  
//crear una peticion fetch POST PARA MANDAR UN JSON queryArtist
 

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


