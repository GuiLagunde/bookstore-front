import { Component, OnInit } from '@angular/core';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-livro-read-all',
  templateUrl: './livro-read-all.component.html',
  styleUrls: ['./livro-read-all.component.css']
})
export class LivroReadAllComponent implements OnInit{

  constructor(private service: LivroService,
              private route: ActivatedRoute,
              private router: Router){

  }

  livros : Livro[]=[]

  displayedColumns: string[] = ['id', 'titulo','livros', 'acoes'];
  id_cat: string =''

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!
    this.findAll();
  }


  findAll(): void{
    this.service.findAllByCategoria(this.id_cat).subscribe((resposta) =>{
      this.livros = resposta
      console.log(this.livros);
      
    })
  }

  navegarParaCriarLivro(): void{
    this.router.navigate([`categorias/${this.id_cat}/livros/create`])
  }
}
