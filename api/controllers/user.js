const bcrypt = require('bcrypt')
const jwt =require('jsonwebtoken')
const User=require('../models/User')

const registerController=(req, res ,nest)=>{
      
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if (err){

            res.json({
                 error:err

            })
           }   
         
       
    
        let user= new User({
           email: req.body.email,
           password: hash

        })

        user.save()
            .then(result=> {
                res.status(201).json({
                    message:'User Ctreated Sucessefuly',
                    user:result
                })
            })
            .catch(error =>{
                res.json({
                    error
                })
            })


    })









}
const getAllUser =(req, res , next) =>{
   
    User.find()
        .then(users =>{
           res.json({
               users
           }) 
       })
       .catch(error =>{
            res.json({
                error
            })

       })



}

const loginController =(req, res ,next)=>{
        

    let email = req.body.email
    let password =req.body.password


    User.findOne({email})
        .then(user =>{
            if(user){
                  bcrypt.compare(password,user.password,(err, result) =>{
                        if(err){
                          res.json({
                              message: 'Error Ocured'
                          })

                        }


                        if (result){

                            let token =jwt.sign({email: user.email, _id: user._id},'SECRET',
                            {expiresIn: '2h'})
                          
                            res.json({
                               message: 'Login Successful',
                               token
                           })
                        }else{
                            res.json({
                                message: 'Login Failed. Password doesn\'t Match '
                            })

                        }


                  })

            }else{
                res.json({
                    message: 'User Not Found '
                })

            }




        })

}

module.exports={
    registerController,
    getAllUser,
    loginController
}