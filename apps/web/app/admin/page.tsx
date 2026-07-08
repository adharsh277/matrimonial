import { Bell, CalendarDays, CheckCircle2, CreditCard, Users, Workflow } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const metrics = [
  { label: "Total members", value: "2,418", icon: Users },
  { label: "New this month", value: "64", icon: Workflow },
  { label: "Payments today", value: "₹42,600", icon: CreditCard },
  { label: "Pending approvals", value: "18", icon: CheckCircle2 },
];

const activity = [
  "New matrimony profile awaiting moderation",
  "Notice scheduled for tomorrow evening",
  "Payment receipt generated for member #204",
  "Gallery album published for the annual gathering",
];

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(220,234,247,0.9),_transparent_28%),linear-gradient(180deg,#fbfdff_0%,#eef4fb_100%)] px-6 py-8 md:px-10 lg:px-12">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-4 rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-soft backdrop-blur md:flex-row md:items-center md:justify-between">
          <div>
            <Badge variant="soft" className="w-fit">Admin dashboard</Badge>
            <h1 className="font-display mt-3 text-4xl font-bold tracking-tight text-slate-900">Operational command center</h1>
            <p className="mt-2 max-w-2xl text-slate-600">Track members, notices, payments, and matrimony activity from one calm, structured dashboard.</p>
          </div>
          <div className="rounded-2xl border border-[#dceaf7] bg-[#eef4fb] px-4 py-3 text-sm text-slate-700">
            <Bell className="mr-2 inline-block h-4 w-4 text-[#1b4f8c]" />
            3 urgent notices and 1 payment alert need attention
          </div>
        </div>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <Card key={metric.label} className="bg-white/92">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#dceaf7] text-[#123a66]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardDescription>{metric.label}</CardDescription>
                  <CardTitle className="font-display text-3xl">{metric.value}</CardTitle>
                </CardHeader>
              </Card>
            );
          })}
        </section>

        <section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="bg-white/92">
            <CardHeader>
              <Badge className="w-fit bg-[#dceaf7] text-[#123a66]">Recent activity</Badge>
              <CardTitle className="font-display text-2xl">What needs attention</CardTitle>
              <CardDescription>Prioritized operations and moderation workstream.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {activity.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-[#1b4f8c]" />
                  <span className="text-sm leading-6 text-slate-700">{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="grid gap-5">
            <Card className="bg-[#123a66] text-white">
              <CardHeader>
                <Badge className="w-fit bg-white/15 text-white">Quick actions</Badge>
                <CardTitle className="font-display text-2xl">One-click operations</CardTitle>
                <CardDescription className="text-white/70">Create member, post notice, record payment, and review matrimony approvals.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                {[
                  "Add member",
                  "Post notice",
                  "Record payment",
                  "Review profile",
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-white/90">
                    {item}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-white/92">
              <CardHeader>
                <Badge variant="success" className="w-fit">Upcoming</Badge>
                <CardTitle className="font-display text-2xl">Scheduled tasks</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-700">
                <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                  <CalendarDays className="h-4 w-4 text-[#1b4f8c]" />
                  Payment reminder batch at 8:00 PM
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                  <CalendarDays className="h-4 w-4 text-[#1b4f8c]" />
                  Notice publishing review at 9:30 AM
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
}
