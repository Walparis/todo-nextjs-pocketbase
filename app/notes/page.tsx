import Link from "next/link";

import styles from "./Notes.module.css";
import CreateNote from "./createNote";

async function getNotes() {
  const res = await fetch(
    "http://127.0.0.1:8090/api/collections/todo_card/records",
    { cache: "no-store" }
  );
  const data = await res.json();
  return data?.items as any[];
}

export default async function NotesPage() {
  const notes = await getNotes();
  return (
    <div>
      <h1>Notes</h1>
      <div className={styles.grid}>
        {notes?.map((note) => {
          return <Note key={note.id} note={note}></Note>;
        })}
      </div>
      <CreateNote />
    </div>
  );
}

function Note({ note }: any) {
  const { id, title, content, created } = note || {};
  return (
    <Link href={`/notes/${id}`}>
      <div className={styles.note}>
        <h2>{title}</h2>
        <h5>{content}</h5>
        <p> {created} </p>
      </div>
    </Link>
  );
}
