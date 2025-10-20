import express from 'express'
import  studentsController  from '../controller/students.controller.js'
import authentication from '../middlewares/authentication.js'

const studentRouter=express.Router()

studentRouter.post('/',authentication,studentsController.show)
studentRouter.get('/loggedin',authentication,(req,res)=>res.json({isvalid:true}))
studentRouter.delete('/:email',studentsController.delete)
studentRouter.post('/insert',studentsController.insert)
studentRouter.post('/login',studentsController.login)
studentRouter.post('/logout',studentsController.logout)


export default studentRouter