import { Component, OnInit } from '@angular/core';
import { SimilarplayerService } from '../services/similarplayer.service';

@Component({
  selector: 'app-similar-player',
  templateUrl: './similar-player.component.html',
  styleUrls: ['./similar-player.component.css']
})
export class SimilarPlayerComponent implements OnInit {
  players: any[] = [];
  selectedPlayer: string | undefined;

  constructor(private playerService: SimilarplayerService) {}

  ngOnInit(): void {
    this.loadPlayers();

  }

  loadPlayers(): void {
    this.playerService.getPlayers()
      .subscribe(
        data => {
          this.players = data;
        },
        error => {
          console.error(error);
        }
      );
  }

  loadSimilarPlayers(): void {
    if (this.selectedPlayer) {
      this.playerService.getSimilarPlayers(this.selectedPlayer)
        .subscribe(
          data => {
            this.players = data.map((player: string) => JSON.parse(player));
          },
          error => {
            console.error(error);
          }
        );
    } else {
      this.players = [];
    }
  }

}
