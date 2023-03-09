import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ContatoService } from '../contato.service';
import { Contato } from './contato';
import { MatDialog } from '@angular/material/dialog';
import { ContatoDetalheComponent } from '../contato-detalhe/contato-detalhe.component';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  colunas = ['foto', 'id', 'nome', 'email', 'favorito']

  totalElements = 0;
  page = 0;
  size = 10;
  pageSizeOptions: number[] = [10]

  constructor(protected service: ContatoService, private fb: FormBuilder, protected dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.listarContatos();
  }

  listarContatos(event?: PageEvent): void {
    if(event) {
      this.page = event.pageIndex;
      this.size = event.pageSize;
    }
    this.service.list(this.page, this.size).subscribe({
      next: res => {
        this.contatos = res.content ?? [];
        this.totalElements = res.totalElements ?? 0;
        this.page = res.number ?? 0;
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
      this.listarContatos();
      this.snackBar.open('Contato adicionado com sucesso', 'Sucesso', {duration: 2000});
      this.formulario.reset();
    });
  }

  uploadFoto(event: any, contato: Contato){
    const files = event.target.files;
    if(files){
      const foto = files[0];
      const formData: FormData = new FormData();
      formData.append('foto', files[0]);
      this.service.upload(contato, formData).subscribe(res => {
        this.listarContatos();
      });
    }
  }

  visualizarContato(contato: Contato): void {
    this.dialog.open(ContatoDetalheComponent, {
      width: '400px',
      height: '550px',
      data: contato
    });
  }
}
