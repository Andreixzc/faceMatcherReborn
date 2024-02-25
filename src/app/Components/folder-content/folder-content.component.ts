import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { folderContentResponse } from '../../Response/Folder/folderContentResponse';


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
  folderContent: folderContentResponse[] = [];
  ngOnInit() {
    const folderId = history.state.folderId;
    this.folderId = folderId;
    console.log('Folder ID:', folderId);
  }
}
