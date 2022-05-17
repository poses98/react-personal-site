//Mongoose config
const mongoose = require('mongoose')
const app = require('./app')
const { API_VERSION, SERVER_IP, DB_PORT, SERVER_PORT } = require('./config')

// Realizamos la conexion a la bd con mongoose
mongoose.connect(`mongodb://${SERVER_IP}:${DB_PORT}/pablooses`, 
{useNewUrlParser: true, useUnifiedTopology: true}, (err, res) =>{
    if(err){
        throw err
    } else {
        console.log("Connection to database succeded\n")
        app.listen(SERVER_PORT, () => {
            console.log("############################")
            console.log("####      API REST      ####")
            console.log("############################")
            console.log(`http://${SERVER_IP}:${SERVER_PORT}/api/${API_VERSION}`)
            console.log("\nWelcome back!")
        })
    }
})
