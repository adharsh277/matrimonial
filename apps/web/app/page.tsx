import Link from "next/link";
import { ArrowRight, CalendarDays, CreditCard, Images, ShieldCheck, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const highlights = [
  { title: "Members", value: "2,400+", description: "Structured member records and family profiles.", icon: Users },
  { title: "Notices", value: "Instant", description: "Push-ready notices and announcements.", icon: CalendarDays },
  { title: "Payments", value: "Secure", description: "Gateway-backed dues and receipt tracking.", icon: CreditCard },
  { title: "Matrimony", value: "Moderated", description: "Approval workflow with privacy controls.", icon: ShieldCheck },
];

const modules = [
  "Authentication and role-based access",
  "Admin dashboard with member and payment analytics",
  "User and family profile management",
  "News, notices, and scheduled alerts",
  "Payments, ledger, and dues reminders",
  "Matrimony registry with search and approvals",
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-grid">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 pb-20 pt-6 md:px-10 lg:px-12">
        <header className="flex items-center justify-between rounded-full border border-white/70 bg-white/80 px-5 py-3 shadow-soft backdrop-blur">
          <div>
            <p className="font-display text-lg font-bold tracking-tight text-[#123a66]">Community Management Platform</p>
            <p className="text-sm text-slate-500">Public website · Admin dashboard · Mobile app</p>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <Badge variant="soft">Blue / White theme</Badge>
            <Button asChild variant="outline" size="sm">
              <Link href="#modules">Explore modules</Link>
            </Button>
          </div>
        </header>

        <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <div className="space-y-8">
            <div className="inline-flex rounded-full border border-[#dceaf7] bg-white/85 px-4 py-2 text-sm font-semibold text-[#123a66] shadow-sm">
              Production-ready community software for members, staff, and visitors
            </div>
            <div className="space-y-5">
              <h1 className="font-display max-w-3xl text-5xl font-bold tracking-[-0.05em] text-slate-900 md:text-7xl">
                Calm, premium, and practical software for a community organisation.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
                This implementation aligns with the SRS: secure authentication, member and family records, news and notices, payments, matrimony profiles, and a polished public presence.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="#modules">View modules <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/admin">Open admin dashboard</Link>
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {highlights.map((item) => {
                const Icon = item.icon;
                return (
                  <Card key={item.title} className="border-white/60 bg-white/90">
                    <CardHeader className="pb-3">
                      <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#dceaf7] text-[#123a66]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <CardDescription>{item.title}</CardDescription>
                      <CardTitle className="font-display text-3xl">{item.value}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-6 text-slate-600">{item.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <Card className="overflow-hidden border-[#dceaf7] bg-white shadow-soft">
            <div className="border-b border-[#dceaf7] bg-gradient-to-br from-[#123a66] to-[#1b4f8c] px-6 py-6 text-white">
              <Badge className="bg-white/15 text-white hover:bg-white/20">Platform overview</Badge>
              <h2 className="font-display mt-4 text-3xl font-bold tracking-tight">One source of truth</h2>
              <p className="mt-3 max-w-md text-sm leading-6 text-white/80">
                One backend, one database, and three coordinated clients keep records synchronized across the organisation.
              </p>
            </div>
            <CardContent className="space-y-4 pt-6">
              {modules.map((module) => (
                <div key={module} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#1b4f8c]" />
                  <span className="text-sm font-medium text-slate-700">{module}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <section id="modules" className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <Card className="bg-white/90">
            <CardHeader>
              <Badge variant="soft" className="w-fit">Public website</Badge>
              <CardTitle className="font-display text-2xl">Fast and SEO-friendly</CardTitle>
              <CardDescription>News, gallery, matrimony listings, and contact content for visitors.</CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-white/90">
            <CardHeader>
              <Badge variant="soft" className="w-fit">Admin web app</Badge>
              <CardTitle className="font-display text-2xl">Operational control</CardTitle>
              <CardDescription>Staff can manage members, notices, payments, and approvals with confidence.</CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-white/90 md:col-span-2 xl:col-span-1">
            <CardHeader>
              <Badge variant="soft" className="w-fit">Mobile app</Badge>
              <CardTitle className="font-display text-2xl">Member-first experience</CardTitle>
              <CardDescription>Swipe-friendly screens for profiles, news, payments, and matrimony.</CardDescription>
            </CardHeader>
          </Card>
        </section>

        <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="bg-[#123a66] text-white">
            <CardHeader>
              <Badge className="w-fit bg-white/15 text-white">Design direction</Badge>
              <CardTitle className="font-display text-3xl">Premium without noise</CardTitle>
              <CardDescription className="text-white/70">
                Soft contrast, balanced spacing, and restrained blue accents keep the interface elegant and readable.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-white/90">
            <CardHeader>
              <Badge variant="success" className="w-fit">Implementation status</Badge>
              <CardTitle className="font-display text-3xl">Foundation in place</CardTitle>
              <CardDescription>Backend auth, schema design, workspace configs, and the web shell are now started.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "TypeScript and workspace setup",
                  "Express API and Prisma schema",
                  "Next.js public/admin shell",
                  "Tailwind and shadcn-style components",
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                    {item}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </section>
    </main>
  );
}
