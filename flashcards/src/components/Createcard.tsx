import React, { useState } from 'react';

interface CreateCardProps {
  onShadowClick: () => void;
  onCreateCard: (card: { question: string; answer: string; }) => void;
}


const CreateCard: React.FC<CreateCardProps> = ({ onShadowClick, onCreateCard }) => {
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');

  const handleSubmit = () => {
    if (question && answer) {
      onCreateCard({
        question,
        answer,
      });
    }
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
    <div 
      className="fixed inset-0 bg-black opacity-50"
      onClick={onShadowClick}
    ></div>
    <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Create New Card</h1>
      <div className="text-center">
        <input 
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="block w-full max-w-md mx-auto mb-4 p-3 border border-gray-300 rounded"
        />
        <input 
          placeholder="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="block w-full max-w-md mx-auto mb-4 p-3 border border-gray-300 rounded"
        />
        <button 
          onClick={handleSubmit}
          className="border border-gray-300 bg-white text-gray-800 px-6 py-3 rounded hover:bg-gray-100 focus:outline-none text-lg"
        >
          Create!
        </button>
      </div>
    </div>
  </div>
  );
};

export default CreateCard;
