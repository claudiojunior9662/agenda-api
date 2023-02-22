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
  colunas = ['id', 'nome', 'email', 'favorito']

  constructor(protected service: ContatoService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.listarContatos();
  }

  listarContatos(): void {
    this.service.list().subscribe({
      next: res => {
        this.contatos = res;
      },
      error: err => {
        // todo appear error message
      }
    });
  }

  favoritar(contato: Contato): void {
    this.service.favorite(contato.id!).subscribe({
      next: res => {
        contato.favorito = !contato.favorito;
      },
      error: err => {
        // todo appear error message
      }
    });
  }

  submit() {
    const c = new Contato(this.formulario.value.nome!, this.formulario.value.email!);
    this.service.save(c).subscribe(res => {
      const newList: Contato[] = [... this.contatos, res];
      this.contatos = newList;
    });
  }

}
