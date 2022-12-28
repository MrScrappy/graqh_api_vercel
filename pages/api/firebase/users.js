// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { collection, getDocs } from "firebase/firestore";
import {db} from "../../../lib/firebase"
import fetch from 'node-fetch';
import Cors from 'cors'

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

export default async function handler(req, res) {
 await runMiddleware(req, res, cors)
    const tokenss = [
        "tokenDUMMY1",
        "tokenDUMMY2",
        "tokenDUMMY3",
    ]

    if (req.method == 'POST') {
  
        const { pass } = req.body;
    
        const access = tokenss.find(user => user === pass);

        if (access === undefined || access === null) {
        res.status(403).json({
            message: "Sorry You don't have access"
        });
        }
        
        const querySnapshot = await getDocs(collection(db, "users"));
        const users = querySnapshot.docs.map(doc => doc.data());
        const userss = users.map(user =>{
            return {
                id: user.uid,
                data : user
            }
        });
        res.status(200).json({
            data: userss
        });
        


    } else {
        //peticion fetch post para el endpoint
        res.status(403).json({
            message: "Sorry You don't have access"
        });
      
  }
  
}