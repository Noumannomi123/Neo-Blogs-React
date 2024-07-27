
const EmailStep = ({ onNext }) => (
  <div className="step">
    <h2>Enter your email</h2>
    <input type="email" placeholder="Email" />
    <button onClick={onNext}>Next</button>
  </div>
);

export default EmailStep;
