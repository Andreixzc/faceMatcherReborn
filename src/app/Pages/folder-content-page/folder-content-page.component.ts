import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { folderContentResponse } from '../../Response/Folder/folderContentResponse';
import { UploadComponent } from '../../Components/upload/upload.component';
import { FolderService } from '../../Service/folder.service';
import JSZip from 'jszip';

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
  bucketName : string = 'balde-teste232323';
  folderName: string = '';

  folderContent: folderContentResponse[] = [];
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.folderId = params['folderId'];
      this.folderName = params['folderName'];
      this.initializeFolderContentTemplate();
  });

  }
  initializeFolderContentTemplate() {
    this.folderService.initializeFolderContent(this.folderId).subscribe((data) => {
      this.folderContent = data;
    });
  }


  async downloadS3Objects(){
    let objectKeys: string[] = [];
    this.folderContent.forEach(element => {
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
