import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import PortugalPage from '../src/pages/PortugalPage';
import { NavigationProvider } from '../src/context/NavigationContext';

const renderWithNavigation = (ui: React.ReactElement) => {
  return render(<NavigationProvider>{ui}</NavigationProvider>);
};

describe('PortugalPage', () => {
  beforeEach(() => {
    localStorage.clear();
    window.history.pushState({}, '', '/portugal');
  });

  it('renders Portugal sanctuary hero headline and location badge', () => {
    renderWithNavigation(<PortugalPage />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.textContent).toContain('As primeiras');
    expect(heading.textContent).toContain('sementes');
    expect(screen.getAllByText(/Costa de Leiria/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Perto da Nazaré/i)).toBeDefined();
  });

  it('renders the project concept section with the architectural render photo', () => {
    renderWithNavigation(<PortugalPage />);
    expect(screen.getByText(/Fase 0 — A Fundação/i)).toBeDefined();
    expect(screen.getByText(/Da terra bruta ao santuário na natureza/i)).toBeDefined();
    
    const renderImg = screen.getByAltText(/Conceito do projeto Inner Spirit Portugal/i) as HTMLImageElement;
    expect(renderImg).toBeDefined();
    expect(renderImg.src).toContain('/images/portugal/projeto-cabanas-glamping.jpg');
  });

  it('renders volunteer tasks with photos of land and rustic restoration', () => {
    renderWithNavigation(<PortugalPage />);
    expect(screen.getByText(/Constrói connosco desde a primeira pedra/i)).toBeDefined();
    
    const terrenoImg = screen.getByAltText(/Trabalho de terra para a futura horta biológica/i) as HTMLImageElement;
    expect(terrenoImg.src).toContain('/images/portugal/nazare-terreno.jpg');

    const remodelacaoImg = screen.getByAltText(/Remodelação rústica de estrutura de pedra/i) as HTMLImageElement;
    expect(remodelacaoImg.src).toContain('/images/portugal/nazare-remodelacao.jpg');
  });

  it('renders territory photos for Nazare, Lagoa da Ervedeira and Serras de Aire', () => {
    renderWithNavigation(<PortugalPage />);
    expect(screen.getByText(/A envolvente mágica da Costa de Leiria/i)).toBeDefined();
    
    const nazareImg = screen.getByAltText(/Nazaré ondas gigantes e farol/i) as HTMLImageElement;
    expect(nazareImg.src).toContain('/images/portugal/regiao-nazare-leiria.jpg');

    const lagoaImg = screen.getByAltText(/Lagoa da Ervedeira/i) as HTMLImageElement;
    expect(lagoaImg.src).toContain('/images/portugal/lagoa-ervedeira.jpg');

    const serrasImg = screen.getByAltText(/Cascatas, grutas e vales verdes/i) as HTMLImageElement;
    expect(serrasImg.src).toContain('/images/portugal/serras-aire-candeeiros.jpg');
  });

  it('opens and closes the image lightbox modal when clicking a photo', () => {
    renderWithNavigation(<PortugalPage />);
    const nazareCard = screen.getByText(/Do farol das maiores ondas/i);
    fireEvent.click(nazareCard);

    // Modal dialog should now be visible
    const modal = screen.getByRole('dialog');
    expect(modal).toBeDefined();

    // Close button
    const closeBtn = screen.getByLabelText(/Fechar fotografia/i);
    fireEvent.click(closeBtn);

    expect(screen.queryByRole('dialog')).toBeNull();
  });
});
