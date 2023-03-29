import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './myStyles.css'
import 'bootstrap/dist/css/bootstrap.min.css';




function InfoCard(props){
    return(
      
      <div>
  
        <Card className="block"  style={{ width: '18rem' }}>
            
            <Card.Img src={props.img} width={100}/>
            
         
          <Card.Body>
            <Card.Title>{props.name}</Card.Title>
            <Card.Text>
                 
                ID:{props.id}<br></br>
                Age:{props.age}<br></br>
                Phone Number:{props.phone_number}
             
            </Card.Text>
            <Button variant="outline-danger" onClick={()=>props.onEdit(props)} >Edit</Button>
            <Button variant="outline-danger" onClick={()=>{props.onDelete(props.id)}}>Delete</Button>
          </Card.Body>
        </Card>
          
          
          
        
         
          
          
          
      </div>
      
    );
   
    
  }
  
  
  export default InfoCard;
  
  

  