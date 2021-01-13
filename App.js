require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const hbs = require('express-handlebars')
const path = require('path')

const accountSid = process.env.ACCOUNT_SID
const authToken = process.env.AUTH_TOKEN
const RECIEVE_NUMBER = process.env.RECIEVE_NUMBER
const client = require('twilio')(accountSid, authToken)

const app = express()
app.use(bodyParser.urlencoded({extended: false}))
app.engine('hbs',hbs({extname: 'hbs',defaultLayout:'layouts'}))
app.set('views',path.join(__dirname,'views'))
app.set('view engine','hbs')

app.post('/send',(req,res)=> {
    const {phone,message} = req.body;
    client.messages.create({
        body: message,
        from: RECIEVE_NUMBER,
        to: phone
    }).then(message=> res.status(200).send("Message Send"))
    .catch(err => res.send(err))
})

app.get('/',(req,res) => {

    res.render('home',{title:'Send Message'})

})



const port = process.env.PORT | 8000
app.listen(port,()=>console.log(`Server is running ${port}`))