// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fetch from 'node-fetch';
import Cors from 'cors'

// Initializing the cors middleware
let whitelist = ['http://localhost:3000', 'https://DOMAIN.com']

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

export default async function handler(req, res) {
 await runMiddleware(req, res, cors)
    const tokenss = [
        "token1",
        "token2",
        "token3",
    ]

    

    if (req.method == 'POST') {
  
        const { pass, ArtistId } = req.body;
    
        // buscas el balor de pass en el array
        const access = tokenss.find(user => user === pass);
        // console.log(user);

        if (access === undefined || access === null) {
        res.status(403).json({
            message: "Sorry You don't have access"
        });
        }
        if (ArtistId === null || ArtistId === undefined || ArtistId === '') {
        res.status(403).json({
            message: "Sorry You need a ArtistId"
        });
        }
       
        console.log(ArtistId);

        const queryHost = `
        query{
          artist(id: ${ArtistId}){
            id
            bio
            is_band
            band_member_count
            email
            stagename
            headline
            fname
            lname
            phone
            avatar
            since
            locality
            administrative_area_level_1
            formatted_address
            profile_background_image  
            socialLinks{
              id
              network
              url
            }
            videos{
              id
              title
              url
            }
            photos{
              id
              url
            }
            genres{
              id
              name
            }
            
          }
        }
`

console.log(queryHost);
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
        }).then(res => res.json())
        .then(json => {
        const newJsonParse = JSON.parse(JSON.stringify(json))
        const jwt = newJsonParse.jwt;
        console.log("----------------")
        console.log("Token",jwt)
        console.log("----------------")

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
            console.log("----------------")
            console.log("DataHost",newDataHost)
            console.log("----------------")
            const artistNoExist = newDataHost.data?.artist
            // console.log(newDataHost?.errors);
            if ( artistNoExist===null || artistNoExist===undefined) {
              res.status(404).json({
                message: "Not Found",
                data: newDataHost
              });
            }

            res.status(200).json({
              message: "Success",
              data: newDataHost
            });
          })
          .catch(err => {
            console.log("----------------")
            console.log("Error",err)
            console.log("----------------")
            res.status(500).json({
              message: "Error",
              data: err
            });
          })
        })
        .catch(err => {
          console.log("----------------")
          console.log("Error",err)
          console.log("----------------")
          res.status(500).json({
            message: "Error",
            data: err
          });
        })
        

    } else {
        //peticion fetch post para el endpoint
        res.status(403).json({
            message: "Sorry You don't have access"
        });
      
  }
  
}
