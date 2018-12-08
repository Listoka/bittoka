import React from "react";

export const TextArea = props => (
  <div className="">
    <textarea className="rounded w-full p-2 outline-none bg-darkest-gray text-white" rows="8" {...props} />
  </div>
);