import React, { useState, useEffect } from 'react';
import './styles/prescription.css';

export default function PrescriptionButton() {
  const [hovered, setHovered] = useState(false);

  // Inject Chatbase bot script on mount
  useEffect(() => {
    if (!document.getElementById('VoTWPS5bZGAB1j9ZhZuDW')) {
      (function () {
        if (!window.chatbase || window.chatbase("getState") !== "initialized") {
          window.chatbase = (...args) => {
            if (!window.chatbase.q) {
              window.chatbase.q = [];
            }
            window.chatbase.q.push(arguments);
          };
          window.chatbase = new Proxy(window.chatbase, {
            get(target, prop) {
              if (prop === "q") {
                return target.q;
              }
              return (...args) => target(prop, ...args);
            }
          });
        }
        const onLoad = function () {
          const script = document.createElement("script");
          script.src = "https://www.chatbase.co/embed.min.js";
          script.id = "VoTWPS5bZGAB1j9ZhZuDW";
          script.domain = "www.chatbase.co";
          document.body.appendChild(script);
        };
        if (document.readyState === "complete") {
          onLoad();
        } else {
          window.addEventListener("load", onLoad);
        }
      })();
    }
  }, []);

  // Open Chatbase chat when button is clicked
  const handleOpenChat = () => {
    if (window.chatbase) {
      window.chatbase('open');
    }
  };

  return (
    <div
      className="prescription-fab-container"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
    </div>
  );
}