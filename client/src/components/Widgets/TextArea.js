import React from "react";

export const TextArea = props => (
  <div className="">
    <textarea className="rounded w-full p-2 outline-none bg-darkest-gray text-white border border-white focus:border-brand-green focus:border-0" rows="8" {...props} />
  </div>
);