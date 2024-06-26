const amqplib = require('amqplib');
const {EXCHANGE_NAME,MESSAGE_BROKER_URL}=require("../config/serverConfig")

const createChannel=async()=>{
    try{
        const connection = await amqplib.connect(MESSAGE_BROKER_URL);
        const channel = await connection.createChannel();

        await channel.assertExchange(EXCHANGE_NAME,'direct',false);
        return channel;
    }catch(err){
        throw err;
    }
}

const subscribeMessage=async(channel,service,binding_key)=>{
    try{
        const applicationQueue=await channel.assertQueue('QUEUE_1');
        channel.bindQueue(applicationQueue.queue,EXCHANGE_NAME,binding_key);
    
        channel.consume(applicationQueue.queue,(msg)=>{
            console.log("received data");
            console.log(msg.content.toString());
            channel.ack(msg);
        })
    }catch(err){
        throw err;
    }
   
}

const publishMessage=async(channel,binding_key,message)=>{
    try{
        await channel.assertQueue('QUEUE_1');
        await channel.publish(EXCHANGE_NAME,binding_key,Buffer.from(message));
    }catch(err){
        throw err;
    }
}

module.exports={
    createChannel,
    subscribeMessage,
    publishMessage
}