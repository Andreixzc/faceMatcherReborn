import { Component, Input, OnInit, input } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { FolderService } from '../../Service/folder.service';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent implements OnInit {
  ngOnInit(): void {
   console.log("Printando id da pasta:" +this.folderIdReceiver)
   console.log("printando name: "+this.folderNameReceiver)
  }
  constructor(private FolderService : FolderService , private router: Router) {}
  selectedFiles: File[] = []; // Variável para armazenar os arquivos selecionados
  sucessUpload: boolean = false; // Variável para armazenar o sucesso do upload
  @Input() folderIdReceiver:  string = '';
  @Input() folderNameReceiver: string = '';



  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.selectedFiles.push(files[i]);
    }
    for (let file of this.selectedFiles) {
      console.log(file.name);
    }
  }

  //both methods use the same file array.
  findMatchesTemplate() {
  
  }
  uploadFilesTemplate(){
    if (this.selectedFiles.length > 0) {
      const formData = new FormData();
    formData.append('folderName', this.folderNameReceiver);
    
    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append("file", this.selectedFiles[i]);
    }
    
    this.FolderService.uploadFiles(formData).subscribe(
      (response) => {
        this.sucessUpload = true;
        this.router.navigate(['/dashboard']);
        
        // this.router.navigate(['/file-manager']);
      },
      (error) => {
        this.sucessUpload = false;
        console.log("Erro");
      }
    );
    }
  }
}
