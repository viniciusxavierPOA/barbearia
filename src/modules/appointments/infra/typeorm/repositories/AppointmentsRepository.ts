import appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import { EntityRepository, Repository} from 'typeorm';
import IAppointmentsRepository from '@modules/appointments/repositories/iApointmentsRepository';

@EntityRepository(appointment)
class AppointmentRepository extends Repository<appointment>implements 
IAppointmentsRepository{
    public async findByDate(date: Date): Promise<appointment | undefined> {
        const findAppointment = await this.findOne({
            where:{ date },
        });
  

     
          return findAppointment;

    
       }

}

export default AppointmentRepository;