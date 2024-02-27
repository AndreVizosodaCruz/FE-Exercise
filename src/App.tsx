import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'
import HomePage, { CountryProps } from './pages/Home';
import NotFound from './pages/NotFound';
import RevisitedPage from './pages/Reviseted';
import LoginPage from './pages/Login';
import Navbar from './components/Navbar';
import { useContextStore } from './context/StoreContext';
import './index.css'

interface ResponseProps {
  name: {
    common: string;
    official: string;
    nativeName: {
      [key: string]: {
        common: string;
        official: string;
      };
    };
  };
  cca3: string;
  translations: {
    [key: string]: {
      common: string;
      official: string;
    };
  };
}

function App() {

  const { addCountries, startLoading } = useContextStore();

  const fetchData = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all?fields=name,cca3,translations");
      if (response.ok) {
        const result = await response.json();
        const tranformedResult = result.map((obj: ResponseProps) => {
          return {
            value: obj.cca3,
            label: obj.name.common,
            labelPT: obj.translations.por.common
          }
        }).sort((a: CountryProps, b: CountryProps) => {
          return a.label.localeCompare(b.label)
        });
        addCountries(tranformedResult)
      }
    } catch (error) {
      throw new Error('Error fetching countries')
    }
  }

  useEffect(() => {
    startLoading();
    fetchData();
  }, []);

  return (
    <div className='mainApp'>
      <Navbar />
      <div className='content'>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/revisited" element={<RevisitedPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
