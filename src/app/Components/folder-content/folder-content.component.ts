import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-folder-content',
  standalone: true,
  imports: [],
  templateUrl: './folder-content.component.html',
  styleUrl: './folder-content.component.css'
})
export class FolderContentComponent implements OnInit {
  constructor(private route: ActivatedRoute) { }

  folderId: string = '';
  ngOnInit() {
    const folderId = history.state.folderId;
    this.folderId = folderId;
    console.log('Folder ID:', folderId);
  }
}
