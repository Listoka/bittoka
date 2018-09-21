import React from "react";
import './flexContainer.css';

const subNav = ({children}) => (
//Adds an ID, the proper href link, and the actual name for each main category
    <div className="flex-container">
        {children}
    </div>
    
);
  
export default subNav;