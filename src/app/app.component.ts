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
  results: ITODOdata[] = []
  constructor() {
  }
  submit_todo(e: any) {
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
  //push the todo to instance results then send to local storage
}

