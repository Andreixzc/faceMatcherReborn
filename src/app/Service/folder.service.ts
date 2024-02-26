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

  initializeFolders(jwt: string) {
    const token = `Bearer ${jwt}`;
    const headers = new HttpHeaders().set("Authorization", token);
    return this.Http.get<FolderListResponse[]>(this.folderListUrl, { headers });

  }

  createFolders(folderRequest : folderRequest){
    // let jwt = localStorage.getItem('jwt') || '';
    // const token = `Bearer ${jwt}`;
    // const headers = new HttpHeaders().set("Authorization", token);
    return this.Http.post<FolderListResponse>(this.folderCreationUrl, folderRequest);
  }

}
