const mongoose =require('mongoose');
const valid =require('validator');
const Schema =mongoose.Schema;

const UserSchema = new Schema ({
        email:{
             type: String ,
             trim : true,
             validate:{

                validator:(v) => {
                    return valid.isEmail(v)
                },
             
                message :`{VALUE} is not an email`
             }
        },
        password: String
})


const User = mongoose.model('User',UserSchema)
module.exports= User



