import mongoose from "mongoose";

 mongoose.connect("mongodb+srv://engineerabuzarahmed:vanshu34@points.0cf2z7t.mongodb.net/"
)
const db=mongoose.connection

db.once('open',()=>{
    console.log("Db is connected")
})

export default db;