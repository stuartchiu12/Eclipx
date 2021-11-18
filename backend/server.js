require('dotenv').config()

const express = require('express')
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');
const firebase = require('@firebase/app')
const admin = require("firebase-admin");
const { getAuth, signInWithEmailAndPassword } = require('@firebase/auth')
const serviceAccount = require(process.env.SERVICE_ACCOUNT)
const PORT = process.env.PORT;

firebase.initializeApp({
    apiKey:process.env.APIKEY
})
admin.initializeApp({credential: admin.credential.cert(serviceAccount)});

app.use(cors());
app.use(bodyParser.json());

app.post('/login', (req,res)=>{
    const auth = getAuth();
    signInWithEmailAndPassword(auth, req.body.email, req.body.password)
        .then((userCredential) => {
            const user = userCredential.user;
            res.send({jwt: user.accessToken})
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            res.sendStatus(400);
        });

});

const verifyToken = async (req,res)=>{
    const jwt = req.headers.jwt;

    //check if jwt is valid
    const {email}  = await admin.auth().verifyIdToken(jwt)
    //get the role from firestore
    const emailProp = await admin.firestore().collection('users').where('email','==',email).get();
    const {admin:adminValue, readonly} = emailProp.docs[0].data();
    if(adminValue){
        res.sendStatus(200);
        return;
    }else if(readonly){
        res.sendStatus(401);
        return;
    }
    res.sendStatus(400);
}

app.get('/api/admin_only', verifyToken);


app.listen(PORT,()=>{
    console.log('listening to port '+PORT)
})