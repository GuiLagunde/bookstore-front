import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LivroService } from '../livro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css']
})
export class LivroCreateComponent {

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
  }

  create(): void{
    this.service.create(this.livro, this.id_cat).subscribe((resposta) => {
      this.router.navigate([`categorias/${this.id_cat}/livros`])
      this.service.mensagem('Livro criado com sucesso')
    }, err => {
      this.router.navigate([`categorias/${this.id_cat}/livros`])
      this.service.mensagem("Erro ao criar novo livro. Verifique")
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
