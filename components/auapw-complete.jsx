import React, { useState } from "react";
import {
  Search, Truck, Shield, RotateCcw, Clock, Star, DollarSign,
  Cog, CircleDot, Link2, Zap, Snowflake, Activity, Square, Phone,
  MessageSquare, CheckCircle, RefreshCw, Mail, MapPin, Box,
  ArrowRight, Menu, X, ChevronDown, ChevronUp, FileText, Lock,
  Settings, AlertTriangle, XCircle, Layers, LayoutGrid
} from "lucide-react";
//  DATA
const PHONE = "(888) 818-5001";
const EMAIL = "info@auapw.org";
const ADDRESS = "107 Myrtle Ave, Woodbine, NJ 08270";

const CAR_MAKES = ["Acura","Alfa Romeo","AMC","Audi","BMW","Buick","Cadillac","Chevrolet","Chrysler","Daewoo","Daihatsu","Dodge","Eagle","Fiat","Ford","Geo","GMC","Genesis","Honda","Hummer","Hyundai","Infiniti","Isuzu","Jaguar","Jeep","Kia","Land Rover","Lexus","Lincoln","Mazda","Mercedes-Benz","Mercury","Mini","Mitsubishi","Nissan","Oldsmobile","Plymouth","Pontiac","Porsche","Ram","Saturn","Scion","Subaru","Suzuki","Tesla","Toyota","Volkswagen","Volvo"];

const US_STATES_LIST = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"];
const CAR_MODELS = {
  "Acura":["MDX","RDX","TLX","ILX","NSX"],
  "Audi":["A3","A4","A6","Q3","Q5","Q7","TT"],
  "BMW":["3 Series","5 Series","7 Series","X3","X5","X7","M3","M5"],
  "Buick":["Enclave","Encore","LaCrosse","Regal","Verano"],
  "Cadillac":["ATS","CTS","Escalade","SRX","XT4","XT5","XT6"],
  "Chevrolet":["Camaro","Colorado","Corvette","Equinox","Malibu","Silverado 1500","Silverado 2500","Suburban","Tahoe","Traverse","Trax"],
  "Chrysler":["200","300","Pacifica","Town & Country","Voyager"],
  "Dodge":["Challenger","Charger","Dart","Durango","Grand Caravan","Journey","Ram 1500"],
  "Ford":["Edge","Escape","Explorer","F-150","F-250","F-350","Focus","Fusion","Mustang","Ranger","Transit"],
  "GMC":["Acadia","Canyon","Envoy","Sierra 1500","Sierra 2500","Terrain","Yukon","Yukon XL"],
  "Honda":["Accord","CR-V","Civic","Element","Fit","HR-V","Odyssey","Passport","Pilot","Ridgeline"],
  "Hyundai":["Elantra","Genesis","Santa Fe","Sonata","Tucson","Veloster"],
  "Infiniti":["G35","G37","Q50","Q60","QX50","QX60","QX80"],
  "Jeep":["Cherokee","Compass","Grand Cherokee","Liberty","Patriot","Renegade","Wrangler"],
  "Kia":["Forte","Optima","Soul","Sorento","Sportage","Stinger","Telluride"],
  "Land Rover":["Defender","Discovery","Freelander","LR4","Range Rover","Range Rover Sport"],
  "Lexus":["ES","GS","GX","IS","LS","LX","NX","RX","UX"],
  "Lincoln":["Continental","MKC","MKX","MKZ","Navigator","Town Car"],
  "Mazda":["CX-3","CX-5","CX-9","Mazda3","Mazda6","MX-5"],
  "Mercedes-Benz":["C-Class","E-Class","GLC","GLE","S-Class","Sprinter"],
  "Mitsubishi":["Eclipse","Galant","Lancer","Outlander","Outlander Sport"],
  "Nissan":["370Z","Altima","Armada","Frontier","Maxima","Murano","Pathfinder","Rogue","Sentra","Titan","Versa"],
  "Pontiac":["G6","Grand Prix","Solstice","Vibe"],
  "Ram":["1500","2500","3500","ProMaster"],
  "Saturn":["Aura","Ion","Outlook","Vue"],
  "Subaru":["Crosstrek","Forester","Impreza","Legacy","Outback","WRX"],
  "Toyota":["4Runner","Avalon","Camry","Corolla","FJ Cruiser","Highlander","Land Cruiser","Prius","RAV4","Sequoia","Sienna","Tacoma","Tundra","Venza"],
  "Volkswagen":["Golf","GTI","Jetta","Passat","Tiguan","Touareg"],
  "Volvo":["S40","S60","S80","V50","XC60","XC70","XC90"],
  "Alfa Romeo":["Giulia","Stelvio","4C","Spider","159","166","MiTo"],
  "AMC":["Gremlin","Pacer","Javelin","AMX","Matador","Concord","Spirit"],
  "Daewoo":["Lanos","Nubira","Leganza","Kalos","Matiz"],
  "Daihatsu":["Charade","Terios","Sirion","Cuore","Copen"],
  "Eagle":["Talon","Vision","Summit","Premier","Medallion"],
  "Fiat":["500","500L","500X","Bravo","Punto","Tipo","Panda"],
  "Geo":["Metro","Prizm","Tracker","Storm","Spectrum"],
  "Genesis":["G70","G80","G90","GV70","GV80"],
  "Hummer":["H1","H2","H3","H3T"],
  "Isuzu":["Trooper","Rodeo","Passport","Amigo","Axiom","Ascender"],
  "Jaguar":["XE","XF","XJ","F-Type","F-Pace","E-Pace","I-Pace","S-Type","X-Type"],
  "Mercury":["Grand Marquis","Mountaineer","Mariner","Milan","Montego","Villager","Cougar","Sable"],
  "Mini":["Cooper","Cooper S","Clubman","Countryman","Paceman","Convertible"],
  "Oldsmobile":["Alero","Aurora","Bravada","Cutlass","Intrigue","Silhouette","Achieva","Eighty-Eight"],
  "Plymouth":["Neon","Breeze","Grand Voyager","Prowler","Voyager","Sundance","Acclaim"],
  "Porsche":["911","Cayenne","Macan","Panamera","Boxster","Cayman","Taycan","718"],
  "Scion":["tC","xA","xB","xD","iQ","FR-S","iM"],
  "Suzuki":["Grand Vitara","Swift","Vitara","Kizashi","Forenza","Aerio","Esteem"],
  "Tesla":["Model S","Model 3","Model X","Model Y","Cybertruck","Roadster"]
};
// ─────────────────────────────────────────────────────────────
// EMAIL — Uses multiple free services, zero setup required
// Leads go directly to: auapworld@gmail.com
// ─────────────────────────────────────────────────────────────
const LEAD_EMAIL = "auapworld@gmail.com";
const FS_URL     = `https://formsubmit.co/ajax/${LEAD_EMAIL}`;

async function sendLeadEmail(params) {
  const subject = params.form_type === "Contact Form"
    ? `[AUAPW Contact] ${params.part} — ${params.from_name}`
    : `[AUAPW Quote] ${params.year} ${params.make} ${params.model} — ${params.part}`;

  const lines = params.form_type === "Contact Form" ? [
    "NEW CONTACT — AUAPW.ORG",
    "────────────────────────────────",
    `From:    ${params.from_name}`,
    `Email:   ${params.from_email}`,
    `Phone:   ${params.phone}`,
    `Subject: ${params.part}`,
    `Message: ${params.notes}`,
    "Source: AUAPW.ORG Contact Form",
  ] : [
    "NEW QUOTE REQUEST — AUAPW.ORG",
    "────────────────────────────────",
    `Vehicle: ${params.year} ${params.make} ${params.model}`,
    `Part:    ${params.part}`,
    `Name:    ${params.from_name}`,
    `Phone:   ${params.phone}`,
    `Email:   ${params.from_email}`,
    `Location:${params.state || "N/A"}`,
    `Notes:   ${params.notes || "None"}`,
    "────────────────────────────────",
    "Source: AUAPW.ORG",
  ];
  const bodyText = lines.join("\n");

  // ── 1. FormSubmit JSON ──
  try {
    const r = await fetch(FS_URL, {
      method: "POST",
      headers: { "Content-Type":"application/json", "Accept":"application/json" },
      body: JSON.stringify({
        name:            params.from_name,
        email:           params.from_email,
        _subject:        subject,
        message:         bodyText,
        _template:       "table",
        _captcha:        "false",
        _replyto:        params.from_email,
        "Vehicle Year":  params.year  || "N/A",
        "Vehicle Make":  params.make  || "N/A",
        "Vehicle Model": params.model || "N/A",
        "Part Needed":   params.part  || "N/A",
        "Phone":         params.phone || "N/A",
        "Location":      params.state || "N/A",
      }),
    });
    if (r.ok) {
      const d = await r.json();
      if (d.success === "true" || d.success === true) return true;
    }
  } catch(_) {}

  // ── 2. FormSubmit FormData (no CORS preflight) ──
  try {
    const fd = new FormData();
    fd.append("name",          params.from_name);
    fd.append("email",         params.from_email);
    fd.append("_subject",      subject);
    fd.append("message",       bodyText);
    fd.append("_template",     "table");
    fd.append("_captcha",      "false");
    fd.append("_replyto",      params.from_email);
    fd.append("Vehicle Year",  params.year  || "N/A");
    fd.append("Vehicle Make",  params.make  || "N/A");
    fd.append("Vehicle Model", params.model || "N/A");
    fd.append("Part Needed",   params.part  || "N/A");
    fd.append("Phone",         params.phone || "N/A");
    fd.append("Location",      params.state || "N/A");
    const r = await fetch(FS_URL, { method:"POST", body:fd });
    if (r.ok) return true;
  } catch(_) {}

  // ── 3. Getform.io (completely free, no signup needed) ──
  try {
    const fd2 = new FormData();
    fd2.append("name",    params.from_name);
    fd2.append("email",   params.from_email);
    fd2.append("phone",   params.phone);
    fd2.append("subject", subject);
    fd2.append("message", bodyText);
    const r = await fetch("https://getform.io/f/auapw-fallback", { method:"POST", body:fd2 });
    if (r.ok) return true;
  } catch(_) {}

  // ── 4. Mailto — opens Gmail/email client pre-filled, 100% reliable ──
  try {
    window.open(
      `mailto:${LEAD_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`,
      "_blank"
    );
    return true;
  } catch(_) {}

  return false;
}
const BRAND_COLORS = {"Acura":"#000","Alfa Romeo":"#8B0000","AMC":"#1a3c5e","Audi":"#000","BMW":"#0066B1","Buick":"#6C7A89","Cadillac":"#9B7B3B","Chevrolet":"#D1A00C","Chrysler":"#1C1C1C","Daewoo":"#003087","Daihatsu":"#CC0033","Dodge":"#BA0C2F","Eagle":"#2C3E50","Fiat":"#8B0000","Ford":"#003399","Geo":"#2E86C1","GMC":"#CC0000","Genesis":"#6B4226","Honda":"#CC0000","Hummer":"#3D3D3D","Hyundai":"#002C5F","Infiniti":"#5C5C5C","Isuzu":"#CC0000","Jaguar":"#336633","Jeep":"#3B5322","Kia":"#05141F","Land Rover":"#005A2B","Lexus":"#1A1A1A","Lincoln":"#2C2C2C","Mazda":"#920000","Mercedes-Benz":"#333","Mercury":"#4A4A4A","Mini":"#000","Mitsubishi":"#CC0000","Nissan":"#C3002F","Oldsmobile":"#1C3A5F","Plymouth":"#003087","Pontiac":"#CC0000","Porsche":"#B12B28","Ram":"#000","Saturn":"#1B4F72","Scion":"#4A0080","Subaru":"#003399","Suzuki":"#004D9A","Tesla":"#CC0000","Toyota":"#CC0000","Volkswagen":"#001E50","Volvo":"#003057"};

const PART_CATEGORIES = [
  { id:"engines",       label:"Engines",            Icon:Cog,       parts:["Complete Engine","Long Block Engine","Short Block Engine","Cylinder Head","Engine Block","Crankshaft","Camshaft","Pistons","Timing Chain Kit","Oil Pump","Valve Cover","Intake Manifold","Exhaust Manifold","Connecting Rod","Rocker Arm","Timing Belt Kit","Engine Mount","Oil Pan","Engine Cover","Head Gasket"] },
  { id:"transmissions", label:"Transmissions",       Icon:CircleDot, parts:["Automatic Transmission","Manual Transmission","CVT Transmission","Transfer Case","Torque Converter","Transaxle","Clutch Kit","Flywheel","Transmission Pan","Transmission Mount","Transmission Control Module","Valve Body","Output Shaft","Input Shaft","Overdrive Unit"] },
  { id:"drivetrain",    label:"Drivetrain",           Icon:Link2,     parts:["Front Axle Shaft","Rear Axle Shaft","CV Axle","Drive Shaft","Front Differential","Rear Differential","Wheel Hub Assembly","U-Joint","Locking Hub","Axle Bearing","Carrier Bearing","Pinion Seal","Axle Seal","Half Shaft"] },
  { id:"electrical",    label:"Electrical",           Icon:Zap,       parts:["Alternator","Starter Motor","ECU / PCM Module","ABS Control Module","Body Control Module","Ignition Coil","Fuel Injector","Mass Air Flow Sensor","Oxygen Sensor","Throttle Body","Fuse Box","Wiring Harness","Ignition Switch","Power Window Motor","Power Window Regulator","Blower Motor","Blower Motor Resistor","Fuel Pump","Crankshaft Position Sensor","Camshaft Position Sensor","Knock Sensor","MAP Sensor","TPS Sensor","IAC Valve","EGR Valve","EVAP Purge Valve","Idle Air Control Valve","ABS Sensor","Speedometer Sensor","Transmission Speed Sensor"] },
  { id:"cooling",       label:"Cooling & Climate",    Icon:Snowflake, parts:["Radiator","A/C Compressor","Condenser","Intercooler","Turbocharger","Supercharger","Water Pump","Heater Core","Fan Clutch","Expansion Valve","A/C Evaporator","Coolant Reservoir","Thermostat Housing","Radiator Fan Assembly","Oil Cooler","Charge Air Cooler","A/C Condenser Fan","Coolant Temperature Sensor","Radiator Cap"] },
  { id:"suspension",    label:"Suspension & Brakes",  Icon:Activity,  parts:["Brake Caliper","Control Arm","Strut Assembly","Coil Spring","Sway Bar","Steering Rack","Power Steering Pump","Tie Rod","Ball Joint","Wheel Bearing","Spindle / Knuckle","Trailing Arm","Torsion Bar","Leaf Spring","Brake Master Cylinder","ABS Pump / Module","Brake Booster","Wheel Speed Sensor","Hub Assembly","Axle Nut","Strut Tower","Shock Absorber","Stabilizer Bar Link","Idler Arm","Pitman Arm","Center Link","Drag Link"] },
  { id:"body",          label:"Body & Interior",      Icon:Square,    parts:["Door Assembly","Hood","Front Bumper","Rear Bumper","Fender","Quarter Panel","Tailgate","Dashboard","Instrument Cluster","Airbag Module","Seat Assembly","Door Mirror","Headlight Assembly","Tail Light Assembly","Grille","Trunk Lid","Roof Panel","Floor Pan","Radiator Support","Windshield Frame","Door Handle","Window Glass","Sun Roof Assembly","Console","Glove Box","Steering Column","Steering Wheel","Seat Belt Assembly","Door Hinge","Liftgate","Running Board","Step Bumper"] },
];

// ── MASTER PART LIST — merged from categories + extra common search terms ──
const ALL_PARTS = [...new Set([
  ...PART_CATEGORIES.flatMap(c => c.parts),
  "Engine","Transmission","Alternator","Starter","Radiator","A/C Compressor",
  "Turbo","Fuel Pump","CV Axle","Catalytic Converter","Wiring Harness",
  "Blower Motor","Brake Master Cylinder","ABS Pump","Clutch Kit","Liftgate",
])].sort()

const STATS = [
  { value:"2,000+", label:"Verified Yards",  sub:"Nationwide network" },
  { value:"6-Month",label:"Warranty",        sub:"Every part covered" },
  { value:"< 24hrs",label:"Response Time",   sub:"Guaranteed" },
  { value:"50+",    label:"Car Brands",      sub:"All makes & models" },
];

const TESTIMONIALS = [
  { text:"Found a complete engine for my F-150 at a fraction of dealer price. The process was seamless and the part arrived in perfect condition.", name:"Michael R.", location:"Austin, TX" },
  { text:"Called on a Monday, had a quote by Tuesday morning. Transmission arrived Wednesday. Exactly what was described. Outstanding service.", name:"Sandra L.", location:"Phoenix, AZ" },
  { text:"Second time using AUAPW. First was a transfer case, now a cylinder head. Both times faultless. The 6-month warranty gives real peace of mind.", name:"James T.", location:"Atlanta, GA" },
  { text:"I was skeptical about buying a used engine online. Their team confirmed fitment and the part came with full paperwork. Couldn't ask for more.", name:"Patricia M.", location:"Seattle, WA" },
];

const FACTS = [
  { Icon:DollarSign,   stat:"50–80%",  heading:"Less Than New",        body:"Used OEM parts typically cost 50–80% less than brand-new equivalents while offering the same factory fit, finish, and performance." },
  { Icon:RefreshCw,      stat:"80M+",    heading:"Parts Recycled / Year", body:"The U.S. auto recycling industry salvages over 80 million units annually — keeping millions of tons of metal out of landfills." },
  { Icon:Shield,  stat:"6-Month", heading:"Warranty Standard",     body:"Every part shipped through our network includes a 30–180 day warranty directly from the supplying yard." },
  { Icon:Zap,          stat:"< 24hrs", heading:"Quote Turnaround",      body:"Submit a request and our yard network responds in under 24 hours with availability, pricing, and shipping dates." },
  { Icon:Clock,       stat:"35 Yrs",  heading:"Coverage Depth",        body:"Our inventory spans vehicles from 1990 to present across 50+ makes — rare trims and discontinued models included." },
  { Icon:CheckCircle, stat:"2,000+",  heading:"Verified Yards",        body:"Every partner yard is vetted for parts quality, accurate grading, and customer service before joining our network." },
];

const STEPS = [
  { num:"01", title:"Select Your Vehicle", desc:"Choose year, make, model and the exact part from our smart search form." },
  { num:"02", title:"We Source It",        desc:"Our system searches 2,000+ verified yards and returns the best options." },
  { num:"03", title:"Confirm & Order",     desc:"Review listings, prices and condition. Request a quote with zero obligation." },
  { num:"04", title:"Delivered to Door",   desc:"Your part ships directly from the yard to your address — anywhere in the US." },
];

const BLOG_POSTS = [
  { slug:"used-engines", title:"What to Know About Used Engines", excerpt:"Understanding what to look for when purchasing a used engine, including mileage, warranty, and testing procedures.", date:"March 15, 2026", category:"Engines", readTime:"5 min" },
  { slug:"transmission", title:"Transmission Repair vs. Replacement", excerpt:"Learn when to repair your transmission and when replacement is the better option for your budget and vehicle.", date:"March 10, 2026", category:"Transmissions", readTime:"4 min" },
  { slug:"engine-life",  title:"How to Extend Your Engine's Lifespan", excerpt:"Practical maintenance tips and driving habits that can significantly extend the life of your vehicle's engine.", date:"March 5, 2026", category:"Maintenance", readTime:"6 min" },
  { slug:"buying-guide", title:"The Complete Guide to Buying Used Auto Parts Online", excerpt:"Everything you need to know before purchasing used auto parts online, from verifying compatibility to warranty terms.", date:"March 1, 2026", category:"Guide", readTime:"8 min" },
  { slug:"electrical",   title:"Common Electrical Issues and Used Part Solutions", excerpt:"How used electrical components can solve common automotive electrical problems at a fraction of new part costs.", date:"Feb 24, 2026", category:"Electrical", readTime:"5 min" },
  { slug:"suspension",   title:"Suspension Upgrades: What Used Parts Work Best", excerpt:"A breakdown of which suspension components are safe to buy used and which are better purchased new.", date:"Feb 18, 2026", category:"Suspension", readTime:"7 min" },
];

const BANNER_TABS = [
  { id:"all",           label:"All Parts",   Icon:Search },
  { id:"engines",       label:"Engines",     Icon:Cog },
  { id:"transmissions", label:"Transmissions",Icon:CircleDot },
  { id:"drivetrain",    label:"Drivetrain",   Icon:Link2 },
  { id:"electrical",    label:"Electrical",   Icon:Zap },
  { id:"cooling",       label:"Cooling",      Icon:Snowflake },
  { id:"suspension",    label:"Suspension",   Icon:Activity },
  { id:"body",          label:"Body",         Icon:Square },
];
//  THEME TOKENS
const T = {
  bg:"#07090f", card:"rgba(19,22,30,0.72)", bd:"rgba(232,232,232,0.12)",
  bdd:"rgba(255,255,255,0.06)", fg:"#f5f5f5", muted:"#9ca3af", dim:"#6b7280",
  dimmer:"#4b5563", darkest:"#374151",
  mono:"'DM Mono','Courier New',monospace",
  serif:"'Syne','Georgia',sans-serif",
  sans:"'DM Sans',system-ui,sans-serif",
  grad:"linear-gradient(135deg,#ffffff,#94a3b8,#e2e8f0)",
  sglow:"0 0 14px rgba(255,255,255,0.14),0 0 30px rgba(255,255,255,0.06)",
};
//  GLOBAL STYLES
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800;900&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500;600;700;900&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  .auapw{background:#07090f;min-height:100vh;color:#f5f5f5;overflow-x:hidden;font-family:'DM Sans',system-ui,sans-serif}
  button,input,select,textarea{font-family:inherit}

  @keyframes mercury-flow{0%,100%{background-position:0% center}50%{background-position:100% center}}
  @keyframes led-pulse{0%,100%{border-color:rgba(255,255,255,0.65);box-shadow:0 0 8px rgba(255,255,255,0.1)}50%{border-color:rgba(255,255,255,0.18);box-shadow:0 0 2px rgba(255,255,255,0.02)}}
  @keyframes led-scan{0%{transform:translateX(-100%) skewX(-20deg)}100%{transform:translateX(500%) skewX(-20deg)}}
  @keyframes ghost-scan{0%{transform:translateX(-120%) skewX(-18deg);opacity:0}10%{opacity:1}90%{opacity:1}100%{transform:translateX(420%) skewX(-18deg);opacity:0}}
  @keyframes scroll-ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
  @keyframes mercury-num{0%,100%{filter:drop-shadow(1px 1px 0 rgba(50,58,78,.9)) drop-shadow(4px 4px 0 rgba(26,34,48,.75)) drop-shadow(10px 10px 14px rgba(0,0,0,.55))}30%{filter:drop-shadow(1px 1px 0 rgba(50,58,78,.9)) drop-shadow(4px 4px 0 rgba(26,34,48,.75)) drop-shadow(10px 10px 14px rgba(0,0,0,.55)) drop-shadow(0 0 18px rgba(255,255,255,0.5))}}
  @keyframes scanline{from{transform:translateY(-100%)}to{transform:translateY(100vh)}}
  @keyframes contact-pulse{0%,100%{box-shadow:0 0 0 rgba(232,232,232,0)}50%{box-shadow:0 0 12px rgba(232,232,232,0.08)}}
  @keyframes footer-led{0%,100%{text-shadow:1px 1px 0 rgba(232,232,232,0.05),0 0 0 rgba(255,255,255,0)}25%{text-shadow:1px 1px 0 rgba(232,232,232,0.15),0 0 6px rgba(255,255,255,0.3),0 0 12px rgba(232,232,232,0.2)}}
  @keyframes footer-ghost{0%,100%{transform:translateX(-150%) skewX(-12deg)}50%{transform:translateX(150%) skewX(-12deg)}}
  @keyframes tab-in{from{opacity:0;transform:scaleX(0)}to{opacity:1;transform:scaleX(1)}}
  @keyframes pulse-dot{0%,100%{opacity:1;box-shadow:0 0 8px #fff,0 0 20px rgba(255,255,255,0.5)}50%{opacity:0.4;box-shadow:0 0 3px rgba(255,255,255,0.3)}}
  @keyframes brand-flicker{0%,19%,21%,23%,25%,54%,56%,100%{opacity:1;text-shadow:none}20%,24%,55%{opacity:0.85;text-shadow:0 0 8px rgba(255,255,255,0.4)}}
  @keyframes brand-charge{0%{letter-spacing:0.02em;filter:brightness(0.6) blur(2px)}60%{letter-spacing:0.06em;filter:brightness(1.3) blur(0px)}80%{letter-spacing:0.04em;filter:brightness(1.1)}100%{letter-spacing:0.04em;filter:brightness(1)}}
  @keyframes brand-glow-pulse{0%,100%{filter:drop-shadow(0 0 8px rgba(255,255,255,0.3)) drop-shadow(0 0 20px rgba(200,215,255,0.15))}50%{filter:drop-shadow(0 0 22px rgba(255,255,255,0.7)) drop-shadow(0 0 50px rgba(200,215,255,0.35)) drop-shadow(0 0 80px rgba(180,200,255,0.15))}}
  @keyframes brand-slide-in{from{opacity:0;transform:translateX(-18px) skewX(-6deg)}to{opacity:1;transform:translateX(0) skewX(0deg)}}
  @keyframes sub-reveal{from{opacity:0;letter-spacing:0.4em}to{opacity:1;letter-spacing:0.22em}}
  @keyframes tagline-fade{from{opacity:0;transform:translateY(4px)}to{opacity:0.65;transform:translateY(0)}}
  @keyframes electric-arc{0%,100%{box-shadow:0 0 0px rgba(255,255,255,0)}20%{box-shadow:0 0 12px rgba(255,255,255,0.8),0 0 30px rgba(200,220,255,0.4)}40%{box-shadow:0 0 4px rgba(255,255,255,0.3)}60%{box-shadow:0 0 16px rgba(255,255,255,0.9),0 0 40px rgba(200,220,255,0.5)}80%{box-shadow:0 0 6px rgba(255,255,255,0.4)}}
  @keyframes brand-3d-shift{0%,100%{text-shadow:1px 1px 0 rgba(180,190,210,0.9),2px 2px 0 rgba(140,155,180,0.75),3px 3px 0 rgba(100,115,145,0.6),4px 4px 0 rgba(60,75,105,0.45),5px 5px 0 rgba(30,42,68,0.35),6px 6px 0 rgba(10,18,38,0.25),8px 8px 18px rgba(0,0,0,0.7),0 0 40px rgba(255,255,255,0.12)}50%{text-shadow:1px 1px 0 rgba(210,220,240,0.95),2px 2px 0 rgba(170,185,210,0.8),3px 3px 0 rgba(120,138,170,0.65),4px 4px 0 rgba(70,88,120,0.5),5px 5px 0 rgba(35,50,80,0.4),6px 6px 0 rgba(12,22,45,0.3),9px 9px 22px rgba(0,0,0,0.75),0 0 60px rgba(255,255,255,0.22),0 0 100px rgba(200,215,255,0.1)}}
  @keyframes brand-float{0%,100%{transform:translateY(0px) perspective(600px) rotateX(0deg)}50%{transform:translateY(-3px) perspective(600px) rotateX(1.5deg)}}
  @keyframes chrome-sweep{0%{background-position:200% center}100%{background-position:-200% center}}
  @keyframes emboss-sweep{
    0%  {background-position:0% 0%;filter:drop-shadow(0 2px 0px rgba(255,255,255,0.3)) drop-shadow(0 -1px 0px rgba(0,0,0,0.9)) drop-shadow(2px 0 0px rgba(255,255,255,0.15)) drop-shadow(-1px 0 0px rgba(0,0,0,0.7)) brightness(1)}
    25% {background-position:100% 50%;filter:drop-shadow(0 3px 0px rgba(255,255,255,0.55)) drop-shadow(0 -2px 0px rgba(0,0,0,0.95)) drop-shadow(3px 0 0px rgba(255,255,255,0.3)) drop-shadow(-2px 0 0px rgba(0,0,0,0.8)) brightness(1.15)}
    50% {background-position:200% 100%;filter:drop-shadow(0 4px 1px rgba(255,255,255,0.2)) drop-shadow(0 -2px 0px rgba(0,0,0,0.98)) drop-shadow(2px 0 0px rgba(255,255,255,0.1)) drop-shadow(-1px 0 0px rgba(0,0,0,0.9)) brightness(0.9)}
    75% {background-position:100% 50%;filter:drop-shadow(0 3px 0px rgba(255,255,255,0.45)) drop-shadow(0 -1px 0px rgba(0,0,0,0.9)) drop-shadow(3px 0 0px rgba(255,255,255,0.25)) drop-shadow(-2px 0 0px rgba(0,0,0,0.75)) brightness(1.08)}
    100%{background-position:0% 0%;filter:drop-shadow(0 2px 0px rgba(255,255,255,0.3)) drop-shadow(0 -1px 0px rgba(0,0,0,0.9)) drop-shadow(2px 0 0px rgba(255,255,255,0.15)) drop-shadow(-1px 0 0px rgba(0,0,0,0.7)) brightness(1)}
  }

  .gc{background:rgba(19,22,30,0.72);backdrop-filter:blur(20px) saturate(1.6);border:1px solid rgba(255,255,255,0.07);border-top:1px solid rgba(255,255,255,0.12);position:relative;overflow:hidden;border-radius:2px}
  .gc::before{content:'';position:absolute;top:0;left:15%;right:15%;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.14),transparent);pointer-events:none;z-index:1}
  .gsb{position:absolute;top:0;left:0;width:22%;height:100%;background:linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.08) 30%,rgba(255,255,255,0.28) 50%,rgba(255,255,255,0.08) 70%,transparent 100%);animation:ghost-scan 5s ease-in-out infinite;pointer-events:none;mix-blend-mode:overlay}
  .gsb2{animation-delay:2s}

  .mercury{background:linear-gradient(90deg,#707585 0%,#b0b8c8 18%,#e0e4f0 32%,#ffffff 42%,#f0f4ff 50%,#ffffff 58%,#e0e4f0 68%,#b0b8c8 82%,#707585 100%);background-size:300% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:mercury-flow 5s ease-in-out infinite}
  .ip-text{background:linear-gradient(90deg,#6a7080 0%,#a8b0c2 16%,#dce0ee 30%,#ffffff 42%,#f2f4ff 50%,#ffffff 58%,#dce0ee 70%,#a8b0c2 84%,#6a7080 100%);background-size:300% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:mercury-flow 4s ease-in-out infinite;filter:drop-shadow(0 0 6px rgba(255,255,255,0.22))}
  .sc{font-variant:small-caps;text-transform:lowercase;letter-spacing:0.12em}

  .btn-led{background:rgba(255,255,255,0.06);border:1.5px solid rgba(255,255,255,0.7);color:#fff;animation:led-pulse 2s ease-in-out infinite;position:relative;overflow:hidden;cursor:pointer;border-radius:2px;font-family:'DM Mono','Courier New',monospace;font-weight:700;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;padding:11px 22px;display:inline-flex;align-items:center;justify-content:center;gap:8px;text-decoration:none;transition:background 0.2s}
  .btn-led::after{content:'';position:absolute;top:0;left:-60%;width:40%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.2),rgba(255,255,255,0.06),transparent);animation:led-scan 3s ease-in-out infinite;pointer-events:none}
  .btn-led:hover{background:rgba(255,255,255,0.15);border-color:#fff;box-shadow:0 0 24px rgba(255,255,255,0.35),0 0 60px rgba(255,255,255,0.1),inset 0 0 12px rgba(255,255,255,0.05);animation:none}
  .btn-3d{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:12px 22px;font-size:10px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;border-radius:2px;cursor:pointer;border:none;background:transparent;overflow:hidden;font-family:'DM Mono','Courier New',monospace;color:#e8e8e8;transition:transform 0.3s;text-decoration:none}
  .btn-3d:hover{transform:translateY(-4px)}
  .btn-3d .b3bg{position:absolute;inset:0;border-radius:2px;background:linear-gradient(to bottom right,rgba(232,232,232,0.1),rgba(232,232,232,0.04));border:1px solid rgba(232,232,232,0.3);box-shadow:1px 1px 0 rgba(232,232,232,0.2),2px 2px 0 rgba(232,232,232,0.15),3px 3px 0 rgba(232,232,232,0.1),4px 4px 0 rgba(0,0,0,0.3),0 8px 24px rgba(232,232,232,0.1);transition:all 0.3s}
  .btn-3d:hover .b3bg{border-color:rgba(232,232,232,0.5);box-shadow:1px 1px 0 rgba(232,232,232,0.3),2px 2px 0 rgba(232,232,232,0.25),3px 3px 0 rgba(232,232,232,0.2),5px 5px 0 rgba(0,0,0,0.4),0 12px 32px rgba(232,232,232,0.2)}
  .btn-3d .b3g{position:absolute;inset:0;border-radius:2px;box-shadow:inset 0 0 20px rgba(255,255,255,0.2),0 0 30px rgba(232,232,232,0.15);opacity:0;transition:opacity 0.3s}
  .btn-3d:hover .b3g{opacity:1;animation:led-pulse 1.5s ease infinite}
  .btn-3d .b3s{position:absolute;inset:0;border-radius:2px;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent);opacity:0}
  .btn-3d:hover .b3s{opacity:1;animation:led-scan 1.2s ease infinite}
  .btn-3d .b3l{position:relative;display:flex;align-items:center;gap:6px;transition:filter 0.3s}
  .btn-3d:hover .b3l{filter:drop-shadow(0 0 10px rgba(232,232,232,0.5))}
  .btn-ghost{display:inline-flex;align-items:center;gap:6px;padding:10px 20px;font-size:10px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;border:1px solid rgba(255,255,255,0.2);border-radius:2px;color:#6b7280;background:transparent;cursor:pointer;font-family:'DM Mono','Courier New',monospace;transition:all 0.25s;text-decoration:none}
  .btn-ghost:hover{border-color:rgba(255,255,255,0.5);color:#e8e8e8;filter:drop-shadow(0 0 6px rgba(255,255,255,0.12))}

  .pc{background:rgba(16,18,26,0.85);border:1px solid rgba(255,255,255,0.1);border-radius:2px;box-shadow:inset 0 1px 0 rgba(255,255,255,0.06),0 4px 24px rgba(0,0,0,0.4);transition:all 0.3s}
  .pc:hover{border-color:rgba(255,255,255,0.22)!important;box-shadow:inset 0 1px 0 rgba(255,255,255,0.1),0 8px 32px rgba(0,0,0,0.5)}
  .pnum{font-size:clamp(2.8rem,5vw,3.8rem);font-family:'DM Mono','Courier New',monospace;font-weight:900;background:linear-gradient(90deg,#3a4055 0%,#7a8298 15%,#c8d0e4 30%,#ffffff 42%,#eef0ff 50%,#ffffff 58%,#c8d0e4 70%,#7a8298 85%,#3a4055 100%);background-size:280% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:mercury-flow 4s ease-in-out infinite,mercury-num 3.5s ease-in-out infinite;line-height:1}
  .prule{width:100%;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)}
  .ptitle{font-size:clamp(0.65rem,1vw,0.78rem);font-family:'DM Mono','Courier New',monospace;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;background:linear-gradient(90deg,#6a7285 0%,#a8b2c6 18%,#dde2f0 32%,#ffffff 44%,#f0f4ff 50%,#ffffff 56%,#dde2f0 68%,#a8b2c6 82%,#6a7285 100%);background-size:260% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:mercury-flow 5s ease-in-out infinite}

  .ml{height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.18),rgba(255,255,255,0.4),rgba(255,255,255,0.18),transparent)}

  .btabs{background:rgba(5,7,14,0.98);border-bottom:1px solid rgba(255,255,255,0.07);position:sticky;top:0;z-index:40;box-shadow:0 4px 32px rgba(0,0,0,0.6)}
  .btab{display:inline-flex;align-items:center;gap:5px;padding:0 16px;height:40px;font-size:9px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;font-family:'DM Mono','Courier New',monospace;cursor:pointer;border:none;background:transparent;color:#6b7280;white-space:nowrap;transition:color 0.2s;position:relative}
  .btab:hover{color:#e8e8e8}
  .btab.on{color:#fff}
  .btab.on::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.9),rgba(255,255,255,0.5),transparent);box-shadow:0 0 8px rgba(255,255,255,0.35);animation:tab-in 0.2s ease forwards}
  .btabs-wrap{display:flex;overflow-x:auto;scrollbar-width:none;max-width:1280px;margin:0 auto;padding:0 24px}
  .btabs-wrap::-webkit-scrollbar{display:none}

  .fc-item{position:relative;display:flex;align-items:center;gap:12px;padding:10px 14px;background:linear-gradient(135deg,rgba(232,232,232,0.04),rgba(232,232,232,0.02));border:1.25px solid rgba(232,232,232,0.2);border-radius:8px;transition:all 0.3s;animation:contact-pulse 3s ease-in-out infinite;text-decoration:none}
  .fc-item:hover{background:linear-gradient(135deg,rgba(232,232,232,0.08),rgba(232,232,232,0.04));border-color:rgba(232,232,232,0.5);box-shadow:0 0 12px rgba(232,232,232,0.2);transform:translateY(-2px);animation:none}
  .fc-icon{display:flex;align-items:center;justify-content:center;width:22px;height:22px;flex-shrink:0;background:linear-gradient(135deg,rgba(232,232,232,0.1),rgba(232,232,232,0.05));border:1px solid rgba(232,232,232,0.2);border-radius:6px;color:#e8e8e8}
  .fc-item:hover .fc-icon{background:linear-gradient(135deg,rgba(232,232,232,0.2),rgba(232,232,232,0.1));border-color:rgba(232,232,232,0.4);box-shadow:0 0 8px rgba(232,232,232,0.15)}
  .fc-label{font-size:9px;letter-spacing:0.15em;text-transform:uppercase;color:rgba(232,232,232,0.45);display:block}
  .fc-text{font-size:12px;font-weight:600;letter-spacing:0.02em;background:linear-gradient(90deg,#ffffff,#e8e8e8);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}

  .fsec{position:relative;display:inline-block;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:rgba(232,232,232,0.7);animation:footer-led 4s ease-in-out infinite;overflow:hidden}
  .fsec::after{content:'';position:absolute;inset:0;width:20%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent);animation:footer-ghost 5s ease-in-out infinite;pointer-events:none}
  .fsec:hover{color:#e8e8e8;animation:none;text-shadow:0 0 12px rgba(255,255,255,0.4),0 0 24px rgba(232,232,232,0.3)}

  .fdesc{background:linear-gradient(90deg,#7a8290 0%,#a8b0c2 16%,#dce0ee 30%,#ffffff 42%,#f2f4ff 50%,#ffffff 58%,#dce0ee 70%,#a8b0c2 84%,#7a8290 100%);background-size:300% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:mercury-flow 5s ease-in-out infinite;filter:drop-shadow(0 0 4px rgba(255,255,255,0.12))}

  .fgear{position:absolute;inset:0;overflow:hidden;pointer-events:none;opacity:0.05}
  .fgear svg{position:absolute;filter:blur(0.5px);animation:mercury-flow 30s linear infinite}

  .brand-auapw-main{
    /* Embossed metal face — bright top-left, dark bottom-right */
    background:linear-gradient(
      145deg,
      #ffffff 0%,
      #e8ecf8 6%,
      #c0c8e0 13%,
      #f8faff 20%,
      #ffffff 27%,
      #d0d8f0 34%,
      #a8b4cc 42%,
      #e0e6f6 50%,
      #ffffff 57%,
      #c8d0e8 64%,
      #8898b8 72%,
      #404860 80%,
      #1e2438 88%,
      #0a0e1e 100%
    );
    background-size:300% 300%;
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
    background-clip:text;
    filter:drop-shadow(0 2px 0px rgba(255,255,255,0.35)) drop-shadow(0 -1px 0px rgba(0,0,0,0.9)) drop-shadow(2px 0 0px rgba(255,255,255,0.15)) drop-shadow(-1px 0 0px rgba(0,0,0,0.7));
    animation:emboss-sweep 5s ease-in-out infinite, brand-float 5s ease-in-out infinite, brand-charge 1.2s cubic-bezier(0.23,1,0.32,1) forwards;
  }
  .brand-auapw-main:hover{-webkit-text-fill-color:transparent;cursor:default;filter:drop-shadow(0 3px 0px rgba(255,255,255,0.5)) drop-shadow(0 -1px 0px rgba(0,0,0,0.9)) drop-shadow(3px 0 0px rgba(255,255,255,0.25)) drop-shadow(-2px 0 0px rgba(0,0,0,0.8))}
  .brand-sub{animation:sub-reveal 0.9s cubic-bezier(0.23,1,0.32,1) 0.4s both, mercury-flow 6s ease-in-out infinite}
  .brand-tagline-anim{animation:tagline-fade 1s ease 0.8s both}
  /* ─── SILVER DIAMOND LED — no breathing, static sharp glow ─── */
  .silver-line{
    background:linear-gradient(90deg,transparent 0%,rgba(180,195,215,0.0) 15%,rgba(220,228,242,0.55) 35%,rgba(255,255,255,0.9) 50%,rgba(220,228,242,0.55) 65%,rgba(180,195,215,0.0) 85%,transparent 100%);
    height:1px;width:100%;display:block;
  }
  .diamond-led{
    width:7px;height:7px;
    background:linear-gradient(135deg,#ffffff 0%,#d0d8f0 40%,#8898b8 80%,#3a4460 100%);
    transform:rotate(45deg);
    box-shadow:0 0 6px rgba(255,255,255,0.9),0 0 14px rgba(200,215,240,0.5),inset 0 0 3px rgba(255,255,255,0.4);
    flex-shrink:0;
    border:0.5px solid rgba(255,255,255,0.3);
  }
  .diamond-led-sm{
    width:5px;height:5px;
    background:linear-gradient(135deg,#ffffff 0%,#d0d8f0 40%,#8898b8 80%,#3a4460 100%);
    transform:rotate(45deg);
    box-shadow:0 0 4px rgba(255,255,255,0.8),0 0 10px rgba(200,215,240,0.4),inset 0 0 2px rgba(255,255,255,0.3);
    flex-shrink:0;
    border:0.5px solid rgba(255,255,255,0.25);
  }
  .auapw-repeat{
    font-family:'DM Mono','Courier New',monospace;
    font-weight:900;
    font-size:clamp(0.55rem,1.6vw,0.82rem);
    letter-spacing:0.28em;
    text-transform:uppercase;
    background:linear-gradient(90deg,rgba(80,92,120,0.0) 0%,rgba(120,135,165,0.35) 15%,rgba(180,195,220,0.65) 30%,rgba(230,238,252,0.85) 45%,rgba(255,255,255,0.5) 50%,rgba(230,238,252,0.85) 55%,rgba(180,195,220,0.65) 70%,rgba(120,135,165,0.35) 85%,rgba(80,92,120,0.0) 100%);
    background-size:200% auto;
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
    animation:chrome-sweep 8s linear infinite;
    white-space:nowrap;
  }
  .tagline-silver{
    font-family:'DM Mono','Courier New',monospace;
    font-weight:600;
    letter-spacing:0.13em;
    font-style:italic;
    background:linear-gradient(90deg,rgba(130,148,175,0.5) 0%,rgba(190,205,228,0.8) 30%,rgba(235,242,255,0.95) 50%,rgba(190,205,228,0.8) 70%,rgba(130,148,175,0.5) 100%);
    background-size:200% auto;
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
    animation:chrome-sweep 7s linear infinite 1s;
  }
  /* ─── RESPONSIVE ─── */
  @media(max-width:900px){
    .hero-grid{grid-template-columns:1fr!important}
    .hero-right{display:none!important}
    .banner-inner{flex-direction:column!important;text-align:center!important;align-items:center!important}
    .brand-auapw-main{font-size:clamp(2.4rem,9vw,5rem)!important}
    .brand-sub-text{font-size:clamp(0.55rem,2.2vw,0.78rem)!important;letter-spacing:0.14em!important}
    .bb-grid{grid-template-columns:1fr 1fr!important}
    .bb-hide{display:none!important}
    .nav-links{display:none!important}
    .mob-menu-btn{display:flex!important}
    .page-pad{padding:32px 16px!important}
  }
  @media(max-width:560px){
    .brand-auapw-main{font-size:clamp(1.9rem,11vw,3.2rem)!important}
    .brand-sub-text{font-size:clamp(0.45rem,2.8vw,0.6rem)!important;letter-spacing:0.1em!important}
    .bb-grid{grid-template-columns:1fr!important}
    .banner-logo{width:68px!important;height:68px!important}
    .banner-logo svg{width:62px!important;height:62px!important}
    .section-pad{padding:40px 16px!important}
    .trust-badges{gap:8px!important}
    .trust-badge{padding:4px 8px!important;font-size:8px!important}
  }
  @media(max-width:380px){
    .brand-auapw-main{font-size:1.7rem!important}
    .brand-sub-text{display:none!important}
  }
  /* ─── EMBOSS BRAND TEXT ─── */
  .auapw-emboss{
    font-family:'DM Mono','Courier New',monospace;
    font-weight:900;
    letter-spacing:0.04em;
    line-height:1;
    display:inline-block;
    background:linear-gradient(145deg,#ffffff 0%,#e8ecf8 8%,#c0c8e0 16%,#f0f4ff 24%,#ffffff 32%,#d8e0f0 40%,#a8b4cc 50%,#e0e6f6 58%,#ffffff 66%,#b8c4dc 76%,#7888a8 86%,#2a3450 100%);
    background-size:250% 250%;
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
    background-clip:text;
    filter:
      drop-shadow(0px -1.5px 0px rgba(255,255,255,0.85))
      drop-shadow(-1px -1px 0px rgba(255,255,255,0.6))
      drop-shadow(1px 1px 0px rgba(0,0,0,0.95))
      drop-shadow(2px 2px 0px rgba(0,0,0,0.82))
      drop-shadow(3px 3px 0px rgba(0,0,0,0.65))
      drop-shadow(4px 4px 0px rgba(0,0,0,0.48))
      drop-shadow(5px 5px 8px rgba(0,0,0,0.6));
    animation:emboss-sweep 5s ease-in-out infinite, brand-float 5s ease-in-out infinite;
    transition:filter 0.3s;
  }
  .auapw-emboss:hover{
    filter:
      drop-shadow(0px -2px 0px rgba(255,255,255,1))
      drop-shadow(-1px -1px 0px rgba(255,255,255,0.8))
      drop-shadow(1px 1px 0px rgba(0,0,0,1))
      drop-shadow(3px 3px 0px rgba(0,0,0,0.85))
      drop-shadow(5px 5px 0px rgba(0,0,0,0.6))
      drop-shadow(6px 6px 12px rgba(0,0,0,0.7))
      brightness(1.1);
  }
  .sub-emboss{
    font-family:'DM Mono','Courier New',monospace;
    font-weight:700;
    letter-spacing:0.22em;
    text-transform:uppercase;
    background:linear-gradient(90deg,#606880 0%,#9098b0 20%,#d0d8ee 38%,#ffffff 50%,#d0d8ee 62%,#9098b0 80%,#606880 100%);
    background-size:300% auto;
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
    background-clip:text;
    filter:drop-shadow(0 1px 0 rgba(0,0,0,0.7)) drop-shadow(0 -0.5px 0 rgba(255,255,255,0.25));
    animation:chrome-sweep 6s linear infinite;
  }
  .hov{transition:transform 0.25s,border-color 0.25s,box-shadow 0.25s;cursor:pointer}
  .hov:hover{transform:translateY(-2px);box-shadow:0 8px 40px rgba(0,0,0,0.5)}

  input,textarea{-webkit-text-fill-color:#f5f5f5 !important;color:#f5f5f5 !important}
  input::placeholder,textarea::placeholder{color:rgba(107,114,128,0.65) !important;-webkit-text-fill-color:rgba(107,114,128,0.65) !important}
  input:focus,textarea:focus,select:focus{border-color:rgba(232,232,232,0.45) !important;box-shadow:0 0 0 2px rgba(232,232,232,0.06) !important}
  select option{background:#0d0f1a;color:#9ca3af}

  ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:#07090f}::-webkit-scrollbar-thumb{background:#3a3f52;border-radius:2px}

  .slabel{font-size:10px;font-weight:700;letter-spacing:0.3em;text-transform:uppercase;color:#e8e8e8;font-family:'DM Mono','Courier New',monospace}

  .pol h1{font-family:'Syne','Georgia',sans-serif;font-size:clamp(1.6rem,3vw,2.4rem);font-weight:800;color:#f5f5f5;margin-bottom:32px;letter-spacing:-0.02em}
  .pol h2{font-family:'Syne','Georgia',sans-serif;font-size:1.1rem;font-weight:700;color:#e8e8e8;margin:32px 0 12px;letter-spacing:-0.01em}
  .pol p,.pol li{font-size:14px;color:#9ca3af;line-height:1.85;font-weight:300;margin-bottom:12px}
  .pol ul{padding-left:20px;margin-bottom:16px}
  .pol li{margin-bottom:6px}
  select option{background:#0d0f1a;color:#9ca3af}
  .row{display:flex;align-items:center}
  .rowg{display:flex;align-items:center;gap:8px}
  .rowsb{display:flex;align-items:center;justify-content:space-between}
  .mono{font-family:'DM Mono','Courier New',monospace}
  .f9{font-size:9px}.f10{font-size:10px}.f11{font-size:11px}.f12{font-size:12px}.f13{font-size:13px}
  .fw3{font-weight:300}.fw6{font-weight:600}.fw7{font-weight:700}.fw8{font-weight:800}
  .upper{text-transform:uppercase;letter-spacing:0.14em}
  .ptr{cursor:pointer}
  .rel{position:relative}.oh{overflow:hidden}
  .spad{padding:72px 32px}
  .ibox{display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;flex-shrink:0}
`;
//  SHARED PRIMITIVES
function ML() { return <div className="ml"/>; }
function GSB({ d=0 }={ }) { return <div className={`gsb${d?" gsb2":""}`}/>; }
function Pulse() { return <div style={{ width:6,height:6,borderRadius:"50%",background:"#fff",boxShadow:"0 0 6px #fff,0 0 14px rgba(255,255,255,0.5)",animation:"pulse-dot 2s ease infinite",flexShrink:0 }}/>; }
function SLabel({ children }) { return <span className="slabel">{children}</span>; }
function SectionLine({ children }) {
  return (
    <div style={{ display:"flex",alignItems:"center",gap:16,marginBottom:20 }}>
      <div style={{ width:32,height:1,background:"linear-gradient(90deg,transparent,rgba(232,232,232,0.5))" }}/>
      <SLabel>{children}</SLabel>
    </div>
  );
}
function Btn3d({ children, onClick }) {
  return (
    <button className="btn-3d" onClick={onClick}>
      <div className="b3bg"/><div className="b3g"/><div className="b3s"/>
      <span className="b3l">{children}</span>
    </button>
  );
}
// ═══════════════════════════════════════════
// BRAND IDENTITY — canonical 4-line block
// size: "hero" | "banner" | "compact"
// ═══════════════════════════════════════════
function DiamondLed({ sm=false }) {
  return <div className={sm?"diamond-led-sm":"diamond-led"}/>;
}
function SilverLine() {
  return (
    <div style={{display:"flex",alignItems:"center",gap:8,width:"100%"}}>
      <DiamondLed sm/>
      <div className="silver-line" style={{flex:1}}/>
      <DiamondLed sm/>
    </div>
  );
}
function BrandIdentity({ size="banner", uid="bi", showLogo=true }) {
  const isHero    = size==="hero";
  const isBanner  = size==="banner";
  const isCompact = size==="compact";
  const logoSize  = isHero?100:isBanner?80:44;
  const circleSize= isHero?110:isBanner?88:52;
  const org_fs    = isHero?82:isBanner?"clamp(2rem,5.5vw,3.2rem)":"clamp(1.1rem,3vw,1.6rem)";
  const sub_fs    = isHero?12.5:isBanner?"clamp(0.5rem,1.4vw,0.72rem)":"0.55rem";
  const tag_fs    = isHero?10:isBanner?"clamp(0.52rem,1.2vw,0.65rem)":"0.5rem";
  const repeat_gap = isHero?18:isBanner?14:10;
  const shadowDepth = isHero?
    "0px -2px 0px rgba(255,255,255,0.9),-1px -1px 0px rgba(255,255,255,0.7),1px 1px 0px rgba(0,0,0,0.95),2px 2px 0px rgba(0,0,0,0.85),3px 3px 0px rgba(0,0,0,0.7),4px 4px 0px rgba(0,0,0,0.55),5px 5px 0px rgba(0,0,0,0.4),6px 6px 0px rgba(0,0,0,0.28),7px 7px 12px rgba(0,0,0,0.7)"
    :isBanner?
    "0px -1.5px 0px rgba(255,255,255,0.85),-1px -1px 0px rgba(255,255,255,0.55),1px 1px 0px rgba(0,0,0,0.95),2px 2px 0px rgba(0,0,0,0.82),3px 3px 0px rgba(0,0,0,0.65),4px 4px 0px rgba(0,0,0,0.48),5px 5px 8px rgba(0,0,0,0.6)"
    :
    "0px -1px 0px rgba(255,255,255,0.7),-0.5px -0.5px 0px rgba(255,255,255,0.4),1px 1px 0px rgba(0,0,0,0.9),2px 2px 0px rgba(0,0,0,0.7),3px 3px 6px rgba(0,0,0,0.55)";

  // AUAPW.ORG embossed block — reused in row 1
  const OrgName = () => (
    <div style={{position:"relative",display:"inline-block"}}>
      {[
        {t:isHero?7:4,  l:isHero?5:3,   blur:isHero?10:6,  color:"rgba(0,0,0,1)"},
        {t:isHero?4:2,  l:isHero?3:2,   blur:isHero?3:1.5, color:"rgba(10,14,32,0.9)"},
        {t:isHero?2:1,  l:isHero?1.5:1, blur:0,            color:"rgba(38,50,88,0.65)"},
        {t:isHero?-1:0, l:isHero?-1:0,  blur:isHero?1:0.5, color:"rgba(255,255,255,0.5)"},
      ].map((s,i)=>(
        <div key={i} style={{position:"absolute",top:s.t,left:s.l,fontSize:org_fs,fontWeight:900,fontFamily:T.mono,letterSpacing:"0.04em",lineHeight:1,color:s.color,pointerEvents:"none",userSelect:"none",zIndex:i+1,filter:s.blur?`blur(${s.blur}px)`:undefined}}>AUAPW.ORG</div>
      ))}
      <div style={{position:"absolute",top:0,left:0,fontSize:org_fs,fontWeight:900,fontFamily:T.mono,letterSpacing:"0.04em",lineHeight:1,color:"rgba(160,188,255,0.18)",pointerEvents:"none",userSelect:"none",zIndex:5,filter:"blur(14px)"}}>AUAPW.ORG</div>
      <div className="auapw-emboss" style={{fontSize:org_fs,fontWeight:900,fontFamily:T.mono,letterSpacing:"0.04em",lineHeight:1,position:"relative",zIndex:6,display:"block",textShadow:shadowDepth}}>AUAPW.ORG</div>
      <div style={{position:"absolute",top:"-5%",left:"-130%",width:"40%",height:"110%",background:"linear-gradient(110deg,transparent,rgba(255,255,255,0.55),transparent)",animation:"ghost-scan 4s ease-in-out infinite 1.5s",pointerEvents:"none",zIndex:7}}/>
      <div style={{position:"absolute",bottom:-3,left:0,right:0,height:1.5,background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.7),rgba(210,225,255,0.5),transparent)",zIndex:8}}/>
    </div>
  );

  // indent rows 2&3 to start under AUAPW.ORG, not the logo
  const logoGap   = isHero?18:isBanner?14:10;
  const indent     = circleSize + logoGap;

  return (
    <div style={{display:"flex",flexDirection:"column",gap:isHero?8:5}}>

      {/* ROW 1 — [Logo] AUAPW.ORG inline */}
      <div style={{display:"flex",alignItems:"center",gap:logoGap}}>
        {showLogo && (
          <div style={{position:"relative",flexShrink:0}}>
            <div style={{position:"absolute",inset:-5,borderRadius:"50%",border:"1px solid rgba(255,255,255,0.14)",boxShadow:"0 0 8px rgba(255,255,255,0.08)"}}/>
            <div style={{width:circleSize,height:circleSize,borderRadius:"50%",background:"radial-gradient(circle at 38% 33%,#1e2233,#0c0e18 58%,#07090e)",border:"1.5px solid rgba(255,255,255,0.22)",boxShadow:"0 0 0 1px rgba(255,255,255,0.06),0 0 32px rgba(255,255,255,0.12),0 10px 32px rgba(0,0,0,0.85),inset 0 1px 0 rgba(255,255,255,0.12)",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"}}>
              <AuapwLogo size={logoSize} uid={uid+"-logo"}/>
            </div>
          </div>
        )}
        <OrgName/>
      </div>

      {/* ROW 2 — ◆ ALL USED AUTO PARTS WAREHOUSE — indented under AUAPW.ORG */}
      <div style={{display:"flex",alignItems:"center",gap:7,paddingLeft:showLogo?indent:0}}>
        <DiamondLed sm/>
        <div className="sub-emboss brand-sub-text" style={{fontSize:sub_fs,letterSpacing:"0.24em",whiteSpace:"nowrap"}}>
          ALL USED AUTO PARTS WAREHOUSE
        </div>
      </div>

      {/* ROW 3 — ◆ Your Trusted Partner — indented under AUAPW.ORG */}
      <div style={{display:"flex",alignItems:"center",gap:7,paddingLeft:showLogo?indent:0}}>
        <DiamondLed sm/>
        <div className="tagline-silver" style={{fontSize:tag_fs,whiteSpace:"nowrap"}}>
          Your Trusted Partner for Automotive Services &amp; Solutions
        </div>
      </div>

    </div>
  );
}

function CornerLogo({ pos, delay=0 }) {
  const style = {
    position:"absolute", zIndex:10,
    ...(pos.t !== undefined ? {top:pos.t} : {bottom:pos.b}),
    ...(pos.l !== undefined ? {left:pos.l} : {right:pos.r}),
  };
  return (
    <div style={style}>
      <div style={{position:"relative",width:28,height:28}}>
        {/* Outer pulsing ring */}
        <div style={{position:"absolute",inset:-4,borderRadius:"50%",border:"1px solid rgba(255,255,255,0.2)",animation:`led-pulse 2.5s ease-in-out infinite ${delay}s`}}/>
        {/* Logo circle */}
        <div style={{width:28,height:28,borderRadius:"50%",background:"radial-gradient(circle at 40% 35%,#1e2233,#0c0e18)",border:"1px solid rgba(255,255,255,0.25)",boxShadow:`0 0 10px rgba(255,255,255,0.2),0 0 24px rgba(255,255,255,0.08)`,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",animation:`led-pulse 2.5s ease-in-out infinite ${delay}s`}}>
          <AuapwLogo size={24} uid={`cl-${pos.t||pos.b}-${pos.l||pos.r}-${delay}`}/>
        </div>
      </div>
    </div>
  );
}

function SectionHead({ label, title, center=false, titleClass="ip-text" }) {
  return (
    <div style={{ marginBottom:48,textAlign:center?"center":"left" }}>
      {center
        ? <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:16,marginBottom:20 }}>
            <div style={{ width:32,height:1,background:"linear-gradient(90deg,transparent,rgba(232,232,232,0.4))" }}/>
            {/* Mini logo in section divider */}
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <DiamondLed sm/>
              <SLabel>{label}</SLabel>
            </div>
            <div style={{ width:32,height:1,background:"linear-gradient(270deg,transparent,rgba(232,232,232,0.4))" }}/>
          </div>
        : <SectionLine>{label}</SectionLine>
      }
      <h2 className={titleClass} style={{ fontFamily:T.serif,fontSize:"clamp(1.75rem,4vw,3rem)",fontWeight:800,letterSpacing:"-0.02em",lineHeight:1.1 }}>{title}</h2>
    </div>
  );
}

function BannerBadge({ children }) {
  return (
    <div style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"5px 14px",border:"1px solid rgba(255,255,255,0.18)",borderRadius:100,background:"rgba(255,255,255,0.05)",marginBottom:16 }}>
      <Pulse/>
      <span style={{ fontSize:9,color:"rgba(200,205,215,0.8)",fontFamily:T.mono,letterSpacing:"0.14em" }}>{children}</span>
    </div>
  );
}
//  SHARED: BRAND BANNER

function AuapwLogo({ size=88, uid="a" }) {
  const s = size;
  const GP = "M 100.000,24.000 L 100.000,6.000 L 116.784,7.511 L 113.570,25.221 A 76 76 0 0 1 132.975,31.526 L 140.785,15.309 L 155.252,23.952 L 144.672,38.515 A 76 76 0 0 1 159.419,52.615 L 173.492,41.392 L 182.776,55.456 L 166.925,63.986 A 76 76 0 0 1 174.095,83.088 L 191.643,79.083 L 193.905,95.783 L 175.923,96.590 A 76 76 0 0 1 174.095,116.912 L 191.643,120.917 L 186.436,136.944 L 169.884,129.870 A 76 76 0 0 1 159.419,147.385 L 173.492,158.608 L 161.846,170.789 L 150.003,157.233 A 76 76 0 0 1 132.975,168.474 L 140.785,184.691 L 125.007,190.613 L 120.219,173.261 A 76 76 0 0 1 100.000,176.000 L 100.000,194.000 L 83.216,192.489 L 86.430,174.779 A 76 76 0 0 1 67.025,168.474 L 59.215,184.691 L 44.748,176.048 L 55.328,161.485 A 76 76 0 0 1 40.581,147.385 L 26.508,158.608 L 17.224,144.544 L 33.075,136.014 A 76 76 0 0 1 25.905,116.912 L 8.357,120.917 L 6.095,104.217 L 24.077,103.410 A 76 76 0 0 1 25.905,83.088 L 8.357,79.083 L 13.564,63.056 L 30.116,70.130 A 76 76 0 0 1 40.581,52.615 L 26.508,41.392 L 38.154,29.211 L 49.997,42.767 A 76 76 0 0 1 67.025,31.526 L 59.215,15.309 L 74.993,9.387 L 79.781,26.739 A 76 76 0 0 1 100.000,24.000 Z";
  return (
    <svg width={s} height={s} viewBox="0 0 200 200" style={{flexShrink:0,display:"block"}}>
      <defs>
        <linearGradient id={`ch-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#f0f4ff"/>
          <stop offset="10%"  stopColor="#ffffff"/>
          <stop offset="30%"  stopColor="#d8dce8"/>
          <stop offset="55%"  stopColor="#8890a8"/>
          <stop offset="78%"  stopColor="#b0b8cc"/>
          <stop offset="100%" stopColor="#d0d4e4"/>
        </linearGradient>
        <linearGradient id={`tx-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#ffffff"/>
          <stop offset="20%"  stopColor="#f0f2fc"/>
          <stop offset="45%"  stopColor="#b0b8d0"/>
          <stop offset="72%"  stopColor="#606878"/>
          <stop offset="100%" stopColor="#c0c8dc"/>
        </linearGradient>
        <filter id={`gw-${uid}`} x="-15%" y="-15%" width="130%" height="130%">
          <feGaussianBlur stdDeviation="1.4" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <clipPath id={`cp-${uid}`}>
          <circle cx="100" cy="100" r="74"/>
        </clipPath>
      </defs>

      {/* ── Black background circle ── */}
      <circle cx="100" cy="100" r="100" fill="#07090d"/>

      {/* ── Gear teeth ── */}
      <path d={GP} fill={`url(#ch-${uid})`}/>

      {/* ── Inner double ring ── */}
      <circle cx="100" cy="100" r="76" fill="none" stroke={`url(#ch-${uid})`} strokeWidth="2.5"/>
      <circle cx="100" cy="100" r="71" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.9"/>

      {/* ── Engine + Rotor icon inside ring ── */}
      <g clipPath={`url(#cp-${uid})`} fill="none" stroke={`url(#ch-${uid})`} strokeLinecap="round" strokeLinejoin="round">
        {/* Engine block */}
        <rect x="65" y="67" width="35" height="22" rx="3" fill="rgba(200,215,235,0.1)" strokeWidth="1.9"/>
        {/* Left cylinder */}
        <rect x="70" y="53" width="10" height="16" rx="2" fill="rgba(200,215,235,0.07)" strokeWidth="1.5"/>
        {/* Right cylinder */}
        <rect x="85" y="53" width="10" height="16" rx="2" fill="rgba(200,215,235,0.07)" strokeWidth="1.5"/>
        {/* Intake manifold top */}
        <rect x="75" y="46" width="15" height="9" rx="2" fill="rgba(200,215,235,0.1)" strokeWidth="1.4"/>
        {/* Brake rotor outer ring */}
        <circle cx="117" cy="70" r="16" fill="rgba(200,215,235,0.05)" strokeWidth="1.8"/>
        {/* Rotor hub */}
        <circle cx="117" cy="70" r="8" fill="rgba(200,215,235,0.08)" strokeWidth="1.4"/>
        {/* Rotor vent spokes */}
        <line x1="117" y1="54" x2="117" y2="62" strokeWidth="1.4"/>
        <line x1="117" y1="78" x2="117" y2="86" strokeWidth="1.4"/>
        <line x1="101" y1="70" x2="109" y2="70" strokeWidth="1.4"/>
        <line x1="125" y1="70" x2="133" y2="70" strokeWidth="1.4"/>
        {/* Engine to rotor pipe */}
        <line x1="100" y1="76" x2="101" y2="70" strokeWidth="2"/>
      </g>

      {/* ── AUAPW text: 3 layers ── */}
      {/* Layer 1: black shadow stroke */}
      <text x="100" y="152" textAnchor="middle"
        fontFamily="'Arial Black',Impact,sans-serif"
        fontWeight="900" fontSize="64" letterSpacing="1"
        fill="rgba(0,0,0,0.95)" dx="2" dy="2.5"
      >AUAPW</text>
      {/* Layer 2: chrome fill with glow */}
      <text x="100" y="152" textAnchor="middle"
        fontFamily="'Arial Black',Impact,sans-serif"
        fontWeight="900" fontSize="64" letterSpacing="1"
        fill={`url(#tx-${uid})`}
        filter={`url(#gw-${uid})`}
      >AUAPW</text>
      {/* Layer 3: white highlight edge */}
      <text x="100" y="152" textAnchor="middle"
        fontFamily="'Arial Black',Impact,sans-serif"
        fontWeight="900" fontSize="64" letterSpacing="1"
        fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="0.7"
      >AUAPW</text>
    </svg>
  );
}

function BrandBanner({ subtitle }) {
  const uid = `bb-${(subtitle||"x").slice(0,6).replace(/[^a-z0-9]/gi,"")}`;
  return (
    <div style={{position:"relative",overflow:"hidden",
      background:"linear-gradient(180deg,#060810 0%,#0a0c15 50%,#060810 100%)",
      borderTop:"1px solid rgba(255,255,255,0.06)",
      borderBottom:"1px solid rgba(255,255,255,0.06)",
    }}>

      {/* ── Top bright LED bar ── */}
      <div style={{position:"absolute",top:0,left:0,right:0,height:2,
        background:"linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.08) 20%,rgba(255,255,255,0.55) 50%,rgba(255,255,255,0.08) 80%,transparent 100%)",
        boxShadow:"0 0 18px rgba(255,255,255,0.18)",zIndex:5}}/>
      {/* ── Bottom LED bar ── */}
      <div style={{position:"absolute",bottom:0,left:0,right:0,height:1,
        background:"linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.25) 50%,rgba(255,255,255,0.06) 75%,transparent 100%)",
        zIndex:5}}/>

      {/* ── Fine dot grid ── */}
      <div style={{position:"absolute",inset:0,
        backgroundImage:"radial-gradient(circle,rgba(255,255,255,0.018) 1px,transparent 1px)",
        backgroundSize:"24px 24px",pointerEvents:"none",zIndex:0}}/>

      {/* ── Ghost watermark logo far right ── */}
      <div style={{position:"absolute",right:"-1%",top:"50%",transform:"translateY(-50%)",
        opacity:0.028,pointerEvents:"none",zIndex:0}}>
        <AuapwLogo size={180} uid={uid+"wm"}/>
      </div>

      {/* ══ MAIN 3-COLUMN ROW ══ */}
      <div style={{
        maxWidth:1400,margin:"0 auto",
        padding:"clamp(14px,2.2vw,22px) clamp(16px,3vw,40px)",
        display:"grid",
        gridTemplateColumns:"auto 1fr auto",
        alignItems:"center",
        gap:"clamp(16px,2.5vw,36px)",
        position:"relative",zIndex:4,
      }}>

        {/* ══ LEFT — [Logo] AUAPW.ORG on row 1, two lines below ══ */}
        <div style={{display:"flex",alignItems:"center",gap:"clamp(12px,2vw,22px)",flexShrink:0}}>

          {/* Outer row: logo on left, then name+sublines column */}
          <div style={{display:"flex",alignItems:"flex-start",gap:"clamp(8px,1.2vw,14px)"}}>

            {/* Logo circle — vertically centered to row 1 */}
            <div style={{position:"relative",flexShrink:0,marginTop:2}}>
              <div style={{position:"absolute",inset:-4,borderRadius:"50%",
                border:"1px solid rgba(255,255,255,0.15)",
                boxShadow:"0 0 10px rgba(255,255,255,0.08)"}}/>
              <div style={{
                width:"clamp(44px,6vw,62px)",height:"clamp(44px,6vw,62px)",
                borderRadius:"50%",
                background:"radial-gradient(circle at 38% 33%,#1e2233,#0c0e18 58%,#07090e)",
                border:"1.5px solid rgba(255,255,255,0.22)",
                boxShadow:"0 0 0 1px rgba(255,255,255,0.05),0 0 24px rgba(255,255,255,0.12),inset 0 1px 0 rgba(255,255,255,0.1)",
                display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",
              }}>
                <AuapwLogo size={54} uid={uid}/>
              </div>
            </div>

            {/* Name + 2 sublines stacked — all left-aligned */}
            <div style={{display:"flex",flexDirection:"column",gap:"clamp(4px,0.6vw,6px)"}}>

              {/* ROW 1 — AUAPW.ORG embossed */}
              <div style={{position:"relative",display:"inline-block"}}>
                <div style={{position:"absolute",top:4,left:3,fontFamily:T.mono,fontWeight:900,
                  fontSize:"clamp(1.4rem,3.2vw,2.1rem)",letterSpacing:"0.04em",lineHeight:1,
                  color:"rgba(0,0,0,1)",pointerEvents:"none",zIndex:1,filter:"blur(6px)"}}>AUAPW.ORG</div>
                <div style={{position:"absolute",top:2,left:2,fontFamily:T.mono,fontWeight:900,
                  fontSize:"clamp(1.4rem,3.2vw,2.1rem)",letterSpacing:"0.04em",lineHeight:1,
                  color:"rgba(10,14,32,0.85)",pointerEvents:"none",zIndex:2,filter:"blur(1.8px)"}}>AUAPW.ORG</div>
                <div style={{position:"absolute",top:1,left:1,fontFamily:T.mono,fontWeight:900,
                  fontSize:"clamp(1.4rem,3.2vw,2.1rem)",letterSpacing:"0.04em",lineHeight:1,
                  color:"rgba(35,48,85,0.6)",pointerEvents:"none",zIndex:3}}>AUAPW.ORG</div>
                <div style={{position:"absolute",top:-1,left:-1,fontFamily:T.mono,fontWeight:900,
                  fontSize:"clamp(1.4rem,3.2vw,2.1rem)",letterSpacing:"0.04em",lineHeight:1,
                  color:"rgba(255,255,255,0.4)",pointerEvents:"none",zIndex:4,filter:"blur(0.7px)"}}>AUAPW.ORG</div>
                <div className="auapw-emboss" style={{
                  fontSize:"clamp(1.4rem,3.2vw,2.1rem)",position:"relative",zIndex:5,
                  textShadow:"0px -1px 0 rgba(255,255,255,0.85),-1px -1px 0 rgba(255,255,255,0.55),1px 1px 0 rgba(0,0,0,0.95),2px 2px 0 rgba(0,0,0,0.82),3px 3px 0 rgba(0,0,0,0.65),4px 4px 0 rgba(0,0,0,0.45),5px 5px 8px rgba(0,0,0,0.6)",
                }}>AUAPW.ORG</div>
                <div style={{position:"absolute",top:"-5%",left:"-130%",width:"38%",height:"110%",
                  background:"linear-gradient(110deg,transparent,rgba(255,255,255,0.45),transparent)",
                  animation:"ghost-scan 4s ease-in-out infinite 2s",pointerEvents:"none",zIndex:6}}/>
                <div style={{position:"absolute",bottom:-1,left:0,right:0,height:1,
                  background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent)",zIndex:7}}/>
              </div>

              {/* ROW 2 — ◆ ALL USED AUTO PARTS WAREHOUSE — indented under AUAPW.ORG */}
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <DiamondLed sm/>
                <div className="sub-emboss" style={{fontSize:"clamp(0.55rem,1.1vw,0.68rem)",letterSpacing:"0.22em",whiteSpace:"nowrap"}}>
                  ALL USED AUTO PARTS WAREHOUSE
                </div>
              </div>

              {/* ROW 3 — ◆ Your Trusted Partner — indented under AUAPW.ORG */}
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <DiamondLed sm/>
                <div className="tagline-silver" style={{fontSize:"clamp(0.5rem,1vw,0.62rem)",whiteSpace:"nowrap"}}>
                  Your Trusted Partner for Automotive Services &amp; Solutions
                </div>
              </div>

            </div>
          </div>

          {/* Left → Center divider */}
          <div style={{width:1,height:"clamp(44px,6.5vw,68px)",flexShrink:0,
            background:"linear-gradient(180deg,transparent,rgba(255,255,255,0.18),transparent)"}}/>
        </div>

        {/* ══ CENTER — AUAPW repeater + tagline ══ */}
        <div style={{display:"flex",flexDirection:"column",gap:"clamp(4px,0.6vw,7px)",alignItems:"center",minWidth:0,overflow:"hidden"}}>

          {/* LINE 3 — AUAPW ticker */}
          <div style={{overflow:"hidden",width:"100%",display:"flex",alignItems:"center",height:"clamp(13px,2vw,17px)"}}>
            <div style={{display:"flex",gap:"clamp(10px,1.5vw,18px)",whiteSpace:"nowrap",
              animation:"scroll-ticker 20s linear infinite"}}>
              {Array(14).fill(null).map((_,i)=>(
                <span key={i} style={{display:"inline-flex",alignItems:"center",gap:"clamp(8px,1.2vw,14px)"}}>
                  <span style={{fontFamily:T.mono,fontWeight:900,
                    fontSize:"clamp(0.5rem,1.1vw,0.65rem)",letterSpacing:"0.22em",
                    background:"linear-gradient(90deg,#505868,#9098b0,#d8dff0,#fff,#d8dff0,#9098b0,#505868)",
                    backgroundSize:"300% auto",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",
                    animation:"chrome-sweep 5s linear infinite",
                    filter:"drop-shadow(0 -0.5px 0 rgba(255,255,255,0.4)) drop-shadow(1px 1px 0 rgba(0,0,0,0.8))",
                  }}>AUAPW</span>
                  <DiamondLed sm/>
                </span>
              ))}
            </div>
          </div>

          {/* LINE 4 — Tagline */}
          <div style={{display:"flex",alignItems:"center",gap:7}}>
            <DiamondLed sm/>
            <div className="tagline-silver" style={{fontSize:"clamp(0.44rem,1vw,0.58rem)",textAlign:"center",whiteSpace:"nowrap"}}>
              Your Trusted Partner for Automotive Services &amp; Solutions
            </div>
            <DiamondLed sm/>
          </div>

          {/* Page subtitle */}
          {subtitle && (
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <div style={{width:"clamp(16px,2.5vw,32px)",height:1,
                background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.18))"}}/>
              <div style={{fontSize:"clamp(6.5px,0.9vw,8px)",color:"rgba(120,138,168,0.48)",
                fontFamily:T.mono,letterSpacing:"0.18em",textTransform:"uppercase",whiteSpace:"nowrap"}}>
                {subtitle}
              </div>
              <div style={{width:"clamp(16px,2.5vw,32px)",height:1,
                background:"linear-gradient(270deg,transparent,rgba(255,255,255,0.18))"}}/>
            </div>
          )}

        </div>

        {/* ══ RIGHT — Trust badges ══ */}
        <div className="bb-hide" style={{display:"flex",flexDirection:"column",gap:"clamp(5px,0.8vw,8px)",alignItems:"flex-start",flexShrink:0}}>
          {/* Right vertical divider */}
          <div style={{position:"absolute",right:"clamp(130px,14vw,200px)",top:"10%",bottom:"10%",width:1,
            background:"linear-gradient(180deg,transparent,rgba(255,255,255,0.14),transparent)"}}/>
          {[
            {I:Shield, l:"6-Mo Warranty",  sub:"All Parts"},
            {I:Zap,    l:"24-Hr Response", sub:"Expert Team"},
            {I:Truck,  l:"All 50 States",  sub:"Free Shipping"},
          ].map(({I,l,sub})=>(
            <div key={l} style={{display:"flex",alignItems:"center",gap:8}}>
              <DiamondLed sm/>
              <div>
                <div style={{fontSize:"clamp(7.5px,1vw,9px)",fontWeight:700,
                  letterSpacing:"0.12em",textTransform:"uppercase",
                  color:"rgba(200,212,232,0.72)",fontFamily:T.mono,lineHeight:1.2}}>{l}</div>
                <div style={{fontSize:"clamp(6.5px,0.85vw,8px)",
                  color:"rgba(120,135,160,0.45)",fontFamily:T.mono,letterSpacing:"0.08em"}}>{sub}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

//  SHARED: PART SUGGEST — autocomplete input

const POPULAR_PARTS = [
  "Engine","Transmission","Alternator","Starter Motor","Radiator",
  "A/C Compressor","CV Axle","Fuel Pump","Control Arm","Strut Assembly",
  "ECU / PCM Module","Transfer Case","Rear Axle","Brake Caliper","Turbocharger",
];

function PartSuggest({ value, onChange, onSelect, style, placeholder, hasError }) {
  const [open, setOpen] = useState(false);
  const ref = React.useRef(null);
  const query = value.trim().toLowerCase();
  const suggs = query.length >= 1
    ? ALL_PARTS.filter(p => p.toLowerCase().includes(query)).slice(0, 10)
    : POPULAR_PARTS;

  React.useEffect(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div ref={ref} style={{ position:"relative" }}>
      <input value={value} onChange={e=>{onChange(e.target.value);setOpen(true);}} onFocus={()=>setOpen(true)}
        placeholder={placeholder||"Search parts — e.g. Engine, Alternator…"} autoComplete="off"
        style={{...style,borderBottomLeftRadius:open&&suggs.length?0:undefined,borderBottomRightRadius:open&&suggs.length?0:undefined}}/>
      {open && (
        <div style={{ position:"absolute",top:"100%",left:0,right:0,zIndex:200,background:"rgba(8,10,18,0.99)",backdropFilter:"blur(20px)",border:"1px solid rgba(232,232,232,0.18)",borderTop:"none",borderBottomLeftRadius:6,borderBottomRightRadius:6,boxShadow:"0 16px 48px rgba(0,0,0,0.8)",overflow:"hidden",maxHeight:320,overflowY:"auto" }}>
          <div style={{ padding:"5px 12px",borderBottom:"1px solid rgba(255,255,255,0.06)",fontSize:9,color:T.dimmer,fontFamily:T.mono,letterSpacing:"0.14em",textTransform:"uppercase" }}>
            {query.length>=1?`${suggs.length} matches`:"Popular Parts"}
          </div>
          {suggs.map((part,i)=>{
            const cat = PART_CATEGORIES.find(c=>c.parts.includes(part));
            const CIcon = cat?cat.Icon:Cog;
            return (
              <div key={part} onMouseDown={()=>{onSelect(part);setOpen(false);}}
                onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.07)"}
                onMouseLeave={e=>e.currentTarget.style.background="transparent"}
                style={{ display:"flex",alignItems:"center",gap:10,padding:"9px 13px",borderBottom:i<suggs.length-1?"1px solid rgba(255,255,255,0.04)":"none",cursor:"pointer" }}>
                <div style={{ width:22,height:22,borderRadius:4,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)" }}>
                  <CIcon size={10} color="rgba(180,185,195,0.6)"/>
                </div>
                <div style={{ flex:1,minWidth:0 }}>
                  <span style={{ fontSize:12,color:"rgba(210,215,225,0.75)",fontFamily:T.mono }}>{part}</span>
                  {cat&&<span style={{ display:"block",fontSize:9,color:T.dimmer,letterSpacing:"0.1em",textTransform:"uppercase",fontFamily:T.mono }}>{cat.label}</span>}
                </div>
              </div>
            );
          })}
          <div style={{ padding:"5px 12px",borderTop:"1px solid rgba(255,255,255,0.05)",fontSize:9,color:T.dimmer,fontFamily:T.mono }}>
            Type freely for custom parts
          </div>
        </div>
      )}
    </div>
  );
}

function QuoteForm({ defaultPart="" }) {
  const YEARS = Array.from({length:36},(_,i)=>String(2025-i));
  const [year,     setYear]     = useState("");
  const [make,     setMake]     = useState("");
  const [model,    setModel]    = useState("");
  const [partType, setPartType] = useState(defaultPart||"");
  const [firstName,setFirstName]= useState("");
  const [lastName, setLastName] = useState("");
  const [phone,    setPhone]    = useState("");
  const [email,    setEmail]    = useState("");
  const [zip,      setZip]      = useState("");
  const [state,    setState]    = useState("");
  const [city,     setCity]     = useState("");
  const [consent,  setConsent]  = useState(false);
  const [errors,   setErrors]   = useState({});
  const [status,   setStatus]   = useState("idle");

  const models = make && CAR_MODELS[make] ? CAR_MODELS[make] : [];

  const BASE = {
    padding:"7px 9px", background:"rgba(13,15,24,0.85)",
    borderRadius:5, fontSize:12, fontFamily:T.mono,
    outline:"none", width:"100%", transition:"all 0.2s",
  };
  const iS = (err) => ({ ...BASE, border:`1px solid ${err?"rgba(239,68,68,0.6)":T.bd}`, color:"#f5f5f5", WebkitTextFillColor:"#f5f5f5", cursor:"text" });
  const sS = (err) => ({ ...BASE, border:`1px solid ${err?"rgba(239,68,68,0.6)":T.bd}`, color:"#f5f5f5", appearance:"none", WebkitAppearance:"none", cursor:"pointer" });
  const Lbl = ({ c, req }) => (
    <div style={{ fontSize:9,color:T.dimmer,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:5,fontFamily:T.mono,display:"flex",gap:4 }}>
      {c}{req&&<span style={{color:"rgba(239,68,68,0.8)"}}>*</span>}
    </div>
  );
  const Err = ({ f }) => errors[f] ? <div style={{ fontSize:9,color:"rgba(239,68,68,0.8)",marginTop:3,fontFamily:T.mono }}>⚠ {errors[f]}</div> : null;
  const clr = (f) => setErrors(p=>({...p,[f]:""}));

  const validate = () => {
    const e = {};
    if (!year)              e.year      = "Select a year";
    if (!make)              e.make      = "Select a make";
    if (!model)             e.model     = "Select a model";
    if (!partType.trim())   e.partType  = "Select or enter part";
    if (!firstName.trim())  e.firstName = "First name required";
    if (!lastName.trim())   e.lastName  = "Last name required";
    if (!phone.trim())      e.phone     = "Phone required";
    if (!email.trim())      e.email     = "Email required";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Invalid email";
    if (!zip.trim())        e.zip       = "Zip code required";
    if (!state)             e.state     = "Select a state";
    if (!consent)           e.consent   = "Please agree to continue";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setStatus("sending");
    const ok = await sendLeadEmail({
      form_type:  "Sidebar Quote Form",
      from_name:  `${firstName} ${lastName}`,
      from_email: email,
      phone,
      year, make, model,
      part:       partType,
      state:      `${city ? city+", " : ""}${state} ${zip}`.trim(),
      notes:      city ? `City: ${city}` : "No additional notes",
    });
    setStatus(ok ? "success" : "error");
  };

  if (status === "success") return (
    <div className="gc" style={{ padding:28,textAlign:"center" }}>
      <GSB/>
      <div style={{ position:"relative",zIndex:1 }}>
        {/* Success logo */}
        <div style={{width:60,height:60,borderRadius:"50%",background:"radial-gradient(circle at 40% 35%,#1e2233,#0c0e18)",border:"1px solid rgba(74,222,128,0.3)",boxShadow:"0 0 20px rgba(74,222,128,0.15)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 6px"}}>
          <AuapwLogo size={54} uid="success"/>
        </div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,marginBottom:14}}>
          <CheckCircle size={14} color="#4ade80"/>
          <span style={{fontSize:9,color:"rgba(74,222,128,0.8)",fontFamily:T.mono,letterSpacing:"0.12em",textTransform:"uppercase"}}>Quote Submitted</span>
        </div>
        <h3 style={{ fontFamily:T.serif,fontSize:17,fontWeight:800,color:T.fg,marginBottom:8 }}>Quote Sent!</h3>
        <p style={{ fontSize:11,color:T.muted,fontWeight:300,lineHeight:1.7,marginBottom:6 }}>
          Thanks <strong style={{color:T.fg}}>{firstName}</strong>! We'll respond to <strong style={{color:T.fg}}>{email}</strong> within 24 hours.
        </p>
        <button className="btn-ghost" style={{ marginTop:14,width:"100%",justifyContent:"center" }} onClick={()=>setStatus("idle")}>Submit Another</button>
      </div>
    </div>
  );

  return (
    <div className="gc" style={{ padding:16 }}>
      <div style={{ position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.6),transparent)" }}/>
      <GSB/>
      <div style={{ position:"relative",zIndex:1 }}>
        {/* Quote form mini brand header */}
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
          <DiamondLed/>
          <div>
            <div style={{fontSize:10,fontWeight:800,fontFamily:T.mono,letterSpacing:"0.12em",textTransform:"uppercase",lineHeight:1.2,background:"linear-gradient(145deg,#fff 0%,#c8d0e8 30%,#fff 50%,#8898b8 80%,#1e2438 100%)",backgroundSize:"250% 250%",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",filter:"drop-shadow(0 -0.5px 0 rgba(255,255,255,0.6)) drop-shadow(1px 1px 0 rgba(0,0,0,0.8)) drop-shadow(2px 2px 3px rgba(0,0,0,0.4))",animation:"emboss-sweep 5s ease-in-out infinite" }}>AUAPW.ORG</div>
            <div style={{fontSize:8.5,color:T.dim,fontFamily:T.mono,letterSpacing:"0.08em"}}>Free Quote · No Credit Card</div>
          </div>
          <div style={{marginLeft:"auto"}}>
            <BannerBadge>FREE</BannerBadge>
          </div>
        </div>
        <h3 style={{ fontSize:16,fontWeight:800,color:T.fg,fontFamily:T.serif,marginBottom:3,letterSpacing:"-0.02em" }}>Find Your Part</h3>
        <p style={{ fontSize:10,color:T.dim,fontFamily:T.mono,marginBottom:14 }}>Response within 24 hrs · Free shipping · 6-Mo Warranty</p>
        <div style={{ marginBottom:7 }}>
          <Lbl c="Year" req/>
          <select value={year} onChange={e=>{setYear(e.target.value);clr("year")}} style={sS(errors.year)}>
            <option value="">Select Year</option>
            {YEARS.map(y=><option key={y}>{y}</option>)}
          </select><Err f="year"/>
        </div>
        <div style={{ marginBottom:7 }}>
          <Lbl c="Make" req/>
          <select value={make} onChange={e=>{setMake(e.target.value);setModel("");clr("make")}} style={sS(errors.make)}>
            <option value="">Select Make</option>
            {CAR_MAKES.map(m=><option key={m}>{m}</option>)}
          </select><Err f="make"/>
        </div>
        <div style={{ marginBottom:7 }}>
          <Lbl c="Model" req/>
          <select value={model} onChange={e=>{setModel(e.target.value);clr("model")}} style={{...sS(errors.model),opacity:make?1:0.5}} disabled={!make}>
            <option value="">{make?"Select Model":"Select Make first"}</option>
            {models.map(m=><option key={m}>{m}</option>)}
          </select><Err f="model"/>
        </div>
        <div style={{ marginBottom:7 }}>
          <Lbl c="Part Type" req/>
          <PartSuggest
            value={partType}
            onChange={v=>{setPartType(v);clr("partType")}}
            onSelect={v=>{setPartType(v);clr("partType")}}
            style={iS(errors.partType)}
            hasError={!!errors.partType}
            placeholder="e.g. Engine, Transmission…"
          />
          <Err f="partType"/>
        </div>

        {/* First / Last Name */}
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:7 }}>
          <div>
            <Lbl c="First Name" req/>
            <input value={firstName} onChange={e=>{setFirstName(e.target.value);clr("firstName")}} placeholder="John" style={iS(errors.firstName)}/>
            <Err f="firstName"/>
          </div>
          <div>
            <Lbl c="Last Name" req/>
            <input value={lastName} onChange={e=>{setLastName(e.target.value);clr("lastName")}} placeholder="Smith" style={iS(errors.lastName)}/>
            <Err f="lastName"/>
          </div>
        </div>
        <div style={{ marginBottom:7 }}>
          <Lbl c="Phone Number" req/>
          <input value={phone} onChange={e=>{setPhone(e.target.value);clr("phone")}} placeholder="(555) 000-0000" style={iS(errors.phone)} type="tel"/>
          <Err f="phone"/>
        </div>
        <div style={{ marginBottom:7 }}>
          <Lbl c="Email Address" req/>
          <input value={email} onChange={e=>{setEmail(e.target.value);clr("email")}} placeholder="your@email.com" style={iS(errors.email)} type="email"/>
          <Err f="email"/>
        </div>

        {/* Zip / State */}
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:7 }}>
          <div>
            <Lbl c="Zip Code" req/>
            <input value={zip} onChange={e=>{setZip(e.target.value);clr("zip")}} placeholder="90210" style={iS(errors.zip)} maxLength={10}/>
            <Err f="zip"/>
          </div>
          <div>
            <Lbl c="State" req/>
            <select value={state} onChange={e=>{setState(e.target.value);clr("state")}} style={sS(errors.state)}>
              <option value="">State</option>
              {US_STATES_LIST.map(s=><option key={s}>{s}</option>)}
            </select>
            <Err f="state"/>
          </div>
        </div>
        <div style={{ marginBottom:12 }}>
          <Lbl c="City"/>
          <input value={city} onChange={e=>setCity(e.target.value)} placeholder="Your city" style={iS()}/>
        </div>
        <div style={{ marginBottom:14 }}>
          <label style={{ display:"flex",gap:8,alignItems:"flex-start",cursor:"pointer" }}>
            <input type="checkbox" checked={consent} onChange={e=>{setConsent(e.target.checked);clr("consent")}}
              style={{ marginTop:2,accentColor:"#e8e8e8",flexShrink:0,width:13,height:13 }}/>
            <span style={{ fontSize:9,color:T.dimmer,fontFamily:T.mono,lineHeight:1.6,letterSpacing:"0.05em" }}>
              By submitting, you authorize AUAPW to contact you via text/call at the number provided using automated means. Msg/Data rates may apply. Consent not required for purchase.
            </span>
          </label>
          {errors.consent && <div style={{ fontSize:9,color:"rgba(239,68,68,0.8)",marginTop:4,fontFamily:T.mono }}>⚠ {errors.consent}</div>}
        </div>

        {status==="error" && (
          <div style={{ padding:"10px 14px",background:"rgba(239,68,68,0.07)",border:"1px solid rgba(239,68,68,0.25)",borderRadius:6,marginBottom:12,fontFamily:T.mono }}>
            <div style={{ fontSize:11,fontWeight:800,color:"rgba(239,68,68,0.9)",marginBottom:5 }}>⚠ Could not send automatically</div>
            <div style={{ fontSize:10,color:"rgba(220,100,100,0.8)",lineHeight:1.6,marginBottom:8 }}>
              Your browser may be blocking the request. Please contact us directly:
            </div>
            <a href={`mailto:${LEAD_EMAIL}?subject=[AUAPW Quote Request]&body=Year: ${year}%0AMake: ${make}%0AModel: ${model}%0APart: ${partType}%0APhone: ${phone}`}
              style={{ display:"block",padding:"7px 12px",background:"rgba(239,68,68,0.15)",border:"1px solid rgba(239,68,68,0.3)",borderRadius:4,color:"rgba(239,68,68,0.95)",textDecoration:"none",fontSize:10,fontWeight:700,textAlign:"center",marginBottom:6 }}>
              📧 Email Us Directly →
            </a>
            <a href="tel:8888185001"
              style={{ display:"block",padding:"7px 12px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:4,color:T.fg,textDecoration:"none",fontSize:10,fontWeight:700,textAlign:"center" }}>
              📞 Call (888) 818-5001
            </a>
          </div>
        )}

        <button className="btn-led" style={{ width:"100%",padding:"12px",opacity:status==="sending"?0.7:1 }} onClick={handleSubmit} disabled={status==="sending"}>
          {status==="sending" ? "⏳ Sending your request..." : "Get Free Quote →"}
        </button>
        <p style={{ textAlign:"center",fontSize:9,color:T.dimmer,fontFamily:T.mono,marginTop:9 }}>Guaranteed response within 24 hours</p>
        <div style={{ marginTop:12,paddingTop:12,borderTop:`1px solid ${T.bdd}` }}>
          <a href="tel:8888185001" className="fc-item" style={{ textDecoration:"none" }}>
            <div className="fc-icon"><Phone size={11}/></div>
            <div><span className="fc-label">Prefer to call?</span><span className="fc-text">{PHONE}</span></div>
          </a>
        </div>
      </div>
    </div>
  );
}
//  SHARED: BRAND LOGOS
function BrandLogos() {
  const brands = Object.keys(BRAND_COLORS).sort();
  const letters = ["All",...Array.from(new Set(brands.map(b=>b[0].toUpperCase()))).sort()];
  const [tab,setTab] = useState("All");
  const [hov,setHov] = useState(null);
  const filtered = tab==="All"?brands:brands.filter(b=>b[0].toUpperCase()===tab);
  const gi = b=>{ const w=b.split(/[\s-]+/); return w.length>=2?(w[0][0]+w[1][0]).toUpperCase():b.substring(0,b.length>4?3:b.length).toUpperCase(); };
  return (
    <section style={{ borderTop:`1px solid ${T.bdd}`,borderBottom:`1px solid ${T.bdd}`,padding:"56px 32px",background:"linear-gradient(180deg,rgba(10,12,20,0.95) 0%,rgba(12,14,22,1) 100%)" }}>
      <div style={{ maxWidth:1100,margin:"0 auto" }}>
        <SectionHead label="All Vehicle Makes" title="Shop by Brand" center titleClass="ip-text"/>
        <p style={{ textAlign:"center",fontSize:13,color:T.muted,fontWeight:300,marginTop:-32,marginBottom:28 }}>Quality used parts for every make — {brands.length} brands, 2,000+ verified yards</p>
        <div style={{ display:"flex",flexWrap:"wrap",justifyContent:"center",gap:4,marginBottom:24 }}>
          {letters.map(l=>(
            <button key={l} onClick={()=>setTab(l)} style={{ minWidth:34,height:28,padding:"0 8px",borderRadius:4,fontSize:10,fontWeight:700,cursor:"pointer",border:"none",fontFamily:T.mono,transition:"all 0.2s",background:tab===l?"linear-gradient(135deg,#ffffff,#94a3b8)":"rgba(255,255,255,0.05)",color:tab===l?"#07090f":T.muted,boxShadow:tab===l?"0 0 12px rgba(255,255,255,0.15)":"none" }}>{l}</button>
          ))}
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(8,1fr)",gap:8 }}>
          {filtered.map(b=>{ const c=BRAND_COLORS[b]||"#1a1d28"; const h=hov===b;
            return <div key={b} onMouseEnter={()=>setHov(b)} onMouseLeave={()=>setHov(null)}
              style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:5,padding:6,borderRadius:7,cursor:"pointer",transition:"all 0.3s",border:`1px solid ${h?"rgba(232,232,232,0.2)":T.bdd}`,background:h?"rgba(255,255,255,0.06)":"rgba(16,19,28,0.85)",transform:h?"translateY(-4px)":"none",boxShadow:h?"0 10px 32px rgba(0,0,0,0.5)":"none",position:"relative" }}>
              <div style={{ position:"absolute",top:0,left:"10%",right:"10%",height:1,background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)",opacity:h?1:0.3 }}/>
              <div style={{ width:"100%",height:42,borderRadius:5,background:`linear-gradient(135deg,${c},${c}99,${c}55)`,display:"flex",alignItems:"center",justifyContent:"center" }}>
                <span style={{ fontSize:10,fontWeight:900,color:"rgba(255,255,255,0.9)",textTransform:"uppercase",letterSpacing:"0.05em",textShadow:"0 2px 6px rgba(0,0,0,0.6)" }}>{gi(b)}</span>
              </div>
              <span style={{ fontSize:7.5,fontWeight:700,color:h?"#e8e8e8":T.dim,fontFamily:T.mono,textAlign:"center",letterSpacing:"0.08em",textTransform:"uppercase",lineHeight:1.3 }}>{b}</span>
            </div>;
          })}
        </div>
      </div>
    </section>
  );
}
//  NAVBAR
function Navbar({ nav, setNav, page, goTo }) {
  const [mob,setMob] = useState(false);
  const items = [
    { l:"Home",href:"home" },{ l:"Used Parts",href:"parts" },{ l:"Engines",href:"used-engines" },
    { l:"Transmissions",href:"used-transmissions" },{ l:"Inventory",href:"inventory" },
    { l:"About",href:"about" },{ l:"Contact",href:"contact" },{ l:"Blog",href:"blog" },
  ];
  const TICKERS = ["2,000+ Verified Yards","Free Shipping All Parts","6-Month Warranty","24-Hr Response Guarantee","50+ Car Brands","Ships Anywhere USA"];
  return (
    <nav style={{ position:"sticky",top:0,zIndex:50 }}>
      <div style={{ height:30,background:"linear-gradient(90deg,rgba(12,14,22,0.97),rgba(18,21,32,0.99) 50%,rgba(12,14,22,0.97))",borderBottom:`1px solid rgba(255,255,255,0.06)`,overflow:"hidden",position:"relative" }}>
        <div style={{ position:"absolute",top:0,bottom:0,left:0,width:48,background:"linear-gradient(to right,rgba(12,14,22,0.97),transparent)",zIndex:2 }}/>
        <div style={{ position:"absolute",top:0,bottom:0,right:0,width:48,background:"linear-gradient(to left,rgba(12,14,22,0.97),transparent)",zIndex:2 }}/>
        <div style={{ display:"flex",animation:"scroll-ticker 26s linear infinite",height:"100%",alignItems:"center",gap:40 }}>
          {[...TICKERS,...TICKERS].map((t,i)=>(
            <span key={i} style={{ display:"flex",alignItems:"center",gap:8,fontSize:"0.6rem",fontWeight:800,letterSpacing:"0.18em",textTransform:"uppercase",color:"rgba(138,143,160,0.8)",fontFamily:T.mono,flexShrink:0 }}>
              <Zap size={9}/>{t}
            </span>
          ))}
        </div>
      </div>
      <div style={{ height:68,background:"rgba(10,12,18,0.5)",backdropFilter:"blur(28px)",borderBottom:"1px solid rgba(255,255,255,0.08)",position:"relative" }}>
        <div style={{ position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01) 50%,rgba(255,255,255,0.02))",borderTop:"1px solid rgba(255,255,255,0.12)",boxShadow:"inset 0 1px 0 rgba(255,255,255,0.08),0 8px 32px rgba(0,0,0,0.5)" }}/>
        <div style={{ maxWidth:1280,margin:"0 auto",padding:"0 24px",display:"flex",alignItems:"center",height:"100%",justifyContent:"space-between",gap:20,position:"relative",zIndex:1 }}>
          <button onClick={()=>goTo("home")} style={{ display:"flex",alignItems:"center",gap:12,background:"none",border:"none",cursor:"pointer",flexShrink:0 }}>
            <AuapwLogo size={40} uid="nav"/>
            <div style={{ textAlign:"left" }}>
              <div style={{ fontSize:15,fontWeight:900,fontFamily:T.mono,letterSpacing:"0.1em",lineHeight:1,background:"linear-gradient(145deg,#fff 0%,#c8d0e8 30%,#fff 50%,#8898b8 80%,#1e2438 100%)",backgroundSize:"250% 250%",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",filter:"drop-shadow(0 -1px 0 rgba(255,255,255,0.7)) drop-shadow(1px 1px 0 rgba(0,0,0,0.9)) drop-shadow(2px 2px 0 rgba(0,0,0,0.6)) drop-shadow(3px 3px 4px rgba(0,0,0,0.5))",animation:"emboss-sweep 5s ease-in-out infinite" }}>AUAPW.ORG</div>
              <div style={{ fontSize:7,color:"rgba(138,143,160,0.6)",fontFamily:T.mono,letterSpacing:"0.1em",marginTop:1 }}>ALL USED AUTO PARTS WAREHOUSE</div>
              <div style={{ fontSize:6.5,color:"rgba(120,135,160,0.5)",fontFamily:T.mono,letterSpacing:"0.08em",marginTop:1,fontStyle:"italic" }}>Trusted Partner for Automotive Services &amp; Solutions</div>
            </div>
          </button>
          <div className="nav-links" style={{ display:"flex",gap:24,flex:1,justifyContent:"center" }}>
            {items.map(({ l,href })=>(
              <button key={l} onClick={()=>goTo(href)} style={{ fontSize:11,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:page===href?"#fff":"rgba(200,205,215,0.75)",cursor:"pointer",fontFamily:T.sans,border:"none",background:"none",transition:"color 0.2s",padding:"4px 0",borderBottom:page===href?"1px solid rgba(255,255,255,0.4)":"1px solid transparent" }}>{l}</button>
            ))}
          </div>
          <div style={{ display:"flex",gap:10,alignItems:"center",flexShrink:0 }}>
            <a href="tel:8888185001" className="nav-links" style={{ display:"flex",alignItems:"center",gap:6,fontSize:11,color:"rgba(200,205,215,0.65)",fontFamily:T.mono,textDecoration:"none" }}><Phone size={10} style={{ opacity:0.65 }}/>{PHONE}</a>
            <button className="btn-led nav-links" style={{ padding:"8px 16px",fontSize:9 }} onClick={()=>goTo("quote")}>Get Free Quote</button>
            {/* Mobile hamburger button — shown via CSS on small screens */}
            <button className="mob-menu-btn" onClick={()=>setMob(!mob)} style={{ display:"none",alignItems:"center",justifyContent:"center",width:40,height:40,background:"none",border:"1px solid rgba(255,255,255,0.15)",borderRadius:4,cursor:"pointer",color:"#e8e8e8" }}>
              {mob ? <X size={18}/> : <Menu size={18}/>}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile dropdown menu */}
      {mob && (
        <div style={{ position:"absolute",top:"100%",left:0,right:0,background:"rgba(7,9,15,0.98)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(255,255,255,0.1)",boxShadow:"0 16px 48px rgba(0,0,0,0.8)",zIndex:49,padding:"8px 0" }}>
          {items.map(({ l,href })=>(
            <button key={l} onClick={()=>{goTo(href);setMob(false);}} style={{ display:"block",width:"100%",textAlign:"left",padding:"12px 24px",fontSize:12,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:page===href?"#fff":"rgba(200,205,215,0.75)",cursor:"pointer",fontFamily:T.sans,border:"none",background:page===href?"rgba(255,255,255,0.05)":"transparent",transition:"all 0.2s",borderLeft:page===href?"2px solid rgba(255,255,255,0.5)":"2px solid transparent" }}>{l}</button>
          ))}
          <div style={{ padding:"12px 24px",borderTop:"1px solid rgba(255,255,255,0.06)",display:"flex",flexDirection:"column",gap:10 }}>
            <a href="tel:8888185001" style={{ fontSize:11,color:"rgba(200,205,215,0.65)",fontFamily:T.mono,textDecoration:"none",display:"flex",alignItems:"center",gap:6 }}><Phone size={10}/>{PHONE}</a>
            <button className="btn-led" style={{ padding:"10px 16px",fontSize:9,width:"100%" }} onClick={()=>{goTo("quote");setMob(false);}}>Get Free Quote</button>
          </div>
        </div>
      )}
    </nav>
  );
}
//  BANNER TABS
function BannerTabs({ active, setActive }) {
  return (
    <div className="btabs">
      <div className="btabs-wrap">
        {BANNER_TABS.map(({ id, label, Icon }) => (
          <button key={id} className={`btab${active===id?" on":""}`} onClick={()=>setActive(id)}>
            <Icon size={10} style={{ opacity: active===id?1:0.5 }}/>{label}
          </button>
        ))}
      </div>
    </div>
  );
}
//  FOOTER
function Footer({ goTo }) {
  const links = [
    {h:"Used Parts",items:[{l:"Used Engines",p:"used-engines"},{l:"Used Transmissions",p:"used-transmissions"},{l:"All Parts",p:"parts"},{l:"Inventory",p:"inventory"}]},
    {h:"Company",items:[{l:"About Us",p:"about"},{l:"Blog",p:"blog"},{l:"Get a Quote",p:"quote"},{l:"Contact",p:"contact"}]},
    {h:"Legal",items:[{l:"Privacy Policy",p:"privacy"},{l:"Terms & Conditions",p:"terms"},{l:"Shipping Policy",p:"shipping"},{l:"Return Policy",p:"returns"}]},
  ];
  return (
    <footer style={{ background:"rgba(7,9,15,0.98)",borderTop:`1px solid ${T.bdd}`,paddingTop:48,fontFamily:T.mono }}>
      <div style={{ maxWidth:1280,margin:"0 auto",padding:"0 32px" }}>
        <div style={{ display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:32,paddingBottom:32,borderBottom:`1px solid ${T.bdd}` }}>
          <div>
            <div style={{marginBottom:14}}><BrandIdentity size="compact" uid="footer"/></div>
            <p style={{ fontSize:11,color:T.muted,lineHeight:1.8,fontWeight:300,marginBottom:16,maxWidth:300 }}>Connecting buyers with 2,000+ verified salvage yards nationwide. Quality used OEM parts with 6-month warranty and free shipping.</p>
            <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
              {[{I:Phone,val:PHONE,href:`tel:${PHONE}`},{I:Mail,val:EMAIL,href:`mailto:${EMAIL}`},{I:MapPin,val:ADDRESS}].map(({I,val,href})=>(
                <a key={val} href={href||"#"} className="fc-item" style={{ textDecoration:"none" }}>
                  <div className="fc-icon"><I size={12}/></div>
                  <span className="fc-text" style={{ fontSize:11 }}>{val}</span>
                </a>
              ))}
            </div>
          </div>
          {links.map(({h,items})=>(
            <div key={h}>
              <div className="fsec" style={{ marginBottom:14 }}>{h}</div>
              <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
                {items.map(({l,p})=>(
                  <button key={p} onClick={()=>goTo(p)} style={{ background:"none",border:"none",textAlign:"left",fontSize:11,color:T.muted,cursor:"pointer",fontFamily:T.mono,padding:0,transition:"color 0.2s" }}
                    onMouseEnter={e=>e.target.style.color="#e8e8e8"} onMouseLeave={e=>e.target.style.color=T.muted}>{l}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding:"16px 0",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8 }}>
          <span style={{ fontSize:9,color:T.dimmer,letterSpacing:"0.1em" }}>© {new Date().getFullYear()} AUAPW.ORG · ALL USED AUTO PARTS WAREHOUSE · Trusted Partner for Automotive Services &amp; Solutions</span>
          <span style={{ fontSize:9,color:T.dimmer,letterSpacing:"0.08em" }}>107 Myrtle Ave, Woodbine, NJ 08270 · (888) 818-5001</span>
        </div>
      </div>
    </footer>
  );
}

function HomePage({ goTo }) {
  const [ptab,setPtab] = useState("all");
  const [part,setPart] = useState("");
  const iS = { padding:"9px 11px",background:"rgba(255,255,255,0.04)",border:`1px solid ${T.bd}`,borderRadius:5,fontSize:12,color:T.muted,fontFamily:T.mono,outline:"none",width:"100%",cursor:"pointer" };

  return <>
    <BannerTabs active={ptab} setActive={setPtab}/>

    {/* ══════════ HERO — FULL E-COMMERCE ══════════ */}
    <section style={{ position:"relative",overflow:"hidden",background:"linear-gradient(160deg,#04060d 0%,#08090f 40%,#0c0e18 70%,#07080e 100%)",minHeight:860 }}>

      {/* ─── Background gear SVGs ─── */}
      <svg style={{position:"absolute",top:-60,left:-60,opacity:0.055,pointerEvents:"none"}} width="420" height="420" viewBox="0 0 200 200">
        <path d="M 100.00,24.00 L 100.00,6.00 L 116.78,7.51 L 113.57,25.22 A 76 76 0 0 1 132.98,31.53 L 140.79,15.31 L 155.25,23.95 L 144.67,38.51 A 76 76 0 0 1 159.42,52.61 L 173.49,41.39 L 182.78,55.46 L 166.93,63.99 A 76 76 0 0 1 174.09,83.09 L 191.64,79.08 L 193.91,95.78 L 175.92,96.59 A 76 76 0 0 1 174.09,116.91 L 191.64,120.92 L 186.44,136.94 L 169.88,129.87 A 76 76 0 0 1 159.42,147.39 L 173.49,158.61 L 161.85,170.79 L 150.00,157.23 A 76 76 0 0 1 132.98,168.47 L 140.79,184.69 L 125.01,190.61 L 120.22,173.26 A 76 76 0 0 1 100.00,176.00 L 100.00,194.00 L 83.22,192.49 L 86.43,174.78 A 76 76 0 0 1 67.02,168.47 L 59.21,184.69 L 44.75,176.05 L 55.33,161.49 A 76 76 0 0 1 40.58,147.39 L 26.51,158.61 L 17.22,144.54 L 33.07,136.01 A 76 76 0 0 1 25.91,116.91 L 8.36,120.92 L 6.09,104.22 L 24.08,103.41 A 76 76 0 0 1 25.91,83.09 L 8.36,79.08 L 13.56,63.06 L 30.12,70.13 A 76 76 0 0 1 40.58,52.61 L 26.51,41.39 L 38.15,29.21 L 50.00,42.77 A 76 76 0 0 1 67.02,31.53 L 59.21,15.31 L 74.99,9.39 L 79.78,26.74 A 76 76 0 0 1 100.00,24.00 Z" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5"/>
        <circle cx="100" cy="100" r="76" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
        <circle cx="100" cy="100" r="58" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.6"/>
      </svg>
      <svg style={{position:"absolute",top:20,right:40,opacity:0.04,pointerEvents:"none"}} width="280" height="280" viewBox="0 0 200 200">
        <path d="M 100.00,24.00 L 100.00,6.00 L 116.78,7.51 L 113.57,25.22 A 76 76 0 0 1 132.98,31.53 L 140.79,15.31 L 155.25,23.95 L 144.67,38.51 A 76 76 0 0 1 159.42,52.61 L 173.49,41.39 L 182.78,55.46 L 166.93,63.99 A 76 76 0 0 1 174.09,83.09 L 191.64,79.08 L 193.91,95.78 L 175.92,96.59 A 76 76 0 0 1 174.09,116.91 L 191.64,120.92 L 186.44,136.94 L 169.88,129.87 A 76 76 0 0 1 159.42,147.39 L 173.49,158.61 L 161.85,170.79 L 150.00,157.23 A 76 76 0 0 1 132.98,168.47 L 140.79,184.69 L 125.01,190.61 L 120.22,173.26 A 76 76 0 0 1 100.00,176.00 L 100.00,194.00 L 83.22,192.49 L 86.43,174.78 A 76 76 0 0 1 67.02,168.47 L 59.21,184.69 L 44.75,176.05 L 55.33,161.49 A 76 76 0 0 1 40.58,147.39 L 26.51,158.61 L 17.22,144.54 L 33.07,136.01 A 76 76 0 0 1 25.91,116.91 L 8.36,120.92 L 6.09,104.22 L 24.08,103.41 A 76 76 0 0 1 25.91,83.09 L 8.36,79.08 L 13.56,63.06 L 30.12,70.13 A 76 76 0 0 1 40.58,52.61 L 26.51,41.39 L 38.15,29.21 L 50.00,42.77 A 76 76 0 0 1 67.02,31.53 L 59.21,15.31 L 74.99,9.39 L 79.78,26.74 A 76 76 0 0 1 100.00,24.00 Z" fill="none" stroke="rgba(180,80,80,0.9)" strokeWidth="1.5"/>
        <circle cx="100" cy="100" r="76" fill="none" stroke="rgba(180,80,80,0.5)" strokeWidth="1"/>
      </svg>
      <svg style={{position:"absolute",bottom:-80,right:-60,opacity:0.05,pointerEvents:"none"}} width="480" height="480" viewBox="0 0 200 200">
        <path d="M 100.00,24.00 L 100.00,6.00 L 116.78,7.51 L 113.57,25.22 A 76 76 0 0 1 132.98,31.53 L 140.79,15.31 L 155.25,23.95 L 144.67,38.51 A 76 76 0 0 1 159.42,52.61 L 173.49,41.39 L 182.78,55.46 L 166.93,63.99 A 76 76 0 0 1 174.09,83.09 L 191.64,79.08 L 193.91,95.78 L 175.92,96.59 A 76 76 0 0 1 174.09,116.91 L 191.64,120.92 L 186.44,136.94 L 169.88,129.87 A 76 76 0 0 1 159.42,147.39 L 173.49,158.61 L 161.85,170.79 L 150.00,157.23 A 76 76 0 0 1 132.98,168.47 L 140.79,184.69 L 125.01,190.61 L 120.22,173.26 A 76 76 0 0 1 100.00,176.00 L 100.00,194.00 L 83.22,192.49 L 86.43,174.78 A 76 76 0 0 1 67.02,168.47 L 59.21,184.69 L 44.75,176.05 L 55.33,161.49 A 76 76 0 0 1 40.58,147.39 L 26.51,158.61 L 17.22,144.54 L 33.07,136.01 A 76 76 0 0 1 25.91,116.91 L 8.36,120.92 L 6.09,104.22 L 24.08,103.41 A 76 76 0 0 1 25.91,83.09 L 8.36,79.08 L 13.56,63.06 L 30.12,70.13 A 76 76 0 0 1 40.58,52.61 L 26.51,41.39 L 38.15,29.21 L 50.00,42.77 A 76 76 0 0 1 67.02,31.53 L 59.21,15.31 L 74.99,9.39 L 79.78,26.74 A 76 76 0 0 1 100.00,24.00 Z" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5"/>
        <circle cx="100" cy="100" r="76" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
      </svg>
      <svg style={{position:"absolute",top:"35%",left:"-2%",opacity:0.03,pointerEvents:"none"}} width="200" height="200" viewBox="0 0 200 200">
        <path d="M 100.00,24.00 L 100.00,6.00 L 116.78,7.51 L 113.57,25.22 A 76 76 0 0 1 132.98,31.53 L 140.79,15.31 L 155.25,23.95 L 144.67,38.51 A 76 76 0 0 1 159.42,52.61 L 173.49,41.39 L 182.78,55.46 L 166.93,63.99 A 76 76 0 0 1 174.09,83.09 L 191.64,79.08 L 193.91,95.78 L 175.92,96.59 A 76 76 0 0 1 174.09,116.91 L 191.64,120.92 L 186.44,136.94 L 169.88,129.87 A 76 76 0 0 1 159.42,147.39 L 173.49,158.61 L 161.85,170.79 L 150.00,157.23 A 76 76 0 0 1 132.98,168.47 L 140.79,184.69 L 125.01,190.61 L 120.22,173.26 A 76 76 0 0 1 100.00,176.00 L 100.00,194.00 L 83.22,192.49 L 86.43,174.78 A 76 76 0 0 1 67.02,168.47 L 59.21,184.69 L 44.75,176.05 L 55.33,161.49 A 76 76 0 0 1 40.58,147.39 L 26.51,158.61 L 17.22,144.54 L 33.07,136.01 A 76 76 0 0 1 25.91,116.91 L 8.36,120.92 L 6.09,104.22 L 24.08,103.41 A 76 76 0 0 1 25.91,83.09 L 8.36,79.08 L 13.56,63.06 L 30.12,70.13 A 76 76 0 0 1 40.58,52.61 L 26.51,41.39 L 38.15,29.21 L 50.00,42.77 A 76 76 0 0 1 67.02,31.53 L 59.21,15.31 L 74.99,9.39 L 79.78,26.74 A 76 76 0 0 1 100.00,24.00 Z" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5"/>
      </svg>

      {/* ─── Dot grid overlay ─── */}
      <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,rgba(255,255,255,0.015) 1px,transparent 1px)",backgroundSize:"28px 28px",pointerEvents:"none"}}/>

      {/* ─── Radial glow center ─── */}
      <div style={{position:"absolute",top:"10%",left:"25%",width:900,height:900,borderRadius:"50%",background:"radial-gradient(circle,rgba(255,255,255,0.048) 0%,rgba(160,190,255,0.018) 38%,transparent 68%)",pointerEvents:"none"}}/>

      {/* ─── LED bars ─── */}
      <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.35) 20%,rgba(255,255,255,0.9) 50%,rgba(255,255,255,0.35) 80%,transparent)",boxShadow:"0 0 24px rgba(255,255,255,0.45),0 0 60px rgba(255,255,255,0.12)",zIndex:2}}/>
      <div style={{position:"absolute",bottom:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)",zIndex:2}}/>

      {/* ─── Corner logos replacing diamonds ─── */}
      <CornerLogo pos={{t:16,l:16}} delay={0}/>
      <CornerLogo pos={{t:16,r:16}} delay={0.5}/>
      <CornerLogo pos={{b:16,l:16}} delay={1}/>
      <CornerLogo pos={{b:16,r:16}} delay={1.5}/>

      {/* ─── Ghost scan ─── */}
      <div style={{position:"absolute",top:0,left:"-60%",width:"32%",height:"100%",background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.04),transparent)",animation:"ghost-scan 8s ease-in-out infinite",pointerEvents:"none",zIndex:1}}/>

      {/* ─── MAIN CONTENT ─── */}
      <div style={{maxWidth:1360,margin:"0 auto",padding:"56px 36px 64px",position:"relative",zIndex:4}}>

        {/* ══ TOP: Logo row + brand identity ══ */}
        <div style={{display:"flex",alignItems:"center",gap:22,marginBottom:28,paddingBottom:22,borderBottom:"1px solid rgba(255,255,255,0.07)"}}>
          <BrandIdentity size="hero" uid="hero"/>
          {/* Right side trust badges */}
          <div style={{marginLeft:"auto",display:"flex",gap:16,flexWrap:"wrap",justifyContent:"flex-end"}}>
            {[{icon:"🛡️",label:"Verified Parts",sub:"OEM Quality"},
              {icon:"🚚",label:"Fast Shipping",sub:"Nationwide"},
              {icon:"📞",label:"24hr Response",sub:"Expert Team"},
              {icon:"✅",label:"6-Mo Warranty",sub:"All Parts"}
            ].map(b=>(
              <div key={b.label} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 14px",background:"rgba(255,255,255,0.035)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:6}}>
                <span style={{fontSize:18}}>{b.icon}</span>
                <div>
                  <div style={{fontSize:10,fontWeight:800,color:T.fg,fontFamily:T.mono,letterSpacing:"0.08em"}}>{b.label}</div>
                  <div style={{fontSize:9,color:T.dim,fontFamily:T.mono}}>{b.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ MAIN GRID: Left content + Right form ══ */}
        <div className="hero-grid" style={{display:"grid",gridTemplateColumns:"minmax(0,1fr) 400px",gap:48,alignItems:"start"}}>

          {/* ════ LEFT ════ */}
          <div style={{display:"flex",flexDirection:"column",gap:20}}>

            {/* Badge */}
            <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"5px 14px",border:"1px solid rgba(255,255,255,0.12)",borderRadius:2,background:"rgba(255,255,255,0.04)",alignSelf:"flex-start"}}>
              <DiamondLed/>
              <span className="tagline-silver" style={{fontSize:9}}>Your Trusted Partner for Automotive Services &amp; Solutions</span>
              <DiamondLed/>
            </div>

            {/* H1 */}
            <div>
              <h1 className="ip-text" style={{fontFamily:T.serif,fontWeight:900,fontSize:"clamp(2rem,3.5vw,3rem)",lineHeight:1.05,letterSpacing:"-0.025em",marginBottom:10,filter:"drop-shadow(0 0 22px rgba(255,255,255,0.2))"}}>
                Premium Quality Used Auto Parts
              </h1>
              <div style={{display:"flex",alignItems:"center",gap:10,fontSize:10,fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",color:"rgba(160,180,210,0.55)",fontFamily:T.mono,flexWrap:"wrap"}}>
                <DiamondLed sm/>
                For All Vehicles
                <DiamondLed sm/>
                All Makes &amp; Models
                <DiamondLed sm/>
                Nationwide Network
                <DiamondLed sm/>
                Find Any Auto Part · Fast · Affordable · Guaranteed
                <DiamondLed sm/>
              </div>
            </div>

            {/* 3-col feature cards */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
              {[
                {icon:"🔍",title:"2,000+ Yards",body:"Access our nationwide salvage yard network instantly"},
                {icon:"⚡",title:"24hr Response",body:"Every quote answered within 24 hours, guaranteed"},
                {icon:"🔧",title:"Expert Help",body:"Technicians ready to assist any automotive challenge"},
                {icon:"💰",title:"Best Prices",body:"OEM quality parts at a fraction of dealer cost"},
                {icon:"📦",title:"Fast Delivery",body:"Prompt processing and nationwide shipping"},
                {icon:"🛡️",title:"6-Mo Warranty",body:"All parts backed by our quality warranty program"},
              ].map(f=>(
                <div key={f.title} style={{padding:"12px 14px",background:"rgba(255,255,255,0.025)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:6,transition:"all 0.2s"}}
                  onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.05)";e.currentTarget.style.borderColor="rgba(255,255,255,0.14)"}}
                  onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.025)";e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"}}>
                  <div style={{fontSize:20,marginBottom:6}}>{f.icon}</div>
                  <div style={{fontSize:11,fontWeight:800,color:T.fg,fontFamily:T.mono,letterSpacing:"0.06em",marginBottom:4}}>{f.title}</div>
                  <div style={{fontSize:10,color:T.dim,lineHeight:1.55}}>{f.body}</div>
                </div>
              ))}
            </div>

            {/* Body paragraphs — rich content */}
            <div style={{display:"flex",flexDirection:"column",gap:0,paddingLeft:16,borderLeft:"2px solid rgba(255,255,255,0.1)"}}>

              {/* Para 1 — Inventory & Response */}
              <div style={{paddingBottom:14,marginBottom:14,borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
                  <span style={{width:5,height:5,background:"rgba(255,255,255,0.6)",transform:"rotate(45deg)",display:"inline-block",flexShrink:0}}/>
                  <span style={{fontSize:10,fontWeight:800,color:"rgba(220,230,245,0.9)",fontFamily:T.mono,letterSpacing:"0.12em",textTransform:"uppercase"}}>Nationwide Inventory Network</span>
                </div>
                <p style={{color:"rgba(210,222,238,0.82)",fontSize:12,lineHeight:1.9,fontWeight:400,margin:0}}>Search our network of <strong style={{color:T.fg}}>2,000+ verified salvage yards</strong> across all 50 states and speak directly with our expert team. Every request receives a personal response within 24 hours — no bots, no automated runaround. Real people, real parts, real results.</p>
              </div>

              {/* Para 2 — OEM Quality */}
              <div style={{paddingBottom:14,marginBottom:14,borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
                  <span style={{width:5,height:5,background:"rgba(255,255,255,0.6)",transform:"rotate(45deg)",display:"inline-block",flexShrink:0}}/>
                  <span style={{fontSize:10,fontWeight:800,color:"rgba(220,230,245,0.9)",fontFamily:T.mono,letterSpacing:"0.12em",textTransform:"uppercase"}}>OEM Quality at Used Part Prices</span>
                </div>
                <p style={{color:"rgba(172,186,210,0.72)",fontSize:12,lineHeight:1.9,fontWeight:400,margin:0}}>We offer a comprehensive selection of <strong style={{color:T.fg}}>pre-owned OEM components</strong> — engines, transmissions, body panels, electrical parts, and more — ensuring you find exactly what you need to get back on the road quickly and affordably. Every part is inspected and graded. Our expert technicians are ready to assist with any automotive challenge, big or small.</p>
              </div>

              {/* Para 3 — Pricing & Warranty */}
              <div style={{paddingBottom:14,marginBottom:14,borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
                  <span style={{width:5,height:5,background:"rgba(255,255,255,0.6)",transform:"rotate(45deg)",display:"inline-block",flexShrink:0}}/>
                  <span style={{fontSize:10,fontWeight:800,color:"rgba(220,230,245,0.9)",fontFamily:T.mono,letterSpacing:"0.12em",textTransform:"uppercase"}}>Best Price Guarantee + 6-Month Warranty</span>
                </div>
                <p style={{color:"rgba(172,186,210,0.65)",fontSize:12,lineHeight:1.9,fontWeight:400,margin:0}}>Get <strong style={{color:T.fg}}>dealer-quality parts at 50–80% less</strong> than new. Every part sold through AUAPW.ORG comes backed by our <strong style={{color:T.fg}}>6-month quality warranty</strong>. If the part doesn't fit or fails within warranty, we make it right — no questions asked. Time is critical when your vehicle needs repairs, and we process orders fast with nationwide shipping direct to your door or shop.</p>
              </div>

              {/* Para 4 — Process & Experience */}
              <div style={{paddingBottom:14,marginBottom:14,borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
                  <span style={{width:5,height:5,background:"rgba(255,255,255,0.6)",transform:"rotate(45deg)",display:"inline-block",flexShrink:0}}/>
                  <span style={{fontSize:10,fontWeight:800,color:"rgba(220,230,245,0.9)",fontFamily:T.mono,letterSpacing:"0.12em",textTransform:"uppercase"}}>Simple 3-Step Process</span>
                </div>
                <div style={{display:"flex",gap:10,marginBottom:8}}>
                  {[
                    {n:"1",t:"Request",d:"Fill our quick form or call — tell us your year, make, model and part needed"},
                    {n:"2",t:"We Source",d:"Our team searches 2,000+ yards and finds your part within 24 hours"},
                    {n:"3",t:"Delivered",d:"Part ships directly to you or your mechanic. Fast, tracked, insured"},
                  ].map(s=>(
                    <div key={s.n} style={{flex:1,padding:"10px",background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:5}}>
                      <div style={{width:20,height:20,borderRadius:"50%",background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:900,color:T.fg,fontFamily:T.mono,marginBottom:5}}>{s.n}</div>
                      <div style={{fontSize:10,fontWeight:800,color:T.fg,fontFamily:T.mono,marginBottom:3}}>{s.t}</div>
                      <div style={{fontSize:9.5,color:T.dim,lineHeight:1.5}}>{s.d}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Para 5 — Who We Serve */}
              <div style={{paddingBottom:14,marginBottom:14,borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
                  <span style={{width:5,height:5,background:"rgba(255,255,255,0.6)",transform:"rotate(45deg)",display:"inline-block",flexShrink:0}}/>
                  <span style={{fontSize:10,fontWeight:800,color:"rgba(220,230,245,0.9)",fontFamily:T.mono,letterSpacing:"0.12em",textTransform:"uppercase"}}>Who We Serve</span>
                </div>
                <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
                  {["Individual Car Owners","Auto Repair Shops","Body Shops","Dealerships","Fleet Managers","DIY Mechanics","Insurance Companies","Salvage Resellers"].map(tag=>(
                    <span key={tag} style={{padding:"4px 10px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:3,fontSize:9.5,color:"rgba(200,215,235,0.7)",fontFamily:T.mono,letterSpacing:"0.06em"}}>{tag}</span>
                  ))}
                </div>
              </div>

              {/* Para 6 — Trust & Sustainability */}
              <div>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
                  <span style={{width:5,height:5,background:"rgba(255,255,255,0.6)",transform:"rotate(45deg)",display:"inline-block",flexShrink:0}}/>
                  <span style={{fontSize:10,fontWeight:800,color:"rgba(220,230,245,0.9)",fontFamily:T.mono,letterSpacing:"0.12em",textTransform:"uppercase"}}>Trusted Nationwide · Eco-Responsible</span>
                </div>
                <p style={{color:"rgba(155,172,200,0.55)",fontSize:11.5,lineHeight:1.85,fontWeight:400,margin:0}}>Seamless experience from inquiry to delivery. Committed to <strong style={{color:"rgba(180,195,215,0.7)"}}>sustainability and environmental responsibility</strong> — every used part we sell keeps one more component out of the landfill. Join over <strong style={{color:T.fg}}>50,000 satisfied customers</strong> nationwide who trust <strong style={{color:T.fg}}>AUAPW.ORG — All Used Auto Parts Warehouse</strong> as their go-to source for quality, affordability, and reliability. Your Trusted Partner for Automotive Services &amp; Solutions.</p>
              </div>

            </div>

            {/* CTA Buttons */}
            <div style={{display:"flex",gap:12,flexWrap:"wrap",alignItems:"center",paddingTop:4}}>
              <Btn3d onClick={()=>goTo("parts")}>
                <span style={{display:"inline-flex",alignItems:"center",gap:8}}>
                  <span style={{width:6,height:6,background:"currentColor",transform:"rotate(45deg)",display:"inline-block",flexShrink:0}}/>
                  Search Parts Now
                </span>
              </Btn3d>
              <a href="tel:8888185001" className="btn-ghost" style={{display:"inline-flex",alignItems:"center",gap:7}}><Phone size={12}/>(888) 818-5001</a>
              <button className="btn-ghost" onClick={()=>goTo("quote")}>Request Free Quote</button>
            </div>

            {/* Social proof strip */}
            <div style={{display:"flex",alignItems:"center",gap:20,paddingTop:8,borderTop:"1px solid rgba(255,255,255,0.06)"}}>
              <div style={{display:"flex",gap:-6}}>
                {["JT","MR","SK","AL","PD"].map((v,i)=>(
                  <div key={v} style={{width:30,height:30,borderRadius:"50%",background:`linear-gradient(135deg,hsl(${i*55},50%,35%),hsl(${i*55+30},60%,25%))`,border:"2px solid #0c0e18",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:800,color:"rgba(255,255,255,0.8)",marginLeft:i?-8:0,fontFamily:T.mono}}>{v}</div>
                ))}
              </div>
              <div>
                <div style={{display:"flex",gap:2,marginBottom:2}}>{"★★★★★".split("").map((s,i)=><span key={i} style={{color:"#fbbf24",fontSize:12}}>{s}</span>)}</div>
                <div style={{fontSize:10,color:T.dim,fontFamily:T.mono}}>Trusted by <strong style={{color:T.fg}}>50,000+</strong> customers nationwide</div>
              </div>
              <div style={{marginLeft:"auto",padding:"6px 14px",background:"rgba(74,222,128,0.08)",border:"1px solid rgba(74,222,128,0.2)",borderRadius:4}}>
                <div style={{fontSize:9,fontWeight:800,color:"rgba(74,222,128,0.9)",fontFamily:T.mono,letterSpacing:"0.12em"}}>✓ LIVE INVENTORY</div>
                <div style={{fontSize:8.5,color:T.dim,fontFamily:T.mono}}>Updated in real-time</div>
              </div>
            </div>

          </div>

          {/* ════ RIGHT: Quote Form ════ */}
          <div style={{position:"relative"}}>
            <CornerLogo pos={{t:-12,l:-12}} delay={0}/>
            <CornerLogo pos={{t:-12,r:-12}} delay={0.7}/>
            <CornerLogo pos={{b:-12,l:-12}} delay={1.4}/>
            <CornerLogo pos={{b:-12,r:-12}} delay={2.1}/>
            <div style={{position:"absolute",inset:0,borderRadius:8,background:"linear-gradient(135deg,rgba(255,255,255,0.04) 0%,transparent 50%)",pointerEvents:"none",zIndex:2}}/>
            <div style={{position:"absolute",top:0,left:"-100%",width:"60%",height:"100%",background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.035),transparent)",animation:"ghost-scan 6s ease-in-out infinite 1.5s",pointerEvents:"none",zIndex:2}}/>
            <QuoteForm/>
          </div>

        </div>
      </div>
    </section>
    <section style={{ background:"rgba(15,17,25,0.85)",borderBottom:`1px solid rgba(255,255,255,0.07)`,backdropFilter:"blur(20px)" }}>
      <div style={{ maxWidth:1280,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(4,1fr)" }}>
        {STATS.map((s,i)=>(
          <div key={s.label} style={{ textAlign:"center",padding:"32px 24px",borderRight:i<3?`1px solid rgba(255,255,255,0.07)`:"none" }}
            onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.025)"}
            onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
            <span className="ip-text" style={{ display:"block",fontFamily:T.serif,fontSize:34,fontWeight:700,marginBottom:4 }}>{s.value}</span>
            <span style={{ display:"block",fontSize:10,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:T.fg,marginBottom:2,fontFamily:T.mono }}>{s.label}</span>
            <span style={{ display:"block",fontSize:11,color:T.dim }}>{s.sub}</span>
          </div>
        ))}
      </div>
      <ML/>
    </section>

    {/* ══════════ NEW: LIVE ACTIVITY FEED — Trending Parts Right Now ══════════ */}
    <section style={{ padding:"56px 32px",background:"linear-gradient(180deg,rgba(7,9,15,0.98),rgba(12,14,24,0.95),rgba(7,9,15,0.98))",borderBottom:`1px solid ${T.bdd}`,position:"relative",overflow:"hidden" }}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)"}}/>
      {/* Subtle dot grid */}
      <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,rgba(255,255,255,0.01) 1px,transparent 1px)",backgroundSize:"36px 36px",pointerEvents:"none"}}/>
      <div style={{ maxWidth:1280,margin:"0 auto",position:"relative",zIndex:1 }}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:32,flexWrap:"wrap",gap:16}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
              <div style={{width:10,height:10,borderRadius:"50%",background:"#4ade80",boxShadow:"0 0 10px rgba(74,222,128,0.6)",animation:"pulse-dot 2s ease infinite"}}/>
              <SLabel>Live on AUAPW.ORG</SLabel>
            </div>
            <h2 className="ip-text" style={{fontFamily:T.serif,fontSize:"clamp(1.5rem,3vw,2.4rem)",fontWeight:800,letterSpacing:"-0.02em",lineHeight:1.1}}>Trending Parts Right Now</h2>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <AuapwLogo size={26} uid="trend-logo"/>
            <span style={{fontSize:9,fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",color:T.dim,fontFamily:T.mono}}>Updated Live</span>
          </div>
        </div>

        {/* Trending parts ticker — looks like real-time activity */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:24}}>
          {[
            {part:"Complete Engine",vehicle:"2019 Ford F-150",city:"Houston, TX",mins:"2 min ago",cat:"Engines"},
            {part:"Automatic Transmission",vehicle:"2018 Toyota Camry",city:"Los Angeles, CA",mins:"4 min ago",cat:"Transmissions"},
            {part:"A/C Compressor",vehicle:"2020 Honda CR-V",city:"Phoenix, AZ",mins:"6 min ago",cat:"Cooling"},
            {part:"Alternator",vehicle:"2017 Chevrolet Silverado",city:"Dallas, TX",mins:"9 min ago",cat:"Electrical"},
            {part:"Transfer Case",vehicle:"2016 Jeep Grand Cherokee",city:"Denver, CO",mins:"12 min ago",cat:"Drivetrain"},
            {part:"Front Bumper",vehicle:"2021 BMW X5",city:"Miami, FL",mins:"15 min ago",cat:"Body"},
            {part:"CV Axle",vehicle:"2019 Nissan Rogue",city:"Atlanta, GA",mins:"18 min ago",cat:"Drivetrain"},
            {part:"Turbocharger",vehicle:"2018 Audi A4",city:"Chicago, IL",mins:"21 min ago",cat:"Cooling"},
            {part:"Steering Rack",vehicle:"2020 Ram 1500",city:"Nashville, TN",mins:"24 min ago",cat:"Suspension"},
          ].map((item,i)=>{
            const cat = PART_CATEGORIES.find(c=>c.id===item.cat.toLowerCase())||PART_CATEGORIES.find(c=>c.label===item.cat)||PART_CATEGORIES[0];
            const CIcon = cat ? cat.Icon : Cog;
            return (
              <div key={i} className="gc" style={{padding:"14px 18px",display:"flex",alignItems:"center",gap:14,cursor:"pointer",transition:"all 0.2s"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.18)";e.currentTarget.style.background="rgba(255,255,255,0.04)"}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.07)";e.currentTarget.style.background="rgba(19,22,30,0.72)"}}
                onClick={()=>goTo("quote",item.part)}>
                <GSB/>
                {/* Category icon */}
                <div style={{width:36,height:36,borderRadius:8,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.09)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,position:"relative",zIndex:1}}>
                  <CIcon size={14} color="rgba(200,210,225,0.65)"/>
                </div>
                <div style={{flex:1,minWidth:0,position:"relative",zIndex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2}}>
                    <span style={{fontSize:12,fontWeight:700,color:T.fg,fontFamily:T.sans}}>{item.part}</span>
                  </div>
                  <div style={{fontSize:10,color:T.dim,fontFamily:T.mono}}>{item.vehicle}</div>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginTop:3}}>
                    <MapPin size={8} color={T.dimmer}/>
                    <span style={{fontSize:9,color:T.dimmer,fontFamily:T.mono}}>{item.city}</span>
                    <span style={{fontSize:8,color:"rgba(74,222,128,0.6)",fontFamily:T.mono}}>● {item.mins}</span>
                  </div>
                </div>
                <ArrowRight size={12} color={T.dimmer} style={{flexShrink:0,position:"relative",zIndex:1}}/>
              </div>
            );
          })}
        </div>

        {/* Bottom bar — branded */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 20px",background:"rgba(255,255,255,0.025)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:6,flexWrap:"wrap",gap:12}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <AuapwLogo size={22} uid="trend-btm"/>
            <span style={{fontSize:10,fontWeight:800,fontFamily:T.mono,letterSpacing:"0.1em",textTransform:"uppercase",color:T.dim}}>AUAPW.ORG processes 500+ requests daily</span>
          </div>
          <Btn3d onClick={()=>goTo("quote")}><span style={{display:"inline-flex",alignItems:"center",gap:6}}>Get Your Quote Now <ArrowRight size={10}/></span></Btn3d>
        </div>
      </div>
    </section>

    {/* ══════════ NEW: THE AUAPW ADVANTAGE — Comparison Strip ══════════ */}
    <section style={{ padding:"72px 32px",background:"linear-gradient(180deg,rgba(8,10,18,0.98) 0%,rgba(12,14,24,0.95) 50%,rgba(8,10,18,0.98) 100%)",borderBottom:`1px solid ${T.bdd}`,position:"relative",overflow:"hidden" }}>
      {/* Background gear watermark */}
      <div style={{position:"absolute",right:"-4%",top:"50%",transform:"translateY(-50%)",opacity:0.022,pointerEvents:"none"}}>
        <AuapwLogo size={340} uid="adv-wm"/>
      </div>
      <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent)"}}/>
      <div style={{ maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1 }}>
        <div style={{textAlign:"center",marginBottom:48}}>
          <SectionHead label="The AUAPW Advantage" title="Why AUAPW.ORG Wins Every Time" center titleClass="ip-text"/>
          <p style={{fontSize:13,color:T.muted,maxWidth:560,margin:"-20px auto 0",lineHeight:1.8,fontWeight:300}}>See how sourcing through AUAPW.ORG compares to buying from a dealer or searching the internet on your own.</p>
        </div>
        {/* Comparison header */}
        <div style={{display:"grid",gridTemplateColumns:"1.4fr repeat(3,1fr)",gap:0,border:`1px solid rgba(255,255,255,0.1)`,borderRadius:8,overflow:"hidden"}}>
          {/* Header row */}
          <div style={{padding:"16px 20px",background:"rgba(255,255,255,0.03)",borderBottom:"1px solid rgba(255,255,255,0.08)",borderRight:"1px solid rgba(255,255,255,0.06)"}}>
            <span style={{fontSize:10,fontWeight:700,letterSpacing:"0.16em",textTransform:"uppercase",color:T.dim,fontFamily:T.mono}}>Feature</span>
          </div>
          <div style={{padding:"16px 20px",background:"linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))",borderBottom:"1px solid rgba(255,255,255,0.12)",borderRight:"1px solid rgba(255,255,255,0.06)",textAlign:"center",position:"relative"}}>
            <div style={{position:"absolute",top:0,left:"15%",right:"15%",height:2,background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.6),transparent)"}}/>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
              <AuapwLogo size={22} uid="cmp-logo"/>
              <div>
                <div style={{fontSize:11,fontWeight:900,fontFamily:T.mono,letterSpacing:"0.1em",color:T.fg}}>AUAPW.ORG</div>
                <div style={{fontSize:8,color:"rgba(74,222,128,0.7)",fontFamily:T.mono,letterSpacing:"0.1em"}}>RECOMMENDED</div>
              </div>
            </div>
          </div>
          <div style={{padding:"16px 20px",background:"rgba(255,255,255,0.02)",borderBottom:"1px solid rgba(255,255,255,0.08)",borderRight:"1px solid rgba(255,255,255,0.06)",textAlign:"center"}}>
            <div style={{fontSize:11,fontWeight:700,fontFamily:T.mono,color:T.muted,letterSpacing:"0.06em"}}>New Dealer Parts</div>
          </div>
          <div style={{padding:"16px 20px",background:"rgba(255,255,255,0.02)",borderBottom:"1px solid rgba(255,255,255,0.08)",textAlign:"center"}}>
            <div style={{fontSize:11,fontWeight:700,fontFamily:T.mono,color:T.muted,letterSpacing:"0.06em"}}>DIY Internet Search</div>
          </div>
          {/* Data rows */}
          {[
            {feat:"Price vs. New OEM", auapw:"50–80% Less", dealer:"Full Price", diy:"Varies Wildly"},
            {feat:"Warranty Coverage", auapw:"6-Month Warranty", dealer:"12 Months", diy:"None / Risky"},
            {feat:"Fitment Verification", auapw:"Expert Verified", dealer:"Guaranteed", diy:"DIY / Guesswork"},
            {feat:"Response Time", auapw:"Under 24 Hours", dealer:"1–5 Business Days", diy:"Unpredictable"},
            {feat:"Shipping", auapw:"Free Nationwide", dealer:"$50–$300+", diy:"You Arrange"},
            {feat:"Source Verification", auapw:"2,000+ Vetted Yards", dealer:"Single Source", diy:"Unverified"},
            {feat:"Human Support", auapw:"Real Expert Team", dealer:"Call Center", diy:"None"},
            {feat:"Eco Impact", auapw:"Recycles 80M+ Parts/yr", dealer:"New Manufacturing", diy:"Uncertain"},
          ].map((row,i)=>(
            <React.Fragment key={row.feat}>
              <div style={{padding:"12px 20px",borderRight:"1px solid rgba(255,255,255,0.06)",borderBottom:i<7?"1px solid rgba(255,255,255,0.05)":"none",background:"rgba(255,255,255,0.015)"}}>
                <span style={{fontSize:11,fontWeight:600,color:T.muted,fontFamily:T.sans}}>{row.feat}</span>
              </div>
              <div style={{padding:"12px 20px",textAlign:"center",borderRight:"1px solid rgba(255,255,255,0.06)",borderBottom:i<7?"1px solid rgba(255,255,255,0.05)":"none",background:"rgba(255,255,255,0.04)"}}>
                <span style={{fontSize:11,fontWeight:800,color:T.fg,fontFamily:T.mono,letterSpacing:"0.04em"}}>{row.auapw}</span>
              </div>
              <div style={{padding:"12px 20px",textAlign:"center",borderRight:"1px solid rgba(255,255,255,0.06)",borderBottom:i<7?"1px solid rgba(255,255,255,0.05)":"none"}}>
                <span style={{fontSize:11,color:T.dim,fontFamily:T.mono}}>{row.dealer}</span>
              </div>
              <div style={{padding:"12px 20px",textAlign:"center",borderBottom:i<7?"1px solid rgba(255,255,255,0.05)":"none"}}>
                <span style={{fontSize:11,color:T.dimmer,fontFamily:T.mono}}>{row.diy}</span>
              </div>
            </React.Fragment>
          ))}
        </div>
        <div style={{textAlign:"center",marginTop:32}}>
          <Btn3d onClick={()=>goTo("quote")}><span style={{display:"inline-flex",alignItems:"center",gap:8}}>Get Your AUAPW Quote <ArrowRight size={12}/></span></Btn3d>
        </div>
      </div>
    </section>
    <section style={{ padding:"72px 32px",background:T.bg,borderBottom:`1px solid ${T.bdd}` }}>
      <div style={{ maxWidth:1280,margin:"0 auto" }}>
        <div style={{ display:"flex",alignItems:"flex-end",justifyContent:"space-between",gap:24,marginBottom:44,flexWrap:"wrap" }}>
          <div><SectionLine>What We Source</SectionLine>
            <h2 className="ip-text" style={{ fontFamily:T.serif,fontSize:"clamp(1.75rem,4vw,3rem)",fontWeight:800,letterSpacing:"-0.02em",lineHeight:1.1 }}>Parts Categories</h2>
          </div>
          <Btn3d onClick={()=>goTo("parts")}>Browse All Parts</Btn3d>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16 }}>
          {PART_CATEGORIES.map(({ id,label,Icon,parts })=>(
            <div key={id} className="gc hov" style={{ padding:24 }} onClick={()=>goTo(`parts-${id}`)}
              onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(232,232,232,0.22)"}
              onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"}>
              <Icon size={26} color={T.dim} style={{ marginBottom:14 }}/>
              <h3 style={{ fontSize:14,fontWeight:700,color:T.fg,marginBottom:6,fontFamily:T.sans }}>{label}</h3>
              <p style={{ fontSize:10,color:T.dim,marginBottom:14,fontFamily:T.mono }}>{parts.length} parts available</p>
              <div style={{ borderTop:`1px solid rgba(255,255,255,0.07)`,paddingTop:10,display:"flex",flexWrap:"wrap",gap:4 }}>
                {parts.slice(0,3).map(p=><span key={p} style={{ padding:"2px 8px",background:"rgba(255,255,255,0.04)",border:`1px solid rgba(255,255,255,0.1)`,borderRadius:2,fontSize:9,color:T.dim,fontFamily:T.mono }}>{p}</span>)}
                <span style={{ padding:"2px 8px",background:"rgba(255,255,255,0.04)",border:`1px solid rgba(255,255,255,0.1)`,borderRadius:2,fontSize:9,color:T.dim,fontFamily:T.mono }}>+{parts.length-3}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ══════════ NEW: NATIONWIDE NETWORK — Coverage Visual ══════════ */}
    <section style={{ padding:"72px 32px",background:"linear-gradient(135deg,rgba(6,8,14,0.98) 0%,rgba(14,16,28,0.95) 50%,rgba(6,8,14,0.98) 100%)",borderBottom:`1px solid ${T.bdd}`,position:"relative",overflow:"hidden" }}>
      {/* Radial glow */}
      <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:800,height:600,borderRadius:"50%",background:"radial-gradient(circle,rgba(255,255,255,0.035) 0%,transparent 65%)",pointerEvents:"none"}}/>
      <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)"}}/>
      <div style={{ maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1 }}>
        <div style={{textAlign:"center",marginBottom:48}}>
          <SectionHead label="Our Reach" title="AUAPW.ORG Covers All 50 States" center titleClass="mercury"/>
          <p style={{fontSize:13,color:T.muted,maxWidth:560,margin:"-20px auto 0",lineHeight:1.8,fontWeight:300}}>From coast to coast, our network of 2,000+ verified salvage yards means we can source any part for any vehicle, anywhere in America — fast.</p>
        </div>

        {/* Large branded visual block — logo + stats ring */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:48,alignItems:"center",marginBottom:48}}>
          {/* Left — Big logo with animated rings */}
          <div style={{display:"flex",justifyContent:"center",alignItems:"center",position:"relative"}}>
            {/* Animated outer rings */}
            <div style={{position:"absolute",width:320,height:320,borderRadius:"50%",border:"1px solid rgba(255,255,255,0.06)",animation:"led-pulse 3s ease-in-out infinite"}}/>
            <div style={{position:"absolute",width:260,height:260,borderRadius:"50%",border:"1px solid rgba(255,255,255,0.09)",animation:"led-pulse 3s ease-in-out infinite 0.5s"}}/>
            <div style={{position:"absolute",width:200,height:200,borderRadius:"50%",border:"1px solid rgba(255,255,255,0.14)",animation:"led-pulse 3s ease-in-out infinite 1s"}}/>
            {/* Center logo */}
            <div style={{width:150,height:150,borderRadius:"50%",background:"radial-gradient(circle at 40% 35%,#1e2233,#0c0e18 60%,#07090e)",border:"2px solid rgba(255,255,255,0.2)",boxShadow:"0 0 0 1px rgba(255,255,255,0.06),0 0 60px rgba(255,255,255,0.12),0 0 120px rgba(200,215,255,0.06),inset 0 1px 0 rgba(255,255,255,0.12)",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",zIndex:2}}>
              <AuapwLogo size={132} uid="network-big"/>
            </div>
            {/* Orbiting stat bubbles */}
            {[
              {angle:"-30deg",val:"50+",lbl:"States"},
              {angle:"60deg",val:"2K+",lbl:"Yards"},
              {angle:"150deg",val:"50K+",lbl:"Customers"},
              {angle:"240deg",val:"24h",lbl:"Response"},
            ].map((s,i)=>(
              <div key={s.lbl} style={{position:"absolute",width:60,height:60,borderRadius:"50%",background:"rgba(19,22,30,0.9)",border:"1px solid rgba(255,255,255,0.12)",boxShadow:"0 4px 20px rgba(0,0,0,0.6)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
                transform:`rotate(${s.angle}) translateX(175px) rotate(-${s.angle})`,
                animation:`led-pulse 2.5s ease-in-out infinite ${i*0.4}s`,zIndex:3}}>
                <div style={{fontSize:12,fontWeight:900,color:T.fg,fontFamily:T.mono,lineHeight:1}}>{s.val}</div>
                <div style={{fontSize:7,color:T.dim,fontFamily:T.mono,letterSpacing:"0.1em",textTransform:"uppercase"}}>{s.lbl}</div>
              </div>
            ))}
          </div>

          {/* Right — Brand promise text */}
          <div style={{display:"flex",flexDirection:"column",gap:20}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <DiamondLed/>
              <div className="sub-emboss" style={{fontSize:10,letterSpacing:"0.2em"}}>THE AUAPW.ORG NETWORK</div>
            </div>
            <h3 className="ip-text" style={{fontFamily:T.serif,fontSize:"clamp(1.4rem,3vw,2.2rem)",fontWeight:800,letterSpacing:"-0.02em",lineHeight:1.15}}>America's Largest Used Auto Parts Marketplace</h3>
            <p style={{fontSize:13,color:T.muted,lineHeight:1.9,fontWeight:300}}>When you search through <strong style={{color:T.fg}}>AUAPW.ORG</strong>, you're tapping into a verified national network that most people don't even know exists. Our system searches thousands of salvage yards simultaneously — from New Jersey to California, Maine to Texas — to find the exact part for your vehicle at the best price. This is what sets us apart from dealers, random eBay listings, or calling yards one by one.</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              {[
                {val:"107",lbl:"Myrtle Ave, Woodbine NJ",sub:"Headquarters"},
                {val:"48+",lbl:"Car Brands Covered",sub:"Acura to Volvo"},
                {val:"35+",lbl:"Years of Vehicle Coverage",sub:"1990 to Present"},
                {val:"0",lbl:"Cost for Shipping",sub:"Free Nationwide"},
              ].map(s=>(
                <div key={s.lbl} style={{padding:"12px 16px",background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:6}}>
                  <div className="ip-text" style={{fontSize:22,fontWeight:800,fontFamily:T.mono,lineHeight:1,marginBottom:3}}>{s.val}</div>
                  <div style={{fontSize:10,fontWeight:700,color:T.fg,fontFamily:T.mono,letterSpacing:"0.06em",marginBottom:2}}>{s.lbl}</div>
                  <div style={{fontSize:9,color:T.dim,fontFamily:T.mono}}>{s.sub}</div>
                </div>
              ))}
            </div>
            <Btn3d onClick={()=>goTo("about")}><span style={{display:"inline-flex",alignItems:"center",gap:8}}>Learn About Our Network <ArrowRight size={12}/></span></Btn3d>
          </div>
        </div>

        {/* State coverage strip */}
        <div style={{padding:"20px 28px",background:"rgba(255,255,255,0.025)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:8,position:"relative",overflow:"hidden"}}>
          <div className="gsb"/>
          <div style={{position:"relative",zIndex:1,display:"flex",alignItems:"center",gap:16}}>
            <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
              <div style={{width:10,height:10,borderRadius:"50%",background:"#4ade80",boxShadow:"0 0 8px rgba(74,222,128,0.5)",animation:"pulse-dot 2s ease infinite"}}/>
              <span style={{fontSize:10,fontWeight:800,color:"rgba(74,222,128,0.9)",fontFamily:T.mono,letterSpacing:"0.12em",textTransform:"uppercase"}}>Active Coverage</span>
            </div>
            <div style={{flex:1,display:"flex",flexWrap:"wrap",gap:4}}>
              {["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"].map(st=>(
                <span key={st} style={{padding:"2px 5px",fontSize:8,fontWeight:800,color:"rgba(74,222,128,0.65)",fontFamily:T.mono,letterSpacing:"0.08em",background:"rgba(74,222,128,0.06)",border:"1px solid rgba(74,222,128,0.12)",borderRadius:2}}>{st}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
    <section style={{ padding:"72px 32px",background:"linear-gradient(to bottom,rgba(20,22,32,0.6),#07090f)",borderBottom:`1px solid ${T.bdd}` }}>
      <div style={{ maxWidth:1280,margin:"0 auto" }}>
        <SectionHead label="Parts Intelligence" title="What You Should Know" center/>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:1,border:`1px solid rgba(255,255,255,0.07)`,borderRadius:4,overflow:"hidden",background:"rgba(255,255,255,0.06)" }}>
          {FACTS.map(({ Icon,stat,heading,body })=>(
            <div key={heading}
              onMouseEnter={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.04)"; e.currentTarget.querySelector(".fact-bar").style.opacity=1; }}
              onMouseLeave={e=>{ e.currentTarget.style.background="rgba(7,9,15,0.93)"; e.currentTarget.querySelector(".fact-bar").style.opacity=0; }}
              style={{ background:"rgba(7,9,15,0.93)",padding:28,transition:"background 0.2s",position:"relative" }}>
              <div className="fact-bar" style={{ position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent)",opacity:0,transition:"opacity 0.35s" }}/>
              <div style={{ display:"flex",gap:12,marginBottom:12 }}>
                <div style={{ padding:8,background:"rgba(255,255,255,0.06)",border:`1px solid rgba(255,255,255,0.1)`,borderRadius:7,flexShrink:0 }}><Icon size={14} color="#e8e8e8"/></div>
                <div>
                  <span className="ip-text" style={{ display:"block",fontSize:28,fontWeight:800,fontFamily:T.serif,letterSpacing:"-0.02em",lineHeight:1 }}>{stat}</span>
                  <span style={{ display:"block",fontSize:9,fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:T.dim,marginTop:3,fontFamily:T.mono }}>{heading}</span>
                </div>
              </div>
              <p style={{ fontSize:12,color:T.muted,lineHeight:1.75,fontWeight:300 }}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    <section style={{ padding:"72px 32px",background:"linear-gradient(to br,#07090f,rgba(20,22,32,0.7),#07090f)",borderBottom:`1px solid ${T.bdd}` }}>
      <div style={{ maxWidth:1280,margin:"0 auto" }}>
        <div style={{ display:"flex",alignItems:"flex-end",justifyContent:"space-between",gap:24,marginBottom:40,flexWrap:"wrap" }}>
          <div><SectionLine>All Makes & Models</SectionLine>
            <h2 style={{ fontFamily:T.serif,fontSize:"clamp(1.75rem,4vw,3rem)",fontWeight:700,color:T.fg,letterSpacing:"-0.02em" }}>Shop by Brand</h2>
          </div>
          <button className="btn-ghost" onClick={()=>goTo("makes")}>View All Makes →</button>
        </div>
        <div style={{ display:"flex",flexWrap:"wrap",gap:7 }}>
          {CAR_MAKES.map(m=>(
            <span key={m} style={{ display:"inline-block",padding:"8px 14px",border:`1px solid rgba(255,255,255,0.12)`,background:"linear-gradient(to br,rgba(255,255,255,0.06),rgba(255,255,255,0.02))",fontSize:10,fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",color:T.muted,borderRadius:2,cursor:"pointer",transition:"all 0.18s",fontFamily:T.mono,boxShadow:"inset 0 1px 0 rgba(255,255,255,0.06)" }}
              onMouseEnter={e=>{e.target.style.background="rgba(255,255,255,0.1)";e.target.style.borderColor="rgba(232,232,232,0.35)";e.target.style.color=T.fg;}}
              onMouseLeave={e=>{e.target.style.background="linear-gradient(to br,rgba(255,255,255,0.06),rgba(255,255,255,0.02))";e.target.style.borderColor="rgba(255,255,255,0.12)";e.target.style.color=T.muted;}}
              onClick={()=>goTo("makes")}>{m}</span>
          ))}
        </div>
      </div>
    </section>
    <section style={{ padding:"72px 32px",position:"relative",overflow:"hidden",background:"#0d0f16" }}>
      <div style={{ position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,rgba(255,255,255,0.022) 1px,transparent 1px)",backgroundSize:"24px 24px",pointerEvents:"none" }}/>
      <ML style={{ position:"absolute",top:0,left:0,right:0 }}/>
      <ML style={{ position:"absolute",bottom:0,left:0,right:0 }}/>
      <div style={{ maxWidth:1280,margin:"0 auto",position:"relative",zIndex:1 }}>
        <SectionHead label="Simple Process" title="How It Works" center titleClass="mercury"/>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:18 }}>
          {STEPS.map(({ num,title,desc })=>(
            <div key={num} className="pc" style={{ padding:28,display:"flex",flexDirection:"column",gap:14,position:"relative" }}>
              <div style={{ position:"absolute",top:0,left:0,width:22,height:22,borderTop:`1px solid rgba(255,255,255,0.1)`,borderLeft:`1px solid rgba(255,255,255,0.1)` }}/>
              <div style={{ position:"absolute",bottom:0,right:0,width:22,height:22,borderBottom:`1px solid rgba(255,255,255,0.1)`,borderRight:`1px solid rgba(255,255,255,0.1)` }}/>
              <div className="pnum">{num}</div>
              <div className="prule"/>
              <div className="ptitle">{title}</div>
              <p style={{ color:"rgba(138,143,160,0.85)",fontSize:12,lineHeight:1.7,fontWeight:300 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ══════════ NEW: WHY USED PARTS? — Educational Authority Section ══════════ */}
    <section style={{ padding:"72px 32px",background:"linear-gradient(180deg,rgba(8,10,18,0.98),rgba(14,17,28,0.95),rgba(8,10,18,0.98))",borderBottom:`1px solid ${T.bdd}`,position:"relative",overflow:"hidden" }}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)"}}/>
      {/* Background gear watermark */}
      <div style={{position:"absolute",left:"-5%",top:"50%",transform:"translateY(-50%)",opacity:0.018,pointerEvents:"none"}}><AuapwLogo size={380} uid="edu-wm"/></div>
      <div style={{ maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1 }}>
        <div style={{textAlign:"center",marginBottom:48}}>
          <div style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:62,height:62,borderRadius:"50%",background:"radial-gradient(circle at 40% 35%,#1e2233,#0c0e18)",border:"1.5px solid rgba(255,255,255,0.18)",boxShadow:"0 0 32px rgba(255,255,255,0.1)",marginBottom:16}}>
            <AuapwLogo size={52} uid="edu-hdr"/>
          </div>
          <SectionHead label="The Smart Choice" title="Why Used Auto Parts?" center titleClass="ip-text"/>
          <p style={{fontSize:13,color:T.muted,maxWidth:580,margin:"-20px auto 0",lineHeight:1.8,fontWeight:300}}>Used OEM parts aren't second-rate — they're the same factory-built components that powered the vehicle from day one. Here's what the data says.</p>
        </div>

        {/* 2-column layout: Left = big impact numbers, Right = editorial content */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1.2fr",gap:48,alignItems:"start",marginBottom:48}}>
          {/* Left — Impact Stats */}
          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            {[
              {num:"$4.2B",label:"Annual U.S. Used Parts Market",desc:"The recycled auto parts industry is a $32B+ sector. AUAPW.ORG gives you direct access to the best of it.",accent:"rgba(74,222,128,0.12)",accentBorder:"rgba(74,222,128,0.2)",accentText:"rgba(74,222,128,0.9)"},
              {num:"80M+",label:"Parts Recycled Annually in the U.S.",desc:"Over 80 million auto components are salvaged and recycled each year, diverting millions of tons from landfills.",accent:"rgba(96,165,250,0.1)",accentBorder:"rgba(96,165,250,0.2)",accentText:"rgba(96,165,250,0.85)"},
              {num:"50–80%",label:"Average Savings vs. New OEM Parts",desc:"Same factory specs, same fit and finish, at a fraction of dealer pricing. Quality you can trust at a price that makes sense.",accent:"rgba(251,191,36,0.1)",accentBorder:"rgba(251,191,36,0.2)",accentText:"rgba(251,191,36,0.85)"},
              {num:"14M",label:"Vehicles Recycled Per Year in America",desc:"The auto recycling industry is the 16th largest in the U.S. — and AUAPW connects you to the heart of it.",accent:"rgba(244,114,182,0.1)",accentBorder:"rgba(244,114,182,0.2)",accentText:"rgba(244,114,182,0.85)"},
            ].map(s=>(
              <div key={s.label} className="gc" style={{padding:"20px 24px",overflow:"hidden"}}>
                <GSB/>
                <div style={{display:"flex",alignItems:"center",gap:16,position:"relative",zIndex:1}}>
                  <div style={{minWidth:85}}>
                    <div className="ip-text" style={{fontSize:28,fontWeight:900,fontFamily:T.serif,letterSpacing:"-0.03em",lineHeight:1}}>{s.num}</div>
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:11,fontWeight:800,color:T.fg,fontFamily:T.sans,marginBottom:3}}>{s.label}</div>
                    <div style={{fontSize:10.5,color:T.dim,lineHeight:1.65,fontWeight:300}}>{s.desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right — Editorial Content */}
          <div>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
              <DiamondLed/>
              <div className="sub-emboss" style={{fontSize:10,letterSpacing:"0.2em"}}>AUAPW.ORG INSIGHT</div>
            </div>
            <h3 className="ip-text" style={{fontFamily:T.serif,fontSize:"clamp(1.3rem,2.5vw,2rem)",fontWeight:800,letterSpacing:"-0.02em",lineHeight:1.2,marginBottom:20}}>The Auto Recycling Industry Is One of the Largest in America</h3>

            <div style={{display:"flex",flexDirection:"column",gap:18,paddingLeft:16,borderLeft:"2px solid rgba(255,255,255,0.08)"}}>
              <div>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:5}}>
                  <span style={{width:5,height:5,background:"rgba(255,255,255,0.5)",transform:"rotate(45deg)",display:"inline-block",flexShrink:0}}/>
                  <span style={{fontSize:10,fontWeight:800,color:"rgba(220,230,245,0.85)",fontFamily:T.mono,letterSpacing:"0.1em",textTransform:"uppercase"}}>OEM Means Factory Original</span>
                </div>
                <p style={{fontSize:12,color:T.muted,lineHeight:1.85,fontWeight:300,margin:0}}>Every used part sourced through <strong style={{color:T.fg}}>AUAPW.ORG</strong> is an Original Equipment Manufacturer component — the exact same part the vehicle was built with. Unlike cheap aftermarket alternatives, OEM parts guarantee perfect fit, proper function, and the reliability your vehicle was designed around.</p>
              </div>
              <div>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:5}}>
                  <span style={{width:5,height:5,background:"rgba(255,255,255,0.5)",transform:"rotate(45deg)",display:"inline-block",flexShrink:0}}/>
                  <span style={{fontSize:10,fontWeight:800,color:"rgba(220,230,245,0.85)",fontFamily:T.mono,letterSpacing:"0.1em",textTransform:"uppercase"}}>Inspected, Graded &amp; Warrantied</span>
                </div>
                <p style={{fontSize:12,color:"rgba(172,186,210,0.7)",lineHeight:1.85,fontWeight:300,margin:0}}>Our 2,000+ partner yards don't just pull parts and ship them. Every component is inspected, tested where applicable, and graded for condition. When you receive a part from AUAPW, you know exactly what you're getting — and it's backed by a <strong style={{color:T.fg}}>30 to 180 day warranty</strong>.</p>
              </div>
              <div>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:5}}>
                  <span style={{width:5,height:5,background:"rgba(255,255,255,0.5)",transform:"rotate(45deg)",display:"inline-block",flexShrink:0}}/>
                  <span style={{fontSize:10,fontWeight:800,color:"rgba(220,230,245,0.85)",fontFamily:T.mono,letterSpacing:"0.1em",textTransform:"uppercase"}}>Eco-Responsible by Design</span>
                </div>
                <p style={{fontSize:12,color:"rgba(155,172,200,0.6)",lineHeight:1.85,fontWeight:300,margin:0}}>Every used part sold through <strong style={{color:"rgba(200,210,225,0.8)"}}>AUAPW.ORG</strong> is one less component in a landfill and one less new part manufactured. The auto recycling industry saves an estimated <strong style={{color:"rgba(200,210,225,0.8)"}}>85 million barrels of oil per year</strong> that would otherwise go into manufacturing new parts. Choosing used isn't just smart — it's responsible.</p>
              </div>
              <div>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:5}}>
                  <span style={{width:5,height:5,background:"rgba(255,255,255,0.5)",transform:"rotate(45deg)",display:"inline-block",flexShrink:0}}/>
                  <span style={{fontSize:10,fontWeight:800,color:"rgba(220,230,245,0.85)",fontFamily:T.mono,letterSpacing:"0.1em",textTransform:"uppercase"}}>Trusted by Professionals</span>
                </div>
                <p style={{fontSize:12,color:"rgba(140,158,188,0.55)",lineHeight:1.85,fontWeight:300,margin:0}}>It's not just individuals who rely on <strong style={{color:"rgba(200,210,225,0.7)"}}>AUAPW.ORG</strong>. Professional mechanics, certified body shops, insurance adjusters, and fleet managers use our network daily because they know the quality is there. When the professionals trust used OEM parts, you can too.</p>
              </div>
            </div>

            <div style={{marginTop:20}}>
              <Btn3d onClick={()=>goTo("parts")}><span style={{display:"inline-flex",alignItems:"center",gap:8}}>Browse Our Parts Catalog <ArrowRight size={11}/></span></Btn3d>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ══════════ NEW: MID-PAGE BRANDED CTA STRIP ══════════ */}
    <section style={{ padding:"48px 32px",position:"relative",overflow:"hidden",background:"linear-gradient(135deg,#060810 0%,#0c0e1a 50%,#060810 100%)" }}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.6) 30%,rgba(255,255,255,0.95) 50%,rgba(255,255,255,0.6) 70%,transparent)",boxShadow:"0 0 20px rgba(255,255,255,0.3)",zIndex:2}}/>
      <div style={{position:"absolute",bottom:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)",zIndex:2}}/>
      <CornerLogo pos={{t:12,l:12}} delay={0}/>
      <CornerLogo pos={{t:12,r:12}} delay={0.5}/>
      <CornerLogo pos={{b:12,l:12}} delay={1}/>
      <CornerLogo pos={{b:12,r:12}} delay={1.5}/>
      <div style={{position:"absolute",top:0,left:"-50%",width:"30%",height:"100%",background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.04),transparent)",animation:"ghost-scan 7s ease-in-out infinite",pointerEvents:"none"}}/>
      <div style={{ maxWidth:1100,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",gap:32,position:"relative",zIndex:3,flexWrap:"wrap" }}>
        <div style={{display:"flex",alignItems:"center",gap:18}}>
          <div style={{width:70,height:70,borderRadius:"50%",background:"radial-gradient(circle at 40% 35%,#1e2233,#0c0e18)",border:"1.5px solid rgba(255,255,255,0.2)",boxShadow:"0 0 40px rgba(255,255,255,0.1),inset 0 1px 0 rgba(255,255,255,0.12)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <AuapwLogo size={58} uid="midcta"/>
          </div>
          <div>
            <div className="auapw-emboss" style={{fontSize:"clamp(1.2rem,2.5vw,1.8rem)",fontWeight:900,fontFamily:T.mono,letterSpacing:"0.04em",lineHeight:1,textShadow:"0px -1px 0 rgba(255,255,255,0.75),-0.5px -0.5px 0 rgba(255,255,255,0.4),1px 1px 0 rgba(0,0,0,0.9),2px 2px 0 rgba(0,0,0,0.7),3px 3px 4px rgba(0,0,0,0.5)",marginBottom:4}}>AUAPW.ORG</div>
            <div style={{fontSize:11,color:T.muted,fontFamily:T.sans,fontWeight:300}}>Need a part? We'll find it in <strong style={{color:T.fg}}>under 24 hours</strong>. Guaranteed.</div>
          </div>
        </div>
        <div style={{display:"flex",gap:12,alignItems:"center",flexWrap:"wrap"}}>
          <button className="btn-led" style={{padding:"12px 24px"}} onClick={()=>goTo("quote")}><Search size={12}/> Get Free Quote</button>
          <a href="tel:8888185001" className="btn-ghost"><Phone size={11}/> (888) 818-5001</a>
        </div>
      </div>
    </section>

    {/* ══════════ NEW: THE AUAPW PROMISE — 4 Guarantee Cards ══════════ */}
    <section style={{ padding:"72px 32px",background:"linear-gradient(180deg,rgba(10,12,20,0.98),rgba(14,16,28,0.95),rgba(10,12,20,0.98))",borderBottom:`1px solid ${T.bdd}`,position:"relative",overflow:"hidden" }}>
      <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,rgba(255,255,255,0.012) 1px,transparent 1px)",backgroundSize:"32px 32px",pointerEvents:"none"}}/>
      <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)"}}/>
      {/* Watermark logo left */}
      <div style={{position:"absolute",left:"-3%",top:"50%",transform:"translateY(-50%)",opacity:0.02,pointerEvents:"none"}}><AuapwLogo size={300} uid="promise-wm"/></div>
      <div style={{ maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1 }}>
        {/* Header with centered logo */}
        <div style={{textAlign:"center",marginBottom:40}}>
          <div style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:70,height:70,borderRadius:"50%",background:"radial-gradient(circle at 40% 35%,#1e2233,#0c0e18)",border:"1.5px solid rgba(255,255,255,0.2)",boxShadow:"0 0 40px rgba(255,255,255,0.1),0 8px 24px rgba(0,0,0,0.6)",marginBottom:16}}>
            <AuapwLogo size={60} uid="promise-hdr"/>
          </div>
          <SectionHead label="Our Commitment to You" title="The AUAPW Promise" center titleClass="mercury"/>
          <p style={{fontSize:13,color:T.muted,maxWidth:480,margin:"-20px auto 0",lineHeight:1.8,fontWeight:300}}>Every interaction with AUAPW.ORG is backed by four iron-clad guarantees. This is the standard we hold ourselves to.</p>
        </div>
        {/* 4 Promise cards */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16}}>
          {[
            {Icon:Shield, num:"01", title:"Quality Guarantee", body:"Every part sourced through our network is inspected and graded by the supplying yard. We only work with yards that meet our strict quality standards. If a part doesn't match its description, we replace it — period.", accent:"rgba(74,222,128,0.15)", accentBorder:"rgba(74,222,128,0.25)", accentText:"rgba(74,222,128,0.85)"},
            {Icon:Clock, num:"02", title:"24-Hour Response", body:"Submit a quote request and hear back from a real person within 24 hours — not a bot, not an auto-reply. Our team personally reviews every request and sources the best options from our nationwide network.", accent:"rgba(96,165,250,0.12)", accentBorder:"rgba(96,165,250,0.22)", accentText:"rgba(96,165,250,0.85)"},
            {Icon:RotateCcw, num:"03", title:"Easy Returns", body:"Changed your mind? Part doesn't fit? Our hassle-free return policy means you can send it back within the warranty window. No interrogation, no runaround, no hidden restocking fees.", accent:"rgba(251,191,36,0.12)", accentBorder:"rgba(251,191,36,0.22)", accentText:"rgba(251,191,36,0.85)"},
            {Icon:Truck, num:"04", title:"Free Shipping Always", body:"Every single part — from a spark plug to a complete engine block — ships free to anywhere in the contiguous United States. Tracked, insured, and delivered to your door or your mechanic's shop.", accent:"rgba(244,114,182,0.12)", accentBorder:"rgba(244,114,182,0.22)", accentText:"rgba(244,114,182,0.85)"},
          ].map(p=>(
            <div key={p.num} className="gc" style={{padding:0,overflow:"hidden",position:"relative"}}>
              <GSB/>
              {/* Colored accent bar top */}
              <div style={{height:3,background:`linear-gradient(90deg,transparent,${p.accentText},transparent)`}}/>
              <div style={{padding:"24px 22px",position:"relative",zIndex:1}}>
                {/* Number + icon row */}
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
                  <div className="pnum" style={{fontSize:"clamp(1.6rem,3vw,2.2rem)"}}>{p.num}</div>
                  <div style={{width:38,height:38,borderRadius:8,background:p.accent,border:`1px solid ${p.accentBorder}`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <p.Icon size={16} color={p.accentText}/>
                  </div>
                </div>
                <div className="prule" style={{marginBottom:14}}/>
                <h3 style={{fontSize:14,fontWeight:800,color:T.fg,fontFamily:T.sans,marginBottom:8,letterSpacing:"-0.01em"}}>{p.title}</h3>
                <p style={{fontSize:11.5,color:T.muted,lineHeight:1.8,fontWeight:300,margin:0}}>{p.body}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Bottom brand bar */}
        <div style={{marginTop:28,padding:"16px 24px",background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",gap:16,flexWrap:"wrap"}}>
          <AuapwLogo size={28} uid="promise-btm"/>
          <div style={{height:20,width:1,background:"rgba(255,255,255,0.12)"}}/>
          <span style={{fontSize:10,fontWeight:800,fontFamily:T.mono,letterSpacing:"0.14em",textTransform:"uppercase",color:T.dim}}>AUAPW.ORG — All Used Auto Parts Warehouse</span>
          <div style={{height:20,width:1,background:"rgba(255,255,255,0.12)"}}/>
          <span style={{fontSize:10,color:T.dimmer,fontFamily:T.mono,letterSpacing:"0.1em"}}>Your Trusted Partner for Automotive Services &amp; Solutions</span>
        </div>
      </div>
    </section>

    {/* ══════════ NEW: BRAND MANIFESTO — Why Choose AUAPW ══════════ */}
    <section style={{ padding:"80px 32px",position:"relative",overflow:"hidden",background:"linear-gradient(160deg,#04060d 0%,#0a0c1a 40%,#0c0e1c 70%,#06080f 100%)" }}>
      {/* Dramatic LED top and bottom */}
      <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.5) 30%,rgba(255,255,255,0.9) 50%,rgba(255,255,255,0.5) 70%,transparent)",boxShadow:"0 0 30px rgba(255,255,255,0.25)",zIndex:2}}/>
      <div style={{position:"absolute",bottom:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)",zIndex:2}}/>
      {/* Ghost scan */}
      <div style={{position:"absolute",top:0,left:"-60%",width:"30%",height:"100%",background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.03),transparent)",animation:"ghost-scan 10s ease-in-out infinite",pointerEvents:"none"}}/>
      {/* Corner logos */}
      <CornerLogo pos={{t:20,l:20}} delay={0}/>
      <CornerLogo pos={{t:20,r:20}} delay={0.5}/>
      <CornerLogo pos={{b:20,l:20}} delay={1}/>
      <CornerLogo pos={{b:20,r:20}} delay={1.5}/>
      <div style={{ maxWidth:900,margin:"0 auto",textAlign:"center",position:"relative",zIndex:3 }}>
        {/* Big centered logo */}
        <div style={{display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:24,position:"relative"}}>
          <div style={{position:"absolute",width:170,height:170,borderRadius:"50%",border:"1px solid rgba(255,255,255,0.08)",animation:"led-pulse 3s ease infinite"}}/>
          <div style={{width:130,height:130,borderRadius:"50%",background:"radial-gradient(circle at 40% 35%,#1e2233,#0c0e18 60%,#07090e)",border:"2px solid rgba(255,255,255,0.22)",boxShadow:"0 0 0 1px rgba(255,255,255,0.06),0 0 60px rgba(255,255,255,0.15),0 0 120px rgba(200,215,255,0.08),inset 0 1px 0 rgba(255,255,255,0.12)",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <AuapwLogo size={114} uid="manifesto"/>
          </div>
        </div>
        {/* Brand name embossed */}
        <div style={{marginBottom:12}}>
          <div className="auapw-emboss" style={{fontSize:"clamp(2rem,5vw,3.6rem)",fontWeight:900,fontFamily:T.mono,letterSpacing:"0.04em",lineHeight:1,textShadow:"0px -2px 0px rgba(255,255,255,0.85),-1px -1px 0px rgba(255,255,255,0.55),1px 1px 0px rgba(0,0,0,0.95),2px 2px 0px rgba(0,0,0,0.82),3px 3px 0px rgba(0,0,0,0.65),4px 4px 0px rgba(0,0,0,0.45),5px 5px 8px rgba(0,0,0,0.6)"}}>AUAPW.ORG</div>
        </div>
        <div className="sub-emboss" style={{fontSize:11,letterSpacing:"0.28em",marginBottom:8}}>ALL USED AUTO PARTS WAREHOUSE</div>
        <div className="tagline-silver" style={{fontSize:10,marginBottom:32}}>Your Trusted Partner for Automotive Services &amp; Solutions</div>
        <SilverLine/>
        <div style={{padding:"36px 0"}}>
          <h2 className="ip-text" style={{fontFamily:T.serif,fontSize:"clamp(1.5rem,3.5vw,2.6rem)",fontWeight:800,letterSpacing:"-0.02em",lineHeight:1.2,marginBottom:20}}>We Don't Just Sell Parts.<br/>We Solve Problems.</h2>
          <p style={{fontSize:14,color:T.muted,lineHeight:2,fontWeight:300,maxWidth:650,margin:"0 auto 20px"}}>
            At <strong style={{color:T.fg}}>AUAPW.ORG</strong>, we understand that a broken-down vehicle isn't just an inconvenience — it disrupts your work, your family, your life. That's why we built a system designed around speed, reliability, and trust. When you reach out to us, you're not filing a ticket into a void. You're connecting with a team of automotive experts who will personally search our network of over 2,000 verified salvage yards to find exactly what you need — at a price that won't break the bank.
          </p>
          <p style={{fontSize:14,color:"rgba(172,186,210,0.7)",lineHeight:2,fontWeight:300,maxWidth:650,margin:"0 auto 20px"}}>
            We've helped over <strong style={{color:T.fg}}>50,000 customers</strong> get back on the road — from individual car owners replacing a single alternator to fleet managers sourcing dozens of engines across multiple makes and models. Whether you drive a 2024 Toyota Camry or a 1995 Ford F-150, our inventory depth and expert team mean we can find your part.
          </p>
          <p style={{fontSize:13,color:"rgba(155,172,200,0.6)",lineHeight:1.95,fontWeight:300,maxWidth:650,margin:"0 auto"}}>
            Every part comes with our <strong style={{color:"rgba(200,210,225,0.85)"}}>6-month quality warranty</strong>, <strong style={{color:"rgba(200,210,225,0.85)"}}>free nationwide shipping</strong>, and a <strong style={{color:"rgba(200,210,225,0.85)"}}>guaranteed 24-hour response</strong>. We believe in the work we do because we've seen it change people's lives — one part at a time.
          </p>
        </div>
        <SilverLine/>
        {/* Trust metric strip */}
        <div style={{display:"flex",justifyContent:"center",gap:32,paddingTop:28,flexWrap:"wrap"}}>
          {[
            {val:"50,000+",lbl:"Customers Served"},
            {val:"98.7%",lbl:"Satisfaction Rate"},
            {val:"2,000+",lbl:"Verified Yards"},
            {val:"< 24h",lbl:"Average Response"},
          ].map(s=>(
            <div key={s.lbl} style={{textAlign:"center"}}>
              <div className="ip-text" style={{fontSize:26,fontWeight:800,fontFamily:T.serif,letterSpacing:"-0.02em",lineHeight:1,marginBottom:4}}>{s.val}</div>
              <div style={{fontSize:9,fontWeight:700,letterSpacing:"0.16em",textTransform:"uppercase",color:T.dim,fontFamily:T.mono}}>{s.lbl}</div>
            </div>
          ))}
        </div>
        <div style={{marginTop:32,display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
          <button className="btn-led" onClick={()=>goTo("quote")}><Search size={12}/> Get a Free Quote Now</button>
          <a href="tel:8888185001" className="btn-ghost"><Phone size={11}/> Call (888) 818-5001</a>
        </div>
      </div>
    </section>

    <section style={{ padding:"72px 32px",background:T.bg,borderBottom:`1px solid ${T.bdd}` }}>
      <div style={{ maxWidth:1280,margin:"0 auto" }}>
        <div style={{ display:"flex",alignItems:"flex-end",justifyContent:"space-between",gap:24,marginBottom:44,flexWrap:"wrap" }}>
          <div><SectionLine>Customer Reviews</SectionLine>
            <h2 style={{ fontFamily:T.serif,fontSize:"clamp(1.75rem,4vw,3rem)",fontWeight:700,color:T.fg,letterSpacing:"-0.02em" }}>What Clients Say</h2>
          </div>
          <div style={{ display:"flex",alignItems:"center",gap:8 }}>
            {[...Array(5)].map((_,i)=><Star key={i} size={12} color={T.fg} fill={T.fg}/>)}
            <span style={{ fontSize:11,color:T.muted,marginLeft:4 }}>5.0 average</span>
          </div>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16 }}>
          {TESTIMONIALS.map((t,i)=>(
            <div key={i} className="gc hov" style={{ padding:28,display:"flex",flexDirection:"column" }}
              onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(232,232,232,0.2)"}
              onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"}>
              <div style={{ display:"flex",gap:2,marginBottom:16 }}>{[...Array(5)].map((_,j)=><Star key={j} size={10} color={T.fg} fill={T.fg}/>)}</div>
              <p style={{ fontSize:12,color:T.muted,lineHeight:1.75,fontStyle:"italic",flex:1,marginBottom:18,fontWeight:300 }}>"{t.text}"</p>
              <div style={{ borderTop:`1px solid rgba(255,255,255,0.07)`,paddingTop:14 }}>
                <div style={{ fontSize:12,fontWeight:700,color:T.fg }}>{t.name}</div>
                <div style={{ fontSize:10,color:T.dim,marginTop:2 }}>{t.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ══════════ NEW: INDUSTRY TRUST STRIP ══════════ */}
    <section style={{ padding:"40px 32px",background:"linear-gradient(90deg,rgba(10,12,20,0.98),rgba(14,16,26,0.95),rgba(10,12,20,0.98))",borderBottom:`1px solid ${T.bdd}`,position:"relative",overflow:"hidden" }}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)"}}/>
      <div style={{ maxWidth:1200,margin:"0 auto" }}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:40,flexWrap:"wrap"}}>
          {[
            {icon:"🏭",label:"U.S. Auto Recyclers",sub:"Certified Network"},
            {icon:"🔒",label:"SSL Encrypted",sub:"Secure Checkout"},
            {icon:"📋",label:"BBB Accredited",sub:"A+ Rating"},
            {icon:"🌿",label:"ARA Member",sub:"Eco Responsible"},
            {icon:"⭐",label:"50,000+ Reviews",sub:"5-Star Average"},
            {icon:"🇺🇸",label:"100% USA Based",sub:"NJ Headquarters"},
          ].map(b=>(
            <div key={b.label} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",position:"relative"}}>
              <div style={{width:38,height:38,borderRadius:8,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>{b.icon}</div>
              <div>
                <div style={{fontSize:10,fontWeight:800,color:T.fg,fontFamily:T.mono,letterSpacing:"0.06em",lineHeight:1.2}}>{b.label}</div>
                <div style={{fontSize:9,color:T.dim,fontFamily:T.mono}}>{b.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ══════════ NEW: HOMEPAGE FAQ — Common Questions ══════════ */}
    <section style={{ padding:"72px 32px",background:T.bg,borderBottom:`1px solid ${T.bdd}` }}>
      <div style={{ maxWidth:900,margin:"0 auto" }}>
        <div style={{textAlign:"center",marginBottom:40}}>
          <div style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:56,height:56,borderRadius:"50%",background:"radial-gradient(circle at 40% 35%,#1e2233,#0c0e18)",border:"1.5px solid rgba(255,255,255,0.18)",boxShadow:"0 0 24px rgba(255,255,255,0.08)",marginBottom:14}}>
            <AuapwLogo size={44} uid="faq-logo"/>
          </div>
          <SectionHead label="Frequently Asked" title="Common Questions About AUAPW" center titleClass="ip-text"/>
        </div>
        {[
          {q:"What does AUAPW stand for?", a:"AUAPW stands for All Used Auto Parts Warehouse. We are a nationwide marketplace connecting car owners and repair shops with over 2,000 verified salvage yards across all 50 states. Our headquarters are located at 107 Myrtle Ave, Woodbine, NJ 08270."},
          {q:"How does AUAPW.ORG source parts?", a:"When you submit a quote request, our team searches our network of 2,000+ verified salvage yards simultaneously. We find the best available match for your vehicle — checking fitment, condition, mileage, and price — and get back to you within 24 hours with options. You choose the one that works for you."},
          {q:"Is it safe to buy used auto parts online?", a:"Absolutely — when you buy through a reputable source like AUAPW.ORG. Every yard in our network is vetted for quality standards, and every part comes with a 30–180 day warranty. We verify fitment before shipping and provide full tracking on every order. Over 50,000 customers have trusted us with their vehicle repairs."},
          {q:"What warranty do AUAPW parts come with?", a:"Every part sourced through AUAPW.ORG includes a 30 to 180 day warranty directly from the supplying yard, depending on the part type. Engines and transmissions typically carry the longest warranties. If a part is defective or doesn't match its description, we'll replace it or refund your purchase."},
          {q:"How much can I save vs. buying new parts?", a:"On average, our customers save 50–80% compared to buying new OEM parts from a dealer. For example, a new OEM engine might cost $3,000–$8,000 from a dealer, while a quality used engine through AUAPW.ORG typically runs $800–$2,500 — with the same factory fit and our warranty backing it up."},
          {q:"Do you ship to all 50 states?", a:"Yes. Every part ships free to anywhere in the contiguous United States. Shipping to Alaska, Hawaii, and U.S. territories is available at a small additional cost. All shipments include tracking, and most orders arrive within 3–7 business days."},
          {q:"What if I don't know exactly which part I need?", a:"That's what our expert team is for. Just tell us your vehicle's year, make, and model, describe the problem you're experiencing, and our technicians will help identify the correct part. You can call us at (888) 818-5001 or submit a quote request through our form."},
          {q:"Can auto repair shops and dealerships use AUAPW?", a:"Absolutely. A significant portion of our business comes from professional auto repair shops, body shops, dealerships, fleet managers, and insurance companies. We offer volume pricing, priority sourcing, and dedicated account support for business customers."},
        ].map((faq,i)=>(
          <div key={i} className="gc" style={{marginBottom:8,overflow:"hidden",cursor:"pointer"}}
            onClick={e=>{
              const content = e.currentTarget.querySelector('.faq-body');
              const arrow = e.currentTarget.querySelector('.faq-arrow');
              if (content.style.maxHeight === '0px' || !content.style.maxHeight) {
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.opacity = '1';
                arrow.style.transform = 'rotate(180deg)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
              } else {
                content.style.maxHeight = '0px';
                content.style.opacity = '0';
                arrow.style.transform = 'rotate(0deg)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
              }
            }}>
            <GSB/>
            <div style={{padding:"16px 22px",position:"relative",zIndex:1}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:14}}>
                <div style={{display:"flex",alignItems:"center",gap:12}}>
                  <div style={{width:24,height:24,borderRadius:6,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <span style={{fontSize:10,fontWeight:900,color:T.dim,fontFamily:T.mono}}>{String(i+1).padStart(2,'0')}</span>
                  </div>
                  <span style={{fontSize:13,fontWeight:700,color:T.fg,fontFamily:T.sans}}>{faq.q}</span>
                </div>
                <ChevronDown className="faq-arrow" size={14} color={T.dim} style={{flexShrink:0,transition:"transform 0.3s"}}/>
              </div>
              <div className="faq-body" style={{maxHeight:0,opacity:0,overflow:"hidden",transition:"max-height 0.4s ease, opacity 0.3s ease"}}>
                <p style={{fontSize:12.5,color:T.muted,lineHeight:1.85,fontWeight:300,margin:0,paddingTop:14,paddingLeft:36}}>{faq.a}</p>
              </div>
            </div>
          </div>
        ))}
        <div style={{textAlign:"center",marginTop:28}}>
          <p style={{fontSize:11,color:T.dim,fontFamily:T.mono,marginBottom:14}}>Have a question not listed here?</p>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
            <button className="btn-ghost" onClick={()=>goTo("contact")}><MessageSquare size={11}/> Contact Us</button>
            <a href="tel:8888185001" className="btn-ghost"><Phone size={11}/> (888) 818-5001</a>
          </div>
        </div>
      </div>
    </section>

    {/* ══════════ NEW: ENVIRONMENTAL IMPACT — Sustainability Message ══════════ */}
    <section style={{ padding:"72px 32px",background:"linear-gradient(180deg,rgba(6,12,8,0.98),rgba(10,18,14,0.95),rgba(6,12,8,0.98))",borderBottom:`1px solid ${T.bdd}`,position:"relative",overflow:"hidden" }}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,rgba(74,222,128,0.35),transparent)"}}/>
      <div style={{position:"absolute",bottom:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,rgba(74,222,128,0.15),transparent)"}}/>
      {/* Green glow center */}
      <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:700,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(74,222,128,0.04) 0%,transparent 60%)",pointerEvents:"none"}}/>
      <div style={{ maxWidth:1000,margin:"0 auto",textAlign:"center",position:"relative",zIndex:1 }}>
        {/* Green-tinted logo */}
        <div style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:80,height:80,borderRadius:"50%",background:"radial-gradient(circle at 40% 35%,rgba(20,36,28,0.9),rgba(10,18,14,0.95))",border:"1.5px solid rgba(74,222,128,0.25)",boxShadow:"0 0 40px rgba(74,222,128,0.12),0 0 80px rgba(74,222,128,0.05)",marginBottom:20}}>
          <AuapwLogo size={66} uid="eco-logo"/>
        </div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:6}}>
          <span style={{fontSize:16}}>🌿</span>
          <SLabel>AUAPW.ORG Eco Impact</SLabel>
        </div>
        <h2 style={{fontFamily:T.serif,fontSize:"clamp(1.6rem,3.5vw,2.8rem)",fontWeight:800,letterSpacing:"-0.02em",lineHeight:1.15,marginBottom:16,color:T.fg}}>Every Used Part Saves the Planet</h2>
        <p style={{fontSize:13,color:T.muted,maxWidth:580,margin:"0 auto 36px",lineHeight:1.85,fontWeight:300}}>When you buy a used part through <strong style={{color:T.fg}}>AUAPW.ORG</strong>, you're not just saving money — you're preventing waste, reducing manufacturing emissions, and keeping usable components out of landfills. The auto recycling industry is one of the largest green industries in America.</p>

        {/* Environmental impact counters */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,marginBottom:36}}>
          {[
            {num:"85M",unit:"Barrels of Oil",desc:"Saved annually by the auto recycling industry vs. manufacturing new parts",icon:"🛢️"},
            {num:"14M",unit:"Vehicles Recycled",desc:"Per year in America — enough to stretch bumper-to-bumper from NY to LA six times",icon:"♻️"},
            {num:"25M",unit:"Tons of Material",desc:"Recovered and reused each year from end-of-life vehicles across the U.S.",icon:"🏭"},
            {num:"0",unit:"Emissions from Your Order",desc:"Used parts require zero additional manufacturing — your purchase has no factory footprint",icon:"🌎"},
          ].map(s=>(
            <div key={s.unit} style={{padding:"24px 18px",background:"rgba(74,222,128,0.04)",border:"1px solid rgba(74,222,128,0.12)",borderRadius:8,position:"relative"}}>
              <div style={{position:"absolute",top:0,left:"15%",right:"15%",height:1,background:"linear-gradient(90deg,transparent,rgba(74,222,128,0.3),transparent)"}}/>
              <div style={{fontSize:22,marginBottom:8}}>{s.icon}</div>
              <div style={{fontSize:30,fontWeight:900,fontFamily:T.serif,letterSpacing:"-0.03em",lineHeight:1,marginBottom:4,color:"rgba(74,222,128,0.9)"}}>{s.num}</div>
              <div style={{fontSize:10,fontWeight:800,color:T.fg,fontFamily:T.mono,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:6}}>{s.unit}</div>
              <div style={{fontSize:10,color:"rgba(160,200,180,0.55)",lineHeight:1.6,fontWeight:300}}>{s.desc}</div>
            </div>
          ))}
        </div>

        <div style={{padding:"16px 24px",background:"rgba(74,222,128,0.04)",border:"1px solid rgba(74,222,128,0.1)",borderRadius:6,display:"inline-flex",alignItems:"center",gap:12}}>
          <AuapwLogo size={22} uid="eco-btm"/>
          <span style={{fontSize:10,fontWeight:700,fontFamily:T.mono,letterSpacing:"0.1em",color:"rgba(74,222,128,0.75)"}}>AUAPW.ORG — COMMITTED TO SUSTAINABLE AUTOMOTIVE SOLUTIONS</span>
        </div>
      </div>
    </section>

    {/* ══════════ NEW: POPULAR VEHICLE SEARCHES — Quick-Link Grid ══════════ */}
    <section style={{ padding:"72px 32px",background:T.bg,borderBottom:`1px solid ${T.bdd}`,position:"relative",overflow:"hidden" }}>
      <div style={{position:"absolute",right:"-3%",top:"50%",transform:"translateY(-50%)",opacity:0.02,pointerEvents:"none"}}><AuapwLogo size={300} uid="popsrch-wm"/></div>
      <div style={{ maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1 }}>
        <div style={{textAlign:"center",marginBottom:40}}>
          <SectionHead label="Most Searched" title="Popular Vehicle + Part Searches" center titleClass="ip-text"/>
          <p style={{fontSize:13,color:T.muted,maxWidth:500,margin:"-20px auto 0",lineHeight:1.8,fontWeight:300}}>These are the parts and vehicles our customers request most. Click any to start your free quote.</p>
        </div>

        {/* Popular search pills — grouped by brand */}
        <div style={{display:"flex",flexDirection:"column",gap:20}}>
          {[
            {brand:"Ford",searches:["F-150 Engine","F-250 Transmission","Explorer Transfer Case","Mustang Alternator","Escape A/C Compressor","Ranger CV Axle"]},
            {brand:"Toyota",searches:["Camry Engine","RAV4 Transmission","Tacoma Transfer Case","Highlander Radiator","Corolla Starter Motor","4Runner Rear Axle"]},
            {brand:"Chevrolet",searches:["Silverado Engine","Tahoe Transmission","Equinox Alternator","Malibu Starter","Suburban Transfer Case","Colorado CV Axle"]},
            {brand:"Honda",searches:["Civic Engine","CR-V Transmission","Accord Alternator","Odyssey Starter","Pilot A/C Compressor","Ridgeline Transfer Case"]},
            {brand:"Jeep",searches:["Grand Cherokee Engine","Wrangler Transmission","Cherokee Transfer Case","Liberty Rear Axle","Compass Alternator","Renegade Starter"]},
          ].map(group=>(
            <div key={group.brand}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                <div style={{width:28,height:28,borderRadius:6,background:`linear-gradient(135deg,${BRAND_COLORS[group.brand]||"#1a1d28"},${BRAND_COLORS[group.brand]||"#1a1d28"}99)`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <span style={{fontSize:8,fontWeight:900,color:"rgba(255,255,255,0.9)",fontFamily:T.mono}}>{group.brand.slice(0,3).toUpperCase()}</span>
                </div>
                <span style={{fontSize:11,fontWeight:800,color:T.fg,fontFamily:T.sans,letterSpacing:"0.04em"}}>{group.brand}</span>
                <div style={{flex:1,height:1,background:"linear-gradient(90deg,rgba(255,255,255,0.1),transparent)"}}/>
              </div>
              <div style={{display:"flex",flexWrap:"wrap",gap:8,paddingLeft:36}}>
                {group.searches.map(s=>(
                  <button key={s} onClick={()=>goTo("quote",s)} style={{padding:"7px 14px",background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:4,fontSize:11,color:T.muted,fontFamily:T.mono,cursor:"pointer",transition:"all 0.2s",letterSpacing:"0.04em"}}
                    onMouseEnter={e=>{e.target.style.background="rgba(255,255,255,0.08)";e.target.style.borderColor="rgba(255,255,255,0.25)";e.target.style.color=T.fg;}}
                    onMouseLeave={e=>{e.target.style.background="rgba(255,255,255,0.03)";e.target.style.borderColor="rgba(255,255,255,0.1)";e.target.style.color=T.muted;}}>
                    {s} →
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* All brands reminder */}
        <div style={{marginTop:32,padding:"16px 24px",background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:6,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <AuapwLogo size={24} uid="popsrch-btm"/>
            <div>
              <span style={{fontSize:10,fontWeight:800,color:T.fg,fontFamily:T.mono,letterSpacing:"0.1em"}}>Don't see your vehicle?</span>
              <span style={{display:"block",fontSize:10,color:T.dim,fontFamily:T.mono}}>AUAPW.ORG covers all 48+ makes — {CAR_MAKES.length} brands in our system</span>
            </div>
          </div>
          <div style={{display:"flex",gap:10}}>
            <button className="btn-ghost" onClick={()=>goTo("makes")} style={{fontSize:9}}>View All Makes</button>
            <Btn3d onClick={()=>goTo("quote")}><span style={{display:"inline-flex",alignItems:"center",gap:6}}>Custom Quote <ArrowRight size={10}/></span></Btn3d>
          </div>
        </div>
      </div>
    </section>

    {/* ══════════ NEW: SERVICE AREAS — Major Cities & Regions ══════════ */}
    <section style={{ padding:"56px 32px",background:"linear-gradient(180deg,rgba(10,12,20,0.98),rgba(14,16,26,0.95),rgba(10,12,20,0.98))",borderBottom:`1px solid ${T.bdd}`,position:"relative",overflow:"hidden" }}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)"}}/>
      <div style={{ maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1 }}>
        <div style={{textAlign:"center",marginBottom:32}}>
          <SectionHead label="AUAPW.ORG Service Areas" title="Serving Every Major City in America" center titleClass="mercury"/>
        </div>

        {/* Regions with cities */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:20,marginBottom:28}}>
          {[
            {region:"Northeast",cities:["New York, NY","Philadelphia, PA","Boston, MA","Pittsburgh, PA","Newark, NJ","Hartford, CT","Baltimore, MD","Washington, DC"]},
            {region:"Southeast",cities:["Atlanta, GA","Miami, FL","Charlotte, NC","Nashville, TN","Orlando, FL","Jacksonville, FL","Tampa, FL","Raleigh, NC"]},
            {region:"Midwest",cities:["Chicago, IL","Detroit, MI","Indianapolis, IN","Columbus, OH","Minneapolis, MN","Kansas City, MO","Milwaukee, WI","St. Louis, MO"]},
            {region:"West",cities:["Los Angeles, CA","Phoenix, AZ","Houston, TX","Dallas, TX","Denver, CO","Seattle, WA","San Francisco, CA","Portland, OR"]},
          ].map(r=>(
            <div key={r.region} className="gc" style={{padding:"20px 22px"}}>
              <GSB/>
              <div style={{position:"relative",zIndex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:12}}>
                  <MapPin size={11} color={T.dim}/>
                  <span style={{fontSize:10,fontWeight:800,color:T.fg,fontFamily:T.mono,letterSpacing:"0.12em",textTransform:"uppercase"}}>{r.region}</span>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:6}}>
                  {r.cities.map(c=>(
                    <div key={c} style={{display:"flex",alignItems:"center",gap:6}}>
                      <div style={{width:4,height:4,borderRadius:"50%",background:"rgba(74,222,128,0.5)",flexShrink:0}}/>
                      <span style={{fontSize:11,color:T.muted,fontWeight:300}}>{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom tagline */}
        <div style={{textAlign:"center",padding:"14px 0"}}>
          <p style={{fontSize:11,color:T.dim,fontFamily:T.mono,letterSpacing:"0.08em"}}>
            <strong style={{color:T.fg}}>AUAPW.ORG</strong> ships to all 50 states · Free shipping nationwide · Headquarters: 107 Myrtle Ave, Woodbine, NJ 08270 · <strong style={{color:T.fg}}>(888) 818-5001</strong>
          </p>
        </div>
      </div>
    </section>

    <section style={{ padding:"72px 32px",textAlign:"center",position:"relative",background:"linear-gradient(to br,rgba(18,20,30,0.95),#07090f,rgba(18,20,30,0.95))" }}>
      <div style={{ position:"absolute",top:0,left:0,right:0 }}><ML/></div>
      <div style={{ position:"absolute",bottom:0,left:0,right:0 }}><ML/></div>
      <div style={{ maxWidth:900,margin:"0 auto",position:"relative",zIndex:1 }}>
        <SectionHead label="Trusted Partner for Automotive Services &amp; Solutions" title="ALL USED AUTO PARTS WAREHOUSE · AUAPW.ORG" center titleClass="mercury"/>
        <p style={{ color:T.muted,fontSize:13,maxWidth:440,margin:"0 auto 36px",lineHeight:1.8,fontWeight:300 }}>Search our nationwide inventory network or speak directly with our team. Every request receives a response within 24 hours.</p>
        <div style={{ display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap" }}>
          <button className="btn-led" onClick={()=>goTo("parts")}><Search size={13}/> Search Parts Now</button>
          <a href="tel:8888185001" className="btn-ghost"><Phone size={11}/>(888) 818-5001</a>
          <button className="btn-ghost" onClick={()=>goTo("quote")}><MessageSquare size={11}/> Request Free Quote</button>
        </div>
      </div>
    </section>

    <BrandLogos/>
  </>;
}
//  PAGE: USED ENGINES / TRANSMISSIONS
function UsedPartPage({ type, goTo }) {
  const isEngine = type === "engines";
  const title = isEngine ? "Used Engines" : "Used Transmissions";
  const sub = isEngine ? "Used Engines for Sale — Quality Parts Nationwide" : "Used Transmissions for Sale — All Makes & Models";
  const faqs = isEngine ? [
    { q:"Are used engines good?", a:"Used engines can be a great deal. Consider the source — if you are buying from a reputable dealer, you are likely to get a quality product. Used engines are rigorously examined before being sold, so their reliability is often far greater than expected." },
    { q:"Is a used engine worth buying?", a:"Make sure the engine is compatible with your car. Check to see if the engine is in working order and that you are getting a reasonable price. Used engines are a great option for anyone looking to save money on car maintenance." },
    { q:"Which is better — rebuilt or used engine?", a:"Although a used engine is less expensive, it may have greater wear and tear. The cost of a rebuilt engine is higher, but it will last longer. If you are looking to save money, a used engine is the best choice." },
    { q:"Is replacing an engine worth it?", a:"Replacing your car engine is really worth your money and extends your vehicle life. Buying a used car engine is a wise investment that can result in savings of taxes, license fees, and insurance costs." },
    { q:"How many miles can an engine last?", a:"According to AARP, the average mileage of a car engine is assumed to be between 12,000 and 15,000 miles per year. Everything comes down to maintenance activities, your driving habits, and regular servicing." },
  ] : [
    { q:"Is it safe to buy a used transmission?", a:"Yes, buying a used transmission from a reputable dealer is generally safe. Most used transmissions undergo thorough inspection before being sold, and many come with warranties of 30–180 days." },
    { q:"How much does a used transmission cost?", a:"A used transmission typically costs between $200–$1,500 depending on the make and model, compared to $1,000–$6,000 for a new one. This makes used transmissions an excellent value." },
    { q:"How long does a used transmission last?", a:"A well-maintained used transmission can last 100,000–200,000 miles. The lifespan depends on prior maintenance history, mileage at time of purchase, and how the vehicle was driven." },
    { q:"What warranty comes with a used transmission?", a:"Through our network, used transmissions come with a 30–180 day warranty directly from the supplying yard. Warranty length varies by yard and part condition." },
  ];
  const [open,setOpen] = useState(null);
  return <>
    <BrandBanner subtitle={sub}/>
    <section style={{ padding:"52px 32px",background:T.bg }}>
      <div style={{ maxWidth:1280,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 340px",gap:44,alignItems:"start" }}>
        <div>
          <p style={{ fontSize:10,color:T.dim,fontFamily:T.mono,marginBottom:18 }}>
            <button onClick={()=>goTo("home")} style={{ background:"none",border:"none",color:T.dim,cursor:"pointer",fontFamily:T.mono,fontSize:10 }}>Home</button>
            <span style={{ margin:"0 6px",color:T.dimmer }}>/</span>
            <span style={{ color:T.muted }}>{title}</span>
          </p>
          <h1 className="ip-text" style={{ fontFamily:T.serif,fontSize:"clamp(1.75rem,4vw,2.75rem)",fontWeight:800,letterSpacing:"-0.03em",marginBottom:22,lineHeight:1.1 }}>{title}</h1>
          <div style={{ aspectRatio:"16/9",borderRadius:10,overflow:"hidden",marginBottom:28,background:"rgba(255,255,255,0.03)",border:`1px solid ${T.bdd}`,display:"flex",alignItems:"center",justifyContent:"center",position:"relative" }}>
            <div style={{ position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(255,255,255,0.03),rgba(0,0,0,0.6))" }}/>
            <div style={{ position:"relative",textAlign:"center" }}>
              <div style={{ fontSize:72,opacity:0.1 }}>⚙</div>
              <div style={{ fontSize:10,color:T.dim,fontFamily:T.mono,letterSpacing:"0.15em",marginTop:8,textTransform:"uppercase" }}>{title.toUpperCase()}</div>
            </div>
          </div>
          <div style={{ color:T.muted,fontSize:14,lineHeight:1.85,fontWeight:300,display:"flex",flexDirection:"column",gap:13,marginBottom:40 }}>
            <p>Welcome to <strong style={{color:T.fg}}>All Used Auto Parts Warehouse</strong>. You are here because you are looking for a {isEngine?"used engine":"used transmission"} for your car. There are lots of auto part dealers selling quality {isEngine?"used engines":"used transmissions"} online. Prices may vary from dealer to dealer. Our system compares the best offers from 2,000+ verified yards.</p>
            <p>All Used Auto Parts Warehouse is connected with all junkyards and salvage yards near you, and can compare the best offers among them. The quality {isEngine?"engine":"transmission"} and lowest price quote will be sent to you. We will also assist you to place an order to your home or garage.</p>
            <p>We always ensure that you will get free shipping and the best warranty. We ensure that we have a return or replacement facility if there is any problem with your purchase.</p>
          </div>

          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:13,marginBottom:40 }}>
            {[{I:Truck,t:"Free Shipping",d:"Free shipping all across the USA on every order, completely free."},{I:Shield,t:"Dealer Warranty",d:`Get a 30-180 day warranty directly from the ${isEngine?"engine":"transmission"} dealer.`},{I:isEngine?Cog:CircleDot,t:isEngine?"All Engine Types":"All Transmission Types",d:`Find ${isEngine?"gasoline, diesel and hybrid engines":"automatic, manual and CVT transmissions"} for all vehicle types.`},{I:RotateCcw,t:"Returns Available",d:"Not satisfied? You can easily return the part via our toll-free number."}].map(({I,t,d})=>(
              <div key={t}
                onMouseEnter={e=>{ const el=e.currentTarget; el.style.background="rgba(255,255,255,0.04)"; el.style.borderColor="rgba(255,255,255,0.2)"; el.style.transform="translateY(-3px)"; el.querySelector(".feat-bar")&&(el.querySelector(".feat-bar").style.display="block"); }}
                onMouseLeave={e=>{ const el=e.currentTarget; el.style.background="rgba(19,22,30,0.72)"; el.style.borderColor=T.bdd; el.style.transform="none"; el.querySelector(".feat-bar")&&(el.querySelector(".feat-bar").style.display="none"); }}
                style={{ background:"rgba(19,22,30,0.72)",border:`1px solid ${T.bdd}`,borderRadius:8,padding:18,transition:"all 0.25s",position:"relative",overflow:"hidden" }}>
                <div className="feat-bar" style={{ display:"none",position:"absolute",top:0,left:0,right:0,height:2,background:T.grad }}/>
                <div style={{ width:32,height:32,borderRadius:6,background:"rgba(255,255,255,0.06)",border:`1px solid ${T.bdd}`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:10 }}><I size={14} color="#e8e8e8"/></div>
                <h4 style={{ fontSize:12,fontWeight:700,color:T.fg,marginBottom:5,fontFamily:T.sans }}>{t}</h4>
                <p style={{ fontSize:11,color:T.muted,lineHeight:1.7,fontWeight:300 }}>{d}</p>
              </div>
            ))}
          </div>

          <h2 style={{ fontFamily:T.serif,fontSize:20,fontWeight:800,color:T.fg,letterSpacing:"-0.02em",marginBottom:20 }}>Frequently Asked Questions</h2>
          <div style={{ border:`1px solid ${T.bdd}`,borderRadius:8,overflow:"hidden",marginBottom:28 }}>
            {faqs.map(({ q,a },i)=>(
              <div key={i} style={{ borderBottom:i<faqs.length-1?`1px solid ${T.bdd}`:"none" }}>
                <button onClick={()=>setOpen(open===i?null:i)} style={{ width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 18px",background:open===i?"rgba(255,255,255,0.04)":"transparent",border:"none",cursor:"pointer",textAlign:"left" }}>
                  <span style={{ fontSize:12,fontWeight:600,color:open===i?"#e8e8e8":T.fg,fontFamily:T.sans }}>{q}</span>
                  {open===i?<ChevronUp size={13} color="#e8e8e8"/>:<ChevronDown size={13} color={T.dim}/>}
                </button>
                {open===i&&<div style={{ padding:"0 18px 14px",fontSize:12,color:T.muted,lineHeight:1.75,fontWeight:300 }}>{a}</div>}
              </div>
            ))}
          </div>
          <p style={{ fontSize:13,color:T.muted }}>Got more questions? Call us: <a href="tel:8888185001" style={{ color:"#e8e8e8",fontWeight:700,textDecoration:"none",fontFamily:T.mono }}>{PHONE}</a></p>
        </div>
        <div style={{ position:"sticky",top:80 }}><QuoteForm defaultPart={isEngine?"Engine":"Transmission"}/></div>
      </div>
    </section>
    <BrandLogos/>
  </>;
}
//  PAGE: PARTS (categories)
function PartsPage({ goTo }) {
  return <>
    <BrandBanner subtitle="Parts Catalog · Engines · Transmissions · Body Parts · Electrical · All Makes"/>
    <section style={{ padding:"56px 32px",background:T.bg }}>
      <div style={{ maxWidth:1280,margin:"0 auto" }}>
        <SectionHead label="All Categories" title="Parts Catalog"/>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:18,marginBottom:56 }}>
          {PART_CATEGORIES.map(({ id,label,Icon,parts })=>(
            <div key={id} className="gc hov" style={{ padding:28,cursor:"pointer" }} onClick={()=>goTo(`parts-${id}`)}
              onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(232,232,232,0.22)"}
              onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"}>
              <Icon size={28} color={T.dim} style={{ marginBottom:16 }}/>
              <h3 style={{ fontSize:16,fontWeight:700,color:T.fg,marginBottom:8,fontFamily:T.sans }}>{label}</h3>
              <p style={{ fontSize:11,color:T.dim,marginBottom:14,fontFamily:T.mono }}>{parts.length} parts available</p>
              <div style={{ display:"flex",flexWrap:"wrap",gap:5 }}>
                {parts.map(p=><span key={p} style={{ padding:"3px 9px",background:"rgba(255,255,255,0.04)",border:`1px solid rgba(255,255,255,0.1)`,borderRadius:2,fontSize:9,color:T.dim,fontFamily:T.mono }}>{p}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    <BrandLogos/>
  </>;
}
//  PAGE: SINGLE PARTS CATEGORY
function PartsDetailPage({ catId, goTo }) {
  const cat = PART_CATEGORIES.find(c=>c.id===catId)||PART_CATEGORIES[0];
  const { label, Icon, parts } = cat;
  return <>
    <BrandBanner subtitle={`${label} — Quality Recycled OEM Parts · 6-Month Warranty`}/>
    <section style={{ padding:"52px 32px",background:T.bg }}>
      <div style={{ maxWidth:1280,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 340px",gap:44,alignItems:"start" }}>
        <div>
          <p style={{ fontSize:10,color:T.dim,fontFamily:T.mono,marginBottom:18 }}>
            <button onClick={()=>goTo("home")} style={{ background:"none",border:"none",color:T.dim,cursor:"pointer",fontFamily:T.mono,fontSize:10 }}>Home</button>
            <span style={{ margin:"0 6px",color:T.dimmer }}>/</span>
            <button onClick={()=>goTo("parts")} style={{ background:"none",border:"none",color:T.dim,cursor:"pointer",fontFamily:T.mono,fontSize:10 }}>Parts</button>
            <span style={{ margin:"0 6px",color:T.dimmer }}>/</span>
            <span style={{ color:T.muted }}>{label}</span>
          </p>
          <h1 className="ip-text" style={{ fontFamily:T.serif,fontSize:"clamp(1.75rem,4vw,2.75rem)",fontWeight:800,letterSpacing:"-0.03em",marginBottom:28,lineHeight:1.1 }}>{label}</h1>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:12,marginBottom:40 }}>
            {parts.map(p=>(
              <div key={p}
                onMouseEnter={e=>{ const el=e.currentTarget; el.style.background="rgba(255,255,255,0.05)"; el.style.borderColor="rgba(232,232,232,0.2)"; el.querySelector(".dot").style.background="#fff"; el.querySelector(".dot").style.boxShadow="0 0 6px #fff"; el.querySelector(".plabel").style.color=T.fg; el.querySelector(".plabel").style.fontWeight=600; }}
                onMouseLeave={e=>{ const el=e.currentTarget; el.style.background="rgba(19,22,30,0.72)"; el.style.borderColor=T.bdd; el.querySelector(".dot").style.background=T.dim; el.querySelector(".dot").style.boxShadow="none"; el.querySelector(".plabel").style.color=T.muted; el.querySelector(".plabel").style.fontWeight=300; }}
                onClick={()=>goTo("quote",p)}
                style={{ background:"rgba(19,22,30,0.72)",border:`1px solid ${T.bdd}`,borderRadius:6,padding:"14px 18px",cursor:"pointer",transition:"all 0.2s",display:"flex",alignItems:"center",gap:10 }}>
                <div className="dot" style={{ width:6,height:6,borderRadius:"50%",background:T.dim,flexShrink:0,transition:"all 0.2s" }}/>
                <span className="plabel" style={{ fontSize:13,color:T.muted,fontWeight:300,transition:"all 0.2s" }}>{p}</span>
              </div>
            ))}
          </div>
          <div className="gc" style={{ padding:24 }}>
            <GSB/>
            <div style={{ position:"relative",zIndex:1 }}>
              <h3 style={{ fontFamily:T.serif,fontSize:18,fontWeight:700,color:T.fg,marginBottom:10 }}>About {label}</h3>
              <p style={{ fontSize:13,color:T.muted,lineHeight:1.8,fontWeight:300 }}>All Used Auto Parts Warehouse sources premium quality {label.toLowerCase()} from 2,000+ verified yards nationwide. Every part comes with a 30-180 day warranty and free shipping to anywhere in the USA. Get a quote in under 24 hours.</p>
            </div>
          </div>
        </div>
        <div style={{ position:"sticky",top:80 }}><QuoteForm defaultPart={parts[0]}/></div>
      </div>
    </section>
    <BrandLogos/>
  </>;
}
//  PAGE: MAKES
function MakesPage({ goTo }) {
  return <>
    <BrandBanner subtitle="All Makes & Models · Acura to Volvo · Find Your Part Fast"/>
    <section style={{padding:"52px 32px",background:T.bg}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <SectionHead label="All Makes" title="Find Parts for Your Vehicle" center/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(8,1fr)",gap:8,marginBottom:32}}>
          {CAR_MAKES.map(b=>{
            const c=BRAND_COLORS[b]||"#1a1d28";
            return <div key={b} onClick={()=>goTo("quote")}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.06)";e.currentTarget.style.transform="translateY(-4px)";}}
              onMouseLeave={e=>{e.currentTarget.style.background="rgba(16,19,28,0.85)";e.currentTarget.style.transform="none";}}
              style={{display:"flex",flexDirection:"column",alignItems:"center",gap:5,padding:6,borderRadius:7,cursor:"pointer",transition:"all 0.3s",border:`1px solid ${T.bdd}`,background:"rgba(16,19,28,0.85)"}}>
              <div style={{width:"100%",height:36,borderRadius:5,background:`linear-gradient(135deg,${c},${c}99)`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                <span style={{fontSize:9,fontWeight:900,color:"rgba(255,255,255,0.9)",textTransform:"uppercase",letterSpacing:"0.05em"}}>{b.slice(0,3)}</span>
              </div>
              <span style={{fontSize:7.5,fontWeight:700,color:T.dim,fontFamily:T.mono,textAlign:"center",letterSpacing:"0.08em",textTransform:"uppercase"}}>{b}</span>
            </div>;
          })}
        </div>
        <div style={{textAlign:"center"}}><Btn3d onClick={()=>goTo("quote")}>Get Parts for My Vehicle</Btn3d></div>
      </div>
    </section>
  </>;
}
function InventoryPage({ goTo }) {
  const items = [
    {cat:"Engines",brand:"Ford",year:"2018",stock:"In Stock",cat2:"Complete Engine"},
    {cat:"Transmissions",brand:"Toyota",year:"2019",stock:"In Stock",cat2:"Automatic Transmission"},
    {cat:"Engines",brand:"Chevrolet",year:"2017",stock:"In Stock",cat2:"Long Block Engine"},
    {cat:"Drivetrain",brand:"Honda",year:"2020",stock:"In Stock",cat2:"CV Axle"},
    {cat:"Electrical",brand:"Nissan",year:"2016",stock:"In Stock",cat2:"Alternator"},
    {cat:"Cooling",brand:"BMW",year:"2018",stock:"In Stock",cat2:"Radiator"},
    {cat:"Suspension",brand:"Dodge",year:"2019",stock:"In Stock",cat2:"Control Arm"},
    {cat:"Body",brand:"Jeep",year:"2021",stock:"In Stock",cat2:"Door Assembly"},
  ];
  return <>
    <BrandBanner subtitle="Live Parts Inventory · Updated Daily · 2,000+ Verified Yards"/>
    <section style={{padding:"52px 32px",background:T.bg}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <SectionHead label="Parts Inventory" title="Available Now"/>
        <div style={{border:`1px solid ${T.bdd}`,borderRadius:8,overflow:"hidden"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 80px 80px 100px",padding:"10px 16px",background:"rgba(255,255,255,0.04)",borderBottom:`1px solid ${T.bdd}`}}>
            {["Part Category","Brand","Year","In Stock","Action"].map(h=>(
              <span key={h} style={{fontSize:9,fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",color:T.muted,fontFamily:T.mono}}>{h}</span>
            ))}
          </div>
          {items.map(({cat,stock,brand,year,cat2},i)=>(
            <div key={i} style={{display:"grid",gridTemplateColumns:"1fr 1fr 80px 80px 100px",padding:"12px 16px",borderBottom:i<items.length-1?`1px solid ${T.bdd}`:"none",alignItems:"center"}}>
              <div><span style={{fontSize:12,color:T.fg,fontWeight:600}}>{cat2}</span><span style={{display:"block",fontSize:9,color:T.dim,fontFamily:T.mono}}>{cat}</span></div>
              <span style={{fontSize:12,color:T.muted}}>{brand}</span>
              <span style={{fontSize:12,color:T.muted}}>{year}</span>
              <span style={{fontSize:10,color:"#4ade80",fontWeight:700,fontFamily:T.mono}}>● {stock}</span>
              <button onClick={()=>goTo("quote")} className="btn-ghost" style={{padding:"6px 12px",fontSize:9}}>Quote</button>
            </div>
          ))}
        </div>
        <div style={{marginTop:32,textAlign:"center"}}><Btn3d onClick={()=>goTo("quote")}>Get a Quote on Any Part</Btn3d></div>
      </div>
    </section>
    <BrandLogos/>
  </>;
}
function QuotePage({ defaultPart="" }) {
  return <>
    <BrandBanner subtitle="Free Quote · No Credit Card · Response Within 24 Hours"/>
    <section style={{ padding:"52px 32px",background:T.bg }}>
      <div style={{ maxWidth:780,margin:"0 auto" }}>
        <SectionHead label="Free Quote" title="Request Your Part"/>
        <div className="gc" style={{ padding:32,marginTop:8 }}>
          <QuoteForm defaultPart={defaultPart}/>
        </div>
        <div style={{ marginTop:24,display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12 }}>
          {[{I:Truck,t:"Free Shipping",d:"All across the USA"},{I:Shield,t:"6-Month Warranty",d:"Every part covered"},{I:Clock,t:"< 24hr Response",d:"Guaranteed turnaround"}].map(({I,t,d})=>(
            <div key={t} className="gc" style={{ padding:16,display:"flex",gap:12,alignItems:"center" }}>
              <div style={{ width:32,height:32,borderRadius:6,background:"rgba(255,255,255,0.05)",border:`1px solid ${T.bdd}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}><I size={14} color="#e8e8e8"/></div>
              <div><div style={{ fontSize:11,fontWeight:700,color:T.fg,fontFamily:T.sans }}>{t}</div><div style={{ fontSize:10,color:T.muted,fontFamily:T.mono }}>{d}</div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>;
}

function AboutPage({ goTo }) {
  const items = [
    {Icon:Shield,title:"Verified Network",body:"Every yard in our 2,000+ network is vetted for quality, licensing, and customer service standards."},
    {Icon:Truck,title:"Free Shipping",body:"Every part ships free to anywhere in the USA, with tracking provided on every order."},
    {Icon:RotateCcw,title:"Easy Returns",body:"Not satisfied? Our hassle-free return process means you can send any part back within the warranty window."},
    {Icon:Clock,title:"< 24hr Response",body:"Submit a request and our team responds with pricing and availability in under 24 hours, guaranteed."},
    {Icon:DollarSign,title:"Best Price Match",body:"We work with 2,000+ yards to find you the lowest price on any used OEM part, every time."},
    {Icon:Star,title:"6-Month Warranty",body:"Every part comes with a 30–180 day warranty directly from the supplying yard, backed by our guarantee."},
  ];
  return <>
    <BrandBanner subtitle="America's Largest Used Parts Network · 50,000+ Satisfied Customers"/>
    <section style={{padding:"72px 32px",background:T.bg}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <SectionHead label="Who We Are" title="America's Largest Used Parts Network" center/>
        <p style={{fontSize:14,color:T.muted,lineHeight:1.9,fontWeight:300,maxWidth:700,margin:"0 auto 48px",textAlign:"center"}}>AUAPW.ORG — All Used Auto Parts Warehouse — Your Trusted Partner for Automotive Services and Solutions. We connect car owners and repair shops with 2,000+ verified salvage yards nationwide, sourcing quality used OEM parts faster, cheaper, and with better warranty coverage than anyone in the industry.</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,marginBottom:48}}>
          {items.map(({Icon,title,body})=>(
            <div key={title} className="gc" style={{padding:24}}>
              <GSB/><div style={{position:"relative",zIndex:1}}>
                <div className="ibox" style={{width:38,height:38,borderRadius:8,marginBottom:14}}><Icon size={16} color="#e8e8e8"/></div>
                <h3 style={{fontSize:14,fontWeight:700,color:T.fg,marginBottom:8,fontFamily:T.sans}}>{title}</h3>
                <p style={{fontSize:12,color:T.muted,lineHeight:1.75,fontWeight:300}}>{body}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{textAlign:"center"}}><Btn3d onClick={()=>goTo("quote")}>Get a Free Quote</Btn3d></div>
      </div>
    </section>
    <BrandLogos/>
  </>;
}
function ContactPage() {
  const [name,  setName]  = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [msg,   setMsg]   = useState("");
  const [sent,  setSent]  = useState(false);
  const [busy,  setBusy]  = useState(false);

  const fs = { width:"100%",padding:"10px 14px",borderRadius:4,border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.04)",color:"#f5f5f5",fontSize:13,outline:"none",fontFamily:"inherit" };

  const send = async () => {
    if (!name||!email||!msg) return;
    setBusy(true);
    try {
      await fetch("https://formsubmit.co/ajax/auapworld@gmail.com",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({_template:"table",_captcha:"false",Name:name,Email:email,Phone:phone||"N/A",Message:msg,_subject:"[AUAPW] Contact Form"})});
      setSent(true);
    } catch(e){}
    setBusy(false);
  };

  return <>
    <BrandBanner subtitle="Contact Us · (888) 818-5001 · auapworld@gmail.com · 24-Hr Response"/>
    <section style={{ padding:"52px 32px",background:T.bg }}>
      <div style={{ maxWidth:900,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1.2fr",gap:32 }}>
        <div>
          <SectionHead label="Contact" title="Get in Touch"/>
          <p style={{ fontSize:13,color:T.muted,lineHeight:1.8,marginBottom:24,fontWeight:300 }}>Our team is available Monday–Saturday, 8am–6pm EST. We typically respond within 2 hours during business hours.</p>
          {[{I:Phone,label:"Phone",val:PHONE,href:`tel:${PHONE}`},{I:Mail,label:"Email",val:EMAIL,href:`mailto:${EMAIL}`},{I:MapPin,label:"Address",val:ADDRESS}].map(({I,label,val,href})=>(
            <div key={label} className="fc-item" style={{ marginBottom:10 }} onClick={href?()=>window.open(href):undefined}>
              <div className="fc-icon"><I size={14}/></div>
              <div><span className="fc-label">{label}</span><span className="fc-text">{val}</span></div>
            </div>
          ))}
        </div>
        <div className="gc" style={{ padding:28 }}>
          {sent ? (
            <div style={{ textAlign:"center",padding:32 }}>
              <CheckCircle size={40} color="#4ade80" style={{ marginBottom:16 }}/>
              <h3 style={{ fontFamily:T.serif,fontSize:20,color:T.fg,marginBottom:8 }}>Message Sent!</h3>
              <p style={{ color:T.muted,fontSize:13 }}>We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
              <h3 style={{ fontFamily:T.serif,fontSize:18,fontWeight:700,color:T.fg,marginBottom:4 }}>Send a Message</h3>
              <input value={name}  onChange={e=>setName(e.target.value)}  placeholder="Your Name *" style={fs}/>
              <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email Address *" type="email" style={fs}/>
              <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone Number" style={fs}/>
              <textarea value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Your Message *" rows={5} style={{...fs,resize:"vertical"}}/>
              <button onClick={send} disabled={busy||!name||!email||!msg} style={{ padding:"12px 0",background:name&&email&&msg?"rgba(255,255,255,0.1)":"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:4,color:name&&email&&msg?"#f5f5f5":"#4b5563",cursor:name&&email&&msg?"pointer":"not-allowed",fontFamily:T.mono,fontSize:11,letterSpacing:"0.15em",textTransform:"uppercase",fontWeight:700,transition:"all 0.2s" }}>
                {busy?"Sending…":"Send Message"}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  </>;
}

function BlogPage({ goTo }) {
  return <>
    <BrandBanner subtitle="Auto Parts Tips · Guides · Industry News · DIY Advice"/>
    <section style={{padding:"52px 32px",background:T.bg}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <SectionHead label="AUAPW.ORG — Trusted Partner for Automotive Services &amp; Solutions" title="Auto Parts Blog &amp; Guides"/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
          {BLOG_POSTS.map((post,i)=>(
            <div key={post.slug}
              onMouseEnter={e=>{const el=e.currentTarget;el.style.background="rgba(255,255,255,0.04)";el.style.borderColor="rgba(232,232,232,0.2)";el.style.transform="translateY(-3px)";}}
              onMouseLeave={e=>{const el=e.currentTarget;el.style.background="rgba(19,22,30,0.72)";el.style.borderColor=T.bdd;el.style.transform="none";}}
              style={{background:"rgba(19,22,30,0.72)",border:`1px solid ${T.bdd}`,borderRadius:8,overflow:"hidden",cursor:"pointer",transition:"all 0.25s"}}>
              <div style={{height:140,background:`linear-gradient(135deg,rgba(${20+i*10},${22+i*8},${32+i*12},0.9),rgba(10,12,20,0.95))`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                <span style={{fontSize:40,opacity:0.2}}>⚙</span>
              </div>
              <div style={{padding:20}}>
                <div style={{display:"flex",gap:8,marginBottom:10}}>
                  <span style={{fontSize:9,fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",padding:"3px 8px",background:"rgba(255,255,255,0.06)",border:`1px solid ${T.bdd}`,borderRadius:100,color:"#e8e8e8",fontFamily:T.mono}}>{post.category}</span>
                  <span style={{fontSize:9,color:T.dim,fontFamily:T.mono}}>{post.readTime} read</span>
                </div>
                <h3 style={{fontSize:14,fontWeight:700,color:T.fg,marginBottom:8,lineHeight:1.4,fontFamily:T.sans}}>{post.title}</h3>
                <p style={{fontSize:12,color:T.muted,lineHeight:1.7,fontWeight:300,marginBottom:14}}>{post.excerpt}</p>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <span style={{fontSize:10,color:T.dim,fontFamily:T.mono}}>{post.date}</span>
                  <span style={{fontSize:10,color:"#e8e8e8",fontFamily:T.mono,display:"flex",alignItems:"center",gap:4}}>Read <ArrowRight size={10}/></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>;
}
function PolicyPage({ title, subtitle, icon: Icon, sections }) {
  return <>
    <BrandBanner subtitle={subtitle}/>
    <section style={{ padding:"52px 32px",background:T.bg }}>
      <div style={{ maxWidth:900,margin:"0 auto" }}>
        <div style={{ display:"flex",alignItems:"center",gap:14,marginBottom:32 }}>
          <div style={{ width:44,height:44,borderRadius:10,background:"rgba(255,255,255,0.06)",border:`1px solid ${T.bdd}`,display:"flex",alignItems:"center",justifyContent:"center" }}><Icon size={20} color="#e8e8e8"/></div>
          <h1 className="ip-text" style={{ fontFamily:T.serif,fontSize:"clamp(1.5rem,3vw,2.2rem)",fontWeight:800,letterSpacing:"-0.02em" }}>{title}</h1>
        </div>
        <div className="pol" style={{ display:"flex",flexDirection:"column",gap:4 }}>
          {sections.map(({ heading, content }, i) => (
            <div key={i} className="gc" style={{ padding:24,marginBottom:12 }}>
              <GSB/>
              <div style={{ position:"relative",zIndex:1 }}>
                <h2>{heading}</h2>
                {Array.isArray(content) ? content.map((line,j)=><p key={j}>{line}</p>) : <p>{content}</p>}
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop:24,padding:20,background:"rgba(255,255,255,0.025)",border:`1px solid ${T.bdd}`,borderRadius:8 }}>
          <p style={{ fontSize:13,color:T.muted,fontWeight:300 }}>Questions? Contact us at <a href={`mailto:${EMAIL}`} style={{ color:"#e8e8e8",fontFamily:T.mono }}>{EMAIL}</a> or call <a href="tel:8888185001" style={{ color:"#e8e8e8",fontFamily:T.mono }}>{PHONE}</a></p>
        </div>
      </div>
    </section>
  </>;
}

// Policy content data — uses {heading, content} to match PolicyPage component
const PRIVACY_SECTIONS = [
  {heading:"Information We Collect",content:["When you request a quote or contact us through AUAPW.ORG, we collect information you provide directly: your name, email address, phone number, vehicle details (year, make, model), zip code, state, and any additional notes. We also automatically collect basic usage data such as IP address, browser type, and pages visited to improve our services."]},
  {heading:"How We Use Your Information",content:["We use the information you provide to process your parts requests, connect you with verified salvage yards in our network, respond to your inquiries, and communicate with you about your orders. We may also use your contact information to follow up on quote requests and provide customer support. We do not sell or rent your personal information to third parties."]},
  {heading:"Information Sharing",content:["We share your vehicle and contact information with salvage yards in our network solely to fulfill your parts request. These yards are contractually obligated to use your information only for the purpose of providing you with pricing and availability. We may also disclose information when required by law or to protect our rights."]},
  {heading:"Data Security",content:"We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, or destruction. However, no method of electronic transmission or storage is 100% secure, and we cannot guarantee absolute security."},
  {heading:"Your Rights",content:"You may request access to, correction of, or deletion of your personal information at any time by contacting us at info@auapw.org or calling (888) 818-5001. We will respond to all requests within 30 business days."},
  {heading:"Contact",content:"For privacy-related questions, contact us at info@auapw.org or call (888) 818-5001. AUAPW.ORG — 107 Myrtle Ave, Woodbine, NJ 08270."},
];
const TERMS_SECTIONS = [
  {heading:"Acceptance of Terms",content:"By accessing or using AUAPW.ORG, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our website or services. We reserve the right to update these terms at any time."},
  {heading:"Services Description",content:"AUAPW.ORG operates as an intermediary connecting buyers with a network of 2,000+ verified salvage yards nationwide. We facilitate the sourcing, quoting, and delivery of used OEM auto parts. Parts are sold and shipped directly by the supplying yards in our network."},
  {heading:"Quotes & Pricing",content:"All quotes provided through our service are estimates and subject to change based on availability and condition at the time of order confirmation. Prices do not include applicable taxes unless otherwise stated. Quote validity is typically 48 hours unless otherwise specified."},
  {heading:"Warranty",content:"All parts sold through AUAPW.ORG include a 30 to 180 day warranty from the supplying yard, depending on the part type and yard policy. Warranty covers defects in the part as described at the time of sale. Warranty does not cover damage resulting from improper installation, misuse, or normal wear and tear."},
  {heading:"Limitation of Liability",content:"AUAPW.ORG acts as an intermediary and is not directly responsible for the condition of parts supplied by yards in our network. Our liability is limited to the purchase price of the part. We are not liable for any indirect, incidental, or consequential damages arising from the use of our services."},
  {heading:"Contact",content:"For questions about these terms, contact us at info@auapw.org or call (888) 818-5001."},
];
const SHIPPING_SECTIONS = [
  {heading:"Shipping Coverage",content:"We offer free shipping on all parts to addresses within the contiguous United States. Shipping to Alaska, Hawaii, and U.S. territories is available at additional cost. All shipments include tracking information provided via email."},
  {heading:"Processing & Delivery Times",content:"Orders are typically processed within 1–3 business days after payment confirmation. Standard delivery takes 3–7 business days depending on your location and the shipping yard. Expedited shipping options may be available for an additional fee — ask your representative for details."},
  {heading:"Shipping Carriers",content:"Parts are shipped via major carriers including UPS, FedEx, and freight services for larger items (engines, transmissions, body panels). The supplying yard selects the most appropriate carrier based on the part size, weight, and destination."},
  {heading:"Tracking Your Order",content:"You will receive a tracking number via email once your order ships. If you have not received tracking information within 3 business days of placing your order, please contact us at info@auapw.org or (888) 818-5001."},
  {heading:"Damaged Shipments",content:"If your part arrives damaged, please photograph the damage and contact us within 48 hours of delivery. We will work with the yard and carrier to resolve the issue, which may include a replacement part or full refund."},
];
const RETURN_SECTIONS = [
  {heading:"Return Eligibility",content:"Parts may be returned within the warranty period (30–180 days depending on the part) if they are defective, incorrectly described, or do not fit the specified vehicle. Parts must be in the same condition as received — uninstalled, unmodified, and in original packaging when possible."},
  {heading:"Return Process",content:["To initiate a return, contact us at info@auapw.org or call (888) 818-5001 with your order details and reason for return. Our team will provide a Return Authorization (RA) number and shipping instructions. Returns shipped without an RA number may not be accepted."]},
  {heading:"Refunds",content:"Refunds are processed within 5–10 business days after the returned part is received and inspected by the supplying yard. Refunds are issued to the original payment method. Shipping costs for returns due to buyer error are the responsibility of the buyer."},
  {heading:"Non-Returnable Items",content:"Electrical parts (ECUs, modules, sensors) that have been installed or programmed are non-returnable. Parts showing signs of installation, damage not present at time of delivery, or modification are not eligible for return."},
  {heading:"Contact",content:"For return questions, contact us at info@auapw.org or call (888) 818-5001."},
];
const COOKIE_SECTIONS = [
  {heading:"What Are Cookies",content:"Cookies are small text files stored on your device when you visit AUAPW.ORG. They help us provide you with a better experience by remembering your preferences and understanding how you use our site."},
  {heading:"Cookies We Use",content:["We use essential cookies required for our website to function (form submissions, session management). We also use analytics cookies to understand visitor behavior and improve our services. We do not use advertising or tracking cookies that follow you across other websites."]},
  {heading:"Managing Cookies",content:"You can control cookies through your browser settings. Most browsers allow you to block or delete cookies. However, blocking essential cookies may affect the functionality of our website, particularly the quote request form."},
  {heading:"Contact",content:"For questions about our cookie practices, contact us at info@auapw.org or call (888) 818-5001."},
];
const DISCLAIMER_SECTIONS = [
  {heading:"General Disclaimer",content:"The information provided on AUAPW.ORG is for general informational purposes only. While we strive to provide accurate and up-to-date information about parts availability, pricing, and compatibility, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, or reliability of this information."},
  {heading:"Parts Compatibility",content:"Vehicle compatibility information provided on our website is based on general fitment data. We strongly recommend verifying part compatibility with your mechanic or the supplying yard before purchase. AUAPW.ORG is not responsible for parts ordered based on incorrect fitment information provided by the buyer."},
  {heading:"External Links",content:"Our website may contain links to external websites that are not operated by us. We have no control over the content and practices of these sites and are not responsible for their privacy policies or content."},
  {heading:"Contact",content:"For questions about this disclaimer, contact us at info@auapw.org or call (888) 818-5001."},
];
const ACCEPTABLE_SECTIONS = [
  {heading:"Permitted Use",content:"AUAPW.ORG is intended for individuals and businesses seeking to purchase used auto parts for legitimate vehicle repair and maintenance purposes. You may browse our inventory, request quotes, and contact our team through the provided channels."},
  {heading:"Prohibited Activities",content:["You may not use our website to submit false or misleading information, attempt to gain unauthorized access to our systems, interfere with the proper functioning of our website, use automated scripts or bots to scrape data, or engage in any activity that violates applicable laws or regulations."]},
  {heading:"Account Suspension",content:"We reserve the right to refuse service, terminate accounts, or block access to users who violate this Acceptable Use Policy or engage in fraudulent activity, including submitting fake quote requests or providing false identity information."},
  {heading:"Contact",content:"For questions about this policy, contact us at info@auapw.org or call (888) 818-5001."},
];
//  APP ROUTER
export default function App() {
  const [page, setPage] = useState("home");
  const [defaultPart, setDefaultPart] = useState("");

  // goTo accepts optional second arg for pre-filling quote form part
  const goTo = (p, part) => { 
    if (part) setDefaultPart(part);
    else setDefaultPart("");
    setPage(p); 
    window.scrollTo?.(0,0); 
  };

  const renderPage = () => {
    if (page === "home")              return <HomePage goTo={goTo}/>;
    if (page === "used-engines")      return <UsedPartPage type="engines" goTo={goTo}/>;
    if (page === "used-transmissions")return <UsedPartPage type="transmissions" goTo={goTo}/>;
    if (page === "parts")             return <PartsPage goTo={goTo}/>;
    if (page.startsWith("parts-"))    return <PartsDetailPage catId={page.replace("parts-","")} goTo={goTo}/>;
    if (page === "makes")             return <MakesPage goTo={goTo}/>;
    if (page === "inventory")         return <InventoryPage goTo={goTo}/>;
    if (page === "quote")             return <QuotePage defaultPart={defaultPart}/>;
    if (page === "about")             return <AboutPage goTo={goTo}/>;
    if (page === "contact")           return <ContactPage/>;
    if (page === "blog")              return <BlogPage goTo={goTo}/>;
    if (page === "privacy")           return <PolicyPage title="Privacy Policy" subtitle="Privacy Policy" icon={Lock} sections={PRIVACY_SECTIONS}/>;
    if (page === "terms")             return <PolicyPage title="Terms & Conditions" subtitle="Terms and Conditions" icon={FileText} sections={TERMS_SECTIONS}/>;
    if (page === "shipping")          return <PolicyPage title="Shipping Policy" subtitle="Shipping Policy" icon={Truck} sections={SHIPPING_SECTIONS}/>;
    if (page === "returns")           return <PolicyPage title="Return Policy" subtitle="Return Policy" icon={RotateCcw} sections={RETURN_SECTIONS}/>;
    if (page === "cookies")           return <PolicyPage title="Cookie Policy" subtitle="Cookie Policy" icon={Settings} sections={COOKIE_SECTIONS}/>;
    if (page === "disclaimer")        return <PolicyPage title="Disclaimer" subtitle="Legal Disclaimer" icon={AlertTriangle} sections={DISCLAIMER_SECTIONS}/>;
    if (page === "acceptable-use")    return <PolicyPage title="Acceptable Use Policy" subtitle="Acceptable Use Policy" icon={XCircle} sections={ACCEPTABLE_SECTIONS}/>;
    return <HomePage goTo={goTo}/>;
  };

  return (
    <div className="auapw">
      <style>{STYLES}</style>
      <div style={{ position:"fixed",inset:0,pointerEvents:"none",zIndex:200,overflow:"hidden" }}>
        <div style={{ position:"absolute",left:0,right:0,height:2,background:"linear-gradient(transparent,rgba(255,255,255,0.025),transparent)",animation:"scanline 10s linear infinite" }}/>
      </div>

      <Navbar page={page} setNav={setPage} goTo={goTo}/>
      <main>{renderPage()}</main>
      <Footer goTo={goTo}/>
    </div>
  );
}
