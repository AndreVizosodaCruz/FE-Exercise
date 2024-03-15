import { FormEvent, useState } from 'react'
import FormInput from './FormInput';
import Button from '../ui/Button';
import FormDropdown from './FormDropdown';
import { CountryProps } from '../../pages/Home';
import { useContextStore, User } from '../../context/StoreContext';
import { useTranslation } from 'react-i18next';
import './index.css';

interface FormAddUserProps {
  countries: CountryProps[]
  handleAddUser: (data: User) => void;
}

export default function FormAddUser({ countries, handleAddUser }: FormAddUserProps) {

  const { addUser, loading, startLoading } = useContextStore();
  const { t } = useTranslation();
  
  const initialFormData = {
    name: '',
    surname: '',
    country: '',
    birthday: ''
  };
  const [formData, setFormData] = useState<User>(initialFormData);

  const handleInput = (value: string, key: string) => {
    setFormData({ ...formData, [key]: value })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    startLoading();
    addUser(formData);
    handleAddUser(formData);
    setFormData(initialFormData);
  }

  return (
    <form onSubmit={handleSubmit} className='formAddUser'>
      <FormInput
        label={t("nameLabel")}
        placeholder={t("namePlaceholder")}
        onChange={(value) => handleInput(value, 'name')}
        value={formData?.name ?? ""}
        required
      />
      <FormInput
        label={t("surnameLabel")}
        placeholder={t("surnamePlaceholder")}
        onChange={(value) => handleInput(value, 'surname')}
        value={formData?.surname ?? ""}
        required
      />
      <FormDropdown
        options={countries ?? []}
        label={t("countriesLabel")}
        onChange={(value) => handleInput(value, 'country')}
        value={formData?.country ?? ""}
        required
      />
      <FormInput
        label={t("birthdayLabel")}
        type='date'
        onChange={(value) => handleInput(value, 'birthday')}
        value={formData?.birthday}
        required
      />
      <Button type="submit" text={t("buttonText")} isLoading={loading} />
    </form>
  )
}
