import mongoose from "mongoose";

const StudentSchema=new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String,unique:true, required:true},
    className:{type:String,required:true},
    section:{type:String},
    rollno:{type:String,unique:true,required:true},

phone:{type:String,required:true},
status:{type:String,enum:["Active", "Inactive","Alumni"]},
gpa:{type:Number,max:10,required:true},
joined:Date,

    
})

export default  mongoose.model("Student",StudentSchema)