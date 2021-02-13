import appointment from '../models/Appointment';
import { EntityRepository, Repository} from 'typeorm';

@EntityRepository(appointment)
class AppointmentRepository extends Repository<appointment>{

    public async findByDate(date: Date): Promise<appointment | null> {
        const findAppointment = await this.findOne({
            where:{ date },
        });
  

     
          return findAppointment || null;

    
       }

}

export default AppointmentRepository;