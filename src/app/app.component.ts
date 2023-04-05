import { Component } from '@angular/core';
import { ITODOdata } from 'src/assets/models/todo.model';

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
  showAll=true;
  showActive = false;
  showComplete=false;
  num!:number
  complete:ITODOdata[]=[]
  active:ITODOdata[]=[]
  results: ITODOdata[] = []
  
  constructor() {
  }
  submit_todo(e: any) {
    //push the todo to instance results
    if (e.key === 'Enter') {
      const todo: ITODOdata = {
        name: this.text,
        isComplete: this.isSaved,
      };
      this.results.push(todo);
      document.getElementById("submitbtn")!.click();
      //convert type ITODOdata to json string
      const todoString = JSON.stringify(todo);
    }
    this.num = this.results.length
  }

  //change the color of the div and change value of isCompleted
  changecolor(path: HTMLElement, item: ITODOdata) {
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
      this.results.splice(itemIndex, 1);
    }
    console.log(this.results)
  }

  filterCompleted() {
    console.log(this.results)
    for (const item of this.results) {
      if(item.isComplete==true){
        this.complete.push(item);
        console.log(this.complete)
      }
    }
    this.showComplete=true;
    this.showActive=false;
    this.showAll=false;
  }
  filterActive() {
    console.log(this.results)
    for (const item of this.results) {
      if(item.isComplete==false){
        this.active.push(item);
        console.log(this.active)
      }
    }
    this.showAll=false;
    this.showComplete=false;
    this.showActive=true;
  }
  clearCompleted() {
    this.complete.length=0;
    for(let item of this.results)
    {
      if(item.isComplete==true){
        const itemIndex = this.results.indexOf(item);
          this.results.splice(itemIndex, 1);
      }
    }
    this.num=this.results.length
    console.log(this.results)
  }

  

}

