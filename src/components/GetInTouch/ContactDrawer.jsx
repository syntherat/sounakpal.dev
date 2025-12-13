import React, { useEffect, useMemo, useRef, useState } from "react";
import "./GetInTouch.css";
import { FiSend } from "react-icons/fi";

export default function ContactDrawer({ open, onClose }) {
  const sheetRef = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const max = 1000;
  const count = msg.length;

  // focus first input when opening
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => {
      const el = sheetRef.current?.querySelector("input");
      el?.focus();
    }, 220);
    return () => clearTimeout(t);
  }, [open]);

  const canSend = useMemo(() => {
    return (
      name.trim().length > 1 &&
      email.trim().length > 3 &&
      msg.trim().length > 1
    );
  }, [name, email, msg]);

  const submit = (e) => {
    e.preventDefault();
    // plug EmailJS / backend later
    onClose?.();
  };

  return (
    <div className={`drawer ${open ? "drawer--open" : ""}`} aria-hidden={!open}>
      {/* overlay */}
      <button
        className="drawer__overlay"
        onClick={onClose}
        aria-label="Close contact drawer"
        tabIndex={open ? 0 : -1}
      />

      {/* sheet */}
      <div
        className="drawer__sheet"
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label="Contact form"
      >
        <div className="drawer__handle" />

        <div className="drawer__top">
          <div>
            <h3 className="drawer__title">Send a message</h3>
            <button type="button" className="drawer__back" onClick={onClose}>
              ← Back to options
            </button>
          </div>

          <button
            type="button"
            className="drawer__close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <form className="drawer__form" onSubmit={submit}>
          <div className="drawer__row">
            <label className="drawer__field">
              <span className="drawer__label">Name</span>
              <input
                className="drawer__input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                autoComplete="name"
              />
            </label>

            <label className="drawer__field">
              <span className="drawer__label">Email</span>
              <input
                className="drawer__input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
                autoComplete="email"
              />
            </label>
          </div>

          <label className="drawer__field">
            <div className="drawer__labelRow">
              <span className="drawer__label">Message</span>
              <span className="drawer__count">
                {count}/{max}
              </span>
            </div>

            <textarea
              className="drawer__textarea"
              value={msg}
              onChange={(e) => setMsg(e.target.value.slice(0, max))}
              placeholder="How can I help you?"
              rows={5}
            />
          </label>

          <button className="drawer__submit" type="submit" disabled={!canSend}>
            <FiSend />
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
