
import React from 'react';
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import '@/styles/professional.css';

const ProfessionalHeader = () => {
  return (
    <header className="professional-header">
      <div className="professional-header-container">
        <img src="/Savanahdwell.png" alt="Savanah" style={{ height: '60px' }} />
        <nav className="professional-nav">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <ModeToggle />
            <Button variant="outline" size="sm">Sign In</Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default ProfessionalHeader;
