const {BookingRepository}=require("../repository/index")
const {ServiceError}=require("../utils/errors/index")
const {FLIGHT_URL_PATH}=require("../config/serverConfig")
const axios=require("axios")

class BookingService{
    constructor(){
        this.bookingRepository=new BookingRepository();
    }

    async create(data){
        try{
            const flightId=data.flightId;
            const FLIGHT_URL=`${FLIGHT_URL_PATH}/api/v1/flight/${flightId}`;
            const response=await axios.get(FLIGHT_URL);
            // console.log("response is: ",response.data)
            const flightData=response.data.data
            // console.log("flight data is: ",flightData)
            const priceOfTheFlight=flightData.price;
            //if booking seat greater than flight total seat
            //then throw service erro
            if(data.noOfSeats>flightData.totalSeats){
                throw new ServiceError("something went wrong in booking process",'Insufficient seats in flight');
                //in service error only passing message and explanation
                //so name & status code will be default one
            }
            const totalCost=data.noOfSeats * priceOfTheFlight;
            //add totalCost in our req.body payload
            const bookingPayload={...data,totalCost};
            const booking=await this.bookingRepository.create(bookingPayload);
            //update the flight with new no. of totalSeats after booking success
            const result=await axios.patch(FLIGHT_URL,{totalSeats:flightData.totalSeats-data.noOfSeats})
            // return response.data.data;
            const finalBooking=await this.bookingRepository.update(booking.id,{status:"Booked"})
            return finalBooking;
        }catch(err){
            console.log("error in booking ",err)
            throw new ServiceError();
        }
    }
}

module.exports=BookingService