import { ArrowLeftIcon } from 'lucide-react';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import axiosInstance from '../lib/axios';

const CreatePage = () => {
  
  const [title, settitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  
  const naviage = useNavigate();

  const handleSubmit =async (e) =>{
    e.preventDefault();
    if(!title.trim() || !content.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try{
      const noteTitle = title;
      const noteContent = content;
      await axiosInstance.post("/notes", {
        title: noteTitle,
        content: noteContent
      })
      toast.success("Note created successfully!");
      naviage("/");
    }catch(error){
      if(error.response.status === 429) {
        toast.error("You are being rate limited. Please try again later.",{
          duration: 4000,
          icon: "🚨",
        });
      }else{
        toast.error("Failed to create note. Please try again later.");
      }
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8 '>
        <div className='mx-auto max-w-2xl'>
          <Link to={"/"} className='btn btn-ghost mb-6'>
            <ArrowLeftIcon className='size-5'/>
            <span className='ml-2'>Back to Home</span>
          </Link>
          <div className='card bg-base-100'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-4'>Create New Note</h2>
              <form onSubmit={handleSubmit}>
                {/* title input */}
                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Title</span>
                  </label>
                    <input type="text" value={title} placeholder='Note title' className='input input-bordered' onChange={(e)=>{
                      settitle(e.target.value);
                    }}/>
                </div>
                {/* content input */}
                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Content</span>
                  </label>
                    <textarea placeholder='Note description....' value={content} className="textarea textarea-bordered h-32" onChange={(e)=>{
                      setContent(e.target.value);
                    }}></textarea>
                </div>
                {/* submit button */}
                <div className="card-actions justify-end">
                    <button type='submit' className='btn btn-primary' disabled={loading}>
                      {loading ? "Creating..." : "Create Note"}
                    </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage