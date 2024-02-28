
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterLink, RouterOutlet } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, RouterOutlet,],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})


export class HeaderComponent  {

}
