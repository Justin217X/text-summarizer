import { ReactElement } from 'react';

// Define the Note type based on your Prisma schema
interface Note {
  id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  // Add other note properties from your Prisma schema
}

// Define the User type (you might want to import this from a shared types file)
interface User {
  id: string;
  name: string;
  email: string;
  // Add other user properties as needed
}

function DashboardHome(): ReactElement {
  // SSR: could fetch "recent notes" here
  const notes: Note[] = prisma.note.findMany({ userId: user.id });
  
  return (
    <section>
      <h2>Dashboard</h2>
    // Assuming NotesList is a component that takes an array of notes and renders them 
      { /* 
        <NotesList notes={notes} />
      */ }
    </section>
  );
}

// Type declarations for external dependencies
declare const prisma: {
  note: {
    findMany(params: { userId: string }): Note[];
  };
};

declare const user: User;