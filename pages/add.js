import Navigation from "../components/Navigation";
import AddForm from "../components/AddForm";
import { useState } from "react";

export default function Add() {
  const [jobObject, setJobObject] = useState({});

  return (
    <div>
      <Navigation />
      <AddForm setJobObject={setJobObject} />
    </div>
  );
}
