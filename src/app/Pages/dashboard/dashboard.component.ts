import { Component, OnInit } from '@angular/core';
import { FolderListResponse } from '../../Response/Folder/folderListResponse';
import { Router } from '@angular/router';




@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router){};
  ngOnInit(): void {
    this.initializeFolders();
  }

  userFolders : FolderListResponse[] = [];

  folderIdSender: string = '';
  initializeFolders() {}
  
  openFolder(folderId: string) {
    this.folderIdSender = folderId; // Atualizando o folderIdSender
    console.log(this.folderIdSender);
    this.router.navigate(['/folder-content-page/:folderId'], { state: { folderId: this.folderIdSender } });
  }
}
