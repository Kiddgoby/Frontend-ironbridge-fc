import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [Header, Footer, CommonModule],
  templateUrl: './history.html',
  styleUrl: './history.css'
})
export class History {}
