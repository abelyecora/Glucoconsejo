export class Perfil {

    _id?: string;
    created_at?: string;
    defaultProfile?: string;
    mills?: number;
    startDate?: string;
    units?: string;
    store?:{
      Default: {
        basal: [{
          time: string;
          value: number;
          timeAsSeconds: number;
        }],
        carbratio: [
          {time: string;
          value: number;
          timeAsSeconds: number;
        }],
        carbs_hr: number;
        delay: number;
        dia: number;
        sens: [{
          time: string;
          value: number;
          timeAsSeconds: number;
        }],
        startDate: string;
        target_low: [{
          time: string;
          value: number;
          timeAsSeconds: number;
        }],
        target_high: [{
          time: string;
          value: number;
          timeAsSeconds: number;
        }],
        timezone: string;
        units: string;
      }
    };
}

