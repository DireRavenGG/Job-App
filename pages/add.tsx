import Navigation from "../components/Navigation";
import AddForm from "../components/AddForm";
import { Job } from "../types/job";
import UserProps from "../types/user";
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from "../lib/config";
interface AddProps {
  demo: Job[];
  setDemo: any;
  user: UserProps;
}
export default function Add({ demo, setDemo, user }: AddProps) {
  return (
    <div>
      <Navigation />
      <AddForm user={user} setDemo={setDemo} demo={demo} />
    </div>
  );
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    return {
      props: {
        user: req.session.account || null,
      },
    };
  },
  ironOptions
);
