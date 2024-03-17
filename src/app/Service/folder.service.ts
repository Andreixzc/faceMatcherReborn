import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { folderContentResponse } from '../Response/Folder/folderContentResponse';
import { FolderListResponse } from '../Response/Folder/folderListResponse';
import { folderRequest } from '../../Request/Folder/folderRquest';

// const baseUrl = 'http://localhost:9090';
const baseUrl = 'https://api.theandrei.link';

@Injectable({
  providedIn: 'root',
})
export class FolderService {
  constructor(private Http: HttpClient) {}

  folderListUrl = `${baseUrl}/folder/list`;
  folderCreationUrl = `${baseUrl}/folder`;
  folderContentUrl = `${baseUrl}/folder-content/list/{folderId}`;
  folderContentUploadUrl = `${baseUrl}/s3/upload`;
  folderByIdUrl = `${baseUrl}/folder/{id}`;
  folderFindMatchesUrl = `${baseUrl}/s3/ref`;
  folderDeleteUrl = `${baseUrl}/folder/{id}`;
  downloadMatchesUrl = `${baseUrl}/folder-content/downloadAllMatches`;

  initializeFolders(jwt: string) {
    return this.Http.get<FolderListResponse[]>(this.folderListUrl);
  }

  initializeFolderContent(folderId: string) {
    return this.Http.get<folderContentResponse[]>(
      this.folderContentUrl.replace('{folderId}', folderId)
    );
  }

  createFolders(folderRequest: folderRequest) {
    return this.Http.post<FolderListResponse>(
      this.folderCreationUrl,
      folderRequest
    );
  }

  uploadFiles(formData: FormData) {
    console.log(formData.get('folderName'));
    return this.Http.post<folderContentResponse>(
      this.folderContentUploadUrl,
      formData
    );
  }

  getFolderById(folderId: string) {
    return this.Http.get<FolderListResponse>(
      this.folderByIdUrl.replace('{id}', folderId)
    );
  }

  findMatches(formData: FormData) {
    return this.Http.post<folderContentResponse[]>(
      this.folderFindMatchesUrl,
      formData
    );
  }

  deleteFolder(folderId: string) {
    return this.Http.delete(this.folderDeleteUrl.replace('{id}', folderId));
  }

  downloadAllMatches(matchesKey: string[]) {
    const requestOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'arraybuffer' as 'json', // Set responseType to 'arraybuffer'
    };
    return this.Http.post(this.downloadMatchesUrl, matchesKey, requestOptions);
  }
}
