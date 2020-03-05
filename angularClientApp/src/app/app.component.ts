import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  readonly ROOT_URL = 'http://localhost:5000'   
  directoryArray:any = [];    
  title = 'clientApp';  
  posts: any;
 
  constructor(private http: HttpClient){}
    
  getRoot(){
    //cleanup the stack
    if(this.directoryArray.length  >= 1)
    {     
      for(let i = this.directoryArray.length; i >= 1; i--){
        this.directoryArray.pop();
        console.log('POP');
        console.log("this.directoryArray[ " + i + "] = " + this.directoryArray[i]);
      }     
    }

    this.directoryArray.push(this.ROOT_URL + "/");    
    console.log("[length] = " + (this.directoryArray.length));    
    this.posts = this.http.get(this.directoryArray[this.directoryArray.length -1], {}) 
    return this.posts;            
  }

  refreshOneBack(){
    if(this.directoryArray.length > 1)
    {
      this.directoryArray.pop();       
      console.log("[length] = " + (this.directoryArray.length));  
      this.posts = this.http.get(this.directoryArray[this.directoryArray.length -1], {}) 
    }
  }

  refreshForward(userInput){
    if(!userInput.includes("."))
    {
      try {        
        this.directoryArray.push(this.directoryArray[this.directoryArray.length-1] + userInput + "/");     
        console.log("[length] = " + (this.directoryArray.length));           
        this.posts = this.http.get(this.directoryArray[this.directoryArray.length -1], {})       
      } catch (error) {
        console.log("Empty directory");
      }      
    }
    else{

      //Could add file download here if desired.

    }  
  }
}
