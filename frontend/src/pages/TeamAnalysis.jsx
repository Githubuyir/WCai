import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { matchesData, generateFlagSVG } from '../data/mockData';
import { getTeamByCode } from '../api/api';

// Import local image assets for hero backgrounds
import argentinaHero from '../assets/argentina-hero.jpg';
import belgiumHero from '../assets/belgium-hero.png';
import brazilHero from '../assets/brazil-hero.jpg';
import canadaHero from '../assets/canada-hero.jpg';
import englandHero from '../assets/england-hero.jpg';
import franceHero from '../assets/france-hero.jpg';
import germanyHero from '../assets/germany-hero.jpg';
import mexicoHero from '../assets/mexico-hero.png';
import netherlandsHero from '../assets/netherlands-hero.png';
import portugalHero from '../assets/portugal-hero.png';
import spainHero from '../assets/spain-hero.png';
import usaHero from '../assets/usa-hero.png';
import stadiumBg from '../assets/stadium.png';

const heroImages = {
  ARG: argentinaHero,
  BEL: belgiumHero,
  BRA: brazilHero,
  CAN: canadaHero,
  ENG: englandHero,
  FRA: franceHero,
  GER: germanyHero,
  MEX: mexicoHero,
  NED: netherlandsHero,
  POR: portugalHero,
  ESP: spainHero,
  USA: usaHero,
};

export default function TeamAnalysis() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const teamCode = (searchParams.get('team') || 'BRA').toUpperCase();

  // Helper: Find team group
  const findTeamGroup = (code) => {
    const match = matchesData.find(m => m.team1.code === code || m.team2.code === code);
    if (match) return match.group;

    const topGroups = {
      'MEX': 'Group A', 'KOR': 'Group A', 'RSA': 'Group A', 'CZE': 'Group A',
      'CAN': 'Group B', 'BIH': 'Group B', 'QAT': 'Group B', 'SUI': 'Group B',
      'BRA': 'Group C', 'MAR': 'Group C', 'SCO': 'Group C', 'HAI': 'Group C',
      'USA': 'Group D', 'AUS': 'Group D', 'TUR': 'Group D', 'PAR': 'Group D',
      'GER': 'Group E', 'ECU': 'Group E', 'CIV': 'Group E', 'CUR': 'Group E',
      'NED': 'Group F', 'JPN': 'Group F', 'SWE': 'Group F', 'TUN': 'Group F',
      'BEL': 'Group G', 'EGY': 'Group G', 'IRN': 'Group G', 'NZL': 'Group G',
      'ESP': 'Group H', 'URU': 'Group H', 'KSA': 'Group H', 'CPV': 'Group H',
      'FRA': 'Group I', 'SEN': 'Group I', 'NOR': 'Group I', 'IRQ': 'Group I',
      'ARG': 'Group J', 'ALG': 'Group J', 'AUT': 'Group J', 'JOR': 'Group J',
      'POR': 'Group K', 'COL': 'Group K', 'UZB': 'Group K', 'COD': 'Group K',
      'ENG': 'Group L', 'CRO': 'Group L', 'GHA': 'Group L', 'PAN': 'Group L'
    };
    return topGroups[code] || 'Group Stage';
  };

  // Helper: Simple deterministic hash function based on team code string to seed fallbacks
  const hashCode = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
  };

  // Primary Teams Database
  const teamsDatabase = useMemo(() => {
    return {
      'BRA': {
        name: "Brazil",
        fifaRank: 5,
        powerRank: 2,
        group: "Group C",
        winProb: "16.8%",
        qualProb: "96%",
        rating: 93.5,
        isDarkHorse: false,
        heroImage: heroImages.BRA,
        archetype: "Lateral Wing Overload",
        archetypeDesc: "Uses wide spaces and overlapping fullbacks to isolate defenders in 1v1 situations.",
        tags: ["Creative Flanks", "High Recovery Press", "Fluid Front Three"],
        overview: "A high-intensity possession squad that dominates via progressive runs. Brazil overloads the final third, forcing low-block defensive units to collapse inward and opening channels for late box runs.",
        formation: "4-3-3",
        startingXI: [
          { name: "Alisson", role: "Goalkeeper (GK)", x: 50, y: 88 },
          { name: "Marquinhos", role: "Center Back (CB)", x: 35, y: 73, isCaptain: true },
          { name: "Gabriel Mag.", role: "Center Back (CB)", x: 65, y: 73 },
          { name: "Danilo", role: "Right Back (RB)", x: 15, y: 70 },
          { name: "Guilherme A.", role: "Left Back (LB)", x: 85, y: 70 },
          { name: "Bruno Guim.", role: "Defensive Mid (DM)", x: 50, y: 58 },
          { name: "Lucas Paquetá", role: "Central Mid (CM)", x: 32, y: 44 },
          { name: "Rodrygo", role: "Central Mid (CM)", x: 68, y: 44 },
          { name: "Raphinha", role: "Right Winger (RW)", x: 20, y: 22 },
          { name: "Vinícius Jr.", role: "Left Winger (LW)", x: 80, y: 22 },
          { name: "Neymar Jr.", role: "Striker / CF", x: 50, y: 16 }
        ],
        metrics: { attack: 95, control: 91, solidity: 93, resistance: 92, transitions: 94, depth: 88 },
        tactics: {
          buildup: "Possession is structured from the back with center-backs spreading wide. Bruno Guimarães drops deep as a single pivot, while fullbacks push high to transform the shape into a fluid 3-2-5 in possession.",
          attack: "Primary attacks flow down the flanks. Vinícius Jr. isolates defenders in 1v1 situations, supported by underlapping runs from central midfielders, generating cutbacks to the penalty spot.",
          defense: "Maintains a progressive counter-press. Upon losing possession, the closest forward and midfielder immediately swarm the ball, attempting to force recoveries within 5 seconds.",
          transition: "Explosive transition speed. Features direct switches from deep midfielders to wide wingers who attack the box at pace before the opposition defensive block can reorganize.",
          setpieces: "Highly dangerous target delivery. Marquinhos and Gabriel Magalhães provide elite aerial threat on outswinging corners delivered by Neymar Jr.",
          weakness: "Vulnerable to direct counter-attacks behind high-pressing fullbacks if the primary counter-pressing phase is bypassed."
        },
        players: [
          { name: "Vinícius Jr.", role: "Left Wing (Transition)", score: 96, impact: "Creates extreme flank overloads and unlocks deep blocks with elite acceleration and dribbling." },
          { name: "Neymar Jr.", role: "Center Forward (Playmaker)", score: 94, impact: "Operates between lines, providing key assists and high-quality final-third ball progression." },
          { name: "Marquinhos", role: "Center Back (Anchor)", score: 90, impact: "Controls transitions, wins key aerial battles, and organizes the backline rest defense." }
        ],
        form: ["W", "W", "W", "W", "D"],
        goalsScored: 12,
        goalsConceded: 2,
        cleanSheets: 3,
        momentum: [78, 82, 88, 93, 93],
        similar: [
          { name: "France", code: "FRA", archetype: "Transition Predator", sim: 89 },
          { name: "Portugal", code: "POR", archetype: "Technical Possession", sim: 87 },
          { name: "England", code: "ENG", archetype: "Possession Dominator", sim: 84 }
        ]
      },
      'ESP': {
        name: "Spain",
        fifaRank: 3,
        powerRank: 5,
        group: "Group H",
        winProb: "10.9%",
        qualProb: "93%",
        rating: 88.5,
        isDarkHorse: false,
        heroImage: heroImages.ESP,
        archetype: "Possession Dominator",
        archetypeDesc: "Uses high-volume passing sequences and positional rotations to suffocate opponent transitions.",
        tags: ["Tiki-Taka", "Press Resistance", "Zonal Suffocation"],
        overview: "Built on high-volume passing sequences and central zone control. Led by Rodri in defensive midfield, Spain suffocates transition vectors, retaining possession until creative gaps open in the final third.",
        formation: "4-3-3",
        startingXI: [
          { name: "Unai Simón", role: "Goalkeeper (GK)", x: 50, y: 88 },
          { name: "Robin Le Norm.", role: "Center Back (CB)", x: 35, y: 73 },
          { name: "Aymeric Lap.", role: "Center Back (CB)", x: 65, y: 73 },
          { name: "Dani Carvajal", role: "Right Back (RB)", x: 15, y: 70 },
          { name: "Marc Cucurella", role: "Left Back (LB)", x: 85, y: 70 },
          { name: "Rodri", role: "Defensive Mid (DM)", x: 50, y: 58, isCaptain: true },
          { name: "Pedri", role: "Central Mid (CM)", x: 32, y: 44 },
          { name: "Fabián Ruiz", role: "Central Mid (CM)", x: 68, y: 44 },
          { name: "Lamine Yamal", role: "Right Winger (RW)", x: 20, y: 22 },
          { name: "Nico Williams", role: "Left Winger (LW)", x: 80, y: 22 },
          { name: "Dani Olmo", role: "Striker / CF", x: 50, y: 16 }
        ],
        metrics: { attack: 88, control: 96, solidity: 87, resistance: 98, transitions: 81, depth: 90 },
        tactics: {
          buildup: "Spain structures play via short, low-risk horizontal passing paths. Center-backs split wide to allow Rodri to drop as a deep screen, creating a diamond structure with the goalkeeper.",
          attack: "Attacks are sustained by trapping opponents deep. Inverted wingers cut inside to combine in half-spaces, generating narrow passing triangles.",
          defense: "Highly organized zonal counter-press. Stays compact to close down opponent passing lanes immediately upon turnovers, forcing quick backpasses.",
          transition: "Deliberate and structured transitions. Prefer to recycle possession back to Rodri rather than taking low-probability forward passes.",
          setpieces: "Prefers short corner routines to maintain possession and shift defensive shapes before delivering low balls into the box.",
          weakness: "Can be vulnerable to direct, vertical long-ball teams that bypass their midfield press entirely."
        },
        players: [
          { name: "Rodri", role: "Defensive Mid (Anchor)", score: 98, impact: "Coordinates the entire team's shape, prevents counter-attacks, and maintains 95%+ pass accuracy." },
          { name: "Lamine Yamal", role: "Right Winger (Creator)", score: 95, impact: "Unlocks low blocks with unpredictable 1v1 dribbles, dangerous crosses, and long-range shooting." },
          { name: "Pedri", role: "Central Mid (Space Link)", score: 92, impact: "Operates in half-spaces, linking play with rapid half-turn passes and vertical run-assists." }
        ],
        form: ["W", "D", "W", "W", "L"],
        goalsScored: 9,
        goalsConceded: 4,
        cleanSheets: 2,
        momentum: [75, 78, 85, 89, 88],
        similar: [
          { name: "Germany", code: "GER", archetype: "Vertical Press Machine", sim: 86 },
          { name: "Argentina", code: "ARG", archetype: "Fluid Possession Block", sim: 85 },
          { name: "Belgium", code: "BEL", archetype: "Technical Possession", sim: 81 }
        ]
      },
      'FRA': {
        name: "France",
        fifaRank: 2,
        powerRank: 3,
        group: "Group I",
        winProb: "15.2%",
        qualProb: "95%",
        rating: 92.1,
        isDarkHorse: false,
        heroImage: heroImages.FRA,
        archetype: "Transition Predator",
        archetypeDesc: "Deploys a mid-block defensive screen and exploits open space with rapid vertical counters.",
        tags: ["Vertical Transitions", "Compact Mid-Block", "Athletic Dominance"],
        overview: "A highly defensive and physically imposing setup that relies on lightning-fast transitions. With Mbappé on the shoulder of the last defender, France lures opponents forward before launching direct vertical counter-attacks.",
        formation: "4-2-3-1",
        startingXI: [
          { name: "M. Maignan", role: "Goalkeeper (GK)", x: 50, y: 88 },
          { name: "William Saliba", role: "Center Back (CB)", x: 35, y: 73 },
          { name: "Dayot Upam.", role: "Center Back (CB)", x: 65, y: 73 },
          { name: "Jules Koundé", role: "Right Back (RB)", x: 15, y: 70 },
          { name: "Theo Hern.", role: "Left Back (LB)", x: 85, y: 70 },
          { name: "Aurél. Tchou.", role: "Defensive Mid (DM)", x: 35, y: 58 },
          { name: "Eduardo Cam.", role: "Defensive Mid (DM)", x: 65, y: 58 },
          { name: "O. Dembélé", role: "Right Winger (RW)", x: 20, y: 40 },
          { name: "Antoine Griez.", role: "Attacking Mid (AM)", x: 50, y: 42, isCaptain: true },
          { name: "Kylian Mbappé", role: "Left Winger (LW)", x: 80, y: 40 },
          { name: "Marcus Thuram", role: "Center Forward (ST)", x: 50, y: 20 }
        ],
        metrics: { attack: 94, control: 91, solidity: 91, resistance: 88, transitions: 97, depth: 95 },
        tactics: {
          buildup: "Safe, direct build-up. Often relies on Maignan's long-range kicking to find midfielders or wide outlets, bypassing heavy press lines entirely.",
          attack: "Attacks are centered around exploiting space behind opposition lines. Griezmann acts as the hub, feeding direct diagonal balls into the path of Mbappé.",
          defense: "Stands in a compact, athletic 4-4-2 mid-block. Focuses on protecting the center and forcing opponents into wide areas where fullbacks engage.",
          transition: "World-class transition speeds. Transitions from deep defense to final third inside 6 seconds via direct runs from Mbappé and Hernandéz.",
          setpieces: "Highly physical set-piece execution. Deploys dynamic targets (Saliba, Upamecano, Thuram) to crowd the goalkeeper and convert deliveries.",
          weakness: "Can struggle to create high-quality chances when forced to break down extremely deep, organized low-blocks."
        },
        players: [
          { name: "Kylian Mbappé", role: "Left Wing (Spearhead)", score: 98, impact: "Exposes high defensive lines with explosive pace, clinical finishing, and diagonal inside runs." },
          { name: "Antoine Griezmann", role: "Attacking Mid (Link)", score: 93, impact: "Connects midfield lines, manages transition tempos, and serves as the creative engine." },
          { name: "William Saliba", role: "Center Back (Recovery)", score: 91, impact: "Neutralizes opposition counter-attacks and maintains defensive structural integrity under pressure." }
        ],
        form: ["W", "W", "L", "W", "W"],
        goalsScored: 11,
        goalsConceded: 3,
        cleanSheets: 3,
        momentum: [80, 85, 82, 88, 92],
        similar: [
          { name: "Brazil", code: "BRA", archetype: "Lateral Wing Overload", sim: 89 },
          { name: "England", code: "ENG", archetype: "Possession Dominator", sim: 86 },
          { name: "Netherlands", code: "NED", archetype: "Fluid Possession Block", sim: 82 }
        ]
      },
      'ARG': {
        name: "Argentina",
        fifaRank: 1,
        powerRank: 1,
        group: "Group J",
        winProb: "18.5%",
        qualProb: "98%",
        rating: 94.2,
        isDarkHorse: false,
        heroImage: heroImages.ARG,
        archetype: "Fluid Possession Block",
        archetypeDesc: "Rotates midfielders dynamically to control tempo and generate overloads around Lionel Messi.",
        tags: ["Midfield Fluidity", "Messi Space-Creations", "Elite Rest Defense"],
        overview: "The reigning champions play a highly intelligent, fluid style that prioritizes defensive rest structure. Dynamic central channels rotate keys to create isolating gaps for Messi to feed Alvarez and Mac Allister.",
        formation: "4-3-3",
        startingXI: [
          { name: "E. Martínez", role: "Goalkeeper (GK)", x: 50, y: 88 },
          { name: "C. Romero", role: "Center Back (CB)", x: 35, y: 73 },
          { name: "Lis. Martínez", role: "Center Back (CB)", x: 65, y: 73 },
          { name: "Nahuel Molina", role: "Right Back (RB)", x: 15, y: 70 },
          { name: "Nic. Tagliaf.", role: "Left Back (LB)", x: 85, y: 70 },
          { name: "Enzo Fern.", role: "Defensive Mid (DM)", x: 50, y: 58 },
          { name: "R. De Paul", role: "Central Mid (CM)", x: 32, y: 44 },
          { name: "Al. Mac All.", role: "Central Mid (CM)", x: 68, y: 44 },
          { name: "Lionel Messi", role: "Right Winger (RW)", x: 20, y: 22, isCaptain: true },
          { name: "Nic. González", role: "Left Winger (LW)", x: 80, y: 22 },
          { name: "Julián Álvarez", role: "Striker / CF", x: 50, y: 16 }
        ],
        metrics: { attack: 93, control: 96, solidity: 93, resistance: 95, transitions: 87, depth: 89 },
        tactics: {
          buildup: "Builds progressively through Enzo Fernández. Midfielders De Paul and Mac Allister execute rotational switches to drag opponents out of position.",
          attack: "Overloads the right half-space. Messi cuts inside, drawing multiple defenders to create passing angles for underlapping runs by Alvarez.",
          defense: "Highly organized rest defense. Fullbacks tag opposition wingers early, while Romero engages aggressively to shut down forward passes.",
          transition: "Controlled transitions. Looks to find Messi immediately upon turnovers, transitioning into a possession spell rather than forced vertical plays.",
          setpieces: "Highly creative routines. Messi delivers curling inswingers, with Romero and Lisandro Martínez attacking the near post.",
          weakness: "Can be exposed by quick wing switches if their narrow midfield block fails to shift laterally in time."
        },
        players: [
          { name: "Lionel Messi", role: "Right Winger (Playmaker)", score: 99, impact: "Dictates tempo, unlocks deep low blocks, and converts decisive opportunities from half-spaces." },
          { name: "C. Romero", role: "Center Back (Aggressive Stopper)", score: 92, impact: "Interrupts opposition transitions early with aggressive front-foot interceptions and physical duels." },
          { name: "R. De Paul", role: "Central Mid (Tactical Engine)", score: 91, impact: "Covers spaces behind Messi, runs long distances, and links defensive transitions." }
        ],
        form: ["W", "W", "W", "D", "W"],
        goalsScored: 10,
        goalsConceded: 2,
        cleanSheets: 4,
        momentum: [85, 90, 93, 92, 94],
        similar: [
          { name: "Spain", code: "ESP", archetype: "Possession Dominator", sim: 85 },
          { name: "Portugal", code: "POR", archetype: "Technical Possession", sim: 84 },
          { name: "Croatia", code: "CRO", archetype: "Technical Midfield Control", sim: 80 }
        ]
      },
      'POR': {
        name: "Portugal",
        fifaRank: 6,
        powerRank: 4,
        group: "Group K",
        winProb: "11.5%",
        qualProb: "92%",
        rating: 88.0,
        isDarkHorse: false,
        heroImage: heroImages.POR,
        archetype: "Technical Possession",
        archetypeDesc: "Uses technical rotations and inverted wingers to overload central zones and half-spaces.",
        tags: ["Creative Half-Spaces", "High Counterpress", "Overlapping Fullbacks"],
        overview: "A highly technical squad featuring creative depth in midfield. Portugal emphasizes inverted winger movements that open overlaps for fullbacks and service Ronaldo in the box.",
        formation: "4-2-3-1",
        startingXI: [
          { name: "Diogo Costa", role: "Goalkeeper (GK)", x: 50, y: 88 },
          { name: "Rúben Dias", role: "Center Back (CB)", x: 35, y: 73, isCaptain: true },
          { name: "Gonçalo Inácio", role: "Center Back (CB)", x: 65, y: 73 },
          { name: "Diogo Dalot", role: "Right Back (RB)", x: 15, y: 70 },
          { name: "Nuno Mendes", role: "Left Back (LB)", x: 85, y: 70 },
          { name: "João Palhinha", role: "Defensive Mid (DM)", x: 35, y: 58 },
          { name: "Vitinha", role: "Defensive Mid (DM)", x: 65, y: 58 },
          { name: "Bernardo Silva", role: "Right Winger (RW)", x: 20, y: 40 },
          { name: "Bruno Fern.", role: "Attacking Mid (AM)", x: 50, y: 42 },
          { name: "Rafael Leão", role: "Left Winger (LW)", x: 80, y: 40 },
          { name: "C. Ronaldo", role: "Center Forward (ST)", x: 50, y: 20 }
        ],
        metrics: { attack: 89, control: 88, solidity: 87, resistance: 90, transitions: 88, depth: 92 },
        tactics: {
          buildup: "Constructs play through Vitinha, who drops between center-backs. Palhinha covers as a defensive screen, allowing Mendes and Dalot to push high.",
          attack: "Focuses on central combinations. Bernardo Silva and Bruno Fernandes operate in half-spaces, sliding passes to Rafael Leão or finding Ronaldo.",
          defense: "Maintains a compact zonal shape that transitions into a high press when opponents enter wide areas.",
          transition: "Features rapid ball progression through Bruno Fernandes, who targets vertical runs behind opposition defenses.",
          setpieces: "Highly effective box targeting. Rúben Dias and Cristiano Ronaldo provide elite physical targets on inswinging corners.",
          weakness: "Can leave spaces behind fullbacks if caught in high possession turnovers."
        },
        players: [
          { name: "Bruno Fern.", role: "Attacking Mid (Creator)", score: 94, impact: "Provides high-value vertical passes, key chances, and shoots effectively from distance." },
          { name: "Bernardo Silva", role: "Right Winger (Tempo Control)", score: 93, impact: "Unlocks space on the right, retains possession under heavy pressure, and controls tempo." },
          { name: "Cristiano Ronaldo", role: "Center Forward (Finisher)", score: 90, impact: "Commands CB focus, delivers elite physical box presence, and finishes transitions cleanly." }
        ],
        form: ["W", "W", "D", "W", "W"],
        goalsScored: 12,
        goalsConceded: 3,
        cleanSheets: 3,
        momentum: [82, 85, 84, 87, 88],
        similar: [
          { name: "Spain", code: "ESP", archetype: "Possession Dominator", sim: 84 },
          { name: "Argentina", code: "ARG", archetype: "Fluid Possession Block", sim: 83 },
          { name: "Belgium", code: "BEL", archetype: "Technical Possession", sim: 80 }
        ]
      },
      'GER': {
        name: "Germany",
        fifaRank: 11,
        powerRank: 7,
        group: "Group E",
        winProb: "8.5%",
        qualProb: "95%",
        rating: 91.0,
        isDarkHorse: false,
        heroImage: heroImages.GER,
        archetype: "Vertical Overloads",
        archetypeDesc: "Presses high up the pitch and floods central zones to overload defenses via vertical passing channels.",
        tags: ["Gegenpress", "High Line", "Channel Overloads"],
        overview: "Germany dominates via high-intensity counter-pressing and fluid vertical build-up. Under tactical orchestration, their advanced playmakers squeeze opponents, recycling possession inside the final third.",
        formation: "4-2-3-1",
        startingXI: [
          { name: "M. ter Stegen", role: "Goalkeeper (GK)", x: 50, y: 88 },
          { name: "Jonathan Tah", role: "Center Back (CB)", x: 35, y: 73 },
          { name: "A. Rüdiger", role: "Center Back (CB)", x: 65, y: 73, isCaptain: true },
          { name: "Joshua Kimmich", role: "Right Back (RB)", x: 15, y: 70 },
          { name: "M. Mittelstädt", role: "Left Back (LB)", x: 85, y: 70 },
          { name: "Robert Andrich", role: "Defensive Mid (DM)", x: 35, y: 58 },
          { name: "Toni Kroos", role: "Defensive Mid (DM)", x: 65, y: 58 },
          { name: "Florian Wirtz", role: "Right Winger (RW)", x: 20, y: 40 },
          { name: "Jamal Musiala", role: "Attacking Mid (AM)", x: 50, y: 42 },
          { name: "İ. Gündoğan", role: "Left Winger (LW)", x: 80, y: 40 },
          { name: "Kai Havertz", role: "Center Forward (ST)", x: 50, y: 20 }
        ],
        metrics: { attack: 92, control: 93, solidity: 89, resistance: 90, transitions: 91, depth: 93 },
        tactics: {
          buildup: "Initiates play through deep defensive lines where Toni Kroos drops left of the center-backs to direct the passing rhythm and break opposition lines.",
          attack: "Focuses on overloaded half-spaces. Musiala and Wirtz drift inside, combining with Gündogan to create short passing networks that feed Havertz's runs.",
          defense: "Utilizes aggressive Gegenpressing triggers. The team compresses space instantly upon losing possession, suffocating midfield exit paths.",
          transition: "Initiates immediate counter-attacks through vertical passes. Fast winger channels are leveraged to catch the opposing defense out of shape.",
          setpieces: "Presents high physical threats in Rüdiger and Tah, targeted by Kroos's high-precision outswinging deliveries.",
          weakness: "Vulnerable to rapid, direct counters over their high line if the initial pressing wave is bypassed."
        },
        players: [
          { name: "Jamal Musiala", role: "Attacking Mid (Space)", score: 94, impact: "Operates with elite agility in the half-spaces, bypassing defensive lines with close control and key vertical feeds." },
          { name: "Florian Wirtz", role: "Playmaker (Creative Hub)", score: 93, impact: "Orchestrates attacks from deep and wide areas, delivering key play assists and final third creativity." },
          { name: "Toni Kroos", role: "Midfielder (Tempo Maestro)", score: 92, impact: "Manages possession tempo, executes high-value long range switches, and delivers precision set-pieces." }
        ],
        form: ["W", "W", "D", "W", "W"],
        goalsScored: 11,
        goalsConceded: 2,
        cleanSheets: 3,
        momentum: [82, 85, 87, 90, 91],
        similar: [
          { name: "Spain", code: "ESP", archetype: "Possession Dominator", sim: 86 },
          { name: "Argentina", code: "ARG", archetype: "Fluid Possession Block", sim: 84 },
          { name: "England", code: "ENG", archetype: "Balanced Possession", sim: 82 }
        ]
      },
      'ENG': {
        name: "England",
        fifaRank: 4,
        powerRank: 4,
        group: "Group L",
        winProb: "12.4%",
        qualProb: "93%",
        rating: 89.8,
        isDarkHorse: false,
        heroImage: heroImages.ENG,
        archetype: "Balanced Possession",
        archetypeDesc: "Retains shape under mid-press, exploiting channels with technical half-space actions.",
        tags: ["Balanced Midfield Press", "Technical Half-Spaces", "High Box Delivery"],
        overview: "England blends structured control with dynamic wing-play. Led by Declan Rice in a deep double-pivot, they maintain rest defense lines while unleashing creative channels for dynamic inside wing runs.",
        formation: "4-2-3-1",
        startingXI: [
          { name: "Jordan Pickford", role: "Goalkeeper (GK)", x: 50, y: 88 },
          { name: "John Stones", role: "Center Back (CB)", x: 35, y: 73 },
          { name: "Marc Guéhi", role: "Center Back (CB)", x: 65, y: 73 },
          { name: "Kyle Walker", role: "Right Back (RB)", x: 15, y: 70 },
          { name: "Kieran Trippier", role: "Left Back (LB)", x: 85, y: 70 },
          { name: "Declan Rice", role: "Defensive Mid (DM)", x: 35, y: 58 },
          { name: "Kobbie Mainoo", role: "Defensive Mid (DM)", x: 65, y: 58 },
          { name: "Bukayo Saka", role: "Right Winger (RW)", x: 20, y: 40 },
          { name: "Jude Bellingham", role: "Attacking Mid (AM)", x: 50, y: 42 },
          { name: "Phil Foden", role: "Left Winger (LW)", x: 80, y: 40 },
          { name: "Harry Kane", role: "Center Forward (ST)", x: 50, y: 20, isCaptain: true }
        ],
        metrics: { attack: 89, control: 90, solidity: 88, resistance: 91, transitions: 85, depth: 94 },
        tactics: {
          buildup: "Progresses through John Stones stepping into midfield, creating a transient 3-3-4 shape that overloads the opponent's first press line.",
          attack: "Exploits wide overloads where Saka isolates defenders, while Bellingham makes late vertical runs into the box to convert crosses.",
          defense: "Employs a disciplined mid-block press, prioritizing central compactness and forcing opponents to wide lateral zones.",
          transition: "Controlled and secure transition phase, preferring to maintain possession unless Kane holds the ball up to release wing runners.",
          setpieces: "Presents elite aerial threats with Stones and Kane, utilizing Kieran Trippier's highly accurate inswinging corner setups.",
          weakness: "Can appear slow to break down low-blocks when horizontal passing becomes repetitive in central zones."
        },
        players: [
          { name: "Harry Kane", role: "Striker (Target Link)", score: 95, impact: "Drops deep as a false nine to link play, while maintaining elite box finishing and target presence." },
          { name: "Jude Bellingham", role: "Attacking Mid (Box Threat)", score: 94, impact: "Provides massive box-to-box energy, carrying the ball vertically and scoring vital goals from advanced midfield positions." },
          { name: "Bukayo Saka", role: "Winger (Flank Threat)", score: 91, impact: "Generates high 1v1 threat on the right flank, creating chances via cutbacks and direct runs inside the box." }
        ],
        form: ["W", "D", "W", "W", "D"],
        goalsScored: 10,
        goalsConceded: 3,
        cleanSheets: 3,
        momentum: [80, 83, 85, 88, 89],
        similar: [
          { name: "France", code: "FRA", archetype: "Transition Predator", sim: 86 },
          { name: "Brazil", code: "BRA", archetype: "Lateral Wing Overload", sim: 84 },
          { name: "Spain", code: "ESP", archetype: "Possession Dominator", sim: 82 }
        ]
      },
      'NED': {
        name: "Netherlands",
        fifaRank: 7,
        powerRank: 6,
        group: "Group F",
        winProb: "7.8%",
        qualProb: "92%",
        rating: 87.0,
        isDarkHorse: false,
        heroImage: heroImages.NED,
        archetype: "Total Football",
        archetypeDesc: "Rotates defenders and midfielders seamlessly to overload zones and break press lines.",
        tags: ["Positional Rotations", "Elite Distribution", "Fluid Wingbacks"],
        overview: "The Netherlands employs a fluid positional system that stretches opponent blocks. Relying on Virgil van Dijk to launch play from deep, they cycle positions rapidly to create high-probability central shooting lanes.",
        formation: "4-3-3",
        startingXI: [
          { name: "Bart Verbruggen", role: "Goalkeeper (GK)", x: 50, y: 88 },
          { name: "Stefan de Vrij", role: "Center Back (CB)", x: 35, y: 73 },
          { name: "Virgil van Dijk", role: "Center Back (CB)", x: 65, y: 73, isCaptain: true },
          { name: "Denzel Dumfries", role: "Right Back (RB)", x: 15, y: 70 },
          { name: "Nathan Aké", role: "Left Back (LB)", x: 85, y: 70 },
          { name: "Jerdy Schouten", role: "Defensive Mid (DM)", x: 50, y: 58 },
          { name: "T. Reijnders", role: "Central Mid (CM)", x: 32, y: 44 },
          { name: "Joey Veerman", role: "Central Mid (CM)", x: 68, y: 44 },
          { name: "Xavi Simons", role: "Right Winger (RW)", x: 20, y: 22 },
          { name: "Cody Gakpo", role: "Left Winger (LW)", x: 80, y: 22 },
          { name: "Memphis Depay", role: "Striker / CF", x: 50, y: 16 }
        ],
        metrics: { attack: 86, control: 88, solidity: 87, resistance: 89, transitions: 88, depth: 87 },
        tactics: {
          buildup: "Builds up from the back with Virgil van Dijk utilizing long diagnostic diagonals to find Gakpo or the overlapping Dumfries.",
          attack: "Attacks are characterized by Denzel Dumfries pushing extremely high as a wing-back, creating a temporary 3-2-5 structure.",
          defense: "Utilizes an aggressive vertical defensive line, catching opponents offside and compressing space in the middle third.",
          transition: "Leverages Reijnders' ball-carrying ability to quickly drive transitions through the center of the pitch.",
          setpieces: "Elite aerial delivery from Memphis Depay targeting Van Dijk, Aké, and de Vrij at the back post.",
          weakness: "High defensive line can leave space behind the fullbacks for fast, wide counters."
        },
        players: [
          { name: "Virgil van Dijk", role: "Center Back (Defensive Hub)", score: 94, impact: "Commands the defensive block, dominates aerial duels, and initiates build-up with elite long-range passing." },
          { name: "Cody Gakpo", role: "Left Winger (Speed Threat)", score: 91, impact: "Provides direct running threat on the left wing, cutting inside to shoot or cross with high precision." },
          { name: "Xavi Simons", role: "Right Winger (Space Creator)", score: 89, impact: "Operates in tight spaces between lines, combining pace with technical creation to unlock defense structures." }
        ],
        form: ["W", "D", "W", "L", "W"],
        goalsScored: 9,
        goalsConceded: 4,
        cleanSheets: 2,
        momentum: [79, 81, 84, 86, 87],
        similar: [
          { name: "Spain", code: "ESP", archetype: "Possession Dominator", sim: 84 },
          { name: "Germany", code: "GER", archetype: "Vertical Overloads", sim: 83 },
          { name: "Belgium", code: "BEL", archetype: "Technical Possession", sim: 80 }
        ]
      },
      'BEL': {
        name: "Belgium",
        fifaRank: 3,
        powerRank: 8,
        group: "Group G",
        winProb: "8.2%",
        qualProb: "89%",
        rating: 86.0,
        isDarkHorse: false,
        heroImage: heroImages.BEL,
        archetype: "Technical Possession",
        archetypeDesc: "Uses technical rotations and inverted wingers to overload central zones and half-spaces.",
        tags: ["Creative Midfield", "Direct Wing Penetration", "Press Escape"],
        overview: "Belgium transitions through an elite midfield axis led by Kevin De Bruyne. They utilize high technical retention in central blocks to release explosive wingers into space before creating clinical box actions.",
        formation: "4-2-3-1",
        startingXI: [
          { name: "Koen Casteels", role: "Goalkeeper (GK)", x: 50, y: 88 },
          { name: "Wout Faes", role: "Center Back (CB)", x: 35, y: 73 },
          { name: "Jan Vertonghen", role: "Center Back (CB)", x: 65, y: 73 },
          { name: "Timothy Castagne", role: "Right Back (RB)", x: 15, y: 70 },
          { name: "Arthur Theate", role: "Left Back (LB)", x: 85, y: 70 },
          { name: "Amadou Onana", role: "Defensive Mid (DM)", x: 35, y: 58 },
          { name: "Orel Mangala", role: "Defensive Mid (DM)", x: 65, y: 58 },
          { name: "Jérémy Doku", role: "Right Winger (RW)", x: 20, y: 40 },
          { name: "K. De Bruyne", role: "Attacking Mid (AM)", x: 50, y: 42, isCaptain: true },
          { name: "Leandro Trossard", role: "Left Winger (LW)", x: 80, y: 40 },
          { name: "Romelu Lukaku", role: "Center Forward (ST)", x: 50, y: 20 }
        ],
        metrics: { attack: 87, control: 86, solidity: 84, resistance: 88, transitions: 89, depth: 85 },
        tactics: {
          buildup: "Builds with double pivot Onana and Mangala dropping deep to attract pressure, opening direct vertical passing lanes to De Bruyne.",
          attack: "Exploits Jérémy Doku's 1v1 capability to overload the wings, generating low crosses for Lukaku's physical box conversions.",
          defense: "Utilizes a compact mid-block system, triggering intense press actions when the ball goes wide into lateral zones.",
          transition: "Elite counter-attack transitions led by De Bruyne's high-speed passing and Doku's blistering pace on the flanks.",
          setpieces: "Elite aerial delivery from Memphis Depay targeting Van Dijk, Aké, and de Vrij at the back post.",
          weakness: "Defensive transition is susceptible to pace if the double pivot fails to drop quickly enough."
        },
        players: [
          { name: "Kevin De Bruyne", role: "Attacking Mid (Creator)", score: 97, impact: "Provides unmatched final-third delivery, creative vision, and shooting threat from deep areas." },
          { name: "Romelu Lukaku", role: "Striker (Target Target)", score: 89, impact: "Acts as a physical target, holding off defenders to link play and converting chances inside the penalty area." },
          { name: "Jérémy Doku", role: "Winger (Speed Dribbler)", score: 88, impact: "Stretches opposition lines with elite dribbling speed and 1v1 flank manipulation." }
        ],
        form: ["W", "W", "D", "L", "W"],
        goalsScored: 8,
        goalsConceded: 4,
        cleanSheets: 2,
        momentum: [80, 83, 84, 82, 86],
        similar: [
          { name: "Portugal", code: "POR", archetype: "Technical Possession", sim: 83 },
          { name: "Spain", code: "ESP", archetype: "Possession Dominator", sim: 81 },
          { name: "Netherlands", code: "NED", archetype: "Total Football", sim: 80 }
        ]
      },
      'MEX': {
        name: "Mexico",
        fifaRank: 15,
        powerRank: 12,
        group: "Group A",
        winProb: "4.5%",
        qualProb: "88%",
        rating: 82.0,
        isDarkHorse: true,
        heroImage: heroImages.MEX,
        archetype: "High Block Press",
        archetypeDesc: "Presses high up the pitch and floods central zones to force defensive turnovers close to the opponent's goal.",
        tags: ["Intense Pressure", "High Recovery Press", "Wing Counters"],
        overview: "Mexico utilizes high-energy defensive triggers to disrupt construction. Supported by Edson Álvarez in defensive midfield, they choke transition spaces and launch swift vertical counters via wide routes.",
        formation: "4-3-3",
        startingXI: [
          { name: "Luis Malagón", role: "Goalkeeper (GK)", x: 50, y: 88 },
          { name: "Johan Vásquez", role: "Center Back (CB)", x: 35, y: 73 },
          { name: "César Montes", role: "Center Back (CB)", x: 65, y: 73 },
          { name: "Jorge Sánchez", role: "Right Back (RB)", x: 15, y: 70 },
          { name: "Gerardo Arteaga", role: "Left Back (LB)", x: 85, y: 70 },
          { name: "Edson Álvarez", role: "Defensive Mid (DM)", x: 50, y: 58, isCaptain: true },
          { name: "Luis Chávez", role: "Central Mid (CM)", x: 32, y: 44 },
          { name: "Erick Sánchez", role: "Central Mid (CM)", x: 68, y: 44 },
          { name: "Uriel Antuna", role: "Right Winger (RW)", x: 20, y: 22 },
          { name: "Hirving Lozano", role: "Left Winger (LW)", x: 80, y: 22 },
          { name: "S. Giménez", role: "Striker / CF", x: 50, y: 16 }
        ],
        metrics: { attack: 81, control: 82, solidity: 83, resistance: 80, transitions: 84, depth: 79 },
        tactics: {
          buildup: "Builds using Edson Álvarez dropping between the center-backs, creating a temporary three-man backline to escape pressure.",
          attack: "Relies on overlapping fullbacks and direct wide play. Wingers Lozano and Antuna look to isolate fullbacks and cross for Giménez.",
          defense: "Utilizes a highly aggressive high-press. Opponents are pressed in their own third, with direct triggers when the ball is played to fullbacks.",
          transition: "Direct counter transitions on turnovers, seeking to release Hirving Lozano behind high defensive blocks immediately.",
          setpieces: "Dangerous targets in César Montes and Johan Vásquez, served by Luis Chávez's curling inswinging deliveries.",
          weakness: "Can exhaust energy in later stages of matches due to high-intensity pressing requirements."
        },
        players: [
          { name: "Santiago Giménez", role: "Striker (Goal Finisher)", score: 84, impact: "Provides clinical box finishing, clever runs in behind, and high-energy defensive pressure on opposition CBs." },
          { name: "Edson Álvarez", role: "Defensive Mid (Center Anchor)", score: 85, impact: "Protects the backline, interrupts opposition counters, and coordinates build-up under pressure." },
          { name: "Hirving Lozano", role: "Winger (Speed Threat)", score: 83, impact: "Generates high pace on the left flank, creating shooting opportunities and cutting in behind." }
        ],
        form: ["W", "D", "W", "W", "L"],
        goalsScored: 7,
        goalsConceded: 5,
        cleanSheets: 2,
        momentum: [75, 78, 80, 83, 82],
        similar: [
          { name: "USA", code: "USA", archetype: "High Intensity Press", sim: 85 },
          { name: "Colombia", code: "COL", archetype: "Fast Transitions", sim: 82 },
          { name: "Morocco", code: "MAR", archetype: "Compact Low Block", sim: 78 }
        ]
      },
      'CAN': {
        name: "Canada",
        fifaRank: 40,
        powerRank: null,
        group: "Group B",
        winProb: "2.8%",
        qualProb: "72%",
        rating: 77.0,
        isDarkHorse: true,
        heroImage: heroImages.CAN,
        archetype: "Direct Wing Play",
        archetypeDesc: "Exploits wide areas with explosive fullback runs and direct crosses into the box.",
        tags: ["Athletic Wingbacks", "Direct Crosses", "High Energy Press"],
        overview: "Canada leverages Alphonso Davies' explosive speed from left-back and Jonathan David's clinical finishing to create a dangerous counter-attacking threat. Their high-energy approach disrupts build-up play from more technical sides.",
        formation: "4-3-3",
        startingXI: [
          { name: "Maxime Crépeau", role: "Goalkeeper (GK)", x: 50, y: 88 },
          { name: "Alistair Johnston", role: "Center Back (CB)", x: 35, y: 73 },
          { name: "Moise Bombito", role: "Center Back (CB)", x: 65, y: 73 },
          { name: "Richie Laryea", role: "Right Back (RB)", x: 15, y: 70 },
          { name: "Alphonso Davies", role: "Left Back (LB)", x: 85, y: 70 },
          { name: "S. Eustáquio", role: "Defensive Mid (DM)", x: 50, y: 58, isCaptain: true },
          { name: "Ismael Koné", role: "Central Mid (CM)", x: 32, y: 44 },
          { name: "Tajon Buchanan", role: "Central Mid (CM)", x: 68, y: 44 },
          { name: "Liam Millar", role: "Right Winger (RW)", x: 20, y: 22 },
          { name: "Cyle Larin", role: "Left Winger (LW)", x: 80, y: 22 },
          { name: "Jonathan David", role: "Striker / CF", x: 50, y: 16 }
        ],
        metrics: { attack: 79, control: 75, solidity: 77, resistance: 74, transitions: 83, depth: 76 },
        tactics: {
          buildup: "Builds directly through long balls from center-backs targeting the channels for Davies and David to run onto.",
          attack: "Alphonso Davies sprints the wing to deliver crosses. David holds up or makes runs behind.",
          defense: "Aggressive mid-block pressing. The team commits heavy energy to winning the ball back in the middle third.",
          transition: "Explosive transition speeds utilizing Davies' blistering pace on the left side to stretch defenses immediately.",
          setpieces: "Targets Bombito and Johnston at the back post with Eustáquio delivering inswingers.",
          weakness: "Can lack composure under sustained possession pressure from technically superior sides."
        },
        players: [
          { name: "Alphonso Davies", role: "Left Back (Speed Engine)", score: 88, impact: "Provides explosive pace on the left flank, transitioning from defense to attack in seconds." },
          { name: "Jonathan David", role: "Striker (Clinical Finisher)", score: 86, impact: "Delivers elite conversion rates and intelligent movement in behind defensive lines." },
          { name: "S. Eustáquio", role: "Defensive Mid (Shield)", score: 83, impact: "Anchors the midfield with disciplined positioning and ball-winning intensity." }
        ],
        form: ["L", "W", "W", "D", "L"],
        goalsScored: 7,
        goalsConceded: 6,
        cleanSheets: 1,
        momentum: [70, 74, 77, 76, 75],
        similar: [
          { name: "USA", code: "USA", archetype: "High Intensity Press", sim: 86 },
          { name: "Mexico", code: "MEX", archetype: "High Block Press", sim: 82 },
          { name: "Australia", code: "AUS", archetype: "Physical Low Block", sim: 78 }
        ]
      },
      'USA': {
        name: "USA",
        fifaRank: 14,
        powerRank: 10,
        group: "Group D",
        winProb: "5.2%",
        qualProb: "90%",
        rating: 83.0,
        isDarkHorse: false,
        heroImage: heroImages.USA,
        archetype: "High Intensity Press",
        archetypeDesc: "Deploys relentless energy-driven pressing across all thirds to win turnovers and launch direct attacks.",
        tags: ["Relentless Press", "Athletic Midfield", "Wing Counters"],
        overview: "The USA combines youthful energy with tactical discipline. Led by Christian Pulisic's creativity and Tyler Adams' midfield control, they press opponents aggressively and exploit turnovers with rapid vertical transitions.",
        formation: "4-3-3",
        startingXI: [
          { name: "Matt Turner", role: "Goalkeeper (GK)", x: 50, y: 88 },
          { name: "Chris Richards", role: "Center Back (CB)", x: 35, y: 73 },
          { name: "Tim Ream", role: "Center Back (CB)", x: 65, y: 73 },
          { name: "Sergiño Dest", role: "Right Back (RB)", x: 15, y: 70 },
          { name: "Antonee Robinson", role: "Left Back (LB)", x: 85, y: 70 },
          { name: "Tyler Adams", role: "Defensive Mid (DM)", x: 50, y: 58, isCaptain: true },
          { name: "Weston McKennie", role: "Central Mid (CM)", x: 32, y: 44 },
          { name: "Gio Reyna", role: "Central Mid (CM)", x: 68, y: 44 },
          { name: "Tim Weah", role: "Right Winger (RW)", x: 20, y: 22 },
          { name: "C. Pulisic", role: "Left Winger (LW)", x: 80, y: 22 },
          { name: "Folarin Balogun", role: "Striker / CF", x: 50, y: 16 }
        ],
        metrics: { attack: 84, control: 82, solidity: 83, resistance: 81, transitions: 86, depth: 85 },
        tactics: {
          buildup: "Constructs with Adams dropping between center-backs to create numerical superiority and launch diagonal passes to advancing fullbacks.",
          attack: "Pulisic drifts inside from the left to combine with McKennie in the half-spaces. Weah stretches the defense with diagonal runs.",
          defense: "Full-throttle counter-pressing in the opponent's half. The team commits high energy to recover possession within 5 seconds of losing it.",
          transition: "Lightning-fast direct transitions via Pulisic and Weah, who exploit open space left by opponent high lines.",
          setpieces: "Targets Tim Ream and Richards from McKennie's delivery, focusing on near-post flick-ons.",
          weakness: "Can be exposed when opponents absorb press pressure and hit direct switches into spaces left behind fullbacks."
        },
        players: [
          { name: "Christian Pulisic", role: "Left Winger (Creator)", score: 87, impact: "Spearheads attacking creation with dangerous dribbles, runs behind, and sharp link play." },
          { name: "Tyler Adams", role: "Defensive Mid (Tactical Shield)", score: 85, impact: "Disrupts opponent build-ups with relentless work rate, defensive positioning, and ball recoveries." },
          { name: "Weston McKennie", role: "Central Mid (Box-to-box Engine)", score: 84, impact: "Provides late runs into the box, aerial target, and high physical work rates in midfield." }
        ],
        form: ["W", "W", "W", "L", "W"],
        goalsScored: 8,
        goalsConceded: 3,
        cleanSheets: 2,
        momentum: [78, 81, 83, 80, 83],
        similar: [
          { name: "Canada", code: "CAN", archetype: "Direct Wing Play", sim: 86 },
          { name: "Mexico", code: "MEX", archetype: "High Block Press", sim: 84 },
          { name: "England", code: "ENG", archetype: "Balanced Possession", sim: 80 }
        ]
      }
    };
  }, []);

  // 3. Dynamic Procedural Data Generator for Fallback Teams
  const generateProceduralTeamData = (code) => {
    const seed = hashCode(code);

    let name = "Nation " + code;
    const mockNames = {
      'MEX': "Mexico", 'KOR': "Korea Republic", 'RSA': "South Africa", 'CZE': "Czechia",
      'CAN': "Canada", 'BIH': "Bosnia & Herz.", 'QAT': "Qatar", 'SUI': "Switzerland",
      'MAR': "Morocco", 'SCO': "Scotland", 'HAI': "Haiti", 'USA': "USA",
      'AUS': "Australia", 'TUR': "Türkiye", 'PAR': "Paraguay", 'GER': "Germany",
      'ECU': "Ecuador", 'CIV': "Cote d'Ivoire", 'CUR': "Curaçao", 'NED': "Netherlands",
      'JPN': "Japan", 'SWE': "Sweden", 'TUN': "Tunisia", 'BEL': "Belgium",
      'EGY': "Egypt", 'IRN': "IR Iran", 'NZL': "New Zealand", 'URU': "Uruguay",
      'KSA': "Saudi Arabia", 'CPV': "Cabo Verde", 'SEN': "Senegal", 'NOR': "Norway",
      'IRQ': "Iraq", 'ALG': "Algeria", 'AUT': "Austria", 'JOR': "Jordan",
      'COL': "Colombia", 'UZB': "Uzbekistan", 'COD': "Congo DR", 'ENG': "England",
      'CRO': "Croatia", 'GHA': "Ghana", 'PAN': "Panama"
    };

    // Attempt to match team name from matchesData if available, otherwise mock
    const matchVal = matchesData.find(m => m.team1.code === code || m.team2.code === code);
    if (matchVal) {
      name = (matchVal.team1.code === code) ? matchVal.team1.name : matchVal.team2.name;
    } else if (mockNames[code]) {
      name = mockNames[code];
    }

    const group = findTeamGroup(code);
    
    // Choose tactical archetype deterministically
    const archetypes = [
      { name: "Possession Dominator", tags: ["Tiki-Taka", "Low Risk", "Zonal Suffocation"], desc: "Uses short passing sequences to starve the opponent of possession." },
      { name: "Transition Predator", tags: ["Vertical Speed", "Compact Block", "Direct Play"], desc: "Deploys a solid defensive block and exploits space with rapid vertical counters." },
      { name: "Vertical Press Machine", tags: ["Gegenpress", "High Line", "Channel Overloads"], desc: "Presses high up the pitch to force turnovers close to the opposition goal." },
      { name: "Compact Counter System", tags: ["Low Block", "Physical Duels", "Wing Transitions"], desc: "Defends deep in a low block, utilizing wing channels for quick breakaways." },
      { name: "Chaos Press Engine", tags: ["Heavy Press", "High Intensity", "Fluid Rotations"], desc: "Creates transition triggers by swarming midfield passing lanes aggressively." }
    ];
    const archIdx = seed % archetypes.length;
    const arch = archetypes[archIdx];

    // Ratings & probabilities
    const fifaRank = (seed % 35) + 8; // 8 to 42
    const rating = 70 + (seed % 18); // 70 to 88
    const isDarkHorse = (seed % 7 === 0);
    
    const winProb = (1.5 + (seed % 70) / 10).toFixed(1) + "%"; // 1.5% to 8.5%
    const qualProb = (35 + (seed % 50)) + "%"; // 35% to 85%

    // Formations
    const formations = ["4-3-3", "4-2-3-1", "3-5-2", "4-4-2"];
    const formName = formations[seed % formations.length];
    
    let startingXI = [];
    if (formName === "4-3-3") {
      startingXI = [
        { name: "GK Position", role: "Goalkeeper (GK)", x: 50, y: 88 },
        { name: "RCB Node", role: "Center Back (RCB)", x: 35, y: 73 },
        { name: "LCB Node", role: "Center Back (LCB)", x: 65, y: 73 },
        { name: "RB Node", role: "Right Back (RB)", x: 15, y: 70 },
        { name: "LB Node", role: "Left Back (LB)", x: 85, y: 70 },
        { name: "DM Pivot", role: "Defensive Mid (DM)", x: 50, y: 58, isCaptain: true },
        { name: "RCM Out", role: "Central Mid (RCM)", x: 32, y: 44 },
        { name: "LCM Out", role: "Central Mid (LCM)", x: 68, y: 44 },
        { name: "RW Wing", role: "Right Winger (RW)", x: 20, y: 22 },
        { name: "LW Wing", role: "Left Winger (LW)", x: 80, y: 22 },
        { name: "CF Target", role: "Striker / CF", x: 50, y: 16 }
      ];
    } else if (formName === "4-2-3-1") {
      startingXI = [
        { name: "GK Position", role: "Goalkeeper (GK)", x: 50, y: 88 },
        { name: "RCB Node", role: "Center Back (RCB)", x: 35, y: 73 },
        { name: "LCB Node", role: "Center Back (LCB)", x: 65, y: 73 },
        { name: "RB Node", role: "Right Back (RB)", x: 15, y: 70 },
        { name: "LB Node", role: "Left Back (LB)", x: 85, y: 70 },
        { name: "RDM Pivot", role: "Defensive Mid (RDM)", x: 35, y: 58 },
        { name: "LDM Pivot", role: "Defensive Mid (LDM)", x: 65, y: 58, isCaptain: true },
        { name: "RAM Option", role: "Right Winger (RAM)", x: 20, y: 40 },
        { name: "CAM Hub", role: "Attacking Mid (CAM)", x: 50, y: 42 },
        { name: "LAM Option", role: "Left Winger (LAM)", x: 80, y: 40 },
        { name: "CF Target", role: "Striker", x: 50, y: 20 }
      ];
    } else if (formName === "3-5-2") {
      startingXI = [
        { name: "GK Position", role: "Goalkeeper (GK)", x: 50, y: 88 },
        { name: "CB Central", role: "Center Back (CB)", x: 50, y: 75, isCaptain: true },
        { name: "RCB Node", role: "Center Back (RCB)", x: 25, y: 73 },
        { name: "LCB Node", role: "Center Back (LCB)", x: 75, y: 73 },
        { name: "RWB High", role: "Right Wingback (RWB)", x: 12, y: 50 },
        { name: "LWB High", role: "Left Wingback (LWB)", x: 88, y: 50 },
        { name: "DM Pivot", role: "Defensive Mid (DM)", x: 50, y: 60 },
        { name: "RCM Run", role: "Central Mid (RCM)", x: 35, y: 44 },
        { name: "LCM Run", role: "Central Mid (LCM)", x: 65, y: 44 },
        { name: "RCF Forward", role: "Striker (RCF)", x: 35, y: 20 },
        { name: "LCF Forward", role: "Striker (LCF)", x: 65, y: 20 }
      ];
    } else { // 4-4-2 default
      startingXI = [
        { name: "GK Position", role: "Goalkeeper (GK)", x: 50, y: 88 },
        { name: "RCB Node", role: "Center Back (RCB)", x: 35, y: 73 },
        { name: "LCB Node", role: "Center Back (LCB)", x: 65, y: 73 },
        { name: "RB Node", role: "Right Back (RB)", x: 15, y: 70 },
        { name: "LB Node", role: "Left Back (LB)", x: 85, y: 70 },
        { name: "RCM Link", role: "Central Mid (RCM)", x: 35, y: 52 },
        { name: "LCM Link", role: "Central Mid (LCM)", x: 65, y: 52, isCaptain: true },
        { name: "RM Wing", role: "Right Mid (RM)", x: 18, y: 38 },
        { name: "LM Wing", role: "Left Mid (LM)", x: 82, y: 38 },
        { name: "RS Striker", role: "Striker (RS)", x: 35, y: 18 },
        { name: "LS Striker", role: "Striker (LS)", x: 65, y: 18 }
      ];
    }

    const players = [
      { name: "Key Player A", role: "Tactical Hub", score: 86 + (seed % 10), impact: "Acts as the central link during build-up and controls transition tempos." },
      { name: "Key Player B", role: "Transition Threat", score: 85 + (seed % 9), impact: "Exploits space in behind high defensive blocks with vertical pace." },
      { name: "Key Player C", role: "Defensive Anchor", score: 84 + (seed % 8), impact: "Intercepts opposition vertical passing lines and wins physical duels." }
    ];

    const stats = {
      attack: 72 + (seed % 18),
      control: 70 + (seed % 20),
      solidity: 73 + (seed % 17),
      resistance: 74 + (seed % 16),
      transitions: 75 + (seed % 18),
      depth: 68 + (seed % 22)
    };

    const forms = [["W", "D", "W", "L", "W"], ["D", "W", "L", "W", "D"], ["W", "L", "W", "D", "L"], ["W", "W", "D", "W", "L"]];
    const form = forms[seed % forms.length];
    const goalsScored = 5 + (seed % 6);
    const goalsConceded = 3 + (seed % 6);
    const cleanSheets = 1 + (seed % 3);

    const momentum = [65 + (seed % 15), 70 + (seed % 10), 68 + (seed % 12), 75 + (seed % 15), 72 + (seed % 16)];

    const sim1Code = (seed % 2 === 0) ? "ESP" : "BRA";
    const sim2Code = (seed % 3 === 0) ? "FRA" : "POR";
    const sim3Code = (seed % 5 === 0) ? "ARG" : "NED";

    return {
      name,
      fifaRank,
      powerRank: seed % 8 === 0 ? (seed % 5) + 1 : null,
      group,
      winProb,
      qualProb,
      rating,
      isDarkHorse,
      heroImage: null,
      archetype: arch.name,
      archetypeDesc: arch.desc,
      tags: arch.tags,
      overview: `${name} is currently utilizing a ${arch.name.toLowerCase()} tactical setup. They focus on maintaining structural compactness and forcing opponent turnovers in key midfield channels.`,
      formation: formName,
      startingXI,
      metrics: stats,
      tactics: {
        buildup: `Progresses play conservatively from deep blocks. The center-backs split wide to open clean passing lanes into central pivot nodes.`,
        attack: `Focuses on unlocking defense systems using ${arch.name.includes("Possession") ? "short positional sequences" : "direct transitions"} via flank channels.`,
        defense: `Maintains disciplined structural organization, utilizing ${arch.name.includes("Press") ? "an intense counter-press" : "a compact mid-block shape"}.`,
        transition: `Transitions quickly upon winning possession. Direct vertical routes are favored to exploit space before the defensive shape recovers.`,
        setpieces: `Focuses on targeted deliveries to tall physical players, crowding defensive areas to force structural errors.`,
        weakness: `Can be vulnerable to counter-attacks behind fullbacks if caught high in transitions.`
      },
      players,
      form,
      goalsScored,
      goalsConceded,
      cleanSheets,
      momentum,
      similar: [
        { name: sim1Code === "ESP" ? "Spain" : "Brazil", code: sim1Code, archetype: sim1Code === "ESP" ? "Possession Dominator" : "Lateral Wing Overload", sim: 80 + (seed % 15) },
        { name: sim2Code === "FRA" ? "France" : "Portugal", code: sim2Code, archetype: sim2Code === "FRA" ? "Transition Predator" : "Technical Possession", sim: 78 + (seed % 14) },
        { name: sim3Code === "ARG" ? "Argentina" : "Netherlands", code: sim3Code, archetype: sim3Code === "ARG" ? "Fluid Possession Block" : "Fluid Possession Block", sim: 75 + (seed % 18) }
      ]
    };
  };

  // Resolve teamData via State and Effect
  const [teamData, setTeamData] = useState(null);

  useEffect(() => {
    getTeamByCode(teamCode)
      .then((data) => {
        setTeamData(data);
      })
      .catch((err) => {
        console.warn("Error fetching team from API. Falling back to local data.", err);
        const fallbackTeam = teamsDatabase[teamCode] || generateProceduralTeamData(teamCode);
        setTeamData(fallbackTeam);
      });
  }, [teamCode, teamsDatabase]);

  // Handle transitions and top-scrolling
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (teamData) {
      document.title = `WCai - ${teamData.name} AI Intelligence Dossier`;
    }
  }, [teamCode, teamData]);

  // Strength metrics comparison bars labels
  const metricsLabels = {
    attack: "Attack Rating",
    control: "Midfield Control",
    solidity: "Defensive Solidity",
    resistance: "Press Resistance",
    transitions: "Transition Speed",
    depth: "Squad Depth"
  };

  // SVG Momentum coordinates mapper
  const momentumPaths = useMemo(() => {
    if (!teamData || !teamData.momentum) return { lineD: '', areaD: '' };
    const data = teamData.momentum;
    const points = data.map((val, idx) => {
      const x = idx * 100;
      const y = 90 - ((val - 50) / 50) * 70;
      return { x, y };
    });

    const lineD = points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    const areaD = `${lineD} L 400 100 L 0 100 Z`;
    return { lineD, areaD };
  }, [teamData?.momentum]);

  // Heat node position generator based on archetype
  const heatspots = useMemo(() => {
    if (!teamData || !teamData.archetype) {
      return [
        { left: 50, top: 32, size: 95, op: 0.28 },
        { left: 25, top: 25, size: 70, op: 0.2 },
        { left: 75, top: 25, size: 70, op: 0.2 }
      ];
    }
    if (teamData.archetype.includes("Wing")) {
      return [
        { left: 15, top: 30, size: 85, op: 0.25 },
        { left: 85, top: 35, size: 75, op: 0.2 },
        { left: 50, top: 80, size: 50, op: 0.1 }
      ];
    } else if (teamData.archetype.includes("Possession")) {
      return [
        { left: 50, top: 50, size: 100, op: 0.25 },
        { left: 50, top: 30, size: 75, op: 0.18 },
        { left: 50, top: 75, size: 60, op: 0.15 }
      ];
    } else if (teamData.archetype.includes("Counter")) {
      return [
        { left: 50, top: 78, size: 110, op: 0.3 },
        { left: 20, top: 40, size: 70, op: 0.15 },
        { left: 80, top: 40, size: 70, op: 0.15 }
      ];
    } else {
      return [
        { left: 50, top: 32, size: 95, op: 0.28 },
        { left: 25, top: 25, size: 70, op: 0.2 },
        { left: 75, top: 25, size: 70, op: 0.2 }
      ];
    }
  }, [teamData?.archetype]);

  const pitchTagText = useMemo(() => {
    if (!teamData || !teamData.tactics || !teamData.tactics.attack) return "Central Passing Networks";
    const tactical = teamData.tactics.attack.toLowerCase();
    if (tactical.includes('wing')) return "Overloading Flanks Focus";
    if (tactical.includes('low block') || tactical.includes('counter')) return "Compact Box Containment";
    if (tactical.includes('press')) return "High-Line Opponent Half Recovery";
    return "Central Passing Networks";
  }, [teamData?.tactics?.attack]);

  const handleSimilarNavigate = (sCode) => {
    navigate(`/team-analysis?team=${sCode}`);
  };

  const backdropStyle = useMemo(() => {
    const imageFile = heroImages[teamCode];
    if (imageFile) {
      return {
        backgroundImage: `url(${imageFile})`,
      };
    } else {
      return {
        backgroundImage: `url(${stadiumBg})`,
        opacity: '0.07'
      };
    }
  }, [teamCode]);

  if (!teamData) {
    return (
      <main className="analysis-page-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--bg-primary)', color: '#fff' }}>
        <div style={{ padding: '32px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', background: 'rgba(5,10,48,0.3)', backdropFilter: 'blur(20px)' }}>
          <h3 className="no-matches-title" style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Retrieving Team Dossier</h3>
          <p className="no-matches-text" style={{ fontSize: '0.85rem' }}>Accessing WCai Team Intelligence Database...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="analysis-page-content" style={{ paddingTop: 0 }}>
      
      {/* Cinematic Hero Section */}
      <section className="analysis-hero-section" id="team-hero-container" style={{ position: 'relative', minHeight: '640px', display: 'flex', alignItems: 'center', paddingTop: '130px', paddingBottom: '50px', overflow: 'hidden', borderBottom: '1px solid rgba(0, 240, 255, 0.15)' }}>
        <div className="analysis-hero-cover" id="hero-backdrop-img" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundSize: 'cover', backgroundPosition: 'center 25%', zIndex: 1, pointerEvents: 'none', filter: 'blur(0.5px) brightness(0.6) saturate(1.15)', ...backdropStyle }}></div>
        <div className="analysis-hero-overlay" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(2,4,18,0.3) 40%, rgba(2,4,18,0.7) 100%), linear-gradient(to bottom, rgba(5,10,48,0.1) 0%, rgba(2,4,18,0.85) 100%), radial-gradient(circle at center, transparent, rgba(0,0,0,0.4))', zIndex: 2, pointerEvents: 'none' }}></div>
        
        <div className="section-container" style={{ position: 'relative', zIndex: 3, width: '100%' }}>
          <div className="dossier-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '40px', alignItems: 'center' }}>
            
            {/* Left side Metadata */}
            <div className="hero-left-col">
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <div className="dossier-flag-wrapper" id="hero-flag" style={{ width: '60px', height: '38px', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center' }} dangerouslySetInnerHTML={{ __html: generateFlagSVG(teamCode) }}></div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="dossier-rank-badge" id="hero-group-label" style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--primary-accent)', background: 'rgba(0,209,255,0.08)', border: '1px solid rgba(0,209,255,0.2)', padding: '2px 8px', borderRadius: '4px', letterSpacing: '0.5px' }}>
                      {teamData.group}
                    </span>
                    {teamData.isDarkHorse && (
                      <span className="dossier-dark-horse" id="hero-dh-badge" style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: '#ff3b30', background: 'rgba(255,59,48,0.08)', border: '1px solid rgba(255,59,48,0.2)', padding: '2px 8px', borderRadius: '4px', letterSpacing: '0.5px' }}>
                        DARK HORSE
                      </span>
                    )}
                  </div>
                  <h1 className="dossier-team-name" id="hero-team-name" style={{ fontSize: '2.8rem', fontWeight: 855, color: '#fff', margin: '4px 0 0 0', letterSpacing: '-0.8px', lineHeight: 1.1, textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                    {teamData.name}
                  </h1>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '24px', marginBottom: '24px' }}>
                <div className="hero-meta-stat">
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 800, textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>FIFA RANK</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }} id="hero-fifa-rank">
                    {teamData.fifaRank}
                  </div>
                </div>
                <div className="hero-meta-stat">
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 800, textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>AI POWER RANK</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-accent)', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }} id="hero-ai-rank">
                    {teamData.powerRank ? `#${teamData.powerRank}` : 'N/A'}
                  </div>
                </div>
              </div>

              <div style={{ borderLeft: '2.5px solid var(--primary-accent)', paddingLeft: '16px' }}>
                <h2 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--primary-accent)', textTransform: 'uppercase', margin: '0 0 6px 0', letterSpacing: '0.5px', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>AI Tactical Overview</h2>
                <p className="hero-description" id="hero-tactical-desc" style={{ fontSize: '0.96rem', lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0, maxWidth: '520px', textShadow: '0 1px 6px rgba(0,0,0,0.85)' }}>
                  {teamData.overview}
                </p>
              </div>
            </div>

            {/* Right side probabilities */}
            <div className="hero-right-col" style={{ display: 'flex', justifyContent: 'flex-end', gap: '32px' }}>
              <div className="prob-box-large" style={{ textAlign: 'center', background: 'rgba(5,10,48,0.45)', border: '1px solid rgba(0,209,255,0.2)', padding: '24px', borderRadius: '16px', backdropFilter: 'blur(12px)', minWidth: '140px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px' }}>WIN CUP PROB</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--primary-accent)', lineHeight: 1 }} id="hero-win-prob">
                  {teamData.winProb}
                </div>
              </div>
              <div className="prob-box-large" style={{ textAlign: 'center', background: 'rgba(5,10,48,0.45)', border: '1px solid rgba(0,209,255,0.2)', padding: '24px', borderRadius: '16px', backdropFilter: 'blur(12px)', minWidth: '140px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px' }}>STAGE QUAL PROB</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--secondary-accent)', lineHeight: 1 }} id="hero-qual-prob">
                  {teamData.qualProb}
                </div>
              </div>
            </div>

          </div>

          {/* AI Tactical Archetype Callout Card inside Hero */}
          <div className="archetype-card" style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, rgba(5,10,48,0.35) 0%, rgba(2,4,18,0.55) 100%)', border: '1px solid rgba(0, 209, 255, 0.18)', borderRadius: '16px', padding: '28px 32px', backdropFilter: 'blur(15px)', boxShadow: '0 15px 35px rgba(0,0,0,0.4)', marginTop: '35px' }}>
            <div className="archetype-pulse-glow" style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(0,209,255,0.12) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }}></div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary-accent)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>AI Tactical Classification</div>
            <h2 className="archetype-title" id="dossier-archetype-name" style={{ fontSize: '1.9rem', fontWeight: 850, color: '#fff', margin: '0 0 10px 0', letterSpacing: '-0.5px' }}>
              {teamData.archetype}
            </h2>
            <p className="archetype-desc" id="dossier-archetype-desc" style={{ fontSize: '0.98rem', color: 'var(--text-secondary)', margin: '0 0 18px 0', lineHeight: 1.5 }}>
              {teamData.archetypeDesc}
            </p>
            <div className="archetype-tags" id="dossier-archetype-tags" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {teamData.tags.map((t, idx) => (
                <span key={idx} style={{ fontSize: '0.72rem', fontWeight: 700, color: '#fff', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '4px 10px', borderRadius: '4px', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Main Dossier Content Layout */}
      <div className="section-container" style={{ marginTop: '40px' }}>

        {/* Two Column Layout: Pitch & Tactical Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '72px' }} className="dossier-split-layout">
          
          {/* Left: Starting XI Pitch */}
          <section className="starting-xi-section">
            <div className="analysis-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <h3 className="card-heading" style={{ marginBottom: '8px' }}>
                <svg className="heading-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="12" x2="21" y2="12"></line><circle cx="12" cy="12" r="4"></circle></svg>
                Predicted Starting XI
              </h3>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }} id="dossier-formation-label">
                Formation: {teamData.formation}
              </div>
              
              {/* Vertical Tactical Pitch */}
              <div className="tactical-pitch-vertical" style={{ position: 'relative', flex: 1, minHeight: '480px', background: 'rgba(5,10,48,0.25)', border: '1.5px solid rgba(255,255,255,0.06)', borderRadius: '12px', overflow: 'hidden', backdropFilter: 'blur(5px)' }}>
                <div className="pitch-line-top" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 0, borderTop: '1.5px solid rgba(255,255,255,0.06)' }}></div>
                <div className="pitch-line-bottom" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 0, borderBottom: '1.5px solid rgba(255,255,255,0.06)' }}></div>
                <div className="pitch-center-circle-vertical" style={{ position: 'absolute', top: '50%', left: '50%', width: '100px', height: '100px', border: '1.5px solid rgba(255,255,255,0.05)', borderRadius: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}></div>
                <div className="pitch-center-line-vertical" style={{ position: 'absolute', top: '50%', left: 0, width: '100%', height: 0, borderTop: '1.5px solid rgba(255,255,255,0.05)', pointerEvents: 'none' }}></div>
                
                {/* Penalty Area Top */}
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '180px', height: '75px', border: '1.5px solid rgba(255,255,255,0.05)', borderTop: 'none', pointerEvents: 'none' }}></div>
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '80px', height: '25px', border: '1.5px solid rgba(255,255,255,0.05)', borderTop: 'none', pointerEvents: 'none' }}></div>
                
                {/* Penalty Area Bottom */}
                <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '180px', height: '75px', border: '1.5px solid rgba(255,255,255,0.05)', borderBottom: 'none', pointerEvents: 'none' }}></div>
                <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '80px', height: '25px', border: '1.5px solid rgba(255,255,255,0.05)', borderBottom: 'none', pointerEvents: 'none' }}></div>
                
                {/* Player nodes container */}
                <div className="pitch-players-vertical-container" id="dossier-pitch-players" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 5 }}>
                  {teamData.startingXI.map((p, idx) => (
                    <div 
                      key={idx} 
                      className="pitch-player-node" 
                      style={{ position: 'absolute', left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}
                    >
                      <div className="player-dot" style={{ position: 'relative', width: '14px', height: '14px', background: 'var(--primary-accent)', border: '2px solid #fff', borderRadius: '50%', boxShadow: '0 0 10px var(--primary-accent)', transition: 'transform 0.3s ease' }}>
                        <span className="player-pulse" style={{ position: 'absolute', top: '-4px', left: '-4px', right: '-4px', bottom: '-4px', border: '1.5px solid var(--primary-accent)', borderRadius: '50%', opacity: 0.6, animation: 'player-ring-pulse 2s infinite ease-out' }}></span>
                      </div>
                      <div className="player-label-name" style={{ fontSize: '0.72rem', fontWeight: 750, color: '#fff', textShadow: '0 2px 5px rgba(0,0,0,0.95)', marginTop: '4px', whiteSpace: 'nowrap', fontFamily: 'var(--font-main)', textAlign: 'center' }}>
                        {p.name}
                        {p.isCaptain && (
                          <span className="captain-badge" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '12px', height: '12px', fontSize: '0.5rem', fontWeight: 800, background: '#ff3b30', color: '#fff', borderRadius: '50%', marginLeft: '3px', verticalAlign: 'middle', lineHeight: 1 }}>C</span>
                        )}
                      </div>
                      <div className="player-label-role" style={{ fontSize: '0.55rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', whiteSpace: 'nowrap', marginTop: '1px' }}>
                        {p.role}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Right: Team Strengths & Analytics */}
          <section className="strength-metrics-section" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="analysis-card">
              <h3 className="card-heading">
                <svg className="heading-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                AI Team Strength Metrics
              </h3>
              
              <div className="dossier-metrics-list" id="dossier-strength-metrics" style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '16px' }}>
                {Object.keys(teamData.metrics).map((key) => {
                  const rating = teamData.metrics[key];
                  return (
                    <div key={key} className="metric-row-stat" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem', fontWeight: 750 }}>
                        <span style={{ color: 'var(--text-secondary)' }}>{metricsLabels[key]}</span>
                        <span style={{ color: 'var(--primary-accent)', fontWeight: 800 }}>{rating}%</span>
                      </div>
                      <div className="strength-bar-track" style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.04)', borderRadius: '3px', overflow: 'hidden', position: 'relative' }}>
                        <div className="strength-bar-fill" style={{ width: `${rating}%`, height: '100%', background: 'linear-gradient(90deg, var(--primary-accent) 0%, #00f0ff 100%)', borderRadius: '3px', boxShadow: '0 0 8px rgba(0,209,255,0.4)' }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Heat Zones Pitch */}
            <div className="analysis-card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 className="card-heading" style={{ marginBottom: '12px' }}>
                <svg className="heading-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path><path d="M2 12h20"></path></svg>
                AI Tactical Heat Zones
              </h3>
              <div style={{ position: 'relative', flex: 1, minHeight: '200px', background: 'rgba(5,10,48,0.2)', border: '1.5px solid rgba(255,255,255,0.05)', borderRadius: '8px', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }} id="dossier-heatmap-pitch">
                <div className="heatmap-small-vertical" style={{ relative: 'relative', width: '100%', height: '100%' }}>
                  {/* Center circle & penalty outlines */}
                  <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '50px', border: '1px solid rgba(255,255,255,0.03)', borderTop: 'none' }}></div>
                  <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', height: '50px', border: '1px solid rgba(255,255,255,0.03)', borderBottom: 'none' }}></div>
                  <div style={{ position: 'absolute', top: '50%', left: 0, width: '100%', height: 0, borderTop: '1px solid rgba(255,255,255,0.03)' }}></div>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', width: '70px', height: '70px', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '50%', transform: 'translate(-50%, -50%)' }}></div>
                  
                  {/* Dynamic heat rings */}
                  <div className="dossier-heat-rings" id="dossier-heat-node-container" style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0 }}>
                    {heatspots.map((h, i) => (
                      <div 
                        key={i}
                        className="heat-spot-node" 
                        style={{ position: 'absolute', left: `${h.left}%`, top: `${h.top}%`, width: `${h.size}px`, height: `${h.size}px`, background: `radial-gradient(circle, rgba(0,209,255,${h.op}) 0%, transparent 70%)`, transform: 'translate(-50%, -50%)', pointerEvents: 'none', borderRadius: '50%', animation: 'heat-pulse 4s infinite ease-in-out' }}
                      ></div>
                    ))}
                  </div>
                  <span className="pitch-tag" id="modal-pitch-tag" style={{ position: 'absolute', bottom: '8px', left: '8px' }}>
                    {pitchTagText}
                  </span>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Tactical Details breakdown */}
        <section className="tactical-dossier-details" style={{ marginBottom: '72px' }}>
          <div className="analysis-card">
            <h3 className="card-heading" style={{ marginBottom: '24px' }}>
              <svg className="heading-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
              AI Tactical Identity Analysis
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }} className="dossier-split-layout">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="tactical-detail-block">
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--primary-accent)', textTransform: 'uppercase', margin: '0 0 6px 0', letterSpacing: '0.5px' }}>Build-up Structure</h4>
                  <p id="tactical-buildup" style={{ fontSize: '0.92rem', lineStyle: 1.5, color: 'var(--text-secondary)', margin: 0 }}>
                    {teamData.tactics.buildup}
                  </p>
                </div>
                <div className="tactical-detail-block">
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--primary-accent)', textTransform: 'uppercase', margin: '0 0 6px 0', letterSpacing: '0.5px' }}>Attacking Philosophy</h4>
                  <p id="tactical-attack" style={{ fontSize: '0.92rem', lineStyle: 1.5, color: 'var(--text-secondary)', margin: 0 }}>
                    {teamData.tactics.attack}
                  </p>
                </div>
                <div className="tactical-detail-block">
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--primary-accent)', textTransform: 'uppercase', margin: '0 0 6px 0', letterSpacing: '0.5px' }}>Pressing & Defensive Behavior</h4>
                  <p id="tactical-press" style={{ fontSize: '0.92rem', lineStyle: 1.5, color: 'var(--text-secondary)', margin: 0 }}>
                    {teamData.tactics.defense}
                  </p>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="tactical-detail-block">
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--primary-accent)', textTransform: 'uppercase', margin: '0 0 6px 0', letterSpacing: '0.5px' }}>Transition Speed</h4>
                  <p id="tactical-transition" style={{ fontSize: '0.92rem', lineStyle: 1.5, color: 'var(--text-secondary)', margin: 0 }}>
                    {teamData.tactics.transition}
                  </p>
                </div>
                <div className="tactical-detail-block">
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--primary-accent)', textTransform: 'uppercase', margin: '0 0 6px 0', letterSpacing: '0.5px' }}>Set Piece Threat</h4>
                  <p id="tactical-setpieces" style={{ fontSize: '0.92rem', lineStyle: 1.5, color: 'var(--text-secondary)', margin: 0 }}>
                    {teamData.tactics.setpieces}
                  </p>
                </div>
                <div className="tactical-detail-block" style={{ background: 'rgba(255, 59, 48, 0.03)', border: '1.5px dashed rgba(255, 59, 48, 0.12)', padding: '12px 16px', borderRadius: '8px' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#ff3b30', textTransform: 'uppercase', margin: '0 0 6px 0', letterSpacing: '0.5px' }}>AI-Identified Weaknesses</h4>
                  <p id="tactical-weakness" style={{ fontSize: '0.92rem', lineStyle: 1.5, color: 'var(--text-secondary)', margin: 0 }}>
                    {teamData.tactics.weakness}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Players Section */}
        <section className="key-players-section" style={{ marginBottom: '72px' }}>
          <h3 className="section-title" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginBottom: '20px', textAlign: 'left', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
            AI Key Players Profile
          </h3>
          
          <div className="players-grid" id="dossier-players-list" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
            {teamData.players.map((p, idx) => (
              <div 
                key={idx}
                className="player-card-hud" 
                style={{ background: 'rgba(5,10,48,0.3)', border: '1px solid rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px', backdropFilter: 'blur(10px)', transition: 'border-color 0.3s ease, transform 0.3s ease', display: 'flex', flexDirection: 'column', gap: '12px' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(0,209,255,0.08)', border: '1px solid rgba(0,209,255,0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--primary-accent)' }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style={{ width: '14px', height: '14px' }}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fff' }}>{p.name}</span>
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.3px' }}>{p.role}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.58rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 750 }}>AI SCORE</div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 900, color: 'var(--primary-accent)' }}>{p.score}</div>
                  </div>
                </div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '10px', fontSize: '0.85rem', lineStyle: 1.4, color: 'var(--text-secondary)' }}>
                  {p.impact}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Form & Momentum */}
        <section className="form-momentum-section" style={{ marginBottom: '40px' }}>
          <div className="analysis-card">
            <h3 className="card-heading" style={{ marginBottom: '24px' }}>
              <svg className="heading-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
              Recent Form & AI Momentum Analysis
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '40px' }} className="dossier-split-layout">
              
              {/* Left: Match history metrics */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontSize: '0.95rem', fontWeight: 750, color: '#fff' }}>Last 5 Matches:</span>
                  <div id="dossier-form-badges" style={{ display: 'flex', gap: '6px' }}>
                    {teamData.form.map((f, idx) => (
                      <span key={idx} className={`mini-form-badge m-badge-${f.toLowerCase()}`} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '22px', height: '22px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 800 }}>{f}</span>
                    ))}
                  </div>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                  <div style={{ background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.04)', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px', fontWeight: 800 }}>GOALS SCORED</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 850, color: '#fff' }} id="form-goals-scored">
                      {teamData.goalsScored}
                    </div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.04)', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px', fontWeight: 800 }}>GOALS CONCEDED</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 850, color: 'var(--text-secondary)' }} id="form-goals-conceded">
                      {teamData.goalsConceded}
                    </div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.04)', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px', fontWeight: 800 }}>CLEAN SHEETS</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 850, color: 'var(--secondary-accent)' }} id="form-clean-sheets">
                      {teamData.cleanSheets}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Momentum trend line SVG */}
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 750, color: '#fff', marginBottom: '12px' }}>AI Momentum Trend Timeline:</div>
                <div style={{ height: '120px', background: 'rgba(5,10,48,0.2)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '8px', overflow: 'hidden', padding: '12px 0' }}>
                  <svg viewBox="0 0 400 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
                    <defs>
                      <linearGradient id="momentum-fade" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00D1FF" stopOpacity="0.2"/>
                        <stop offset="100%" stopColor="#00D1FF" stopOpacity="0"/>
                      </linearGradient>
                    </defs>
                    <path id="dossier-momentum-area" d={momentumPaths.areaD} fill="url(#momentum-fade)"></path>
                    <path id="dossier-momentum-line" d={momentumPaths.lineD} fill="none" stroke="#00D1FF" strokeWidth="2"></path>
                    <line x1="0" y1="50" x2="400" y2="50" stroke="rgba(255,255,255,0.04)" strokeDasharray="4"></line>
                  </svg>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Related Teams Section */}
        <section className="related-teams-section" style={{ marginBottom: '80px' }}>
          <h3 className="section-title" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: '20px', textAlign: 'left', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
            Similar Tactical Profiles
          </h3>
          <div className="similar-grid" id="dossier-similar-teams" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
            {teamData.similar.map((s, idx) => (
              <div 
                key={idx}
                className="similar-team-card" 
                onClick={() => handleSimilarNavigate(s.code)} 
                style={{ background: 'rgba(5,10,48,0.2)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '12px', padding: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', transition: 'all 0.25s ease' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '44px', height: '28px', borderRadius: '3px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'center', alignItems: 'center' }} dangerouslySetInnerHTML={{ __html: generateFlagSVG(s.code) }}></div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fff' }}>{s.name}</span>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{s.archetype}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.58rem', color: 'var(--text-muted)', fontWeight: 750, textTransform: 'uppercase' }}>MATCH</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 855, color: 'var(--secondary-accent)' }}>{s.sim}%</div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
