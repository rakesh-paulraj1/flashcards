import  { useState } from 'react';
import axios from 'axios';
const Flashcard = ({ flashcard, onNext, onPrev }: { flashcard: { question: string; answer: string; index: number; total: number }; onNext: () => void; onPrev: () => void }) => {
  const [flipped, setFlipped] = useState(false);
  const flashcarddata,setflashcarddata = useState();

  const handleFlip = () => {
    setFlipped(!flipped);
  };
  function getflashcard(){
    axios.get('http://localhost:3000/flashcard')
  }

  return (
    <div className="flex flex-col items-center p-4">
      <div 
        className={`w-80 h-40 bg-white border rounded-lg shadow-md flex items-center justify-center cursor-pointer ${flipped ? 'flip' : ''}`} 
        onClick={handleFlip}
      >
        <div className="absolute w-full h-full flex items-center justify-center p-4">
          <div className={`transition-transform duration-500 ${flipped ? 'transform rotate-y-180' : ''}`}>
            <div className="absolute w-full h-full flex items-center justify-center p-4 bg-blue-500 text-white text-lg rounded-lg">
              {!flipped ? flashcard.question : flashcard.answer}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex space-x-4">
        <button 
          onClick={onPrev} 
          disabled={flashcard.index === 0} 
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button 
          onClick={onNext} 
          disabled={flashcard.index === flashcard.total - 1} 
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Flashcard;
