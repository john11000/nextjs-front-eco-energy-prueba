import React from "react";
import FloatingActionButton from "./FloatingActionButton";

const Options = () => {
  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end">
      <FloatingActionButton href="/customers" label="Customers" />
      <FloatingActionButton href="/dashboard" label="Dashboard" />
      <FloatingActionButton href="/reports" label="Reports" />
    </div>
  );
};

export default Options;
