import "./App.css";
import react from "react";

function App() {
  const [languages, setLanguages] = react.useState([
    { name: "Php", votes: 0 },
    { name: "Python", votes: 0 },
    { name: "JavaSript", votes: 0 },
    { name: "Java", votes: 0 },
  ]);

  const voteIncrement = (index) => {
    setLanguages(
      languages.map((lang, i) =>
        i === index ? { ...lang, votes: lang.votes + 1 } : lang
      )
    );
  };

  return (
    <div className="App">
      <header className="container mx-auto flex flex-col justify-center text-center px-4 gap-4 py-8">
        <h1 className="text-3xl font-bold text-indigo-600">
          Programming Language Voting App
        </h1>
        <p className="text-lg text-gray-600 drop-shadow-2xl">
          Vote for your favorite programming language!
        </p>
      </header>

      <div className="container mx-auto grid grid-rows-4 justify-center gap-6 px-4 pb-8">
        {languages.map((language, index) => (
          <div key={language.name} className="border border-indigo-100 bg-white rounded-lg flex flex-rows justify-between p-4 px-6 w-xl items-center shadow-md shadow-indigo-200/70">
            
            {/* Total votes display*/}
            <div>
              <span className="text-4xl font-bold text-indigo-600">
                {language.votes}
              </span>
              <span className="block text-gray-500">votes</span>
            </div>

            {/* programming language name */}
            <h3 className="text-xl font-semibold ">{language.name}</h3>

            {/* Vote button */}
            <button
              onClick={() => voteIncrement(index)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
              Vote
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
