import { Route, Routes } from "react-router-dom"
import CreateTicket from "./pages/CreateTicket"
import Admin from "./pages/Admin"
import Layout from "./pages/Layout"
import SingleTicket from "./pages/SingleTicket"

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
      <Route index path="/" element={<CreateTicket/>}/>
      <Route index path="/admin/:id" element={<SingleTicket/>}/>

      <Route  path="/admin" element={<Admin/>}/>
      </Route>
    </Routes>

  )
  }
export default App
