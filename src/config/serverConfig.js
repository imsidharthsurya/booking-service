const dotenv=require("dotenv");
dotenv.config();

module.exports={
    PORT:process.env.PORT,
    FLIGHT_URL_PATH:process.env.FLIGHT_URL_PATH
}