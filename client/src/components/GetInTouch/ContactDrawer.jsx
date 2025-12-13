import React, { useEffect, useMemo, useRef, useState } from "react";
import "./GetInTouch.css";
import { FiSend } from "react-icons/fi";
import { X } from "lucide-react";

export default function ContactDrawer({ open, onClose }) {
  const sheetRef = useRef(null);

  const [isMounted, setIsMounted] = useState(open);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const max = 1000;
  const count = msg.length;

  // Mount on open, unmount after close animation
  useEffect(() => {
    if (open) setIsMounted(true);
  }, [open]);

  const handleAnimEnd = (e) => {
    // only unmount after sheet finishes closing
    if (!open && e.target === sheetRef.current) {
      setIsMounted(false);
    }
  };

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

const submit = async (e) => {
  e.preventDefault();
  if (!canSend) return;

  try {
    const res = await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        message: msg,

        // optional honeypot field (only if you add an invisible input)
        website: "",
      }),
    });

    const data = await res.json();
    if (!data.ok) throw new Error(data.error || "Send failed");

    // clear
    setName("");
    setEmail("");
    setMsg("");

    onClose?.();
  } catch (err) {
    console.error(err);
    alert("Could not send message. Please try again.");
  }
};

  // ✅ if not mounted, it does not exist in DOM -> cannot block anything
  if (!isMounted) return null;

  return (
    <div className="drawer" data-state={open ? "open" : "closed"}>
      {/* overlay */}
      <div className="drawer__overlay" onClick={onClose} />

      {/* sheet */}
      <div
        className="drawer__sheet"
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label="Contact form"
        onTransitionEnd={handleAnimEnd}
      >
        <div className="drawer__handle" />

        <div className="drawer__top">
          <h3 className="drawer__title">Send a message</h3>

          <button
            type="button"
            className="drawer__close"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={17} />
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
