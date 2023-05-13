import { Component } from '@angular/core';
import { CategoriaService } from '../categoria.service';
import { Observable } from 'rxjs';
import { Categoria } from '../categoria.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categoria-delete',
  templateUrl: './categoria-delete.component.html',
  styleUrls: ['./categoria-delete.component.css']
})
export class CategoriaDeleteComponent {

  categoria: Categoria = {
    id : '',
    nome: '',
    descricao:''
  }

  constructor(private categoriaService : CategoriaService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.categoria.id = this.route.snapshot.paramMap.get('id')!
    this.findById()
  }


  findById(): void{
      this.categoriaService.findById(this.categoria.id!).subscribe((resposta) =>{
        this.categoria.nome = resposta.nome
        this.categoria.descricao = resposta.descricao
              
      })
  }

  delete(): void {
    this.categoriaService.delete(this.categoria.id!).subscribe((resposta) =>{
      this.router.navigate(['categorias'])
      this.categoriaService.mensagem("categoria deletada com sucesso!")
    }, err => {
      this.categoriaService.mensagem(err.error.error)
      
    })
  }

  cancel(): void {
    this.router.navigate(['categorias'])
  }
}
