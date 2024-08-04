// import Controls from '../components/Controls';
// import NoteCard from '../components/NoteCard';
// import { useContext } from "react";
// import { NoteContext } from "../context/NoteContext";



// const NotesPage = () => {
//   const { notes, setNotes } = useContext(NoteContext);
//   // const [notes, setNotes] = useState([]);

//   // useEffect(() => {
//   //     init();
//   // }, []);

//   // const init = async () => {
//   //     const response = await db.notes.list();
//   //     setNotes(response.documents);
//   // };

//   return (
//     <>
//     <div>
//      {notes.map((note) => (
//                 <NoteCard note={note} key={note.$id} setNotes={setNotes} />
//             ))}
//             <Controls/>
//     </div>

    
//     </>
//   )
// }

// export default NotesPage;

// import { fakeData as notes } from "../assets/fakeData.js";
// import { db } from "../appwrite/databases";
import NoteCard from "../components/NoteCard";
import { useState, useEffect } from "react";
import Controls from "../components/Controls";
import { useContext } from "react";
import { NotesContext } from "../context/NotesContext";

const NotesPage = () => {
    const { notes } = useContext(NotesContext);
    return (
        <div>
            {notes.map((note) => (
                <NoteCard note={note} key={note.$id} />
            ))}
            <Controls />
        </div>
    );
};

export default NotesPage;
