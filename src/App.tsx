import Header from './components/Header/Header';
import ProgressBar from './components/ProgressBar/ProgressBar';
import QuizFeed from './components/QuizFeed/QuizFeed';

function App() {
  return (
    <div className="w-full min-h-screen bg-[#566AF5] pt-10 overflow-hidden">
      <div className="m-auto max-w-3xl">
        <Header />
        <ProgressBar />
        <QuizFeed />
      </div>
    </div>
  );
}

export default App;
