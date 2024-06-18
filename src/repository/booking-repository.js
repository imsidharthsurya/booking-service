const {Booking}=require("../models/index")
const {StatusCodes}=require("http-status-codes")
const {AppError,ValidationError}=require("../utils/errors/index")

class BookingRepository{
    async create(data){
        try{
            const booking= await Booking.create(data);
            return booking;
        }catch(err){
            if(err.name=="SequelizeValidationError"){
                throw new ValidationError(err);
            }
            throw new AppError('RepositoryError','Can not create booking','can not create booking at the time, try again later',StatusCodes.INTERNAL_SERVER_ERROR);

        }
    }
}

module.exports=BookingRepository