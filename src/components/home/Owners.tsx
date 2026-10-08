import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const abilities = [
  "List screens",
  "Manage inventory",
  "Receive campaigns",
  "Monitor playback",
  "Track earnings",
  "Manage availability",
  "Simplify settlements",
];

const rows = [
  ["Mall atrium", "Online", "Playing"],
  ["Office lobby", "Online", "Scheduled"],
  ["Street LED", "Online", "Open"],
];

export function Owners() {
  return (
    <section className="border-b border-line bg-paper" aria-labelledby="owners-heading">
      <Container className="grid items-center gap-14 py-20 lg:grid-cols-2 lg:py-28">
        <div>
          <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">Screen owners</p>
          <h2 id="owners-heading" className="story-title mt-4 text-ink">
            Turn your screens into a revenue channel.
          </h2>
          <p className="mt-5 max-w-md text-lg leading-8 text-muted">
            SCREENiSTA helps screen owners fill time that would otherwise sit idle.
          </p>
          <ul className="mt-8 grid grid-cols-2 gap-y-3 text-sm text-ink">
            {abilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={siteConfig.partnerUrl} external>
              Become a Screen Partner
            </Button>
            <Button href="/screens" variant="secondary">
              Learn More
            </Button>
          </div>
        </div>
        <div className="rounded-2xl border border-line bg-dark p-5 text-white md:p-6" aria-label="Example partner view">
          <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.16em] text-white/45 uppercase">
            <span>Partner view</span>
            <span>Example</span>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3 text-sm">
            <div className="rounded-xl bg-white/5 p-3">
              <p className="text-white/45">Playback</p>
              <p className="mt-2 font-display text-2xl">Live</p>
            </div>
            <div className="rounded-xl bg-white/5 p-3">
              <p className="text-white/45">Device</p>
              <p className="mt-2 font-display text-2xl">Online</p>
            </div>
            <div className="rounded-xl bg-white/5 p-3">
              <p className="text-white/45">Earnings</p>
              <p className="mt-2 font-display text-2xl">Wallet</p>
            </div>
          </div>
          <table className="mt-6 w-full text-left text-sm">
            <caption className="sr-only">Example screens in a partner account</caption>
            <thead className="text-white/40">
              <tr>
                <th className="py-2 font-normal">Screen</th>
                <th className="py-2 font-normal">State</th>
                <th className="py-2 font-normal">Ads</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row[0]} className="border-t border-white/10">
                  {row.map((cell) => (
                    <td key={cell} className="py-3">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-6">
            <div className="flex justify-between text-xs text-white/45">
              <span>Booked seconds</span>
              <span>Open seconds</span>
            </div>
            <div className="mt-2 flex h-2 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
              <div className="h-full w-[46%] bg-accent" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
