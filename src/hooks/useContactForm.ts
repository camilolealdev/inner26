import { useState } from 'react';
import { useToast } from '../context/ToastContext';
import { submitLead } from '../utils/leads';

const typeLabel: Record<string, string> = {
  clase: 'Clases',
  evento: 'Eventos',
  producto: 'Tienda',
  otro: 'Otro',
};

export interface ContactFormState {
  name: string;
  email: string;
  message: string;
  type: string;
  consent: boolean;
  honeypot: string;
}

const initialState: ContactFormState = {
  name: '',
  email: '',
  message: '',
  type: 'clase',
  consent: false,
  honeypot: '',
};

/**
 * Lógica compartida del formulario de contacto (ContactSection + ContactPage):
 * estado, consentimiento, envío del lead y redirect a WhatsApp. El marcado/estilo
 * queda en cada componente; aquí vive la única fuente de verdad del comportamiento.
 */
export const useContactForm = () => {
  const { showToast } = useToast();
  const [formState, setFormState] = useState<ContactFormState>(initialState);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const setConsent = (consent: boolean) => setFormState((prev) => ({ ...prev, consent }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState.honeypot) return; // Bot protection
    if (!formState.consent) {
      showToast('Debes aceptar la política de privacidad para continuar.', 'error');
      return;
    }
    const interest = typeLabel[formState.type] ?? formState.type;
    const text = encodeURIComponent(
      `Hola Inner Spirit, me llamo ${formState.name} (${formState.email}).\nMotivo: ${interest}\n\n${formState.message}`,
    );
    submitLead({
      source: 'contact',
      name: formState.name,
      email: formState.email,
      interest,
      message: formState.message,
      consent: true,
    });
    showToast('Abriendo WhatsApp con tu mensaje...', 'success');
    // Abrir dentro del gesto del usuario: un window.open diferido lo bloquean los popup blockers.
    window.open(`https://wa.me/573212248261?text=${text}`, '_blank', 'noopener,noreferrer');
    setFormState(initialState);
  };

  return { formState, handleInputChange, setConsent, handleSubmit };
};
