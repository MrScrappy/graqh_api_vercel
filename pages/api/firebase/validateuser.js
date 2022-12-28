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
    const tokenss = [
        "MusicasaMsk0n3",
        "Musicasa0OLD3N",
        "Musicasa3VNBnmd",
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
        res.status(200).json({
            data: users
        });
        


    } else {
        res.status(403).json({
            message: "Sorry You don't have access"
        });
      
  }
  
}