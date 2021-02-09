import {request, response, Router} from 'express';
import {parseISO} from 'date-fns';
import {getCustomRepository} from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentsService';
import AppointmentRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/',async(request, response) =>{
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();

    return response.json(appointments);
});

appointmentsRouter.post('/',async (request, response)=>{
    try{
        
        const { provider, date } = request.body;

        const parsedDate = parseISO(date);
        
       
        const CreateAppointment = new CreateAppointmentService();

        const appointment = await CreateAppointment.execute({
            date: parsedDate,
            provider,
        });
            return response.json(appointment);
    }catch(err){
        return response.status(400).json({ error: err.message});
    }
});

export default appointmentsRouter;