import appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import { getRepository, Repository} from 'typeorm';
import IAppointmentsRepository from '@modules/appointments/repositories/IApointmentsRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/ddto/ICreateAppointmentDTO';






class AppointmentRepository implements IAppointmentsRepository{

    private ormRepository: Repository<appointment>;

    constructor(){
        this.ormRepository = getRepository(Appointment);
    }



    public async findByDate(date: Date): Promise<appointment | undefined> {
        const findAppointment = await this.ormRepository.findOne({
            where:{ date },
        });
  

     
          return findAppointment;

    
       } 
       public async create({provider_id, date}: ICreateAppointmentDTO):
       Promise<Appointment> {

            const appointment = this.ormRepository.create({ provider_id, date});
            await this.ormRepository.save(appointment);

            return appointment;
       }


}

export default AppointmentRepository;