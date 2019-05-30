const express =require('express')
const morgan =require('morgan')
const bodyParser= require('body-parser')
const cors =require('cors')

const mongoose =require ('mongoose')
mongoose.connect('mongodb://localhost/IHMProject');

const db = mongoose.connection

db.on('error',(err) =>{
      console.log(err)
})
db.once('open',()=>{
    console.log('Database Connection Established')
})

const Schema =mongoose.Schema

const userRoute=require('./api/routes/User')



const app=express();
app.use(morgan('dev'))
app.use(cors())

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const PORT =process.env.PORT || 3000

app.use('/api/users',userRoute)

app.listen(PORT,()=>{
    console.log(`Server is Running on PORT ${PORT}`)
})
