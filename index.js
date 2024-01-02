const express = require("express")
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");


const app = express()
app.use(express.json())
const cors = require("cors")
const fs = require("fs")

let Data = "0"
app.use('/',express.static('../backend'))
app.use('/images',express.static('images'))
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true,
    optionsSuccessStatus:200,
}))

// 

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(__dirname + '\file.txt');
app.use(connectLivereload());
// 
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});


// monkey patch every served HTML so they know of changes

app.get('/',(req,res) => {
    res.status(200).send("jjj")
})
app.get('/led',async(req,res) => {
    const {one} = req.body
    const data = await fs.readFileSync('./file.txt','utf8')
    res.status(200).send(`${data} ttttttjjl;;`)
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