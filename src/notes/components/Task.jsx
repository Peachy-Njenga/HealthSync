import React, { useState } from 'react';
import ProgressBar from './ProgressBar'; // Import the ProgressBar component
import { Check, ListTodo, Pencil, Plus } from 'lucide-react';
import { TERipple } from 'tw-elements-react';

const Task = ({ task, notes, approveTask, deleteTask, addNote, updateTask, updateNote, toggleNoteCompletion }) => {
    // State for managing task editing mode and text
    const [isEditingTask, setIsEditingTask] = useState(false);
    const [taskText, setTaskText] = useState(task.text);
    const [noteText, setNoteText] = useState('');
    const [editNoteId, setEditNoteId] = useState(null);
    const [editNoteText, setEditNoteText] = useState('');

    const TASK_CHAR_LIMIT = 70; // Character limit for tasks
    const NOTE_CHAR_LIMIT = 50; // Character limit for notes

    // Check if all notes are completed
    const allNotesCompleted = notes.every(note => note.completed);

    // Calculate the completion percentage
    const completionPercentage = notes.length ? (notes.filter(note => note.completed).length / notes.length) * 100 : 0;

    // Handle task text change
    const handleTaskChange = (e) => {
        if (e.target.value.length <= TASK_CHAR_LIMIT) {
            setTaskText(e.target.value);
        }
    };

    // Save the edited task
    const saveTask = () => {
        if (taskText.trim().length > 0) {
            updateTask(task.id, { ...task, text: taskText });
            setIsEditingTask(false);
        }
    };

    // Handle note text change
    const handleNoteChange = (e) => {
        if (e.target.value.length <= NOTE_CHAR_LIMIT) {
            setNoteText(e.target.value);
        }
    };

    // Add a new note to the task
    const handleAddNote = () => {
        if (noteText.trim().length > 0) {
            addNote(task.id, noteText);
            setNoteText('');
        }
    };

    // Start editing a note
    const startEditNote = (note) => {
        setEditNoteId(note.id);
        setEditNoteText(note.text);
    };

    // Save the edited note
    const saveEditNote = () => {
        if (editNoteText.trim().length > 0) {
            updateNote(task.id, editNoteId, editNoteText);
            setEditNoteId(null);
            setEditNoteText('');
        }
    };

    // Handle the change of note text being edited
    const handleEditNoteChange = (e) => {
        setEditNoteText(e.target.value);
    };

    return (
        <div className='border border-b p-4 rounded-md w-full bg-white'>
            
            {isEditingTask ? (
                <>
                    <input
                        type="text"
                        value={taskText}
                        onChange={handleTaskChange}
                    />
                    <span>{taskText.length}/{TASK_CHAR_LIMIT}</span>
                    <button onClick={saveTask}
                        className='bg-white p-1 rounded-sm w-20 border-blue-500 border '>Save</button>
                </>
            ) : (
                <>
                    <h3 className='flex justify-start'>{task.text}</h3>
                    <button onClick={() => setIsEditingTask(true)}
                        className='bg-white p-1 rounded-sm w-20 border-blue-500 border '>Edit</button>
                </>
            )}
            <button
                className='bg-white p-1 rounded-sm w-20 border-blue-500 border m-2'
                onClick={() => approveTask(task.id)} disabled={!allNotesCompleted}>
                {task.approved ? 'Unapprove' : 'Approve'}
            </button>
            <button onClick={() => deleteTask(task.id)}
                className='bg-white p-1 rounded-sm w-20 border-blue-500 border'>Delete</button>

            {/* Add the progress bar here */}
            <ProgressBar completionPercentage={completionPercentage} />

            <div className="notes-list">
                {notes.map((note, index) => (
                    <div key={note.id} className="flex justify start">

                        {editNoteId === note.id ? (
                            <>
                                <div className='flex gap-3 w-full '>
                                    <div className=''>
                                        <input
                                            type="text"
                                            value={editNoteText}
                                            onChange={handleEditNoteChange}
                                            className='border-b  bg-transparent p-0 m-0  outline-none shadow-none text-base font-normal'
                                        />
                                        <span className='text-xs'>{editNoteText.length}/{NOTE_CHAR_LIMIT}</span>
                                    </div>
                                    <button onClick={saveEditNote} className=''><Check size={20} strokeWidth={2.25} /></button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className='flex justify-between flex-row  w-full border-b border-black p-2'>
                                    <div className='flex gap-2'>
                                        <input
                                            type="checkbox"
                                            checked={note.completed}
                                            onChange={() => toggleNoteCompletion(task.id, note.id)}
                                        />
                                        <div dangerouslySetInnerHTML={{ __html: note.text }} />
                                    </div>
                                    <button onClick={() => startEditNote(note)} className='text-sm'><Pencil size={16} strokeWidth={1.5} /></button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>

            {/* adding a new note */}
            <div className='flex flex-row  gap-5 mt-4'>
                <div className='flex-row flex items-end w-full'>
                    <div className='border flex items-center border-blue-500 rounded-lg'>
                        <span><ListTodo size={20} strokeWidth={1.75} /></span>
                        <input
                            type="text"
                            placeholder="Add note"
                            value={noteText}
                            onChange={handleNoteChange}
                            className=' bg-transparent p-1 m-0 rounded-lg  outline-none shadow-none text-base font-normal'
                        />
                    </div>
                    <span className='text-xs'>{noteText.length}/{NOTE_CHAR_LIMIT}</span>
                </div>
                <button onClick={handleAddNote}
                    className="bg-blue-500 p-1 hover:bg-blue-400 rounded-lg border text-sm transition duration-300 ease-in-out transform hover:scale-105">
                    <Plus size={20} color="#ffffff" strokeWidth={1.75} />
                </button>

            </div>
        </div>
    );
};

export default Task;
