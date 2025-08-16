import { ReactElement } from 'react';

// Define the User type (consider importing from a shared types file)
interface User {
  id: string;
  name: string;
  email: string;
  // Add other user properties as needed
}

export default async function WorkspacePage(): Promise<ReactElement> {
  // SSR: validate session before loading workspace
  const user: User | null = await getSessionFromServer();
  
  if (!user) redirect("/sign-in");
  
  return (
    <AppProviders>
      <WorkspaceClient />
    </AppProviders>
  );
}

// Type declarations for external dependencies
declare function getSessionFromServer(): Promise<User | null>;
declare function redirect(path: string): never;
declare function AppProviders({ children }: { children: React.ReactNode }): ReactElement;
declare function WorkspaceClient(): ReactElement;