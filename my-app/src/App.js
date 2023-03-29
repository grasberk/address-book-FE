
import './App.css';
import { useState } from 'react';
import InfoCard from './InfoCard';
import AddForm from './AddForm';
import EditForm from './EditForm';
import {AiOutlineFileAdd} from 'react-icons/ai';
import Card from 'react-bootstrap/Card';
// Move the add button to the end of the cards and make it into a plus symbol
// - When the add form card pops up. I want to pop up where the add form button used to be
// - Add a cancel button to the add form card that will close the card
// - upload the FE to github


function createPerson(data){
  
  const newPerson={
    
    "name":data.name,
    "age":data.age,
    "img":data.img,
    "phone_number":data.phone_number
  }
  return fetch("http://127.0.0.1:5000/person/create", {
    method:"POST",
    body:JSON.stringify(newPerson),
    headers:{
      "Content-Type":"application/json"
    }
    
  })

}
function editPerson(data,id,setShow){
  const person={
    
    "name":data.name,
    "age":data.age,
    "img":data.img,
    "phone_number":data.phone_number
  }
  return fetch(`http://127.0.0.1:5000/person/edit/${id}`, {
    method:"PUT",
    body:JSON.stringify(person),
    headers:{
      "Content-Type":"application/json"
    }
    
  }).then(()=>setShow({
    editstatus:false
  }))
}
function clickDelete(id){
  
  console.log("delete function called")
  fetch("http://127.0.0.1:5000/person/delete/"+id, {
    method:"DELETE"
  })
}

function reset(){
  return fetch("http://127.0.0.1:5000/reset", {method:"PUT"});
  

}

//show.status
function openForm(show,setdata){
  if (show===true){
    return <AddForm 
    
    newPerson={(data)=>{
      createPerson(data)
      .then(()=>{
      setdata({
        status:"adding person"
      });
      
    })}}

    
    ></AddForm>
    
    
  }
  else{
    return null
  }
  
  
  
}

function editForm(show,person,setShow,setdata){
  console.log("person is...")
  console.log(person)
  if(show===true){
    return <EditForm 
    // person={(data)=>{
    //   editPerson(data)
    // }}
    id={person.id}
    name={person.name}
    age={person.age}
    img={person.img}
    phone_number={person.phone_number}
    
    updateDb={(updatedData,id)=>editPerson(updatedData,id,setShow,setdata).then(()=>setdata({
      status:"updated"
    }))}

    >
    
    
      {console.log(person.name)}
      
    

    </EditForm>
  }
}
function App() {
  const [personData,setPersonData]=useState({
    personData:null
  })

  
  const[show, setShow]=useState({
    editstatus:false,
    status: false,
    formstatus:"pending"
  });
 
  

  const [data, setdata] = useState({
    result: null,
    status: "pending"
  });
  if (data.status!=="completed"){

    console.log("status null")
    fetch("http://127.0.0.1:5000")
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result);
        setdata({
          result: result,
          status:"completed"
        })
      },
    
      (error) => {
        console.log(error)
      }
    )
    
   
  }
    
  if(data.status==="completed"){
  
    return (
      
     
      <div className="App">
         
        {/* <button onClick={() => {
          setShow({
            status:!show.status
          })
          
         }
        }> AddForm</button> */}
          
          {/* {openForm(show.status,setdata)} */}
          {editForm(show.editstatus,personData.personData,setShow,setdata)}
          


         
          
        
          
          
          
      
         
          
        
        
       
       
        <div className="infocards">
          {data.result.map(person=>
          <InfoCard 
          
            id={person._id}
            name={person.name} 
            age={person.age} 
            phone_number={person.phone_number} 
            img={person.img}
           
            onDelete={(id)=>{
              clickDelete(id);
              setdata({
                status:null
              })


               }}
               onEdit={(cardData)=>{
                console.log(show.editstatus)
                setShow({
                  editstatus:true
                })
                
                setPersonData({
                  personData:cardData
                })
                console.log(show.editstatus)
               }}
               >
                
          </InfoCard>)}
          
          <button id="addForm" onClick={() => {
          setShow({
            status:!show.status
          })
          
         }
        }> <AiOutlineFileAdd id="pageB"></AiOutlineFileAdd></button>

          
          
          
          {openForm(show.status,setdata)}
        
        </div>
        
        <button onClick={()=>{
            reset().then(()=>{
              setdata({
                status:"reseting"
              });
            });
            
          }}>RESET</button>
          
       
      </div>
    );
  }
  else{
    return (<div>IS LOADING!!!!!!!</div>);
  }

  

 
  
}

export default App;
