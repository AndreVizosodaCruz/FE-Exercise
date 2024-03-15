import { FormEvent, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import FormInput from '../../components/form/FormInput';
import Button from '../../components/ui/Button';
import './index.css';
import { useTranslation } from 'react-i18next';

export default function LoginPage() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLooading] = useState<boolean>(false);
  const [password, setPassword] = useState('');

  const redirected = location.state === "notAuthenticated";

  const text = useMemo(() => {
    return (redirected ? t("loginText1") + ' ' : '') + t("loginText2");
  }, [redirected, i18n.language]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLooading(true);
    if (password !== "alohomora") {
      setLooading(false);
      return setError(true);
    }
    error && setError(false);
    setLooading(false);
    login();
    navigate('/revisited')
  }

  return (
    <div className="containerLogin">
      <span className='title'>{text}</span>
      <form onSubmit={handleSubmit} className='formLogin'>
        <FormInput
          placeholder={t("magicWordPlaceholder")}
          onChange={(value: string) => setPassword(value)}
          value={password}
          error={error}
          required
        />
        <Button type="submit" text={t("buttonTextLogin")} isLoading={loading} />
      </form>
    </div>
  )
}
