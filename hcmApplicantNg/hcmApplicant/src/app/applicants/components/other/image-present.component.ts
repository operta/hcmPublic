import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-image-present',
  template: `
    <img [src]="imageUrl" class="img-fluid img-circle m-10"/>
  `,
  styles: []
})
export class ImagePresentComponent implements OnInit, OnChanges {
  @Input() blob: any;
  @Input() blobContentType: string;
  imageUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.imageUrl = this.generateImage();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.imageUrl = this.generateImage();
  }

  dataURItoBlob(dataURI): Blob {
    const mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const binary = atob(dataURI.split(',')[1]);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: mime});
  }

  generateImage(): SafeResourceUrl {
    const dataUrl = 'data:' + this.blobContentType + ';base64,' + this.blob;
    const objectUrl = URL.createObjectURL(this.dataURItoBlob(dataUrl));
    return this.sanitizer.bypassSecurityTrustResourceUrl(objectUrl);
  }

}
