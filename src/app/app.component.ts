import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, HostListener, OnInit } from '@angular/core';
import { ITODOdata } from 'src/assets/models/todo.model';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'to-do';
  text!: string;
  status = false;
  isSaved = false;
  isDarkTheme = false;
  showCompleted = false;


  num!: number

  results: ITODOdata[] = []
  tempresults: ITODOdata[] = []

  circle!: HTMLDivElement;

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const x = event.clientX;
    const y = event.clientY;

    this.circle.style.top = y + -13+ 'px';
    this.circle.style.left = x + -10+'px';
    
    const cursorSize = 60;
    const target = event.target as HTMLElement;
    const isLink = target.tagName === 'P';

    if (isLink) {
      this.circle.style.width = cursorSize + -13 + 'px';
      this.circle.style.height = cursorSize + -10+'px';
      this.circle.style.top = y + -23+ 'px';
      this.circle.style.left = x + -20+'px';
      this.circle.style.border = '3px solid white';
      this.circle.style.mixBlendMode = 'difference';
    } else {
      this.circle.style.width = '20px';
      this.circle.style.height = '20px';
      this.circle.style.border = 'none';
      this.circle.style.mixBlendMode = 'normal';
    }

  
  }
  ngOnInit(): void {
    const circleElement = document.querySelector('.circle');
    if (circleElement) {
      this.circle = circleElement as HTMLDivElement;
    }
    this.detectColorScheme();
  }
  detectColorScheme(){
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  if (darkModeMediaQuery.matches) {
    this.isDarkTheme = true;
  }
  }
  switchTheme() {
    this.isDarkTheme = !this.isDarkTheme;
  }

  submit_todo(e: any) {
    //push the todo to instance results
    if (e.key === 'Enter') {
      const todo: ITODOdata = {
        name: this.text,
        isComplete: this.isSaved,
        id: uuidv4()
      };
      // document.getElementById("submitbtn")!.click();
      this.tempresults.push(todo);
      (e.target as HTMLInputElement).value = '';

  
    }
    this.tempresults=this.results
 
    this.num = this.results.length
    
  }

  //change the color of the div and change value of showCompleted
  changecolor(path: HTMLElement, item: ITODOdata) {
    const elem = this.results.find(_item => item.id === _item.id);
    if (elem) elem.isComplete = true;

    if (!this.status) {
      path.style.background = "linear-gradient( 270deg,  #57ddff 24.85%, #c058f3 74.37%)";
      // change status to true
      this.status = true;
      //find index of selected item
      const itemIndex = this.results.indexOf(item);
      //change isComplete to true
      this.results[itemIndex].isComplete = true;
    }
    else {
      //change status to false and change color of button
      this.status = false;
      path.style.background = "transparent";
      //change status of isComplete to false
      const itemIndex = this.results.indexOf(item);
      this.results[itemIndex].isComplete = false;
    }
  }

  remove_todo(item: ITODOdata) {
    const itemIndex = this.results.indexOf(item);
    if (itemIndex > -1) {
      //apparently i have to splice to remove, failed miserably in thinking i could change how pop works
      
      this.tempresults.splice(itemIndex, 1);
    }
    this.tempresults=this.results
  
    
  }

  filterCompleted() {
    this.tempresults = []

    for (const item of this.results) {
      if (item.isComplete == true) {
        // this.complete.push(item);
        this.tempresults.push(item)
      }
    }


    this.showCompleted = true;
  }
  filterActive() {
    this.tempresults = []


    for (const item of this.results) {
      if (item.isComplete == false) {
        this.tempresults.push(item)
      }
    }
    
    this.showCompleted = false;
  }

  all() {
    this.tempresults = this.results
  }

  clearCompleted() {

    const _temp = []
    for (let item of this.results) {
      if (item.isComplete != true) {
        _temp.push(item)
      }
    }
    this.results=_temp
    this.tempresults = _temp
    this.num = this.results.length
  
    
  }


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.results, event.previousIndex, event.currentIndex);
    this.tempresults = this.results
  }
}

