import { Component } from '@angular/core';
import { FolderRenderComponent } from '../../Components/folder-render/folder-render.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FolderRenderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  foldersDashboard: any[]=[];
}
