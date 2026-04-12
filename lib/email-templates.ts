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
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:${surface};border:1px solid ${line};border-radius:2px;overflow:hidden;">
          <tr>
            <td style="padding:0;margin:0;height:4px;background:${accent};font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:28px 32px 24px;background:${primary};">
              <p style="margin:0 0 6px;font-family:${fontSans};font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.85);">${safeEyebrow}</p>
              <h1 style="margin:0;font-family:${fontDisplay};font-size:26px;font-weight:400;letter-spacing:-0.02em;color:#ffffff;line-height:1.25;">${safeTitle}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 32px 28px;font-family:${fontSans};font-size:15px;font-weight:400;line-height:1.65;color:${primary};">
              ${bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 28px;font-family:${fontSans};font-size:13px;line-height:1.6;color:${secondary};border-top:1px solid ${line};">
              <p style="margin:20px 0 0;">
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
              <span style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:${accent};font-family:${fontSans};">AFROTECH</span>`;
}

/** Key–value rows for owner / internal notifications */
export function emailDetailRows(
  rows: Array<{ label: string; value: string }>,
  escape: (s: string) => string,
): string {
  const { line, secondary, primary } = EMAIL_BRAND;
  return rows
    .map(
      ({ label, value }) => `
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:14px;border-bottom:1px solid ${line};padding-bottom:12px;">
                <tr>
                  <td style="font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:${secondary};font-weight:500;padding-bottom:4px;">${escape(label)}</td>
                </tr>
                <tr>
                  <td style="font-size:15px;color:${primary};font-weight:300;">${value ? escape(value).replace(/\n/g, "<br/>") : "—"}</td>
                </tr>
              </table>`,
    )
    .join("");
}
