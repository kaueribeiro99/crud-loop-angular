import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { icons } from 'src/assets/icons';

@Component({
  selector: 'app-icon-selector',
  templateUrl: './icon-selector.component.html',
  styleUrls: ['./icon-selector.component.css']
})
export class IconSelectorComponent implements OnInit {

  @ViewChild('gallery',{static:false})
  gallery ?: ElementRef;

  iconPath:string = "https://cdn.readymix.io/img/icons/";
  icons: string[] = icons;

  @Input()
  disable: boolean = false;

  @Input()
  selectedIcon?: string;

  @Input()
  position: string = 'top';

  @Input()
  onIconSelected = (icon:string) => {};

  displayGallery : boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toggleGallery() {
    this.displayGallery = !this.displayGallery;
  }

  public showSelectedIcon():string{
    if(this.selectedIcon == null){
      return this.icons[0];
    }
    return this.selectedIcon;
  }

  selectIcon(icon:string){
    this.onIconSelected(icon);
    this.displayGallery = false;
  }

}
