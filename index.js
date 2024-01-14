const express = require("express")
const serveIndex = require("serve-index")
const app = express()
app.use(express.json())
const cors = require("cors")
require('dotenv').config()
const fs = require("fs");
const https = require('https');
const privateKey = fs.readFileSync('ssl/private-key.pem', 'utf8')
const certificate = fs.readFileSync('ssl/certificate.pem', 'utf8')
const credentials = { key: privateKey, cert: certificate }
const server = https.createServer(credentials, (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, HTTPS World!\n');
  });
  //connect esp8266 to deployed node js server heroku apps:info --json -a your-app-name
//Replace your-app-name with the actual name of your Heroku app. Look for the web_url property in the output. This URL corresponds to your application's public endpoint, and its IP address is what external users see.
  const PORT = 443; // Default HTTPS port
  
  server.listen(PORT, () => {
    console.log(`Server running at https://localhost:${PORT}/`);
  });
//
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
app.get('/',(req,res) => {
    res.status(200).send("jjj")
})
app.get('/file.txt',(req,res) => {
    res.status(200).sendFile(__dirname + "/file.txt",err => console.log("rayan"))
})
app.get('/led',(req,res) => {
   res.status(200).sendFile(__dirname + "/file.txt",err => console.log("rayan"))
    res.end("rayan")
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
console.log(process.env.PORT);
app.listen(process.env.PORT ||5000,() => {
    console.log("Lestening at port 5000");
})