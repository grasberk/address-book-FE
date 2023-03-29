import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { useState } from 'react';


// 1. When creating a AddForm component pass in a function to its props
// 2. When the form is submitted in AddForm call the function passed into its props
// 3. Create a function in App that will take into the information from the form and send it to the backend
// 4. Pass in the function from (3) to the AddForm when you are creating it.

//finish createPerson call
//when add new person refresh page withoput manual refresh
//update:
//add edit button beside delete button on card
//create a edit form to edit data
//load old info already on form
//create a update button on edit form page to save


function AddForm(props) {

  const[formdata,setFormData]=useState({
    name:null,
    age:null,
    img:null,
    phone_number:null
  })

  return (
    <Card className="block" style={{ width: "18rem" }}>
      <Card.Body>
          
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" placeholder="Enter name" onChange={(e)=>setFormData({
                ...formdata,
                name:e.target.value
                
              })}  ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Age</Form.Label>
              <Form.Control type="text" placeholder="Enter age" onChange={(e)=>setFormData({
                ...formdata,
                age:e.target.value
                
              })}></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Img</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter img link" onChange={(e)=>setFormData({
                  ...formdata,
                  img:e.target.value
                  
                })}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number" onChange={(e)=>setFormData({
                  ...formdata,
                  phone_number:e.target.value
                  
                })}
              ></Form.Control>
            </Form.Group>
            <Button onClick={()=>{props.hide()}}>Cancel</Button>
            <Button onClick={()=>{props.newPerson(formdata)}}>Submit</Button>
            
          </Form>
          
          
        
      </Card.Body>
    </Card>
  );
}

export default AddForm;
