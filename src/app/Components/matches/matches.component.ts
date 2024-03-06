import { Component, Input } from '@angular/core';
import { folderContentResponse } from '../../Response/Folder/folderContentResponse';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-matches',
  standalone: true,
  imports: [],
  templateUrl: './matches.component.html',
  styleUrl: './matches.component.css'
})
export class MatchesComponent {

  @Input() matchesArrayReciever: folderContentResponse[] = [];

  constructor(private http: HttpClient) {}
  
  downloadMatches() {
    for (let matches of this.matchesArrayReciever) {
      console.log(matches.URL);
      this.downloadFiles(matches.URL, matches.fileName);
    }
  }

  downloadFiles(filePath: string, fileName: string) {
    console.log(filePath)
    this.http.get(filePath, { responseType: 'blob' }).subscribe((res: any) => {
      saveAs(res, fileName);
    });
  }
}
