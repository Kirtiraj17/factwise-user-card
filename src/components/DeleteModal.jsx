/* eslint-disable react/prop-types */
import { XMarkIcon } from "@heroicons/react/24/outline";

const DeleteModal = ({ setIsOpen, handleDelete }) => {
  return (
    <div className="flex justify-center items-center h-screen fixed top-0 left-0 right-0 backdrop-blur">
      <div className="min-w-[600px] p-4 bg-white border border-black rounded-md">
        <div className="flex justify-between mb-8">
          <h2>Are you sure you want to delete?</h2>
          <XMarkIcon
            className="w-5 h-5 cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        </div>
        <div className="flex justify-end">
          <button
            className="p-2 bg-red-400 text-white border border-blak rounded-md cursor-pointer"
            onClick={() => setIsOpen(false)}>
            Cancel
          </button>
          <button
            className="p-2 ml-2 bg-green-400 border border-blak rounded-md cursor-pointer"
            onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
