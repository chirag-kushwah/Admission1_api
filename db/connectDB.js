const mongoose = require("mongoose");
//const Live_URL = "mongodb+srv://chiragkushwah06:ram123@cluster0.ytcxkya.mongodb.net/admissionPortal?retryWrites=true&w=majority&appName=Cluster0"

const connectDB = () => {
    return mongoose.connect(process.env.LOCAL_URL)
        .then(() => {
            console.log("Connect Successfully")
        }).catch((error) => {
            console.log(error)
        })
}
module.exports = connectDB