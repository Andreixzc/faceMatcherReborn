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
      this.downloadFile(matches.URL, matches.fileName);
    }
  }

  downloadFile(url: string, fileName: string) {
    console.log('Baixando arquivo:', url);
    this.http.get(url, { responseType: 'blob' }).subscribe(response => {
      saveAs(response, fileName); // Inicia o download do arquivo
    }, error => {
      console.error('Erro ao baixar o arquivo:', error);
    });
  }
}
