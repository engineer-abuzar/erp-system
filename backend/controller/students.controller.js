import StudentModel from "../models/Student.model.js";
import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
function insert(req, res) {
    const { name, email, className, section, rollno, phone, status, gpa, joined } = req.body
    const newStudent = new StudentModel({
        name: name,
        email: email,
        className: className,
        section: section,
        rollno: rollno,
        phone: phone,
        status: status,
        gpa: gpa,
        joined: joined

    })
    newStudent.save().then(() => {
        console.log("Student Inserted Success")
        res.status(200).send({ message: "success entered" })
    }, (err) => {
        console.log("Error when inserting Students ", err)

        res.status(409).send(err)
    })
}

const show = async (req, res) => {
    res.send(await StudentModel.find())
}
const deleteStudent = async (req, res) => {
    const resp = await StudentModel.deleteOne({ email: req.params.email })
    console.log(resp)
    if (resp.deletedCount > 0)
        res.status(200)
    else
        res.status(400)

}
//login controller
const login = async (req, res) => {
    const { email, password } = req.body
    const result = (await StudentModel.find({ email: email }))
    if (result.length != 0) {
        const userEmail = result[0].email
        const token = jwt.sign(userEmail, process.env.JWT_SECRET_KEY)
    res.cookie("userToken", token, {
   
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      sameSite: "none",
    }).status(200).json({ token: token, message: "Login Success" })
    }
    else {
        console.log("Login failed")
        res.status(200).json({ message: "Invalid Credentials" })
    }
}

const logout=async(req,res)=>{
   res.clearCookie("userToken");
   res.json({ message: "Cookie cleared successfully" });

}



//controller Object
const studentsController = {
    insert: insert,
    show: show,
    delete: deleteStudent,
    login: login,
    logout:logout
    
}

export default studentsController;