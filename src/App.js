import React, { useState, useEffect } from "react";
import { FaEnvelopeOpen, FaUser, FaMap, FaPhone, FaLock } from "react-icons/fa";
import { AiFillCalendar } from "react-icons/ai";

const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

function App() {
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState(null);
  const [title, setTitle] = useState("name");
  const [value, setValue] = useState("randon person");

  const getPerson = async () => {
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    const person = data.results[0];
    const { phone, email } = person;
    const { large: image } = person.picture;
    //large is renamed(destructured) as image
    const {
      login: { password },
    } = person;
    //password is inside login so it is destructred this way
    const { first, last } = person.name;
    const {
      dob: { age },
    } = person;
    const {
      street: { number, name },
    } = person.location;

    const newPerson = {
      image,
      phone,
      email,
      password,
      age,
      street: `${number} ${name}`,
      name: `${first} ${last}`,
    };
    setPerson(newPerson);
    setLoading(false);
    setTitle("name");
    setValue(newPerson.name);
  };

  useEffect(() => {
    getPerson();
  }, []);

  const handleValue = (e) => {
    if (e.target.classList.contains("icon")) {
      //if the target that I am hovering over does have a class icon
      const newValue = e.target.dataset.label; //getting data-label
      // console.log(newValue);
      setTitle(newValue);
      setValue(person[newValue]);
    }
  };

  return (
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="container">
          <img
            src={(person && person.image) || defaultImage}
            alt="randon user"
            className="user-img"
          />
          {/* (person && person.image)||defaultImage
          if person is true i.e. not null then display person.image
          otherwise diplay the default image */}
          <p className="user-title">my {title} is</p>
          <p className="user-value">{value}</p>
          <div className="value-list">
            <button
              className="icon"
              data-label="name"
              onMouseOver={handleValue}
            >
              <FaUser />
            </button>
            <button
              className="icon"
              data-label="email"
              onMouseOver={handleValue}
            >
              <FaEnvelopeOpen />
            </button>
            <button className="icon" data-label="age" onMouseOver={handleValue}>
              <AiFillCalendar />
            </button>
            <button
              className="icon"
              data-label="street"
              onMouseOver={handleValue}
            >
              <FaMap />
            </button>
            <button
              className="icon"
              data-label="phone"
              onMouseOver={handleValue}
            >
              <FaPhone />
            </button>
            <button
              className="icon"
              data-label="password"
              onMouseOver={handleValue}
            >
              <FaLock />
            </button>
          </div>
          <button className="btn" type="button" onClick={getPerson}>
            {loading ? "loading..." : "random user"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
