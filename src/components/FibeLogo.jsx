import React from 'react';

const FibeLogo = ({ width = 102, height = 88, className = "" }) => {
  return (
    <div className={className} style={{ width, height }}>
      <svg width={width} height={height} viewBox="0 0 102 88" fill="none">
        {/* Colorful dots */}
        <circle cx="15" cy="15" r="8" fill="#F8A63F" />
        <circle cx="35" cy="8" r="6" fill="#079F9F" />
        <circle cx="8" cy="5" r="4" fill="#FF3E79" />
        
        {/* Fibe text */}
        <g>
          <text 
            x="0" 
            y="55" 
            fill="#121212" 
            fontSize="28" 
            fontWeight="700" 
            fontFamily="Gilroy, -apple-system, Roboto, Helvetica, sans-serif"
          >
            fibe
          </text>
        </g>
      </svg>
    </div>
  );
};

export default FibeLogo;
