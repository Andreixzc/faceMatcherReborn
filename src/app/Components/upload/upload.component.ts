import { Component, Input, OnInit, input } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { FolderService } from '../../Service/folder.service';
import { Router } from '@angular/router';
import { FolderListResponse } from '../../Response/Folder/folderListResponse';
import { folderContentResponse } from '../../Response/Folder/folderContentResponse';
import { MatchesComponent } from '../matches/matches.component';
import JSZip from 'jszip';
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
  loadingMatches: boolean = false;
  bucketName: string = 'balde-teste232323';




  @Input() contentArrayReciever: folderContentResponse[] = [];
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

  // findMatchesTemplate() {

  //   if (this.selectedFiles.length > 0) {
  //     const formData = new FormData();
  //     formData.append('folderPath', this.currentFolder.folderPklPath);

  //     for (let i = 0; i < this.selectedFiles.length; i++) {
  //       formData.append("file", this.selectedFiles[i]);
  //     }
  //     this.FolderService.findMatches(formData).subscribe({
  //       next: (response) => {

  //         this.matchesArray = response

  //         if (this.matchesArray.length > 0) {
  //           this.matchesFound = true;

  //         }

  //       },

  //       error: (response) => {
  //         console.log("Erro");

  //       }
  //     })

  //   }

  // }
  findMatchesTemplate() {
    if (this.selectedFiles.length > 0) {
      this.loadingMatches = true; // Show spinner
      const formData = new FormData();
      formData.append('folderPath', this.currentFolder.folderPklPath);
      for (let i = 0; i < this.selectedFiles.length; i++) {
        formData.append("file", this.selectedFiles[i]);
      }
      this.FolderService.findMatches(formData).subscribe({
        next: (response) => {
          this.matchesArray = response;
          if (this.matchesArray.length > 0) {
            this.matchesFound = true;
          }
        },
        error: (response) => {
          console.log("Error");
        },
        complete: () => {
          this.loadingMatches = false; // Hide spinner
        }
      });
    }
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

  deleteFolderTemplate() {
    this.FolderService.deleteFolder(this.folderIdReceiver).subscribe(
      {
        next: (response) => {
          window.alert("Folder deleted!");
          this.router.navigate(['/dashboard']);
        }
      },
    );
  }


  async downloadFolderContent() {
    let objectKeys: string[] = [];
    this.contentArrayReciever.forEach(element => {
      objectKeys.push(element.filePath);
    });
    try {
      const zip = new JSZip();

      // Fetch each S3 object and add it to the ZIP file
      await Promise.all(objectKeys.map(async objectKey => {
        const s3Url = `https://${this.bucketName}.s3.amazonaws.com/${objectKey}`;
        const response = await fetch(s3Url);
        const blob = await response.blob();
        zip.file(objectKey, blob);
      }));

      // Generate the ZIP file
      const content = await zip.generateAsync({ type: 'blob' });

      // Create a downloadable link for the ZIP file
      const url = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = 's3_objects.zip';
      document.body.appendChild(link);
      link.click();

      // Clean up
      URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error:', error);
    }
  }

}
