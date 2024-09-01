import "./AddEmployee.css";
import React, { useState } from "react";

function AddEmployee(props) {
  // Declare state variables for each of the form fields and the response message
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState(""); // New state for response message

  // Write a function to handle the form submission
  function handleSubmit(event) {
    // Prevent the default behaviour of the form submission
    event.preventDefault();
    // Prepare the data to be sent to the server
    const data = {
      first_name: firstName,
      last_name: lastName,
      email: emailAddress,
      password: password,
    };
    // Send the data to the server
    const apiUrl = "http://13.60.105.25:4000/add-employee";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    fetch(apiUrl, requestOptions) // fetch method sends filled data from the add-employee page to post to database
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setResponseMessage("Successfully added"); // Set the response message
        // Redirect the user to the login page after 5 seconds
        setTimeout(() => {
          window.location.href = "/login";
        }, 5000);
      })

      .catch((error) => {
        console.error("Error:", error);
        setResponseMessage("Failed to add employee"); // Handle error
      });
  }

  return (
    <div>
      <h1>Add Employee</h1>
      {responseMessage && <p>{responseMessage}</p>}{" "}
      {/* Display the response message */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="fname">First name:</label>
        <br />
        <input
          type="text"
          id="fname"
          name="fname"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
        <br />
        <label htmlFor="lname">Last name:</label>
        <br />
        <input
          type="text"
          id="lname"
          name="lname"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
        <br />
        <label htmlFor="email">Email:</label>
        <br />
        <input
          type="text"
          id="email"
          name="email"
          value={emailAddress}
          onChange={(event) => setEmailAddress(event.target.value)}
        />
        <br />
        <label htmlFor="password">Password:</label>
        <br />
        <input
          type="text"
          id="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default AddEmployee;
