import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/file.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-site-form',
  templateUrl: './site-form.component.html',
  styleUrls: ['./site-form.component.scss']
})
export class SiteFormComponent implements OnInit {
  public sites: string[] = [''];
  public saving: boolean;
  
  constructor(private fileService: FileService, private snackBar: MatSnackBar) { 
    this.fileService.saving.subscribe((saving: boolean) => {
      this.saving = saving;
    })

    this.fileService.success.subscribe((success: boolean) => {
      const status: string = success ? 'success' : 'failed';
      const message = `File download ${status}`;
      this.openSnackBar(message);
    })
  }

  ngOnInit() {
  }

  public trackByIndex(index: number, obj: any): any {
    return index;
  }

  public add() {
    this.sites.push('');
  }

  public remove(index: number) {
    this.sites.splice(index, 1);
  }

  public download() {
    this.sites.forEach(site => {
      console.log(site)
      this.fileService.save(site);
    });
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }
}
