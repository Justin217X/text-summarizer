import { ReactNode } from 'react';

// Define the user type based on what your session returns
interface User {
  id: string;
  name: string;
  email: string;
  // Add other user properties as needed
}

interface AppLayoutProps {
  children: ReactNode;
}

function AppLayout({ children }: AppLayoutProps) {
  // SSR: can fetch user session here
  // ✅ This runs server-side before rendering the page
  const user: User | null = getSessionFromServer();
  
  return (
    <html>
      <body>
        {/*
       <Navbar user={user} /> 
       <Sidebar /> 
       */}
        <main>{children}</main>
      </body>
    </html>
  );
}

// You'll also need to type your getSessionFromServer function
declare function getSessionFromServer(): User | null;