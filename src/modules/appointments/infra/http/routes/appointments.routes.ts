import 'reflect-metadata';
import {Router} from 'express';
import {parseISO} from 'date-fns';
import {container} from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentsService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();    

appointmentsRouter.use(ensureAuthenticated);

/*appointmentsRouter.get('/',async(request, response) =>{
   
    const appointments = await appointmentsRepository.find();
 
    return response.json(appointments);
});*/

appointmentsRouter.post('/',async (request, response)=>{
    
    

        const { provider_id, date } = request.body;

        const parsedDate = parseISO(date);
        
       
        const CreateAppointment = container.resolve(CreateAppointmentService);

        const appointment = await CreateAppointment.execute({
            date: parsedDate,
            provider_id,
        });
            return response.json(appointment);
    
}); 

export default appointmentsRouter;