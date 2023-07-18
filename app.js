// Task1: initiate app and run server at 3000

const express=require('express');
const app=new express();
const router = express.Router();
const path=require('path');

require('dotenv').config();
const PORT=process.env.PORT;

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));
app.use("/api", router);

// Task2: create mongoDB connection 

const mongoose=require('mongoose');
mongoose.connect(process.env.mongodb_url)
.then(()=>{
    console.log('Successfully connected to DB')
})
.catch(()=>{
    console.log('Error Connecting')
})

const EmployeeSchema=mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      position: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
      salary: {
        type: Number,
      }
});
const EmployeeData=mongoose.model('employee1',EmployeeSchema);

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below

//TODO: get data from db  using api '/api/employeelist'

router.get("/employeelist", async (req, res) => {
    try {
      const data = await employeeData.find();
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json("Cannot Get the data");
    }
  });


//TODO: get single data from db  using api '/api/employeelist/:id'

router.get("/employeelist/:id", async (req, res) => {
    try {
      const eId = req.params.id;
      console.log(eId);
      const data = await employeeData.findById(eId);
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json("Cannot Get");
    }
  });

//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

router.post("/employeelist", async (req, res) => {
    try {
      const item = req.body;
      console.log(item);
      const newData = employeeData(item);
      const saveData = await newData.save();
      res.status(200).json("Post Successful");
    } catch (error) {
      res.status(400).json("Unable to post");
    }
  });


//TODO: delete a employee data from db by using api '/api/employeelist/:id'

router.delete("/employeelist/:id", async (req, res) => {
    try {
      const eId = req.params.id;
      console.log(eId);
      const deleted = await employeeData.findByIdAndDelete(eId);
      console.log("Deleted");
      res.send(deleted);
    } catch (error) {
      res.status(400).json("Unable to delete");
    }
  });



//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

router.put("/employeelist", async (req, res) => {
    try {
      const item = req.body;
  
      const eId = req.body._id;
      if (!req.body.name || !req.body.location || !req.body.position) {
        return res.status(400).json("All fields are required");
      }
  
      const updateData = {
        $set: {
          name: req.body.name,
          location: req.body.location,
          position: req.body.position,
          salary: req.body.salary,
        },
      };
      console.log(updateData);
      const updated = await employeeData.findByIdAndUpdate(eId, updateData);
      res.send(updated);
    } catch (error) {
      console.log(error.message);
      res.status(400).json("Unable to update");
    }
  });



//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});


app.listen(PORT,(req,res)=>{
    console.log(`Server running on port ${PORT}`)
})
