


import NotesPage from "./pages/NotesPage";
import NotesProvider from "./context/NotesContext";
import { AnimatePresence } from "framer-motion";
import Preloader from "./components/Preloader";

import { useEffect, useState } from "react";


 export default function App() {

      const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      window.scrollTo(0,0)
    }, [1100]);
  });


    return (
        <>
        <div id="app">

             {/* Preloader logic */}
    <AnimatePresence mode="wait">
       {isLoading && <Preloader />}
      </AnimatePresence>
        
            <NotesProvider>
                <NotesPage />
            </NotesProvider>
        </div>
        </>
    );
}


