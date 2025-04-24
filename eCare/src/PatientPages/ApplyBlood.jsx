import React from "react";
import { useLocation } from "react-router-dom";



export default function ApplyBlood() {
  const location = useLocation();
  const bloodType = location.state?.bloodType || "Unknown";

  return (
    <div className="apply-blood-container">
      <h2>Apply for {bloodType} Blood</h2>
      <form>
        <input type="text" placeholder="Your Name" required />
        <input type="text" placeholder="Contact Number" required />
        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
}
