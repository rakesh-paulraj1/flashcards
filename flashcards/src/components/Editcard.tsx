import React, { useState, useEffect } from 'react';

interface EditCardProps {
  card: { question: string; answer: string; index: number } | null;
  onShadowClick: () => void;
  onUpdateCard: (card: { question: string; answer: string; index: number }) => void;
}


const EditCard: React.FC<EditCardProps> = ({ card, onShadowClick, onUpdateCard }) => {
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');

  useEffect(() => {
    if (card) {
      setQuestion(card.question);
      setAnswer(card.answer);
    }
  }, [card]);

  const handleUpdate = () => {
    if (question && answer && card) {
      onUpdateCard({
        question,
        answer,
        index: card.index, 
      });
      window.location.reload();
    }
  };

  if (!card) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div 
        className="fixed inset-0 bg-black opacity-50"
        onClick={onShadowClick}
      ></div>
      <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Card</h1>
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
            onClick={handleUpdate}
            className="border border-gray-300 bg-white text-gray-800 px-6 py-3 rounded hover:bg-gray-100 focus:outline-none text-lg"
          >
            Update!
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCard;
