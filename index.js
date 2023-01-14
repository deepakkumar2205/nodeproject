const express = require("express");
const fs =require("fs");
const app = express();

const PORTno = 4000;
app.get("/", function (request, response) {
  response.send("Welcome🙋‍♂️, 🌏 🎊✨🤩");
});

const date_time=()=>{
        const dateObject = new Date();
        // current date
        // adjust 0 before single digit date
        const date = (`0 ${dateObject.getDate()}`).slice(-2);
         
        // current month
        const month = (`0 ${dateObject.getMonth() + 1}`).slice(-2);
         
        // current year
        const year = dateObject.getFullYear();
         
        // current hours
        const hours = dateObject.getHours();
         
        // current minutes
        const minutes = dateObject.getMinutes();
         
        // current seconds
        const seconds = dateObject.getSeconds();
         
        // prints date & time in YYYY-MM-DD HH:MM:SS format
        // console.log(`${year}-${month}-${date} ${hours}:${minutes}:${seconds}`);
         
        // prints time in HH:MM format
        // console.log(`${hours}:${minutes}`);

        return `Date_${date}_${month}_${year}_Time_${hours}_${minutes}_${seconds}`
}

//! to crate time stamp file inside folder.
app.get("/create", function (request, response) {
  response.send({message:"File is created successfully"});
  const date=new Date()
  date_time()
  fs.writeFile(`./store-file-folder/${date_time()}.txt`,`${date}`,(err)=>{
      console.log(err);
    })
});

//! To delete time stamp file inside folder.
app.get("/delete",function(request, response){
    fs.readdir('./store-file-folder',(err,files)=>{
        if(files.lenght ==0){
            response.status(404).send({message: "Folder is Empty. Create first and then try to delete."})
        }else{
            response.send({message: `Deleted ${files.length} files from the Direcotry.`})
            if(err) throw err;
            for(const file of files){
                fs.unlinkSync('./store-file-folder/'+file)
            }
        }
    })
    
})


//! To Retrive all the text file in the particular folder.
app.get("/show",function(request, response){

    fs.readdir('./store-file-folder', async(err,files)=>{
        if(files.length ==0){
            response.status(404).send({message:'No files found, Create and try again!'} )
        }else{
            let arr=[]
            for(let file of files){
                fs.readFile(`./store-file-folder/${file}`,"utf-8",(err,data)=>{
                    if(err){
                        console.log(err)
                    }else{
                        arr.push({[file]:data})
                        if(arr.length ==files.length) response.send(arr)
                    }
                })
            }
        }
    })
})
/*
//! To Retrive all the text file in the particular folder. (Another way of approach to show)

app.get("/show",function(request, response){

   let files= fs.readdirSync('./store-file-folder')

   let arr=[];
   for (let file of files){
    let s=fs.readFileSync(`./store-file-folder/${file}`,"utf-8")
    arr.push({[file]:s})
   }
   if(arr.length ==0){
       response.status(404).send({message:'no data found'});
   }else{
       response.send(arr);
    }
})
*/

app.listen(process.env.PORT||4000, () => console.log(`The server started in: ${PORTno} ✨✨`));

