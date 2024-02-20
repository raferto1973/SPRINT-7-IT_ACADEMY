// starships.component.ts

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, RouterOutlet } from '@angular/router';

import { Starship } from '@interfaces/starship.interface';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { StarwarsService } from '@services/starwars.service';


@Component({
  selector: 'app-starships',
  standalone: true,
  imports: [CommonModule, RouterModule, InfiniteScrollModule, RouterOutlet],
  templateUrl: './starships.component.html',
  styleUrl: './starships.component.scss',
})


// export class StarshipsComponent {}


export default class StarshipsComponent implements OnInit {

  public starships: Starship[] = [];
  private page: number = 1;
  public loadMore: boolean = true;

  constructor(private starwarsService: StarwarsService, private router: Router) {}

  ngOnInit(): void {
    this.getStarships();
  }

  public getStarships() {
    this.starwarsService.getStarships(this.page)
        .subscribe({
          next: (data) => {
            this.starships = this.starships.concat(data.results);
            this.starships.forEach(ship => {
              ship.id = ship.url.split('/').reverse()[1];
            });
          },
          error: (error) => {
            //should not load more Starships
            if (error.status === 404) this.loadMore = false;
          }
        });
  }

  public loadMoreStarships() {
    if (this.loadMore) {
      this.page++;
      this.getStarships();
    }
  }

  public viewShip(id: string) {
    this.router.navigate(['/starships', id]);
  }
}
