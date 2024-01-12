const express = require("express")
const serveIndex = require("serve-index")
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");
const bodyParser = require('body-parser')


const app = express()
app.use(express.json())
const cors = require("cors")
const fs = require("fs");
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let Data = "0"
app.use('/',express.static('../backend'))
app.use('/images',express.static('images'))
app.use(cors({
    origin:['http://localhost:3000','https://fota-app4.onrender.com'],
    credentials:true,
    optionsSuccessStatus:200,
}))
app.use(
'/ftp',
express.static('ftp'),
serveIndex('ftp',{icons :true})
)
// 




// monkey patch every served HTML so they know of changes

app.get('/',(req,res) => {
    res.status(200).send("jjj")
})
app.get('/file.txt',(req,res) => {
    res.status(200).sendFile(__dirname + "/file.txt",err => console.log("rayan"))
})
app.get('/led',(req,res) => {
    const {one} = req.body  
    res.writeHead(200,{'Content-Type' : 'text/plain'})
    //res.status(200).sendFile(__dirname + "/file.txt",err => console.log("rayan"))
    res.end("rayan")
    // response.writeHead(200,{'Content-Type':'text/plain'})
})
app.post('/led',async(req,res) => {
    const {one} = req.body
    Data = one
    fs.writeFile('file.txt',one,(err) => {
        if(err)  throw err ;
    })
    console.log(one);
    res.status(200).send("rayan")
})
app.listen(5000,() => {
    console.log("Lestening at port 5000");
})