import { useEffect, useState } from 'react';
import ReactConfetti from 'react-confetti';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { useAppSelector } from '../../app/hooks';
import { getQuizData } from '../../app/quizSlice/getQuizSlice';
import personLogo from '../../assets/person.png';

const Header = () => {
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>({
    height: 0,
    width: 0,
  });

  //is open is for final result animation
  const [isOpen, setIsOpen] = useState<boolean>(false);

  //open modal show or hide state
  const [openModal, setOpenModal] = useState<boolean>(false);

  //get quiz score------------------from state
  const {
    finalResult: { score },
    checkedQuizData: { submittedQuiz },
  } = useAppSelector(getQuizData);

  //get screen size------
  useEffect(() => {
    window.addEventListener('load', () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    });

    //
    submittedQuiz === 5 && score >= 15
      ? setIsOpen(true)
      : setIsOpen(false);
  }, [submittedQuiz, score]);

  return (
    <header
      className="m-auto w-full max-w-3xl h-20 rounded-full px-5 py-4 items-center
      flex justify-between shadow-lg shadow-[#475EF5]/70 headerShadow relative
      border-t-[#d3d3d359] border-t border-b-2 border-b-[#1b34d53d]"
    >
      <div className="flex items-center relative">
        <img
          src={personLogo}
          alt="person"
          className="h-12 w-12 rounded-full overflow-hidden"
        />
        <h1 className="ml-3 font-semibold text-white text-3xl">
          Shariar
        </h1>
        <AiOutlineInfoCircle
          onClick={() => setOpenModal((prevState) => !prevState)}
          onMouseOver={() => setOpenModal((prevState) => true)}
          onMouseOut={() => setOpenModal((prevState) => false)}
          className="ml-2 text-[#d9d9d9] cursor-pointer"
        />
      </div>
      <div>
        <p className="font-semibold text-white text-3xl w-[150px]">
          Score: <span className="font-medium">{score}</span>
        </p>
      </div>
      {isOpen && (
        <ReactConfetti
          recycle={isOpen}
          run={isOpen}
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={200}
        />
      )}

      {openModal && (
        <div className="absolute top-[48px] left-0 p-5 bg-[#fdfdfd] h-[300px] w-[300px] z-20 rounded-md shadow-lg">
          <h1 className="mb-2 font-medium">
            This is a Quiz Application
          </h1>
          <p className="mb-4">
            You have 5 Questions. Each Question have 4 answer. Each
            correct answer value 5.
          </p>
          <p className="text-black mb-3">
            <span className="uppercase text-[#fda228] mr-2">
              NOTE:
            </span>
            If you can selected 3 correct answer, then i have a
            spacial gift you😜.
          </p>
          <p>Application Creator - https://shariar.vercel.app</p>
        </div>
      )}
    </header>
  );
};

export default Header;
//
