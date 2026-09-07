// Cycled across every case below so the gallery shows varied photography
// instead of a single repeated image — index i uses GALLERY_IMAGES[i % 6].
const GALLERY_IMAGES = [
  "/assets/images/products/aeris-lift-gallery-1.WebP",
  "/assets/images/products/aeris-lift-gallery-2.WebP",
  "/assets/images/products/aeris-lift-gallery-3.WebP",
  "/assets/images/products/aeris-lift-gallery-4.WebP",
  "/assets/images/products/aeris-lift-gallery-5.WebP",
  "/assets/images/products/aeris-lift-gallery-6.WebP",
];

export const cases = [
  {
    slug: "harborview-care-home",
    title: "Harborview Care Home Cuts Fall-Response Time by 70%",
    type: "Care Home",
    product: "Aeris Lift",
    productSlug: "aeris-lift",
    excerpt:
      "After equipping every floor with an Aeris Lift, Harborview's staff reduced average fall-response and recovery time from 12 minutes to under 4.",
    thumbnail: GALLERY_IMAGES[0],
    body: [
      "Harborview Care Home, a 64-bed residential facility, previously relied on two-person manual lifting techniques whenever a resident fell. This process was slow, physically demanding on staff, and carried a meaningful risk of secondary injury to both resident and carer.",
      "Following a trial of the Aeris Lift on two wards, management rolled the device out across all four floors. Staff completed a half-day training program covering setup, positioning, and post-lift checks.",
      "Within three months, the facility recorded a 70% reduction in average response time from fall to seated recovery, and reported zero caregiver injuries related to lifting during the same period.",
    ],
  },
  {
    slug: "the-oak-room-restaurant",
    title: "The Oak Room Adds Full Accessibility Without Losing a Table",
    type: "Restaurant",
    product: "DuoStep",
    productSlug: "duostep",
    excerpt:
      "A listed building with a single staircase entrance now welcomes wheelchair guests thanks to a DuoStep installation that preserved the venue's original façade.",
    thumbnail: GALLERY_IMAGES[1],
    body: [
      "The Oak Room occupies a heritage-listed building where planning restrictions prohibited any permanent external ramp. For years, wheelchair users could not access the main dining room without staff assistance up a narrow flight of stairs.",
      "The restaurant installed a DuoStep unit that replaced the existing staircase, preserving its everyday appearance for walking guests while providing an on-demand lift function for wheelchair and pushchair access.",
      "The result was full step-free access to the main floor, achieved without altering the protected exterior of the building, and positive feedback from both guests and local accessibility groups.",
    ],
  },
  {
    slug: "meridian-rehab-clinic",
    title: "Meridian Rehab Clinic Shortens Recovery Timelines",
    type: "Rehabilitation Clinic",
    product: "Stairlift HDN",
    productSlug: "stairlift-hdn",
    excerpt:
      "Physiotherapists at Meridian introduced structured stair-training sessions using Stairlift HDN V2, helping patients regain stair confidence ahead of discharge.",
    thumbnail: GALLERY_IMAGES[2],
    body: [
      "Meridian Rehab Clinic treats patients recovering from hip and knee replacement surgery, many of whom must climb stairs at home before being cleared for discharge.",
      "By introducing the adjustable Stairlift HDN V2 into weekly therapy sessions, clinicians could gradually increase step height and reduce handrail support as patients progressed.",
      "Clinic data over two quarters showed patients reached their stair-confidence milestone an average of 4 days earlier than the previous cohort using static practice steps.",
    ],
  },
  {
    slug: "cascade-city-fire-department",
    title: "Cascade City Fire Department Streamlines Non-Emergency Lift Calls",
    type: "Emergency Services",
    product: "Aeris Lift",
    productSlug: "aeris-lift",
    excerpt:
      "Equipping response vehicles with Aeris Lift reduced the average crew time spent on routine 'lift assist' calls, freeing capacity for emergency dispatch.",
    thumbnail: GALLERY_IMAGES[3],
    body: [
      "Non-emergency 'lift assist' calls — helping a fallen person who is uninjured back into a chair or bed — made up a significant share of Cascade City's daily dispatch volume.",
      "After outfitting first-response vehicles with the portable Aeris Lift, crews could complete these calls with one firefighter instead of two, and in roughly a third of the previous time.",
      "The department reported the freed-up capacity allowed faster turnaround for genuine emergency calls during peak hours.",
    ],
  },
  {
    slug: "willowbrook-retail-centre",
    title: "Willowbrook Retail Centre Opens Its Mezzanine to All Visitors",
    type: "Retail",
    product: "DuoStep",
    productSlug: "duostep",
    excerpt:
      "A split-level boutique installed DuoStep to connect its ground floor and mezzanine, turning a previously inaccessible upper level into usable retail space for everyone.",
    thumbnail: GALLERY_IMAGES[4],
    body: [
      "Willowbrook's mezzanine level held nearly a third of its retail floor space but was reachable only by a narrow staircase, effectively closing it off to wheelchair users and parents with strollers.",
      "Rather than sacrifice the mezzanine or undertake a costly structural renovation for a traditional lift shaft, the centre installed a DuoStep unit in the existing stairwell footprint.",
      "The mezzanine level is now fully accessible during all opening hours, and the retailer reports increased dwell time from visitors exploring both floors.",
    ],
  },
  {
    slug: "fairview-elementary-school",
    title: "Fairview Elementary Opens Its Library to Every Student",
    type: "School",
    product: "Aeris Lift",
    productSlug: "aeris-lift",
    excerpt:
      "A split-level library once reachable only by stairs is now open to wheelchair-using students every period, after the school added an Aeris Lift to its accessibility plan.",
    thumbnail: GALLERY_IMAGES[5],
    body: [
      "Fairview Elementary's library sits half a level above the main corridor, connected only by a short flight of stairs — a layout that had quietly excluded wheelchair-using students from browsing the stacks with their classmates for years.",
      "Rather than undertake a structural renovation mid-school-year, the district's facilities team introduced an Aeris Lift at the base of the stairs, staffed by a rotating aide during library periods and free periods alike.",
      "Within the first semester, library visit counts among students using mobility devices rose to match their classmates', and the school reports the setup as a template it plans to reuse at two more sites next year.",
    ],
  },
  {
    slug: "belmont-city-hall",
    title: "Belmont City Hall Puts Its Historic Council Chamber Within Reach",
    type: "Government",
    product: "DuoStep",
    productSlug: "duostep",
    excerpt:
      "A protected 19th-century council chamber gained step-free access via a DuoStep unit built into the original stone stairway, with no visible change to the room during council sessions.",
    thumbnail: GALLERY_IMAGES[0],
    body: [
      "Belmont's council chamber sits one short staircase above the main lobby, inside a building protected by heritage rules that ruled out a visible ramp or an external lift shaft.",
      "The city worked with its facilities contractor to fit a DuoStep unit into the existing stairway, so the steps look and function exactly as they always have for walking visitors, with the lift function available on request.",
      "Council members and residents who use wheelchairs can now reach public sessions without a separate side entrance or staff escort, and the building retains its original street-facing appearance.",
    ],
  },
  {
    slug: "granton-regional-airport",
    title: "Granton Regional Airport Speeds Up Gate-Level Boarding",
    type: "Airport",
    product: "Aeris Lift",
    productSlug: "aeris-lift",
    excerpt:
      "A short-staffed regional terminal added Aeris Lift units at two gates to help ground crews get less mobile passengers from the lounge floor to boarding level without waiting on a single shared aisle chair.",
    thumbnail: GALLERY_IMAGES[1],
    body: [
      "Granton's terminal expansion added a raised boarding level at its two busiest gates, but the airport's ground crew had only one aisle chair to cover the whole building, which meant delays whenever two flights needed assistance at once.",
      "Placing a dedicated Aeris Lift at each of the two gates let ground staff handle boarding assistance locally instead of routing every request through a single shared device and a longer wait.",
      "The airport reports shorter average boarding-assistance times at both gates and fewer schedule knock-on delays during its morning peak.",
    ],
  },
  {
    slug: "the-marlowe-hotel",
    title: "The Marlowe Hotel Keeps Its Grand Staircase and Adds a Lift",
    type: "Hotel",
    product: "DuoStep",
    productSlug: "duostep",
    excerpt:
      "A boutique hotel's signature lobby staircase now doubles as a wheelchair-accessible route after a DuoStep retrofit, so guests still arrive through the same entrance regardless of mobility.",
    thumbnail: GALLERY_IMAGES[2],
    body: [
      "The Marlowe's sweeping lobby staircase is a signature feature of the property, photographed in most of its marketing — which made management reluctant to add a visible ramp or a separate accessible entrance around the side of the building.",
      "A DuoStep retrofit converted a section of the existing staircase into a platform lift, letting every guest use the same grand entrance rather than being routed through a service corridor.",
      "Guest reviews since the installation specifically call out being able to arrive through the main lobby rather than a side door, and the hotel has kept the staircase's original stone finish throughout.",
    ],
  },
  {
    slug: "east-side-arena",
    title: "East Side Arena Adds Wheelchair Seating at Rinkside",
    type: "Sports Venue",
    product: "Aeris Lift",
    productSlug: "aeris-lift",
    excerpt:
      "A community ice rink used a custom Aeris Lift installation to open up rinkside wheelchair seating that had previously only been reachable by a service stair behind the concession stand.",
    thumbnail: GALLERY_IMAGES[3],
    body: [
      "East Side Arena's best rinkside seating sat one level below the main concourse, reachable only by a narrow service stair that ran past the concession stand — effectively off-limits to wheelchair users.",
      "The venue installed an Aeris Lift unit adjacent to the service stair, giving wheelchair users and companions direct access to rinkside seating during games and public skating sessions alike.",
      "Season ticket holders who use wheelchairs now book the same rinkside sections as everyone else, and the arena has since added the seating to its standard accessible-ticketing map.",
    ],
  },
  {
    slug: "thornfield-museum",
    title: "Thornfield Museum Reopens Its Upper Galleries to Everyone",
    type: "Museum",
    product: "Stairlift HDN",
    productSlug: "stairlift-hdn",
    excerpt:
      "A converted 1800s warehouse-turned-museum used a compact Aeris Lift to connect its ground-floor and mezzanine galleries after a structural survey ruled out a traditional elevator shaft.",
    thumbnail: GALLERY_IMAGES[4],
    body: [
      "Thornfield Museum occupies a converted 19th-century warehouse, and a structural survey found the building's original timber frame couldn't support a conventional elevator shaft without major reinforcement work the museum's budget didn't allow for.",
      "The museum instead fitted a compact platform lift at the base of its existing mezzanine stairs, preserving the exposed timber and brick that define the space while opening the upper gallery to wheelchair users for the first time.",
      "Since installation, the upper gallery — previously skipped on most accessible tour routes — is now included by default, and the museum reports a noticeable rise in repeat visits from local accessibility groups.",
    ],
  },
  {
    slug: "meridian-tower-offices",
    title: "Meridian Tower Levels Its Split-Level Office Floors",
    type: "Corporate Office",
    product: "DuoStep",
    productSlug: "duostep",
    excerpt:
      "A financial-district office tower with an awkward half-level floor plan installed DuoStep at two internal staircases so every employee and visitor can move between floors without a detour to a separate service elevator.",
    thumbnail: GALLERY_IMAGES[5],
    body: [
      "Meridian Tower's original 1980s floor plan splits two of its office levels by a half-flight of stairs, a layout quirk that meant wheelchair-using staff and visitors had to take a separate service elevator and a longer route to reach the same meeting rooms as everyone else.",
      "Facilities management installed DuoStep units at both internal staircases during a routine floor refresh, so the split-level layout no longer requires a workaround route for anyone.",
      "Employees now reach either half of the floor through the same staircases as their colleagues, and the building's leasing team lists step-free internal access as a standard feature to prospective tenants.",
    ],
  },
];

export function getCaseBySlug(slug) {
  return cases.find((c) => c.slug === slug);
}
