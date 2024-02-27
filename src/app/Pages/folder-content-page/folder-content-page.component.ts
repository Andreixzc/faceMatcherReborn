import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { folderContentResponse } from '../../Response/Folder/folderContentResponse';
import { UploadComponent } from '../../Components/upload/upload.component';
import { FolderService } from '../../Service/folder.service';

@Component({
  selector: 'app-folder-content-page',
  standalone: true,
  imports: [UploadComponent],
  templateUrl: './folder-content-page.component.html',
  styleUrl: './folder-content-page.component.css'
})
export class FolderContentPageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private folderService : FolderService) { }
  //checar erro de passar o folderId pela rota.
  folderId: string = '';

  folderContent: folderContentResponse[] = [];
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.folderId = params['folderId'];
      this.initializeFolderContentTemplate();
  });

  }
  initializeFolderContentTemplate() {
    this.folderService.initializeFolderContent(this.folderId).subscribe((data) => {
      this.folderContent = data;
    });
  }
}
