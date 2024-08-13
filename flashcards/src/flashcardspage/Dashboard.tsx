import { useEffect, useState } from 'react';
import axios from 'axios';
import { CardBody } from '../components/ui/3d-card';
import { CardItem } from '../components/ui/3d-card';
import CreateCard from '../components/Createcard';
import { CardContainer } from '../components/ui/3d-card';
import Header from '../components/Topbar';
import config from '../config';
import EditCard from '../components/Editcard';
import DeleteCard from '../components/DeleteCard';
interface FlashcardData {
  question: string;
  answer: string;
  id: number;
  total: number;
}

export const Dashboard = () => {
  const [flashcardData, setFlashcardData] = useState<FlashcardData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCreateCard, setShowCreateCard] = useState<boolean>(false);
  const [showEditCard, setShowEditCard] = useState<boolean>(false);
  const [showDeleteCard, setShowDeleteCard] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const jwttoken = localStorage.getItem('token');
  function getFlashcards() {
    axios.get(`${config.apiUrl}/flashcards`)
      .then((response) => {
        setFlashcardData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching flashcards:', error);
      });
  }

  useEffect(() => {
  const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    getFlashcards();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, flashcardData.length - 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };




  const handleCreateCard = async (card: { question: string; answer: string }) => {
    const response = await axios.post(`${config.apiUrl}/admin/addflashcards`, card, {
      headers: {
        Authorization: `${jwttoken}`
      }
    });

    console.log(response);
    setShowCreateCard(false);
  };
  const handleEditCard = async(card: { question: string; answer: string; index: number }) => {
    console.log(card);
    const response = await axios.put(`${config.apiUrl}/admin/editflashcards/${ card.index}`, card, {
      headers: {
        Authorization: `${jwttoken}`
      }
    });
    console.log(response);
    const updatedFlashcards = flashcardData.map((flashcard) =>
      flashcard.id === card.index ? { ...flashcard, question: card.question, answer: card.answer } : flashcard
    );
    setFlashcardData(updatedFlashcards);
    setShowEditCard(false);
  };
  const handleDeleteCard = async (cardId: number) => {
    try {
      await axios.delete(`${config.apiUrl}/admin/deleteflashcards/${cardId}`, {
        headers: {
          Authorization: `${jwttoken}`
        }
      });
      window.location.reload();
      const updatedFlashcards = flashcardData.filter((flashcard) => flashcard.id !== cardId);
      setFlashcardData(updatedFlashcards);
    } catch (error) {
      console.error('Error deleting flashcard:', error);
    }
  };



  if (flashcardData.length === 0) {
    return <div>Loading...Please wait till the backend starts</div>;
  }

  const currentFlashcard = flashcardData[currentIndex];
  
  return (
    <div className="flex flex-col h-screen">
        <Header/>
        <div className="flex-grow flex items-center justify-center bg-gray-100">
        <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
         frontContent={currentFlashcard.question}
         backContent={currentFlashcard.answer}
         cardNumber={currentFlashcard.id}
         showNextCard={handleNext}
         showPrevCard={handlePrev}
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >.
        </CardItem>
        {isAuthenticated && (
        <div className="flex justify-between items-center mt-4">
        <button
                onClick={() => setShowCreateCard(true)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gary-900"
              >Create card</button>
               <button
                onClick={() => setShowEditCard(true)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gary-900"
              >Edit Card</button>
              <button
                onClick={() => setShowDeleteCard(true)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-900"
              >Delete Card</button>
        </div>)}
      </CardBody>

    </CardContainer>
    
    {showCreateCard && (
          <CreateCard 
            onShadowClick={() => setShowCreateCard(false)}
            onCreateCard={handleCreateCard}
          />
        )}
        {
        showEditCard && (
          <EditCard
              onShadowClick={() => setShowEditCard(false)}
              onUpdateCard={handleEditCard} 
               card={{
                question: currentFlashcard.question,
                answer: currentFlashcard.answer,
                index: currentFlashcard.id
              }}
          />
        )
        }

        {showDeleteCard && (
          <DeleteCard



              onCancel={() => setShowDeleteCard(false)}
              onConfirm={() => handleDeleteCard(currentFlashcard.id)}
              card={{
                question: currentFlashcard.question,
                answer: currentFlashcard.answer,
 id: currentFlashcard.id
              }}
          />

        )}

      
      </div>
    </div>
  );
};
