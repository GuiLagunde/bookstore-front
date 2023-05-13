import { Component, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LivroService } from '../livro.service';
import { Livro } from '../livro.model';


@Component({
  selector: 'app-livro-read',
  templateUrl: './livro-read.component.html',
  styleUrls: ['./livro-read.component.css']
})
export class LivroReadComponent {

  id_cat : string =''
  livro: Livro = {
    id: '',
    titulo: '',
    nome_autor: '',
    texto:''

  }

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

  cancel(): void{
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
  }
}
