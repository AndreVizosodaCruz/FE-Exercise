import React, { useEffect, useState } from 'react'
import './index.css'

interface ToastProps {
  show: boolean;
  message: string;
}

export default function ToastMessage({ show = false, message }: ToastProps) {

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [show]);

  return (
    <div className={'toast' + (visible ? '__show' : '__hide')}>
      {visible &&
        <>{message}</>
      }
    </div>
  )
}
