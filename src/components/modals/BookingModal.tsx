import React, { useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { CartContext } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { CloseIcon } from '../../constants';
import { Illustration } from '../../assets/Illustrations';
import { useTranslation } from '../../i18n/useTranslation';

const defaultSlotsByType = {
  class: [
    'Lunes, 7:00 AM',
    'Miercoles, 6:30 AM',
    'Viernes, 6:30 AM',
    'Sabado, 8:00 AM',
    'Domingo, 8:00 AM',
  ],
  event: ['Proxima fecha disponible', 'Lista de espera'],
} as const;

const sourceLabel = (source: string | undefined): string => {
  if (source === 'instagram') {
    return 'IG CTA';
  }
  if (source === 'whatsapp') {
    return 'WhatsApp CTA';
  }
  return 'Web';
};

const BookingModal: React.FC = () => {
  const { isBookingModalOpen, closeBookingModal, bookingDetails, addToCart } = useContext(CartContext);
  const { showToast } = useToast();
  const { t } = useTranslation();

  const availableTimeSlots = useMemo(() => {
    if (!bookingDetails) {
      return [] as string[];
    }

    if (bookingDetails.availableSlots && bookingDetails.availableSlots.length > 0) {
      return bookingDetails.availableSlots;
    }

    return [...defaultSlotsByType[bookingDetails.type]];
  }, [bookingDetails]);

  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  useEffect(() => {
    if (!bookingDetails) {
      setSelectedSlot(null);
      return;
    }

    const preferredSlot = bookingDetails.preselectedSlot;
    if (preferredSlot && availableTimeSlots.includes(preferredSlot)) {
      setSelectedSlot(preferredSlot);
      return;
    }

    setSelectedSlot(availableTimeSlots[0] ?? null);
  }, [bookingDetails, availableTimeSlots]);

  const handleClose = useCallback(() => {
    closeBookingModal();
  }, [closeBookingModal]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isBookingModalOpen) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isBookingModalOpen, handleClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isBookingModalOpen || !bookingDetails) return null;

  const handleAddToCart = () => {
    if (selectedSlot) {
      addToCart({
        id: `${bookingDetails.type}-${bookingDetails.title}-${selectedSlot}`,
        name: bookingDetails.title,
        price: bookingDetails.price,
        imageUrl: bookingDetails.imageUrl,
        illustrationName: bookingDetails.illustrationName,
        quantity: 1,
        type: bookingDetails.type,
        details: `${selectedSlot} · ${sourceLabel(bookingDetails.source)}`,
      });
      showToast((t('booking.addedToCart') as (title: string) => string)(bookingDetails.title), 'success');
      handleClose();
    } else {
      showToast(t('booking.selectSlotError') as string, 'error');
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      aria-describedby="booking-modal-description"
      onClick={handleBackdropClick}
    >
      <div
        className="rounded-sm shadow-2xl w-full max-w-md relative animate-fade-in-up border"
        style={{ background: '#EAE0CC', borderColor: 'rgba(160,160,131,0.25)' }}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 transition-colors hover:scale-110"
          style={{ color: '#A0A083' }}
          aria-label={t('booking.close') as string}
        >
          <CloseIcon className="w-5 h-5" />
        </button>

        <div className="p-5 md:p-8">
          <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#4D6A6D' }}>
            {t('booking.eyebrow') as string}
          </p>
          <h2 id="booking-modal-title" className="text-3xl font-heading font-bold mb-6" style={{ color: '#252520' }}>
            {bookingDetails.title}
          </h2>

          <div
            className="w-full h-40 rounded-sm mb-6 overflow-hidden flex items-center justify-center"
            style={{ background: '#F3EDE2' }}
          >
            {bookingDetails.imageUrl ? (
              <img
                src={bookingDetails.imageUrl}
                alt={bookingDetails.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <Illustration
                name={bookingDetails.illustrationName ?? 'abstract-spirit'}
                className="w-1/3 h-1/3"
                style={{ color: '#C9ADA1' } as React.CSSProperties}
              />
            )}
          </div>

          <h3 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: '#798478' }}>
            {t('booking.selectTime') as string}
          </h3>

          {availableTimeSlots.length === 0 ? (
            <p className="text-sm" style={{ color: '#798478' }}>
              {t('booking.noSlots') as string}
            </p>
          ) : (
            <div className="space-y-2" role="radiogroup" aria-label="Horarios disponibles">
              {availableTimeSlots.map((slot) => (
                <label
                  key={slot}
                  className="flex items-center p-3 border rounded-sm cursor-pointer transition-all duration-200 hover:border-[#4D6A6D]"
                  style={{
                    background: selectedSlot === slot ? 'rgba(77,106,109,0.08)' : 'transparent',
                    borderColor: selectedSlot === slot ? '#4D6A6D' : 'rgba(160,160,131,0.35)',
                  }}
                >
                  <input
                    type="radio"
                    name="time-slot"
                    value={slot}
                    checked={selectedSlot === slot}
                    onChange={() => setSelectedSlot(slot)}
                    className="h-4 w-4"
                    style={{ accentColor: '#4D6A6D' }}
                  />
                  <span className="ml-3 text-sm" style={{ color: '#252520' }}>
                    {slot}
                  </span>
                </label>
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xl font-bold font-mono" style={{ color: '#252520' }}>
              ${bookingDetails.price.toLocaleString('es-CO')} COP
            </p>
            <button
              onClick={handleAddToCart}
              className="w-full sm:w-auto font-semibold py-3 px-7 rounded-full transition-all duration-300 hover:opacity-90 active:scale-95 text-sm uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: '#4D6A6D', color: '#EAE0CC' }}
              disabled={availableTimeSlots.length === 0}
            >
              {t('booking.addToCart') as string}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
