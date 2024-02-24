import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-folder-render',
  standalone: true,
  imports: [],
  templateUrl: './folder-render.component.html',
  styleUrl: './folder-render.component.css'
})
export class FolderRenderComponent implements OnInit {
  @Input() folders: folderListResponse[] = [];
  ngOnInit(): void {
    this.renderFolders();
  }
  renderFolders() {};

}
