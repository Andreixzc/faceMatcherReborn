import { Component, OnInit } from '@angular/core';
import { FolderListResponse } from '../../Response/Folder/folderListResponse';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormGroup, FormsModule } from '@angular/forms';
import { FolderService } from '../../Service/folder.service';
import { folderRequest } from '../../../Request/Folder/folderRquest';




@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router, private folderService: FolderService) { };
  regex = /[!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|`~]/;
  folderNameToCreate: string = '';
  ngOnInit(): void {
    this.initializeFoldersTemplate();
  }

  userFolders: FolderListResponse[] = [];

  folderIdSender: string = '';
  initializeFoldersTemplate() {
    if (typeof localStorage !== 'undefined') {
      let jwt: string = localStorage.getItem('jwt') || '';
      if (jwt == '') {
        console.log('jwt is empty');
        return;
      }
      this.folderService.initializeFolders(jwt).subscribe(response => {
        this.userFolders = response; // Store the response data in 'folders' variable
        // console.log(response)
      });
    } else {
      console.log('localStorage is not available.');
    }
  }

  openFolder(folderId: string, folderName: string) {

    this.router.navigate(['/folder-content-page', folderId, folderName]);
  }

  createFolderTemplate() {
    if (this.folderNameToCreate.length > 0 && !this.validateEspecialCharacters(this.folderNameToCreate) ){
      const folderRequest: folderRequest = { folderName: this.folderNameToCreate };
      this.folderService.createFolders(folderRequest).subscribe(response => {
        this.initializeFoldersTemplate();
      });
    }else {
      window.alert('Folder name cannot be empty or contain special characters!');
    }

    //create folder this.foldername
  }

  validateEspecialCharacters(folderName: string) {
    return this.regex.test(folderName);
  }
}
