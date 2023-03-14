export class Entrada {
  _id!: string // Id del dispositivo,
  date!: number;// Fecha en formano EPOCH,
  device!:string;// dispositivo que ha creado la entrada,
  unfiltered!:number;// No se usa
  type!:string; //Tipo de entrada "svg"= glucosa
  sgv!:number; //valor de la glucosa,
  direction!:string; //tendencia de la glucosa
  noise!:number; // No se usa
  filtered!:number; // No se usa
  dateString!:string; // Fecha en formato ISO
  sysTime!:string; // Fecha en formato ISO
  utcOffset!: number; // Uso horario
}

