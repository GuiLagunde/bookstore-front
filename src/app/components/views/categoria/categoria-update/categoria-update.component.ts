import { Component } from '@angular/core';
import { Categoria } from '../categoria.model';
import { CategoriaService } from '../categoria.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categoria-update',
  templateUrl: './categoria-update.component.html',
  styleUrls: ['./categoria-update.component.css']
})
export class CategoriaUpdateComponent {

  categoria : Categoria = {
    id: '',
    nome: '',
    descricao: ''
  }

  constructor(private service : CategoriaService,
              private route: ActivatedRoute,
              private router: Router){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
   this.categoria.id = this.route.snapshot.paramMap.get('id')!
   this.findById();
  }

  findById(): void {
    this.service.findById(this.categoria.id!).subscribe((resposta) => {
    this.categoria.nome = resposta.nome
    this.categoria.descricao = resposta.descricao
  })
  }

  cancel():void{
    this.router.navigate(['categorias'])
  }

  update(): void{
    this.service.update(this.categoria).subscribe(() =>{
    this.router.navigate(['categorias'])
    this.service.mensagem('Categoria Atualizada Com Sucesso')
    }, err => {
      this.service.mensagem(err.error.error)
    })
  }
}
