// import './App.css'
import { useState } from "react";
import Accordion from "./components/Accordion";
import SearchBar from "./components/SearchBar";
import DeleteModal from "./components/DeleteModal";
import celebrities from "./celebrities.json";

function calculateAge(dateString) {
  const dob = new Date(dateString);
  const now = new Date();

  // Calculate the difference in years
  const age = now.getFullYear() - dob.getFullYear();

  // Adjust age based on the month and day of birth
  if (
    now.getMonth() < dob.getMonth() ||
    (now.getMonth() === dob.getMonth() && now.getDate() < dob.getDate())
  ) {
    return age - 1;
  } else {
    return age;
  }
}

function App() {
  const [data, setData] = useState(celebrities);
  const [searchValue, setSearchValue] = useState("");
  const [openIndex, setOpenIndex] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [accId, setAccId] = useState("");

  const handleSearch = (e) => setSearchValue(e.target.value);

  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);

    const delData = data.filter((celeb) => celeb.id !== accId);
    setData([...delData]);

    toggleAccordion();
    setIsDeleteModalOpen(false);
  };

  // console.log(data, 'data')

  return (
    <>
      <div className="relative">
        <div className="text-center my-8 mx-auto">
          <h1 className="text-red-400 mb-2">List View</h1>
          <SearchBar searchValue={searchValue} handleSearch={handleSearch} />
          <div className="my-8 mx-auto text-center flex flex-col items-center">
            {data
              .filter((celeb) => {
                const fullName =
                  celeb.first.toLowerCase() + " " + celeb.last.toLowerCase();
                return fullName.includes(searchValue.toLowerCase());
              })
              .map((celebrity, index) => (
                <div
                  className="w-auto min-w-[500px] max-w-[500px] mb-4 shadow-lg"
                  key={celebrity.id}>
                  <Accordion
                    id={celebrity.id}
                    first={celebrity.first}
                    last={celebrity.last}
                    age={calculateAge(celebrity.dob)}
                    gender={celebrity.gender}
                    country={celebrity.country}
                    picture={celebrity.picture}
                    description={celebrity.description}
                    isOpen={openIndex === index}
                    onToggle={() => toggleAccordion(index)}
                    setIsDeleteModalOpen={setIsDeleteModalOpen}
                    handleDelete={handleDelete}
                    setAccId={setAccId}
                    setData={setData}
                    data={data}
                  />
                </div>
              ))}
          </div>
        </div>
        {isDeleteModalOpen && (
          <DeleteModal
            setIsOpen={setIsDeleteModalOpen}
            handleDelete={handleDelete}
          />
        )}
      </div>
    </>
  );
}

export default App;
