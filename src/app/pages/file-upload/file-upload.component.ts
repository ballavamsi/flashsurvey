import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import {
  HttpClient,
  HttpResponse,
  HttpRequest,
  HttpEventType,
  HttpErrorResponse,
} from '@angular/common/http';
import { Subscription, of } from 'rxjs';
import { catchError, last, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 100 })),
      transition('* => void', [animate(300, style({ opacity: 0 }))]),
    ]),
  ],
})
export class FileUploadComponent implements OnInit {
  /** Link text */
  @Input() text = 'Image';
  /** Name used in form which will be sent in HTTP request. */
  @Input() param = 'image';
  /** Target URL for file uploading. */
  //@Input() target = 'https://file.io';
  @Input() target =
    'https://api.imgbb.com/1/upload?key=c9eb22bfa99b710b64a1a83bc979bc27';
  /** File extension that accepted, same as 'accept' of <input type="file" />.
      By the default, it's set to 'image/*'. */
  @Input() accept = 'image/*';
  /** Allow you to add handler after its completion. Bubble up response text from remote. */
  @Output() complete = new EventEmitter<string>();
  @Input() clearFileAfterUpload = false;

  public files: Array<FileUploadModel> = [];

  constructor(private _http: HttpClient) {}

  ngOnInit() {}

  onClick() {
    const fileUpload: any = document.getElementById(
      'fileUpload'
    ) as HTMLInputElement;
    fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.files.pop();
        this.files.push({
          data: file,
          state: 'in',
          inProgress: false,
          progress: 0,
          canRetry: false,
          canCancel: true,
          uploaded: false,
        });
      }
      this.uploadFiles();
    };
    fileUpload.click();
  }

  cancelFile(file: FileUploadModel) {
    file.sub?.unsubscribe();
    this.removeFileFromArray(file);
  }

  retryFile(file: FileUploadModel) {
    this.uploadFile(file);
    file.canRetry = false;
  }

  private uploadFile(file: FileUploadModel) {
    const fd = new FormData();
    fd.append(this.param, file.data);

    const req = new HttpRequest('POST', this.target, fd, {
      reportProgress: true,
    });

    file.inProgress = true;
    file.sub = this._http
      .request(req)
      .pipe(
        map((event: any) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              file.progress = Math.round((event.loaded * 100) / event.total);
              break;
            case HttpEventType.Response:
              return event;
          }
        }),
        tap((message) => {}),
        last(),
        catchError((error: HttpErrorResponse) => {
          file.inProgress = false;
          file.canRetry = true;
          return of(`${file.data.name} upload failed.`);
        })
      )
      .subscribe((event: any) => {
        if (typeof event === 'object') {
          //this.removeFileFromArray(file);
          file.canCancel = false;
          file.uploaded = true;
          this.complete.emit(event.body);
          if (this.clearFileAfterUpload) {
            this.removeFileFromArray(file);
          }
        }
      });
  }

  private uploadFiles() {
    const fileUpload = document.getElementById(
      'fileUpload'
    ) as HTMLInputElement;
    fileUpload.value = '';

    this.files.forEach((file) => {
      this.uploadFile(file);
    });
  }

  private removeFileFromArray(file: FileUploadModel) {
    const index = this.files.indexOf(file);
    if (index > -1) {
      this.files.splice(index, 1);
    }
  }
}

export class FileUploadModel {
  data!: File;
  state!: string;
  inProgress!: boolean;
  progress!: number;
  canRetry!: boolean;
  canCancel!: boolean;
  uploaded!: boolean;
  sub?: Subscription;
}
