import React from 'react';
import CycleCreator from "../components/Admin/CycleCreator.tsx";
import './index.css';
  
function Admin () {
  return (
    <div className="page-wrapper">
      <h1>Admin Home</h1>
      <p>Welcome to admin home, admin! Here you will be able to create new cycles, send reminder emails, monitor quotas, etc.</p>
      <CycleCreator/>
    </div>
  );
};
  
export default Admin;