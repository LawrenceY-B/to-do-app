import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { ITODOdata } from 'src/assets/models/todo.model';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'to-do';
  text!: string;
  status = false;
  isSaved = false;

  showCompleted = false;


  num!: number




  // complete: ITODOdata[]=[]
  // active: ITODOdata[]=[]
  results: ITODOdata[] = []
  tempresults: ITODOdata[] = []

  constructor() {
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
      console.log(this.results);
  console.log(this.tempresults);

     

      

    }
    this.tempresults=this.results
    console.log(this.text)
  console.log(this.results);
  console.log(this.tempresults);
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
    console.log(this.results)
    console.log(this.tempresults)
    
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
    console.log(this.tempresults)
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
    console.log(this.results)
    console.log(_temp)
    console.log(this.tempresults)
    
  }


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.results, event.previousIndex, event.currentIndex);
    this.tempresults = this.results
  }
}

