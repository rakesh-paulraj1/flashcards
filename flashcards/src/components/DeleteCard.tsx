import React from 'react';

interface ConfirmDeleteDialogProps {
  card: { question: string; answer: string; id: number };
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteCard: React.FC<ConfirmDeleteDialogProps> = ({ card, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div 
        className="fixed inset-0 bg-black opacity-50"
        onClick={onCancel}
      ></div>
      <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
        <h1 className="text-xl font-bold text-gray-800 mb-4">Confirm Deletion</h1>
        <p className="mb-4">Are you sure you want to delete this card?</p>
        <p className="text-gray-600 mb-4">Question: {card.question}</p>
        <p className="text-gray-600 mb-4">Answer: {card.answer}</p>
        <div className="flex justify-end gap-4">
          <button 
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
          <button 
            onClick={onCancel}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCard;
