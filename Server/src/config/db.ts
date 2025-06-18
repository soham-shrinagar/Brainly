import mongoose from "mongoose";

const dbConnect = () =>{
    mongoose.connect(`${process.env.DBurl}Brainly`).then(() => {
        console.log("DataBase Connected Sucessfully")
    }).catch((err) =>{
        console.log(`error occured: ${err}`)
    })
}

export default dbConnect;