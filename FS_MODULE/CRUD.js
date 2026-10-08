//Perform CRUD operations
import fs from 'fs'
const fileName="student.txt";
async function createFile(){
    try{
        await fs.writeFile(fileName, "Name : Harshit Sahu \n Class :CSE - 21" ,"utf-8");
        console.log("file created.....");
    }
    catch(err){
        console.log("error", err.message);
    }
    
}

//read file
async function readFile() {
    try {
        await fs.readFile(fileName, "\nCourse : B.tech", "utf-8");
        console.log("File Content\n");
    }
    catch(err){
        console.log("error, err.message");
    }
}

// Delete file
async function deleteFile() {
    try{
        fs.unlink(fileName, "utf-8");
        console.log("File Deleted...")
    }    
    catch(err){

    }
}

//Execute a crud function
async function main() {
    await createFile();
    await readFile();
    await deleteFile();
}

main();
