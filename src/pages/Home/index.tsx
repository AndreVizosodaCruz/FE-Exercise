import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import FormAddUser from '../../components/form/FormAddUser';
import Table, { countryLabel } from '../../components/Table';
import { User, useContextStore } from '../../context/StoreContext';
import ToastMessage from '../../components/ToastMessage';
import './index.css'
import i18next from 'i18next';

export interface CountryProps {
  value: string,
  label: string,
  labelPT: string
}

export default function HomePage() {
  const { t, i18n } = useTranslation();
  const { countries, loading } = useContextStore();
  const [users, setUsers] = useState<User[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState('');

  const handleToast = (user: User) => {
    const country = countryLabel(user.country, countries, i18n);
    const { day, month, years } = getDateHelper(i18n.language, user.birthday);
    setMessage(i18next.t('messageUser', { name: user.name.concat(' ', user.surname), country, day, month, years }));
    setShowToast(true);
  }

  const handleAddUser = (newUser: User) => {
    handleToast(newUser);
    setUsers((prev) => [...prev, newUser]);
  }

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setMessage('');
        setShowToast(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <>
      <h1>{t("title")}</h1>
      <div className='contentHome'>
        <div className='divForm'>
          <FormAddUser countries={countries} handleAddUser={(user) => handleAddUser(user)} />
          <ToastMessage show={showToast} message={message} />
        </div>
        <div className='divTable'>
          <Table users={users} countries={countries} showToast={(user) => handleToast(user)} />
        </div>
      </div>
      <div className='developer'>João Cruz</div>
      {loading &&
        <div className='overlayLoading'>
          <div className='spinner'/>
        </div>
      }
    </>
  )
}

function getDateHelper(locale: string, dateString: string) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleDateString(locale, { month: 'long' });
  const year = date.getFullYear();
  const currentYear = new Date().getFullYear();
  const years = currentYear - year;
  return { day, month, years };
}