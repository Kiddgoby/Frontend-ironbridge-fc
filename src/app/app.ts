import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlayerService } from './services/player.service';
import { NewsService } from './services/news.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('IRONBRIDGE FC');
}
// export class App implements OnInit {
//   private readonly playerService = inject(PlayerService);
//   private readonly newsService = inject(NewsService);

//   protected readonly title = signal('IRONBRIDGE FC');

//   ngOnInit(): void {
//     console.log('--- Probando conexión con el Backend ---');

//     this.playerService.getPlayers().subscribe({
//       next: (players) => {
//         console.log('✅ Jugadores recibidos:', players);
//       },
//       error: (err) => {
//         console.error('❌ Error cargando jugadores:', err);
//       }
//     });

//     this.newsService.getAllNews().subscribe({
//       next: (news) => {
//         console.log('✅ Noticias recibidas:', news);
//       },
//       error: (err) => {
//         console.error('❌ Error cargando noticias:', err);
//       }
//     });
//   }
// }
