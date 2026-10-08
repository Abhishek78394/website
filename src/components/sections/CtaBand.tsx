import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function CtaBand({
  title = "Your audience is out there. Reach them.",
  body = "Plan smarter. Advertise better. Measure what matters.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="bg-dark text-white" aria-labelledby="cta-heading">
      <Container className="flex flex-col gap-8 py-16 md:flex-row md:items-end md:justify-between md:py-20">
        <div className="max-w-xl">
          <h2 id="cta-heading" className="story-title">
            {title}
          </h2>
          <p className="mt-4 text-white/65">{body}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button href={siteConfig.appUrl} external variant="light">
            Start Advertising
          </Button>
          <Button href={siteConfig.partnerUrl} external variant="ghost">
            Become a Partner
          </Button>
        </div>
      </Container>
    </section>
  );
}
