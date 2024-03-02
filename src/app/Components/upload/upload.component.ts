import { Component, Input, OnInit, input } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { FolderService } from '../../Service/folder.service';
import { Router } from '@angular/router';
import { FolderListResponse } from '../../Response/Folder/folderListResponse';
import { folderContentResponse } from '../../Response/Folder/folderContentResponse';
import { MatchesComponent } from '../matches/matches.component';
@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatchesComponent],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent implements OnInit {
  ngOnInit(): void {
    this.FolderService.getFolderById(this.folderIdReceiver).subscribe(response => {
      this.currentFolder = response;
    });
  }
  constructor(private FolderService: FolderService, private router: Router) { }
  selectedFiles: File[] = []; // Variável para armazenar os arquivos selecionados
  sucessUpload: boolean = false; // Variável para armazenar o sucesso do upload
  matchesArray: folderContentResponse[] = []; // Variável para armazenar os arquivos que deram match
  matchesFound: boolean = false; // Variável para armazenar se houve match
  loadUploadFlag: boolean = false;
  matchesLoadingFlag: boolean = false;

  @Input() folderIdReceiver: string = '';
  @Input() folderNameReceiver: string = '';
  currentFolder: FolderListResponse = { createdAt: '', folderPath: '', folderPklPath: '', id: '', name: '', userId: '' };

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.selectedFiles.push(files[i]);
    }
    for (let file of this.selectedFiles) {
      console.log(file.name);
    }
  }

  findMatchesTemplate() {
    
    if (this.selectedFiles.length > 0) {
      const formData = new FormData();
      formData.append('folderPath', this.currentFolder.folderPklPath);

      for (let i = 0; i < this.selectedFiles.length; i++) {
        formData.append("file", this.selectedFiles[i]);
      }
      this.matchesLoadingFlag = true;
      this.FolderService.findMatches(formData).subscribe({
        next: (response) => {
          this.matchesArray = response
          this.matchesLoadingFlag = true;
          if (this.matchesArray.length > 0) {
            this.matchesFound = true;
            
          }

        },
        error: (response) => {
          console.log("Erro");
          this.matchesLoadingFlag = false;
        }
      })

    }
    this.matchesLoadingFlag = false;
  }


  uploadFilesTemplate() {
    
    if (this.selectedFiles.length > 0) {
      const formData = new FormData();
      formData.append('folderName', this.folderNameReceiver);

      for (let i = 0; i < this.selectedFiles.length; i++) {
        formData.append("file", this.selectedFiles[i]);
      }
      this.loadUploadFlag = true;
      this.FolderService.uploadFiles(formData).subscribe(
        (response) => {
          this.sucessUpload = true;
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          this.sucessUpload = false;
          console.log("Erro");
        }
      );
    }
  }
}
