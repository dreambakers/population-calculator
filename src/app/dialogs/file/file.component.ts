import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InputComponent, DialogData } from '../input/input.component';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {

  world: any = null;
  isValid = true;

  ngOnInit(): void {
  }

  input = '';

  constructor(
    public dialogRef: MatDialogRef<InputComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onFileSelected(event: any) {
    this.isValid = true;
    this.world = null;
    if (event.target.files.length !== 1) {
      this.isValid = false;
    } else {
      const reader = new FileReader();
      reader.onloadend = (e) => {
        const readerString = reader?.result?.toString() || '';
        try {
          let world = JSON.parse(readerString);
          if (world && typeof world === "object" && 'name' in world) {
            this.world = world;
          } else {
            this.world = null;
            this.isValid = false;
          }
        } catch (error) {
          this.world = null;
          this.isValid = false;
        }
      };
      reader.readAsText(event.target.files[0]);
    }
  }

  onUploadClick() {
    this.dialogRef.close(this.world);
  }
}
