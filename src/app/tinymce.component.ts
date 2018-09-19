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
    tinyid:any='';
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
       //  auto_focus:true,
        max_chars : "1500",
        max_chars_indicator : "lengthBox",
        setup: editor => {
          this.editor = editor;
          editor.on('keydown', (e) => {
            var allowedKeys = [8, 37, 38, 39, 40, 46];
            if (allowedKeys.indexOf(e.keyCode) != -1) return true;
            if (editor.getContent().length + 1 > 1500) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
            /*let len = tinymce.get(tinymce.activeEditor.id).contentDocument.body.innerText.length;
            if(this.tinyid !=''){
              $('#' + this.tinyid).prev().find('.char_count').text(len + '/' + editor.settings.max_chars);
            }*/
            const content = editor.getContent();
           // console.log(Zone.current.name);
           if(content.length > 1500){
             //alert("you have exceeded the charcter");
            // return false;
           }
           this.onChange(content);
            //this.zone.run(() => this.onChange(content))
          });
          editor.on('change', () => {
            const content = editor.getContent();
            if(content.length > 1500){
              //alert("you have exceeded the count");
              //return false;
            }
           // console.log(Zone.current.name);
           this.onChange(content);
            //this.zone.run(() => this.onChange(content))
          });
          
        },
        init_instance_callback: function () { // initialize counter div
         // $('#' + this.id).prev().append('<div class="char_count" style="text-align:right"></div>');
          //this.tinymce_updateCharCounter(this, this.tinymce_getContentLength());
         // let len = tinymce.get(tinymce.activeEditor.id).contentDocument.body.innerText.length;
         // console.log("Id : "+this.id);
          //this.tinyid = this.id;
         // $('#' + this.id).prev().find('.char_count').text(len + '/' + this.settings.max_chars);
        },
        paste_preprocess: function (plugin, args) {
          var editor = tinymce.get(tinymce.activeEditor.id);
          var len = editor.contentDocument.body.innerText.length;
          var text = $(args.content).text();
          console.log("Length : "+len);
          console.log("text : "+text);
          if (len + text.length > editor.settings.max_chars) {
              alert('Pasting this exceeds the maximum allowed number of ' + editor.settings.max_chars + ' characters.');
              args.content = '';
          } else {
            //let len = tinymce.get(tinymce.activeEditor.id).contentDocument.body.innerText.length;
            // $('#' + this.id).prev().find('.char_count').text(len + '/' + editor.settings.max_chars);
            //  this.tinymce_updateCharCounter(editor, len + text.length);
          }
        },
        /*paste_preprocess: (plugins,args) => { 
          var contentContentLenght = this.editor.getContent().length; 
          var data = args.content; if (data.length > (1500 - contentContentLenght)) { 
            args.content=data.substring(0,1510 - contentContentLenght);
          } 
        },*/
      });
      
    }
  
    registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
    registerOnTouched(fn: () => void): void { }
  
    ngOnDestroy() {
      tinymce.remove(this.editor);
    }
  tinymce_updateCharCounter(el, len) {
      $('#' + el.id).prev().find('.char_count').text(len + '/' + el.settings.max_chars);
  }
  
   tinymce_getContentLength() {
      return tinymce.get(tinymce.activeEditor.id).contentDocument.body.innerText.length;
    }
  }
  