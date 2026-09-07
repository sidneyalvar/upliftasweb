// DuoStep is the flagship/most-searched product — listed first so it
// leads navigation, the homepage product picker, and the /products grid.
export const products = [
  {
    slug: "duostep",
    name: "DuoStep",
    // Model code shown on the product page and fed into the page's SEO
    // metadata + structured data, so a search for the exact code turns up
    // this page. Format: "<2-digit category prefix>-<4-digit sequence>".
    modelVersion: "V2",
    sku: "16-4727",
    brochure: "/assets/brochures/duostep-brochure.pdf",
    tagline: "A staircase and a lift, combined",
    shortDescription:
      "A 2-in-1 staircase solution that functions as a normal staircase for ambulant guests and folds out into a smooth, powered incline lift for wheelchair users — no separate ramp required.",
    heroImage:
      "/assets/images/products/duostep_1800x1200.WebP",
    thumbnail:
      "/assets/images/products/duostep-chairs-trappe-lift-elevator-rampe-ramp-office-building.WebP",
    video: "/assets/videos/duostep.mp4",
    modelImage: "/assets/images/products/duostep_1800x1200.WebP",
    gallery: [
      "/assets/images/products/duostep-gallery-4.WebP",
      "/assets/images/products/duostep-gallery-1.WebP",
      "/assets/images/products/duostep-gallery-2.WebP",
      "/assets/images/products/duostep-at-asan-city-hall.WebP",
      "/assets/images/products/duostep-gallery-3.WebP",
    ],
    color: "#0056a7",
    category: "Staircase & Lift",
    features: [
      {
        title: "Dual function by design",
        description:
          "Looks and behaves like a standard staircase, then transforms in seconds into a level platform lift for wheelchairs, walkers, or strollers.",
      },
      {
        title: "No permanent ramp needed",
        description:
          "Removes the need for a separate accessibility ramp, saving floor space and preserving a building's architectural intent.",
      },
      {
        title: "Simple push-button control",
        description:
          "A single control panel raises or lowers the platform with smooth, quiet operation suitable for public and private buildings alike.",
      },
      {
        title: "Built for daily public use",
        description:
          "Engineered for high-traffic environments such as restaurants, retail stores, and event venues where the staircase is used constantly.",
      },
    ],
    standardFeatures: [
      "Anti-slip stair treads (dual-function mode)",
      "Key-locked control panel",
      "Mains power with battery backup",
      "Emergency stop button",
      "Photocell safety sensors",
      "Powder-coated steel structure",
    ],
    optionalFeatures: [
      "Custom RAL color finish",
      "Glass balustrade upgrade",
      "Remote diagnostics module",
      "Weatherproofing for outdoor installs",
    ],
    specs: [
      { label: "Model", value: "Upliftas DuoStep V2 (16-4727)" },
      { label: "Max load", value: "400 kg / 660 lbs" },
      { label: "Operation", value: "Push-button, key-locked" },
      { label: "Installation", value: "Custom-fit per site" },
      { label: "Power", value: "Standard mains, battery backup available" },
    ],
    stepModels: [
      {
        steps: 2,
        modelImage: "/assets/images/products/duostep-bim-2-steps-square.WebP",
        specs: [
          { label: "Max rise", value: "0.35 m" },
          { label: "Max load", value: "400 kg / 660 lbs" },
          { label: "Footprint", value: "120 x 90 cm" },
          { label: "Cycle time", value: "~8 seconds" },
          { label: "Lifting height 1 stop", value: "240-370 mm" },
          { label: "Inside step width", value: "700 / 800 / 900 / 1000 mm" },
          { label: "Minimum required width", value: "1000 / 1100 / 1200 / 1300 mm" },
          { label: "Noise", value: "< 60 dB" },
          { label: "Battery backup", value: "30 cycles at 25C" },
          { label: "Patents", value: "EP1254858, EP1600416, EP22156873, EP23162637, KR10-2904164, KR10-2938438" },
          { label: "Typical install time", value: "1 day" },
          { label: "Best suited for", value: "Shop fronts, single-step entries" }
          ,
        ],
        standardFeatures: [
          "Anti-slip stair treads",
          "Key-locked control panel",
          "Emergency stop button",
          "Mains power supply",
        ],
        optionalFeatures: [
          "Custom RAL color finish",
          "Battery backup module",
          "Remote control",
          "On/off key switch",
        ],
      },
      {
        steps: 3,
        modelImage: "/assets/images/products/duostep-bim-3-steps-round.WebP",
        specs: [
          { label: "Max rise", value: "0.55 m" },
          { label: "Max load", value: "400 kg / 660 lbs" },
          { label: "Footprint", value: "140 x 90 cm" },
          { label: "Cycle time", value: "~10 seconds" },
           { label: "Lifting height 1 stop", value: "240-370 mm" },
           { label: "Lifting height 2 stop", value: "480-740 mm" },
          { label: "Inside step width", value: "700 / 800 / 900 / 1000 mm" },
          { label: "Minimum required width", value: "1000 / 1100 / 1200 / 1300 mm" },
          { label: "Noise", value: "< 60 dB" },
          { label: "Patents", value: "EP1254858, EP1600416, EP22156873, EP23162637, KR10-2904164, KR10-2938438" },
          { label: "Battery backup", value: "30 cycles at 25C" },
          { label: "Typical install time", value: "1–2 days" },
          { label: "Best suited for", value: "Restaurant entries, small retail" },
        ],
        standardFeatures: [
          "Anti-slip stair treads",
          "Key-locked control panel",
          "Emergency stop button",
          "Mains power with battery backup",
          "Safety pressure plates under steps",
        ],
        optionalFeatures: [
          "Custom RAL color finish",
          "Glass balustrade upgrade",
          "Vertical safety barrier on upper level",
          "Automatic door on upper level",
          "Vertical safety barrier on lower level",
          "Remote control",
        ],
      },
      {
        steps: 4,
        modelImage: "/assets/images/products/duostep-bim-4-steps-square.WebP",
        specs: [
          { label: "Max rise", value: "0.75 m" },
          { label: "Max load", value: "400 kg / 660 lbs" },
          { label: "Footprint", value: "160 x 100 cm" },
          { label: "Cycle time", value: "~13 seconds" },
           { label: "Lifting height 1 stop", value: "480-740 mm" },
           { label: "Lifting height 2 stop", value: "600-925 mm" },
          { label: "Inside step width", value: "700 / 800 / 900 / 1000 mm" },
          { label: "Minimum required width", value: "1000 / 1100 / 1200 / 1300 mm" },
          { label: "Noise", value: "< 60 dB" },
          { label: "Battery backup", value: "30 cycles at 25C" },
          { label: "Typical install time", value: "2 days" },
          { label: "Patents", value: "EP1254858, EP1600416, EP22156873, EP23162637, KR10-2904164, KR10-2938438" },
          { label: "Best suited for", value: "Split-level Residential Buildings, hospitality" },
        ],
        standardFeatures: [
          "Anti-slip stair treads",
          "Key-locked control panel",
          "Emergency stop button",
          "Mains power with battery backup",
          "Safety pressure plates under steps",
          "Reinforced side panels",
        ],
        optionalFeatures: [
          "Custom RAL color finish",
          "Glass balustrade upgrade",
          "Automatic platform barrier",
          "Ramp as roll-off protection",
          "Extended ramp",
          "Remote control",
          "On/off key switch",
        ],
      },
      {
        steps: 5,
        modelImage: "/assets/images/products/duostep-bim-5-steps-square.WebP",
        specs: [
          { label: "Max rise", value: "0.95 m" },
          { label: "Max load", value: "400 kg / 660 lbs" },
          { label: "Footprint", value: "180 x 100 cm" },
          { label: "Cycle time", value: "~16 seconds" },
           { label: "Lifting height 1 stop", value: "600-925 mm" },
           { label: "Lifting height 2 stop", value: "720-1110 mm" },
          { label: "Inside step width", value: "700 / 800 / 900 / 1000 mm" },
          { label: "Minimum required width", value: "1000 / 1100 / 1200 / 1300 mm" },
          { label: "Noise", value: "< 70 dB" },
          { label: "Battery backup", value: "30 cycles at 25C" },
          { label: "Typical install time", value: "2 days" },
          { label: "Patents", value: "EP1254858, EP1600416, EP22156873, EP23162637, KR10-2904164, KR10-2938438" },
          { label: "Best suited for", value: "Mezzanines, raised dining areas" },
        ],
        standardFeatures: [
          "Anti-slip stair treads",
          "Key-locked control panel",
          "Emergency stop button",
          "Mains power with battery backup",
          "Safety pressure plates under steps",
          "Reinforced side panels",
        ],
        optionalFeatures: [
          "Custom RAL color finish",
          "Automatic platform barrier",
          "Ramp as roll-off protection",
          "Extended ramp",
          "Remote control",
          "On/off key switch",
        ],
      },
      {
        steps: 6,
        modelImage: "/assets/images/products/duostep-bim-6-steps-square.WebP",
        specs: [
          { label: "Max rise", value: "1.15 m" },
          { label: "Max load", value: "280 kg / 615 lbs" },
          { label: "Footprint", value: "200 x 110 cm" },
          { label: "Cycle time", value: "~19 seconds" },
           { label: "Lifting height 1 stop", value: "600-925 mm" },
           { label: "Lifting height 2 stop", value: "720-1110 mm" },
          { label: "Inside step width", value: "700 / 800 / 900 / 1000 mm" },
          { label: "Minimum required width", value: "1000 / 1100 / 1200 / 1300 mm" },
          { label: "Noise", value: "< 70 dB" },
          { label: "Battery backup", value: "30 cycles at 25C" },
          { label: "Typical install time", value: "2 days" },
          { label: "Patents", value: "EP1254858, EP1600416, EP22156873, EP23162637, KR10-2904164, KR10-2938438" },
          { label: "Best suited for", value: "Multi-level venues, event spaces" },
        ],
        standardFeatures: [
          "Anti-slip stair treads",
          "Key-locked control panel",
          "Emergency stop button",
          "Mains power with battery backup",
          "Safety pressure plates under steps",
          "Reinforced side panels",
          "Dual emergency lowering system",
        ],
        optionalFeatures: [
          "Custom RAL color finish",
          "Glass balustrade upgrade",
          "Remote diagnostics module",
          "Weatherproofing for outdoor installs",
          "Handrail ambient lighting",
        ],
      },
    ],
    useCases: ["Restaurants", "Residential Building", "Hospitality", "Public Buildings"],
    variants: [],
  },
  {
    slug: "aeris-lift",
    name: "Aeris Lift",
    modelVersion: "V1",
    sku: "22-5390",
    brochure: "/assets/brochures/aeris-lift-brochure.pdf",
    tagline: "From lying to sitting, safely and with dignity",
    shortDescription:
      "A battery-powered lifting chair that helps caregivers raise a fallen or bedridden person from the floor into a comfortable seated position in under a minute.",
    heroImage:
      "/assets/images/products/aeris-lift-gallery-1.WebP",
    thumbnail:
      "/assets/images/products/aeris-lift-gallery-6.WebP",
    video: "/assets/videos/aeris-lift.mp4",
    modelImage: "/assets/images/products/aeris-lift-gallery-1.WebP",
    gallery: [
      "/assets/images/products/aeris-lift-gallery-5.WebP",
      "/assets/images/products/aeris-lift-gallery-2.WebP",
      "/assets/images/products/aeris-lift-gallery-3.WebP",
      "/assets/images/products/aeris-lift-gallery-4.WebP",
      "/assets/images/products/aeris-lift-gallery-1.WebP",
      "/assets/images/products/aeris-lift-gallery-6.WebP",
    ],
    color: "#0056a7",
    category: "Lifting Chair",
    features: [
      {
        title: "One-person operation",
        description:
          "A single caregiver can safely lift a person weighing up to 200 kg without strain, thanks to a low center of gravity and battery-driven lift arm.",
      },
      {
        title: "Under 60 seconds",
        description:
          "From arrival on scene to a seated, stable position, the average lift takes less than a minute — critical in emergency response settings.",
      },
      {
        title: "Works on any surface",
        description:
          "Compact wheelbase and foldable frame mean it can be used in bathrooms, hallways, and tight domestic spaces as easily as in a hospital ward.",
      },
      {
        title: "Rechargeable & portable",
        description:
          "A swappable battery pack and sub-25kg folded weight make it easy to carry in an ambulance, care vehicle, or facility storage cupboard.",
      },
    ],
    standardFeatures: [
      "Rechargeable lithium battery pack",
      "Foldable aluminum frame",
      "Non-slip base pads",
      "One-button lift/lower control",
      "Padded head, back, and leg supports",
      "Carry bag included",
    ],
    optionalFeatures: [
      "Second swappable battery pack",
      "Wall-mounted charging dock",
      "Extra-wide seat pad for bariatric use",
      "Emergency services rapid-deploy case",
    ],
    specs: [
      { label: "Model", value: "Upliftas Aeris Lift V1 (22-5390)" },
      { label: "Max user weight", value: "200 kg / 440 lbs" },
      { label: "Folded weight", value: "23 kg / 51 lbs" },
      { label: "Lift time", value: "~45 seconds" },
      { label: "Power", value: "Rechargeable battery pack" },
      { label: "Folded dimensions", value: "86 x 60 x 24 cm" },
    ],
    useCases: ["Care Homes", "Home Care", "Emergency Services", "Hospitals"],
    variants: [],
  },
  {
    slug: "stairlift-hdn",
    name: "Stairlift HDN",
    modelVersion: "V2",
    sku: "34-6182",
    brochure: "/assets/brochures/stairlift-hdn-brochure.pdf",
    tagline: "Fast, safe stair training for rehabilitation",
    shortDescription:
      "A compact set of adjustable training stairs used by physiotherapists to rebuild a patient's confidence and strength on steps before they return home.",
    heroImage:
      "/assets/images/products/hdn-gallery-5.WebP",
    thumbnail:
      "/assets/images/products/stairlift-hdn_1800x1200.WebP",
    video: "/assets/videos/HDN.mp4",
    modelImage: "/assets/images/products/aeris-lift-gallery-1.WebP",
    gallery: [
      "/assets/images/products/hdn-gallery-1.WebP",
      "/assets/images/products/hdn-gallery-2.WebP",
      "/assets/images/products/hdn-gallery-3.WebP",
      "/assets/images/products/hdn-gallery-4.WebP",
      "/assets/images/products/hdn-gallery-5.WebP",
    ],
    color: "#0056a7",
    category: "Rehabilitation",
    features: [
      {
        title: "Adjustable step height",
        description:
          "Step height and depth can be adjusted in small increments, allowing therapists to tailor difficulty to each patient's recovery stage.",
      },
      {
        title: "Integrated handrails",
        description:
          "Height-adjustable rails on both sides provide confidence and support during early-stage training sessions.",
      },
      {
        title: "V2: foldable frame",
        description:
          "The second-generation Stairlift HDN V2 folds flat for storage and transport between clinics, wards, or home-visit sessions.",
      },
      {
        title: "Non-slip certified surfaces",
        description:
          "Every tread uses a certified non-slip surface tested to clinical safety standards for rehabilitation equipment.",
      },
    ],
    standardFeatures: [
      "Adjustable-height handrails, both sides",
      "Certified non-slip tread surfaces",
      "3-step configurable frame",
      "Locking wheels for safe transport",
    ],
    optionalFeatures: [
      "Foldable V2 frame upgrade",
      "Additional step modules (4th/5th step)",
      "Therapist clipboard tray attachment",
      "Padded handrail grips",
    ],
    specs: [
      { label: "Model", value: "Upliftas Stairlift HDN V2 (34-6182)" },
      { label: "Step height range", value: "10 – 20 cm, adjustable" },
      { label: "Number of steps", value: "3 (configurable)" },
      { label: "Handrail height", value: "Adjustable, both sides" },
      { label: "Version", value: "V2 — foldable frame" },
      { label: "Certification", value: "Clinical non-slip standard" },
    ],
    useCases: ["Hospitals", "Rehabilitation Centers", "Physiotherapy Clinics"],
    variants: [
      { name: "Stairlift HDN V1", description: "Fixed-frame original model." },
      { name: "Stairlift HDN V2", description: "Foldable, lighter, faster to set up." },
    ],
  },
];

export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug);
}

// "Upliftas DuoStep V2 (16-4727)" — the canonical, human-readable model
// code shown in the hero and fed into page titles/structured data so a
// search for the exact code (something installers and buyers often search
// verbatim) lands on this page.
export function getProductCode(product) {
  return `Upliftas ${product.name} ${product.modelVersion} (${product.sku})`;
}
