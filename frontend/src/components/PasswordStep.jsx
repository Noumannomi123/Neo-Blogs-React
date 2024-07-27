const PasswordStep = ({ onBack }) => (
  <div className="step">
    <h2>Enter your password</h2>
    <input type="password" placeholder="Password" />
    <button onClick={onBack}>Back</button>
    <button>Sign In</button>
  </div>
);

export default PasswordStep;
