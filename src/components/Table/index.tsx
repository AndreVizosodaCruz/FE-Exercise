import React from 'react'
import { CountryProps } from '../../pages/Home';
import { useTranslation } from 'react-i18next';
import { User } from '../../context/StoreContext';
import './index.css'
import { i18n } from 'i18next';

interface TableProps {
  users: User[];
  countries: CountryProps[];
  showToast?: (user: User) => void;
}

export default function Table({ users, countries, showToast }: TableProps) {

  const { i18n } = useTranslation();

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Country</th>
          <th>Birthday</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index} onClick={() => showToast && showToast(user)}>
            <td>{user.name.concat(' ', user.surname)}</td>
            <td>{countryLabel(user.country, countries, i18n)}</td>
            <td>{user.birthday}</td>
          </tr>
        ))}
      </tbody>
    </table>

  )
}



export const countryLabel = (id: string, countries: CountryProps[], translation: i18n) => {

  const filtredCountry = countries.filter((country) => country.value === id);
  return filtredCountry.length > 0 ? (translation.language === 'en' ? filtredCountry[0].label : filtredCountry[0].labelPT) : '';
}
