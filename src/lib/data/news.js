export const news = [
  {
    slug: "aeris-lift-v3-launch",
    date: "2026-08-14",
    title: "Introducing the Next Generation of Aeris Lift",
    excerpt:
      "Our newest lifting chair arrives with a 15% lighter frame, longer battery life, and a redesigned control handle based on two years of caregiver feedback.",
    thumbnail:
      "/assets/images/products/aeris-lift-gallery-2.WebP",
    body: [
      "After extensive field testing with care homes and emergency response teams, we're introducing an updated Aeris Lift model built around three priorities raised repeatedly by caregivers: weight, battery endurance, and ease of one-handed control.",
      "The updated frame uses a revised aluminum alloy that cuts folded weight by roughly 15% without reducing the maximum supported user weight. Battery life has also been extended, supporting a full shift of intermittent use on a single charge.",
      "Existing customers under a service agreement will be offered an upgrade path in the coming months; new orders begin shipping with the updated model immediately.",
    ],
  },
  {
    slug: "accessibility-standards-update",
    date: "2026-07-09",
    title: "What Updated Accessibility Building Codes Mean for Retrofits",
    excerpt:
      "A summary of recent changes to accessibility requirements for existing commercial buildings, and how solutions like DuoStep fit within tighter renovation budgets.",
    thumbnail:
      "/assets/images/products/duostep-at-asan-city-hall.WebP",
    body: [
      "Many jurisdictions have tightened requirements around step-free access for existing commercial buildings undergoing renovation, particularly for hospitality and retail spaces.",
      "For property owners working within heritage restrictions or limited floor space, retrofit lift solutions that reuse an existing staircase footprint can offer a faster path to compliance than a full structural extension.",
      "We've put together a short guide summarizing the key changes and how our team can help assess whether a site qualifies for a stair-integrated lift solution.",
    ],
  },
  {
    slug: "caregiver-training-program",
    date: "2026-06-18",
    title: "Expanding Our Free Caregiver Training Program",
    excerpt:
      "We're expanding on-site training sessions for care homes and home-care agencies to help reduce manual handling injuries among staff.",
    thumbnail:
      "/assets/images/products/aeris-lift-gallery-3.WebP",
    body: [
      "Manual handling injuries remain one of the leading causes of staff absence in residential care settings. Proper equipment is only part of the solution — consistent training is what turns a lifting device into a safe daily habit.",
      "Our expanded training program now includes half-day, on-site sessions covering safe positioning, equipment checks, and troubleshooting, delivered directly by our clinical education team.",
      "Facilities using any of our lifting or stair solutions can now request a session directly through their account manager at no additional cost.",
    ],
  },
  {
    slug: "stairlift-hdn-v2-clinical-results",
    date: "2026-05-01",
    title: "New Clinical Data on Stair Training and Discharge Readiness",
    excerpt:
      "A two-quarter review across partner rehabilitation clinics found structured stair training reduced time-to-discharge milestones for post-surgical patients.",
    thumbnail:
      "/assets/images/products/hdn-gallery-2.WebP",
    body: [
      "Stair navigation is frequently one of the final milestones clinicians assess before clearing a patient for discharge after hip or knee surgery.",
      "In partnership with several rehabilitation clinics, we reviewed outcomes data from patients using structured, adjustable stair training as part of their physiotherapy program.",
      "The review found patients using adjustable equipment reached their stair-confidence milestone earlier on average than those using fixed practice steps, supporting the case for adjustable training equipment in post-surgical rehab pathways.",
    ],
  },
  {
    slug: "emergency-services-partnership",
    date: "2026-03-11",
    title: "Partnering with Regional Fire Departments on Lift-Assist Response",
    excerpt:
      "We're working with several regional fire departments to study how portable lifting equipment affects response times for non-emergency lift-assist calls.",
    thumbnail:
      "/assets/images/products/aeris-lift-gallery-4.WebP",
    body: [
      "Lift-assist calls — where a fallen but uninjured person needs help returning to a chair or bed — make up a notable share of daily call volume for many fire departments.",
      "Through a new pilot partnership, we're supplying portable lifting equipment to several regional departments and studying its effect on crew size requirements and average call duration.",
      "Early feedback suggests meaningful time savings per call, with a full report expected once the pilot period concludes later this year.",
    ],
  },
  {
    slug: "company-milestone-10-years",
    date: "2026-01-08",
    title: "Celebrating a Decade of Mobility Innovation",
    excerpt:
      "Reflecting on ten years of designing lifting and mobility equipment, and a look at what's next for our product roadmap.",
    thumbnail:
      "/assets/images/about-us-upliftas.png",
    body: [
      "A decade ago, our first lifting chair prototype was built in response to a simple problem: caregivers were being injured trying to lift fallen patients safely by hand.",
      "Since then, our product line has expanded to cover staircase accessibility and rehabilitation training, informed continuously by feedback from the care homes, clinics, and emergency services who use our equipment daily.",
      "Looking ahead, our roadmap focuses on lighter materials, smarter battery management, and expanding our training and support programs for the teams who rely on this equipment every day.",
    ],
  },
];

export function getNewsBySlug(slug) {
  return news.find((n) => n.slug === slug);
}
