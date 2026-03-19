import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { NewsService } from '../services/news.service';
import { News } from '../models/news.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Header, Footer, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  private readonly newsService = inject(NewsService);
  protected readonly newsList = signal<News[]>([]);

  ngOnInit(): void {
    this.newsService.getAllNews().subscribe({
      next: (news) => {
        this.newsList.set(news);
      },
      error: (err) => {
        console.error('Error fetching news:', err);
      }
    });
  }
}
