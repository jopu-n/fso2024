import { useEffect, useState } from "react";
import axios from "axios";

const Contact = ({ person }) => {
  return (
    <div>
      <p>
        {person.name} {person.number}
      </p>
    </div>
  );
};

const TextFilter = ({ filterText, handleFilterText }) => {
  return (
    <div>
      filter contacts: <input value={filterText} onChange={handleFilterText} />
    </div>
  );
};

const AddForm = ({
  handleAddPerson,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={handleAddPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Contacts = ({ filterText, persons }) => {
  return (
    <div>
      {filterText.trim() === ""
        ? persons.map((person) => <Contact key={person.name} person={person} />)
        : persons
            .filter((person) =>
              person.name
                .toLowerCase()
                .includes(filterText.trim().toLowerCase())
            )
            .map((person) => <Contact key={person.name} person={person} />)}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleAddPerson = (event) => {
    event.preventDefault();
    if (newName.trim() === "" || newNumber.trim() === "") {
      return alert("Name and number required");
    }

    let nameIsInList = false;
    let numberIsInList = false;
    persons.forEach((person) => {
      if (person.name === newName) {
        nameIsInList = true;
      }
      if (person.number === newNumber) {
        numberIsInList = true;
      }
    });
    if (nameIsInList || numberIsInList) {
      setNewName("");
      setNewNumber("");
      return nameIsInList
        ? alert(`${newName} is already in contacts`)
        : alert(`${newNumber} is already in contacts`);
    }
    setPersons(persons.concat({ name: newName, number: newNumber }));
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterText = (event) => setFilterText(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <TextFilter filterText={filterText} handleFilterText={handleFilterText} />
      <h2>Add a new</h2>
      <AddForm
        handleAddPerson={handleAddPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Contacts filterText={filterText} persons={persons} />
    </div>
  );
};

export default App;
