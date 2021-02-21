import Appointment from  "@modules/appointments/infra/typeorm/entities/Appointment";
import ICreateAppointmentDTO from '../ddto/ICreateAppointmentDTO';
 
export default interface IAppointmentsRepository{
    create(data: ICreateAppointmentDTO): Promise<Appointment>;


    findByDate(date: Date): Promise<Appointment | undefined>;

}