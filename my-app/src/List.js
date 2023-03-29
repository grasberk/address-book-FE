import { useState } from "react";


function List(){
    const [data, setdata] = useState({
        result: null,
        status: null
      });
      if (data.status===null){
        setdata({
          ...data,
          status:"pending"
        });
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
        let people=[]
        for (const person of data.result){
         people.push(<li>{person.name}</li>) 

       }
        return(
            <div>
                {people}
                 
                
              
                
            </div>
                
        );
      }


}


export default List