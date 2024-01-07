import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container text-center">
      <h1>Witaj na Stronie Głównej</h1>
      <p>Twórz notatki lub zadania</p>
      <div>
        <Link to="/login" className="btn btn-primary mr-2">
          Zaloguj się
        </Link>
        <Link to="/register" className="btn btn-secondary">
          Zarejestruj się
        </Link>
      </div>
    </div>
  );
};

export default Home;
