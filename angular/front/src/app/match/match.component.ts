import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html'
})
export class MatchComponent implements OnInit {

  @Output() teamNameClicked: EventEmitter<any> = new EventEmitter<any>();
  @Input() match: any;

  constructor() {  }

  ngOnInit(): void {
  }

  // handle click event to team name
  public handleClick(name: string): void {
    this.teamNameClicked.emit(name);
  }

}
