import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Navigation from "../components/Navigation";

const SignUp = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState({});

  useEffect(() => {
    if (session) {
      setUser(session);
    }
  }, [session]);
  return (
    <div>
      <Navigation />
    </div>
  );
};

export default SignUp;
