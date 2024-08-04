import { useEffect, useState } from "react";
import contactService from "./services/contacts";

const Notification = ({ message }) => {
  if (message === "") {
    return null;
  }

  return <div className="notification">{message}</div>;
};

const Contact = ({ person, handleDelete }) => {
  return (
    <div>
      <p>
        {person.name} {person.number}{" "}
        <button onClick={() => handleDelete(person.id)}>Delete</button>
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

const Contacts = ({ filterText, persons, handleDelete }) => {
  return (
    <div>
      {filterText.trim() === ""
        ? persons.map((person) => (
            <Contact
              key={person.name}
              person={person}
              handleDelete={handleDelete}
            />
          ))
        : persons
            .filter((person) =>
              person.name
                .toLowerCase()
                .includes(filterText.trim().toLowerCase())
            )
            .map((person) => (
              <Contact
                key={person.name}
                person={person}
                handleDelete={handleDelete}
              />
            ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterText, setFilterText] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    contactService.getContacts().then((response) => {
      setPersons(response);
    });
  }, []);

  const handleUpdate = (oldPerson) => {
    const updatedPerson = { ...oldPerson, number: newNumber };
    contactService
      .updateContact(oldPerson.id, updatedPerson)
      .then((returnedPerson) => {
        setPersons(
          persons.map((person) => {
            return person.id === oldPerson.id ? returnedPerson : person;
          })
        );
      })
      .catch((error) => {
        setNotificationMessage(`${newName}'s number has been changed`);
        setTimeout(() => {
          setNotificationMessage("");
        }, 5000);
      });
  };

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
    if (numberIsInList) {
      setNewName("");
      setNewNumber("");
      return alert(`${newNumber} is already in contacts`);
    }
    if (nameIsInList) {
      if (
        window.confirm(`${newName} is already in list. Replace their number?`)
      ) {
        handleUpdate(persons.find((person) => person.name === newName));
        setNewName("");
        setNewNumber("");
        setNotificationMessage(`${newName}'s number has been changed`);
        setTimeout(() => {
          setNotificationMessage("");
        }, 5000);
        return;
      } else {
        setNewName("");
        setNewNumber("");
        return;
      }
    }
    contactService
      .createContact({ name: newName, number: newNumber })
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
        setNotificationMessage(`Added ${returnedPerson.name}`);
        setTimeout(() => {
          setNotificationMessage("");
        }, 5000);
      });
  };

  const handleDelete = (id) => {
    if (
      window.confirm(
        `Delete ${persons.find((person) => person.id === id).name}`
      )
    )
      contactService.deleteContact(id).then((deletedPerson) => {
        setPersons((oldList) => {
          return oldList.filter((person) => person.id !== deletedPerson.id);
        });
        setNotificationMessage(`Deleted ${deletedPerson.name}`);
        setTimeout(() => {
          setNotificationMessage("");
        }, 5000);
      });
  };

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterText = (event) => setFilterText(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
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
      <Contacts
        filterText={filterText}
        persons={persons}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
