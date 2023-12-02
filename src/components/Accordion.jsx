/* eslint-disable react/prop-types */
import {
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PencilIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const Accordion = ({
  id,
  first,
  last,
  age,
  gender,
  country,
  description,
  picture,
  isOpen,
  onToggle,
  setIsDeleteModalOpen,
  setAccId,
  setData,
  data,
}) => {
  const celebInitData = {
    id,
    first,
    last,
    age,
    gender,
    country,
    description,
    picture,
  };

  const [celebData, setCelebData] = useState(celebInitData);
  const [isEditable, setIsEditable] = useState(false);
  const [isSaveActive, setIsSaveActive] = useState(false);
  const [errors, setErrors] = useState({
    age: "",
    country: "",
    description: "",
  });

  const handleFocus = () => setIsEditable(true);
  const handleBlur = () => setIsEditable(false);
  
  const validateInput = (fieldName, value) => {
    if (fieldName === "age") {
      if (isNaN(value) || value < 0 || value > 150) {
        return "Invalid age";
      } else if (value.length === 0) {
        return "Age name cannot be empty";
      }
    } else if (fieldName === "country") {
      if (value.length < 3) {
        return "Country name is too short";
      } else if (value.length === 0) {
        return "Country name cannot be empty";
      }
    } else if (fieldName === "description") {
      if (value.length > 1000) {
        return "Description is too long";
      } else if (value.length === 0) {
        return "Description name cannot be empty";
      }
    }

    return "";
  };

  const handleUpdate = (e) => {
    setIsSaveActive(true);
    setCelebData({
      ...celebData,
      [e.target.name]: e.target.value,
    });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: validateInput(e.target.name, e.target.value),
    }));
  };

  const handleSave = () => {
    handleBlur();

    let updatedData = data.map((celeb) =>
      celeb.id !== celebData.id ? celeb : celebData
    );
    setData(updatedData);
    // console.log(updatedData, "updated");

    setIsSaveActive(false);
  };

  const handleShowDelete = () => {
    setIsDeleteModalOpen(true);
    setAccId(id);
  };

  // console.log(celebData, "celebData");

  return (
    <div className="flex flex-col gap-2 rounded-lg bg-white p-5 border border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center basis-3/5">
          <div className="mr-4 rounded-full overflow-hidden">
            <img src={picture} alt={picture} />
          </div>
          {/* {isEditable ? (
            <input
              type="text"
              className={`rounded-md ${
                isEditable ? "border border-gray-200" : "border-0"
              }`}
              name="name"
              value={celebData.name}
              onChange={handleUpdate}
            />
          ) : ( */}
          <h3>{`${celebData.first} ${celebData.last}`}</h3>
          {/* )} */}
        </div>
        <div
          onClick={() => {
            handleBlur();
            onToggle();
          }}
          className="inline cursor-pointer">
          {isOpen ? (
            <ChevronUpIcon className="w-5 h-5" />
          ) : (
            <ChevronDownIcon className="w-5 h-5" />
          )}
        </div>
      </div>
      {isOpen && (
        <div
          className={`items-center text-left opacity-0 transition-all ${
            isOpen ? "contents visible" : "invisible"
          }`}>
          <div className="flex">
            <label className="basis-1/3 w-1/3">
              <span className="block text-gray-600 text-sm">Age</span>
              {isEditable ? (
                <>
                  <input
                    type="text"
                    className={`mr-2 focus:border focus:border-gray-200 rounded-md w-full ${
                      isEditable
                        ? errors.age
                          ? "border border-red-600"
                          : "border border-gray-200"
                        : "border-0"
                    }`}
                    name="age"
                    value={celebData.age}
                    onChange={handleUpdate}
                  />
                  {errors && errors.age && (
                    <span className="text-red-600 text-sm">{errors.age}</span>
                  )}
                </>
              ) : (
                <span className="mr-0.5">{celebData.age}</span>
              )}
            </label>
            <label className="basis-1/3 w-1/3">
              <span className="block text-gray-600 text-sm">Gender</span>
              {isEditable ? (
                <select
                  className={`mx-2 focus:border focus:border-gray-200 rounded-md ${
                    isEditable ? "border border-gray-200" : "border-0"
                  }`}
                  name="gender"
                  value={celebData.gender}
                  onChange={handleUpdate}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Rather not to say">Rather not to say</option>
                  <option value="Others">Others</option>
                </select>
              ) : (
                <span className="mr-0.5">{celebData.gender}</span>
              )}
            </label>
            <label className="basis-1/3 w-1/3">
              <span className="block text-gray-600 text-sm">Country</span>
              {isEditable ? (
                <>
                  <input
                    type="text"
                    className={`ml-2 focus:border focus:border-gray-200 rounded-md w-full ${
                      isEditable
                        ? errors.country
                          ? "border border-red-600"
                          : "border border-gray-200"
                        : "border-0"
                    }`}
                    name="country"
                    value={celebData.country}
                    onChange={handleUpdate}
                  />
                  {errors && errors.country && (
                    <span className="text-red-600 text-sm">
                      {errors.country}
                    </span>
                  )}
                </>
              ) : (
                <span className="mr-0.5">{celebData.country}</span>
              )}
            </label>
          </div>
          <div>
            <span className="block text-gray-600 text-sm">Description</span>
            {isEditable ? (
              <>
                <textarea
                  className={`w-full rounded-md ${
                    isEditable
                      ? errors.description
                        ? "border border-red-600"
                        : "border border-gray-200"
                      : "border-0"
                  }`}
                  rows={5}
                  name="description"
                  value={celebData.description}
                  onChange={handleUpdate}
                />
                {errors && errors.description && (
                  <span className="text-red-600 text-sm">
                    {errors.description}
                  </span>
                )}
              </>
            ) : (
              <p className="mr-0.5">{celebData.description}</p>
            )}
          </div>
          {isEditable ? (
            <div className="flex justify-end">
              <XCircleIcon
                className="w-5 h-5 cursor-pointer"
                onClick={() => {
                  handleBlur();
                  setIsSaveActive(false);
                  setCelebData(celebInitData);
                }}
              />
              <CheckCircleIcon
                className={`w-5 h-5 ml-2 ${
                  isSaveActive
                    ? "cursor-pointer"
                    : "cursor-not-allowed opacity-50"
                }`}
                onClick={isSaveActive ? handleSave : undefined}
              />
            </div>
          ) : (
            <div className="flex justify-end">
              <TrashIcon
                className="w-5 h-5 cursor-pointer"
                onClick={handleShowDelete}
              />
              <PencilIcon
                className={`w-5 h-5 ml-2 ${
                  celebData.age > 18 ? "cursor-pointer" : "cursor-not-allowed"
                }`}
                onClick={celebData.age > 18 ? handleFocus : undefined}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Accordion;
