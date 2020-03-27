class Note {
  constructor(title) {
    this.title = title;
    // HINT🤩 this.element = this.createElement(title);
    this.element = this.createElement(title);
  }
  
  createElement(title){
    let newNote = document.createElement('div');
    newNote.setAttribute("class", "card");
    
    let newP = document.createElement("p");
    newP.innerHTML = title;

    let newA = document.createElement("a");
    newA.innerHTML = "Remove";
    newA.setAttribute("class", "card-remove");
    newA.setAttribute("href", "#");

    newNote.appendChild(newP);
    newNote.appendChild(newA);
    
    // HINT🤩 a.addEventListener('click', this.remove.bind(newNote));

    newA.addEventListener('click', this.remove.bind(newNote));
    newA.addEventListener('click', this.saveToStorage.bind(newNote));
    
    return newNote;
  }
  
  add(){
    // HINT🤩
    // this function should append the note to the screen somehow
    document.querySelector(".notes").appendChild(this.element);
  }
  
  saveToStorage(){
    // HINT🤩
    // localStorage only supports strings, not arrays
    // if you want to store arrays, look at JSON.parse and JSON.
    localStorage.setItem('todo', this);
  }
  
  remove(){
    // HINT🤩 the meaning of 'this' was set by bind() in the createElement function
    // in this function, 'this' will refer to the current note element
    this.remove();
  } 
}

class App {
  constructor() {
    console.log("👊🏼 The Constructor!");
  
    // HINT🤩
    // clicking the button should work
    // pressing the enter key should also work
    // this.btnAdd = ???
    this.btnAdd = document.querySelector("#btnAddNote");
    // this.btnAdd.addEventListener("click", this.createNote.bind(this));
    this.btnAdd.addEventListener("click", this.createNote.bind(this));

    const enter = () => {this.createNote()};
    this.fieldAdd = document.querySelector("#txtAddNote");
    this.fieldAdd.addEventListener("keyup", function(e) {
      if(e.keyCode === 13){
        console.log("key");
        enter();
        e.preventDefault();
      };
    });
    // this.loadNotesFromStorage();
  }
  
  loadNotesFromStorage() {
    // HINT🤩
    // load all notes from storage here and add them to the screen
    // something like note.add() in a loop would be nice
  }
   
  createNote(e){
    // this function should create a new note by using the Note() class
    // HINT🤩
    let text = document.querySelector("#txtAddNote").value;
    // note.add();
    let note = new Note(text);
    note.add();
    // note.saveToStorage();
    // this.reset();
  }
  
  reset(){
    // this function should reset the form 
  }
  
}

let app = new App();