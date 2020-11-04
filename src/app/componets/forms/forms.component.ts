import { Component, OnInit } from '@angular/core';
import { CarsService } from '../../services/cars.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.sass'],
})
export class FormsComponent implements OnInit {
  forma: FormGroup;
  cars: any = {};
  modelos: any = [];
  anos: number[] = [2020, 2010, 2009, 2008, 2007];

  constructor(
    private carsrouter: ActivatedRoute,
    private _carservice: CarsService,
    private fb: FormBuilder
  ) {
    this.cars = this._carservice.getCars();
    this.crearFormulario();
    console.table(this.cars.marcas);
  }

  ngOnInit(): void {
    this.valueChanges();
  }

  filtroModelo(id: number): void {
    this.modelos = this.cars.marcas.filter((value) => value.id === id)[0];
  }

  valueChanges(): void {
    this.forma.get('marca').valueChanges.subscribe((value) => {
      if (value.length) {
        this.filtroModelo(Number(value));
      }
    });
  }

  get marcaNovalido() {
    return this.forma.get('marca').invalid && this.forma.get('marca').touched;
  }
  get autoNovalido() {
    return this.forma.get('auto').invalid && this.forma.get('auto').touched;
  }
  get añoNovalido() {
    return this.forma.get('año').invalid && this.forma.get('año').touched;
  }

  get emailNovalido() {
    return this.forma.get('correo').invalid && this.forma.get('correo').touched;
  }

  crearFormulario() {
    this.forma = this.fb.group({
      marca: ['', [Validators.required]],
      auto: ['', [Validators.required]],
      año: ['', [Validators.required]],
      correo: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
    });
  }

  guardar() {
    Object.values(this.forma.controls).forEach((control) => {
      control.markAsTouched();
    });
    if (this.forma.valid) {
      console.log(this.forma.value);
      console.log(this.forma);
    }
  }
}
