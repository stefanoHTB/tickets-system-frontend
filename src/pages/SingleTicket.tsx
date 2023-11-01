import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

export interface Ticket {
    _id: string;
    name: string;
    email: string;
    description: string;
    status: string;
    awsUrl: string;
    imgUrl: string;

    answers: Array<{
        _id: string;
        answer: string;
      }>;
}


const SingleTicket = () => {
    const [ticket, setTicket]: [Ticket, (post: Ticket) => void] = useState<Ticket>({} as Ticket)

    const location = useLocation()
    const ticketId = location.pathname.split("/")[2]

    const [answer, setAnswer] = useState('');

    const [newStatus, setNewStatus] = useState<string>('new');

    const [isSending, setIsSending] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const [isSending2, setIsSending2] = useState<boolean>(false); 
    const [showPopup2, setShowPopup2] = useState(false);




    useEffect(() => {
        const fetchData = async () => {
            try {
              const res = await axios.get(`http://54.89.49.17/api/tickets/${ticketId}`,
                // const res = await axios.get(`http://localhost:3001/api/tickets/${ticketId}`,
                { headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Access-Control-Allow-Origin': '*'
                  },
                })
                setTicket(res.data)
                console.log(res.data, 'single')
            } catch (err){
                console.log(err)
            }
        };
        fetchData();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },[ticketId, answer, newStatus ])



    const handleClick = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        setIsSending(true)
        const formData = new FormData();
        formData.append("answer", answer);
        formData.append("ticketId", ticket._id);
        try {
          await axios.post('http://54.89.49.17/api/answer', formData, {
           // await axios.post('http://localhost:3001/api/answer', formData, {
                headers: {
                 'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*'
                }
               });

               console.log("Answer sent!")
               setAnswer('')
               setShowPopup(true);

               setIsSending(false)

               setTimeout(() => {
                setShowPopup(false);
              }, 3000);


        } catch(err){
            console.log(err)
        } finally {
            setIsSending(false)

        }


    }


    const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewStatus(e.target.value);
      };


    const handleClick2 = async () => {
        // e.preventDefault();
        setIsSending2(true)
        const formData = new FormData();
        formData.append('newStatus', newStatus);
        formData.append('ticketId', ticket._id);

        try {
          // const response = await axios.put(`http://localhost:3001/api/update-status`, formData, {
            const response = await axios.put(`http://54.89.49.17/api/update-status`, formData, {
              headers: {
                'Content-Type': 'application/json',
              },
            });
      
            if (response.status === 200) {
              setIsSending2(false)
              setShowPopup2(true)
              console.log('Status updated successfully');
              setTimeout(() => {
                setShowPopup2(false);
              }, 3000);


            } else {
              console.error('Failed to update status');
              setIsSending2(false)

            }

          } catch (error) {
            console.error('An error occurred:', error);
          } finally {
            setIsSending2(false)
          }
        };
    
    


  return (
    <div className="single-ticket-main">
    <div className="single-ticket">
        <div>

        
        <h3>TICKET NUMBER: {ticket._id}</h3>
        <h3>STATUS: {ticket.status}</h3>
        <h3>NAME: {ticket.name}</h3>
        <h3>EMAIL: {ticket.email}</h3>
        </div>
        <div className="update-status-form">
        <form onSubmit={handleClick2} className="update-status-form">
      <label>
        <input
          type="radio"
          value="new"
          checked={newStatus === 'new'}
          onChange={handleStatusChange}
        />
        New
      </label>

      <label>
        <input
          type="radio"
          value="inProgress"
          checked={newStatus === 'inProgress'}
          onChange={handleStatusChange}
        />
        In Progress
      </label>

      <label>
        <input
          type="radio"
          value="resolved"
          checked={newStatus === 'resolved'}
          onChange={handleStatusChange}
        />
        Resolved
      </label>
       {
        isSending2 ? 
        <p>updating</p> : 
        <button type="submit">Update Status</button>

       }
       {
        showPopup2 && <p style={{color: "green"}}>updated sucessfully</p>
       }
    </form>
    </div>
    </div>



    <div className="message-div">
    <h3>Customer Message: {ticket.description}</h3>
    </div>

    <div className="answers-area">
        {
          ticket.answers === undefined ? (
            <h1>loading</h1> ) 
            : (
                <div >
                    {
                        ticket.answers.map((answer) => (
                            <div key={answer._id} className="answer-answer">
                             <p> RE: {answer.answer}</p>
                            </div>
                        ))

                    }
                </div>
            )

        }

    </div>
  
    <div className="answer-section">
    <div>
        {showPopup && <h5 style={{color: "green", padding: "10px"}}>MESSAGE SENT!!!</h5>}
    </div>
        <form onSubmit={handleClick} className="answer-section-inside">
          <textarea
          required
           value={answer} onChange={e => setAnswer(e.target.value)} placeholder="respond to ticket" />
           {
            isSending ? 
              <p>sending</p>
              :   
               <button>SEND</button>

           }
        </form>
  
    </div>

    </div>

  )
}

export default SingleTicket