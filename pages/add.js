import Navigation from "../components/Navigation";
import AddForm from "../components/AddForm";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Add({ cheese, setCheese }) {
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
      <AddForm user={user} setCheese={setCheese} cheese={cheese} />
    </div>
  );
}
