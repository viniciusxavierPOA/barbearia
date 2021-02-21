import { Router } from 'express';
import {container} from 'tsyringe';
import multer from 'multer';
import CreateUserService from '@modules/users/services/CreateUserService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';


import uploadConfig from '@config/upload';


const usersRouter = Router();

const upload = multer(uploadConfig);



usersRouter.post('/',async (request, response) => {

    
            const{ name, email, password} = request.body;

            const createUser = container.resolve(CreateUserService);

            const user = await createUser.execute({
                name,
                email,
                password,
            });
            
            delete user.password;
            return response.json(user);
        
    
    
});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), 
async (request, response)=> {
    
        const  updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user =    await updateUserAvatar.execute({
            user_id:request.user.id,
            avatarFilename:request.file.filename,
        });
            delete user.password;

        return response.json({ok: true});
   
 },
);
export default usersRouter;