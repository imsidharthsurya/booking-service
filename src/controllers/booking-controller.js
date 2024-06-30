const {StatusCodes}=require("http-status-codes")
const {BookingService}=require("../services/index")

const {createChannel,publishMessage}=require("../utils/messageQueue")
const {REMINDER_BINDING_KEY}=require("../config/serverConfig")
const bookingService=new BookingService();

const create=async(req,res)=>{
    try{
        const response=await bookingService.create(req.body);
        return res.status(StatusCodes.OK).json({
            message:"successfully completed booking",
            success:true,
            err:{},
            data:response
        })
    }catch(err){
        //b/c service layer returns serviceError object
        return res.status(err.statusCode).json({
            message:err.message,
            success:false,
            err:err.explanation,
            data:{}
        })
    }
}

const sendMessageToQueue=async(req,res)=>{
    try{
        const channel=await createChannel();
        const data={message:"first message to the queue"}
        await publishMessage(channel,REMINDER_BINDING_KEY,JSON.stringify(data));
        return res.status(200).json({
            message:"successfully published the message"
        })
    }catch(err){
        return res.status(500).json({
            message:err.message,
            success:false,
            err:err.explanation,
            data:{}
        })
    }
}

module.exports={
    create,
    sendMessageToQueue
}