import React from "react";

function Dashboard({ handleImport, handleExport, studentData }) {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">Students</h1>
      <div className="dashboard-options">
        <label className="dashboard-option">
          Import Students:
          <input
            className="dashboard-file-input"
            type="file"
            accept=".csv"
            onChange={handleImport}
          />
        </label>
        <div className="dashboard-option">
          <button className="dashboard-export-button" onClick={handleExport}>
            Export as CSV
          </button>
        </div>
      </div>
      {studentData.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll_No</th>
              <th>Address</th>
              <th>Institute</th>
              <th>Course</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {studentData.map((student) => (
              <tr key={student.Roll_No}>
                <td>{student.Name}</td>
                <td>{student.Roll_No}</td>
                <td>{student.Address}</td>
                <td>{student.Institute}</td>
                <td>{student.Course}</td>
                <td>{student.Email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dashboard;
