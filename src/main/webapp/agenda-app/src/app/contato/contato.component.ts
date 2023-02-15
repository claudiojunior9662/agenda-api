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
    email: ['', [Validators.required, Validators.email]],
    // favorito: [false]
  });

  contatos: Contato[] = [];

  constructor(protected service: ContatoService, private fb: FormBuilder) { }

  ngOnInit(): void {
    // todo
  }

  submit() {
    const c = new Contato(this.formulario.value.nome!, this.formulario.value.email!);
    this.service.save(c).subscribe(res => {
      this.contatos.push(res);
      console.log(this.contatos);
    });
  }

}
