import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';

declare var cloudinary: any;

@Component({
  selector: 'shared-image-uploader',
  templateUrl: './image-uploader.component.html',
})
export class ImageUploaderComponent {

  @Input() public cloudName: string = 'dorzoyrw8';
  @Input() public uploadPreset: string = 'my-assets';
  @Input() public folder: string = 'root';
  @Input() public cropping: boolean = false;
  @Input() public multiple: boolean = false;
  @Input() public autominimize: boolean = true;
  @Input() public showAdvancedOptions: boolean = false;

  @Input() public isDisabled: boolean = false;

  @Input() public theme: 'dark' | 'light' = 'light';

  @Output() public onResponse: EventEmitter<any> = new EventEmitter();


  darkStyle: any = {
    palette: {
        window: "#0E131F",
        sourceBg: "#0E131F",
        windowBorder: "#8E9FBF",
        tabIcon: "#FFFFFF",
        inactiveTabIcon: "#8E9FBF",
        menuIcons: "#2AD9FF",
        link: "#08C0FF",
        action: "#1D71B9",
        inProgress: "#00BFFF",
        complete: "#33ff00",
        error: "#EA2727",
        textDark: "#000000",
        textLight: "#FFFFFF"
    },
    frame: {
      background: "#0E2F5B99"
    },
    fonts: {
        default: null,
        "'Space Mono', monospace": {
            url: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
            active: true
        }
    }
}
  lightStyle: any = {
    palette: {
        window: "#FFFFFF",
        windowBorder: "#90A0B3",
        tabIcon: "#0078FF",
        menuIcons: "#5A616A",
        textDark: "#000000",
        textLight: "#FFFFFF",
        link: "#0078FF",
        action: "#FF620C",
        inactiveTabIcon: "#0E2F5A",
        error: "#F44235",
        inProgress: "#0078FF",
        complete: "#20B832",
        sourceBg: "#E4EBF1"
    },
    frame: {
      background: "#0E2F5B99"
    },
    fonts: {
        default: null,
        "'Fira Sans', sans-serif": {
            url: "https://fonts.googleapis.com/css?family=Fira+Sans",
            active: true
        }
    }
}

  private http = inject(HttpClient);

  private widgetEs : any;

  ngOnInit() {
    this.http.get('/assets/cloudinary-es.json').subscribe(res => this.widgetEs = res);
  }

  onUpload() {
    cloudinary.openUploadWidget({
      cloudName: "dqtn4nmlh",
      uploadPreset: "my-assets",
      folder: this.folder,
      sources: [
          "local",
          "camera",
          "url",
          "google_drive",
          "unsplash",
      ],
      showAdvancedOptions: this.showAdvancedOptions,
      cropping: this.cropping,
      multiple: this.multiple,
      autoMinimize: this.autominimize,
      singleUploadAutoClose: true,
      defaultSource: "local",
      language: 'es',
      text: {
        "es": this.widgetEs.es
      },
      button_class: "ud_button inline no_margin",
      thumbnails: ".feature_thumb",
      thumbnail_transformation: { width: 100, height: 100, crop: "fit" },
      styles: this.theme === 'dark' ? this.darkStyle : this.lightStyle
  },
   (err: any, info: any) => {
     if (!err) {
       this.onResponse.emit(info);
     }
    });
  }

}
