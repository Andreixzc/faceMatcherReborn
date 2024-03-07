import { Component, Input } from '@angular/core';
import { folderContentResponse } from '../../Response/Folder/folderContentResponse';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-matches',
  standalone: true,
  imports: [],
  templateUrl: './matches.component.html',
  styleUrl: './matches.component.css'
})
export class MatchesComponent {

  @Input() matchesArrayReciever: folderContentResponse[] = [];

  constructor(private http: HttpClient) { }

  downloadMatches() {
    for (let matches of this.matchesArrayReciever) {
      console.log(matches.URL);
      //endpoint todo
     
    }
  }



    
}
