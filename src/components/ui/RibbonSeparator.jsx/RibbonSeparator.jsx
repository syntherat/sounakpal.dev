import React from "react";
import "./RibbonSeparator.css";

export default function RibbonSeparator() {
  const words = [
    "SCALABLE",
    "SEARCH OPTIMIZED",
    "INTERACTIVE",
    "SECURE",
    "RELIABLE", 
    "ENGAGING",
    "ACCESSIBLE",
    "RESPONSIVE",
    "DYNAMIC",
  ];

  return (
    <section className="ribbon-section">
      {/* back darker strip */}
      <div className="ribbon-strip ribbon-strip--back" />

      {/* front bright strip with text */}
      <div className="ribbon-strip ribbon-strip--front">
        <div className="ribbon-text-row">
          {words.map((word, i) => (
            <React.Fragment key={i}>
              <span className="ribbon-word">{word}</span>
              {i !== words.length - 1 && (
                <span className="ribbon-star">✦</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
