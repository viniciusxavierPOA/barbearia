import { startOfHour } from 'date-fns';

import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';

import IAppointmentsRepository from '../repositories/IApointmentsRepository';

import { injectable, inject} from 'tsyringe';

interface IRequest {

    provider_id: string;
    date: Date;
}

class CreateAppointmentService{

    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,){}


    public async execute({ date, provider_id}: IRequest): Promise<Appointment>{
       

        const appointmentDate = startOfHour(date);
        
        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
            appointmentDate,
        ); 

        if (findAppointmentInSameDate){
            throw new AppError('this appointment is already booked',400);
        }
        const appointment = await this.appointmentsRepository.create({
            provider_id,
            date: appointmentDate,
        });

        
        return appointment;
    }
    

}
export default CreateAppointmentService;