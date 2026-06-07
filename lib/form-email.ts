import type { Resend } from "resend";
import { resendErrorMessage } from "@/lib/resend";

export type EmailAttempt = {
  clientSent: boolean;
  ownerSent: boolean;
  warnings: string[];
};

/** Sends client + owner emails; failures are logged and collected — never throws. */
export async function sendLeadEmails(
  resend: Resend,
  opts: {
    from: string;
    ownerInboxes: string[];
    client: { to: string; subject: string; html: string };
    owner: { subject: string; html: string; replyTo: string };
  },
): Promise<EmailAttempt> {
  const warnings: string[] = [];
  let clientSent = false;
  let ownerSent = false;

  const { error: clientErr } = await resend.emails.send({
    from: opts.from,
    to: [opts.client.to],
    subject: opts.client.subject,
    html: opts.client.html,
  });

  if (clientErr) {
    console.warn("[Resend] client confirmation:", resendErrorMessage(clientErr));
    warnings.push(`client_email: ${resendErrorMessage(clientErr)}`);
  } else {
    clientSent = true;
  }

  const { error: ownerErr } = await resend.emails.send({
    from: opts.from,
    to: opts.ownerInboxes,
    replyTo: opts.owner.replyTo,
    subject: opts.owner.subject,
    html: opts.owner.html,
  });

  if (ownerErr) {
    console.warn("[Resend] owner notify:", resendErrorMessage(ownerErr));
    warnings.push(`owner_email: ${resendErrorMessage(ownerErr)}`);
  } else {
    ownerSent = true;
  }

  return { clientSent, ownerSent, warnings };
}
