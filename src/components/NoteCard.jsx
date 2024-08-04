
// import { useEffect, useRef, useState } from "react";

// import { setNewOffset, autoGrow, setZIndex, bodyParser } from "../utils";
// import { db } from "../appwrite/databases";
// import Spinner from "../icons/Spinner";
// import DeleteButton from "../components/DeleteButton";
// import { useContext } from "react";
// import { NotesContext } from "../context/NotesContext";

// const NoteCard = ({ note }) => {   
//     let mouseStartPos = { x: 0, y: 0 };
//     const cardRef = useRef(null);

//     const { setSelectedNote } = useContext(NotesContext);

//     const [saving, setSaving] = useState(false);
//     const keyUpTimer = useRef(null);

//     const [position, setPosition] = useState(JSON.parse(note.position));
//     const colors = JSON.parse(note.colors);
//     const body = bodyParser(note.body);

//     const textAreaRef = useRef(null);

//     const [timerDuration, setTimerDuration] = useState(note.timerDuration || 0);
//     const [timerStartTime, setTimerStartTime] = useState(note.timerStartTime || null);
//     const [timeLeft, setTimeLeft] = useState(0);
//     const [isTimerRunning, setIsTimerRunning] = useState(false);

//     const handleTimerChange = (e) => {
//         setTimerDuration(e.target.value);
//         saveData("timerDuration", e.target.value);
//     };



//     useEffect(() => {
//         autoGrow(textAreaRef);
//         setZIndex(cardRef.current);
//         if (timerStartTime && timerDuration) {
//             const currentTime = Date.now();
//             const elapsedTime = Math.floor((currentTime - new Date(timerStartTime).getTime()) / 1000);
//             const remainingTime = timerDuration * 60 - elapsedTime;

//             if (remainingTime > 0) {
//                 setTimeLeft(remainingTime);
//                 setIsTimerRunning(true);
//             } else {
//                 setTimeLeft(0);
//                 setIsTimerRunning(false);
//             }
//         }
//     }, [timerStartTime, timerDuration]);
   
//     useEffect(() => {
//         let countdown;
//         if (isTimerRunning && timeLeft > 0) {
//             countdown = setInterval(() => {
//                 setTimeLeft((prevTime) => prevTime - 1);
//             }, 1000);
//         } else if (timeLeft === 0) {
//             setIsTimerRunning(false);
//             clearInterval(countdown);
//         }
//         return () => clearInterval(countdown);
//     }, [isTimerRunning, timeLeft]);

//     const startTimer = async () => {
//         const startTime = new Date().toISOString();
//         setTimerStartTime(startTime);
//         setTimeLeft(timerDuration * 60); // assuming timer is in minutes
//         setIsTimerRunning(true);

//         await saveData("timerStartTime", startTime);
//         await saveData("timerDuration", timerDuration);
//     };

//     const stopTimer = async () => {
//         setIsTimerRunning(false);
//         setTimeLeft(0);
//         await saveData("timerStartTime", null);
//         await saveData("timerDuration", 0);
//     };
    
//     const mouseDown = (e) => {
//         if (e.target.className === "card-header") {
//             mouseStartPos.x = e.clientX;
//             mouseStartPos.y = e.clientY;

//             setZIndex(cardRef.current);

//             document.addEventListener("mousemove", mouseMove);
//             document.addEventListener("mouseup", mouseUp);
//             setSelectedNote(note);
//         }
//     };

//     const mouseMove = (e) => {
//         const mouseMoveDir = {
//             x: mouseStartPos.x - e.clientX,
//             y: mouseStartPos.y - e.clientY,
//         };

//         mouseStartPos.x = e.clientX;
//         mouseStartPos.y = e.clientY;

//         const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
//         setPosition(newPosition);
//     };

//     const mouseUp = async () => {
//         document.removeEventListener("mousemove", mouseMove);
//         document.removeEventListener("mouseup", mouseUp);

//         const newPosition = setNewOffset(cardRef.current);
//         saveData("position", newPosition);
//     };

//     const saveData = async (key, value) => {
//         const payload = { [key]: JSON.stringify(value) };
//         console.log("Save data called:", payload);
//         try {
//             await db.notes.update(note.$id, payload);
//         } catch (error) {
//             console.error(error);
//         }
//         setSaving(false);
//     };

//     const handleKeyUp = async () => {
//         setSaving(true);
//         if (keyUpTimer.current) {
//             clearTimeout(keyUpTimer.current);
//         }

//         keyUpTimer.current = setTimeout(() => {
//             console.log("Timer started");
//             saveData("body", textAreaRef.current.value);
//         }, 2000);
//     };

//     return (
//         <div
//             ref={cardRef}
//             className="card"
//             style={{
//                 left: `${position.x}px`,
//                 top: `${position.y}px`,
//                 backgroundColor: colors.colorBody,
                
//             }}
//         >
//             <div
//                 onMouseDown={mouseDown}
//                 className="card-header"
//                 style={{
//                     backgroundColor: colors.colorHeader,
//                 }}
//             >
//                 <DeleteButton noteId={note.$id} />

//                 {saving && (
//                     <div className="card-saving">
//                         <Spinner color={colors.colorText} />
//                         <span style={{ color: colors.colorText }}>
//                             Saving...
//                         </span>
//                     </div>
//                 )}
//                 <div className="timer-container">
//                     <input
//                         type="number"
//                         value={timerDuration}
//                         onChange={handleTimerChange}
//                         placeholder="Timer min"
//                         className="timer-input"
//                     />
//                     <button onClick={startTimer} className="timer-button">Start</button>
//                     <button onClick={stopTimer} className="timer-button">Stop</button>
//                     {isTimerRunning && (
//                         <div className="countdown">
//                             Time left: {Math.floor(timeLeft / 60)}:{timeLeft % 60}
//                         </div>
//                     )}
//                 </div>
//             </div>
//             <div className="card-body">
//                 <textarea
//                     onKeyUp={handleKeyUp}
//                     onFocus={() => {
//                         setZIndex(cardRef.current);
//                         setSelectedNote(note);
//                     }}
//                     onInput={() => {
//                         autoGrow(textAreaRef);
//                     }}
//                     ref={textAreaRef}
//                     style={{ color: colors.colorText }}
//                     defaultValue={body}
//                 ></textarea>
//             </div>
//         </div>
//     );
// };

// export default NoteCard;

// import { useEffect, useRef, useState } from "react";
// import { setNewOffset, autoGrow, setZIndex, bodyParser } from "../utils";
// import { db } from "../appwrite/databases";
// import Spinner from "../icons/Spinner";
// import DeleteButton from "../components/DeleteButton";
// import { useContext } from "react";
// import { NotesContext } from "../context/NotesContext";
// import "./alarm.mp3"
// import "./alarm2.mp3"

// const NoteCard = ({ note }) => {
//     let mouseStartPos = { x: 0, y: 0 };
//     const cardRef = useRef(null);

//     const { setSelectedNote } = useContext(NotesContext);

//     const [saving, setSaving] = useState(false);
//     const keyUpTimer = useRef(null);

//     const [position, setPosition] = useState(JSON.parse(note.position));
//     const colors = JSON.parse(note.colors);
//     const body = bodyParser(note.body);

//     const textAreaRef = useRef(null);

//     const [timerDuration, setTimerDuration] = useState(note.timerDuration || 0);
//     const [timerUnit, setTimerUnit] = useState(note.timerUnit || "seconds");
//     const [timerStartTime, setTimerStartTime] = useState(note.timerStartTime || null);
//     const [timeLeft, setTimeLeft] = useState(0);
//     const [isTimerRunning, setIsTimerRunning] = useState(false);
//     const audioRef = useRef(new Audio("/alarm2.mp3"));

//     const handleTimerChange = (e) => {
//         setTimerDuration(e.target.value);
//         saveData("timerDuration", e.target.value);
//     };

//     const handleUnitChange = (e) => {
//         setTimerUnit(e.target.value);
//         saveData("timerUnit", e.target.value);
//     };

//     useEffect(() => {
//         autoGrow(textAreaRef);
//         setZIndex(cardRef.current);
//         if (timerStartTime && timerDuration) {
//             const currentTime = Date.now();
//             let durationInSeconds;

//             if (timerUnit === "hours") {
//                 durationInSeconds = timerDuration * 3600;
//             } else if (timerUnit === "minutes") {
//                 durationInSeconds = timerDuration * 60;
//             } else {
//                 durationInSeconds = timerDuration;
//             }

//             const elapsedTime = Math.floor((currentTime - new Date(timerStartTime).getTime()) / 1000);
//             const remainingTime = durationInSeconds - elapsedTime;

//             if (remainingTime > 0) {
//                 setTimeLeft(remainingTime);
//                 setIsTimerRunning(true);
//             } else {
//                 setTimeLeft(0);
//                 setIsTimerRunning(false);
//                 audioRef.current.play();
//             }
//         }
//     }, [timerStartTime, timerDuration, timerUnit]);

//     useEffect(() => {
//         let countdown;
//         if (isTimerRunning && timeLeft > 0) {
//             countdown = setInterval(() => {
//                 setTimeLeft((prevTime) => prevTime - 1);
//             }, 1000);
//         } else if (timeLeft === 0) {
//             setIsTimerRunning(false);
//             clearInterval(countdown);
//             audioRef.current.play();
//         }
//         return () => clearInterval(countdown);
//     }, [isTimerRunning, timeLeft]);

//     const startTimer = async () => {
//         const startTime = new Date().toISOString();
//         setTimerStartTime(startTime);

//         let durationInSeconds;
//         if (timerUnit === "hours") {
//             durationInSeconds = timerDuration * 3600;
//         } else if (timerUnit === "minutes") {
//             durationInSeconds = timerDuration * 60;
//         } else {
//             durationInSeconds = timerDuration;
//         }

//         setTimeLeft(durationInSeconds);
//         setIsTimerRunning(true);

//         await saveData("timerStartTime", startTime);
//         await saveData("timerDuration", timerDuration);
//         await saveData("timerUnit", timerUnit);
//     };

//     const stopTimer = async () => {
//         setIsTimerRunning(false);
//         setTimeLeft(0);
//         await saveData("timerStartTime", null);
//         await saveData("timerDuration", 0);
//         await saveData("timerUnit", "seconds");
//     };

//     const mouseDown = (e) => {
//         if (e.target.className === "card-header") {
//             mouseStartPos.x = e.clientX;
//             mouseStartPos.y = e.clientY;

//             setZIndex(cardRef.current);

//             document.addEventListener("mousemove", mouseMove);
//             document.addEventListener("mouseup", mouseUp);
//             setSelectedNote(note);
//         }
//     };

//     const mouseMove = (e) => {
//         const mouseMoveDir = {
//             x: mouseStartPos.x - e.clientX,
//             y: mouseStartPos.y - e.clientY,
//         };

//         mouseStartPos.x = e.clientX;
//         mouseStartPos.y = e.clientY;

//         const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
//         setPosition(newPosition);
//     };

//     const mouseUp = async () => {
//         document.removeEventListener("mousemove", mouseMove);
//         document.removeEventListener("mouseup", mouseUp);

//         const newPosition = setNewOffset(cardRef.current);
//         saveData("position", newPosition);
//     };

//     const saveData = async (key, value) => {
//         const payload = { [key]: JSON.stringify(value) };
//         console.log("Save data called:", payload);
//         try {
//             await db.notes.update(note.$id, payload);
//         } catch (error) {
//             console.error(error);
//         }
//         setSaving(false);
//     };

//     const handleKeyUp = async () => {
//         setSaving(true);
//         if (keyUpTimer.current) {
//             clearTimeout(keyUpTimer.current);
//         }

//         keyUpTimer.current = setTimeout(() => {
//             console.log("Timer started");
//             saveData("body", textAreaRef.current.value);
//         }, 2000);
//     };

//     return (
//         <div
//             ref={cardRef}
//             className="card"
//             style={{
//                 left: `${position.x}px`,
//                 top: `${position.y}px`,
//                 backgroundColor: colors.colorBody,
                
//             }}
//         >
//             <div
//                 onMouseDown={mouseDown}
//                 className="card-header"
//                 style={{
//                     backgroundColor: colors.colorHeader,
//                 }}
//             >
//                 <DeleteButton noteId={note.$id} />

//                 {saving && (
//                     <div className="card-saving">
//                         <Spinner color={colors.colorText} />
//                         <span style={{ color: colors.colorText }}>
//                             Saving...
//                         </span>
//                     </div>
//                 )}
//                 <div className="timer-container">
//                     <input
//                         type="number"
//                         value={timerDuration}
//                         onChange={handleTimerChange}
//                         placeholder="Set timer"
//                         className="timer-input"
//                     />
//                     <select value={timerUnit} onChange={handleUnitChange} className="timer-unit-select">
//                         <option value="seconds">Sec</option>
//                         <option value="minutes">Min</option>
//                         <option value="hours">Hr</option>
//                     </select>
//                     <button onClick={startTimer} className="timer-button">Start</button>
//                     <button onClick={stopTimer} className="timer-button">Stop</button>
//                     {isTimerRunning && (
//                         <div className="countdown">
//                             Time left: {Math.floor(timeLeft / 3600)}:{Math.floor((timeLeft % 3600) / 60)}:{timeLeft % 60}
//                         </div>
//                     )}
//                 </div>
//             </div>
//             <div className="card-body">
//                 <textarea
//                     onKeyUp={handleKeyUp}
//                     onFocus={() => {
//                         setZIndex(cardRef.current);
//                         setSelectedNote(note);
//                     }}
//                     onInput={() => {
//                         autoGrow(textAreaRef);
//                     }}
//                     ref={textAreaRef}
//                     style={{ color: colors.colorText }}
//                     defaultValue={body}
//                 ></textarea>
//             </div>
//         </div>
//     );
// };

// export default NoteCard;

import { useEffect, useRef, useState } from "react";
import { setNewOffset, autoGrow, setZIndex, bodyParser } from "../utils";
import { db } from "../appwrite/databases";
import Spinner from "../icons/Spinner";
import DeleteButton from "../components/DeleteButton";
import { useContext } from "react";
import { NotesContext } from "../context/NotesContext";

const NoteCard = ({ note }) => {
    let mouseStartPos = { x: 0, y: 0 };
    const cardRef = useRef(null);

    const { setSelectedNote } = useContext(NotesContext);

    const [saving, setSaving] = useState(false);
    const keyUpTimer = useRef(null);

    const [position, setPosition] = useState(JSON.parse(note.position));
    const colors = JSON.parse(note.colors);
    const body = bodyParser(note.body);

    const textAreaRef = useRef(null);

    const [timerDuration, setTimerDuration] = useState(note.timerDuration || 0);
    const [timerUnit, setTimerUnit] = useState(note.timerUnit || "seconds");
    const [timerStartTime, setTimerStartTime] = useState(note.timerStartTime || null);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        // Ensure the audio is loaded and ready to play
        audioRef.current = new Audio("/alarm.mp3");
        audioRef.current.load();
        audioRef.current.addEventListener("canplaythrough", () => {
            console.log("Audio is ready to play");
        });

        audioRef.current.addEventListener("error", (e) => {
            console.error("Audio loading error", e);
        });

        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener("canplaythrough", () => {});
                audioRef.current.removeEventListener("error", () => {});
            }
        };
    }, []);

    const handleTimerChange = (e) => {
        setTimerDuration(e.target.value);
        saveData("timerDuration", e.target.value);
    };

    const handleUnitChange = (e) => {
        setTimerUnit(e.target.value);
        saveData("timerUnit", e.target.value);
    };

    useEffect(() => {
        autoGrow(textAreaRef);
        setZIndex(cardRef.current);
        if (timerStartTime && timerDuration) {
            const currentTime = Date.now();
            let durationInSeconds;

            if (timerUnit === "hours") {
                durationInSeconds = timerDuration * 3600;
            } else if (timerUnit === "minutes") {
                durationInSeconds = timerDuration * 60;
            } else {
                durationInSeconds = timerDuration;
            }

            const elapsedTime = Math.floor((currentTime - new Date(timerStartTime).getTime()) / 1000);
            const remainingTime = durationInSeconds - elapsedTime;

            if (remainingTime > 0) {
                setTimeLeft(remainingTime);
                setIsTimerRunning(true);
            } else {
                setTimeLeft(0);
                setIsTimerRunning(false);
                console.log("Timer ended, attempting to play audio");
                if (audioRef.current) {
                    audioRef.current.play().catch((e) => {
                        console.error("Audio play error", e);
                    });
                }
            }
        }
    }, [timerStartTime, timerDuration, timerUnit]);

    useEffect(() => {
        let countdown;
        if (isTimerRunning && timeLeft > 0) {
            countdown = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsTimerRunning(false);
            clearInterval(countdown);
            console.log("Timer ended, attempting to play audio");
            if (audioRef.current) {
                audioRef.current.play().catch((e) => {
                    console.error("Audio play error", e);
                });
            }
        }
        return () => clearInterval(countdown);
    }, [isTimerRunning, timeLeft]);

    const startTimer = async () => {
        const startTime = new Date().toISOString();
        setTimerStartTime(startTime);

        let durationInSeconds;
        if (timerUnit === "hours") {
            durationInSeconds = timerDuration * 3600;
        } else if (timerUnit === "minutes") {
            durationInSeconds = timerDuration * 60;
        } else {
            durationInSeconds = timerDuration;
        }

        setTimeLeft(durationInSeconds);
        setIsTimerRunning(true);

        await saveData("timerStartTime", startTime);
        await saveData("timerDuration", timerDuration);
        await saveData("timerUnit", timerUnit);
    };

    const stopTimer = async () => {
        setIsTimerRunning(false);
        setTimeLeft(0);
        await saveData("timerStartTime", null);
        await saveData("timerDuration", 0);
        await saveData("timerUnit", "seconds");
    };

    const mouseDown = (e) => {
        if (e.target.className === "card-header") {
            mouseStartPos.x = e.clientX;
            mouseStartPos.y = e.clientY;

            setZIndex(cardRef.current);

            document.addEventListener("mousemove", mouseMove);
            document.addEventListener("mouseup", mouseUp);
            setSelectedNote(note);
        }
    };

    const mouseMove = (e) => {
        const mouseMoveDir = {
            x: mouseStartPos.x - e.clientX,
            y: mouseStartPos.y - e.clientY,
        };

        mouseStartPos.x = e.clientX;
        mouseStartPos.y = e.clientY;

        const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
        setPosition(newPosition);
    };

    const mouseUp = async () => {
        document.removeEventListener("mousemove", mouseMove);
        document.removeEventListener("mouseup", mouseUp);

        const newPosition = setNewOffset(cardRef.current);
        saveData("position", newPosition);
    };

    const saveData = async (key, value) => {
        const payload = { [key]: JSON.stringify(value) };
        console.log("Save data called:", payload);
        try {
            await db.notes.update(note.$id, payload);
        } catch (error) {
            console.error(error);
        }
        setSaving(false);
    };

    const handleKeyUp = async () => {
        setSaving(true);
        if (keyUpTimer.current) {
            clearTimeout(keyUpTimer.current);
        }

        keyUpTimer.current = setTimeout(() => {
            console.log("Timer started");
            saveData("body", textAreaRef.current.value);
        }, 2000);
    };

    return (
        <div
            ref={cardRef}
            className="card"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                backgroundColor: colors.colorBody,
            }}
        >
            <div
                onMouseDown={mouseDown}
                className="card-header"
                style={{
                    backgroundColor: colors.colorHeader,
                }}
            >
                <DeleteButton noteId={note.$id} />

                {saving && (
                    <div className="card-saving">
                        <Spinner color={colors.colorText} />
                        <span style={{ color: colors.colorText }}>
                            Saving...
                        </span>
                    </div>
                )}
                <div className="timer-container">
                    <input
                        type="number"
                        value={timerDuration}
                        onChange={handleTimerChange}
                        placeholder="Set timer"
                        className="timer-input"
                    />
                    <select value={timerUnit} onChange={handleUnitChange} className="timer-unit-select">
                        <option value="seconds">Seconds</option>
                        <option value="minutes">Minutes</option>
                        <option value="hours">Hours</option>
                    </select>
                    <button onClick={startTimer} className="timer-button">Start</button>
                    <button onClick={stopTimer} className="timer-button">Stop</button>
                    {isTimerRunning && (
                        <div className="countdown">
                            Time left: {Math.floor(timeLeft / 3600)}:{Math.floor((timeLeft % 3600) / 60)}:{timeLeft % 60}
                        </div>
                    )}
                </div>
            </div>
            <div className="card-body">
                <textarea
                    onKeyUp={handleKeyUp}
                    onFocus={() => {
                        setZIndex(cardRef.current);
                        setSelectedNote(note);
                    }}
                    onInput={() => {
                        autoGrow(textAreaRef);
                    }}
                    ref={textAreaRef}
                    style={{ color: colors.colorText }}
                    defaultValue={body}
                ></textarea>
            </div>
        </div>
    );
};

export default NoteCard;
