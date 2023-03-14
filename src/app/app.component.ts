import { Component } from '@angular/core';
import { Consejo } from './consejo';
import { Entrada } from './entrada';
import { NsService } from './ns.service';
import { Perfil } from './perfil';
import { Tratamiento } from './tratamiento';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Gluco-Consejo';

  registros: Entrada[] = [];
  tendencia: string='';
  perfil?: Perfil;

  dia:number=0; //Duración insulina activa
  fsi:number=0; //Factor de sensibilidad de insulina, mg/dl de bajada por dosis
  ric:number=0; //Gramos de hidratos por cada dosis
  fsh:number=0; //Factor de sensibilidad de carbohidratos, cuanto sube la glucosa por cada 10b de carbohidratos
  min:number=0; //Valor minimo de glucosa en sangre
  max:number=0; //Valor máximo de glucosa en sangre
  bet:number=0; //Valor ideal de glucosa en sangre
  hidratos:number=0;
  consejo:Consejo= new Consejo;
  tratamiento:Tratamiento=new Tratamiento();
  ultimoTrata:Tratamiento=new Tratamiento();

  type = 'line';
  options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
        yAxes : [{
            ticks : {
                max : 300,
                min : 40
            }
        }]
    }
  };

  aux:[string[],number[]]=[[],[]];
  data:any;
  barchart:any;

  constructor(private nsServicio:NsService){}






  //
  ngOnInit(): void {

    this.nsServicio.getNumberEntry(24).subscribe(e =>this.registros=e);
    this.nsServicio.getTreatments().subscribe(a =>this.ultimoTrata=a[0]);
    this.nsServicio.getData().subscribe(p => this.perfil =p[0]);



  }

  getconsejo(gluc: number):void{
    var someDate = new Date(this.ultimoTrata.created_at);
    if (this.registros[0].date < someDate.getTime()+5400000){
      gluc=this.bet;

    }
    var glu=gluc+(this.hidratos*this.fsh)
    if (glu <this.min){
      this.consejo.dosis=Math.round((this.min - glu)*10/this.fsh);
      this.consejo.tipo="Hidratos Rapidos";
    }else if (glu < this.min+10) {
      this.consejo.dosis=(Math.round(this.bet-glu)*10/this.fsh);
      this.consejo.tipo="Hidratos Lentos";
    }else if (glu > this.max-50) {
      this.consejo.dosis=Math.round((glu-this.bet)/this.fsi);
      this.consejo.tipo="dosis de insulina";
    }else{
      this.consejo.dosis=0;
      this.consejo.tipo="Sin tratamiento";
    }

  }
  gettendencia(tendencia: string){
    switch (this.registros[0].direction) {
      case "Flat":
        this.tendencia="→";
        break;
      case "FortyFiveUp":
        this.tendencia="↗︎";
        break;
      case "FortyFiveDown":
        this.tendencia="↘︎";
        break;
      case "SingleDown":
        this.tendencia="↓";
        break;
      case "SingleUp":
        this.tendencia="↑";
        break;
      case "DoubleDown":
        this.tendencia="↓↓";
        break;
      case "DoubleUp":
        this.tendencia="↑↑";
        break;
      default:
        this.tendencia='';
        break;
    }
    return this.tendencia;

  }

  getvals(){
    var Default:any=this.perfil?.store?.Default;
    this.max=Default?.target_high[0].value;
    this.min=Default?.target_low[0].value;
    this.dia=Default?.dia*60;
    this.fsi=Default?.sens[0].value;
    this.ric=Default?.carbratio[0].value;
    this.fsh=29/4;
    this.bet=this.min+30;
    this.max=Default?.target_high[0].value;
    this.max=Default?.target_high[0].value;
    this.max=Default?.target_high[0].value;
  }

  enviarTratamiento(fecha: string){
    this.tratamiento.insulin=this.consejo.dosis;
    this.tratamiento.carbs=this.hidratos;

    var answer = window.confirm(`¿Desea enviar los datos? \n insulina: `+this.consejo.dosis+` | hidratos: `+this.hidratos);
    if (answer) {

        this.nsServicio.postTreatments(this.tratamiento).subscribe();
        alert('Registro añadido');
    }
    else {
        alert('Registro NO Añadido');
    }
  }

  generarGrafico(){
    this.registros.forEach((registros,index) => {
      if (index%2==0) {
        var date=new Date(registros.dateString)
        this.aux[0][index]=date.getHours()+":"+('0'+date.getUTCMinutes()).slice(-2);
      }
      this.aux[1].push(registros.sgv);


    });


    this.data=this.aux;
    this.barchart = this.data;
    this.data = {
      labels: this.barchart[0].reverse(), //months
      datasets: [{
        label: "Glucosa",
        data: this.barchart[1].reverse(),
        backgroundColor: "#6970d5",
        }]
    };
  }


}


