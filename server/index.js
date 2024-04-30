const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const RegisterModel = require('./models/Register')

const app = express()
app.use(cors(
    {
        origin: ["https://mern-5lhg.vercel.app"],
        methods: ["POST","GET"],
        credentials: true
    }
));
app.use(express.json())

mongoose.connect('mongodb+srv://rajputgopal321:TyASdV1OZWUbj859@deploy.hgq5wmp.mongodb.net/?retryWrites=true&w=majority&appName=deploy');


app.get("/", (req, res) => {
    res.json("Hello");
})
app.post('/register', (req, res) => {
    const {name, email, password} = req.body;
    RegisterModel.findOne({email: email})
    .then(user => {
        if(user) {
            res.json("Already have an account")
        } else {
            RegisterModel.create({name: name, email: email, password: password})
            .then(result => res.json(result))
            .catch(err => res.json(err))
        }
    }).catch(err => res.json(err))
})





app.listen(3001, () => {
    console.log("Server is Running")
})
