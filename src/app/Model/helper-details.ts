import { Personal } from './personal';
import { Vehicle } from './vehicle';

export class HelperDetails {
    helperType: string;
    personalDetail: Personal;
    vehicleDetail: Vehicle;
    items: string[]=[];
}
