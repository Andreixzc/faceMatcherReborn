import { Component, Input } from '@angular/core';
import { folderContentResponse } from '../../Response/Folder/folderContentResponse';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FolderService } from '../../Service/folder.service';
import JSZip from 'jszip';

@Component({
  selector: 'app-matches',
  standalone: true,
  imports: [],
  templateUrl: './matches.component.html',
  styleUrl: './matches.component.css'
})
export class MatchesComponent {

  @Input() matchesArrayReciever: folderContentResponse[] = [];

  bucketName: string = 'balde-teste232323';

  constructor(private http: HttpClient, private folderService: FolderService) { }



  async downloadS3Objects() {
    let objectKeys: string[] = [];
    this.matchesArrayReciever.forEach(element => {
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








