import React from 'react';
import './App.css';
import ContactForm from './components/Contact';
import FormContextProvider from './context/FormContext';

function App() {
  return (
    <FormContextProvider>
      <div className="App">
        <ContactForm />
      </div>
    </FormContextProvider>
  );
}

export default App;
