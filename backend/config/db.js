
const mongoose=require('mongoose');
    
    const connectDatabase= async () => {
        try{
   await mongoose.connect(process.env.MONGODB_URI)
    
    console.log('database connected');
    // to show what host we are using. rn its local host
    // console.log(`Connected to db ${connection.connection.host}`);
    }
catch(error){
    console.log(error);
}
}
module.exports= connectDatabase;