const {StatusCodes}=require("http-status-codes")
const {BookingService}=require("../services/index")

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

module.exports={
    create
}