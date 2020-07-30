const express=require('express');
const cors=require('cors');
const mysql=require('mysql');
const app=express();


var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'syam0884',
    insecureAuth:true,
    database:'employee',
    multipleStatement:true

})

const emp='select * from employee';
app.use(cors());
connection.connect(err => {
    if (err) {
        return err;
    }
})
app.get('/',(req,res)=>{
    connection.query(emp,(err,results)=>{
        if(err){
            return res.send(err)
        }
        else{
            return res.json({
                data:results
            })
        }
    })
})






app.patch("/",(req,res)=>{
    let emp=req.body
    console.log(emp);
    connection.query("insert into employee values (?)",[req.body.emp],(err,results)=>{
        if(!err)
            res.send(results)

        else
            console.log(err);
    })
})


app.delete('/:id',(req,res)=>{
    connection.query('delete from employee where empid=?',[req.params.id],(err,results)=>{
        if(!err)
            res.send("delete success")
        else
            console.log(err);
    })
})


app.listen(4000,()=> {
    console.log("it is success on port 4000");
})
