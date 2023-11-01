import axios from "axios";
import { useState } from "react";

const CreateTicket = () => {
    const [file, setFile] = useState<File | null>(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDesc] = useState('');
  
    const [isSending, setIsSending] = useState<boolean>(false); 

  
  
  
    const handleClick = async (e: { preventDefault: () => void; }) => {
      e.preventDefault()
      setIsSending(true);
  
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("description", description);
      formData.append("image", file!); 
  
      try {
        await axios.post('http://54.89.49.17/api/tickets/create', formData, {
            // await axios.post('http://localhost:3001/api/tickets/create', formData, {
           headers: {
            'Content-Type': 'multipart/form-data',
            // 'Content-Type': 'application/json',
             'Access-Control-Allow-Origin': '*'
  
           }
          });
          console.log("TICKET POSTED!")
          setIsSending(false);
  
  
      } catch(err){
        console.log(err)
        setIsSending(false);
  
      } finally {
        setIsSending(false);
      }
  
    }
  
  
    return (
      <>
        <div className="ticket-form-main">
          <form className="ticket-form" onSubmit={handleClick}>
             <h1>SUBMIT YOUR TICKET</h1>
             <input 
              required
             type="text" value={name} onChange={e => setName(e.target.value)} placeholder="name"/>
             <input 
               required
             type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email"/>
             <textarea 
              required
               value={description} onChange={e => setDesc(e.target.value)} placeholder="description"/>
             {
              isSending ?
              <h1>sending...</h1> :
              <button>submit</button>
             }
             <input style={{display: 'none', cursor: "pointer"}}
                     type='file'
                      id='file' 
                      name="image"
                      accept="image/*"
                       onChange={e => setFile(e.target.files![0])}  />
                                 <label
                     htmlFor='file' 
                     style={{
                        cursor: "pointer",
                        border: "1px solid white",
                        padding: "10px",
                        margin: "20px",
                        borderRadius: "20px",
                        backgroundColor: "white",
                        color: "black"
                        }}>Image</label>
             {file && <img src={URL.createObjectURL(file)} alt="Selected" style={{height: "200px", borderRadius: "20px", margin: "20px"}} />}
  
  
          </form>
  
        </div>
      </>
    )
  }
export default CreateTicket