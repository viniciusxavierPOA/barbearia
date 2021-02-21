import User from "../infra/typeorm/entities/User";
import {compare} from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUsersRepository';
import {injectable, inject} from 'tsyringe';



interface IRequest{
    email: string,
    password: string,
}

interface IResponse {

    user: User,
    token: string,

}
@injectable()
class AuthenticateUserService{

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository){}

    public async execute({email, password}: IRequest): Promise<IResponse>{
        

        const user = await this.usersRepository.findByEmail (email);

        if (!user)
        {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        // user.password - Senha criptografada
        // password - Senha não criptografada

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched)
        {
            throw new AppError('Incorrect email/password combination.', 401);
        }
        
        const { secret, expiresIn } = authConfig.jwt;
        
        const token = sign({}, secret, { 
            subject: user.id,
            expiresIn,
        });

        return {user,
        token};
    }

}
export default AuthenticateUserService;