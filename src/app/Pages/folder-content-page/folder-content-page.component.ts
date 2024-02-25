import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { folderContentResponse } from '../../Response/Folder/folderContentResponse';
import { UploadComponent } from '../../Components/upload/upload.component';

@Component({
  selector: 'app-folder-content-page',
  standalone: true,
  imports: [UploadComponent],
  templateUrl: './folder-content-page.component.html',
  styleUrl: './folder-content-page.component.css'
})
export class FolderContentPageComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  @Output() folderId: string = '';

  @Input() folderIdReciever: string = '';


  folderContent: folderContentResponse[] = [];
  ngOnInit() {
    const folderId = history.state.folderId;
    this.folderId = folderId;
    //load folderContent
    console.log('Folder ID:', folderId);
  }
}
