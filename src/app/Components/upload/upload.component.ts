import { Component, Input } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {
  selectedFiles: File[] = []; // Variável para armazenar os arquivos selecionados

  // Id da pasta para procurar matches
  @Input() folderIdReceiver: string = '';

  onFileSelected(event: any) {
    this.selectedFiles = event.target.files;
    
    // Captura os arquivos selecionados
  }

  //both methods use the same file array.
  findMatchesTemplate() {
  
  }
  uploadFilesTemplate(){

  }
}
