import React from "react";
import './Gist.css';

const Gist = () => (
  <div className= "container">
    <div className="row">
    <div className="col-md-2"></div>
      <div className="col-md-8">
        <div className="gistDescriptionBox card">
        <h2 className=" card-header">Listoka's Gist</h2>
        <div className="card-body">
        {/* <p><h6 className="underline">The 30 Second Elevator Pitch</h6></p> */}
        <p>Listoka is a writing and entertainment based platform where users will also find and contribute 
          to information that benefits people's lives. It will be similar to Reddit in the sense that users 
          will be able to create posts, leave comments, and follow others. The difference is the topics are 
          carefully constructed and chosen with purpose, and Bitcoin tips will be utilized as the main 
          incentivization tool. That is, people will make money for their contributions, and the higher the 
          quality of their contribution, the more they're likely to earn. Listoka aims to be a useful, fun, 
          money-making platform that  becomes the gateway to Bitcoin for the average, everyday person.
        </p>
        </div>
        </div>
      </div>
    <div className="col-md-2"></div>
    </div>
  </div>
);

export default Gist;
