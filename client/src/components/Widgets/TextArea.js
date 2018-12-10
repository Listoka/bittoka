import React from "react";

export const TextArea = props => (
  <div className="">
    <textarea className="rounded w-full p-2 outline-none bg-input-background text-light-gray border border-mack-the-knife focus:border-brand-green focus:border-0" rows="8" {...props} />
  </div>
);