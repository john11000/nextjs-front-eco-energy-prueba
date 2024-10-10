import React from "react";

const FloatingActionButton = ({ href, label }) => {
  return (
    <a
      href={href}
      className="flex items-center justify-center mb-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-green-300"
      title={label}
    >
      {label}
    </a>
  );
};

export default FloatingActionButton;
