import React, { useContext, useEffect, useCallback, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { useNavigation } from '../../context/NavigationContext';
import { CloseIcon } from '../../constants';
import { Illustration } from '../../assets/Illustrations';
import { apiUrl } from '../../utils/apiBase';

const CheckoutModal: React.FC = () => {
  const { isCheckoutModalOpen, toggleCheckoutModal, cart, removeFromCart } = useContext(CartContext);
  const { showToast } = useToast();
  const { navigate } = useNavigation();
  const [provider, setProvider] = useState<'mercadopago' | 'wompi'>('mercadopago');
  const [fulfillmentType, setFulfillmentType] = useState<'pickup' | 'delivery'>('pickup');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const hasProducts = cart.some((item) => item.type === 'product');

  const handleClose = useCallback(() => {
    toggleCheckoutModal();
  }, [toggleCheckoutModal]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCheckoutModalOpen) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isCheckoutModalOpen, handleClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isCheckoutModalOpen) return null;

  const handlePayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const customer = {
      name: String(formData.get('name') || ''),
      email: String(formData.get('email') || ''),
      phone: String(formData.get('phone') || ''),
    };

    try {
      const idempotencyKey =
        typeof crypto !== 'undefined' && 'randomUUID' in crypto
          ? crypto.randomUUID()
          : `checkout-${Date.now()}-${Math.random().toString(16).slice(2)}`;
      const response = await fetch(apiUrl('/api/checkout'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Idempotency-Key': idempotencyKey },
        body: JSON.stringify({
          provider,
          customer,
          fulfillment: hasProducts
            ? { type: fulfillmentType, address: String(formData.get('deliveryAddress') || '') }
            : undefined,
          items: cart,
          idempotencyKey,
        }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || 'No se pudo crear el pago');
      showToast('Pago creado. Redirigiendo a la pasarela...', 'success');
      window.location.assign(payload.checkoutUrl);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error iniciando pago';
      setSubmitError(message);
      showToast(message, 'error');
      setIsSubmitting(false);
    }
  };

  const handleRemoveItem = (itemName: string, itemId: string) => {
    removeFromCart(itemId);
    showToast(`${itemName} eliminado del carrito`, 'info');
  };

  const handleExploreClasses = () => {
    toggleCheckoutModal();
    navigate('clases');
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 z-50 flex justify-center items-start p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
      onClick={handleBackdropClick}
    >
      <div
        className="rounded-sm shadow-2xl w-full max-w-lg relative my-4 md:my-8 animate-fade-in-up border"
        style={{ background: '#EAE0CC', borderColor: 'rgba(160,160,131,0.25)' }}
      >
        <div
          className="sticky top-0 p-6 border-b flex justify-between items-center z-10 rounded-t-sm"
          style={{ background: '#EAE0CC', borderColor: 'rgba(160,160,131,0.25)' }}
        >
          <h2 id="checkout-modal-title" className="text-3xl font-heading font-bold" style={{ color: '#252520' }}>
            Tu carrito
          </h2>
          <button
            onClick={handleClose}
            className="transition-colors hover:scale-110"
            style={{ color: '#A0A083' }}
            aria-label="Cerrar carrito"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg mb-6" style={{ color: '#A0A083' }}>
                Tu carrito está vacío.
              </p>
              <button
                onClick={handleExploreClasses}
                className="text-sm font-semibold py-3 px-7 rounded-full transition-all duration-300"
                style={{ background: '#4D6A6D', color: '#EAE0CC' }}
              >
                Explorar clases
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6 max-h-48 md:max-h-64 overflow-y-auto pr-2" role="list" aria-label="Productos en el carrito">
                {cart.map(item => (
                  <div key={item.id} className="flex items-start justify-between gap-3" role="listitem">
                    <div className="flex min-w-0 items-center gap-3">
                      <div
                        className="w-14 h-14 rounded-sm flex items-center justify-center overflow-hidden flex-shrink-0"
                        style={{ background: '#F3EDE2' }}
                      >
                        <Illustration
                          name={item.illustrationName ?? 'abstract-spirit'}
                          className="w-1/2 h-1/2"
                          style={{ color: '#C9ADA1' } as React.CSSProperties}
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-sm break-words" style={{ color: '#252520' }}>{item.name}</h4>
                        {item.details && (
                          <p className="text-xs break-words" style={{ color: '#A0A083' }}>{item.details}</p>
                        )}
                        <p className="text-xs font-mono mt-0.5" style={{ color: '#798478' }}>
                          ${item.price.toLocaleString('es-CO')} × {item.quantity}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.name, item.id)}
                      className="flex-shrink-0 text-xs font-semibold uppercase tracking-wider transition-colors hover:scale-105"
                      style={{ color: '#A0A083' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#252520'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = '#A0A083'; }}
                      aria-label={`Quitar ${item.name}`}
                    >
                      Quitar
                    </button>
                  </div>
                ))}
              </div>

              <div
                className="border-t pt-4 flex justify-between items-center font-bold text-lg mb-8"
                style={{ borderColor: 'rgba(160,160,131,0.3)', color: '#252520' }}
              >
                <span>Total</span>
                <span className="font-mono">${totalPrice.toLocaleString('es-CO')} COP</span>
              </div>

              <h3 className="text-2xl font-heading font-bold mb-4" style={{ color: '#252520' }}>
                Información de Pago
              </h3>
              <form onSubmit={handlePayment} className="space-y-4">
                <div>
                  <label htmlFor="checkout-name" className="text-xs font-semibold uppercase tracking-wider block mb-2" style={{ color: '#798478' }}>
                    Nombre completo
                  </label>
                  <input
                    id="checkout-name"
                    name="name"
                    type="text"
                    placeholder="Tu nombre"
                    className="w-full p-3 rounded-sm outline-none text-sm transition-colors focus:ring-2"
                    style={{ border: '1px solid rgba(160,160,131,0.4)', background: '#F3EDE2', color: '#252520' }}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="checkout-email" className="text-xs font-semibold uppercase tracking-wider block mb-2" style={{ color: '#798478' }}>
                    Correo electrónico
                  </label>
                  <input
                    id="checkout-email"
                    name="email"
                    type="email"
                    placeholder="tu@email.com"
                    className="w-full p-3 rounded-sm outline-none text-sm transition-colors focus:ring-2"
                    style={{ border: '1px solid rgba(160,160,131,0.4)', background: '#F3EDE2', color: '#252520' }}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="checkout-phone" className="text-xs font-semibold uppercase tracking-wider block mb-2" style={{ color: '#798478' }}>
                    WhatsApp / telefono
                  </label>
                  <input
                    id="checkout-phone"
                    name="phone"
                    type="tel"
                    placeholder="+57 300 000 0000"
                    className="w-full p-3 rounded-sm outline-none text-sm transition-colors focus:ring-2"
                    style={{ border: '1px solid rgba(160,160,131,0.4)', background: '#F3EDE2', color: '#252520' }}
                    autoComplete="tel"
                  />
                </div>
                <div>
                  <label htmlFor="checkout-provider" className="text-xs font-semibold uppercase tracking-wider block mb-2" style={{ color: '#798478' }}>
                    Medio de pago
                  </label>
                  <select
                    id="checkout-provider"
                    value={provider}
                    onChange={(event) => setProvider(event.target.value as 'mercadopago' | 'wompi')}
                    className="w-full p-3 rounded-sm outline-none text-sm transition-colors focus:ring-2"
                    style={{ border: '1px solid rgba(160,160,131,0.4)', background: '#F3EDE2', color: '#252520' }}
                  >
                    <option value="mercadopago">Mercado Pago</option>
                    <option value="wompi">Wompi</option>
                  </select>
                </div>
                {hasProducts && (
                  <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-wider block" style={{ color: '#798478' }}>
                      Entrega de articulos
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <label className="flex items-center gap-3 p-3 rounded-sm border cursor-pointer" style={{ borderColor: 'rgba(160,160,131,0.4)', background: '#F3EDE2' }}>
                        <input
                          type="radio"
                          name="fulfillment"
                          checked={fulfillmentType === 'pickup'}
                          onChange={() => setFulfillmentType('pickup')}
                          style={{ accentColor: '#4D6A6D' }}
                        />
                        <span className="text-sm" style={{ color: '#252520' }}>Retiro en estudio</span>
                      </label>
                      <label className="flex items-center gap-3 p-3 rounded-sm border cursor-pointer" style={{ borderColor: 'rgba(160,160,131,0.4)', background: '#F3EDE2' }}>
                        <input
                          type="radio"
                          name="fulfillment"
                          checked={fulfillmentType === 'delivery'}
                          onChange={() => setFulfillmentType('delivery')}
                          style={{ accentColor: '#4D6A6D' }}
                        />
                        <span className="text-sm" style={{ color: '#252520' }}>Envio local</span>
                      </label>
                    </div>
                    {fulfillmentType === 'delivery' && (
                      <div>
                        <label htmlFor="checkout-delivery-address" className="sr-only">Direccion de entrega</label>
                        <textarea
                          id="checkout-delivery-address"
                          name="deliveryAddress"
                          rows={3}
                          placeholder="Direccion completa de entrega"
                          className="w-full p-3 rounded-sm outline-none text-sm transition-colors focus:ring-2 resize-none"
                          style={{ border: '1px solid rgba(160,160,131,0.4)', background: '#F3EDE2', color: '#252520' }}
                          required
                        />
                      </div>
                    )}
                  </div>
                )}
                <div
                  className="p-3 rounded-sm text-center"
                  style={{ background: 'rgba(77,106,109,0.08)' }}
                >
                  <p className="text-xs" style={{ color: '#798478' }}>Tu compra se confirma solo cuando la pasarela apruebe el pago.</p>
                </div>
                {submitError && (
                  <p className="text-sm" role="alert" style={{ color: '#7A2E2E' }}>
                    {submitError}
                  </p>
                )}
                <button
                  type="submit"
                  className="w-full font-semibold py-3 rounded-sm transition-all text-sm uppercase tracking-widest hover:opacity-90 active:scale-[0.98]"
                  style={{ background: '#4D6A6D', color: '#EAE0CC' }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creando pago...' : `Pagar - $${totalPrice.toLocaleString('es-CO')} COP`}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
