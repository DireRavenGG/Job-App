import Navigation from "../components/Navigation";
import AddForm from "../components/AddForm";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Job } from "../types/job";
interface AddProps {
  demo: Job[];
  setDemo: any;
}
export default function Add({ demo, setDemo }: AddProps) {
  const { data: session } = useSession();
  const [user, setUser] = useState({});

  useEffect(() => {
    if (session) {
      setUser(session);
    }
  }, [session]);

  return (
    <div>
      <Navigation signIn={signIn} signOut={signOut} user={user} />
      <AddForm user={user} setDemo={setDemo} demo={demo} />
    </div>
  );
}
