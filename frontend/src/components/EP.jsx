import { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import EmailStep from './EmailStep';
import PasswordStep from './PasswordStep';
import './App.css'; // Import your CSS file for transition styles

function App() {
  const [step, setStep] = useState('email');

  const handleNext = () => setStep('password');
  const handleBack = () => setStep('email');

  return (
    <div className="App">
      <TransitionGroup>
        {step === 'email' && (
          <CSSTransition key="email" timeout={300} classNames="fade">
            <EmailStep onNext={handleNext} />
          </CSSTransition>
        )}
        {step === 'password' && (
          <CSSTransition key="password" timeout={300} classNames="fade">
            <PasswordStep onBack={handleBack} />
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  );
}

export default App;
