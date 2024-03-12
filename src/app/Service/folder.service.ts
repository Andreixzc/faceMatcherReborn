import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { folderContentResponse } from '../Response/Folder/folderContentResponse';
import { FolderListResponse } from '../Response/Folder/folderListResponse';
import { folderRequest } from '../../Request/Folder/folderRquest';
import { get } from 'node:http';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  constructor(private Http: HttpClient) { }

  folderListUrl: string = "https://ec2-18-231-174-121.sa-east-1.compute.amazonaws.com:9090/folder/list";
  folderCreationUrl: string = "https://ec2-18-231-174-121.sa-east-1.compute.amazonaws.com:9090/folder";
  folderContentUrl: string = "https://ec2-18-231-174-121.sa-east-1.compute.amazonaws.com:9090/folder-content/list/{folderId}";
  folderContentUploadUrl: string = "https://ec2-18-231-174-121.sa-east-1.compute.amazonaws.com:9090/s3/upload";
  folderByIdUrl: string = "https://ec2-18-231-174-121.sa-east-1.compute.amazonaws.com:9090/folder/{id}";
  folderFindMatchesUrl: string = "https://ec2-18-231-174-121.sa-east-1.compute.amazonaws.com:9090/s3/ref";
  folderDeleteUrl: string = "https://ec2-18-231-174-121.sa-east-1.compute.amazonaws.com:9090/folder/{id}";
  downloadMatchesUrl : string = "https://ec2-18-231-174-121.sa-east-1.compute.amazonaws.com:9090/folder-content/downloadAllMatches";
  

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

  getFolderById(folderId: string){
    return this.Http.get<FolderListResponse>(this.folderByIdUrl.replace("{id}", folderId));
  }
  findMatches(formData: FormData) {
    return this.Http.post<folderContentResponse[]>(this.folderFindMatchesUrl, formData);
  }
  
  deleteFolder(folderId: string){
    return this.Http.delete(this.folderDeleteUrl.replace("{id}", folderId));
  }
  downloadAllMatches(matchesKey: string[]) {
    const requestOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'arraybuffer' as 'json'  // Set responseType to 'arraybuffer'
    };

    return this.Http.post(this.downloadMatchesUrl, matchesKey, requestOptions);
  }
}
