import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router";
import api from "../libs/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";


const NoteDetailPage = () => {

  const [note,setNote] = useState(null);
  const [loading,setLoading] = useState(true);
  const [saving,setSaving] = useState(false);

  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    const fetchNote = async() => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("Error at fetching note: " ,error);
        
        toast.error("Failed to fesh the note")
      } finally{
        setLoading(false)
      }
    }

    fetchNote();
  },[id]);

  
  const handleDelete = async() =>{

    if(!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("note Dleted!");
      navigate("/");
    } catch (error) {
      console.log("Deleting error in edit section: ",error);
      toast.error("Failed to delete")
    }
  }

  const handleSaving = async() => {
    if(!note.title.trim() || !note.content.trim())
    {
      toast.error("please add a title or content");
      return;
    }

    setSaving(true)

    try {
      await api.put(`/notes/${id}`, note)
      toast.success("Note Updated Successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error Saving the note: ",error);
      toast.error("Failed to Update Note");
    }finally{
      setSaving(false)
    }
  }

  if(loading){
    return(
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10"/>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="size-5"/>
              Back to Notes
            </Link>
            <button onClick={handleDelete} className="btn btn-error btn-outline">
              <Trash2Icon className="size-5"/>
              Delete Note
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title test-2xl mb-4">Create New Note</h2>
              <form >
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="lable-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered"
                    value={note.title}
                    onChange={(e) => setNote({...note,title:e.target.value})}
                  />
                </div>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="lable-text">Content</span>
                  </label>
                  <textarea
                    placeholder="Note Title"
                    className="input input-bordered h-32"
                    value={note.content}
                    onChange={(e) => setNote({...note,content:e.target.value})}
                  />
                </div>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary"  disabled={saving} onClick={handleSaving}>
                    {saving? "Saving...": "Save Changes"}
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

export default NoteDetailPage