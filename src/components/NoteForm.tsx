"use client";
import { useState, useRef, useEffect } from "react";
import { NoteContext } from "@/context/NoteContext";
import { useNotes } from "@/context/NoteContext";

function NoteForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");
  const [required, setRequired] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);

  const { createNotes, selectedNote, setSelectedNote, updateNotes, filterNotes } = useNotes();

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content || "");
    }
  }, [selectedNote]);

  return (
    <div>
<div>
<form
onSubmit={async (e) => {
  //filter by title
  e.preventDefault();
  await filterNotes(search);

}}
 >

<input
        type="text"
        placeholder="Search by title"
        className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <button className=" px-5 py-2 bg-yellow-50 hover:bg-yellow-200 rounded-md" >Search</button>
</form>
</div>
   
<div>
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        if (selectedNote) {
          await updateNotes(selectedNote.id, { title, content });
          setSelectedNote(null);
        } else {
          if(!title){
            alert("Title is required");
            setRequired("red");
          }else{
            await createNotes({ title, content });
            setRequired("blue");
          }
          
        }

        setTitle("");
        setContent("");
        titleRef.current?.focus();
      }}
    >
      <input
        type="text"
        placeholder="Title"
        autoFocus
        className={`w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-${required}-600 my-2 `}
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        ref={titleRef}
      />
      <textarea
        placeholder="Description"
        className="w-full px-4 py-2 text-black bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 my-2"
        onChange={(e) => setContent(e.target.value)}
        value={content}
      />
      <div className=" flex justify-end gap-x-2">
        <button
          type="submit"
          className="px-5 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          {selectedNote ? "Update" : "Create"}
        </button>

        {selectedNote && (
          <button
            type="button"
            onClick={() => {
              setSelectedNote(null);
              setTitle("");
              setContent("");
            }}
            className="px-5 py-2 text-black bg-slate-400 rounded-md hover:bg-slate-600"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
    </div>
    </div>
  );
}

export default NoteForm;
