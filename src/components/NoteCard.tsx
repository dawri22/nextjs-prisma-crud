import { Note } from "@prisma/client";
import { useNotes } from "@/context/NoteContext";

export function NoteCard({ note }: { note: Note }) {
  const { deleteNote, setSelectedNote } = useNotes();

  return (
    
    <div key={note.id} className="card h-full p-4 m-2 bg-base-100 shadow-xl gap-x-2 pt-2">
      <div className="card-body">
        <h1 className=" card-title ">{note.title}</h1>
        <p>{note.content}</p>
      </div>
      <div className="card-actions justify-end">
        <button
        className="btn btn-error"
          onClick={async () => {
            {
                
              if (confirm("Are you sure you want to delete this note?")) {
                await deleteNote(Number(note.id));
              }
            }
          }}
        >
          Delete
        </button>
        <button
        className="btn btn-warning"
        onClick={() => {
          setSelectedNote(note);
        }}
        >Edit</button>
      </div>
    </div>
  );
}
