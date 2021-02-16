import './App.css';
import CreditCard from './components/CreditCard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Credit Card Validation</h1>
      </header>
      <main>
        <CreditCard />
        <p>Working card numbers:</p>
        <p>5525 7574 2209 3610</p>
        <p>4525 7574 2209 3610</p>
        <p>5111 1111 1111 1111</p>
        <p>4111 1111 1111 1111</p>
      </main>
    </div>
  );
}

export default App;
