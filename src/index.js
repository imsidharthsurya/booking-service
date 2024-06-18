const express=require("express")

const {PORT}=require("./config/serverConfig")
const app=express();

const prepareAndStartServer=()=>{

    app.use(express.json())
    app.listen(PORT,()=>{
        console.log(`server is running on PORT ${PORT}`);
    })
}

prepareAndStartServer();