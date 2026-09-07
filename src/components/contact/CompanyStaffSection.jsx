import Image from "next/image";
import { Phone, Mail } from "lucide-react";
import { FadeUp, StaggerGroup, StaggerItem } from "@/components/shared/MotionWrapper";
import { companyStaff } from "@/lib/data/team";

function initials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/**
 * Sits directly below the contact form — once someone's decided to reach
 * out, this puts a name and a direct line in front of them instead of
 * leaving the form as the only option. Reads as a compact staff directory
 * (leadership first, then account managers) rather than a photo wall: a
 * small circular avatar per person — initials until a real headshot is
 * added — keeps each card short enough that at least two rows are visible
 * before the visitor needs to scroll further.
 */
export default function CompanyStaffSection() {
  return (
    <div>
      <FadeUp className="mb-10">
        <span className="eyebrow mb-3 block">Meet the team</span>
        <h2 className="heading-md mb-4">Leadership &amp; company staff</h2>
        <p className="text-ink-muted text-lg leading-relaxed max-w-xl">
          The people leading Upliftas, and the account managers you&apos;ll
          actually talk to if you reach out.
        </p>
      </FadeUp>

      <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {companyStaff.map((person) => (
          <StaggerItem key={person.email}>
            <div className="flex items-center gap-4 h-full rounded-2xl bg-white shadow-card p-5">
              <div className="relative w-16 h-16 shrink-0 rounded-full overflow-hidden bg-secondary ring-2 ring-white shadow-soft flex items-center justify-center">
                {person.photo ? (
                  <Image
                    src={person.photo}
                    alt={person.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                ) : (
                  <span className="text-primary font-bold text-sm">
                    {initials(person.name)}
                  </span>
                )}
              </div>
              <div className="min-w-0">
                <h3 className="font-bold leading-snug truncate">{person.name}</h3>
                <p className="text-primary text-sm font-semibold truncate">
                  {person.role}
                </p>
                <p className="text-ink-muted text-xs leading-relaxed mb-2 truncate">
                  {person.department}
                </p>
                {/* <div className="space-y-1">
                  <a
                    href={`tel:${person.phoneHref}`}
                    className="flex items-center gap-1.5 text-xs text-ink-muted hover:text-primary transition-colors"
                  >
                    <Phone size={12} className="shrink-0" />
                    <span className="truncate">{person.phone}</span>
                  </a>
                  <a
                    href={`mailto:${person.email}`}
                    className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-dark transition-colors"
                  >
                    <Mail size={12} className="shrink-0" />
                    <span className="truncate">{person.email}</span>
                  </a>
                </div> */}
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  );
}
