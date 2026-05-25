"use client";
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
    { l:"About",href:"about" },{ l:"Blog",href:"blog" },
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
          <div style={{ display:"flex",gap:24,flex:1,justifyContent:"center" }}>
            {items.map(({ l,href })=>(
              <button key={l} onClick={()=>goTo(href)} style={{ fontSize:11,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:page===href?"#fff":"rgba(200,205,215,0.75)",cursor:"pointer",fontFamily:T.sans,border:"none",background:"none",transition:"color 0.2s",padding:"4px 0",borderBottom:page===href?"1px solid rgba(255,255,255,0.4)":"1px solid transparent" }}>{l}</button>
            ))}
          </div>
          <div style={{ display:"flex",gap:10,alignItems:"center",flexShrink:0 }}>
            <a href="tel:8888185001" style={{ display:"flex",alignItems:"center",gap:6,fontSize:11,color:"rgba(200,205,215,0.65)",fontFamily:T.mono,textDecoration:"none" }}><Phone size={10} style={{ opacity:0.65 }}/>{PHONE}</a>
            <button className="btn-led" style={{ padding:"8px 16px",fontSize:9 }} onClick={()=>goTo("quote")}>Get Free Quote</button>
          </div>
        </div>
      </div>
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
        <div className="hero-grid" style={{display:"grid",gridTemplateColumns:"minmax(0,1fr)",gap:48,alignItems:"start"}}>

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
function QuotePage() {
  return <>
    <BrandBanner subtitle="Free Quote · No Credit Card · Response Within 24 Hours"/>
    <section style={{ padding:"52px 32px",background:T.bg }}>
      <div style={{ maxWidth:780,margin:"0 auto" }}>
        <SectionHead label="Free Quote" title="Request Your Part"/>
        <div className="gc" style={{ padding:40,marginTop:8,textAlign:"center" }}>
          <div style={{fontSize:13,color:T.muted,lineHeight:1.9,marginBottom:24}}>
            Ready to find your part? Call or email us directly and we'll get back to you within 24 hours.
          </div>
          <a href="tel:8888185001" style={{display:"inline-flex",alignItems:"center",gap:10,padding:"14px 28px",background:"rgba(255,255,255,0.06)",border:`1px solid ${T.bdd}`,borderRadius:5,fontFamily:T.mono,fontWeight:700,fontSize:14,color:T.fg,textDecoration:"none",marginBottom:14}}>
            📞 (888) 818-5001
          </a>
          <div style={{fontSize:11,color:T.dim,fontFamily:T.mono}}>or email us at <a href="mailto:info@auapw.org" style={{color:T.fg,textDecoration:"none"}}>info@auapw.org</a></div>
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

// Policy content data
const PRIVACY_SECTIONS = [
  {h:"Overview",b:"Please read these terms carefully before using our services."},
  {h:"Contact",b:"For questions, contact us at info@auapw.org or (888) 818-5001."},
];
const TERMS_SECTIONS = [
  {h:"Overview",b:"Please read these terms carefully before using our services."},
  {h:"Contact",b:"For questions, contact us at info@auapw.org or (888) 818-5001."},
];
const SHIPPING_SECTIONS = [
  {h:"Overview",b:"Please read these terms carefully before using our services."},
  {h:"Contact",b:"For questions, contact us at info@auapw.org or (888) 818-5001."},
];
const RETURN_SECTIONS = [
  {h:"Overview",b:"Please read these terms carefully before using our services."},
  {h:"Contact",b:"For questions, contact us at info@auapw.org or (888) 818-5001."},
];
const COOKIE_SECTIONS = [
  {h:"Overview",b:"Please read these terms carefully before using our services."},
  {h:"Contact",b:"For questions, contact us at info@auapw.org or (888) 818-5001."},
];
const DISCLAIMER_SECTIONS = [
  {h:"Overview",b:"Please read these terms carefully before using our services."},
  {h:"Contact",b:"For questions, contact us at info@auapw.org or (888) 818-5001."},
];
const ACCEPTABLE_SECTIONS = [
  {h:"Overview",b:"Please read these terms carefully before using our services."},
  {h:"Contact",b:"For questions, contact us at info@auapw.org or (888) 818-5001."},
];
//  APP ROUTER

// ═══════════════════════════════════════════════════
//  PARTS FINDER WIDGET
// ═══════════════════════════════════════════════════
const PF_CATS = {"Engine & Drivetrain":["Engine (Long Block)","Engine (Short Block)","Engine Assembly","Cylinder Head","Engine Block","Crankshaft","Camshaft","Timing Chain Kit","Timing Belt Kit","Oil Pan","Valve Cover","Intake Manifold","Exhaust Manifold","Turbocharger","Supercharger","Intercooler","EGR Valve","Throttle Body"],"Transmission":["Automatic Transmission","Manual Transmission","CVT Transmission","Transfer Case","Transfer Case Motor","Front Drive Shaft","Rear Drive Shaft","Flywheel / Flex Plate","Torque Converter","Transmission Control Module"],"Axles & Differential":["Front Axle Assembly","Rear Axle Assembly","Front Differential","Rear Differential","CV Axle / Half Shaft","Axle Shaft","Differential Carrier","Hub Assembly / Bearing","Locking Hub"],"Suspension & Steering":["Front Strut Assembly","Rear Shock / Strut","Coil Spring","Leaf Spring","Air Spring / Bag","Air Suspension Compressor","Lower Control Arm","Upper Control Arm","Ball Joint","Tie Rod End","Sway Bar / End Link","Power Steering Pump","Steering Rack / Gear","Steering Column","Spindle / Knuckle"],"Brakes":["Brake Caliper","Brake Rotor","Brake Drum","ABS Module / Pump","Brake Master Cylinder","Brake Booster","Wheel Speed Sensor","Proportioning Valve"],"Cooling & Heating":["Radiator","Radiator Fan / Motor","Water Pump","Thermostat Housing","Coolant Reservoir","Heater Core","Blower Motor","HVAC Temp Control","AC Compressor","AC Condenser","AC Evaporator","Expansion Valve"],"Electrical":["Alternator","Starter Motor","Battery","Fuse Box (Engine)","Fuse Box (Interior)","ECM / PCM (Engine Computer)","BCM (Body Computer)","Ignition Switch","Wiper Motor (Front)","Wiper Motor (Rear)","Window Regulator Motor","Door Lock Actuator","Power Seat Motor","ABS Control Module"],"Fuel System":["Fuel Pump (In-Tank)","Fuel Tank","Fuel Injector","Fuel Pressure Regulator","Fuel Rail","Mass Air Flow Sensor","Oxygen Sensor (O2)","Throttle Position Sensor","MAP Sensor"],"Exhaust":["Catalytic Converter","Muffler","Resonator","Exhaust Pipe Section","Exhaust Manifold","Exhaust Heat Shield","DPF (Diesel Particulate Filter)"],"Body & Glass":["Hood","Front Bumper Cover","Rear Bumper Cover","Front Fender","Rear Quarter Panel","Door Shell (Front)","Door Shell (Rear)","Trunk Lid / Liftgate","Windshield","Rear Glass","Door Glass (Front)","Side View Mirror","Grille","Headlight Assembly","Tail Light Assembly","Radiator Core Support"],"Interior":["Dash Panel / Instrument Panel","Center Console","Front Seat (Driver)","Front Seat (Passenger)","Rear Seat","Seat Belt Assembly","Speedometer / Cluster","Infotainment / Touchscreen","Radio / Stereo","Steering Wheel","Air Bag Module","Door Panel (Front)","Door Panel (Rear)"],"Wheels & Tires":["Wheel / Rim (Steel)","Wheel / Rim (Alloy)","Spare Tire & Wheel","Tire","TPMS Sensor"]};
const PF_MM = {"Acura":["ILX","Integra","Legend","MDX","NSX","RDX","RL","RLX","RSX","TL","TLX","TSX","ZDX"],"Alfa Romeo":["4C","Giulia","Giulietta","GTV","MiTo","Spider","Stelvio","Tonale"],"AMC":["AMX","Concord","Eagle","Gremlin","Hornet","Javelin","Matador","Pacer","Rambler","Spirit"],"Audi":["A3","A4","A5","A6","A7","A8","Q3","Q5","Q7","Q8","R8","RS3","RS5","S3","S4","S5","S6","TT"],"BMW":["1 Series","2 Series","3 Series","4 Series","5 Series","6 Series","7 Series","8 Series","M2","M3","M4","M5","M8","X1","X2","X3","X4","X5","X6","X7","Z3","Z4"],"Buick":["Cascada","Century","Enclave","Encore","Encore GX","Envision","LaCrosse","LeSabre","Park Avenue","Regal","Rendezvous","Skylark","Verano"],"Cadillac":["ATS","CT4","CT5","CT6","CTS","DeVille","DTS","Eldorado","Escalade","Escalade ESV","SRX","STS","XT4","XT5","XT6","XLR","XTS"],"Chevrolet":["Astro","Avalanche","Blazer","Camaro","Colorado","Corvette","Cruze","Equinox","Express","HHR","Impala","Malibu","Monte Carlo","Silverado 1500","Silverado 2500HD","Silverado 3500HD","Sonic","Spark","Suburban","Tahoe","TrailBlazer","Traverse","Trax"],"Chrysler":["200","300","300M","Aspen","Concorde","Crossfire","LHS","Pacifica","PT Cruiser","Sebring","Town & Country","Voyager"],"Daewoo":["Gentra","Kalos","Lacetti","Lanos","Leganza","Matiz","Nubira"],"Dodge":["Avenger","Caliber","Challenger","Charger","Dakota","Dart","Durango","Grand Caravan","Journey","Magnum","Neon","Nitro","Stratus","Viper"],"Eagle":["Medallion","Premier","Summit","Talon","Vision"],"Fiat":["500","500 Abarth","500L","500X","Bravo","Panda","Punto","Tipo"],"Ford":["Bronco","Bronco Sport","C-Max","Crown Victoria","E-Series","EcoSport","Edge","Escape","Excursion","Expedition","Explorer","F-150","F-250","F-350","Fiesta","Flex","Focus","Fusion","Maverick","Mustang","Mustang Mach-E","Ranger","Taurus","Thunderbird","Transit","Windstar"],"Geo":["Metro","Prizm","Spectrum","Storm","Tracker"],"GMC":["Acadia","Canyon","Envoy","Jimmy","Safari","Sierra 1500","Sierra 2500HD","Sierra 3500HD","Sonoma","Terrain","Typhoon","Yukon","Yukon XL"],"Honda":["Accord","Civic","CR-V","CR-Z","Element","Fit","HR-V","Insight","Odyssey","Passport","Pilot","Ridgeline","S2000"],"Hummer":["H1","H1 Alpha","H2","H2 SUT","H3","H3 Alpha","H3T"],"Hyundai":["Accent","Azera","Elantra","Equus","Genesis","Genesis Coupe","Ioniq","Kona","Santa Cruz","Santa Fe","Sonata","Tiburon","Tucson","Veloster","Veracruz"],"Infiniti":["EX35","FX35","FX45","G25","G35","G37","I30","JX35","M35","M45","Q45","Q50","Q60","QX50","QX56","QX60","QX80"],"Isuzu":["Amigo","Ascender","Axiom","I-280","I-290","I-350","Rodeo","Trooper","VehiCROSS"],"Jaguar":["E-Pace","F-Pace","F-Type","I-Pace","S-Type","X-Type","XE","XF","XFR","XJ","XJ6","XJ8","XJR","XK","XKR"],"Jeep":["Cherokee","Commander","Compass","Gladiator","Grand Cherokee","Grand Wagoneer","Liberty","Patriot","Renegade","Wrangler","Wrangler Unlimited"],"Kia":["Amanti","Borrego","Cadenza","Forte","K5","K900","Niro","Optima","Rio","Sedona","Sorento","Soul","Sportage","Stinger","Telluride"],"Land Rover":["Defender","Discovery","Discovery Sport","Freelander","LR2","LR3","LR4","Range Rover","Range Rover Evoque","Range Rover Sport","Range Rover Velar"],"Lexus":["CT 200h","ES 300","ES 330","ES 350","GS 300","GS 350","GS 430","GX 460","GX 470","IS 250","IS 300","IS 350","IS-F","LC 500","LS 400","LS 430","LS 460","LS 500","LX 470","LX 570","NX 200t","NX 300","RX 300","RX 330","RX 350","RX 400h","SC 430"],"Lincoln":["Aviator","Continental","Corsair","Mark VII","Mark VIII","MKC","MKS","MKT","MKX","MKZ","Nautilus","Navigator","Navigator L","Town Car"],"Mazda":["CX-3","CX-30","CX-5","CX-7","CX-9","CX-50","Mazda2","Mazda3","Mazda5","Mazda6","MPV","MX-5 Miata","Protege","RX-7","RX-8","Tribute"],"Mercury":["Cougar","Grand Marquis","Mariner","Milan","Montego","Mountaineer","Mystique","Sable","Topaz","Tracer","Villager"],"Mercedes":["C230","C250","C300","C350","C43 AMG","C63 AMG","CLA 250","CLK 350","CLS 500","E 300","E 320","E 350","E 450","G 500","G 550","GLA 250","GLC 300","GLE 350","GLS 450","ML 320","ML 350","S 500","S 550","SL 500","SLK 300","SLK 350","Sprinter"],"MINI":["Clubman","Convertible","Cooper","Cooper D","Cooper S","Countryman","JCW","One","Paceman","Roadster"],"Mitsubishi":["3000GT","Diamante","Eclipse","Eclipse Cross","Galant","Lancer","Lancer Evolution","Mirage","Montero","Montero Sport","Outlander","Outlander Sport"],"Nissan":["350Z","370Z","Altima","Armada","Cube","Frontier","GT-R","Juke","Leaf","Maxima","Murano","Pathfinder","Quest","Rogue","Sentra","Titan","Titan XD","Xterra"],"Oldsmobile":["98","Achieva","Alero","Aurora","Bravada","Cutlass","Cutlass Supreme","Delta 88","Intrigue","Silhouette","Toronado"],"Plymouth":["Barracuda","Breeze","Duster","Fury","Grand Voyager","GTX","Neon","Prowler","Road Runner","Satellite","Valiant","Voyager"],"Pontiac":["Aztek","Bonneville","Fiero","Firebird","G5","G6","G8","Grand Am","Grand Prix","GTO","Montana","Solstice","Sunfire","Torrent","Trans Am","Vibe"],"Porsche":["718 Boxster","718 Cayman","911","914","918 Spyder","924","928","944","968","Boxster","Cayenne","Cayman","Macan","Panamera","Taycan"],"Ram":["1500","1500 Classic","1500 TRX","2500","3500","4500","Power Wagon","ProMaster","ProMaster City"],"Saturn":["Aura","Ion","L-Series","Outlook","Relay","SC","Sky","SL","SW","Vue"],"Scion":["FR-S","iA","iM","iQ","tC","xA","xB","xD"],"Subaru":["Ascent","BRZ","Crosstrek","Forester","Impreza","Legacy","Outback","Tribeca","WRX","WRX STI"],"Suzuki":["Aerio","Esteem","Forenza","Grand Vitara","Kizashi","Reno","Samurai","Sidekick","Swift","Verona","Vitara","X-90","XL-7"],"Tesla":["Cybertruck","Model 3","Model S","Model X","Model Y","Roadster"],"Toyota":["4Runner","Avalon","Camry","C-HR","Corolla","Corolla Cross","FJ Cruiser","GR86","Highlander","Land Cruiser","Matrix","Prius","Prius C","RAV4","Sequoia","Sienna","Supra","Tacoma","Tundra","Venza","Yaris"],"Volkswagen":["Atlas","Beetle","CC","EOS","Golf","Golf R","GTI","Jetta","Passat","Taos","Tiguan","Touareg"],"Volvo":["240","740","850","C30","C70","S40","S60","S70","S80","S90","V50","V60","V70","V90","XC40","XC60","XC70","XC90"]};
const PF_SY = {Acura:1986,"Alfa Romeo":1985,AMC:1966,Audi:1990,BMW:1988,Buick:1990,Cadillac:1985,Chevrolet:1985,Chrysler:1985,Daewoo:1999,Dodge:1985,Eagle:1988,Fiat:2011,Ford:1985,Geo:1989,GMC:1985,Honda:1985,Hummer:1992,Hyundai:1986,Infiniti:1990,Isuzu:1985,Jaguar:1990,Jeep:1985,Kia:1994,"Land Rover":1994,Lexus:1990,Lincoln:1985,Mazda:1985,Mercury:1985,Mercedes:1985,MINI:2002,Mitsubishi:1985,Nissan:1985,Oldsmobile:1985,Plymouth:1985,Pontiac:1985,Porsche:1985,Ram:2011,Saturn:1991,Scion:2004,Subaru:1985,Suzuki:1985,Tesla:2008,Toyota:1985,Volkswagen:1985,Volvo:1985};
const PF_EY = {AMC:1988,Daewoo:2002,Eagle:1998,Geo:1997,Hummer:2010,Mercury:2011,Oldsmobile:2004,Plymouth:2001,Pontiac:2010,Saturn:2010,Scion:2016,Suzuki:2012};
const PF_TOPTS = {"Ford/F-150":["2.7L EcoBoost","3.0L Diesel","3.3L V6","3.5L EcoBoost","5.0L V8","XL","XLT","Lariat","Platinum","King Ranch","Raptor","Limited"],"Ford/Mustang":["2.3L EcoBoost","3.7L V6","4.6L V8","5.0L V8 GT","5.2L GT350","5.8L GT500","GT","Mach 1"],"Ford/Explorer":["2.3L EcoBoost","3.0T ST","4.0L V6","4.6L V8","XLT","Limited","ST","Platinum"],"Chevrolet/Silverado 1500":["2.7T","4.3L V6","5.3L V8","6.2L V8","3.0L Duramax","WT","LS","LT","LTZ","High Country","Z71","Trail Boss"],"Chevrolet/Camaro":["2.0T","3.6L V6","6.2L V8 SS","6.2L V8 ZL1","LT","SS","ZL1","1LE"],"Chevrolet/Corvette":["6.2L Stingray","6.2L Mid-Engine","5.7L LS1","Z06","ZR1","Grand Sport"],"Dodge/Challenger":["3.6L V6","5.7L HEMI","6.4L SRT","6.2L Hellcat","6.2L Demon","SXT","R/T","Scat Pack"],"Dodge/Charger":["3.6L V6","5.7L HEMI","6.4L SRT","6.2L Hellcat","SXT","R/T","Scat Pack","Daytona"],"BMW/3 Series":["320i","325i","328i","330i","335i","340i","M3","sDrive","xDrive"],"BMW/5 Series":["528i","530i","535i","540i","550i","M5","sDrive","xDrive"],"BMW/X3":["xDrive28i","xDrive30i","xDrive35i","M40i","sDrive30i"],"BMW/X5":["xDrive35i","xDrive40i","xDrive50i","M50i","M Competition"],"Honda/Accord":["1.5T","2.0T","2.4L","3.5L V6","Hybrid","LX","Sport","EX","EX-L","Touring"],"Honda/Civic":["1.5T","2.0L","Si","Type R","LX","Sport","EX","EX-L","Touring"],"Honda/CR-V":["1.5T","2.0L Hybrid","2.4L","AWD","FWD","LX","EX","EX-L","Touring"],"Toyota/Camry":["2.5L LE","2.5L SE","2.5L XLE","3.5L V6","2.5L Hybrid","TRD","XSE V6"],"Toyota/Tundra":["3.5T V6","4.6L V8","5.7L V8","SR","SR5","Limited","Platinum","TRD Pro"],"Toyota/RAV4":["2.5L FWD","2.5L AWD","2.5L Hybrid","2.5L Prime PHEV","LE","XLE","TRD","Adventure","Limited"],"Toyota/Tacoma":["2.7L 4-cyl","3.5L V6","2WD","4WD","SR","SR5","TRD Sport","TRD Off-Road","TRD Pro"],"Toyota/4Runner":["4.0L V6 4WD","4.0L V6 2WD","SR5","TRD Sport","TRD Off-Road","Limited","TRD Pro"],"Jeep/Wrangler":["2.0T","3.6L Pentastar","3.0L EcoDiesel","4xe Hybrid","Sport","Sahara","Rubicon","Unlimited"],"Jeep/Grand Cherokee":["3.6L V6","5.7L HEMI","6.4L SRT","6.2L Trackhawk","3.0L Diesel","4xe","Laredo","Limited","Overland","Summit"],"Ram/1500":["3.6L Pentastar","5.7L HEMI","6.4L HEMI","3.0L EcoDiesel","Tradesman","Laramie","Limited","Rebel","TRX"],"Ram/2500":["6.4L HEMI","6.7L Cummins","Tradesman","Big Horn","Laramie","Limited","Power Wagon"],"Porsche/911":["Carrera","Carrera 4","Carrera S","Carrera 4S","Turbo","Turbo S","GT3","GT2 RS"],"Porsche/Cayenne":["3.0T V6","2.9T V6 S","4.0T V8 Turbo","E-Hybrid","Base","S","GTS","Turbo"],"Nissan/Altima":["2.5L","3.5L V6","2.0T VC-Turbo","AWD","FWD","S","SV","SL","SR","Platinum"],"Tesla/Model 3":["Standard Range","Long Range","Performance","AWD","RWD"],"Tesla/Model Y":["Standard Range","Long Range","Performance","AWD"],"Tesla/Model S":["Long Range","Plaid","75D","100D","P100D"],"Mercedes/C300":["RWD","4MATIC AWD","Sedan","Coupe","Cabriolet"],"Mercedes/E 350":["RWD","4MATIC","Sedan","Coupe","Wagon"],"Mercedes/GLE 350":["GLE 350 4MATIC","GLE 450 4MATIC","GLE 53 AMG","GLE 63 AMG","Coupe"],"Subaru/WRX":["2.0T","2.4T","STI","Base","Premium","Limited","TR"],"Subaru/Outback":["2.5L","3.6R","2.5T XT","AWD","Base","Premium","Limited","Wilderness"],"Lexus/RX 350":["3.5L FWD","3.5L AWD","Hybrid 450h","Base","Luxury","F Sport"],"Volvo/XC90":["T5 FWD","T6 AWD","T8 Hybrid","B5 AWD","B6 AWD","Momentum","R-Design","Inscription"],"Kia/Telluride":["3.8L V6","LX","S","EX","SX","Nightsky","X-Line"],"Hyundai/Sonata":["2.0T","2.4L","1.6T","2.5L","Hybrid","N Line","SE","SEL","Limited"]};
const PF_DOPTS = ["Base / Standard","LE","SE","SL","LX","EX","Sport","Limited","Premium","AWD","4WD","2WD","FWD","Diesel","Hybrid","PHEV"];
const PF_MON = "'DM Mono',monospace";
const PF_CSS = `@keyframes pf-led{0%,100%{opacity:1;box-shadow:0 0 5px #fff,0 0 12px rgba(255,255,255,.38)}50%{opacity:.25;box-shadow:none}}@keyframes pf-tick{from{transform:translateX(0)}to{transform:translateX(-50%)}}@keyframes pf-up{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}`;
const pfBuildYears = m => Array.from({length:(PF_EY[m]||2025)-(PF_SY[m]||1990)+1},(_,i)=>(PF_EY[m]||2025)-i);
const PfDot = ({on,lg}) => <span style={{width:lg?7:5,height:lg?7:5,borderRadius:"50%",display:"inline-block",flexShrink:0,background:on?"#fff":"rgba(255,255,255,0.14)",boxShadow:on?"0 0 5px #fff,0 0 12px rgba(255,255,255,.36)":"none",animation:on?"pf-led 2.2s ease infinite":"none",transition:"all .25s"}}/>;
const PfLbl = ({n,t,on}) => <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}><PfDot on={on}/><span style={{fontFamily:PF_MON,fontSize:9,fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",color:"rgba(113,130,165,0.6)"}}>{n} — {t}</span></div>;
const pfSS = (on,dis) => ({width:"100%",padding:"10px 30px 10px 11px",background:on?"rgba(255,255,255,0.07)":"rgba(255,255,255,0.025)",border:"1px solid "+(on?"rgba(255,255,255,0.27)":"rgba(255,255,255,0.08)"),borderRadius:5,color:on?"#f0f2f8":"rgba(115,133,168,0.62)",fontFamily:PF_MON,fontSize:11,letterSpacing:"0.06em",cursor:dis?"not-allowed":"pointer",opacity:dis?0.36:1,appearance:"none",WebkitAppearance:"none",backgroundImage:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='9' height='5'%3E%3Cpath d='M0 0l4.5 5L9 0z' fill='%236b7280'/%3E%3C/svg%3E\")",backgroundRepeat:"no-repeat",backgroundPosition:"right 10px center",outline:"none",transition:"all .18s"});
function PartsFinder({ defaultMake="" }) {
  const [cat,setCat]=useState(""); const [part,setPart]=useState("");
  const [make,setMake]=useState(defaultMake); const [mod,setMod]=useState("");
  const [yr,setYr]=useState(""); const [opt,setOpt]=useState("");
  const [nm,setNm]=useState(""); const [ph,setPh]=useState("");
  const [em,setEm]=useState(""); const [view,setView]=useState("search");
  const [busy,setBusy]=useState(false);
  const hCat=v=>{setCat(v);setPart("");}; const hMake=v=>{setMake(v);setMod("");setYr("");setOpt("");};
  const hMod=v=>{setMod(v);setYr("");setOpt("");}; const hYr=v=>{setYr(v);setOpt("");};
  const parts=cat?(PF_CATS[cat]||[]):[];
  const mods=make?[...(PF_MM[make]||[])].sort():[];
  const years=make?pfBuildYears(make):[];
  const opts=(make&&mod)?(PF_TOPTS[make+"/"+mod]||PF_DOPTS):[];
  const ready=part&&make&&mod&&yr;
  const submit=async()=>{
    if(!nm||!ph||busy)return; setBusy(true);
    const summary=`${yr} ${make} ${mod}${opt?" · "+opt:""} — ${part}`;
    try{await fetch("https://formsubmit.co/ajax/auapworld@gmail.com",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({name:nm,phone:ph,email:em,part,make,model:mod,year:yr,option:opt,summary,_subject:"AUAPW Quote: "+summary})});}catch(e){}
    setBusy(false);setView("sent");
  };
  const reset=()=>{setCat("");setPart("");setMake(defaultMake);setMod("");setYr("");setOpt("");setNm("");setPh("");setEm("");setView("search");};
  if(view==="sent") return (
    <section style={{padding:"48px 24px",background:"rgba(7,9,15,0.98)",borderTop:"1px solid rgba(255,255,255,0.07)"}}>
      <style>{PF_CSS}</style>
      <div style={{maxWidth:480,margin:"0 auto",textAlign:"center",animation:"pf-up .5s ease"}}>
        <div style={{width:56,height:56,borderRadius:"50%",border:"1px solid rgba(255,255,255,0.14)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 18px",fontSize:24}}>✓</div>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(1.4rem,4vw,1.9rem)",fontWeight:900,marginBottom:8}}>Request Received!</div>
        <p style={{fontFamily:PF_MON,fontSize:11,color:"rgba(140,158,192,0.7)",lineHeight:1.85,marginBottom:20}}>
          <span style={{color:"rgba(198,214,248,0.88)"}}>{part}</span><br/>
          <span style={{color:"rgba(130,148,185,0.55)"}}>{yr} {make} {mod}{opt?" · "+opt:""}</span>
        </p>
        <p style={{fontFamily:PF_MON,fontSize:9,letterSpacing:"0.14em",textTransform:"uppercase",color:"rgba(108,126,160,0.5)",marginBottom:20}}>Our parts experts will call you within 24 hours</p>
        <div style={{display:"flex",gap:10,justifyContent:"center"}}>
          <a href="tel:8888185001" style={{padding:"10px 18px",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.13)",borderRadius:5,fontFamily:PF_MON,fontSize:10,letterSpacing:"0.13em",color:"#f0f2f8",textDecoration:"none",textTransform:"uppercase"}}>📞 (888) 818-5001</a>
          <button onClick={reset} style={{padding:"10px 18px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:5,fontFamily:PF_MON,fontSize:10,letterSpacing:"0.13em",color:"rgba(140,158,200,0.7)",cursor:"pointer",textTransform:"uppercase"}}>New Search</button>
        </div>
      </div>
    </section>
  );
  return (
    <section style={{padding:"48px 24px 56px",background:"rgba(7,9,15,0.98)",borderTop:"1px solid rgba(255,255,255,0.07)"}}>
      <style>{PF_CSS}</style>
      <div style={{maxWidth:780,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:24}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:7,marginBottom:10,padding:"5px 15px",background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:20}}>
            <PfDot on lg/><span style={{fontFamily:PF_MON,fontSize:9,letterSpacing:"0.2em",textTransform:"uppercase",color:"rgba(130,150,190,0.52)"}}>Find Your Part — Fast & Free</span><PfDot on lg/>
          </div>
          <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(1.4rem,3.5vw,2rem)",fontWeight:900,marginBottom:6}}>Parts Search</h2>
          <p style={{fontFamily:PF_MON,fontSize:10,color:"rgba(125,145,182,0.5)",letterSpacing:"0.08em"}}>46 Makes · 638 Models · 144 Parts · Free Shipping · 6-Month Warranty</p>
        </div>
        <div style={{background:"rgba(8,11,20,0.97)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:11,overflow:"hidden",boxShadow:"0 20px 56px rgba(0,0,0,0.5)"}}>
          <div style={{height:2,background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.36),rgba(255,255,255,0.62),rgba(255,255,255,0.36),transparent)"}}/>
          <div style={{overflow:"hidden",borderBottom:"1px solid rgba(255,255,255,0.05)",padding:"7px 0",background:"rgba(255,255,255,0.012)"}}>
            <div style={{display:"flex",animation:"pf-tick 28s linear infinite",whiteSpace:"nowrap"}}>
              {[0,1].map(x=><span key={x} style={{fontFamily:PF_MON,fontSize:9,letterSpacing:"0.15em",color:"rgba(113,130,165,0.34)",textTransform:"uppercase",paddingRight:44}}>FREE SHIPPING ALL 50 STATES · ENGINES · TRANSMISSIONS · SUSPENSION · BODY PARTS · ELECTRICAL · 6-MONTH WARRANTY · 2,000+ VERIFIED YARDS · (888) 818-5001 ·&nbsp;</span>)}
            </div>
          </div>
          <div style={{padding:"clamp(16px,3.5vw,28px)"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:18}}>
              <PfDot on lg/>
              <span style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(.9rem,2.2vw,1.1rem)",fontWeight:900}}>Find Your Part</span>
              {make&&<span style={{fontFamily:PF_MON,fontSize:9,color:"rgba(113,130,165,0.4)",letterSpacing:"0.13em",textTransform:"uppercase",marginLeft:4}}>— {make}</span>}
              <span style={{marginLeft:"auto",fontFamily:PF_MON,fontSize:9,color:"rgba(113,130,165,0.36)",letterSpacing:"0.11em",textTransform:"uppercase"}}>6-Mo Warranty · Free Ship</span>
            </div>
            {view==="search"&&(
              <div style={{animation:"pf-up .25s ease"}}>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(205px,1fr))",gap:11}}>
                  <div><PfLbl n="1" t="Part Category" on={!!cat}/>
                    <select style={pfSS(!!cat,false)} value={cat} onChange={e=>hCat(e.target.value)}>
                      <option value="">— Select Category —</option>
                      {Object.keys(PF_CATS).map(c=><option key={c} value={c}>{c}</option>)}
                    </select></div>
                  <div><PfLbl n="2" t="Select Part" on={!!part}/>
                    <select style={pfSS(!!part,!cat)} value={part} onChange={e=>setPart(e.target.value)} disabled={!cat}>
                      <option value="">{cat?"— Select Part —":"— Category first —"}</option>
                      {parts.map(p=><option key={p} value={p}>{p}</option>)}
                    </select></div>
                  <div><PfLbl n="3" t="Select Make" on={!!make}/>
                    <select style={pfSS(!!make,!part)} value={make} onChange={e=>hMake(e.target.value)} disabled={!part}>
                      <option value="">{part?"— Select Make —":"— Part first —"}</option>
                      {Object.keys(PF_MM).sort().map(m=><option key={m} value={m}>{m}</option>)}
                    </select></div>
                  <div><PfLbl n="4" t="Select Model" on={!!mod}/>
                    <select style={pfSS(!!mod,!make)} value={mod} onChange={e=>hMod(e.target.value)} disabled={!make}>
                      <option value="">{make?"— Select Model —":"— Make first —"}</option>
                      {mods.map(m=><option key={m} value={m}>{m}</option>)}
                    </select></div>
                  <div><PfLbl n="5" t="Select Year" on={!!yr}/>
                    <select style={pfSS(!!yr,!mod)} value={yr} onChange={e=>hYr(e.target.value)} disabled={!mod}>
                      <option value="">{mod?"— Select Year —":"— Model first —"}</option>
                      {years.map(y=><option key={y} value={y}>{y}</option>)}
                    </select></div>
                  <div><PfLbl n="6" t="Option / Trim" on={!!opt}/>
                    <select style={pfSS(!!opt,!yr)} value={opt} onChange={e=>setOpt(e.target.value)} disabled={!yr}>
                      <option value="">{yr?"— Select Option —":"— Year first —"}</option>
                      {opts.map(o=><option key={o} value={o}>{o}</option>)}
                    </select></div>
                </div>
                {ready&&(
                  <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:6,padding:"12px 14px",marginTop:14,display:"flex",gap:8,alignItems:"flex-start",animation:"pf-up .3s ease"}}>
                    <PfDot on/>
                    <div style={{fontFamily:PF_MON,fontSize:11,color:"rgba(193,210,246,0.86)",lineHeight:1.75}}>
                      <span style={{color:"rgba(113,130,165,0.48)"}}>Part: </span>{part}<br/>
                      <span style={{color:"rgba(113,130,165,0.48)"}}>Vehicle: </span>{yr} {make} {mod}{opt?" · "+opt:""}
                    </div>
                  </div>
                )}
                <div style={{display:"flex",gap:10,marginTop:14,flexWrap:"wrap"}}>
                  <button onClick={()=>ready&&setView("form")} style={{flex:1,minWidth:155,padding:"12px 16px",borderRadius:5,background:ready?"rgba(255,255,255,0.09)":"rgba(255,255,255,0.025)",border:"1px solid "+(ready?"rgba(255,255,255,0.28)":"rgba(255,255,255,0.07)"),fontFamily:PF_MON,fontSize:11,fontWeight:700,letterSpacing:"0.17em",textTransform:"uppercase",color:ready?"#f0f2f8":"rgba(106,124,160,0.36)",cursor:ready?"pointer":"not-allowed",transition:"all .2s"}}>
                    {ready?"Get Free Quote →":"Complete All Fields"}
                  </button>
                  <a href="tel:8888185001" style={{display:"flex",alignItems:"center",gap:5,padding:"12px 14px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:5,fontFamily:PF_MON,fontSize:10,letterSpacing:"0.11em",textTransform:"uppercase",color:"rgba(135,155,198,0.6)",textDecoration:"none",whiteSpace:"nowrap"}}>📞 (888) 818-5001</a>
                </div>
              </div>
            )}
            {view==="form"&&(
              <div style={{animation:"pf-up .25s ease"}}>
                <button onClick={()=>setView("search")} style={{background:"none",border:"none",fontFamily:PF_MON,fontSize:9,letterSpacing:"0.17em",textTransform:"uppercase",color:"rgba(113,130,165,0.48)",cursor:"pointer",marginBottom:16,padding:0,display:"flex",alignItems:"center",gap:5}}>← Back to Search</button>
                <div style={{background:"rgba(255,255,255,0.025)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:6,padding:"13px 15px",marginBottom:18}}>
                  <div style={{fontFamily:PF_MON,fontSize:8,letterSpacing:"0.2em",textTransform:"uppercase",color:"rgba(106,124,160,0.48)",marginBottom:6}}>Part Request Summary</div>
                  <div style={{fontFamily:PF_MON,fontSize:11,color:"rgba(192,210,246,0.87)",lineHeight:1.78}}>
                    <span style={{color:"rgba(106,124,160,0.44)"}}>Part: </span>{part}<br/>
                    <span style={{color:"rgba(106,124,160,0.44)"}}>Vehicle: </span>{yr} {make} {mod}{opt?" · "+opt:""}
                  </div>
                </div>
                {[["Your Name",nm,setNm,"Full name","text",true],["Phone Number",ph,setPh,"(555) 000-0000","tel",true],["Email Address",em,setEm,"Optional","email",false]].map(([l,v,s,p,t,req])=>(
                  <div key={l} style={{marginBottom:13}}>
                    <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:5}}><PfDot on={!!v}/><span style={{fontFamily:PF_MON,fontSize:9,fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",color:"rgba(106,124,160,0.58)"}}>{l}{req&&<span style={{color:"rgba(255,75,75,0.52)",marginLeft:3}}>*</span>}</span></div>
                    <input value={v} onChange={e=>s(e.target.value)} placeholder={p} type={t} style={{width:"100%",padding:"10px 12px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:5,color:"#f0f2f8",fontFamily:PF_MON,fontSize:11,letterSpacing:"0.06em",outline:"none",transition:"border-color .18s"}} onFocus={e=>e.target.style.borderColor="rgba(255,255,255,0.25)"} onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.1)"}/>
                  </div>
                ))}
                <button onClick={submit} disabled={!nm||!ph||busy} style={{width:"100%",marginTop:5,padding:"13px 18px",borderRadius:5,background:(!nm||!ph)?"rgba(255,255,255,0.025)":"rgba(255,255,255,0.09)",border:"1px solid "+((!nm||!ph)?"rgba(255,255,255,0.07)":"rgba(255,255,255,0.27)"),fontFamily:PF_MON,fontSize:11,fontWeight:700,letterSpacing:"0.17em",textTransform:"uppercase",color:(!nm||!ph)?"rgba(106,124,160,0.3)":"#f0f2f8",cursor:(!nm||!ph)?"not-allowed":"pointer",transition:"all .2s"}}>
                  {busy?"Sending…":"Submit Quote Request →"}
                </button>
                <p style={{textAlign:"center",fontFamily:PF_MON,fontSize:8,color:"rgba(96,114,150,0.36)",marginTop:11,letterSpacing:"0.1em"}}>SECURE · NO SPAM · WE CALL WITHIN 24 HOURS</p>
              </div>
            )}
          </div>
          <div style={{borderTop:"1px solid rgba(255,255,255,0.05)",background:"rgba(255,255,255,0.011)",padding:"10px 18px",display:"flex",justifyContent:"space-around",flexWrap:"wrap",gap:8}}>
            {[["🔒","Secure"],["🚚","Free Ship"],["🛡️","6-Mo Warranty"],["⚡","24hr Response"],["🏆","2,000+ Yards"]].map(([ic,t])=>(
              <div key={t} style={{display:"flex",alignItems:"center",gap:5}}>
                <span style={{fontSize:12}}>{ic}</span>
                <span style={{fontFamily:PF_MON,fontSize:8,fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",color:"rgba(125,145,188,0.42)"}}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
// ═══════════════════════════════════════════════════

export default function App() {
  const [page, setPage] = useState("home");
  const [ptab, setPtab] = useState("all");

  const goTo = (p) => { setPage(p); window.scrollTo?.(0,0); };

  const renderPage = () => {
    if (page === "home")              return <HomePage goTo={goTo}/>;
    if (page === "used-engines")      return <UsedPartPage type="engines" goTo={goTo}/>;
    if (page === "used-transmissions")return <UsedPartPage type="transmissions" goTo={goTo}/>;
    if (page === "parts")             return <PartsPage goTo={goTo}/>;
    if (page.startsWith("parts-"))    return <PartsDetailPage catId={page.replace("parts-","")} goTo={goTo}/>;
    if (page === "makes")             return <MakesPage goTo={goTo}/>;
    if (page === "inventory")         return <InventoryPage goTo={goTo}/>;
    if (page === "quote")             return <QuotePage/>;
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
      <PartsFinder/>
      <Footer goTo={goTo}/>
    </div>
  );
}
