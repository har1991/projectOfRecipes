import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Measures } from './measuresDto/measures';
import { MeasuresDto } from './measuresDto/measuresDto';

@Component({
  selector: 'app-measures',
  templateUrl: './measures.component.html',
  styleUrls: ['./measures.component.css']
})
export class MeasuresComponent implements OnInit {

  constructor(private http : HttpClient) { }

  ngOnInit(): void {
  }
  get_measures() :Observable<Measures[]>  {
    return this.http.get(`http://localhost:9999/measures`).pipe(
      map((Measures_dto :MeasuresDto[])=>{
        return Measures_dto.map((measure_dto : MeasuresDto)=>Measures.fromDb(measure_dto))
      })
      )
  }

}
