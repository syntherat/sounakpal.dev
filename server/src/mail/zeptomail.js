// Uses Node 18+ built-in fetch (no extra dependency)

function required(name, value) {
  if (!value) throw new Error(`Missing env var: ${name}`);
}

export async function sendViaZeptoMail({ name, email, message }) {
  const BASE = process.env.ZEPTOMAIL_BASE_URL;
  const TOKEN = process.env.ZEPTOMAIL_TOKEN;
  const TO_EMAIL = process.env.TO_EMAIL;
  const TO_NAME = process.env.TO_NAME || "Me";
  const FROM_EMAIL = process.env.FROM_EMAIL;
  const FROM_NAME = process.env.FROM_NAME || "Portfolio Contact Form";
  const SUBJECT_PREFIX = process.env.SUBJECT_PREFIX || "[Portfolio]";

  required("ZEPTOMAIL_BASE_URL", BASE);
  required("ZEPTOMAIL_TOKEN", TOKEN);
  required("TO_EMAIL", TO_EMAIL);
  required("FROM_EMAIL", FROM_EMAIL);

  const subject = `${SUBJECT_PREFIX} New message from ${name}`;
  const safeMessage = escapeHtml(message);

  const htmlBody = `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto; line-height: 1.5;">
      <h2 style="margin: 0 0 12px;">New portfolio message</h2>
      <p style="margin: 0 0 8px;"><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p style="margin: 0 0 8px;"><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p style="margin: 16px 0 8px;"><strong>Message:</strong></p>
      <div style="white-space: pre-wrap; background: rgba(0,0,0,0.04); padding: 12px; border-radius: 10px;">
        ${safeMessage}
      </div>
      <p style="margin: 16px 0 0; color: rgba(0,0,0,0.6); font-size: 12px;">
        Reply to this email to respond to ${escapeHtml(email)}.
      </p>
    </div>
  `;

  // ZeptoMail "Send Mail" endpoint (v1.1)
  const url = `${BASE.replace(/\/$/, "")}/v1.1/email`;

  const payload = {
    from: { address: FROM_EMAIL, name: FROM_NAME },
    to: [{ email_address: { address: TO_EMAIL, name: TO_NAME } }],
    subject,
    htmlbody: htmlBody,

    // Important: lets you hit "Reply" and it goes to the visitor
    reply_to: [{ address: email, name }],
  };

  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: TOKEN, // should be: "Zoho-enczapikey <token>"
    },
    body: JSON.stringify(payload),
  });

  const text = await resp.text();

  if (!resp.ok) {
    throw new Error(`ZeptoMail API error ${resp.status}: ${text}`);
  }

  return text;
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
