import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../categoria.service';
import { Categoria } from '../categoria.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categoria-create',
  templateUrl: './categoria-create.component.html',
  styleUrls: ['./categoria-create.component.css']
})
export class CategoriaCreateComponent implements OnInit{

  categoria: Categoria = {
    nome: '',
    descricao:''
  }

  constructor(private categoriaService : CategoriaService,
              private router: Router){}

  ngOnInit(): void {
    
  }

  create(): void{
    this.categoriaService.create(this.categoria).subscribe((resposta) => {
      
      this.router.navigate(['categorias'])
      this.categoriaService.mensagem('Categoria criada com Sucesso!');
    },((err: any) => {
              
              for(let i = 0; i < err.error.errors.length; i++){
                this.categoriaService.mensagem(err.error.errors[i].message)
              }
        }
    ))
  }

  cancel(): void{
    this.router.navigate(['categorias'])
  }

}


