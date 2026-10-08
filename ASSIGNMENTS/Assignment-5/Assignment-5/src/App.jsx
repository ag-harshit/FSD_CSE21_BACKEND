import {useState} from "react";

const App = () => {
  const [search, setSearch] = useState("");
  const documents = [
    { name: "FSD", 
      file: "FSD-Node.pdf",
    },
    { name: "React",
      file: "React-Notes.pdf",
    },
    { name: "Node",
      file: "Node-Notes.pdf",
    },
  ];

  return (
    <div>
      <h1>Document Search</h1>
      <input
        type="text"
        placeholder="Search documents..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {documents
          .filter((doc) =>
            doc.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((doc, index) => (
            <li key={index}>
              <a href={`http://localhost:5000/files/${doc.file}`} 
              download
              >
                <button>Download {doc.name}</button>
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default App;