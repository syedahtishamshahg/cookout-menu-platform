import Link from "next/link";
import type { Metadata } from "next";
import { faqJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Cook Out Hours: Drive-Thru & Late Night Schedule (2026)",
  description: "Find typical Cook Out opening and closing hours. Learn when the double drive-thru stays open late (often 3:00 AM or 4:00 AM on weekends) and holiday schedules.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/hours/" },
};

const hoursFaqs = [
  {
    question: "What time does Cook Out open?",
    answer: "Most Cook Out locations open for lunch at 10:30 AM daily, seven days a week.",
  },
  {
    question: "What time does Cook Out close?",
    answer: "Most locations close at 3:00 AM Sunday through Thursday, and remain open until 4:00 AM on Friday and Saturday night.",
  },
  {
    question: "Is Cook Out open on Thanksgiving or Christmas?",
    answer: "Cook Out locations are typically closed on Thanksgiving Day and Christmas Day so employees can spend time with family. Hours on Christmas Eve and New Year's Eve may be abbreviated.",
  },
];

export default function HoursPage() {
  return (
    <main className="container section">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(hoursFaqs)) }} />
      <div className="eyebrow">Operating Schedule</div>
      <h1>Cook Out Hours & Drive-Thru Schedule</h1>
      <p style={{ maxWidth: 740 }}>
        Cook Out is renowned across the South for being one of the few fresh, cooked-to-order restaurants open late into the night. Here is the operational schedule breakdown.
      </p>

      <div className="card" style={{ marginTop: 28 }}>
        <h2>Standard Drive-Thru Operating Hours</h2>
        <div style={{ overflowX: "auto", marginTop: 16 }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th align="left">Day of the Week</th>
                <th align="left">Opening Time</th>
                <th align="left">Drive-Thru Closing</th>
                <th align="left">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "12px 0" }}>Sunday – Thursday</td>
                <td>10:30 AM</td>
                <td><strong>3:00 AM</strong></td>
                <td className="muted">Full menu available until closing</td>
              </tr>
              <tr>
                <td style={{ padding: "12px 0" }}>Friday & Saturday</td>
                <td>10:30 AM</td>
                <td><strong>4:00 AM</strong></td>
                <td className="muted">Peak late-night drive-thru hours</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="card" style={{ marginTop: 24 }}>
        <h2>Dining Room vs. Drive-Thru Hours</h2>
        <p>
          At locations equipped with an indoor dining room or walk-up patio windows, interior seating typically closes earlier (usually around 10:00 PM or 11:00 PM), while the double drive-thru remains open until 3:00 AM or 4:00 AM.
        </p>
      </div>

      <div className="card" style={{ marginTop: 24 }}>
        <h2>Hours Frequently Asked Questions</h2>
        {hoursFaqs.map((faq) => (
          <div key={faq.question} style={{ marginTop: 16, borderTop: "1px solid var(--line)", paddingTop: 14 }}>
            <h3 style={{ fontSize: 18 }}>{faq.question}</h3>
            <p className="muted" style={{ marginTop: 4 }}>{faq.answer}</p>
          </div>
        ))}
      </div>

      <p style={{ marginTop: 32 }}>
        <Link href="/menu/" className="btn btn-dark">Browse Menu Items →</Link>
        {" "}
        <Link href="/guides/how-to-order/" className="btn btn-light" style={{ marginLeft: 8 }}>How to Order Guide</Link>
      </p>
    </main>
  );
}