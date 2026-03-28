'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface ResponsiveSearchProps {
  onSearch?: (query: string) => void;
  tok?: any;
  placeholder?: string;
}

export const ResponsiveSearch: React.FC<ResponsiveSearchProps> = ({ 
  onSearch, 
  tok = {},
  placeholder = "Search parts by make, model, or type..."
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = () => {
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: '8px',
        width: '100%',
        maxWidth: '100%',
        flexWrap: 'wrap',
        alignItems: 'stretch',
        '@media (max-width: 768px)': {
          flexDirection: 'column',
        },
      }}
    >
      {/* Search Input Container */}
      <div
        style={{
          flex: 1,
          minWidth: '0',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          background: tok.card || '#0f1419',
          border: `1px solid ${isFocused ? 'rgba(232, 232, 232, 0.3)' : 'rgba(232, 232, 232, 0.1)'}`,
          borderRadius: '6px',
          padding: '0 12px',
          transition: 'all 0.3s ease',
          boxShadow: isFocused 
            ? '0 0 12px rgba(232, 232, 232, 0.1)' 
            : 'none',
          '@media (max-width: 640px)': {
            flex: '1 1 100%',
            minHeight: '44px',
          },
          '@media (min-width: 641px) and (max-width: 1024px)': {
            minHeight: '40px',
          },
          '@media (min-width: 1025px)': {
            minHeight: '42px',
          },
        }}
      >
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          style={{
            width: '100%',
            border: 'none',
            background: 'transparent',
            color: tok.fg || '#e8e8e8',
            fontSize: 'clamp(12px, 2.5vw, 14px)',
            fontFamily: 'DM Sans, sans-serif',
            outline: 'none',
            padding: '12px 0',
            '::placeholder': {
              color: tok.muted || 'rgba(120, 138, 168, 0.6)',
            },
          }}
        />
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          padding: 'clamp(8px, 2vw, 12px) clamp(12px, 3vw, 20px)',
          background: 'linear-gradient(135deg, #1e40af, #1e3a8a)',
          border: '1px solid rgba(232, 232, 232, 0.2)',
          borderRadius: '6px',
          color: '#ffffff',
          fontWeight: 700,
          fontSize: 'clamp(11px, 2vw, 13px)',
          fontFamily: 'DM Mono, monospace',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          whiteSpace: 'nowrap',
          flexShrink: 0,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          '@media (max-width: 640px)': {
            width: '100%',
            minHeight: '44px',
            padding: '12px 16px',
          },
          '@media (min-width: 641px) and (max-width: 1024px)': {
            minHeight: '40px',
          },
          '@media (min-width: 1025px)': {
            minHeight: '42px',
          },
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, #1e3a8a, #1e40af)';
          e.currentTarget.style.boxShadow = '0 8px 16px rgba(30, 64, 175, 0.3)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, #1e40af, #1e3a8a)';
          e.currentTarget.style.boxShadow = 'none';
          e.currentTarget.style.transform = 'none';
        }}
      >
        <Search size={16} strokeWidth={2.5} />
        <span style={{ display: 'flex', '@media (max-width: 640px)': { display: 'none' } }}>
          Search
        </span>
      </button>

      {/* Mobile-only compact button */}
      <style>{`
        @media (max-width: 640px) {
          .search-button-text {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default ResponsiveSearch;
