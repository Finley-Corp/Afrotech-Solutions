import { escapeHtml } from "./resend";

/**
 * Transactional HTML for Resend — table layout for clients; mirrors site tokens from app/globals.css.
 */
export const EMAIL_BRAND = {
  primary: "#003366",
  secondary: "#475569",
  accent: "#D61C2C",
  background: "#F8FAFC",
  surface: "#FFFFFF",
  line: "#E2E8F0",
  fontSans:
    "'DM Sans', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  fontDisplay: "'Playfair Display', Georgia, 'Times New Roman', serif",
} as const;

type ShellOpts = {
  /** Small caps line above title */
  eyebrow: string;
  title: string;
  /** Main body HTML (already safe / escaped where needed) */
  bodyHtml: string;
  /** Optional line under body */
  footerHtml?: string;
};

export function brandEmailShell({ eyebrow, title, bodyHtml, footerHtml }: ShellOpts): string {
  const { primary, secondary, accent, background, surface, line, fontSans, fontDisplay } =
    EMAIL_BRAND;
  const safeTitle = escapeHtml(title);
  const safeEyebrow = escapeHtml(eyebrow);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${safeTitle}</title>
</head>
<body style="margin:0;padding:0;background:${background};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${background};padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:${surface};border:1px solid ${line};border-radius:14px;overflow:hidden;box-shadow:0 12px 36px rgba(2, 6, 23, 0.08);">
          <tr>
            <td style="padding:0;margin:0;height:4px;background:${accent};font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:26px 30px 24px;background:linear-gradient(135deg, ${primary} 0%, #0a4a8a 100%);">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-family:${fontSans};font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:rgba(255,255,255,0.88);padding-bottom:8px;">
                    ${safeEyebrow}
                  </td>
                </tr>
                <tr>
                  <td style="font-family:${fontDisplay};font-size:28px;font-weight:400;letter-spacing:-0.02em;color:#ffffff;line-height:1.2;">
                    ${safeTitle}
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:14px;">
                    <span style="display:inline-block;border:1px solid rgba(255,255,255,0.34);border-radius:999px;padding:6px 10px;font-family:${fontSans};font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:#ffffff;">
                      Afrotech Engineering Solutions
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:30px 30px 24px;font-family:${fontSans};font-size:15px;font-weight:400;line-height:1.7;color:${primary};">
              ${bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:0 30px 24px;font-family:${fontSans};font-size:13px;line-height:1.65;color:${secondary};border-top:1px solid ${line};background:#fbfdff;">
              <p style="margin:16px 0 0;">
                ${footerHtml ?? defaultFooter()}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function defaultFooter(): string {
  const { secondary, accent, fontSans } = EMAIL_BRAND;
  return `<span style="color:${secondary};">Afrotech Water Solutions · Industrial water systems across East Africa</span><br />
              <span style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:${accent};font-family:${fontSans};font-weight:600;">AFROTECH</span>`;
}

/** Key–value rows for owner / internal notifications */
export function emailDetailRows(
  rows: Array<{ label: string; value: string }>,
  escape: (s: string) => string,
): string {
  const { line, secondary, primary, surface } = EMAIL_BRAND;
  return rows
    .map(
      ({ label, value }) => `
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;border:1px solid ${line};border-radius:10px;background:${surface};">
                <tr>
                  <td style="font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:${secondary};font-weight:500;padding:11px 12px 3px;">${escape(label)}</td>
                </tr>
                <tr>
                  <td style="font-size:15px;color:${primary};font-weight:400;padding:0 12px 11px;">${value ? escape(value).replace(/\n/g, "<br/>") : "—"}</td>
                </tr>
              </table>`,
    )
    .join("");
}
