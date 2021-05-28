const validator = require("validator");
const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes");

// Customize yargs version
yargs.version("1.1.0");

// Create add command
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder:{
    title:{
      describe:"New Title",
      demandOption:true,
      type:'string'
    },
    body:{
      describe:"New Body",
      demandOption:true,
      type:"string"
    }
  },
  handler(argv) {
    notes.addNote(argv.title,argv.body)
  },
});


// Create a remove command
yargs.command({
    command:'remove',
    describe:'Remove a note',
    builder:{
      title:{
        describe:"Removing a note",
        demandOption:true,
        type:'string'
      }
    },
    handler(argv){
        notes.removeNote(argv.title)
    }
})


// Create list command
yargs.command({
    command: "list",
    describe: "List the notes",
    handler() {
      notes.listNotes()
    },
  });
  
  
  // Create a read command
  yargs.command({
      command:'read',
      describe:'Read a note',
      builder:{
        title:{
          describe:"Reading a note",
          demandOption:true,
          type:'string'
        }
      },
      handler(argv){
          notes.readNote(argv.title)
      }
  })

yargs.parse()
//console.log(yargs.argv)
/* const msg=get()
console.log(msg);

console.log(validator.isEmail('mith@example.com'))
console.log(validator.isURL('mead.io'))
console.log(chalk.blue.bold.inverse("Success!!")) */
