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
  "HIGH PERFORMANCE",
  "LIGHTWEIGHT",
  "OPTIMIZED",
  "INTUITIVE",
  "SEAMLESS",
  "CROSS-PLATFORM",
  "ANIMATED",
  "FLUID",
  "MODULAR",
  "COMPONENT-DRIVEN",
  "EFFICIENT",
  "FAST",
  "USER-FOCUSED",
  "INNOVATIVE",
  "ROBUST",
  "ERROR-RESILIENT",
  "CLEAN DESIGN",
  "MODERN UI",
  "STATE-OF-THE-ART",
  "ADAPTIVE",
  "REUSABLE",
  "HIGHLY MAINTAINABLE",
  "PRODUCTION READY",
  "PROGRESSIVE",
  "CLOUD-FIRST",
  "PERFORMANT",
  "REAL-TIME",
  "SMOOTH",
  "INTELLIGENT",
  "AUTOMATED",
  "FUTURE-PROOF",
  "POWERFUL",
  "STREAMLINED"
];


  return (
    <section className="ribbon-section">
      {/* back darker strip */}
      <div className="ribbon-strip ribbon-strip--back" />

      {/* front bright strip with text */}
      <div className="ribbon-strip ribbon-strip--front">
        <div className="ribbon-text-row">
          <div className="ribbon-text-track">
            {/* first copy */}
            <div className="ribbon-sequence">
              {words.map((word, i) => (
                <React.Fragment key={`a-${word}-${i}`}>
                  <span className="ribbon-word">{word}</span>
                  <span className="ribbon-star">✦</span>
                </React.Fragment>
              ))}
            </div>

            {/* second identical copy */}
            <div className="ribbon-sequence">
              {words.map((word, i) => (
                <React.Fragment key={`b-${word}-${i}`}>
                  <span className="ribbon-word">{word}</span>
                  <span className="ribbon-star">✦</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
