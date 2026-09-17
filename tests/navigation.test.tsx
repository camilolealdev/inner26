import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { CartProvider } from '../src/context/CartContext';
import { ToastProvider } from '../src/context/ToastContext';
import { NavigationProvider, useNavigation } from '../src/context/NavigationContext';

// Minimal consumer component to test navigate and location
const NavigationConsumer: React.FC = () => {
  const { page, navigate, location, setLocation } = useNavigation();
  return (
    <div>
      <span data-testid="current-page">{page}</span>
      <span data-testid="current-location">{location}</span>
      <button onClick={() => navigate('clases')}>Ir a Clases</button>
      <button onClick={() => navigate('eventos')}>Ir a Eventos</button>
      <button onClick={() => navigate('contacto')}>Ir a Contacto</button>
      <button onClick={() => navigate('terminos')}>Ir a Términos</button>
      <button onClick={() => navigate('privacidad')}>Ir a Privacidad</button>
      <button onClick={() => navigate('portugal')}>Ir a Portugal</button>
      <button onClick={() => navigate('home')}>Ir a Home</button>
      <button onClick={() => setLocation('pt')}>Elegir Portugal</button>
      <button onClick={() => setLocation('co')}>Elegir Colombia</button>
    </div>
  );
};

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <NavigationProvider>
    <CartProvider>
      <ToastProvider>{children}</ToastProvider>
    </CartProvider>
  </NavigationProvider>
);

describe('Navigation', () => {
  beforeEach(() => {
    localStorage.clear();
    window.history.pushState({}, '', '/');
  });

  it('inicia en la página home', () => {
    render(<NavigationConsumer />, { wrapper: Wrapper });
    expect(screen.getByTestId('current-page').textContent).toBe('home');
  });

  it('navega a clases al hacer click', () => {
    render(<NavigationConsumer />, { wrapper: Wrapper });
    fireEvent.click(screen.getByText('Ir a Clases'));
    expect(screen.getByTestId('current-page').textContent).toBe('clases');
  });

  it('navega a eventos', () => {
    render(<NavigationConsumer />, { wrapper: Wrapper });
    fireEvent.click(screen.getByText('Ir a Eventos'));
    expect(screen.getByTestId('current-page').textContent).toBe('eventos');
  });

  it('navega a contacto', () => {
    render(<NavigationConsumer />, { wrapper: Wrapper });
    fireEvent.click(screen.getByText('Ir a Contacto'));
    expect(screen.getByTestId('current-page').textContent).toBe('contacto');
  });

  it('navega a portugal', () => {
    render(<NavigationConsumer />, { wrapper: Wrapper });
    fireEvent.click(screen.getByText('Ir a Portugal'));
    expect(screen.getByTestId('current-page').textContent).toBe('portugal');
    expect(window.location.pathname).toBe('/portugal');
  });

  it('cambia de localización a Portugal y navega a /portugal', () => {
    render(<NavigationConsumer />, { wrapper: Wrapper });
    fireEvent.click(screen.getByText('Elegir Portugal'));
    expect(screen.getByTestId('current-location').textContent).toBe('pt');
    expect(screen.getByTestId('current-page').textContent).toBe('portugal');
    expect(localStorage.getItem('inner_spirit_location')).toBe('pt');
  });

  it('actualiza el pathname del navegador al navegar', () => {
    render(<NavigationConsumer />, { wrapper: Wrapper });
    fireEvent.click(screen.getByText('Ir a Clases'));
    expect(window.location.pathname).toBe('/clases');
  });

  it('detecta la página correcta desde la URL al iniciar', () => {
    window.history.pushState({}, '', '/blog');
    render(<NavigationConsumer />, { wrapper: Wrapper });
    expect(screen.getByTestId('current-page').textContent).toBe('blog');
  });

  it('detecta la página portugal desde la URL al iniciar', () => {
    window.history.pushState({}, '', '/portugal');
    render(<NavigationConsumer />, { wrapper: Wrapper });
    expect(screen.getByTestId('current-page').textContent).toBe('portugal');
    expect(screen.getByTestId('current-location').textContent).toBe('pt');
  });

  it('navega a terminos al hacer click y actualiza pathname', () => {
    render(<NavigationConsumer />, { wrapper: Wrapper });
    fireEvent.click(screen.getByText('Ir a Términos'));
    expect(screen.getByTestId('current-page').textContent).toBe('terminos');
    expect(window.location.pathname).toBe('/terminos');
  });

  it('navega a privacidad al hacer click y actualiza pathname', () => {
    render(<NavigationConsumer />, { wrapper: Wrapper });
    fireEvent.click(screen.getByText('Ir a Privacidad'));
    expect(screen.getByTestId('current-page').textContent).toBe('privacidad');
    expect(window.location.pathname).toBe('/privacidad');
  });

  it('detecta alias de URL para terminos (/terms, /cookies)', () => {
    window.history.pushState({}, '', '/cookies');
    render(<NavigationConsumer />, { wrapper: Wrapper });
    expect(screen.getByTestId('current-page').textContent).toBe('terminos');
  });
});
