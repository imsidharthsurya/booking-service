const express=require("express")
const apiRoutes=require("./routes/index")

const {PORT}=require("./config/serverConfig")
const db=require("./models/index")
const app=express();

const prepareAndStartServer=()=>{

    app.use(express.json())

    app.use("/api",apiRoutes)
    app.listen(PORT,()=>{
        if(process.env.DB_SYNC==true){
            db.sequelize.sync({alter:true})
        }
        console.log(`server is running on PORT ${PORT}`);
    })
}

prepareAndStartServer();