const fs = require("fs");
const chalk=require("chalk")
const readNote=(title)=> {
  const notes=loadNotes()
  const note = notes.find((note)=>note.title===title)
  if(note){
    console.log(chalk.inverse(note.title))
    console.log(note.body)
  }else{
    console.log(chalk.red.inverse('No note found'))
  }
}

const addNote =  (title, body) =>{
  const notes = loadNotes();
  //const duplicateNotes = notes.filter( (note) =>note.title === title)  //even it find in 1s position, it will check for rest of the notes
  const duplicateNote = notes.find((note)=>note.title===title)
  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("New note added!"));
  } else {
    console.log(chalk.red.inverse("Note title already taken!"));
  }
};

const removeNote = (title)=>{
    const notes = loadNotes()
    const notesToKeep = notes.filter((note)=>note.title!==title)
    //console.log(notesToKeep)
    
    if(notesToKeep.length>=notes.length){
        console.log(chalk.red.inverse("Note with title "+title+" not present in notes json, hence cannot be removed"))
    }else{
        saveNotes(notesToKeep)
        console.log(chalk.green.inverse("Note removed!"))
    } 
}

const listNotes = ()=>{
  console.log(chalk.inverse('Your Notes'))
  const notes = loadNotes()
  notes.forEach(note => {
      console.log(note.title)
  });
}

const saveNotes =  (notes)=> {
  const stringData = JSON.stringify(notes);
  fs.writeFileSync("notes.json", stringData);
};

loadNotes = ()=> {
  try {
    const bufferData = fs.readFileSync("notes.json");
    const data = bufferData.toString();
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
};

module.exports = {
  readNote,
  addNote,
  removeNote,
  listNotes
};
