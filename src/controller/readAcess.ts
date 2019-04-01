import {getManager} from "typeorm";
import { User } from '../entity/User'
import { Error } from '../models/Errors'

module.exports = async (req, res, next) => {

    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne({where: {id : req.body.entrevistador}});

    if(!user.read){
        return res.status(401).json(new Error().model(401,'Access Denied'));
    }



    next()
    
}