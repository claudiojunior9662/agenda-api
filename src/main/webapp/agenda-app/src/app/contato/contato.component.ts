import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ContatoService } from '../contato.service';
import { Contato } from './contato';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  formulario = this.fb.group({
    nome: ['', Validators.required],
    email: ['', Validators.email],
    // favorito: [false]
  });

  constructor(protected service: ContatoService, private fb: FormBuilder) { }

  ngOnInit(): void {
    // todo
  }

  submit() {
    console.log(this.formulario.value);
    // this.service.save(c).subscribe(res => {
    //   console.log(res);
    // });
  }

}
