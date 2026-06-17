import { useState } from 'react';

const CONTACT_PATTERN = /^(\+?[\d\s\-().]{5,30}|[\w.+-]+@[\w.-]+\.\w{2,})$/;

function validateField(name, value) {
  const trimmed = value.trim();

  switch (name) {
    case 'name':
      if (trimmed.length < 2 || trimmed.length > 80) {
        return 'Имя должно содержать от 2 до 80 символов';
      }
      return '';
    case 'contact':
      if (!CONTACT_PATTERN.test(trimmed) || trimmed.length > 120) {
        return 'Укажите корректный телефон или email';
      }
      return '';
    case 'message':
      if (trimmed.length < 10 || trimmed.length > 2000) {
        return 'Сообщение должно содержать от 10 до 2000 символов';
      }
      return '';
    default:
      return '';
  }
}

export function useContactForm() {
  const [fields, setFields] = useState({ name: '', contact: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (alert) setAlert(null);
  };

  const validateAll = () => {
    const newErrors = {};
    Object.keys(fields).forEach((key) => {
      const error = validateField(key, fields[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll()) return;

    setStatus('submitting');
    setAlert(null);

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fields.name.trim(),
          contact: fields.contact.trim(),
          message: fields.message.trim(),
        }),
        signal: controller.signal,
      });

      clearTimeout(timeout);
      const data = await response.json();

      if (!response.ok) {
        if (data.errors) setErrors(data.errors);
        setAlert({ type: 'error', message: data.message || 'Ошибка отправки' });
        setStatus('error');
        return;
      }

      setFields({ name: '', contact: '', message: '' });
      setErrors({});
      setAlert({ type: 'success', message: data.message });
      setStatus('success');
    } catch {
      setAlert({
        type: 'error',
        message: 'Не удалось отправить заявку. Проверьте соединение и попробуйте снова.',
      });
      setStatus('error');
    }
  };

  return {
    fields,
    errors,
    status,
    alert,
    handleChange,
    handleSubmit,
    isSubmitting: status === 'submitting',
  };
}
