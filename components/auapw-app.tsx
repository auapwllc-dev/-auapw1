import React, { useState, useEffect, createContext, useContext } from "react";
import {
  Search, Truck, Shield, RotateCcw, RefreshCw, Clock, Star, DollarSign,
  Cog, CircleDot, Link2, Zap, Snowflake, Activity, Square, Phone,
  MessageSquare, CheckCircle, Mail, MapPin, ArrowRight,
  Menu, X, ChevronDown, ChevronUp, FileText, Lock,
  Settings, AlertTriangle, XCircle, Sun, Moon
} from "lucide-react";

const ThemeCtx = createContext({ theme:"dark", toggle:()=>{} });
const useTheme = () => useContext(ThemeCtx);
const LogoCtx  = createContext({ logoSrc:null, setLogoSrc:()=>{} });
const useLogo  = () => useContext(LogoCtx);

// font constants — no nested quotes
const MH = "DM Mono, monospace";
const MS = "DM Sans, system-ui, sans-serif";

const PHONE   = "(888) 818-5001";
const EMAIL   = "info@auapw.org";
const LEAD    = "auapworld@gmail.com";
const ADDRESS = "107 Myrtle Ave, Woodbine, NJ 08270";

const MAKES = ["Acura","Alfa Romeo","Audi","BMW","Buick","Cadillac","Chevrolet","Chrysler","Dodge","Fiat","Ford","GMC","Genesis","Honda","Hummer","Hyundai","Infiniti","Isuzu","Jaguar","Jeep","Kia","Land Rover","Lexus","Lincoln","Mazda","Mercedes-Benz","Mercury","Mini","Mitsubishi","Nissan","Oldsmobile","Plymouth","Pontiac","Porsche","Ram","Saturn","Scion","Subaru","Suzuki","Tesla","Toyota","Volkswagen","Volvo"];

const BRAND_LOGOS = {
  "Acura": '<svg viewBox="0 0 100 100"><circle r="48" cx="50" cy="50" fill="none" stroke="white" stroke-width="2"/><path d="M40 45 L50 35 L60 45 M50 35 L50 65" stroke="white" stroke-width="2.5" fill="none" stroke-linecap="round"/></svg>',
  "Alfa Romeo": '<svg viewBox="0 0 100 100"><circle r="45" cx="50" cy="50" fill="none" stroke="white" stroke-width="2"/><path d="M35 50 Q50 35 65 50 Q50 65 35 50" fill="white" opacity="0.8"/></svg>',
  "Audi": '<svg viewBox="0 0 100 100"><circle cx="28" cy="50" r="10" fill="none" stroke="white" stroke-width="2"/><circle cx="50" cy="50" r="10" fill="none" stroke="white" stroke-width="2"/><circle cx="72" cy="50" r="10" fill="none" stroke="white" stroke-width="2"/></svg>',
  "Bentley": '<svg viewBox="0 0 100 100"><path d="M50 20 L80 50 L70 80 L30 80 L20 50 Z" fill="none" stroke="white" stroke-width="2"/><circle cx="50" cy="50" r="8" fill="white"/></svg>',
  "BMW": '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="none" stroke="white" stroke-width="2"/><line x1="50" y1="15" x2="50" y2="85" stroke="white" stroke-width="1.5"/><line x1="20" y1="50" x2="80" y2="50" stroke="white" stroke-width="1.5"/></svg>',
  "Buick": '<svg viewBox="0 0 100 100"><rect x="25" y="30" width="50" height="40" fill="none" stroke="white" stroke-width="2" rx="3"/><circle cx="35" cy="45" r="4" fill="white"/><circle cx="50" cy="45" r="4" fill="white"/><circle cx="65" cy="45" r="4" fill="white"/></svg>',
  "Cadillac": '<svg viewBox="0 0 100 100"><path d="M50 20 L70 80 L60 80 L55 60 L45 60 L40 80 L30 80 Z" fill="none" stroke="white" stroke-width="2" stroke-linejoin="round"/></svg>',
  "Chevrolet": '<svg viewBox="0 0 100 100"><path d="M35 40 L50 25 L65 40 L60 60 L40 60 Z" fill="white" opacity="0.7"/><path d="M35 60 L50 75 L65 60" fill="none" stroke="white" stroke-width="2"/></svg>',
  "Chrysler": '<svg viewBox="0 0 100 100"><path d="M50 25 L65 50 L60 75 L40 75 L35 50 Z" fill="none" stroke="white" stroke-width="2" stroke-linejoin="round"/></svg>',
  "Dodge": '<svg viewBox="0 0 100 100"><polygon points="30,40 50,20 70,40 75,60 50,80 25,60" fill="none" stroke="white" stroke-width="2"/></svg>',
  "Ferrari": '<svg viewBox="0 0 100 100"><path d="M30 35 Q50 25 70 35 L75 55 Q50 70 25 55 Z" fill="none" stroke="white" stroke-width="2.5"/><path d="M45 45 L55 45" stroke="white" stroke-width="1.5"/></svg>',
  "Fiat": '<svg viewBox="0 0 100 100"><rect x="28" y="28" width="44" height="44" fill="none" stroke="white" stroke-width="2"/><line x1="50" y1="28" x2="50" y2="72" stroke="white" stroke-width="1"/></svg>',
  "Ford": '<svg viewBox="0 0 100 100"><path d="M30 45 Q50 30 70 45 L68 65 Q50 75 32 65 Z" fill="none" stroke="white" stroke-width="2.5"/></svg>',
  "Genesis": '<svg viewBox="0 0 100 100"><path d="M50 30 L65 55 L50 80 L35 55 Z" fill="none" stroke="white" stroke-width="2" stroke-linejoin="round"/></svg>',
  "GMC": '<svg viewBox="0 0 100 100"><rect x="28" y="35" width="44" height="30" fill="none" stroke="white" stroke-width="2"/><line x1="35" y1="35" x2="35" y2="65" stroke="white" stroke-width="1.5"/><line x1="50" y1="35" x2="50" y2="65" stroke="white" stroke-width="1.5"/><line x1="65" y1="35" x2="65" y2="65" stroke="white" stroke-width="1.5"/></svg>',
  "Honda": '<svg viewBox="0 0 100 100"><path d="M40 40 L60 40 L62 60 L38 60 Z" fill="none" stroke="white" stroke-width="2"/><circle cx="45" cy="65" r="4" fill="white"/><circle cx="55" cy="65" r="4" fill="white"/></svg>',
  "Hummer": '<svg viewBox="0 0 100 100"><rect x="25" y="30" width="50" height="40" fill="none" stroke="white" stroke-width="2.5" rx="2"/><line x1="35" y1="30" x2="35" y2="70" stroke="white" stroke-width="1.5"/><line x1="50" y1="30" x2="50" y2="70" stroke="white" stroke-width="1.5"/><line x1="65" y1="30" x2="65" y2="70" stroke="white" stroke-width="1.5"/></svg>',
  "Hyundai": '<svg viewBox="0 0 100 100"><path d="M35 45 L50 30 L65 45 L60 65 L40 65 Z" fill="none" stroke="white" stroke-width="2" stroke-linejoin="round"/></svg>',
  "Infiniti": '<svg viewBox="0 0 100 100"><path d="M25 50 Q40 40 50 50 Q40 60 25 50 M75 50 Q60 40 50 50 Q60 60 75 50" fill="none" stroke="white" stroke-width="2"/></svg>',
  "Isuzu": '<svg viewBox="0 0 100 100"><path d="M40 35 L50 25 L60 35 L55 60 L45 60 Z" fill="none" stroke="white" stroke-width="2"/></svg>',
  "Jaguar": '<svg viewBox="0 0 100 100"><path d="M50 25 L70 50 L65 75 L35 75 L30 50 Z" fill="none" stroke="white" stroke-width="2.5" stroke-linejoin="round"/><circle cx="50" cy="50" r="5" fill="white"/></svg>',
  "Jeep": '<svg viewBox="0 0 100 100"><circle cx="35" cy="45" r="6" fill="white"/><circle cx="65" cy="45" r="6" fill="white"/><line x1="35" y1="51" x2="35" y2="65" stroke="white" stroke-width="2"/><line x1="65" y1="51" x2="65" y2="65" stroke="white" stroke-width="2"/><rect x="30" y="30" width="40" height="20" fill="none" stroke="white" stroke-width="2"/></svg>',
  "Kia": '<svg viewBox="0 0 100 100"><path d="M35 50 Q50 35 65 50 Q50 65 35 50" fill="none" stroke="white" stroke-width="2.5"/><circle cx="50" cy="50" r="4" fill="white"/></svg>',
  "Lamborghini": '<svg viewBox="0 0 100 100"><polygon points="50,20 75,45 70,80 30,80 25,45" fill="none" stroke="white" stroke-width="2.5" stroke-linejoin="round"/></svg>',
  "Land Rover": '<svg viewBox="0 0 100 100"><path d="M30 50 L50 30 L70 50 L65 70 L35 70 Z" fill="none" stroke="white" stroke-width="2" stroke-linejoin="round"/></svg>',
  "Lexus": '<svg viewBox="0 0 100 100"><path d="M35 40 L50 30 L65 40 L65 70 L35 70 Z" fill="none" stroke="white" stroke-width="2"/><path d="M45 35 L55 35 M45 55 L55 55" stroke="white" stroke-width="1.5"/></svg>',
  "Lincoln": '<svg viewBox="0 0 100 100"><line x1="25" y1="50" x2="75" y2="50" stroke="white" stroke-width="3"/><circle cx="50" cy="50" r="6" fill="white"/></svg>',
  "Maserati": '<svg viewBox="0 0 100 100"><path d="M50 25 L70 65 L30 65 Z" fill="none" stroke="white" stroke-width="2.5" stroke-linejoin="round"/><line x1="50" y1="25" x2="50" y2="60" stroke="white" stroke-width="1.5"/></svg>',
  "Mazda": '<svg viewBox="0 0 100 100"><path d="M35 50 L50 35 L65 50 L60 70 L40 70 Z" fill="none" stroke="white" stroke-width="2"/></svg>',
  "Mercedes-Benz": '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="none" stroke="white" stroke-width="2"/><circle cx="50" cy="50" r="30" fill="none" stroke="white" stroke-width="1"/><line x1="50" y1="20" x2="50" y2="80" stroke="white" stroke-width="1.5"/><line x1="20" y1="50" x2="80" y2="50" stroke="white" stroke-width="1.5"/></svg>',
  "Mercury": '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="35" fill="none" stroke="white" stroke-width="2"/><circle cx="50" cy="50" r="20" fill="none" stroke="white" stroke-width="1.5"/><path d="M50 30 L50 50" stroke="white" stroke-width="2"/></svg>',
  "Mini": '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="35" fill="none" stroke="white" stroke-width="2"/><circle cx="50" cy="50" r="20" fill="none" stroke="white" stroke-width="1.5"/><circle cx="50" cy="50" r="8" fill="white"/></svg>',
  "Mitsubishi": '<svg viewBox="0 0 100 100"><path d="M50 25 L70 60 L50 95 M50 25 L30 60 M50 95 L30 60" fill="none" stroke="white" stroke-width="2.5" stroke-linejoin="round"/></svg>',
  "Nissan": '<svg viewBox="0 0 100 100"><rect x="28" y="35" width="44" height="30" fill="white" opacity="0.8"/><circle cx="50" cy="50" r="8" fill="none" stroke="white" stroke-width="1.5"/></svg>',
  "Oldsmobile": '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="38" fill="none" stroke="white" stroke-width="2"/><path d="M50 20 L65 50 L50 80 L35 50 Z" fill="white" opacity="0.6"/></svg>',
  "Plymouth": '<svg viewBox="0 0 100 100"><polygon points="50,25 70,65 30,65" fill="none" stroke="white" stroke-width="2.5" stroke-linejoin="round"/></svg>',
  "Pontiac": '<svg viewBox="0 0 100 100"><rect x="25" y="35" width="50" height="30" fill="none" stroke="white" stroke-width="2"/><line x1="35" y1="35" x2="35" y2="65" stroke="white" stroke-width="2"/><line x1="50" y1="35" x2="50" y2="65" stroke="white" stroke-width="2"/><line x1="65" y1="35" x2="65" y2="65" stroke="white" stroke-width="2"/></svg>',
  "Porsche": '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="none" stroke="white" stroke-width="2"/><path d="M50 30 Q65 45 50 70 Q35 45 50 30" fill="white" opacity="0.7"/></svg>',
  "Ram": '<svg viewBox="0 0 100 100"><path d="M50 25 L65 50 L60 75 L40 75 L35 50 Z" fill="none" stroke="white" stroke-width="2.5"/><path d="M45 45 L55 45" stroke="white" stroke-width="1.5"/></svg>',
  "Rolls-Royce": '<svg viewBox="0 0 100 100"><rect x="25" y="30" width="50" height="40" fill="none" stroke="white" stroke-width="2.5" rx="2"/><circle cx="50" cy="50" r="12" fill="none" stroke="white" stroke-width="1.5"/><path d="M45 50 L55 50 M50 45 L50 55" stroke="white" stroke-width="1"/></svg>',
  "Saturn": '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="30" fill="none" stroke="white" stroke-width="1.5"/><ellipse cx="50" cy="50" rx="40" ry="12" fill="none" stroke="white" stroke-width="2"/><circle cx="50" cy="50" r="8" fill="white"/></svg>',
  "Scion": '<svg viewBox="0 0 100 100"><path d="M35 45 L50 30 L65 45 L65 70 L35 70 Z" fill="none" stroke="white" stroke-width="2"/><circle cx="50" cy="50" r="5" fill="white" opacity="0.8"/></svg>',
  "Subaru": '<svg viewBox="0 0 100 100"><circle cx="30" cy="35" r="7" fill="white"/><circle cx="50" cy="25" r="7" fill="white"/><circle cx="70" cy="35" r="7" fill="white"/><circle cx="40" cy="55" r="7" fill="white"/><circle cx="60" cy="55" r="7" fill="white"/></svg>',
  "Suzuki": '<svg viewBox="0 0 100 100"><path d="M35 40 L50 25 L65 40 L65 70 L35 70 Z" fill="none" stroke="white" stroke-width="2"/><circle cx="50" cy="50" r="6" fill="white"/></svg>',
  "Tesla": '<svg viewBox="0 0 100 100"><path d="M50 25 L65 45 L60 55 L55 75 L45 75 L40 55 L35 45 Z" fill="none" stroke="white" stroke-width="2.5" stroke-linejoin="round"/></svg>',
  "Toyota": '<svg viewBox="0 0 100 100"><ellipse cx="50" cy="45" rx="15" ry="18" fill="none" stroke="white" stroke-width="2"/><ellipse cx="50" cy="60" rx="18" ry="12" fill="none" stroke="white" stroke-width="2"/></svg>',
  "Volkswagen": '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="38" fill="none" stroke="white" stroke-width="2"/><path d="M50 25 L50 75 M30 50 L70 50" stroke="white" stroke-width="1.5"/></svg>',
  "Volvo": '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="38" fill="none" stroke="white" stroke-width="2"/><path d="M50 20 L60 50 L50 80" fill="none" stroke="white" stroke-width="2"/><circle cx="50" cy="50" r="6" fill="white"/></svg>'
};

const STATES = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"];

const MODELS = {
  "Acura":["MDX","RDX","TLX","ILX","NSX","RL","TL","Integra"],
  "Audi":["A3","A4","A6","A8","Q3","Q5","Q7","Q8","TT","R8"],
  "BMW":["3 Series","5 Series","7 Series","X1","X3","X5","X7","M3","M5","Z4","i3"],
  "Buick":["Enclave","Encore","LaCrosse","Regal","Verano","Envision"],
  "Cadillac":["ATS","CTS","CT4","CT5","Escalade","SRX","XT4","XT5","XT6"],
  "Chevrolet":["Camaro","Colorado","Corvette","Equinox","Impala","Malibu","Silverado 1500","Silverado 2500","Suburban","Tahoe","Traverse","Trax","Blazer"],
  "Chrysler":["200","300","Pacifica","Town & Country","Voyager","Sebring"],
  "Dodge":["Challenger","Charger","Dart","Durango","Grand Caravan","Journey","Ram 1500","Viper","Avenger"],
  "Fiat":["500","500L","500X","Bravo","Punto","Spider"],
  "Ford":["Edge","Escape","Explorer","F-150","F-250","F-350","Focus","Fusion","Mustang","Ranger","Transit","Bronco","Maverick"],
  "GMC":["Acadia","Canyon","Envoy","Sierra 1500","Sierra 2500","Terrain","Yukon","Yukon XL"],
  "Genesis":["G70","G80","G90","GV70","GV80","GV60"],
  "Honda":["Accord","CR-V","Civic","Element","Fit","HR-V","Odyssey","Passport","Pilot","Ridgeline","Insight"],
  "Hyundai":["Elantra","Santa Fe","Sonata","Tucson","Veloster","Kona","Ioniq","Azera"],
  "Infiniti":["G35","G37","Q50","Q60","QX50","QX60","QX80","FX35"],
  "Isuzu":["Trooper","Rodeo","Passport","Amigo","Axiom","Ascender"],
  "Jaguar":["XE","XF","XJ","F-Type","F-Pace","E-Pace","I-Pace","S-Type"],
  "Jeep":["Cherokee","Compass","Grand Cherokee","Liberty","Patriot","Renegade","Wrangler","Gladiator"],
  "Kia":["Forte","Optima","Soul","Sorento","Sportage","Stinger","Telluride","Carnival","K5"],
  "Land Rover":["Defender","Discovery","Freelander","LR4","Range Rover","Range Rover Sport","Range Rover Evoque"],
  "Lexus":["ES","GS","GX","IS","LS","LX","NX","RX","UX","LC"],
  "Lincoln":["Continental","MKC","MKS","MKT","MKX","MKZ","Navigator","Town Car","Aviator"],
  "Mazda":["CX-3","CX-5","CX-9","Mazda3","Mazda6","MX-5","Tribute"],
  "Mercedes-Benz":["A-Class","C-Class","E-Class","GLA","GLC","GLE","GLS","S-Class","Sprinter","CLA"],
  "Mercury":["Grand Marquis","Mountaineer","Mariner","Milan","Cougar","Sable"],
  "Mini":["Cooper","Cooper S","Clubman","Countryman","Paceman"],
  "Mitsubishi":["Eclipse","Galant","Lancer","Outlander","Outlander Sport"],
  "Nissan":["370Z","Altima","Armada","Frontier","Maxima","Murano","Pathfinder","Rogue","Sentra","Titan","Versa","GT-R"],
  "Oldsmobile":["Alero","Aurora","Bravada","Cutlass","Intrigue","Silhouette"],
  "Plymouth":["Neon","Breeze","Grand Voyager","Prowler","Voyager"],
  "Pontiac":["G6","Grand Prix","Grand Am","Solstice","Vibe","Aztek","Bonneville"],
  "Porsche":["911","Cayenne","Macan","Panamera","Boxster","Cayman","Taycan"],
  "Ram":["1500","2500","3500","ProMaster","ProMaster City"],
  "Saturn":["Aura","Ion","Outlook","Vue","Sky"],
  "Scion":["tC","xA","xB","xD","FR-S","iM"],
  "Subaru":["Crosstrek","Forester","Impreza","Legacy","Outback","WRX","BRZ"],
  "Suzuki":["Grand Vitara","Swift","Vitara","Kizashi","Forenza"],
  "Tesla":["Model S","Model 3","Model X","Model Y","Cybertruck","Roadster"],
  "Toyota":["4Runner","Avalon","Camry","Corolla","FJ Cruiser","Highlander","Land Cruiser","Prius","RAV4","Sequoia","Sienna","Tacoma","Tundra","Venza","Supra"],
  "Volkswagen":["Golf","GTI","Jetta","Passat","Tiguan","Touareg","Atlas","Beetle"],
  "Volvo":["S40","S60","S80","S90","V60","XC40","XC60","XC70","XC90"],
  "Alfa Romeo":["Giulia","Stelvio","4C","Spider"],
  "Hummer":["H1","H2","H3"],
  "Infiniti":["G35","G37","Q50","Q60","QX50","QX60","QX80"]
};

const BCOLORS = {
  "Acura":"#000","Audi":"#000","BMW":"#0066B1","Buick":"#6C7A89","Cadillac":"#9B7B3B",
  "Chevrolet":"#D1A00C","Chrysler":"#1C1C1C","Dodge":"#BA0C2F","Fiat":"#8B0000",
  "Ford":"#003399","GMC":"#CC0000","Genesis":"#6B4226","Honda":"#CC0000","Hummer":"#3D3D3D",
  "Hyundai":"#002C5F","Infiniti":"#5C5C5C","Isuzu":"#CC0000","Jaguar":"#336633","Jeep":"#3B5322",
  "Kia":"#05141F","Land Rover":"#005A2B","Lexus":"#1A1A1A","Lincoln":"#2C2C2C","Mazda":"#920000",
  "Mercedes-Benz":"#333","Mercury":"#4A4A4A","Mini":"#000","Mitsubishi":"#CC0000","Nissan":"#C3002F",
  "Oldsmobile":"#1C3A5F","Plymouth":"#003087","Pontiac":"#CC0000","Porsche":"#B12B28","Ram":"#000",
  "Saturn":"#1B4F72","Scion":"#4A0080","Subaru":"#003399","Suzuki":"#004D9A","Tesla":"#CC0000",
  "Toyota":"#CC0000","Volkswagen":"#001E50","Volvo":"#003057","Alfa Romeo":"#8B0000"
};

const PARTS = [
  {id:"engines",label:"Engines",Icon:Cog,parts:["Complete Engine","Long Block","Short Block","Cylinder Head","Engine Block","Crankshaft","Camshaft","Pistons","Timing Chain Kit","Oil Pump","Valve Cover","Intake Manifold","Head Gasket","Oil Pan","Engine Mount"]},
  {id:"transmissions",label:"Transmissions",Icon:CircleDot,parts:["Automatic Transmission","Manual Transmission","CVT Transmission","Transfer Case","Torque Converter","Transaxle","Clutch Kit","Flywheel","Transmission Pan","Valve Body","Output Shaft"]},
  {id:"drivetrain",label:"Drivetrain",Icon:Link2,parts:["CV Axle","Drive Shaft","Front Differential","Rear Differential","Front Axle","Rear Axle","Wheel Hub Assembly","U-Joint","Half Shaft","Axle Bearing"]},
  {id:"electrical",label:"Electrical",Icon:Zap,parts:["Alternator","Starter Motor","ECU / PCM Module","ABS Control Module","Ignition Coil","Fuel Injector","Mass Air Flow Sensor","Throttle Body","Fuel Pump","Wiring Harness","Blower Motor"]},
  {id:"cooling",label:"Cooling & Climate",Icon:Snowflake,parts:["Radiator","A/C Compressor","Condenser","Turbocharger","Water Pump","Heater Core","Fan Clutch","Coolant Reservoir","Thermostat Housing","Radiator Fan"]},
  {id:"suspension",label:"Suspension & Brakes",Icon:Activity,parts:["Brake Caliper","Control Arm","Strut Assembly","Coil Spring","Steering Rack","Power Steering Pump","Tie Rod","Ball Joint","Wheel Bearing","Brake Master Cylinder","Shock Absorber"]},
  {id:"body",label:"Body & Interior",Icon:Square,parts:["Door Assembly","Hood","Front Bumper","Rear Bumper","Fender","Quarter Panel","Tailgate","Dashboard","Instrument Cluster","Seat Assembly","Headlight Assembly","Grille","Trunk Lid"]}
];

const ALL_PARTS = [...new Set(PARTS.flatMap(c=>c.parts))].sort();
const POP_PARTS = ["Engine","Transmission","Alternator","Starter Motor","Radiator","A/C Compressor","CV Axle","Fuel Pump","Control Arm","Strut Assembly","ECU / PCM Module","Transfer Case","Brake Caliper","Turbocharger"];

function T(theme) {
  return theme==="light" ? {
    bg:"#f0f2f8",card:"rgba(255,255,255,0.95)",bd:"rgba(0,0,0,0.12)",bdd:"rgba(0,0,0,0.06)",
    fg:"#1a1d2e",muted:"#4b5563",dim:"#6b7280",dimmer:"#9ca3af",nav:"rgba(240,242,248,0.97)",inp:"rgba(248,249,253,0.9)"
  } : {
    bg:"#07090f",card:"rgba(19,22,30,0.85)",bd:"rgba(255,255,255,0.14)",bdd:"rgba(255,255,255,0.06)",
    fg:"#f5f5f5",muted:"#9ca3af",dim:"#6b7280",dimmer:"#4b5563",nav:"rgba(8,10,18,0.96)",inp:"rgba(13,15,24,0.9)"
  };
}

async function sendLead(p) {
  const subj = "[AUAPW Quote] " + p.year + " " + p.make + " " + p.model + " - " + p.part;
  const body = "Vehicle: "+p.year+" "+p.make+" "+p.model+"\nPart: "+p.part+"\nName: "+p.name+"\nPhone: "+p.phone+"\nEmail: "+p.email+"\nLocation: "+p.location;
  try {
    const r = await fetch("https://formsubmit.co/ajax/"+LEAD,{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify({name:p.name,email:p.email,_subject:subj,message:body,_template:"table",_captcha:"false"})});
    if(r.ok){const d=await r.json();if(d.success==="true"||d.success===true)return true;}
  } catch(e){}
  try{window.open("mailto:"+LEAD+"?subject="+encodeURIComponent(subj)+"&body="+encodeURIComponent(body),"_blank");return true;}catch(e){}
  return false;
}

// ── CSS ──
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{margin:0}
.aw{min-height:100vh;overflow-x:hidden;font-family:'DM Sans',system-ui,sans-serif}
.aw.dk{background:#07090f;color:#f5f5f5}
.aw.lt{background:#f0f2f8;color:#1a1d2e}
.aw h1,.aw h2,.aw h3{font-family:'DM Mono',monospace!important;font-weight:900;letter-spacing:.04em;text-transform:uppercase;line-height:1.15}
button,input,select,textarea{font-family:inherit}

@keyframes mflow{0%,100%{background-position:0% center}50%{background-position:100% center}}
@keyframes gscan{0%{transform:translateX(-120%) skewX(-18deg);opacity:0}15%{opacity:1}85%{opacity:1}100%{transform:translateX(420%) skewX(-18deg);opacity:0}}
@keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes lpulse{0%,100%{border-color:rgba(255,255,255,0.7)}50%{border-color:rgba(255,255,255,0.2)}}
@keyframes lscan{0%{transform:translateX(-100%) skewX(-20deg)}100%{transform:translateX(500%) skewX(-20deg)}}
@keyframes chromesweep{0%{background-position:200% center}100%{background-position:-200% center}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
@keyframes emboss{0%,100%{background-position:0% 0%}50%{background-position:200% 100%}}
@keyframes pdot{0%,100%{opacity:1;box-shadow:0 0 8px #fff}50%{opacity:0.3}}
@keyframes tabin{from{opacity:0;transform:scaleX(0)}to{opacity:1;transform:scaleX(1)}}

.gc{backdrop-filter:blur(20px);position:relative;overflow:hidden;border-radius:4px;transition:background .3s,border-color .3s}
.aw.dk .gc{background:rgba(19,22,30,0.85);border:1px solid rgba(255,255,255,0.08)}
.aw.lt .gc{background:rgba(255,255,255,0.95);border:1px solid rgba(0,0,0,0.1);box-shadow:0 2px 16px rgba(0,0,0,0.06)}
.gsb{position:absolute;top:0;left:0;width:22%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.07) 50%,transparent);animation:gscan 5s ease-in-out infinite;pointer-events:none;mix-blend-mode:overlay}

.chrome{background:linear-gradient(90deg,#606878,#a8b0c8,#ffffff,#e8ecff,#ffffff,#a8b0c8,#606878);background-size:300% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:mflow 5s ease-in-out infinite}
.aw.lt .chrome{background:linear-gradient(90deg,#2a3050,#4a5278,#2a3050);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.emboss{font-family:'DM Mono',monospace;font-weight:900;display:inline-block;background:linear-gradient(145deg,#fff 0%,#e0e8f8 15%,#b8c4dc 30%,#f0f4ff 45%,#fff 55%,#c8d0e8 70%,#8090b0 85%,#1e2438 100%);background-size:250% 250%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;filter:drop-shadow(0 -1.5px 0 rgba(255,255,255,0.8)) drop-shadow(1px 1px 0 rgba(0,0,0,0.9)) drop-shadow(2px 2px 0 rgba(0,0,0,0.7)) drop-shadow(3px 3px 4px rgba(0,0,0,0.5));animation:emboss 5s ease-in-out infinite,float 5s ease-in-out infinite}
.sub-ch{font-family:'DM Mono',monospace;font-weight:700;letter-spacing:.22em;text-transform:uppercase;background:linear-gradient(90deg,#505870,#8898b8,#d8e0f0,#fff,#d8e0f0,#8898b8,#505870);background-size:300% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:chromesweep 6s linear infinite}
.tag-ch{font-family:'DM Mono',monospace;font-weight:500;font-style:italic;letter-spacing:.12em;background:linear-gradient(90deg,rgba(130,148,175,.5),rgba(200,215,238,.85),rgba(130,148,175,.5));background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:chromesweep 7s linear infinite}
.aw.lt .sub-ch,.aw.lt .tag-ch{background:linear-gradient(90deg,#3a4270,#2a3058,#3a4270);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}

.dled{width:7px;height:7px;background:linear-gradient(135deg,#fff 0%,#c8d0f0 40%,#8090b0 80%,#303858 100%);transform:rotate(45deg);box-shadow:0 0 5px rgba(255,255,255,.85);flex-shrink:0}
.dled-sm{width:5px;height:5px;background:linear-gradient(135deg,#fff 0%,#c8d0f0 40%,#8090b0 80%,#303858 100%);transform:rotate(45deg);box-shadow:0 0 4px rgba(255,255,255,.8);flex-shrink:0}
.aw.lt .dled,.aw.lt .dled-sm{background:linear-gradient(135deg,#3a4278,#2a3058,#1a1d2e)}

.btn-led{background:rgba(255,255,255,.06);border:1.5px solid rgba(255,255,255,.7);color:#fff;animation:lpulse 2s ease-in-out infinite;position:relative;overflow:hidden;cursor:pointer;border-radius:3px;font-family:'DM Mono',monospace;font-weight:700;font-size:10px;letter-spacing:.18em;text-transform:uppercase;padding:11px 22px;display:inline-flex;align-items:center;justify-content:center;gap:8px;text-decoration:none;transition:background .2s}
.btn-led::after{content:'';position:absolute;top:0;left:-60%;width:40%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.22),transparent);animation:lscan 3s ease-in-out infinite;pointer-events:none}
.btn-led:hover{background:rgba(255,255,255,.18);box-shadow:0 0 24px rgba(255,255,255,.3);animation:none}
.aw.lt .btn-led{background:rgba(26,29,46,.07);border-color:rgba(26,29,46,.6);color:#1a1d2e;animation:none}
.btn-ghost{display:inline-flex;align-items:center;gap:6px;padding:10px 20px;font-size:10px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;border:1px solid rgba(255,255,255,.2);border-radius:3px;color:#6b7280;background:transparent;cursor:pointer;font-family:'DM Mono',monospace;transition:all .25s;text-decoration:none}
.btn-ghost:hover{border-color:rgba(255,255,255,.5);color:#e8e8e8}
.aw.lt .btn-ghost{border-color:rgba(0,0,0,.2);color:#6b7280}

.btabs{border-bottom:1px solid;position:sticky;top:0;z-index:40}
.aw.dk .btabs{background:rgba(5,7,14,.98);border-color:rgba(255,255,255,.07);box-shadow:0 4px 32px rgba(0,0,0,.6)}
.aw.lt .btabs{background:rgba(240,242,248,.98);border-color:rgba(0,0,0,.08)}
.btab{display:inline-flex;align-items:center;gap:5px;padding:0 14px;height:40px;font-size:9px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;font-family:'DM Mono',monospace;cursor:pointer;border:none;background:transparent;white-space:nowrap;transition:color .2s;position:relative}
.aw.dk .btab{color:#6b7280}.aw.lt .btab{color:#9ca3af}
.btab.on{color:#fff!important}.aw.lt .btab.on{color:#1a1d2e!important}
.btab.on::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.9),transparent);animation:tabin .2s ease forwards}
.btabs-wrap{display:flex;overflow-x:auto;scrollbar-width:none;max-width:1280px;margin:0 auto;padding:0 24px}
.btabs-wrap::-webkit-scrollbar{display:none}

.tgl{width:36px;height:36px;border-radius:50%;border:1.5px solid;cursor:pointer;transition:all .25s;background:transparent;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.aw.dk .tgl{border-color:rgba(255,255,255,.25);color:rgba(255,255,255,.7)}
.aw.lt .tgl{border-color:rgba(26,29,46,.25);color:rgba(26,29,46,.7)}

.aw.dk input,.aw.dk textarea,.aw.dk select{-webkit-text-fill-color:#f5f5f5!important;color:#f5f5f5!important}
.aw.lt input,.aw.lt textarea,.aw.lt select{-webkit-text-fill-color:#1a1d2e!important;color:#1a1d2e!important}
input::placeholder,textarea::placeholder{color:rgba(107,114,128,.6)!important;-webkit-text-fill-color:rgba(107,114,128,.6)!important}
.aw.dk select option{background:#0d0f1a}.aw.lt select option{background:#fff}

.fci{display:flex;align-items:center;gap:12px;padding:10px 14px;border-radius:8px;transition:all .3s;text-decoration:none;cursor:pointer}
.aw.dk .fci{background:rgba(232,232,232,.04);border:1.25px solid rgba(232,232,232,.2)}
.aw.lt .fci{background:rgba(255,255,255,.85);border:1.25px solid rgba(0,0,0,.1)}
.fci:hover{transform:translateY(-2px)}
.fci-icon{display:flex;align-items:center;justify-content:center;width:24px;height:24px;flex-shrink:0;border-radius:6px}
.aw.dk .fci-icon{background:rgba(232,232,232,.1);border:1px solid rgba(232,232,232,.2);color:#e8e8e8}
.aw.lt .fci-icon{background:rgba(26,29,46,.07);border:1px solid rgba(26,29,46,.12);color:#1a1d2e}

.sline{height:1px}
.aw.dk .sline{background:linear-gradient(90deg,transparent,rgba(255,255,255,.4),transparent)}
.aw.lt .sline{background:linear-gradient(90deg,transparent,rgba(0,0,0,.15),transparent)}

.pol h1,.pol h2{font-family:'DM Mono',monospace!important;font-weight:900;letter-spacing:.04em;text-transform:uppercase}
.pol h1{font-size:clamp(1rem,2.5vw,1.6rem);margin-bottom:28px}
.pol h2{font-size:.85rem;margin:24px 0 8px}
.pol p,.pol li{font-size:13px;line-height:1.85;font-weight:300;margin-bottom:10px}
.aw.dk .pol p,.aw.dk .pol li{color:#9ca3af}
.aw.lt .pol p,.aw.lt .pol li{color:#4b5563}
.pol ul{padding-left:20px;margin-bottom:14px}

::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:#07090f}::-webkit-scrollbar-thumb{background:#3a3f52;border-radius:2px}

@media(max-width:1024px){.hg{grid-template-columns:1fr!important}.hg-r{display:none!important}.nav-d{display:none!important}.nav-q{display:none!important}.mob-btn{display:flex!important}.cat-g{grid-template-columns:repeat(2,1fr)!important}.brd-g{grid-template-columns:repeat(6,1fr)!important}.foot-g{grid-template-columns:repeat(2,1fr)!important}.step-g{grid-template-columns:repeat(2,1fr)!important}.test-g{grid-template-columns:repeat(2,1fr)!important}}
@media(max-width:640px){.brd-g{grid-template-columns:repeat(4,1fr)!important}.cat-g{grid-template-columns:1fr!important}.step-g{grid-template-columns:1fr!important}.test-g{grid-template-columns:1fr!important}.foot-g{grid-template-columns:1fr!important}.sec{padding:40px 16px!important}}
@media(max-width:480px){.brd-g{grid-template-columns:repeat(3,1fr)!important}}
`;

// ── LOGO SVG ──
function AuapwLogo({size=80, uid="l"}) {
  const { logoSrc } = useLogo();
  if (logoSrc) {
    return <img src={logoSrc} alt="AUAPW" width={size} height={size} style={{display:"block",flexShrink:0,objectFit:"contain"}}/>;
  }
  const W=400,H=340,cx=200,cy=128,Ro=112,Rb=94,Ri=82,Ri2=75,N=16;
  const toRad = d => d*Math.PI/180;
  const pt = (r,a) => [+(cx+r*Math.cos(a)).toFixed(2),+(cy+r*Math.sin(a)).toFixed(2)];
  let gd="";
  for(let i=0;i<N;i++){
    const base=toRad(i*(360/N)-90),tw=toRad(5.2),gap=toRad(1.0);
    const [x0,y0]=pt(Rb,base-tw-gap),[x1,y1]=pt(Rb,base-tw),[x2,y2]=pt(Ro,base-tw);
    const [x3,y3]=pt(Ro,base+tw),[x4,y4]=pt(Rb,base+tw),[x5,y5]=pt(Rb,base+tw+gap);
    const ns=pt(Rb,toRad((i+1)*(360/N)-90)-toRad(5.2)-toRad(1.0));
    if(i===0)gd+="M"+x0+" "+y0+" ";else gd+="L"+x0+" "+y0+" ";
    gd+="L"+x1+" "+y1+" L"+x2+" "+y2+" L"+x3+" "+y3+" L"+x4+" "+y4+" L"+x5+" "+y5+" ";
    if(i<N-1)gd+="A"+Rb+" "+Rb+" 0 0 1 "+ns[0]+" "+ns[1]+" ";
  }
  gd+="Z";
  const cg="cg_"+uid, gf="gf_"+uid, tg="tg_"+uid, ec="ec_"+uid;
  return (
    <svg width={size} height={size*(H/W)} viewBox={"0 0 "+W+" "+H} style={{display:"block",flexShrink:0,overflow:"visible"}}>
      <defs>
        <linearGradient id={cg} x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#ffffff"/><stop offset="22%" stopColor="#d8e4f8"/>
          <stop offset="50%" stopColor="#6878a0"/><stop offset="78%" stopColor="#d0daf0"/>
          <stop offset="100%" stopColor="#ffffff"/>
        </linearGradient>
        <linearGradient id={tg} x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor="#ffffff"/><stop offset="22%" stopColor="#ccd8f0"/>
          <stop offset="50%" stopColor="#7080a0"/><stop offset="78%" stopColor="#dce8f8"/>
          <stop offset="100%" stopColor="#f8fcff"/>
        </linearGradient>
        <filter id={gf}><feGaussianBlur stdDeviation="0.6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <clipPath id={ec}><circle cx={cx} cy={cy} r={Ri2-3}/></clipPath>
      </defs>
      <path d={gd} fill={"url(#"+cg+")"} opacity="0.93"/>
      <circle cx={cx} cy={cy} r={Ri} fill="none" stroke={"url(#"+cg+")"} strokeWidth="3.2"/>
      <circle cx={cx} cy={cy} r={Ri2} fill="none" stroke={"url(#"+cg+")"} strokeWidth="1.4" opacity="0.6"/>
      <g clipPath={"url(#"+ec+")"} fill="none" stroke={"url(#"+cg+")"} strokeLinecap="round" strokeLinejoin="round">
        <rect x={cx-45} y={cy-2} width="40" height="22" rx="3" fill="rgba(200,215,240,0.16)" strokeWidth="2.2"/>
        <rect x={cx-41} y={cy-20} width="12" height="20" rx="2" fill="rgba(200,215,240,0.10)" strokeWidth="1.9"/>
        <rect x={cx-25} y={cy-20} width="12" height="20" rx="2" fill="rgba(200,215,240,0.10)" strokeWidth="1.9"/>
        <circle cx={cx+26} cy={cy+3} r="20" fill="rgba(180,200,228,0.06)" strokeWidth="2.1"/>
        <circle cx={cx+26} cy={cy+3} r="10" fill="rgba(180,200,228,0.10)" strokeWidth="1.7"/>
        <line x1={cx+26} y1={cy-17} x2={cx+26} y2={cy-7} strokeWidth="1.9"/>
        <line x1={cx+26} y1={cy+13} x2={cx+26} y2={cy+23} strokeWidth="1.9"/>
        <line x1={cx+6} y1={cy+3} x2={cx+16} y2={cy+3} strokeWidth="1.9"/>
        <line x1={cx+36} y1={cy+3} x2={cx+46} y2={cy+3} strokeWidth="1.9"/>
      </g>
      <text x={W/2} y={H-14} textAnchor="middle" fontFamily="Arial Black, Impact, sans-serif" fontWeight="900" fontSize="108" textLength="368" lengthAdjust="spacingAndGlyphs" fill="rgba(0,0,0,0.9)" dx="4" dy="6">AUAPW</text>
      <text x={W/2} y={H-14} textAnchor="middle" fontFamily="Arial Black, Impact, sans-serif" fontWeight="900" fontSize="108" textLength="368" lengthAdjust="spacingAndGlyphs" fill={"url(#"+tg+")"} filter={"url(#"+gf+")"}>AUAPW</text>
      <text x={W/2} y={H-14} textAnchor="middle" fontFamily="Arial Black, Impact, sans-serif" fontWeight="900" fontSize="108" textLength="368" lengthAdjust="spacingAndGlyphs" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.6">AUAPW</text>
    </svg>
  );
}

function LogoCircle({size=60, uid="c"}) {
  const { logoSrc } = useLogo();
  if (logoSrc) {
    return (
      <div style={{width:size,height:size,borderRadius:"50%",overflow:"hidden",flexShrink:0,background:"transparent"}}>
        <img src={logoSrc} alt="AUAPW" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
      </div>
    );
  }
  return (
    <div style={{width:size,height:size,borderRadius:"50%",overflow:"hidden",flexShrink:0,background:"transparent",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <AuapwLogo size={size*1.6} uid={uid}/>
    </div>
  );
}

// ── PRIMITIVES ──
function GSB(){return <div className="gsb"/>;}
function DLed({sm}){return <div className={sm?"dled-sm":"dled"}/>;}
function SLabel({children,tok}){return <span style={{fontSize:10,fontWeight:700,letterSpacing:".3em",textTransform:"uppercase",fontFamily:MH,color:tok.fg}}>{children}</span>;}
function SecLine({label,tok}){return(<div style={{display:"flex",alignItems:"center",gap:14,marginBottom:18}}><div style={{width:28,height:1,background:"linear-gradient(90deg,transparent,rgba(232,232,232,.5))"}}/><SLabel tok={tok}>{label}</SLabel></div>);}

function SecHead({label,title,center,tok,cls}){
  cls = cls || "chrome";
  return(
    <div style={{marginBottom:40,textAlign:center?"center":"left"}}>
      {center
        ? <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:14,marginBottom:18}}>
            <div style={{width:28,height:1,background:"linear-gradient(90deg,transparent,rgba(232,232,232,.4))"}}/><DLed sm/><SLabel tok={tok}>{label}</SLabel><DLed sm/>
            <div style={{width:28,height:1,background:"linear-gradient(270deg,transparent,rgba(232,232,232,.4))"}}/>
          </div>
        : <SecLine label={label} tok={tok}/>
      }
      <h2 className={cls} style={{fontFamily:MH,fontSize:"clamp(1.1rem,3vw,2rem)",fontWeight:900,letterSpacing:".04em",textTransform:"uppercase",lineHeight:1.15}}>{title}</h2>
    </div>
  );
}

// ── PART SUGGEST ──
function PartSuggest({value,onChange,onSelect,style,tok}){
  const [open,setOpen]=useState(false);
  const ref=React.useRef(null);
  const q=value.trim().toLowerCase();
  const suggs=q.length>=1?ALL_PARTS.filter(p=>p.toLowerCase().includes(q)).slice(0,10):POP_PARTS;
  useEffect(()=>{const h=e=>{if(ref.current&&!ref.current.contains(e.target))setOpen(false);};document.addEventListener("mousedown",h);return()=>document.removeEventListener("mousedown",h);},[]);
  return(
    <div ref={ref} style={{position:"relative"}}>
      <input value={value} onChange={e=>{onChange(e.target.value);setOpen(true);}} onFocus={()=>setOpen(true)} placeholder="e.g. Engine, CV Axle, Alternator" autoComplete="off" style={style}/>
      {open&&(
        <div style={{position:"absolute",top:"100%",left:0,right:0,zIndex:300,background:tok.inp,backdropFilter:"blur(20px)",border:"1px solid "+tok.bd,borderTop:"none",borderRadius:"0 0 6px 6px",boxShadow:"0 16px 48px rgba(0,0,0,.4)",overflow:"hidden",maxHeight:260,overflowY:"auto"}}>
          {suggs.map((p,i)=>{
            const cat=PARTS.find(c=>c.parts.includes(p));
            const CI=cat?cat.Icon:Cog;
            return(
              <div key={p} onMouseDown={()=>{onSelect(p);setOpen(false);}} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 13px",borderBottom:i<suggs.length-1?"1px solid "+tok.bdd:"none",cursor:"pointer",background:"transparent"}} onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.07)"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                <div style={{width:22,height:22,borderRadius:4,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(255,255,255,.05)",border:"1px solid "+tok.bdd,flexShrink:0}}><CI size={10} color={tok.dim}/></div>
                <span style={{fontSize:12,color:tok.muted,fontFamily:MH}}>{p}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── QUOTE FORM ──
function QuoteForm({defaultPart,tok}){
  defaultPart = defaultPart || "";
  const YEARS=Array.from({length:37},(_,i)=>String(2025-i));
  const [year,setYear]=useState("");const [make,setMake]=useState("");const [model,setModel]=useState("");const [part,setPart]=useState(defaultPart);
  const [fn,setFn]=useState("");const [ln,setLn]=useState("");const [phone,setPhone]=useState("");const [email,setEmail]=useState("");
  const [zip,setZip]=useState("");const [state,setState_]=useState("");const [consent,setConsent]=useState(false);
  const [errs,setErrs]=useState({});const [status,setStatus]=useState("idle");
  const mods=make&&MODELS[make]?MODELS[make]:[];
  const clr=f=>setErrs(p=>({...p,[f]:""}));
  const iS=(err)=>({padding:"8px 10px",background:tok.inp,border:"1px solid "+(err?"rgba(239,68,68,.6)":tok.bd),borderRadius:5,fontSize:12,fontFamily:MH,outline:"none",width:"100%",color:tok.fg});
  const sS=(err)=>({...iS(err),appearance:"none",cursor:"pointer"});
  const Lbl=({c,req})=>(<div style={{fontSize:9,color:tok.dim,letterSpacing:".18em",textTransform:"uppercase",marginBottom:5,fontFamily:MH,display:"flex",gap:4}}>{c}{req&&<span style={{color:"rgba(239,68,68,.8)"}}>*</span>}</div>);
  const Err=({f})=>errs[f]?<div style={{fontSize:9,color:"rgba(239,68,68,.8)",marginTop:3}}>{"warning: "+errs[f]}</div>:null;
  const validate=()=>{
    const e={};
    if(!year)e.year="Required";if(!make)e.make="Required";if(!model)e.model="Required";if(!part.trim())e.part="Required";
    if(!fn.trim())e.fn="Required";if(!ln.trim())e.ln="Required";if(!phone.trim())e.phone="Required";if(!email.trim())e.email="Required";
    if(email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))e.email="Invalid";if(!zip.trim())e.zip="Required";if(!state)e.state="Required";
    if(!consent)e.consent="Please agree";return e;
  };
  const submit=async()=>{
    const e=validate();if(Object.keys(e).length){setErrs(e);return;}
    setErrs({});setStatus("sending");
    const ok=await sendLead({year,make,model,part,name:fn+" "+ln,phone,email,location:state+" "+zip,notes:""});
    setStatus(ok?"success":"error");
  };
  if(status==="success")return(
    <div style={{padding:28,textAlign:"center"}}>
      <CheckCircle size={40} color="#4ade80" style={{margin:"0 auto 12px"}}/>
      <h3 style={{fontFamily:MH,fontSize:15,fontWeight:900,color:tok.fg,marginBottom:8,textTransform:"uppercase",letterSpacing:".04em"}}>Quote Submitted!</h3>
      <p style={{fontSize:12,color:tok.muted,lineHeight:1.7,marginBottom:14}}>{"Thanks "+fn+"! We will email "+email+" within 24 hours."}</p>
      <button className="btn-ghost" style={{width:"100%",justifyContent:"center"}} onClick={()=>setStatus("idle")}>Submit Another</button>
    </div>
  );
  return(
    <div style={{position:"relative",zIndex:1}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
        <LogoCircle size={40} uid="qf"/>
        <div><div className="emboss" style={{fontSize:13,letterSpacing:".08em",lineHeight:1}}>AUAPW.ORG</div><div style={{fontSize:8,color:tok.dim,fontFamily:MH}}>Free Quote - No Credit Card</div></div>
      </div>
      <h3 style={{fontFamily:MH,fontSize:14,fontWeight:900,color:tok.fg,marginBottom:3,letterSpacing:".04em",textTransform:"uppercase"}}>Find Your Part</h3>
      <p style={{fontSize:10,color:tok.dim,fontFamily:MH,marginBottom:14}}>24hr Response - Free Shipping - 6-Mo Warranty</p>
      <div style={{marginBottom:7}}><Lbl c="Year" req/><select value={year} onChange={e=>{setYear(e.target.value);clr("year");}} style={sS(errs.year)}><option value="">Select Year</option>{YEARS.map(y=><option key={y}>{y}</option>)}</select><Err f="year"/></div>
      <div style={{marginBottom:7}}><Lbl c="Make" req/><select value={make} onChange={e=>{setMake(e.target.value);setModel("");clr("make");}} style={sS(errs.make)}><option value="">Select Make</option>{MAKES.map(m=><option key={m}>{m}</option>)}</select><Err f="make"/></div>
      <div style={{marginBottom:7}}><Lbl c="Model" req/><select value={model} onChange={e=>{setModel(e.target.value);clr("model");}} style={{...sS(errs.model),opacity:make?1:0.5}} disabled={!make}><option value="">{make?"Select Model":"Select Make First"}</option>{mods.map(m=><option key={m}>{m}</option>)}</select><Err f="model"/></div>
      <div style={{marginBottom:7}}><Lbl c="Part Needed" req/><PartSuggest value={part} onChange={v=>{setPart(v);clr("part");}} onSelect={v=>{setPart(v);clr("part");}} style={iS(errs.part)} tok={tok}/><Err f="part"/></div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:7}}>
        <div><Lbl c="First Name" req/><input value={fn} onChange={e=>{setFn(e.target.value);clr("fn");}} placeholder="John" style={iS(errs.fn)}/><Err f="fn"/></div>
        <div><Lbl c="Last Name" req/><input value={ln} onChange={e=>{setLn(e.target.value);clr("ln");}} placeholder="Smith" style={iS(errs.ln)}/><Err f="ln"/></div>
      </div>
      <div style={{marginBottom:7}}><Lbl c="Phone" req/><input value={phone} onChange={e=>{setPhone(e.target.value);clr("phone");}} placeholder="(555) 000-0000" type="tel" style={iS(errs.phone)}/><Err f="phone"/></div>
      <div style={{marginBottom:7}}><Lbl c="Email" req/><input value={email} onChange={e=>{setEmail(e.target.value);clr("email");}} placeholder="you@email.com" type="email" style={iS(errs.email)}/><Err f="email"/></div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
        <div><Lbl c="Zip Code" req/><input value={zip} onChange={e=>{setZip(e.target.value);clr("zip");}} placeholder="90210" style={iS(errs.zip)} maxLength={10}/><Err f="zip"/></div>
        <div><Lbl c="State" req/><select value={state} onChange={e=>{setState_(e.target.value);clr("state");}} style={sS(errs.state)}><option value="">State</option>{STATES.map(s=><option key={s}>{s}</option>)}</select><Err f="state"/></div>
      </div>
      <div style={{marginBottom:14}}>
        <label style={{display:"flex",gap:8,alignItems:"flex-start",cursor:"pointer"}}>
          <input type="checkbox" checked={consent} onChange={e=>{setConsent(e.target.checked);clr("consent");}} style={{marginTop:2,width:13,height:13,flexShrink:0}}/>
          <span style={{fontSize:9,color:tok.dimmer,fontFamily:MH,lineHeight:1.6}}>By submitting you authorize AUAPW.ORG to contact you via phone/text/email.</span>
        </label>
        {errs.consent&&<div style={{fontSize:9,color:"rgba(239,68,68,.8)",marginTop:4}}>{"warning: "+errs.consent}</div>}
      </div>
      {status==="error"&&(
        <div style={{padding:"10px 14px",background:"rgba(239,68,68,.07)",border:"1px solid rgba(239,68,68,.25)",borderRadius:6,marginBottom:12}}>
          <div style={{fontSize:11,fontWeight:700,color:"rgba(239,68,68,.9)",marginBottom:6}}>Auto-send blocked</div>
          <a href={"mailto:"+LEAD+"?subject="+encodeURIComponent("[AUAPW Quote] "+year+" "+make+" "+model)+"&body="+encodeURIComponent("Part: "+part+"\nPhone: "+phone)} style={{display:"block",padding:"7px 12px",background:"rgba(239,68,68,.15)",border:"1px solid rgba(239,68,68,.3)",borderRadius:4,color:"rgba(239,68,68,.9)",textDecoration:"none",fontSize:10,fontWeight:700,textAlign:"center",marginBottom:6}}>Email Us Directly</a>
          <a href="tel:8888185001" style={{display:"block",padding:"7px 12px",background:"rgba(255,255,255,.04)",border:"1px solid "+tok.bdd,borderRadius:4,color:tok.fg,textDecoration:"none",fontSize:10,fontWeight:700,textAlign:"center"}}>Call (888) 818-5001</a>
        </div>
      )}
      <button className="btn-led" style={{width:"100%",padding:"13px",opacity:status==="sending"?.7:1}} onClick={submit} disabled={status==="sending"}>{status==="sending"?"Sending...":"Get Free Quote"}</button>
      <p style={{textAlign:"center",fontSize:9,color:tok.dimmer,fontFamily:MH,marginTop:8}}>Guaranteed response within 24 hours</p>
      <div style={{marginTop:12,paddingTop:12,borderTop:"1px solid "+tok.bdd}}>
        <a href="tel:8888185001" className="fci" style={{textDecoration:"none"}}><div className="fci-icon"><Phone size={12}/></div><div><span style={{fontSize:8,color:tok.dim,display:"block",letterSpacing:".12em",textTransform:"uppercase"}}>Prefer to call?</span><span style={{fontSize:12,fontWeight:600,color:tok.fg}}>{PHONE}</span></div></a>
      </div>
    </div>
  );
}

// ── BRAND LOGOS ──
function BrandLogos({goTo,tok}){
  const brands=Object.keys(BCOLORS).sort();
  const letters=["All",...Array.from(new Set(brands.map(b=>b[0].toUpperCase()))).sort()];
  const [tab,setTab]=useState("All");
  const filtered=tab==="All"?brands:brands.filter(b=>b[0].toUpperCase()===tab);
  const gi=b=>{const w=b.split(/[\s-]+/);return w.length>=2?(w[0][0]+w[1][0]).toUpperCase():b.slice(0,3).toUpperCase();};
  return(
    <section style={{padding:"56px 24px",borderTop:"1px solid "+tok.bdd,borderBottom:"1px solid "+tok.bdd}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <SecHead label="All Vehicle Makes" title="Shop by Brand" center tok={tok}/>
        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:4,marginBottom:22}}>
          {letters.map(l=><button key={l} onClick={()=>setTab(l)} style={{minWidth:34,height:28,padding:"0 8px",borderRadius:4,fontSize:10,fontWeight:700,cursor:"pointer",border:"none",fontFamily:MH,background:tab===l?"linear-gradient(135deg,#fff,#94a3b8)":"rgba(255,255,255,.05)",color:tab===l?"#07090f":tok.muted,transition:"all .2s"}}>{l}</button>)}
        </div>
        <div className="brd-g" style={{display:"grid",gridTemplateColumns:"repeat(8,1fr)",gap:8}}>
          {filtered.map(b=>{
            const c=BCOLORS[b]||"#1a1d28";
            return(
              <div key={b} onClick={()=>goTo("brand",b)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:5,padding:6,borderRadius:7,cursor:"pointer",transition:"all .3s",border:"1px solid "+tok.bdd,background:tok.card}} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.borderColor="rgba(232,232,232,.22)";}} onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.borderColor=tok.bdd;}}>
                <div style={{width:"100%",height:42,borderRadius:5,background:"linear-gradient(135deg,"+c+","+c+"88)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,fontWeight:900,color:"white",fontFamily:"Arial, sans-serif"}} dangerouslySetInnerHTML={{__html:BRAND_LOGOS[b]||'<svg viewBox="0 0 100 100"><text x="50" y="72" font-size="40" fill="white" text-anchor="middle" font-family="Arial">'+b.slice(0,3).toUpperCase()+'</text></svg>'}}></div>
                <span style={{fontSize:7.5,fontWeight:700,color:tok.dim,fontFamily:MH,textAlign:"center",letterSpacing:".08em",textTransform:"uppercase",lineHeight:1.3}}>{b}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── PAGE BANNER ──
function PageBanner({subtitle,tok}){
  const luxuryBrands = ["Mercedes-Benz","BMW","Audi","Porsche","Jaguar","Land Rover","Lexus","Cadillac","Infiniti","Genesis"];
  return(
    <div style={{position:"relative",overflow:"hidden",background:"linear-gradient(180deg,#060810,#0a0c15 50%,#060810)",borderBottom:"1px solid rgba(255,255,255,.06)"}}>
      <div style={{padding:"12px 24px",display:"flex",alignItems:"center",gap:12,overflowX:"auto",maskImage:"linear-gradient(90deg,transparent,black 10%,black 90%,transparent)",webkitMaskImage:"linear-gradient(90deg,transparent,black 10%,black 90%,transparent)"}}>
        {luxuryBrands.map(b=>(
          <div key={b} style={{display:"flex",alignItems:"center",gap:6,padding:"6px 12px",background:"rgba(255,255,255,.05)",borderRadius:6,whiteSpace:"nowrap",fontSize:13,fontWeight:700,color:"rgba(255,255,255,.7)",fontFamily:"DM Mono"}}>
            <div style={{width:16,height:16,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:900,color:"white",fontFamily:"Arial, sans-serif"}} dangerouslySetInnerHTML={{__html:BRAND_LOGOS[b]||'<svg viewBox="0 0 100 100"><circle r="50" cx="50" cy="50" fill="white"/></svg>'}}></div>
            <span>{b}</span>
          </div>
        ))}
      </div>
      <div style={{padding:"18px 24px",borderBottom:"1px solid rgba(255,255,255,.06)",borderTop:"1px solid rgba(255,255,255,.06)"}}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,rgba(255,255,255,.55) 50%,transparent)"}}/>
      <div style={{maxWidth:1400,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",gap:24,flexWrap:"wrap"}}>
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <LogoCircle size={52} uid="pb"/>
          <div>
            <div className="emboss" style={{fontSize:"clamp(1.1rem,2.5vw,1.6rem)",fontWeight:900,fontFamily:MH,letterSpacing:".04em",lineHeight:1,marginBottom:3}}>AUAPW.ORG</div>
            <div style={{display:"flex",alignItems:"center",gap:5}}><DLed sm/><div className="sub-ch" style={{fontSize:"clamp(.5rem,.9vw,.6rem)",letterSpacing:".2em",whiteSpace:"nowrap"}}>ALL USED AUTO PARTS WAREHOUSE</div></div>
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
          <div style={{display:"flex",alignItems:"center",gap:7}}><DLed sm/><div className="tag-ch" style={{fontSize:"clamp(.44rem,.9vw,.55rem)",whiteSpace:"nowrap"}}>Your Trusted Partner for Automotive Services and Solutions</div><DLed sm/></div>
          {subtitle&&<div style={{fontSize:"clamp(6px,.8vw,8px)",color:"rgba(120,138,168,.45)",fontFamily:MH,letterSpacing:".18em",textTransform:"uppercase"}}>{subtitle}</div>}
        </div>
        <div style={{display:"flex",gap:14,alignItems:"center"}}>
          {[{I:Shield,l:"6-Mo Warranty"},{I:Zap,l:"24hr Response"},{I:Truck,l:"Free Shipping"}].map(function(x){return(
            <div key={x.l} style={{display:"flex",alignItems:"center",gap:6}}><DLed sm/><span style={{fontSize:"clamp(7px,.85vw,9px)",fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:"rgba(200,212,232,.7)",fontFamily:MH}}>{x.l}</span></div>
          );})}</div>
      </div>
      </div>
    </div>
  );
}

// ── URL BAR ──
const PAGE_URLS = {"home":"/","parts":"/parts","used-engines":"/used-engines","used-transmissions":"/used-transmissions","makes":"/brands","inventory":"/inventory","quote":"/get-a-quote","about":"/about","contact":"/contact","blog":"/blog","downloads":"/downloads","privacy":"/privacy-policy","terms":"/terms-and-conditions","shipping":"/shipping-policy","returns":"/return-policy","cookies":"/cookie-policy","disclaimer":"/disclaimer","acceptable-use":"/acceptable-use"};
function UrlBar({page,pageData,tok,theme}){
  const slug=page==="brand"?"/brands/"+(pageData||"").toLowerCase().replace(/\s+/g,"-").replace(/[^a-z0-9-]/g,""):(PAGE_URLS[page]||"/");
  return(
    <div style={{background:theme==="light"?"rgba(220,224,238,.98)":"rgba(4,6,13,.98)",borderBottom:"1px solid "+tok.bdd,padding:"5px 20px",display:"flex",alignItems:"center",gap:10}}>
      <div style={{display:"flex",alignItems:"center",gap:5,flexShrink:0}}>
        <div style={{width:8,height:8,borderRadius:"50%",background:"rgba(255,99,99,.7)"}}/>
        <div style={{width:8,height:8,borderRadius:"50%",background:"rgba(255,189,68,.7)"}}/>
        <div style={{width:8,height:8,borderRadius:"50%",background:"rgba(78,199,78,.7)"}}/>
      </div>
      <div style={{flex:1,display:"flex",alignItems:"center",background:theme==="light"?"rgba(255,255,255,.8)":"rgba(255,255,255,.05)",border:"1px solid "+tok.bdd,borderRadius:5,padding:"3px 10px",gap:7,maxWidth:540}}>
        <div style={{width:9,height:9,borderRadius:"50%",border:"1.5px solid rgba(74,222,128,.7)",flexShrink:0}}/>
        <span style={{fontSize:12,fontFamily:MH,color:tok.muted}}>{"auapw.org"+slug}</span>
      </div>
    </div>
  );
}

// ── NAVBAR ──
function Navbar({page,goTo,tok,theme,toggle}){
  const [mob,setMob]=useState(false);
  const items=[{l:"Home",p:"home"},{l:"Parts",p:"parts"},{l:"Engines",p:"used-engines"},{l:"Transmissions",p:"used-transmissions"},{l:"Inventory",p:"inventory"},{l:"Brands",p:"makes"},{l:"About",p:"about"},{l:"Contact",p:"contact"},{l:"Blog",p:"blog"},{l:"Downloads",p:"downloads"}];
  const TICKS=["2,000+ Verified Yards","Free Shipping","6-Month Warranty","24-Hr Response","50+ Car Brands","Ships USA-Wide"];
  return(
    <nav style={{position:"sticky",top:0,zIndex:50}}>
      <div style={{height:28,background:theme==="light"?"rgba(225,228,242,.97)":"rgba(10,12,20,.97)",borderBottom:"1px solid "+tok.bdd,overflow:"hidden",position:"relative"}}>
        <div style={{display:"flex",animation:"ticker 26s linear infinite",height:"100%",alignItems:"center",gap:36}}>
          {[...TICKS,...TICKS,...TICKS].map(function(t,i){return(<span key={i} style={{display:"flex",alignItems:"center",gap:7,fontSize:"0.58rem",fontWeight:800,letterSpacing:".18em",textTransform:"uppercase",color:tok.dim,fontFamily:MH,flexShrink:0}}><Zap size={8}/>{t}</span>);})}</div>
      </div>
      <div style={{height:62,background:theme==="light"?"rgba(238,240,250,.97)":"rgba(8,10,18,.97)",backdropFilter:"blur(28px)",borderBottom:"1px solid "+tok.bdd}}>
        <div style={{maxWidth:1380,margin:"0 auto",padding:"0 20px",display:"flex",alignItems:"center",height:"100%",justifyContent:"space-between",gap:16}}>
          <button onClick={()=>goTo("home")} style={{display:"flex",alignItems:"center",gap:10,background:"none",border:"none",cursor:"pointer",flexShrink:0}}>
            <LogoCircle size={42} uid="nav"/>
            <div style={{textAlign:"left"}}>
              <div className="emboss" style={{fontSize:14,letterSpacing:".08em",lineHeight:1}}>AUAPW.ORG</div>
              <div style={{fontSize:7,color:tok.dim,fontFamily:MH,letterSpacing:".1em",marginTop:1}}>ALL USED AUTO PARTS WAREHOUSE</div>
            </div>
          </button>
          <div className="nav-d" style={{display:"flex",gap:16,flex:1,justifyContent:"center"}}>
            {items.map(function(x){return(<button key={x.p} onClick={()=>goTo(x.p)} style={{fontSize:10,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:page===x.p?tok.fg:tok.muted,cursor:"pointer",fontFamily:MH,border:"none",background:"none",transition:"color .2s",padding:"3px 0",borderBottom:page===x.p?"1px solid rgba(255,255,255,.4)":"1px solid transparent"}}>{x.l}</button>);})}</div>
          <div style={{display:"flex",gap:8,alignItems:"center",flexShrink:0}}>
            <a href="tel:8888185001" className="nav-q" style={{display:"flex",alignItems:"center",gap:5,fontSize:11,color:tok.dim,fontFamily:MH,textDecoration:"none"}}><Phone size={10}/>{PHONE}</a>
            <button className="btn-led nav-q" style={{padding:"8px 14px",fontSize:9}} onClick={()=>goTo("quote")}>Get Free Quote</button>
            <button className="tgl" onClick={toggle}>{theme==="dark"?<Sun size={14}/>:<Moon size={14}/>}</button>
            <button className="mob-btn" onClick={()=>setMob(!mob)} style={{display:"none",alignItems:"center",justifyContent:"center",width:38,height:38,background:"none",border:"1px solid "+tok.bdd,borderRadius:4,cursor:"pointer",color:tok.fg}}>{mob?<X size={16}/>:<Menu size={16}/>}</button>
          </div>
        </div>
      </div>
      {mob&&(
        <div style={{position:"absolute",top:"100%",left:0,right:0,background:theme==="light"?"rgba(238,240,250,.99)":"rgba(6,8,15,.99)",backdropFilter:"blur(20px)",borderBottom:"1px solid "+tok.bdd,zIndex:49,padding:"8px 0"}}>
          {items.map(function(x){return(<button key={x.p} onClick={()=>{goTo(x.p);setMob(false);}} style={{display:"block",width:"100%",textAlign:"left",padding:"12px 22px",fontSize:12,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:page===x.p?tok.fg:tok.muted,cursor:"pointer",fontFamily:MH,border:"none",background:"transparent"}}>{x.l}</button>);})}
          <div style={{padding:"12px 22px",borderTop:"1px solid "+tok.bdd,display:"flex",flexDirection:"column",gap:10}}>
            <a href="tel:8888185001" style={{fontSize:11,color:tok.dim,fontFamily:MH,textDecoration:"none",display:"flex",alignItems:"center",gap:5}}><Phone size={10}/>{PHONE}</a>
            <button className="btn-led" style={{padding:"10px",fontSize:9,width:"100%"}} onClick={()=>{goTo("quote");setMob(false);}}>Get Free Quote</button>
          </div>
        </div>
      )}
    </nav>
  );
}

// ── BANNER TABS ──
function BannerTabs({active,setActive}){
  return(
    <div className="btabs"><div className="btabs-wrap">
      {[{id:"all",label:"All Parts",Icon:Search},...PARTS.map(p=>({id:p.id,label:p.label,Icon:p.Icon}))].map(function(x){return(
        <button key={x.id} className={"btab"+(active===x.id?" on":"")} onClick={()=>setActive(x.id)}>
          <x.Icon size={10} style={{opacity:active===x.id?1:.5}}/>{x.label}
        </button>
      );})}</div></div>
  );
}

// ── FOOTER ──
function Footer({goTo,tok}){
  const cols=[
    {h:"Used Parts",items:[{l:"Used Engines",p:"used-engines"},{l:"Used Transmissions",p:"used-transmissions"},{l:"All Parts",p:"parts"},{l:"Inventory",p:"inventory"},{l:"Get a Quote",p:"quote"},{l:"All Brands",p:"makes"}]},
    {h:"Categories",items:PARTS.map(c=>({l:c.label,p:"parts-"+c.id}))},
    {h:"Company",items:[{l:"About Us",p:"about"},{l:"Blog and Guides",p:"blog"},{l:"Contact Us",p:"contact"},{l:"Downloads",p:"downloads"},{l:"How It Works",p:"home"}]},
    {h:"Support",items:[{l:"Free Shipping",p:"shipping"},{l:"Easy Returns",p:"returns"},{l:"6-Month Warranty",p:"about"},{l:"Parts FAQ",p:"blog"},{l:"Why Used Parts",p:"about"}]},
    {h:"Legal",items:[{l:"Privacy Policy",p:"privacy"},{l:"Terms and Conditions",p:"terms"},{l:"Shipping Policy",p:"shipping"},{l:"Return Policy",p:"returns"},{l:"Cookie Policy",p:"cookies"},{l:"Disclaimer",p:"disclaimer"},{l:"Acceptable Use",p:"acceptable-use"}]}
  ];
  return(
    <footer style={{background:"rgba(5,7,14,.99)",borderTop:"1px solid "+tok.bdd,paddingTop:44,fontFamily:MH}}>
      <div style={{maxWidth:1380,margin:"0 auto",padding:"0 24px"}}>
        <div className="foot-g" style={{display:"grid",gridTemplateColumns:"1.8fr repeat(5,1fr)",gap:24,paddingBottom:32,borderBottom:"1px solid "+tok.bdd}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
              <LogoCircle size={48} uid="ft"/>
              <div>
                <div className="emboss" style={{fontSize:"1rem",letterSpacing:".06em",lineHeight:1}}>AUAPW.ORG</div>
                <div style={{fontSize:7,color:tok.dim,letterSpacing:".08em",marginTop:2,lineHeight:1.4}}>ALL USED AUTO PARTS WAREHOUSE</div>
              </div>
            </div>
            <p style={{fontSize:11,color:tok.muted,lineHeight:1.8,fontWeight:300,marginBottom:14,maxWidth:280}}>Connecting buyers with 2,000+ verified salvage yards nationwide. Quality used OEM parts with 6-month warranty and free shipping.</p>
            {[{I:Phone,v:PHONE,h:"tel:8888185001"},{I:Mail,v:EMAIL,h:"mailto:"+EMAIL},{I:MapPin,v:ADDRESS}].map(function(x){return(
              <a key={x.v} href={x.h||"#"} className="fci" style={{textDecoration:"none",marginBottom:8,display:"flex"}}>
                <div className="fci-icon"><x.I size={11}/></div><span style={{fontSize:10,fontWeight:600,color:tok.fg}}>{x.v}</span>
              </a>
            );})}
          </div>
          {cols.map(function(col){return(
            <div key={col.h}>
              <div style={{fontSize:10,fontWeight:700,letterSpacing:".2em",textTransform:"uppercase",color:"rgba(232,232,232,.65)",marginBottom:10}}>{col.h}</div>
              <div style={{width:"100%",height:1,background:"linear-gradient(90deg,rgba(255,255,255,.1),transparent)",marginBottom:10}}/>
              <div style={{display:"flex",flexDirection:"column",gap:7}}>
                {col.items.map(function(x){return(
                  <button key={x.p+x.l} onClick={()=>goTo(x.p)} style={{background:"none",border:"none",textAlign:"left",fontSize:11,color:tok.muted,cursor:"pointer",fontFamily:MH,padding:0,transition:"color .2s",letterSpacing:".02em"}} onMouseEnter={e=>e.target.style.color=tok.fg} onMouseLeave={e=>e.target.style.color=tok.muted}>{x.l}</button>
                );})}
              </div>
            </div>
          );})}
        </div>
        <div style={{padding:"12px 0",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
          <span style={{fontSize:8.5,color:tok.dimmer,letterSpacing:".08em"}}>2025 AUAPW.ORG - ALL USED AUTO PARTS WAREHOUSE - Your Trusted Partner for Automotive Services and Solutions</span>
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            {["privacy","terms","shipping","returns","cookies","disclaimer"].map(p=>(
              <button key={p} onClick={()=>goTo(p)} style={{background:"none",border:"none",fontSize:9,color:tok.dimmer,cursor:"pointer",fontFamily:MH,letterSpacing:".06em",padding:0,textTransform:"capitalize"}} onMouseEnter={e=>e.target.style.color=tok.fg} onMouseLeave={e=>e.target.style.color=tok.dimmer}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── HOME PAGE ──
function HomePage({goTo,tok,theme}){
  const [ptab,setPtab]=useState("all");
  const REVIEWS=[{t:"Found a complete engine for my F-150 at a fraction of dealer price. Seamless process, perfect condition.",n:"Michael R.",l:"Austin, TX"},{t:"Called Monday, had a quote Tuesday morning. Transmission arrived Wednesday. Outstanding service.",n:"Sandra L.",l:"Phoenix, AZ"},{t:"Second time using AUAPW. Both times faultless. The 6-month warranty gives real peace of mind.",n:"James T.",l:"Atlanta, GA"},{t:"Skeptical about buying a used engine online. Their team confirmed fitment. Couldn't ask for more.",n:"Patricia M.",l:"Seattle, WA"}];
  return <>
    <BannerTabs active={ptab} setActive={setPtab}/>
    <section className="sec" style={{position:"relative",overflow:"hidden",background:theme==="light"?"linear-gradient(160deg,#e8eaf4,#f0f2f8)":"linear-gradient(160deg,#04060d,#08090f 40%,#0c0e18)",padding:"48px 24px 56px"}}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,rgba(255,255,255,.7) 50%,transparent)"}}/>
      <div style={{maxWidth:1360,margin:"0 auto",position:"relative",zIndex:3}}>
        <div style={{display:"flex",alignItems:"center",gap:18,marginBottom:28,paddingBottom:22,borderBottom:"1px solid "+tok.bdd,flexWrap:"wrap"}}>
          <LogoCircle size={88} uid="hero"/>
          <div>
            <div className="emboss" style={{fontSize:"clamp(2rem,5.5vw,3.4rem)",fontWeight:900,fontFamily:MH,letterSpacing:".04em",lineHeight:1,marginBottom:6}}>AUAPW.ORG</div>
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}><DLed sm/><div className="sub-ch" style={{fontSize:"clamp(.5rem,1.4vw,.72rem)",letterSpacing:".24em",whiteSpace:"nowrap"}}>ALL USED AUTO PARTS WAREHOUSE</div></div>
            <div style={{display:"flex",alignItems:"center",gap:6}}><DLed sm/><div className="tag-ch" style={{fontSize:"clamp(.52rem,1.2vw,.65rem)",whiteSpace:"nowrap"}}>Your Trusted Partner for Automotive Services and Solutions</div></div>
          </div>
          <div style={{marginLeft:"auto",display:"flex",gap:10,flexWrap:"wrap",justifyContent:"flex-end"}}>
            {[{e:"🛡️",l:"Verified Parts",s:"OEM Quality"},{e:"🚚",l:"Free Shipping",s:"Nationwide"},{e:"📞",l:"24hr Response",s:"Expert Team"},{e:"✅",l:"6-Mo Warranty",s:"All Parts"}].map(function(b){return(
              <div key={b.l} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 12px",background:tok.card,border:"1px solid "+tok.bdd,borderRadius:6}}>
                <span style={{fontSize:18}}>{b.e}</span>
                <div><div style={{fontSize:10,fontWeight:800,color:tok.fg,fontFamily:MH}}>{b.l}</div><div style={{fontSize:9,color:tok.dim,fontFamily:MH}}>{b.s}</div></div>
              </div>
            );})}
          </div>
        </div>
        <div className="hg" style={{display:"grid",gridTemplateColumns:"minmax(0,1fr) 400px",gap:44,alignItems:"start"}}>
          <div style={{display:"flex",flexDirection:"column",gap:20}}>
            <h1 className="chrome" style={{fontFamily:MH,fontWeight:900,fontSize:"clamp(1.1rem,3vw,2rem)",lineHeight:1.15,letterSpacing:".04em",textTransform:"uppercase"}}>Premium Quality Used Auto Parts</h1>
            <p style={{fontSize:13,color:tok.muted,lineHeight:1.9,fontWeight:300}}>Welcome to <strong style={{color:tok.fg}}>All Used Auto Parts Warehouse</strong>. Search our network of <strong style={{color:tok.fg}}>2,000+ verified salvage yards</strong> across all 50 states. Real people, real parts, real results — every request gets a personal response within 24 hours. OEM quality at <strong style={{color:tok.fg}}>50-80% less</strong> than dealer prices.</p>
            {/* Responsive Search Component */}
            <div style={{display:"flex",gap:12,width:"100%",maxWidth:"100%",flexWrap:"wrap",alignItems:"stretch"}}>
              <div style={{flex:1,minWidth:"0",position:"relative",display:"flex",alignItems:"center",background:tok.card,border:"1px solid rgba(232,232,232,0.1)",borderRadius:6,padding:"0 12px",transition:"all 0.3s ease"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(232,232,232,0.3)";e.currentTarget.style.boxShadow="0 0 12px rgba(232,232,232,0.1)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(232,232,232,0.1)";e.currentTarget.style.boxShadow="none";}}>
                <input type="text" placeholder="Search parts by make, model, or type..." style={{width:"100%",border:"none",background:"transparent",color:tok.fg,fontSize:"clamp(12px,2.5vw,14px)",fontFamily:"DM Sans",outline:"none",padding:"12px 0"}}/>
              </div>
              <button className="btn-led" onClick={()=>goTo("parts")} style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,padding:"clamp(8px,2vw,12px) clamp(12px,3vw,20px)",background:"linear-gradient(135deg,#1e40af,#1e3a8a)",border:"1px solid rgba(232,232,232,0.2)",borderRadius:6,color:"#fff",fontWeight:700,fontSize:"clamp(11px,2vw,13px)",fontFamily:MH,cursor:"pointer",transition:"all 0.3s",whiteSpace:"nowrap",flexShrink:0,letterSpacing:"0.05em",textTransform:"uppercase"}} onMouseEnter={e=>{e.currentTarget.style.background="linear-gradient(135deg,#1e3a8a,#1e40af)";e.currentTarget.style.boxShadow="0 8px 16px rgba(30,64,175,0.3)";e.currentTarget.style.transform="translateY(-2px)";}} onMouseLeave={e=>{e.currentTarget.style.background="linear-gradient(135deg,#1e40af,#1e3a8a)";e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="none";}}><Search size={16}/>Search</button>
            </div>
            <div className="cat-g" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
              {[{e:"🔍",t:"2,000+ Yards",b:"Nationwide verified yard network"},{e:"⚡",t:"24hr Response",b:"Every quote answered quickly"},{e:"🔧",t:"Expert Team",b:"Technicians ready to help"},{e:"💰",t:"Best Prices",b:"OEM quality at used prices"},{e:"📦",t:"Fast Delivery",b:"Tracked shipping to your door"},{e:"🛡️",t:"6-Mo Warranty",b:"All parts fully covered"}].map(function(f){return(
                <div key={f.t} style={{padding:"12px",background:tok.card,border:"1px solid "+tok.bdd,borderRadius:6,transition:"all .2s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,.2)";e.currentTarget.style.transform="translateY(-2px)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor=tok.bdd;e.currentTarget.style.transform="none";}}>
                  <div style={{fontSize:20,marginBottom:5}}>{f.e}</div>
                  <div style={{fontSize:11,fontWeight:800,color:tok.fg,fontFamily:MH,marginBottom:3}}>{f.t}</div>
                  <div style={{fontSize:10,color:tok.dim,lineHeight:1.5}}>{f.b}</div>
                </div>
              );})}
            </div>
            <div style={{display:"flex",gap:10,flexWrap:"wrap",alignItems:"center"}}>
              <button className="btn-led" onClick={()=>goTo("parts")}><Search size={12}/>Search Parts</button>
              <a href="tel:8888185001" className="btn-ghost"><Phone size={11}/>(888) 818-5001</a>
              <button className="btn-ghost" onClick={()=>goTo("quote")}><MessageSquare size={11}/>Free Quote</button>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,padding:"16px",background:tok.card,border:"1px solid "+tok.bdd,borderRadius:6}}>
              {[{v:"2,000+",l:"Verified Yards"},{v:"6-Month",l:"Warranty"},{v:"<24hrs",l:"Response"},{v:"50+",l:"Car Brands"}].map(function(s){return(
                <div key={s.l} style={{textAlign:"center"}}>
                  <div className="chrome" style={{fontFamily:MH,fontSize:"clamp(1rem,2vw,1.4rem)",fontWeight:900,marginBottom:2}}>{s.v}</div>
                  <div style={{fontSize:9,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:tok.muted,fontFamily:MH}}>{s.l}</div>
                </div>
              );})}
            </div>
          </div>
          <div className="hg-r gc" style={{padding:22}}><GSB/><QuoteForm tok={tok}/></div>
        </div>
      </div>
    </section>
    {/* Parts Categories */}
    <section className="sec" style={{padding:"64px 24px",background:tok.bg,borderBottom:"1px solid "+tok.bdd}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",gap:24,marginBottom:40,flexWrap:"wrap"}}>
          <SecHead label="What We Source" title="Parts Categories" tok={tok}/>
          <button className="btn-ghost" onClick={()=>goTo("parts")}>Browse All</button>
        </div>
        <div className="cat-g" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14}}>
          {PARTS.map(function(x){return(
            <div key={x.id} className="gc" style={{padding:22,cursor:"pointer",transition:"all .25s"}} onClick={()=>goTo("parts-"+x.id)} onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(232,232,232,.22)";e.currentTarget.style.transform="translateY(-3px)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor=tok.bdd;e.currentTarget.style.transform="none";}}>
              <x.Icon size={24} color={tok.dim} style={{marginBottom:12}}/>
              <h3 style={{fontFamily:MH,fontSize:12,fontWeight:900,color:tok.fg,marginBottom:5,textTransform:"uppercase",letterSpacing:".04em"}}>{x.label}</h3>
              <p style={{fontSize:9,color:tok.dim,marginBottom:12,fontFamily:MH}}>{x.parts.length} parts available</p>
              <div style={{borderTop:"1px solid "+tok.bdd,paddingTop:9,display:"flex",flexWrap:"wrap",gap:3}}>
                {x.parts.slice(0,3).map(p=><span key={p} style={{padding:"2px 6px",background:tok.bdd,fontSize:8,color:tok.dim,fontFamily:MH}}>{p}</span>)}
                <span style={{padding:"2px 6px",background:tok.bdd,fontSize:8,color:tok.dim,fontFamily:MH}}>+{x.parts.length-3}</span>
              </div>
            </div>
          );})}
        </div>
      </div>
    </section>
    {/* Steps */}
    <section className="sec" style={{padding:"64px 24px",background:theme==="light"?"#e4e8f4":"rgba(10,12,20,.95)",borderBottom:"1px solid "+tok.bdd}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <SecHead label="Simple Process" title="How It Works" center tok={tok}/>
        <div className="step-g" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16}}>
          {[{n:"01",t:"Tell Us Your Vehicle",d:"Enter year, make, model and the exact part needed."},{n:"02",t:"We Search 2000+ Yards",d:"Our system searches our nationwide verified network."},{n:"03",t:"Get a Quote in 24hrs",d:"Receive pricing, condition grades, and shipping estimates."},{n:"04",t:"Part Delivered Free",d:"Part ships directly to your door anywhere in the US."}].map(function(x){return(
            <div key={x.n} style={{background:tok.card,border:"1px solid "+tok.bdd,borderRadius:4,padding:26,display:"flex",flexDirection:"column",gap:12,transition:"all .3s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,.2)";e.currentTarget.style.transform="translateY(-3px)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor=tok.bdd;e.currentTarget.style.transform="none";}}>
              <div className="chrome" style={{fontSize:"clamp(2.4rem,4vw,3.2rem)",fontFamily:MH,fontWeight:900,lineHeight:1}}>{x.n}</div>
              <div style={{height:1,background:"linear-gradient(90deg,transparent,rgba(255,255,255,.25),transparent)"}}/>
              <h3 style={{fontSize:11,fontWeight:900,letterSpacing:".1em",textTransform:"uppercase",color:tok.fg,fontFamily:MH}}>{x.t}</h3>
              <p style={{fontSize:11,color:tok.muted,lineHeight:1.7,fontWeight:300}}>{x.d}</p>
            </div>
          );})}
        </div>
      </div>
    </section>
    {/* Reviews */}
    <section className="sec" style={{padding:"64px 24px",background:tok.bg,borderBottom:"1px solid "+tok.bdd}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <SecHead label="Customer Reviews" title="What Clients Say" tok={tok}/>
        <div className="test-g" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14}}>
          {REVIEWS.map(function(r,i){return(
            <div key={i} className="gc" style={{padding:24,display:"flex",flexDirection:"column",transition:"all .25s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(232,232,232,.22)";e.currentTarget.style.transform="translateY(-3px)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor=tok.bdd;e.currentTarget.style.transform="none";}}>
              <div style={{display:"flex",gap:2,marginBottom:14}}>{[0,1,2,3,4].map(j=><Star key={j} size={10} color="#fbbf24" fill="#fbbf24"/>)}</div>
              <p style={{fontSize:12,color:tok.muted,lineHeight:1.75,fontStyle:"italic",flex:1,marginBottom:16,fontWeight:300}}>"{r.t}"</p>
              <div style={{borderTop:"1px solid "+tok.bdd,paddingTop:12}}><div style={{fontSize:12,fontWeight:700,color:tok.fg,fontFamily:MH}}>{r.n}</div><div style={{fontSize:10,color:tok.dim,marginTop:2}}>{r.l}</div></div>
            </div>
          );})}
        </div>
      </div>
    </section>
    {/* Brands Section */}
    <section className="sec" style={{padding:"48px 24px",background:theme==="light"?"#f0f2f8":"linear-gradient(180deg,#04060d,#08090f)",borderTop:"1px solid "+tok.bdd}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <SecHead label="Premium Brands" title="We Source All Major Automotive Brands" center tok={tok}/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:12,marginBottom:32}}>
          {["Mercedes-Benz","BMW","Audi","Porsche","Jaguar","Land Rover","Lexus","Cadillac","Infiniti","Genesis","Tesla","Volkswagen","Volvo","Subaru","Honda","Toyota","Ford","Chevrolet"].map(brand=>{
            const c=BCOLORS[brand]||"#1a1d28";
            return(
              <div key={brand} onClick={()=>goTo("brand",brand)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8,padding:14,borderRadius:8,cursor:"pointer",transition:"all .3s",border:"1px solid "+tok.bdd,background:tok.card}} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-6px)";e.currentTarget.style.borderColor="rgba(232,232,232,.22)";e.currentTarget.style.boxShadow="0 12px 24px rgba(0,0,0,.3)";}} onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.borderColor=tok.bdd;e.currentTarget.style.boxShadow="none";}}>
                <div style={{width:"100%",height:56,borderRadius:6,background:"linear-gradient(135deg,"+c+","+c+"99)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,fontWeight:900,color:"white",fontFamily:"Arial, sans-serif"}} dangerouslySetInnerHTML={{__html:BRAND_LOGOS[brand]||'<svg viewBox="0 0 100 100"><text x="50" y="72" font-size="48" fill="white" text-anchor="middle" font-family="Arial">'+brand.slice(0,2).toUpperCase()+'</text></svg>'}}></div>
                <span style={{fontSize:10,fontWeight:700,color:tok.fg,fontFamily:MH,textAlign:"center",letterSpacing:".06em",textTransform:"uppercase",lineHeight:1.2}}>{brand}</span>
              </div>
            );
          })}
        </div>
        <div style={{textAlign:"center",paddingTop:12}}>
          <button className="btn-led" onClick={()=>goTo("makes")}>Browse All 42 Brands</button>
        </div>
      </div>
    </section>
    <BrandLogos goTo={goTo} tok={tok}/>
  </>;
}

// ── BRAND PAGE ──
function BrandPage({brand,goTo,tok,theme}){
  const c=BCOLORS[brand]||"#1a1d28";
  const mods=MODELS[brand]||[];
  const [selModel,setSelModel]=useState("");
  const HIST={"Toyota":"Toyota Motor Corporation was founded in 1937 by Kiichiro Toyoda. Known for legendary reliability, Toyota introduced the world-famous Camry in 1982 and the iconic Land Cruiser in 1951. Their hybrid Prius launched in 1997 changed the automotive industry.","Ford":"Ford Motor Company was founded by Henry Ford in 1903. The Model T revolutionized personal transportation in 1908. Ford introduced the iconic Mustang in 1964 and the F-Series truck has been Americas #1 selling truck for over 40 years.","Honda":"Honda Motor Co. was founded in 1948 by Soichiro Honda. Known for engineering excellence and reliability. The Civic and Accord became global bestsellers. Honda is the worlds largest manufacturer of internal combustion engines.","Chevrolet":"Chevrolet was founded in 1911 by Louis Chevrolet and William Durant. The Corvette sports car debuted in 1953. The Silverado and Tahoe are among Americas best-selling vehicles for decades.","BMW":"Bayerische Motoren Werke AG was founded in 1916 in Munich, Germany. BMW is renowned for performance and luxury. The 3 Series introduced in 1975 became the benchmark for sports sedans worldwide."};
  const hist=HIST[brand]||(brand+" has a rich automotive history spanning decades of engineering excellence. Their vehicles are known for quality, performance, and reliability across all segments from economy to luxury and performance.");
  const faqs=[{q:"What "+brand+" parts do you carry?",a:"We source engines, transmissions, drivetrain, electrical, cooling, suspension, and body parts for all "+brand+" models through our 2,000+ verified yard network."},{q:"Are used "+brand+" parts reliable?",a:"Yes. Used OEM "+brand+" parts are the exact same factory-manufactured components originally in your vehicle, inspected and graded, backed by our 6-month warranty."},{q:"How much can I save on "+brand+" parts?",a:"Typically 50-80% compared to new dealer prices. A used "+brand+" engine can often be sourced for $800-$2,500 vs $3,000-$8,000+ new."},{q:"Do "+brand+" parts come with a warranty?",a:"Yes. All parts come with a 30-180 day warranty from the supplying yard. Engine and transmission warranties are typically 90-180 days."}];
  const [faqOpen,setFaqOpen]=useState(null);
  return <>
    <div style={{position:"relative",overflow:"hidden",background:"linear-gradient(135deg,"+c+"dd,"+c+"99,#06080e)",borderBottom:"1px solid rgba(255,255,255,.1)",padding:"32px 24px"}}>
      <div style={{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,rgba(255,255,255,.012) 1px,transparent 1px)",backgroundSize:"24px 24px"}}/>
      <div style={{maxWidth:1200,margin:"0 auto",display:"flex",alignItems:"center",gap:20,position:"relative",zIndex:1,flexWrap:"wrap"}}>
        <div style={{width:88,height:88,borderRadius:12,background:"linear-gradient(135deg,"+c+","+c+"88)",border:"2px solid rgba(255,255,255,.3)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:"0 8px 32px rgba(0,0,0,.5)"}}>
          <span style={{fontSize:24,fontWeight:900,color:"rgba(255,255,255,.95)",fontFamily:"Arial Black, sans-serif",textShadow:"0 2px 8px rgba(0,0,0,.6)"}}>{brand.slice(0,2).toUpperCase()}</span>
        </div>
        <div>
          <h1 className="chrome" style={{fontFamily:MH,fontSize:"clamp(1.2rem,3vw,2rem)",fontWeight:900,letterSpacing:".04em",textTransform:"uppercase",lineHeight:1.15,marginBottom:4}}>{brand+" Used Auto Parts"}</h1>
          <div className="sub-ch" style={{fontSize:"clamp(.5rem,1vw,.65rem)",letterSpacing:".22em",marginBottom:6}}>ALL USED AUTO PARTS WAREHOUSE - AUAPW.ORG</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
            {["Free Shipping","6-Month Warranty","OEM Quality","24hr Response",mods.length+" Models Covered"].map(function(b2){return(<span key={b2} style={{padding:"2px 8px",background:"rgba(255,255,255,.12)",border:"1px solid rgba(255,255,255,.2)",borderRadius:3,fontSize:9,color:"rgba(255,255,255,.85)",fontFamily:MH}}>{b2}</span>);})}
          </div>
        </div>
      </div>
    </div>
    <section className="sec" style={{padding:"48px 24px",background:tok.bg}}>
      <div style={{maxWidth:1280,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 360px",gap:44,alignItems:"start"}}>
        <div>
          <div className="gc" style={{padding:24,marginBottom:24}}>
            <GSB/><div style={{position:"relative",zIndex:1}}>
              <h2 style={{fontFamily:MH,fontSize:16,fontWeight:900,color:tok.fg,marginBottom:12,textTransform:"uppercase",letterSpacing:".04em"}}>{brand+" - Brand History"}</h2>
              <p style={{fontSize:13,color:tok.muted,lineHeight:1.85,fontWeight:300}}>{hist}</p>
            </div>
          </div>
          <h3 style={{fontFamily:MH,fontSize:13,fontWeight:900,color:tok.fg,marginBottom:14,textTransform:"uppercase",letterSpacing:".04em"}}>{brand+" Models We Cover"}</h3>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:28}}>
            {mods.map(function(m){return(
              <div key={m} style={{padding:"10px 14px",background:selModel===m?("linear-gradient(135deg,"+c+"22,"+c+"11)"):tok.card,border:"1px solid "+(selModel===m?c+"66":tok.bdd),borderRadius:5,cursor:"pointer",transition:"all .2s",display:"flex",alignItems:"center",gap:8}} onClick={()=>setSelModel(selModel===m?"":m)}>
                <div style={{width:5,height:5,borderRadius:"50%",background:selModel===m?c:"rgba(255,255,255,.3)",flexShrink:0}}/>
                <span style={{fontSize:12,color:tok.fg,fontWeight:selModel===m?600:300}}>{m}</span>
              </div>
            );})}
          </div>
          <h3 style={{fontFamily:MH,fontSize:13,fontWeight:900,color:tok.fg,marginBottom:14,textTransform:"uppercase",letterSpacing:".04em"}}>{brand+" Parts FAQ"}</h3>
          {faqs.map(function(faq,i){return(
            <div key={i} className="gc" style={{marginBottom:6,overflow:"hidden",cursor:"pointer"}} onClick={()=>setFaqOpen(faqOpen===i?null:i)}>
              <div style={{padding:"13px 16px"}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12}}>
                  <span style={{fontSize:12,fontWeight:600,color:tok.fg}}>{faq.q}</span>
                  {faqOpen===i?<ChevronUp size={13} color={tok.dim}/>:<ChevronDown size={13} color={tok.dim}/>}
                </div>
                {faqOpen===i&&<p style={{fontSize:12,color:tok.muted,lineHeight:1.8,fontWeight:300,marginTop:10}}>{faq.a}</p>}
              </div>
            </div>
          );})}
        </div>
        <div style={{position:"sticky",top:80}}><div className="gc" style={{padding:20}}><GSB/><QuoteForm defaultPart={selModel?selModel+" Engine":""} tok={tok}/></div></div>
      </div>
    </section>
    <BrandLogos goTo={goTo} tok={tok}/>
  </>;
}

// ── USED ENGINES ──
function UsedEnginesPage({goTo,tok}){
  const [open,setOpen]=useState(null);
  const faqs=[{q:"Are used engines good?",a:"Used engines sourced from our verified network are inspected, test-run where possible, and graded for condition. Mileage, compression, and visual inspection are all checked before listing."},{q:"What is a long block vs short block?",a:"A long block includes the block, heads, valve train, and camshaft. A short block is the lower assembly: block, crankshaft, pistons, and connecting rods. Long blocks cost more but need fewer additional parts to install."},{q:"What mileage is acceptable?",a:"Under 80,000 miles is ideal. Engines between 80,000-120,000 miles from a well-maintained vehicle can still provide years of service. We include odometer verification when available."},{q:"Does a used engine come with warranty?",a:"Yes. All engines come with a 90-180 day warranty from the supplying yard, covering defects in the engine as described."},{q:"Is it better to rebuild or replace?",a:"Replacing with a quality used engine is often faster and cheaper. Rebuilds average $2,500-$5,000+ in labor. A quality used engine through AUAPW.ORG typically runs $800-$3,000 including warranty."},{q:"How long can a used engine last?",a:"With proper installation and maintenance, a quality used engine can last another 100,000-200,000+ miles. Key is fresh oil and coolant, new timing components, and regular maintenance."}];
  return <>
    <PageBanner subtitle="Used Engines for Sale - Quality Parts Nationwide" tok={tok}/>
    <section className="sec" style={{padding:"48px 24px",background:tok.bg}}>
      <div style={{maxWidth:1280,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 360px",gap:44,alignItems:"start"}}>
        <div>
          <h1 className="chrome" style={{fontFamily:MH,fontWeight:900,fontSize:"clamp(1.1rem,3.5vw,2rem)",marginBottom:20,lineHeight:1.15,letterSpacing:".04em",textTransform:"uppercase"}}>Used Engines for Sale</h1>
          <div className="gc" style={{padding:24,marginBottom:24}}><GSB/><div style={{position:"relative",zIndex:1}}>
            <h2 style={{fontFamily:MH,fontSize:13,fontWeight:900,color:tok.fg,marginBottom:12,textTransform:"uppercase",letterSpacing:".04em"}}>Quality Used Engines - AUAPW.ORG</h2>
            <p style={{fontSize:13,color:tok.muted,lineHeight:1.85,fontWeight:300,marginBottom:10}}>Welcome to <strong style={{color:tok.fg}}>All Used Auto Parts Warehouse</strong>. We search our network of <strong style={{color:tok.fg}}>2,000+ verified salvage yards</strong> to find the right engine for your vehicle at the best price - with free shipping and a 90-180 day warranty.</p>
            <p style={{fontSize:13,color:tok.muted,lineHeight:1.85,fontWeight:300}}>Whether you need a complete engine, long block, short block, or cylinder head assembly - our team sources it, inspects compatibility, and delivers it to your door or mechanic.</p>
          </div></div>
          <h2 style={{fontFamily:MH,fontSize:13,fontWeight:900,color:tok.fg,marginBottom:14,textTransform:"uppercase",letterSpacing:".04em"}}>Engine Types We Source</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10,marginBottom:24}}>
            {[{t:"Complete Engine",d:"Full engine assembly with all accessories and sensors. Plug-and-play for most applications.",i:"⚙️"},{t:"Long Block Engine",d:"Block plus heads plus valve train assembled. Most commonly requested. Requires your accessories.",i:"🔩"},{t:"Short Block Engine",d:"Lower block assembly only. Ideal when your heads are intact but the lower end needs replacement.",i:"🔧"},{t:"Cylinder Head",d:"Top of engine only. Perfect for head gasket failures, cracks, or warped head situations.",i:"📦"},{t:"Crate Engine",d:"Professionally rebuilt complete engine with new or reconditioned components. Best long-term option.",i:"🏭"},{t:"Hybrid / EV Motor",d:"Drive motors, hybrid battery packs, and electric motor assemblies for hybrid and EV vehicles.",i:"⚡"}].map(function(e){return(
              <div key={e.t} style={{padding:"14px 16px",background:tok.card,border:"1px solid "+tok.bdd,borderRadius:6,transition:"all .2s"}} onMouseEnter={ev=>{ev.currentTarget.style.borderColor="rgba(255,255,255,.2)";ev.currentTarget.style.transform="translateY(-2px)";}} onMouseLeave={ev=>{ev.currentTarget.style.borderColor=tok.bdd;ev.currentTarget.style.transform="none";}}>
                <div style={{fontSize:22,marginBottom:6}}>{e.i}</div>
                <div style={{fontSize:12,fontWeight:700,color:tok.fg,marginBottom:4,fontFamily:MH}}>{e.t}</div>
                <div style={{fontSize:11,color:tok.muted,lineHeight:1.65,fontWeight:300}}>{e.d}</div>
              </div>
            );})}
          </div>
          <h2 style={{fontFamily:MH,fontSize:13,fontWeight:900,color:tok.fg,marginBottom:14,textTransform:"uppercase",letterSpacing:".04em"}}>Used Engine FAQ</h2>
          {faqs.map(function(faq,i){return(
            <div key={i} className="gc" style={{marginBottom:6,overflow:"hidden",cursor:"pointer"}} onClick={()=>setOpen(open===i?null:i)}>
              <div style={{padding:"13px 16px"}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12}}>
                  <span style={{fontSize:12,fontWeight:600,color:tok.fg}}>{faq.q}</span>
                  {open===i?<ChevronUp size={13} color={tok.dim}/>:<ChevronDown size={13} color={tok.dim}/>}
                </div>
                {open===i&&<p style={{fontSize:12,color:tok.muted,lineHeight:1.8,fontWeight:300,marginTop:10}}>{faq.a}</p>}
              </div>
            </div>
          );})}
        </div>
        <div style={{position:"sticky",top:80}}><div className="gc" style={{padding:20}}><GSB/><QuoteForm defaultPart="Complete Engine" tok={tok}/></div></div>
      </div>
    </section>
    <BrandLogos goTo={goTo} tok={tok}/>
  </>;
}

// ── USED TRANSMISSIONS ──
function UsedTransPage({goTo,tok}){
  const [open,setOpen]=useState(null);
  const INV=[{year:"2019",make:"Toyota",model:"Camry",trans:"Automatic 8-spd",miles:"54,200",price:"$1,150"},{year:"2018",make:"Ford",model:"F-150",trans:"Automatic 10-spd",miles:"67,800",price:"$1,400"},{year:"2020",make:"Honda",model:"CR-V",trans:"CVT",miles:"41,000",price:"$980"},{year:"2017",make:"Chevrolet",model:"Silverado 1500",trans:"Automatic 6-spd",miles:"88,200",price:"$1,100"},{year:"2019",make:"Jeep",model:"Grand Cherokee",trans:"Automatic 8-spd",miles:"61,500",price:"$1,250"},{year:"2018",make:"BMW",model:"3 Series",trans:"Automatic 8-spd",miles:"72,000",price:"$1,600"}];
  const faqs=[{q:"What types of transmissions do you carry?",a:"We source automatic, manual, CVT, dual-clutch, and transfer cases for all makes and models from 1990 to present. We match specific gear counts to your application."},{q:"Is it safe to buy a used transmission?",a:"Yes, when sourced correctly. Every transmission through our network is inspected by the supplying yard, and we verify mileage and shift quality. A 30-180 day warranty is included."},{q:"How much does a used transmission cost?",a:"A used transmission typically costs $500-$2,500 depending on make and model, compared to $2,000-$8,000+ for new. Remanufactured options run $1,200-$3,500 with a longer warranty."},{q:"How long does a used transmission last?",a:"A well-maintained used transmission from a low-mileage donor can last 80,000-150,000+ additional miles with proper installation and fresh fluid."},{q:"Do you carry Transfer Cases?",a:"Yes. We source 2WD, 4WD, and AWD transfer cases for all truck, SUV, and crossover applications. Transfer cases can often ship within 2-3 business days."}];
  return <>
    <PageBanner subtitle="Used Transmissions for Sale - All Makes and Models" tok={tok}/>
    <section className="sec" style={{padding:"48px 24px",background:tok.bg}}>
      <div style={{maxWidth:1280,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 360px",gap:44,alignItems:"start"}}>
        <div>
          <h1 className="chrome" style={{fontFamily:MH,fontWeight:900,fontSize:"clamp(1.1rem,3.5vw,2rem)",marginBottom:20,lineHeight:1.15,letterSpacing:".04em",textTransform:"uppercase"}}>Used Transmissions for Sale</h1>
          <div className="gc" style={{padding:24,marginBottom:24}}><GSB/><div style={{position:"relative",zIndex:1}}>
            <h2 style={{fontFamily:MH,fontSize:13,fontWeight:900,color:tok.fg,marginBottom:12,textTransform:"uppercase",letterSpacing:".04em"}}>Quality Used Transmissions - AUAPW.ORG</h2>
            <p style={{fontSize:13,color:tok.muted,lineHeight:1.85,fontWeight:300,marginBottom:10}}>All Used Auto Parts Warehouse sources <strong style={{color:tok.fg}}>automatic, manual, CVT, and transfer case transmissions</strong> from our nationwide network. We match the exact transmission to your vehicle year, make, model, trim, and drive configuration.</p>
          </div></div>
          <h2 style={{fontFamily:MH,fontSize:13,fontWeight:900,color:tok.fg,marginBottom:14,textTransform:"uppercase",letterSpacing:".04em"}}>Transmission Inventory Sample</h2>
          <div style={{border:"1px solid "+tok.bdd,borderRadius:8,overflow:"auto",marginBottom:24}}>
            <div style={{display:"grid",gridTemplateColumns:"60px 1fr 1fr 1fr 80px 80px 80px",padding:"9px 14px",background:tok.bdd,gap:8,minWidth:600}}>
              {["Year","Make","Model","Type","Miles","Price",""].map(function(h){return(<span key={h} style={{fontSize:8.5,fontWeight:700,letterSpacing:".14em",textTransform:"uppercase",color:tok.dim,fontFamily:MH}}>{h}</span>);})}
            </div>
            {INV.map(function(r,i){return(
              <div key={i} style={{display:"grid",gridTemplateColumns:"60px 1fr 1fr 1fr 80px 80px 80px",padding:"11px 14px",borderTop:"1px solid "+tok.bdd,alignItems:"center",gap:8,background:i%2===0?tok.bdd:"transparent",minWidth:600}}>
                <span style={{fontSize:11,color:tok.muted}}>{r.year}</span>
                <span style={{fontSize:12,fontWeight:600,color:tok.fg}}>{r.make}</span>
                <span style={{fontSize:11,color:tok.muted}}>{r.model}</span>
                <span style={{fontSize:10,color:tok.dim,fontFamily:MH}}>{r.trans}</span>
                <span style={{fontSize:10,color:tok.muted,fontFamily:MH}}>{r.miles}</span>
                <span style={{fontSize:11,fontWeight:700,color:tok.fg,fontFamily:MH}}>{r.price}</span>
                <button onClick={()=>goTo("quote","Transmission")} className="btn-ghost" style={{padding:"5px 8px",fontSize:8}}>Quote</button>
              </div>
            );})}
          </div>
          <h2 style={{fontFamily:MH,fontSize:13,fontWeight:900,color:tok.fg,marginBottom:14,textTransform:"uppercase",letterSpacing:".04em"}}>Transmission FAQ</h2>
          {faqs.map(function(faq,i){return(
            <div key={i} className="gc" style={{marginBottom:6,overflow:"hidden",cursor:"pointer"}} onClick={()=>setOpen(open===i?null:i)}>
              <div style={{padding:"13px 16px"}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12}}>
                  <span style={{fontSize:12,fontWeight:600,color:tok.fg}}>{faq.q}</span>
                  {open===i?<ChevronUp size={13} color={tok.dim}/>:<ChevronDown size={13} color={tok.dim}/>}
                </div>
                {open===i&&<p style={{fontSize:12,color:tok.muted,lineHeight:1.8,fontWeight:300,marginTop:10}}>{faq.a}</p>}
              </div>
            </div>
          );})}
        </div>
        <div style={{position:"sticky",top:80}}><div className="gc" style={{padding:20}}><GSB/><QuoteForm defaultPart="Automatic Transmission" tok={tok}/></div></div>
      </div>
    </section>
    <BrandLogos goTo={goTo} tok={tok}/>
  </>;
}

// ── PARTS PAGE ──
function PartsPage({goTo,tok}){
  return <>
    <PageBanner subtitle="Parts Catalog - All Categories - All Makes and Models" tok={tok}/>
    <section className="sec" style={{padding:"48px 24px",background:tok.bg}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <SecHead label="All Categories" title="Parts Catalog" tok={tok}/>
        <div className="cat-g" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
          {PARTS.map(function(x){return(
            <div key={x.id} className="gc" style={{padding:26,cursor:"pointer",transition:"all .25s"}} onClick={()=>goTo("parts-"+x.id)} onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(232,232,232,.22)";e.currentTarget.style.transform="translateY(-3px)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor=tok.bdd;e.currentTarget.style.transform="none";}}>
              <x.Icon size={26} color={tok.dim} style={{marginBottom:14}}/>
              <h3 style={{fontFamily:MH,fontSize:12,fontWeight:900,color:tok.fg,marginBottom:7,textTransform:"uppercase",letterSpacing:".04em"}}>{x.label}</h3>
              <p style={{fontSize:10,color:tok.dim,marginBottom:14,fontFamily:MH}}>{x.parts.length} parts available</p>
              <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                {x.parts.map(p=><span key={p} style={{padding:"2px 8px",background:tok.bdd,fontSize:8.5,color:tok.dim,fontFamily:MH}}>{p}</span>)}
              </div>
            </div>
          );})}
        </div>
      </div>
    </section>
    <BrandLogos goTo={goTo} tok={tok}/>
  </>;
}

// ── PARTS DETAIL ──
function PartsDetailPage({catId,goTo,tok}){
  const cat=PARTS.find(c=>c.id===catId)||PARTS[0];
  return <>
    <PageBanner subtitle={cat.label+" - OEM Quality - 6-Month Warranty - Free Shipping"} tok={tok}/>
    <section className="sec" style={{padding:"48px 24px",background:tok.bg}}>
      <div style={{maxWidth:1280,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 360px",gap:44,alignItems:"start"}}>
        <div>
          <h1 className="chrome" style={{fontFamily:MH,fontWeight:900,fontSize:"clamp(1.1rem,3vw,1.9rem)",marginBottom:24,lineHeight:1.15,letterSpacing:".04em",textTransform:"uppercase"}}>{cat.label}</h1>
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10,marginBottom:32}}>
            {cat.parts.map(function(p){return(
              <div key={p} style={{padding:"12px 16px",background:tok.card,border:"1px solid "+tok.bdd,borderRadius:5,cursor:"pointer",transition:"all .2s",display:"flex",alignItems:"center",gap:10}} onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(232,232,232,.2)";e.currentTarget.style.transform="translateY(-1px)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor=tok.bdd;e.currentTarget.style.transform="none";}} onClick={()=>goTo("quote",p)}>
                <div style={{width:5,height:5,borderRadius:"50%",background:"rgba(255,255,255,.3)",flexShrink:0}}/>
                <span style={{fontSize:12,color:tok.muted,fontWeight:300}}>{p}</span>
                <ArrowRight size={10} color={tok.dimmer} style={{marginLeft:"auto"}}/>
              </div>
            );})}
          </div>
        </div>
        <div style={{position:"sticky",top:80}}><div className="gc" style={{padding:20}}><GSB/><QuoteForm defaultPart={cat.parts[0]} tok={tok}/></div></div>
      </div>
    </section>
    <BrandLogos goTo={goTo} tok={tok}/>
  </>;
}

// ── MAKES ──
function MakesPage({goTo,tok}){
  return <>
    <PageBanner subtitle="All Makes and Models - Find Parts for Your Vehicle" tok={tok}/>
    <section className="sec" style={{padding:"48px 24px",background:tok.bg}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <SecHead label="All Makes" title="Select Your Vehicle Brand" center tok={tok}/>
        <div className="brd-g" style={{display:"grid",gridTemplateColumns:"repeat(8,1fr)",gap:10,marginBottom:32}}>
          {MAKES.map(function(b){
            const c=BCOLORS[b]||"#1a1d28";
            return(
              <div key={b} onClick={()=>goTo("brand",b)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:5,padding:8,borderRadius:7,cursor:"pointer",transition:"all .3s",border:"1px solid "+tok.bdd,background:tok.card}} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.borderColor="rgba(232,232,232,.22)";}} onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.borderColor=tok.bdd;}}>
                <div style={{width:"100%",height:44,borderRadius:5,background:"linear-gradient(135deg,"+c+","+c+"88)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}} dangerouslySetInnerHTML={{__html:BRAND_LOGOS[b]||'<svg viewBox="0 0 100 100"><text x="50" y="72" font-size="32" fill="white">'+(b.slice(0,3))+'</text></svg>'}}></div>
                <span style={{fontSize:7.5,fontWeight:700,color:tok.dim,fontFamily:MH,textAlign:"center",letterSpacing:".08em",textTransform:"uppercase"}}>{b}</span>
              </div>
            );
          })}
        </div>
        <div style={{textAlign:"center"}}><button className="btn-led" onClick={()=>goTo("quote")}>Get Parts for My Vehicle</button></div>
      </div>
    </section>
  </>;
}

// ── INVENTORY ──
function InventoryPage({goTo,tok}){
  const INV=[{cat:"Engines",part:"Complete Engine",make:"Ford",model:"F-150",year:"2018",miles:"62k",price:"$1,850"},{cat:"Transmissions",part:"Automatic 6-spd",make:"Toyota",model:"Camry",year:"2019",miles:"48k",price:"$1,100"},{cat:"Engines",part:"Long Block",make:"Chevrolet",model:"Silverado 1500",year:"2017",miles:"88k",price:"$1,450"},{cat:"Drivetrain",part:"CV Axle",make:"Honda",model:"CR-V",year:"2020",miles:"41k",price:"$185"},{cat:"Electrical",part:"Alternator",make:"Nissan",model:"Altima",year:"2016",miles:"71k",price:"$120"},{cat:"Cooling",part:"Radiator",make:"BMW",model:"X5",year:"2018",miles:"55k",price:"$340"},{cat:"Suspension",part:"Control Arm Front Left",make:"Dodge",model:"Durango",year:"2019",miles:"67k",price:"$195"},{cat:"Body",part:"Door Assembly Rear Right",make:"Jeep",model:"Wrangler",year:"2021",miles:"22k",price:"$420"},{cat:"Engines",part:"Cylinder Head",make:"Subaru",model:"Outback",year:"2016",miles:"94k",price:"$580"},{cat:"Transmissions",part:"Transfer Case",make:"Jeep",model:"Grand Cherokee",year:"2018",miles:"58k",price:"$640"},{cat:"Electrical",part:"ECU PCM Module",make:"Honda",model:"Accord",year:"2017",miles:"77k",price:"$280"},{cat:"Cooling",part:"A/C Compressor",make:"Toyota",model:"RAV4",year:"2020",miles:"39k",price:"$320"}];
  return <>
    <PageBanner subtitle="Live Parts Inventory - Updated Daily - 2,000+ Verified Yards" tok={tok}/>
    <section className="sec" style={{padding:"48px 24px",background:tok.bg}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <SecHead label="Parts Inventory" title="Available Now" tok={tok}/>
        <div style={{border:"1px solid "+tok.bdd,borderRadius:8,overflow:"auto",marginBottom:28}}>
          <div style={{display:"grid",gridTemplateColumns:"120px 1fr 90px 90px 70px 80px 80px 80px",padding:"9px 16px",background:tok.bdd,gap:8,minWidth:700}}>
            {["Category","Part","Make","Model","Year","Miles","Price",""].map(function(h){return(<span key={h} style={{fontSize:8.5,fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",color:tok.dim,fontFamily:MH,whiteSpace:"nowrap"}}>{h}</span>);})}
          </div>
          {INV.map(function(r,i){return(
            <div key={i} style={{display:"grid",gridTemplateColumns:"120px 1fr 90px 90px 70px 80px 80px 80px",padding:"11px 16px",borderTop:"1px solid "+tok.bdd,alignItems:"center",gap:8,background:i%2===0?tok.bdd:"transparent",minWidth:700}}>
              <span style={{fontSize:9,fontWeight:700,padding:"2px 7px",background:tok.card,border:"1px solid "+tok.bd,borderRadius:2,color:tok.dim,fontFamily:MH}}>{r.cat}</span>
              <span style={{fontSize:12,fontWeight:600,color:tok.fg}}>{r.part}</span>
              <span style={{fontSize:11,color:tok.muted}}>{r.make}</span>
              <span style={{fontSize:11,color:tok.muted}}>{r.model}</span>
              <span style={{fontSize:11,color:tok.dim}}>{r.year}</span>
              <span style={{fontSize:10,color:tok.dim,fontFamily:MH}}>{r.miles}</span>
              <span style={{fontSize:12,fontWeight:700,color:tok.fg,fontFamily:MH}}>{r.price}</span>
              <button onClick={()=>goTo("quote",r.part)} className="btn-ghost" style={{padding:"5px 8px",fontSize:8}}>Quote</button>
            </div>
          );})}
        </div>
        <div style={{textAlign:"center"}}><button className="btn-led" onClick={()=>goTo("quote")}>Request a Quote on Any Part</button></div>
      </div>
    </section>
    <BrandLogos goTo={goTo} tok={tok}/>
  </>;
}

// ── QUOTE ──
function QuotePage({defaultPart,tok}){
  return <>
    <PageBanner subtitle="Free Quote - No Credit Card - Response Within 24 Hours" tok={tok}/>
    <section className="sec" style={{padding:"48px 24px",background:tok.bg}}>
      <div style={{maxWidth:780,margin:"0 auto"}}>
        <SecHead label="Free Quote" title="Request Your Part" tok={tok}/>
        <div className="gc" style={{padding:28}}><GSB/><QuoteForm defaultPart={defaultPart||""} tok={tok}/></div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginTop:20}}>
          {[{I:Truck,t:"Free Shipping",d:"All 50 states"},{I:Shield,t:"6-Month Warranty",d:"Every part covered"},{I:Clock,t:"24hr Response",d:"Guaranteed"}].map(function(x){return(
            <div key={x.t} className="gc" style={{padding:16,display:"flex",gap:12,alignItems:"center"}}>
              <div style={{width:32,height:32,borderRadius:6,background:tok.bdd,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><x.I size={14} color={tok.fg}/></div>
              <div><div style={{fontSize:11,fontWeight:700,color:tok.fg,fontFamily:MH}}>{x.t}</div><div style={{fontSize:9,color:tok.muted,fontFamily:MH}}>{x.d}</div></div>
            </div>
          );})}
        </div>
      </div>
    </section>
  </>;
}

// ── ABOUT ──
function AboutPage({goTo,tok}){
  return <>
    <PageBanner subtitle="Americas Largest Used Parts Network - 50000+ Satisfied Customers" tok={tok}/>
    <section className="sec" style={{padding:"48px 24px",background:tok.bg}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <div style={{display:"flex",justifyContent:"center",marginBottom:20}}><LogoCircle size={80} uid="abt"/></div>
        <SecHead label="Who We Are" title="Americas Largest Used Parts Network" center tok={tok}/>
        <p style={{fontSize:14,color:tok.muted,lineHeight:1.9,fontWeight:300,maxWidth:700,margin:"0 auto 44px",textAlign:"center"}}>AUAPW.ORG - All Used Auto Parts Warehouse - Your Trusted Partner for Automotive Services and Solutions. We connect car owners, repair shops, dealers, and fleet managers with 2,000+ verified salvage yards nationwide.</p>
        <div className="cat-g" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:44}}>
          {[{I:Shield,t:"Verified Network",b:"Every yard vetted for quality, licensing, and customer service."},{I:Truck,t:"Free Shipping",b:"Free to anywhere in the USA with tracking on every order."},{I:RotateCcw,t:"Easy Returns",b:"Hassle-free return within the warranty window."},{I:Clock,t:"Under 24hr Response",b:"Personal response from our team within 24 hours guaranteed."},{I:DollarSign,t:"Best Price Match",b:"2,000+ yards ensures you always get the lowest price."},{I:Star,t:"6-Month Warranty",b:"30-180 day warranty from the supplying yard on every part."}].map(function(x){return(
            <div key={x.t} className="gc" style={{padding:22}}><GSB/><div style={{position:"relative",zIndex:1}}>
              <div style={{width:36,height:36,borderRadius:7,background:tok.bdd,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:12}}><x.I size={14} color={tok.fg}/></div>
              <h3 style={{fontSize:12,fontWeight:900,color:tok.fg,marginBottom:7,fontFamily:MH,textTransform:"uppercase",letterSpacing:".04em"}}>{x.t}</h3>
              <p style={{fontSize:11,color:tok.muted,lineHeight:1.75,fontWeight:300}}>{x.b}</p>
            </div></div>
          );})}
        </div>
        <div style={{textAlign:"center"}}><button className="btn-led" onClick={()=>goTo("quote")}>Get a Free Quote</button></div>
      </div>
    </section>
    <BrandLogos goTo={goTo} tok={tok}/>
  </>;
}

// ── CONTACT ──
function ContactPage({tok,theme}){
  const [name,setName]=useState("");const [email,setEmail]=useState("");const [phone,setPhone]=useState("");const [subject,setSubject]=useState("");const [msg,setMsg]=useState("");const [sent,setSent]=useState(false);const [busy,setBusy]=useState(false);
  const fs={width:"100%",padding:"10px 12px",borderRadius:4,border:"1px solid "+tok.bd,background:tok.card,color:tok.fg,fontSize:13,outline:"none",fontFamily:"inherit"};
  const send=async()=>{
    if(!name||!email||!msg)return;setBusy(true);
    try{await fetch("https://formsubmit.co/ajax/"+LEAD,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({_template:"table",_captcha:"false",Name:name,Email:email,Phone:phone||"N/A",Subject:subject||"General",Message:msg,_subject:"[AUAPW Contact] "+name,_replyto:email})});setSent(true);}catch(e){}
    setBusy(false);
  };
  return <>
    <PageBanner subtitle="Contact Us - (888) 818-5001 - 24-Hr Response Guaranteed" tok={tok}/>
    <section className="sec" style={{padding:"48px 24px",background:tok.bg}}>
      <div style={{maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1.3fr",gap:36,alignItems:"start"}}>
        <div>
          <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:20}}><LogoCircle size={52} uid="ct"/><div><div className="emboss" style={{fontSize:16,letterSpacing:".06em",lineHeight:1,marginBottom:3}}>AUAPW.ORG</div><div style={{fontSize:9,color:tok.dim,fontFamily:MH}}>Contact Our Team</div></div></div>
          <SecHead label="Contact" title="Get in Touch" tok={tok}/>
          <p style={{fontSize:13,color:tok.muted,lineHeight:1.8,marginBottom:22,fontWeight:300}}>Our team is available <strong style={{color:tok.fg}}>Monday through Saturday, 8am to 6pm EST</strong>. We typically respond within 2 hours during business hours.</p>
          {[{I:Phone,l:"Phone",v:PHONE,h:"tel:8888185001"},{I:Mail,l:"Email",v:EMAIL,h:"mailto:"+EMAIL},{I:MapPin,l:"Address",v:ADDRESS}].map(function(x){return(
            <a key={x.v} href={x.h||"#"} className="fci" style={{textDecoration:"none",marginBottom:10,display:"flex"}}>
              <div className="fci-icon"><x.I size={14}/></div><div><span style={{fontSize:8.5,display:"block",letterSpacing:".12em",textTransform:"uppercase",color:tok.dim}}>{x.l}</span><span style={{fontSize:12,fontWeight:600,color:tok.fg}}>{x.v}</span></div>
            </a>
          );})}
        </div>
        <div className="gc" style={{padding:28}}>
          <GSB/>
          {sent?(
            <div style={{textAlign:"center",padding:"32px 0",position:"relative",zIndex:1}}>
              <CheckCircle size={40} color="#4ade80" style={{margin:"0 auto 14px"}}/>
              <h3 style={{fontFamily:MH,fontSize:15,color:tok.fg,marginBottom:8,textTransform:"uppercase",letterSpacing:".04em"}}>Message Sent!</h3>
              <p style={{color:tok.muted,fontSize:13,lineHeight:1.7}}>{"We will respond to "+email+" within 24 hours."}</p>
              <button className="btn-ghost" style={{marginTop:18}} onClick={()=>setSent(false)}>Send Another</button>
            </div>
          ):(
            <div style={{position:"relative",zIndex:1}}>
              <h3 style={{fontFamily:MH,fontSize:14,fontWeight:900,color:tok.fg,marginBottom:18,textTransform:"uppercase",letterSpacing:".04em"}}>Send a Message</h3>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
                <div><div style={{fontSize:9,color:tok.dim,letterSpacing:".18em",textTransform:"uppercase",marginBottom:5,fontFamily:MH}}>Name *</div><input value={name} onChange={e=>setName(e.target.value)} placeholder="Your Name" style={fs}/></div>
                <div><div style={{fontSize:9,color:tok.dim,letterSpacing:".18em",textTransform:"uppercase",marginBottom:5,fontFamily:MH}}>Phone</div><input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="(555) 000-0000" style={fs} type="tel"/></div>
              </div>
              <div style={{marginBottom:12}}><div style={{fontSize:9,color:tok.dim,letterSpacing:".18em",textTransform:"uppercase",marginBottom:5,fontFamily:MH}}>Email *</div><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@email.com" style={fs} type="email"/></div>
              <div style={{marginBottom:12}}><div style={{fontSize:9,color:tok.dim,letterSpacing:".18em",textTransform:"uppercase",marginBottom:5,fontFamily:MH}}>Subject</div>
                <select value={subject} onChange={e=>setSubject(e.target.value)} style={{...fs,appearance:"none",cursor:"pointer"}}>
                  <option value="">Select a Subject</option>
                  {["Parts Quote Request","Order Status","Warranty Claim","Return Request","Shipping Question","General Inquiry","Business Inquiry"].map(s=><option key={s}>{s}</option>)}
                </select>
              </div>
              <div style={{marginBottom:16}}><div style={{fontSize:9,color:tok.dim,letterSpacing:".18em",textTransform:"uppercase",marginBottom:5,fontFamily:MH}}>Message *</div><textarea value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Tell us about the part you need..." rows={5} style={{...fs,resize:"vertical"}}/></div>
              <button onClick={send} disabled={busy||!name||!email||!msg} style={{width:"100%",padding:"13px",background:name&&email&&msg?(theme==="light"?"rgba(26,29,46,.1)":"rgba(255,255,255,.1)"):"rgba(255,255,255,.03)",border:"1px solid "+tok.bd,borderRadius:4,color:name&&email&&msg?tok.fg:tok.dimmer,cursor:name&&email&&msg?"pointer":"not-allowed",fontFamily:MH,fontSize:11,letterSpacing:".15em",textTransform:"uppercase",fontWeight:700,transition:"all .2s"}}>
                {busy?"Sending...":"Send Message"}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  </>;
}

// ── BLOG ──
function BlogPage({goTo,tok}){
  const posts=[{t:"What to Know About Used Engines",e:"Understanding mileage, warranty, and testing when purchasing a used engine.",d:"March 15, 2026",cat:"Engines"},{t:"Transmission Repair vs Replacement",e:"When to repair and when replacement makes more financial sense.",d:"March 10, 2026",cat:"Transmissions"},{t:"How to Extend Your Engines Lifespan",e:"Practical maintenance tips that extend engine life dramatically.",d:"March 5, 2026",cat:"Maintenance"},{t:"The Complete Guide to Buying Used Auto Parts Online",e:"Everything you need before purchasing - from compatibility to warranty.",d:"March 1, 2026",cat:"Guide"},{t:"Common Electrical Issues and Used Part Solutions",e:"How used electrical components solve problems at fraction of new costs.",d:"Feb 24, 2026",cat:"Electrical"},{t:"Suspension Upgrades - What Used Parts Work Best",e:"Which suspension components are safe to buy used vs new.",d:"Feb 18, 2026",cat:"Suspension"}];
  return <>
    <PageBanner subtitle="Auto Parts Tips - Guides - Industry News - DIY Advice" tok={tok}/>
    <section className="sec" style={{padding:"48px 24px",background:tok.bg}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <SecHead label="AUAPW.ORG Blog" title="Auto Parts Guides and Tips" tok={tok}/>
        <div className="cat-g" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:18}}>
          {posts.map(function(p,i){return(
            <div key={p.t} style={{background:tok.card,border:"1px solid "+tok.bdd,borderRadius:8,overflow:"hidden",cursor:"pointer",transition:"all .25s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(232,232,232,.22)";e.currentTarget.style.transform="translateY(-3px)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor=tok.bdd;e.currentTarget.style.transform="none";}}>
              <div style={{height:120,background:"linear-gradient(135deg,#0a0c18,#14182a)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <LogoCircle size={36} uid={"blog"+i}/>
              </div>
              <div style={{padding:18}}>
                <span style={{fontSize:8.5,fontWeight:700,letterSpacing:".14em",textTransform:"uppercase",padding:"3px 8px",background:tok.bdd,color:tok.fg,fontFamily:MH}}>{p.cat}</span>
                <h3 style={{fontFamily:MH,fontSize:12,fontWeight:900,color:tok.fg,marginTop:10,marginBottom:7,lineHeight:1.4,textTransform:"uppercase",letterSpacing:".04em"}}>{p.t}</h3>
                <p style={{fontSize:11,color:tok.muted,lineHeight:1.65,fontWeight:300,marginBottom:12}}>{p.e}</p>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <span style={{fontSize:9.5,color:tok.dim,fontFamily:MH}}>{p.d}</span>
                  <span style={{fontSize:9.5,color:tok.fg,fontFamily:MH,display:"flex",alignItems:"center",gap:4}}>Read <ArrowRight size={9}/></span>
                </div>
              </div>
            </div>
          );})}
        </div>
      </div>
    </section>
  </>;
}

// ── DOWNLOADS ──
function generateBrandHTML(brand) {
  const c=BCOLORS[brand]||"#1a1d28";
  const mods=MODELS[brand]||[];
  const YEARS=Array.from({length:37},(_,i)=>String(2025-i));
  const gi=b=>{const w=b.split(/[\s-]+/);return w.length>=2?(w[0][0]+w[1][0]).toUpperCase():b.slice(0,3).toUpperCase();};
  const slug=brand.toLowerCase().replace(/\s+/g,"-").replace(/[^a-z0-9-]/g,"");
  const HIST={"Toyota":"Toyota Motor Corporation was founded in 1937 by Kiichiro Toyoda. Known for legendary reliability across all their vehicle lines.","Ford":"Ford Motor Company was founded by Henry Ford in 1903. The F-Series truck has been Americas number one selling truck for over 40 consecutive years.","Honda":"Honda Motor Co. was founded in 1948. Known for engineering excellence, reliability, and the world largest production of internal combustion engines.","Chevrolet":"Chevrolet was founded in 1911. The Corvette debuted in 1953. Silverado and Tahoe are among Americas best-selling vehicles.","BMW":"BMW was founded in 1916 in Munich Germany. Renowned for performance luxury. The 3 Series is the benchmark for sports sedans worldwide."};
  const hist=HIST[brand]||(brand+" has a rich history spanning decades of automotive engineering excellence and innovation.");
  return "<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"><title>"+brand+" Used Auto Parts - AUAPW.ORG</title><meta name=\"description\" content=\"Quality used "+brand+" auto parts at AUAPW.ORG. Free shipping, 6-month warranty, 24hr response.\"><link rel=\"canonical\" href=\"https://auapw.org/brands/"+slug+"\"><style>*{box-sizing:border-box;margin:0;padding:0}body{background:#07090f;color:#f5f5f5;font-family:DM Mono,monospace;min-height:100vh}nav{background:rgba(8,10,18,.97);border-bottom:1px solid rgba(255,255,255,.08);padding:0 24px;height:60px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:50}.nav-brand{font-size:1rem;font-weight:900;color:#e8e8e8;text-decoration:none;letter-spacing:.08em;text-transform:uppercase}.nav-links{display:flex;gap:14px}.nav-links a{font-size:10px;font-weight:700;color:#6b7280;text-decoration:none;letter-spacing:.1em;text-transform:uppercase}.btn{display:inline-flex;align-items:center;gap:6px;padding:9px 18px;font-size:10px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;border:1.5px solid rgba(255,255,255,.6);border-radius:3px;color:#fff;background:rgba(255,255,255,.06);cursor:pointer;font-family:DM Mono,monospace;text-decoration:none}.banner{background:linear-gradient(135deg,"+c+"dd,"+c+"99,#06080e);padding:32px 24px;border-bottom:1px solid rgba(255,255,255,.1)}.banner-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:20px;flex-wrap:wrap}.brand-badge{width:80px;height:80px;border-radius:12px;background:linear-gradient(135deg,"+c+","+c+"88);border:2px solid rgba(255,255,255,.3);display:flex;align-items:center;justify-content:center;flex-shrink:0}.brand-badge span{font-size:22px;font-weight:900;color:rgba(255,255,255,.95)}.brand-title{font-size:clamp(1.2rem,3vw,2rem);font-weight:900;color:#fff;text-transform:uppercase;letter-spacing:.04em;margin-bottom:4px}.badges{display:flex;flex-wrap:wrap;gap:5px;margin-top:6px}.badge{padding:2px 8px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);border-radius:3px;font-size:9px;color:rgba(255,255,255,.85);letter-spacing:.08em}.container{max-width:1280px;margin:0 auto;padding:48px 24px}.two-col{display:grid;grid-template-columns:1fr 360px;gap:44px;align-items:start}.sticky-form{position:sticky;top:80px}.card{background:rgba(19,22,30,.85);border:1px solid rgba(255,255,255,.08);border-radius:4px;padding:24px;margin-bottom:16px}h2{font-size:clamp(.9rem,2.5vw,1.4rem);font-weight:900;color:#f5f5f5;margin-bottom:14px;text-transform:uppercase;letter-spacing:.04em;line-height:1.15}h3{font-size:1rem;font-weight:900;color:#f5f5f5;margin-bottom:12px;text-transform:uppercase;letter-spacing:.04em}p{font-size:13px;color:#9ca3af;line-height:1.85;font-weight:300;margin-bottom:10px}.models-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:28px}.model-item{padding:10px 14px;background:rgba(19,22,30,.85);border:1px solid rgba(255,255,255,.08);border-radius:5px;font-size:12px;color:#9ca3af;cursor:pointer;text-decoration:none;display:flex;align-items:center;gap:8px}.model-item::before{content:\"\";width:5px;height:5px;border-radius:50%;background:rgba(255,255,255,.25);flex-shrink:0}.faq-item{background:rgba(19,22,30,.85);border:1px solid rgba(255,255,255,.08);border-radius:5px;padding:16px;margin-bottom:8px}.faq-q{font-size:12px;font-weight:700;color:#f5f5f5;margin-bottom:8px}.faq-a{font-size:12px;color:#9ca3af;line-height:1.8;font-weight:300}.form-group{margin-bottom:10px}.form-label{font-size:9px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#6b7280;display:block;margin-bottom:5px}.form-input{width:100%;padding:9px 11px;background:rgba(13,15,24,.9);border:1px solid rgba(255,255,255,.14);border-radius:5px;font-size:12px;color:#f5f5f5;outline:none;font-family:DM Mono,monospace;appearance:none}.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.submit-btn{width:100%;padding:13px;background:rgba(255,255,255,.06);border:1.5px solid rgba(255,255,255,.6);border-radius:3px;color:#fff;font-family:DM Mono,monospace;font-weight:700;font-size:11px;letter-spacing:.18em;text-transform:uppercase;cursor:pointer;margin-top:4px}.url-bar{background:rgba(4,6,13,.98);border-bottom:1px solid rgba(255,255,255,.06);padding:5px 20px;display:flex;align-items:center;gap:10px}.url-pill{flex:1;display:flex;align-items:center;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:5px;padding:3px 10px;gap:7px;max-width:540px}.url-dot{width:9px;height:9px;border-radius:50%;border:1.5px solid rgba(74,222,128,.7);flex-shrink:0}footer{background:rgba(5,7,14,.99);border-top:1px solid rgba(255,255,255,.06);padding:24px;text-align:center;margin-top:60px}.footer-links{display:flex;gap:16px;justify-content:center;flex-wrap:wrap;margin-bottom:10px}.footer-links a{font-size:9px;color:#6b7280;text-decoration:none;letter-spacing:.08em}.footer-text{font-size:9px;color:#4b5563;letter-spacing:.06em}@media(max-width:900px){.two-col{grid-template-columns:1fr}.sticky-form{position:static}.models-grid{grid-template-columns:repeat(2,1fr)}.form-grid{grid-template-columns:1fr}.nav-links{display:none}}</style></head><body><nav><a href=\"https://auapw.org\" class=\"nav-brand\">AUAPW.ORG</a><div class=\"nav-links\"><a href=\"https://auapw.org/parts\">Parts</a><a href=\"https://auapw.org/used-engines\">Engines</a><a href=\"https://auapw.org/used-transmissions\">Transmissions</a><a href=\"https://auapw.org/brands\">All Brands</a><a href=\"https://auapw.org/inventory\">Inventory</a><a href=\"https://auapw.org/contact\">Contact</a></div><a href=\"https://auapw.org/get-a-quote\" class=\"btn\">Get Free Quote</a></nav><div class=\"url-bar\"><div class=\"url-pill\"><div class=\"url-dot\"></div><span style=\"font-size:12px;color:#6b7280\">auapw.org/brands/"+slug+"</span></div></div><div class=\"banner\"><div class=\"banner-inner\"><div class=\"brand-badge\"><span>"+gi(brand)+"</span></div><div><div class=\"brand-title\">"+brand+" Used Auto Parts</div><div style=\"font-size:10px;color:rgba(255,255,255,.5);letter-spacing:.12em;margin-bottom:4px\">ALL USED AUTO PARTS WAREHOUSE - AUAPW.ORG</div><div class=\"badges\"><span class=\"badge\">Free Shipping</span><span class=\"badge\">6-Month Warranty</span><span class=\"badge\">OEM Quality</span><span class=\"badge\">24hr Response</span><span class=\"badge\">"+mods.length+" Models</span></div></div></div></div><div class=\"container\"><div class=\"two-col\"><div><div class=\"card\"><h2>"+brand+" - Brand History</h2><p>"+hist+"</p><p>At AUAPW.ORG we source quality used OEM "+brand+" parts from our nationwide network of 2,000+ verified salvage yards. From engines and transmissions to electrical and body parts - we find the right part at the best price.</p></div><h3>"+brand+" Models We Cover</h3><div class=\"models-grid\">"+mods.map(m=>"<a href=\"https://auapw.org/get-a-quote?vehicle="+encodeURIComponent(brand+" "+m)+"\" class=\"model-item\">"+m+"</a>").join("")+"</div><h3>"+brand+" Parts FAQ</h3><div class=\"faq-item\"><div class=\"faq-q\">What "+brand+" parts do you carry?</div><div class=\"faq-a\">We source engines, transmissions, drivetrain, electrical, cooling, suspension, and body parts for all "+brand+" models through our 2,000+ verified yard network.</div></div><div class=\"faq-item\"><div class=\"faq-q\">Are used "+brand+" parts reliable?</div><div class=\"faq-a\">Yes. Used OEM "+brand+" parts are the exact same factory components originally in your vehicle, inspected and graded, backed by our 6-month warranty.</div></div><div class=\"faq-item\"><div class=\"faq-q\">How much can I save on "+brand+" parts?</div><div class=\"faq-a\">Typically 50-80% compared to new dealer prices. Get a free quote at auapw.org/get-a-quote or call (888) 818-5001.</div></div><div class=\"faq-item\"><div class=\"faq-q\">Do "+brand+" parts come with warranty?</div><div class=\"faq-a\">Yes. All parts come with a 30-180 day warranty from the supplying yard. Engine and transmission warranties are typically 90-180 days.</div></div></div><div class=\"sticky-form\"><div class=\"card\"><h3>Find a "+brand+" Part</h3><form action=\"https://formsubmit.co/"+LEAD+"\" method=\"POST\"><input type=\"hidden\" name=\"_subject\" value=\"[AUAPW] "+brand+" Quote Request\"><input type=\"hidden\" name=\"_template\" value=\"table\"><input type=\"hidden\" name=\"_captcha\" value=\"false\"><input type=\"hidden\" name=\"_next\" value=\"https://auapw.org/thank-you\"><div class=\"form-group\"><label class=\"form-label\">Year *</label><select name=\"year\" class=\"form-input\" required><option value=\"\">Select Year</option>"+YEARS.map(y=>"<option>"+y+"</option>").join("")+"</select></div><div class=\"form-group\"><label class=\"form-label\">Model *</label><select name=\"model\" class=\"form-input\" required><option value=\"\">Select Model</option>"+mods.map(m=>"<option>"+m+"</option>").join("")+"</select></div><div class=\"form-group\"><label class=\"form-label\">Part Needed *</label><input type=\"text\" name=\"part\" class=\"form-input\" placeholder=\"Engine, Transmission, CV Axle...\" required></div><div class=\"form-grid\"><div class=\"form-group\"><label class=\"form-label\">First Name *</label><input type=\"text\" name=\"first\" class=\"form-input\" placeholder=\"John\" required></div><div class=\"form-group\"><label class=\"form-label\">Last Name *</label><input type=\"text\" name=\"last\" class=\"form-input\" placeholder=\"Smith\" required></div></div><div class=\"form-group\"><label class=\"form-label\">Phone *</label><input type=\"tel\" name=\"phone\" class=\"form-input\" placeholder=\"(555) 000-0000\" required></div><div class=\"form-group\"><label class=\"form-label\">Email *</label><input type=\"email\" name=\"email\" class=\"form-input\" placeholder=\"you@email.com\" required></div><div class=\"form-grid\"><div class=\"form-group\"><label class=\"form-label\">Zip Code *</label><input type=\"text\" name=\"zip\" class=\"form-input\" placeholder=\"90210\" required></div><div class=\"form-group\"><label class=\"form-label\">State *</label><select name=\"state\" class=\"form-input\" required><option value=\"\">State</option>"+STATES.map(s=>"<option>"+s+"</option>").join("")+"</select></div></div><p style=\"font-size:8.5px;color:#6b7280;margin:8px 0;line-height:1.6\">By submitting you authorize AUAPW.ORG to contact you via phone/text/email.</p><button type=\"submit\" class=\"submit-btn\">Get Free Quote</button><p style=\"text-align:center;font-size:9px;color:#4b5563;margin-top:8px\">Response within 24 hours guaranteed</p></form><div style=\"margin-top:14px;padding-top:14px;border-top:1px solid rgba(255,255,255,.06);text-align:center\"><a href=\"tel:8888185001\" style=\"font-size:12px;font-weight:700;color:#f5f5f5;text-decoration:none\">Call (888) 818-5001</a></div></div></div></div></div><footer><div class=\"footer-links\"><a href=\"https://auapw.org\">Home</a><a href=\"https://auapw.org/parts\">Parts</a><a href=\"https://auapw.org/brands\">All Brands</a><a href=\"https://auapw.org/used-engines\">Engines</a><a href=\"https://auapw.org/used-transmissions\">Transmissions</a><a href=\"https://auapw.org/get-a-quote\">Free Quote</a><a href=\"https://auapw.org/contact\">Contact</a></div><div class=\"footer-text\">2025 AUAPW.ORG - ALL USED AUTO PARTS WAREHOUSE - auapw.org/brands/"+slug+"</div></footer></body></html>";
}

function downloadBrandPage(brand) {
  try {
    const html=generateBrandHTML(brand);
    const blob=new Blob([html],{type:"text/html;charset=utf-8"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url;
    a.download="auapw-"+brand.toLowerCase().replace(/\s+/g,"-").replace(/[^a-z0-9-]/g,"")+".html";
    document.body.appendChild(a);a.click();document.body.removeChild(a);URL.revokeObjectURL(url);
    return true;
  } catch(e){return false;}
}

function DownloadsPage({goTo,tok}){
  const ALL=MAKES.slice().sort();
  const letters=["All",...Array.from(new Set(ALL.map(b=>b[0].toUpperCase()))).sort()];
  const [downloaded,setDownloaded]=useState({});
  const [progress,setProgress]=useState(0);
  const [downloading,setDownloading]=useState(false);
  const [filter,setFilter]=useState("All");
  const filtered=filter==="All"?ALL:ALL.filter(b=>b[0].toUpperCase()===filter);
  const doneCount=Object.keys(downloaded).length;
  const gi=b=>{const w=b.split(/[\s-]+/);return w.length>=2?(w[0][0]+w[1][0]).toUpperCase():b.slice(0,3).toUpperCase();};

  const handleOne=(brand)=>{const ok=downloadBrandPage(brand);if(ok)setDownloaded(p=>({...p,[brand]:true}));};
  const handleAll=async()=>{
    setDownloading(true);setProgress(0);
    for(let i=0;i<ALL.length;i++){
      downloadBrandPage(ALL[i]);
      setDownloaded(p=>({...p,[ALL[i]]:true}));
      setProgress(Math.round(((i+1)/ALL.length)*100));
      await new Promise(r=>setTimeout(r,380));
    }
    setDownloading(false);
  };

  return <>
    <PageBanner subtitle={"Download Center - "+ALL.length+" Car Brand Pages - Separate HTML Files"} tok={tok}/>
    <div style={{background:"linear-gradient(135deg,#060810,#0c0e1c)",borderBottom:"1px solid "+tok.bdd,padding:"32px 24px"}}>
      <div style={{maxWidth:1280,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",gap:24,flexWrap:"wrap"}}>
        <div>
          <h1 className="chrome" style={{fontFamily:MH,fontSize:"clamp(1.1rem,3vw,2rem)",fontWeight:900,letterSpacing:".04em",textTransform:"uppercase",lineHeight:1.15,marginBottom:10}}>{ALL.length+" Car Brand Pages"}</h1>
          <p style={{fontSize:13,color:tok.muted,fontWeight:300,maxWidth:500,lineHeight:1.8}}>Each brand has its own complete standalone .html file - brand banner, history, all models, FAQ, and a live quote form. Upload to any host. No login, no password.</p>
          <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:14}}>
            {[{e:"📄",t:"43 HTML Files"},{e:"🔗",t:"auapw.org URLs"},{e:"📧",t:"Leads to Your Email"},{e:"🔓",t:"No Auth Needed"}].map(function(x){return(<span key={x.t} style={{display:"flex",alignItems:"center",gap:5,padding:"5px 12px",background:tok.card,border:"1px solid "+tok.bdd,borderRadius:4,fontSize:10,color:tok.fg,fontFamily:MH,fontWeight:600}}><span>{x.e}</span>{x.t}</span>);})}</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:10,flexShrink:0,minWidth:260}}>
          <button className="btn-led" onClick={handleAll} disabled={downloading} style={{padding:"14px 28px",fontSize:11,opacity:downloading?.6:1}}>{downloading?"Downloading "+progress+"%":"Download ALL "+ALL.length+" Brands"}</button>
          <div style={{height:5,borderRadius:3,background:"rgba(255,255,255,.08)",overflow:"hidden"}}><div style={{height:"100%",width:progress+"%",background:"linear-gradient(90deg,rgba(74,222,128,.6),rgba(74,222,128,.95))",transition:"width .3s",borderRadius:3}}/></div>
          <div style={{fontSize:9,color:tok.dim,fontFamily:MH,textAlign:"center",letterSpacing:".1em"}}>{doneCount+" / "+ALL.length+" downloaded"}</div>
        </div>
      </div>
    </div>
    <section style={{padding:"36px 24px",background:tok.bg}}>
      <div style={{maxWidth:1280,margin:"0 auto"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:16,marginBottom:20,flexWrap:"wrap"}}>
          <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
            {letters.map(l=><button key={l} onClick={()=>setFilter(l)} style={{minWidth:34,height:28,padding:"0 8px",borderRadius:4,fontSize:10,fontWeight:700,cursor:"pointer",border:"none",fontFamily:MH,background:filter===l?"linear-gradient(135deg,#fff,#94a3b8)":"rgba(255,255,255,.06)",color:filter===l?"#07090f":tok.muted,transition:"all .2s"}}>{l}</button>)}
          </div>
          {filter!=="All"&&<button className="btn-ghost" onClick={async()=>{for(let i=0;i<filtered.length;i++){downloadBrandPage(filtered[i]);setDownloaded(p=>({...p,[filtered[i]]:true}));await new Promise(r=>setTimeout(r,380));}}} disabled={downloading} style={{fontSize:9,padding:"7px 14px"}}>{"Download All "+filter+" ("+filtered.length+" files)"}</button>}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10,marginBottom:36}}>
          {filtered.map(function(brand){
            const c=BCOLORS[brand]||"#2a3050";
            const done=downloaded[brand];
            const mods=MODELS[brand]||[];
            const slug=brand.toLowerCase().replace(/\s+/g,"-").replace(/[^a-z0-9-]/g,"");
            return(
              <div key={brand} style={{background:tok.card,border:"1px solid "+(done?"rgba(74,222,128,.35)":tok.bdd),borderRadius:8,overflow:"hidden",transition:"all .25s"}} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 12px 36px rgba(0,0,0,.45)";}} onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
                <div style={{height:3,background:"linear-gradient(90deg,"+c+","+c+"88,transparent)"}}/>
                <div style={{padding:"14px"}}>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                    <div style={{width:44,height:44,borderRadius:9,background:"linear-gradient(135deg,"+c+","+c+"77)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      <span style={{fontSize:11,fontWeight:900,color:"rgba(255,255,255,.95)"}}>{gi(brand)}</span>
                    </div>
                    <div><div style={{fontSize:12,fontWeight:700,color:tok.fg,fontFamily:MH,lineHeight:1.2}}>{brand}</div><div style={{fontSize:8.5,color:tok.dim,fontFamily:MH}}>{mods.length+" models"}</div></div>
                  </div>
                  <div style={{fontSize:8,color:tok.dim,fontFamily:MH,marginBottom:8,padding:"3px 7px",background:tok.bdd,borderRadius:3}}>{"auapw.org/brands/"+slug}</div>
                  <div style={{fontSize:8.5,color:tok.dim,fontFamily:MH,marginBottom:12}}>{"auapw-"+slug+".html"}</div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:3,marginBottom:12}}>
                    {mods.slice(0,4).map(m=><span key={m} style={{padding:"1px 5px",background:tok.bdd,fontSize:7.5,color:tok.dim,fontFamily:MH}}>{m}</span>)}
                    {mods.length>4&&<span style={{fontSize:7.5,color:tok.dimmer,fontFamily:MH}}>+{mods.length-4}</span>}
                  </div>
                  <button onClick={()=>handleOne(brand)} style={{width:"100%",padding:"9px",background:done?"rgba(74,222,128,.1)":"rgba(255,255,255,.06)",border:"1.5px solid "+(done?"rgba(74,222,128,.5)":"rgba(255,255,255,.25)"),borderRadius:4,color:done?"rgba(74,222,128,.95)":tok.fg,cursor:"pointer",fontFamily:MH,fontSize:9,letterSpacing:".14em",textTransform:"uppercase",fontWeight:700,transition:"all .2s",display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
                    {done?<><span>✓</span>Downloaded</>:<><span>⬇</span>Download HTML</>}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  </>;
}

// ── POLICY ──
const POLICIES = {
  "privacy":{title:"Privacy Policy",icon:Lock,sections:[{h:"Information We Collect",c:"When you request a quote or contact us, we collect: name, email, phone, vehicle details, and zip code. We also collect basic usage data to improve our services."},{h:"How We Use Your Information",c:"We use your information to process parts requests, connect you with verified yards, and respond to inquiries. We do not sell or rent your personal information."},{h:"Your Rights",c:"You may request access, correction, or deletion of your personal information at any time by contacting us at info@auapw.org or calling (888) 818-5001."}]},
  "terms":{title:"Terms and Conditions",icon:FileText,sections:[{h:"Acceptance of Terms",c:"By using AUAPW.ORG, you agree to these Terms. We reserve the right to update these terms at any time."},{h:"Services Description",c:"AUAPW.ORG is an intermediary connecting buyers with verified salvage yards. Parts are sold and shipped directly by the supplying yards."},{h:"Warranty",c:"All parts include a 30-180 day warranty from the supplying yard covering defects as described at time of sale."}]},
  "shipping":{title:"Shipping Policy",icon:Truck,sections:[{h:"Free Shipping",c:"We offer free shipping on all parts to the contiguous United States. All shipments include tracking information via email."},{h:"Processing Times",c:"Orders are typically processed within 1-3 business days. Standard delivery takes 3-7 business days."},{h:"Damaged Shipments",c:"If your part arrives damaged, photograph the damage and contact us within 48 hours. We will arrange a replacement or full refund."}]},
  "returns":{title:"Return Policy",icon:RotateCcw,sections:[{h:"Return Eligibility",c:"Parts may be returned within the warranty period if defective, incorrectly described, or if they do not fit the specified vehicle."},{h:"Return Process",c:"Contact us at info@auapw.org or (888) 818-5001 for a Return Authorization number before sending any part back."},{h:"Refunds",c:"Refunds are processed within 5-10 business days after the returned part is received and inspected."}]},
  "cookies":{title:"Cookie Policy",icon:Settings,sections:[{h:"What We Use",c:"We use essential cookies for site functionality and analytics cookies to understand visitor behavior. We do not use advertising cookies."},{h:"Managing Cookies",c:"You can control cookies through your browser settings. Blocking essential cookies may affect the quote form functionality."}]},
  "disclaimer":{title:"Disclaimer",icon:AlertTriangle,sections:[{h:"General",c:"Information on AUAPW.ORG is for general informational purposes. We make no warranties about completeness or accuracy."},{h:"Parts Compatibility",c:"Compatibility information is based on general fitment data. Always verify with your mechanic before purchase."}]},
  "acceptable-use":{title:"Acceptable Use",icon:XCircle,sections:[{h:"Permitted Use",c:"AUAPW.ORG is for individuals and businesses purchasing used auto parts for legitimate vehicle repair and maintenance."},{h:"Prohibited Activities",c:"You may not submit false information, use automated scripts to scrape data, or engage in fraudulent activity."}]}
};

function PolicyPage({page,tok}){
  const p=POLICIES[page]||POLICIES["privacy"];
  const IconC=p.icon;
  return <>
    <PageBanner subtitle={p.title} tok={tok}/>
    <section className="sec" style={{padding:"48px 24px",background:tok.bg}}>
      <div style={{maxWidth:900,margin:"0 auto"}}>
        <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:28}}>
          <div style={{width:44,height:44,borderRadius:10,background:tok.bdd,display:"flex",alignItems:"center",justifyContent:"center"}}><IconC size={20} color={tok.fg}/></div>
          <h1 className="chrome" style={{fontFamily:MH,fontSize:"clamp(.9rem,2.5vw,1.6rem)",fontWeight:900,letterSpacing:".04em",textTransform:"uppercase"}}>{p.title}</h1>
        </div>
        <div className="pol">
          {p.sections.map(function(s,i){return(
            <div key={i} className="gc" style={{padding:22,marginBottom:10}}>
              <GSB/><div style={{position:"relative",zIndex:1}}><h2>{s.h}</h2><p>{s.c}</p></div>
            </div>
          );})}
          <div style={{padding:18,background:tok.card,border:"1px solid "+tok.bdd,borderRadius:8,marginTop:10}}>
            <p style={{fontSize:13,color:tok.muted,fontWeight:300}}>{"Questions? Contact us at "+EMAIL+" or call "+PHONE}</p>
          </div>
        </div>
      </div>
    </section>
  </>;
}

// ── APP ──
export default function App() {
  const getSys=()=>{try{return window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";}catch(e){return"dark";}};
  const [theme,setTheme]=useState(getSys);
  const [page,setPage]=useState("home");
  const [pageData,setPageData]=useState(null);
  const [logoSrc,setLogoSrc]=useState(null);

  useEffect(()=>{
    try{const mq=window.matchMedia("(prefers-color-scheme: light)");const h=e=>setTheme(e.matches?"light":"dark");mq.addEventListener("change",h);return()=>mq.removeEventListener("change",h);}catch(e){}
  },[]);

  const toggle=()=>setTheme(t=>t==="dark"?"light":"dark");
  const tok=T(theme);

  const goTo=(p,data)=>{setPage(p);setPageData(data||null);try{if(window.scrollTo)window.scrollTo(0,0);}catch(e){}};

  const handleLogoFile=(e)=>{
    const file=e.target.files&&e.target.files[0];
    if(!file)return;
    const reader=new FileReader();
    reader.onload=(ev)=>setLogoSrc(ev.target.result);
    reader.readAsDataURL(file);
  };

  const renderPage=()=>{
    if(page==="home")return <HomePage goTo={goTo} tok={tok} theme={theme}/>;
    if(page==="used-engines")return <UsedEnginesPage goTo={goTo} tok={tok}/>;
    if(page==="used-transmissions")return <UsedTransPage goTo={goTo} tok={tok}/>;
    if(page==="parts")return <PartsPage goTo={goTo} tok={tok}/>;
    if(page.startsWith("parts-"))return <PartsDetailPage catId={page.replace("parts-","")} goTo={goTo} tok={tok}/>;
    if(page==="makes")return <MakesPage goTo={goTo} tok={tok}/>;
    if(page==="brand")return <BrandPage brand={pageData||"Toyota"} goTo={goTo} tok={tok} theme={theme}/>;
    if(page==="inventory")return <InventoryPage goTo={goTo} tok={tok}/>;
    if(page==="quote")return <QuotePage defaultPart={pageData||""} tok={tok}/>;
    if(page==="about")return <AboutPage goTo={goTo} tok={tok}/>;
    if(page==="contact")return <ContactPage tok={tok} theme={theme}/>;
    if(page==="blog")return <BlogPage goTo={goTo} tok={tok}/>;
    if(page==="downloads")return <DownloadsPage goTo={goTo} tok={tok}/>;
    if(POLICIES[page])return <PolicyPage page={page} tok={tok}/>;
    return <HomePage goTo={goTo} tok={tok} theme={theme}/>;
  };

  return (
    <ThemeCtx.Provider value={{theme,toggle}}>
    <LogoCtx.Provider value={{logoSrc,setLogoSrc}}>
      <div className={"aw "+(theme==="light"?"lt":"dk")}>
        <style>{CSS}</style>
        {/* LOGO UPLOAD BAR */}
        {!logoSrc&&(
          <div style={{background:"#e55000",padding:"0",position:"relative",zIndex:9999}}>
            <label style={{display:"flex",alignItems:"center",justifyContent:"center",gap:16,padding:"14px 24px",cursor:"pointer",width:"100%"}}>
              <span style={{fontSize:28}}>📸</span>
              <div>
                <div style={{fontSize:14,fontWeight:900,color:"#fff",fontFamily:MH,letterSpacing:".05em",lineHeight:1.2}}>CLICK HERE TO UPLOAD YOUR AUAPW LOGO</div>
                <div style={{fontSize:10,color:"rgba(255,255,255,.8)",fontFamily:MH,marginTop:2}}>Select your PNG or JPG logo file and it will show everywhere instantly</div>
              </div>
              <div style={{padding:"10px 24px",background:"#fff",borderRadius:5,fontSize:12,fontWeight:900,color:"#e55000",fontFamily:MH,whiteSpace:"nowrap",flexShrink:0}}>UPLOAD LOGO</div>
              <input type="file" accept="image/*" onChange={handleLogoFile} style={{display:"none"}}/>
            </label>
          </div>
        )}
        <Navbar page={page} goTo={goTo} tok={tok} theme={theme} toggle={toggle}/>
        <UrlBar page={page} pageData={pageData} tok={tok} theme={theme}/>
        <main>{renderPage()}</main>
        <Footer goTo={goTo} tok={tok}/>
      </div>
    </LogoCtx.Provider>
    </ThemeCtx.Provider>
  );
}
