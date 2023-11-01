import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";


export interface Ticket {
    _id: string;
    name: string;
    email: string;
    description: string;
    status: string;
    awsUrl: string;
    imgUrl: string
}

const defaultPosts:Ticket[] = [];

const Admin = () => {
    const [tickets, setTickets]: [Ticket[], (posts: Ticket[]) => void] = useState(defaultPosts)
    const [isLoadingg, setIsLoading] = useState(false);

    // const catLocation = useLocation()



    useEffect(() => { 
        setIsLoading(true)
        const fetchData = async () => {

            try {
             //   const res = await axios.get("http://localhost:3001/api/tickets/list",

                const res = await axios.get("http://54.89.49.17/api/tickets/list",
                { headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Access-Control-Allow-Origin': '*'
                  },
                })
                setTickets(res.data)
                console.log(res.data, 'ress')
                setIsLoading(false)

            } catch(err){
                console.log(err)

            } finally {
                setIsLoading(false)

            }
        }
        fetchData();

    },[]);



  return (
    <div className="ticket-main-main">
        {
            // tickets.length === 0 ? 
            // <h1>U dont have any tickets at the moment</h1> :
        
        isLoadingg ? 
        <h1>loading..</h1> :
         tickets.map((ticket: Ticket) => (
            <div key={ticket._id} className="ticket">

                <div>
                <img src={ticket.imgUrl} style={{
                    width: "100%",
                    height: "300px",
                    borderRadius: "320px"
                }}/>
                </div>
                <Link className="link" to={`/admin/${ticket._id}`}>

                <div className="ticket-inside-inside">
                <h3>TICKET NUMBER: {ticket._id}</h3>
                <h3>STATUS: {ticket.status}</h3>
                <h3>NAME: {ticket.name}</h3>
                <h3>EMAIL: {ticket.email}</h3>
                <h3>DESCRIPTION: {ticket.description}</h3>

                </div>
                </Link>



            </div>


         ))}
    </div>
  )
}

export default Admin