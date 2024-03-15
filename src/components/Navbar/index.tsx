import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './index.css'

export default function Navbar() {

  const { i18n } = useTranslation();

  const availableLanguages = [
    {
      value: 'en',
      label: 'En'
    },
    {
      value: 'pt-PT',
      label: 'PT'
    }
  ];

  return (
    <div className='main'>
      <div className='links'>
        <Link to='/'>
          Home
        </Link>
        <Link to='/revisited'>
          Revisited
        </Link>
      </div>
      <select onChange={(data) => i18n.changeLanguage(data.target.value)} value={i18n.language}>
        {availableLanguages.map((lang, index) => (
          <option key={index} value={lang.value}>{lang.label}</option>
        ))}
      </select>
    </div>
  )
}
