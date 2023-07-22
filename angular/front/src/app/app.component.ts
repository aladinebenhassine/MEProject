import { Component, ChangeDetectorRef } from '@angular/core';
import { AdnTournament } from "@adonsio/adn-tournament/lib/declarations/interfaces";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front';

  // catch click event emited by match component
  public handleClickEvent(name: string){
    console.log("Team name clicked: ", name)
  }


  teams: any[] = [];
  selectedTeams: any[] = [];
  maxTeamsAllowed: number = 16;
  drawTournament: any[][] = [];
  showTournament: boolean = false;
  winner: any = {};
  teamsDropped: any[] = [];

  example: AdnTournament = {
    rounds: []
  }

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchTeams();
  }

  fetchTeams() {
    this.http.get<any[]>('./assets/data/teams.json').subscribe(
      data => {
        this.teams = data;
      },
      error => {
        console.error('Error fetching teams:', error);
      }
    );
  }

  startTournament() {


    this.example.rounds = [];

    // Check if there are exactly 16 teams selected before starting the tournament
    if (this.selectedTeams.length !== this.maxTeamsAllowed) {
      alert('Please select exactly 16 teams for the tournament.');
      return;
    }

    // Divide the selected teams into pairs and generate the tournament structure
    const dividedTeams = this.divideIntoGroupsOfTwo([...this.selectedTeams]);

    this.showTournament = true;
    this.example.rounds = this.generateTournamentStructure(dividedTeams);

  }

  predictMatch(team1: any, team2: any): any {
    return [ Math.floor(Math.random() * 5),  Math.floor(Math.random() * 5)]

    const url = 'http://192.168.4.60:105/predict';
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    // Set the parameters for the POST request
    const body = new URLSearchParams();
    body.set('FirstTeam', team1);
    body.set('SecondTeam', team2);

    // Send the POST request
    this.http.post<any>(url, body.toString(), { headers }).subscribe(
      ({data}) => {

          const matchScoreRegex = /Match Score: (.*): (\d+) goals (.*): (\d+) goals/;
          const match = data.match(matchScoreRegex);

        if (match) {
            return [match[2], match[4]];
          } else {
          console.error('Invalid response format:', data);
          return [0, 0];
          }

      },
      (error) => {
        console.error('API Error:', error);
        return [ Math.floor(Math.random() * 5),  Math.floor(Math.random() * 5)]
      }
    );
  }

  generateTournamentStructure(teamsPairs: any[]): any[] {
    const tournamentRounds: any[] = [];
    const totalRounds = Math.log2(teamsPairs.length);

    for (let round = 0; round < totalRounds; round++) {
      const roundMatches = [];

      for (let match = 0; match < teamsPairs.length; match++) {
        const team1 = teamsPairs[match].teams[0];
        const team2 = teamsPairs[match].teams[1];

        const scores = this.predictMatch(team1, team2);

        team1.score = scores[0];
        team1.score = scores[1];
        // Generate random scores for each team


        // Select the passing team based on the scores
        const passingTeam = team1.score > team2.score ? team1 : team2;
        roundMatches.push({
          teams: [
            {
              name: team1.name,
              score: team1.score,
              img: team1.img
            },
            {
              name: team2.name,
              score: team2.score,
              img: team2.img
            }
          ],
          passingTeam: {
            name: passingTeam.name,
            score: passingTeam.score,
            img: passingTeam.img
          }
        });
      }

      tournamentRounds.push({ type: 'Winnerbracket', matches: roundMatches });

      teamsPairs = this.getNextRoundTeams(tournamentRounds, roundMatches);
    }

     // Find the last Winnerbracket round and use its passing teams for the Final round
  const lastWinnerbracketRound = tournamentRounds.find(round => round.type === 'Winnerbracket');
  const finalRound = {
    type: 'Final',
    matches: [
      {
        teams: [
          {
            name: lastWinnerbracketRound.matches[0].passingTeam.name,
            score: lastWinnerbracketRound.matches[0].passingTeam.score,
            img: lastWinnerbracketRound.matches[0].passingTeam.img
          },
          {
            name: lastWinnerbracketRound.matches[1].passingTeam.name,
            score: lastWinnerbracketRound.matches[1].passingTeam.score,
            img: lastWinnerbracketRound.matches[1].passingTeam.img
          }
        ]
      }
    ]
    };

    if (finalRound.matches[0].teams[0].score > finalRound.matches[0].teams[1].score) {
      this.winner = finalRound.matches[0].teams[0];
    } else {
      this.winner = finalRound.matches[0].teams[1];
    }
    tournamentRounds.push(finalRound);

    return tournamentRounds;
  }

  getNextRoundTeams(tournamentRounds: any[], currentRoundMatches: any[]): any[] {
    const nextRoundTeams = [];

    for (let i = 0; i < currentRoundMatches.length; i += 2) {
      const match1 = currentRoundMatches[i];
      const match2 = currentRoundMatches[i + 1];
      const passingTeam1 = match1.passingTeam;
      const passingTeam2 = match2.passingTeam;

      nextRoundTeams.push({teams :[passingTeam1, passingTeam2]});
    }

    return nextRoundTeams;
  }



  divideIntoGroupsOfTwo(teams: any[]): any[] {
    const dividedArray: any[] = [];
    for (let i = 0; i < teams.length; i += 2) {
      const team1 = teams[i];
      const team2 = teams[i + 1];

      team1.score = 1;
      team2.score = 1;

      dividedArray.push({ teams: [team1, team2] });
    }

    return dividedArray;
  }

 // Method to check if a team is selected
 isSelected(team: any) {
  return this.selectedTeams.includes(team);
}

onTeamDropped(team: any) {
  const index = this.teams.indexOf(team);
  if (index > -1) {
    this.teams.splice(index, 1);
  }
  }

// Method to handle team selection (same as before)
toggleTeamSelection(team: any) {
  const index = this.selectedTeams.indexOf(team);
  if (index > -1) {
    this.selectedTeams.splice(index, 1);
  } else {
    if (this.selectedTeams.length < this.maxTeamsAllowed) {
      this.selectedTeams.push(team);
    }
  }
}

// Method to handle drag start event
onDragStart(event: DragEvent, team: any) {
  event.dataTransfer?.setData('text/plain', JSON.stringify(team));
}

// Method to handle drag over event
onDragOver(event: DragEvent) {
  event.preventDefault();
}
isTeamDropped(team: any): boolean {
  return this.teamsDropped.includes(team);
}
// Method to handle drop event
onDrop(event: DragEvent) {
  event.preventDefault();
  const data = event.dataTransfer?.getData('text/plain');
  if (data) {
    const team = JSON.parse(data);
    if (!this.isSelected(team) && this.selectedTeams.length < this.maxTeamsAllowed && !this.isTeamDropped(team)) {
      this.selectedTeams.push(team);
      this.teamsDropped.push(team); // Add the team to the teamsDropped array
    }
  }
}


}
