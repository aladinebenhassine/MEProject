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
  public selectedPlayer: string ='';

  
  constructor(private playerService: SimilarplayerService) {}


  ngOnInit(): void {
    this.loadPlayers();
  }

  loadPlayers(): void {
    this.playerService.getPlayers()
      .subscribe(
        (data: any[]) => { // Assuming data is an array of player names
          this.players = data.map((playerName: string) => ({
            Name: playerName, // Make sure to use the correct property name 'Name'
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
        (data :any)=> {
          console.log('API Response:', data); // Log the API response

          // Parse the JSON string response into an array of objects
          const similarPlayersData = data.map(JSON.parse);

          // Map the player properties from each object
          this.similarPlayers = similarPlayersData.map((player:any) => ({
            name: player.Name[Object.keys(player.Name)[0]],
            team: player.Team[Object.keys(player.Team)[0]],
            shirtNumber: player.Shirt_number[Object.keys(player.Shirt_number)[0]]
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
