import User from '../models/User'
import bcrypt from 'bcrypt'

class UserController{
    async store(req, res){
        try{
            const { email, password } = req.body;

            //Validate input
            if(!(email && password)){
                res.status(400).send('All input is required');
                return;
            }

            //Check if user already exist
            const oldUser = await User.findOne({email});

            if(oldUser){
                res.status(409).send('User already exist. Please Login');
                return;
            }

            //encrypt user password
            const encryptedPassword = await bcrypt.hash(password, 8);

            //create user in database
            const user = await User.create({
                email: email.toLowerCase(),
                password: encryptedPassword,
            })
            return res.status(201).json({message: 'Person successfully created'})
        }catch(error){
            console.log(error);
            return;
        }
    }
    async index(req, res){
        try{
            const user = await User.find();
            return res.json(user);
        }catch(error){
            console.log(error);
        }

    }
    async show(req, res){
        try{
            const user = await User.findById(req.params.id);
            return res.json(user);
        }catch(error){
            return res.json(null)
        }
    }

    async update(req, res){
        try{
            if(!req.params.id){
                return res.status(400).json({
                    message: 'Missing id'
                })
            }

            const user = await User.findById(req.params.id);

            if(!user){
                return res.status(400).json({
                    message: 'User not found'
                })
            }

            if(req.body.password){
                req.body.password = await bcrypt.hash(req.body.password, 8);
            }


            const newUser = await User.updateOne({_id: req.params.id}, req.body)
            return res.json(newUser);
        }catch(error){
            console.log(error)
        }
    }

    async delete(req, res){
        try{

        }catch(error){
            
        }
    }
}

export default new UserController(); 

/*
index -> list all users -> GET
store/create -> create new users -> POST
delete -> delete user -> DELETE
show -> show user -> GET
update -> update user -> PATCH or PUT
*/