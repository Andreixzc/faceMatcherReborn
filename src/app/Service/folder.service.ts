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
 
  folderListUrl: string = "https://api.theandrei.link/folder/list";
  folderCreationUrl: string = "https://api.theandrei.link/folder";
  folderContentUrl: string = "https://api.theandrei.link/folder-content/list/{folderId}";
  folderContentUploadUrl: string = "https://api.theandrei.link/s3/upload";
  folderByIdUrl: string = "https://api.theandrei.link/folder/{id}";
  folderFindMatchesUrl: string = "https://api.theandrei.link/s3/ref";
  folderDeleteUrl: string = "https://api.theandrei.link/folder/{id}";
  downloadMatchesUrl : string = "https://api.theandrei.link/folder-content/downloadAllMatches";
  

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
