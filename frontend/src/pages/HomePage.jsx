import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import RatelimitedUI from "../components/RatelimitedUI";
import axios from "axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import api from "../libs/axios";
import NoteNotFound from "../components/NoteNotFound";


const HomePage = () => {

  const [isratelimited,setisRateLimited] = useState(false);
  const [notes,setNotes] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async() => {
      try {
        
        const res = await api.get("/notes");
        setNotes(res.data);
        setisRateLimited(false)
      } catch (error) {
        console.log("Error fetching notes");
        if(error.response.status === 429){
          setisRateLimited(true)
        }else{
          toast.error("Failed to load notes");
        }
      } finally{
        setLoading(false)
      }
    }

    fetchNotes();
  },[])

  return (
    <div className="min-h-screen">
        <Navbar/>
        {isratelimited && <RatelimitedUI/>}
        <div className="max-w-7xl mx-auto p-4 mt-6">
          {loading && <div className="text-4xl text-center text-primary py-10">Loading Notes...</div>}

          { notes.length === 0 && !isratelimited && <NoteNotFound/> }

          {notes.length > 0 && !isratelimited && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {
                notes.map((note) => (
                  <NoteCard key={note._id} note={note} setNotes={setNotes}/>
                ))
              }
            </div>
          )}
        </div>
    </div>
  )
}

export default HomePage