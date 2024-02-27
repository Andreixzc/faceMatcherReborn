import { Component, Input } from '@angular/core';
import { folderContentResponse } from '../../Response/Folder/folderContentResponse';

@Component({
  selector: 'app-matches',
  standalone: true,
  imports: [],
  templateUrl: './matches.component.html',
  styleUrl: './matches.component.css'
})
export class MatchesComponent {

  @Input() matchesArrayReciever: folderContentResponse[] = [];
}
