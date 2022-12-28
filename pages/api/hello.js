import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export default async function handler(req, res) {

  
  let concat  = "asdasadad" + " " + "asdasdasd"
  let data = `mutation{
    addArtist(
    bio: "ADASDASDASASD", 
    is_band: 0, 
    email: "email@email.com", 
    stagename: "asdasdsasa", 
    fname: "asdasdadasdasdasda", 
    lname: "asdasdasdasdasdasdasd",
    phone: "asdasdasdasdasd",
    avatar:"asdasdasdasdas",
    active: ${0}
    locality: ${concat},
    ){
      id
    }
  }
`

  if (req.method == 'POST') {

   
  


    res.status(200).json({ name: 'No puedes hacer GET sorry' })

  } else {
     //peticion fetch post para el endpoint
    await fetch('https://DOMAIN.com/api/artist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        data: data
      })
    })
      .then(r => r.json())
      .then(data => {
        res.statusCode = 200
        res.json(data)
      })
      .catch(err => {
        res.statusCode = 500
        res.json({ error: err.toString() })
      })



  }
}
