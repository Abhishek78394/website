import type { ReactNode } from "react";
import { SiteFrame } from "@/components/layout/SiteFrame";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return <SiteFrame>{children}</SiteFrame>;
}
