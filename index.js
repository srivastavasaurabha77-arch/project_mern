import express, { response } from 'express';
import mongoose from 'mongoose';
import pschema from './models/RegPatient.js';
import enquirymodel from './models/Enqpatient.js';
import cors from 'cors'
const app = express();
app.use(cors())
app.use(express.json())
mongoose.connect("mongodb://localhost:27017/smsdb")

app.listen(5050,()=>{
    console.log("Express Server is Started.")
})
 //add patient
  app.post("/addpatient",(req,res)=>{
    pschema.create(req.body).then(response=>res.json(response)).catch(err=>res.json(err))
  })

  //add enquiry
   app.post("/enqpatient",(req,res)=>{
    enquirymodel.create(req.body).then(response=>res.json(response)).catch(err=>res.json(err))
  })

  // add Enquires
   app.post("/enquirepatient",(req,res)=>{
    enquirymodel.create(req.body).then(response=>res.json(response)).catch(err=>res.json(err)) 
   })


 // Manage Patient
  app.get("/managapatient",(req,res)=>{
    pschema.find(req.body).then(response=>res.json(response)).catch(err=>res.json(err))
  })

  //Delete Patient
  app.delete("/deletepatient/:id",(req,res)=>{
    const id = req.params.id
    pschema.findByIdAndDelete({_id:id}).then(result=>res.json(result)).catch(err=>res.json(err))
  })

  // Update Single page
 app.get("/singlepatient/:id",(req,res)=>{
    const id = req.params.id
    pschema.findById({_id : id }).then(sres=>res.json(sres)).catch(err=>res.json(err))
}) 
//to update record
app.put("/updatepatient/:id",(req,res)=>{
    const id = req.params.id
    pschema.findByIdAndUpdate({_id:id},{pname:req.body.pname,page:req.body.page,pgender:req.body.pgender,pcontact:req.body.pcontact,pemail:req.body.pemail,paddress:req.body.paddress,pdisease:req.body.pdisease}).then(sres=>res.json(sres)).catch(err=>res.json(res))
})
//show enquery
 app.get("/allenquiry",(req,res)=>{
    enquirymodel.find(req.body).then(response=>res.json(response)).catch(err=>res.json(err))
  })
