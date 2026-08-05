import { Suspense } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GSAPAnimations from "../components/GSAPAnimations";
import QuoteForm from "./components/QuoteForm";

/**
 * `/quote` vs `/contact` (see also lib/company.ts):
 * Use this page for product, cart, service, pricing, and site-visit / system-design requests.
 * Use `/contact` for general inquiries, partnership, and non-transactional questions.
 */
export default function QuotePage() {
  return (
    <main className="quote-page">
      <Navbar />
      <Suspense fallback={<div className="quote-page-loading">Loading form…</div>}>
        <QuoteForm />
      </Suspense>
      <Footer />
      <GSAPAnimations />
    </main>
  );
}
