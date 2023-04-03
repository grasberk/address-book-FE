
import './App.css';
import { useState } from 'react';
import InfoCard from './InfoCard';
import AddForm from './AddForm';
import EditForm from './EditForm';
import {BsPlusLg} from 'react-icons/bs';


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
function openForm(show,setdata,setform,setbutton){
  if (show===true){
    return <AddForm 
    
    newPerson={(data)=>{
      createPerson(data)
      .then(()=>{
      setdata({
        status:"adding person"
      });
      setform({
        addFormVisibility:false
      })
      setbutton(true)
      
    })}}
    hide={()=>{
      console.log(show)
      setform({
        addFormVisibility:false
      })
      setbutton(true)
      
      
    }}
    
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
  const[showAddButton,setShowAddButton]=useState(true);

  function toggleButton(){
    return setShowAddButton(!showAddButton)
  };

  const [personData,setPersonData]=useState({
    personData:null
  })

  
  const[formVisibility, setFormVisibility]=useState({
    editFormVisibility:false,
    addFormVisibility: false
    
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
         
      
         
          {editForm(formVisibility.editFormVisibility,personData.personData,setFormVisibility,setdata)}

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
                console.log(formVisibility.editFormVisibility)
                setFormVisibility({
                  editFormVisibility:true
                })
                
                setPersonData({
                  personData:cardData
                })
                console.log(formVisibility.editFormVisibility)
               }}
               >
                
          </InfoCard>)}
          <div id="addButton">

          
          <button style={{display: showAddButton ? "block": "none"}}id="addForm" onClick={() => {
       
          toggleButton()
          setFormVisibility({
            addFormVisibility:!formVisibility.addFormVisibility
          })
          
         }
        }> 
       
        <BsPlusLg id="plusIcon" ></BsPlusLg></button>
        </div>
        {console.log("state of add button")}
        {console.log(showAddButton)}
          
          
          
          {openForm(formVisibility.addFormVisibility,setdata,setFormVisibility,setShowAddButton)}
        
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
