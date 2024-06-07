import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList"; // Importing the TaskList component
import { TEInput } from "tw-elements-react";
import { ListPlus, Search } from "lucide-react";
import girlCode from './assets/girl-code.png'

const MainApp = () => {
    const [tasks, setTasks] = useState([]);
    const [notes, setNotes] = useState({});
    const [searchText, setSearchText] = useState("");

    // useEffect to load saved tasks and notes from localStorage when the component mounts
    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem("tasks"));
        const savedNotes = JSON.parse(localStorage.getItem("notes"));

        if (savedTasks) setTasks(savedTasks); // Set saved tasks to state
        if (savedNotes) setNotes(savedNotes); // Set saved notes to state
    }, []); // Empty dependency array means this runs once when the component mounts

    // useEffect to save tasks and notes to localStorage whenever they change
    useEffect(() => {
        if (tasks.length > 0 || Object.keys(notes).length > 0) { // Check if there are tasks or notes to save
            localStorage.setItem("tasks", JSON.stringify(tasks));
            localStorage.setItem("notes", JSON.stringify(notes));
        }
    }, [tasks, notes]); // Dependency array includes tasks and notes, so this runs whenever they change

    const addTask = (taskText) => {
        const newTask = { id: Date.now(), text: taskText, approved: false }; // Create a new task object
        setTasks([...tasks, newTask]); // Add the new task to the list of tasks
    };

    const approveTask = (taskId) => {
        setTasks(
            tasks.map(
                (task) =>
                    task.id === taskId ? { ...task, approved: !task.approved } : task // Toggle the approved state of the task
            )
        );
    };

    const deleteTask = (taskId) => {
        setTasks(tasks.filter((task) => task.id !== taskId)); // Filter out the task with the given ID
        const updatedNotes = { ...notes };
        delete updatedNotes[taskId]; // Remove the notes associated with the deleted task
        setNotes(updatedNotes); // Update the notes state
    };

    const addNote = (taskId, noteText) => {
        const updatedNotes = { ...notes };
        if (!updatedNotes[taskId]) {
            updatedNotes[taskId] = []; // Initialize an array for notes if not already present
        }
        updatedNotes[taskId].push({
            id: Date.now(),
            text: noteText,
            completed: false,
        }); // Add the new note to the task's notes with a completed property
        setNotes(updatedNotes); // Update the notes state
    };

    const updateTask = (taskId, updatedTask) => {
        setTasks(
            tasks.map(
                (task) => (task.id === taskId ? updatedTask : task) // Update the task with the given ID
            )
        );
    };

    const updateNote = (taskId, noteId, noteText) => {
        const updatedNotes = { ...notes };
        const noteIndex = updatedNotes[taskId].findIndex(
            (note) => note.id === noteId
        ); // Find the note by its ID
        updatedNotes[taskId][noteIndex].text = noteText; // Update the note's text
        setNotes(updatedNotes); // Update the notes state
    };

    const toggleNoteCompletion = (taskId, noteId) => {
        const updatedNotes = { ...notes };
        const noteIndex = updatedNotes[taskId].findIndex(
            (note) => note.id === noteId
        );
        updatedNotes[taskId][noteIndex].completed =
            !updatedNotes[taskId][noteIndex].completed;
        setNotes(updatedNotes);
    };

    const handleSearch = (event) => {
        setSearchText(event.target.value); // Update the search text state
    };

    const filteredTasks = tasks.filter((task) => {
        const taskMatches = task.text
            .toLowerCase()
            .includes(searchText.toLowerCase()); // Check if the task text matches the search text
        const notesMatch = notes[task.id]?.some((note) =>
            note.text.toLowerCase().includes(searchText.toLowerCase())
        ); // Check if any of the task's notes match the search text
        return taskMatches || notesMatch; // Return tasks that match either condition
    });

    return (
        <div className="h-screen">
            <div className="flex justify-between items-center p-3 sticky">
                <img src={girlCode} alt="" className="size-16"/>
                <div className="flex items-center gap-2 border p-1 w-1/3 h-10 rounded-xl border-blue-500">
                    <span><Search size={20} strokeWidth={1.75} /></span>
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchText}
                        onChange={handleSearch}
                        className="border-none bg-transparent p-0 m-0 w-fit outline-none shadow-none text-base font-normal"
                    />
                </div>
            </div>
            <div className="h-full bg-blue-50">
                <div className="flex flex-col md:flex-row p-4 gap-5 items-center rounded-md">
                    <div className="flex items-center gap-2 border border-blue-500 p-2 rounded-xl">
                        <span><ListPlus size={20} strokeWidth={1.75} /></span>
                        <input
                            type="text"
                            id="newTask"
                            placeholder="New task"
                            className="border-none bg-transparent p-0 m-0 w-full outline-none shadow-none text-base font-normal"
                        />
                    </div>
                    <button
                        onClick={() => addTask(document.getElementById("newTask").value)}
                        className="bg-blue-500 text-white hover:bg-white hover:border hover:border-blue-500 hover:text-blue-500 transition duration-300 ease-in-out transform hover:scale-105 rounded-xl w-fit p-2"
                    >
                        Add Task
                    </button>
                </div>
                <div className="flex flex-col justify-centergap-5 w-full h-full p-4 overflow-auto">
                    <div className="overflow-auto w-full">
                        <TaskList
                            tasks={filteredTasks}
                            notes={notes}
                            approveTask={approveTask}
                            deleteTask={deleteTask}
                            addNote={addNote}
                            updateTask={updateTask} // Passing updateTask function
                            updateNote={updateNote} // Passing updateNote function
                            toggleNoteCompletion={toggleNoteCompletion}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainApp; // Export the MainApp component
