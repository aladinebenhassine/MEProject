import { Component, OnInit } from '@angular/core';
import { SimilarplayerService } from '../services/similarplayer.service';

@Component({
  selector: 'app-similar-player',
  templateUrl: './similar-player.component.html',
  styleUrls: ['./similar-player.component.css']
})
export class SimilarPlayerComponent implements OnInit {
  players: any[] = [];
  similarPlayers: any[] = [];
  selectedPlayerDetails: any = null;

  constructor(private playerService: SimilarplayerService) {}


  ngOnInit(): void {
    this.loadPlayers();
  }

  loadPlayers(): void {
    this.playerService.getPlayers()
      .subscribe(
        data => {
          this.players = data.map(playerName => ({
            name: playerName,
            image: `https://fcb-abj-pre.s3.amazonaws.com/img/jugadors/MESSI.jpg` // Replace with the correct image URL format
          }));
        },
        error => {
          console.error(error);
        }
      );
  }

  loadSimilarPlayers(playerName: string): void {
    this.playerService.getSimilarPlayers(playerName)
      .subscribe(
        data => {
          this.similarPlayers = data.map((player: { Name: string; }) => ({
            name: player.Name,
            image: `https://fcb-abj-pre.s3.amazonaws.com/img/jugadors/MESSI.jpg` // Replace with the correct image URL format
          }));
        },
        error => {
          console.error(error);
        }
      );
  }

  showPlayerDetails(player: any): void {
    this.selectedPlayerDetails = player;
  }

  hidePlayerDetails(): void {
    this.selectedPlayerDetails = null;
  }
}
