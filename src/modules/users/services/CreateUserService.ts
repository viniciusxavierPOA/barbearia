import User from "../infra/typeorm/entities/User";
import {hash} from 'bcryptjs';
import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUsersRepository';
import {injectable, inject} from 'tsyringe';

interface IRequest{
    name: string;
    email: string;
    password:string;
}
@injectable()
class CreateUserService{

    constructor(
     @inject('UsersRepository')       
     private usersRepository: IUserRepository){}


public async execute({name, email, password}): Promise<User>{
  
    
    const checkUserExists = await this.usersRepository.findByEmail(email);
    
    if(checkUserExists){
        throw new AppError('Email address already used.',400);
    }
    const hashedPassword = await hash(password, 8);
    
    const user = await this.usersRepository.create({
        name,
        email,
        password: hashedPassword,
        });

   
 
        return user;
  }

}

export default CreateUserService;