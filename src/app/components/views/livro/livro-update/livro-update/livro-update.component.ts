import { Component, Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { LivroService } from '../../livro.service';
import { Livro } from '../../livro.model';

@Component({
  selector: 'app-livro-update',
  templateUrl: './livro-update.component.html',
  styleUrls: ['./livro-update.component.css']
})


export class LivroUpdateComponent {
  id_cat : string =''
  livro: Livro = {
    id: '',
    titulo: '',
    nome_autor: '',
    texto:''

  }

  titulo = new FormControl('',[Validators.minLength(3)])
  nome_autor = new FormControl('',[Validators.minLength(3)])
  texto = new FormControl('',[Validators.minLength(10)])

  constructor(
    private service: LivroService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!
    this.livro.id = this.route.snapshot.paramMap.get('id')!
    this.findById();
  }

  findById(): void {
    this.service.findById(this.livro.id!).subscribe((resposta) => {
      this.livro = resposta
    })
  }

  update(): void{
    this.service.update(this.livro).subscribe((resposta)=>{
      this.router.navigate([`categorias/${this.id_cat}/livros`])
      this.service.mensagem('Livro atualizado com sucesso!')
    }, err => {
      this.router.navigate([`categorias/${this.id_cat}/livros`])
      this.service.mensagem('Falha ao atualizar livro! Tente mais tarde..')
    })
  }
  

  cancel(): void{
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
  }

  getMessage(){
    if(this.titulo.invalid){
      return 'O campo TITULO deve ter entre 3 e 100 caracteres';
    }

    if(this.nome_autor.invalid){
      return 'O campo NOME DO AUTOR deve conter entre 3 e 100 caracteres';
    }

    if(this.texto.invalid){
      return 'O campo TEXTO deve conter entre 10 e 2.000.000 caracteres';
    }  
    return false;
  
  }
}
