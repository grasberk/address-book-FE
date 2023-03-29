import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { useState } from 'react';





function EditForm(props) {

  const[formdata,setFormData]=useState({
    id:props.id,
    name:props.name,
    age:props.age,
    img:props.img,
    phone_number:props.phone_number
  })

  return (
    <Card className="block" style={{ width: "18rem" }}>
      <Card.Body>
          {console.log(formdata)}
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" placeholder="name" defaultValue={props.name} onChange={(e)=>setFormData({
                ...formdata,
                name:e.target.value
                
              })}  ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Age</Form.Label>
              <Form.Control type="text" placeholder="Enter age" defaultValue={props.age} onChange={(e)=>setFormData({
                ...formdata,
                age:e.target.value
                
              })}></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Img</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter img link" defaultValue={props.img} onChange={(e)=>setFormData({
                  ...formdata,
                  img:e.target.value
                  
                })}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number" defaultValue={props.phone_number} onChange={(e)=>setFormData({
                  ...formdata,
                  phone_number:e.target.value
                  
                })}
              ></Form.Control>
            </Form.Group>
            <Button onClick={()=>{props.updateDb(formdata,props.id)}}>Submit</Button>
            
          </Form>
          
          
        
      </Card.Body>
    </Card>
  );
}

export default EditForm;
