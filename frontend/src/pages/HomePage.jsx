import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { useState } from 'react'
import RateLimitedUI from '../components/RateLimitedUI'
import toast from 'react-hot-toast'
import NoteCard from '../components/NoteCard'
import axiosInstance from '../lib/axios'
import NotesNotFound from '../components/NotesNotFound'

const HomePage = () => {

  const [rateLimited, setRateLimited] = useState(false)
  const [Notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const fetchNotes = async ()=>{
      try{
        // const res = await fetch("https://locahost:3000/api/notes");
        // const data = await res.json();
        const res = await axiosInstance.get("/notes");
        const data = res.data;
        console.log(data.data);
        setNotes(data.data);
        setRateLimited(false);
      }catch(error){
        if(error.response.status === 429){
          setRateLimited(true);
        }else{
          toast.error("Failed to fetch notes. Please try again later.");
        }
      }finally {
        setLoading(false);
      }
    }
    fetchNotes();
  }, [])

  return (
    <div className='min-h-screen'>
      <Navbar />
      {rateLimited && <RateLimitedUI />}
      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && <div className='text-center text-primary py-10'>
            Loading notes...
          </div>}
        {Notes.length > 0 && !rateLimited && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {Notes.map((note, idx) => (
            <NoteCard key={note._id} note={note} setNotes={setNotes}/>
          ))}
        </div>
      )}
      </div>
      {Notes.length === 0 && <NotesNotFound />}
    </div>
  )
}

export default HomePage