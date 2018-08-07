import {
    AfterViewInit, Component, ElementRef, forwardRef, Input, NgZone, OnDestroy,
    ViewChild
  } from '@angular/core';
  import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
  
  declare let tinymce: any;
  
  export const TINYMCE_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SimpleTinyComponent),
    multi: true
  };
  
  @Component({
    selector: 'simple-tiny',
    template: `<textarea #textArea [value]="value"></textarea>`,
    providers: [TINYMCE_VALUE_ACCESSOR]
  })
  export class SimpleTinyComponent implements AfterViewInit, OnDestroy,  ControlValueAccessor {
    @Input() elementId: String;
  
    @ViewChild('textArea') textArea: ElementRef;
  
    editor: any;
  
    value: string;
  
    status:string;
    onChange = (_: any) => { };
  
    constructor(private zone: NgZone) {}
  
    writeValue(value: any): void {
      this.value = value;
     // this.status = status;
      if (this.editor) {
        this.editor.setContent(value);
      }
     // console.log("Status : "+this.status);
    }
  
    ngAfterViewInit() {
      tinymce.init({
        target: this.textArea.nativeElement,
        //plugins: ['link', 'paste', 'table'],
      //  toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist  outdent indent | link image | forecolor backcolor emoticons',
       // toolbar2: 'print preview media ',
       toolbar: "fontsizeselect,code,widgets,preview,media,insertdatetime,table,image,forecolor backcolor,anchor,ltr rtl",
       plugins: "paste,code,table,visualblocks,media,print,preview,charmap,textpattern,insertdatetime,importcss,hr,fullscreen,table,emoticons,image imagetools,layer,textcolor colorpicker,anchor,autolink,autoresize,codesample,contextmenu,directionality",
      // contextmenu: "link image inserttable | cell row column deletetable",
      // height:200,
      // autoresize_max_height: 300,
        setup: editor => {
          this.editor = editor;
          editor.on('keydown', () => {
            const content = editor.getContent();
           // console.log(Zone.current.name);
           this.onChange(content);
            //this.zone.run(() => this.onChange(content))
          });
          editor.on('change', () => {
            const content = editor.getContent();
           // console.log(Zone.current.name);
           this.onChange(content);
            //this.zone.run(() => this.onChange(content))
          });
          
        }
      });
    }
  
    registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
    registerOnTouched(fn: () => void): void { }
  
    ngOnDestroy() {
      tinymce.remove(this.editor);
    }
  }
  