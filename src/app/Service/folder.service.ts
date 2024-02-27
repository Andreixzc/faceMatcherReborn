import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { folderContentResponse } from '../Response/Folder/folderContentResponse';
import { FolderListResponse } from '../Response/Folder/folderListResponse';
import { folderRequest } from '../../Request/Folder/folderRquest';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  constructor(private Http: HttpClient) { }

  folderListUrl: string = "http://localhost:9090/folder/list";
  folderCreationUrl: string = "http://localhost:9090/folder";
  folderContentUrl: string = "http://localhost:9090/folder-content/list/{folderId}";
  folderContentUploadUrl: string = "http://localhost:9090/s3/upload";

  initializeFolders(jwt: string) {
    return this.Http.get<FolderListResponse[]>(this.folderListUrl);

  }
  initializeFolderContent(folderId: string) {
    return this.Http.get<folderContentResponse[]>(this.folderContentUrl.replace("{folderId}", folderId));
  }

  createFolders(folderRequest : folderRequest){
    return this.Http.post<FolderListResponse>(this.folderCreationUrl, folderRequest);
  }

  uploadFiles(formData: FormData){
    console.log(formData.get('folderName'));
    return this.Http.post<folderContentResponse>(this.folderContentUploadUrl, formData);

  }
  
}
