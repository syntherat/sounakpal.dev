// SkillTooltipIcon.jsx
import React from 'react';
import './SkillTooltipIcon.css';

export default function SkillTooltipIcon({ icon, label }) {
  return (
    <div className="skill-tooltip-wrapper">
      <div className="skill-tooltip-bubble">
        <span className="skill-tooltip-label">{label}</span>
        <span className="skill-tooltip-glow" />
      </div>

      <div className="skill-tooltip-icon">
        <img src={icon} alt={label} />
      </div>
    </div>
  );
}
