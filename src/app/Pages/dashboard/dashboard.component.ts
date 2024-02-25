import { Component, OnInit } from '@angular/core';
import { FolderListResponse } from '../../Response/Folder/folderListResponse';
import { Router } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormGroup, FormsModule} from '@angular/forms';




@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router){};
  folderNameToCreate: string = '';
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

  createFolderTemplate(){
    if (this.folderNameToCreate.length > 0) {
      //createfolder.


      this.initializeFolders();
    }
    
    return;
    
    //create folder this.foldername
  }
}
