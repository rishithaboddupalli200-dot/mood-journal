
import { useState, useEffect } from "react";
import "./App.css";

const moods = [
  { emoji: "😊", label: "Happy" },
  { emoji: "😌", label: "Calm" },
  { emoji: "😔", label: "Sad" },
  { emoji: "😡", label: "Angry" },
  { emoji: "😴", label: "Tired" },
];

function App() {
  const [mood, setMood] = useState("");
  const [note, setNote] = useState("");
  const [entries, setEntries] = useState(() => {
    return JSON.parse(localStorage.getItem("moodEntries")) || [];
  });

  useEffect(() => {
    localStorage.setItem("moodEntries", JSON.stringify(entries));
  }, [entries]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!mood || !note.trim()) {
      alert("Please select a mood and write a note.");
      return;
    }

    const newEntry = {
      id: Date.now(),
      mood,
      note,
      date: new Date().toLocaleDateString(),
    };

    setEntries([newEntry, ...entries]);
    setMood("");
    setNote("");
  }

  function deleteEntry(id) {
    setEntries(entries.filter((entry) => entry.id !== id));
  }

  return (
    <div className="app">
      <h1>My Mood Journal</h1>
      <p className="subtitle">Take a moment to check in with yourself.</p>

      <form onSubmit={handleSubmit} className="journal-form">
        <h2>How are you feeling today?</h2>

        <div className="mood-options">
          {moods.map((item) => (
            <button
              type="button"
              key={item.label}
              className={mood === item.label ? "selected" : ""}
              onClick={() => setMood(item.label)}
            >
              <span>{item.emoji}</span>
              {item.label}
            </button>
          ))}
        </div>

        <textarea
          placeholder="Write about your day..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <button type="submit" className="save-btn">
          Save Entry
        </button>
      </form>

      <section className="entries">
        <h2>Previous Entries</h2>

        {entries.length === 0 ? (
          <p>No entries yet. Write your first journal entry!</p>
        ) : (
          entries.map((entry) => {
            const selectedMood = moods.find(
              (item) => item.label === entry.mood
            );

            return (
              <article className="entry-card" key={entry.id}>
                <div className="entry-header">
                  <span>
                    {selectedMood?.emoji} {entry.mood}
                  </span>
                  <small>{entry.date}</small>
                </div>

                <p>{entry.note}</p>

                <button
                  className="delete-btn"
                  onClick={() => deleteEntry(entry.id)}
                >
                  Delete
                </button>
              </article>
            );
          })
        )}
      </section>
    </div>
  );
}

export default App;