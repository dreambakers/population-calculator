import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { DialogService } from '../services/dialog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private dialogService: DialogService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onNewWorldClick() {
    this.dialogService.inputDialog('Enter World Name', 'World Name').subscribe(
      res => {
        if (res) {
          DataService.world = {
            ...DataService.getDefaultWorldObject(),
            name: res,
          };
          this.router.navigate(['/landmasses']);
        }
      }
    );
  }
}
