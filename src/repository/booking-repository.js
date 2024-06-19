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

    async update(bookingId,data){
        try{
            //rather that using update use different method
            //b/c update won't return latest booking object it just return boolean
            const booking=await Booking.findByPk(bookingId);
            if(data.status){
                booking.status=data.status
            }
            await booking.save();
            return booking;
            //this will return latest booking object
        }catch(err){
            throw new AppError('RepositoryError','Can not update booking','can not update booking at the time, try again later',StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}

module.exports=BookingRepository