import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateFlagSVG } from '../data/mockData';
import { getTeams } from '../api/api';

// Import local image assets for slideshow
import teamWinning1 from '../assets/team-winning-1.png';
import teamWinning2 from '../assets/team-winning-2.jpg';
import teamWinning3 from '../assets/team-winning-3.jpg';
import teamWinning4 from '../assets/team-winning-4.jpg';
import teamWinning5 from '../assets/team-winning-5.jpg';

// Hardcoded fallback for power rankings
const fallbackPowerRankings = [
  { rank: 1, name: "Argentina", code: "ARG", score: 94.2, prob: "18.5%", style: "Fluid Possession Block", form: ["W", "W", "W", "D", "W"] },
  { rank: 2, name: "Brazil", code: "BRA", score: 93.5, prob: "16.8%", style: "Lateral Wing Overload", form: ["W", "W", "W", "W", "D"] },
  { rank: 3, name: "France", code: "FRA", score: 92.1, prob: "15.2%", style: "Rapid Vertical Counter", form: ["W", "W", "L", "W", "W"] },
  { rank: 4, name: "England", code: "ENG", score: 89.8, prob: "12.4%", style: "Balanced Midfield Press", form: ["W", "D", "W", "W", "D"] },
  { rank: 5, name: "Spain", code: "ESP", score: 88.5, prob: "10.9%", style: "Central Zonal Overloads", form: ["W", "D", "W", "W", "L"] }
];

export default function Teams() {
  const navigate = useNavigate();

  // State for modal
  const [selectedTeamCode, setSelectedTeamCode] = useState(null);
  const [modalActive, setModalActive] = useState(false);

  // State for API-driven power rankings
  const [powerRankingsData, setPowerRankingsData] = useState(fallbackPowerRankings);
  const [rankingsLoading, setRankingsLoading] = useState(true);
  const [rankingsError, setRankingsError] = useState(null);

  // Standings page setup
  useEffect(() => {
    document.body.className = 'teams-body-page';
    return () => {
      document.body.className = '';
    };
  }, []);

  // Fetch teams from API, map to power rankings format
  useEffect(() => {
    setRankingsLoading(true);
    setRankingsError(null);
    getTeams()
      .then((apiTeams) => {
        // Sort by powerRank (lowest = best) and take top 5
        const sorted = [...apiTeams].sort((a, b) => (a.powerRank || 99) - (b.powerRank || 99));
        const top5 = sorted.slice(0, 5).map((t, i) => ({
          rank: i + 1,
          name: t.name,
          code: t.code,
          score: t.rating || 0,
          prob: t.winProb || '–',
          style: t.archetype || 'N/A',
          form: t.form || ['–', '–', '–', '–', '–']
        }));
        setPowerRankingsData(top5);
      })
      .catch((err) => {
        console.warn("Error fetching teams from API. Using fallback data.", err);
        setRankingsError("Could not connect to server. Showing cached data.");
        setPowerRankingsData(fallbackPowerRankings);
      })
      .finally(() => setRankingsLoading(false));
  }, []);

  // 1. Floating Particles Data (generate once)
  const particles = useMemo(() => {
    const list = [];
    for (let i = 0; i < 60; i++) {
      list.push({
        size: Math.random() * 4 + 2,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 15}s`,
        duration: `${Math.random() * 10 + 10}s`
      });
    }
    return list;
  }, []);

  // 3. World Cup Groups Data
  const groupsData = useMemo(() => {
    return {
      "Group A": [
        { name: "Mexico", code: "MEX", tactical: "High Block Press", form: ["W", "D", "W", "W", "L"], gd: 4, pts: 7, rating: 82, qual: 88, stats: { Attack: 81, Midfield: 82, Defense: 83 }, players: [{num: 11, name: "Santiago Giménez", role: "Striker"}, {num: 4, name: "Edson Álvarez", role: "Defensive Mid"}, {num: 22, name: "Hirving Lozano", role: "Winger"}] },
        { name: "Korea Republic", code: "KOR", tactical: "Fluid Transitions", form: ["W", "W", "L", "D", "W"], gd: 2, pts: 5, rating: 78, qual: 76, stats: { Attack: 80, Midfield: 76, Defense: 78 }, players: [{num: 7, name: "Son Heung-min", role: "Forward"}, {num: 18, name: "Lee Kang-in", role: "Attacking Mid"}, {num: 4, name: "Kim Min-jae", role: "Center Back"}] },
        { name: "South Africa", code: "RSA", tactical: "Compact Low Block", form: ["L", "W", "D", "D", "W"], gd: 1, pts: 4, rating: 71, qual: 58, stats: { Attack: 70, Midfield: 72, Defense: 71 }, players: [{num: 11, name: "Percy Tau", role: "Forward"}, {num: 4, name: "Teboho Mokoena", role: "Central Mid"}, {num: 20, name: "Khuliso Mudau", role: "Right Back"}] },
        { name: "Czechia", code: "CZE", tactical: "Direct Crosses", form: ["D", "L", "W", "W", "D"], gd: -7, pts: 1, rating: 74, qual: 28, stats: { Attack: 73, Midfield: 74, Defense: 75 }, players: [{num: 10, name: "Patrik Schick", role: "Striker"}, {num: 22, name: "Tomas Soucek", role: "Box-to-box Mid"}, {num: 5, name: "Vladimir Coufal", role: "Right Back"}] }
      ],
      "Group B": [
        { name: "Switzerland", code: "SUI", tactical: "Zonal Mid-Block", form: ["W", "W", "D", "W", "D"], gd: 5, pts: 7, rating: 81, qual: 84, stats: { Attack: 78, Midfield: 83, Defense: 82 }, players: [{num: 10, name: "Granit Xhaka", role: "Midfielder"}, {num: 7, name: "Breel Embolo", role: "Striker"}, {num: 1, name: "Yann Sommer", role: "Goalkeeper"}] },
        { name: "Canada", code: "CAN", tactical: "Direct Wing Play", form: ["L", "W", "W", "D", "L"], gd: 2, pts: 6, rating: 77, qual: 72, stats: { Attack: 79, Midfield: 75, Defense: 77 }, players: [{num: 19, name: "Alphonso Davies", role: "Left Winger"}, {num: 9, name: "Jonathan David", role: "Forward"}, {num: 7, name: "Stephen Eustáquio", role: "Midfielder"}] },
        { name: "Bosnia & Herz.", code: "BIH", tactical: "Physical Low Block", form: ["W", "L", "D", "L", "W"], gd: -1, pts: 3, rating: 72, qual: 45, stats: { Attack: 71, Midfield: 72, Defense: 73 }, players: [{num: 11, name: "Edin Dzeko", role: "Striker"}, {num: 10, name: "Miralem Pjanic", role: "Midfielder"}, {num: 6, name: "Sead Kolasinac", role: "Defender"}] },
        { name: "Qatar", code: "QAT", tactical: "Deep Zonal Block", form: ["L", "D", "W", "L", "L"], gd: -6, pts: 1, rating: 69, qual: 22, stats: { Attack: 68, Midfield: 70, Defense: 69 }, players: [{num: 11, name: "Akram Afif", role: "Forward"}, {num: 19, name: "Almoez Ali", role: "Striker"}, {num: 10, name: "Hassan Al-Haydos", role: "Midfielder"}] }
      ],
      "Group C": [
        { name: "Brazil", code: "BRA", tactical: "Wing Overloads", form: ["W", "W", "W", "W", "D"], gd: 8, pts: 9, rating: 93, qual: 96, stats: { Attack: 95, Midfield: 91, Defense: 93 }, players: [{num: 10, name: "Neymar Jr", role: "Playmaker"}, {num: 7, name: "Vinícius Júnior", role: "Winger"}, {num: 5, name: "Bruno Guimarães", role: "Midfielder"}] },
        { name: "Morocco", code: "MAR", tactical: "Compact Low Block", form: ["W", "D", "L", "W", "W"], gd: 3, pts: 6, rating: 84, qual: 82, stats: { Attack: 81, Midfield: 85, Defense: 86 }, players: [{num: 2, name: "Achraf Hakimi", role: "Right Back"}, {num: 7, name: "Hakim Ziyech", role: "Winger"}, {num: 4, name: "Sofyan Amrabat", role: "Defensive Mid"}] },
        { name: "Scotland", code: "SCO", tactical: "Direct Crosses", form: ["W", "D", "W", "L", "D"], gd: -3, pts: 3, rating: 75, qual: 35, stats: { Attack: 73, Midfield: 76, Defense: 75 }, players: [{num: 4, name: "Scott McTominay", role: "Central Mid"}, {num: 7, name: "John McGinn", role: "Attacking Mid"}, {num: 3, name: "Andrew Robertson", role: "Left Back"}] },
        { name: "Haiti", code: "HAI", tactical: "Deep Zonal block", form: ["L", "L", "W", "D", "L"], gd: -8, pts: 0, rating: 67, qual: 12, stats: { Attack: 69, Midfield: 66, Defense: 67 }, players: [{num: 9, name: "Duckens Nazon", role: "Striker"}, {num: 10, name: "Frantzdy Pierrot", role: "Forward"}, {num: 4, name: "Carlens Arcus", role: "Defender"}] }
      ],
      "Group D": [
        { name: "USA", code: "USA", tactical: "High Intensity Press", form: ["W", "W", "W", "L", "W"], gd: 5, pts: 7, rating: 83, qual: 90, stats: { Attack: 84, Midfield: 82, Defense: 83 }, players: [{num: 10, name: "Christian Pulisic", role: "Winger"}, {num: 8, name: "Weston McKennie", role: "Box-to-box Mid"}, {num: 4, name: "Tyler Adams", role: "Defensive Mid"}] },
        { name: "Australia", code: "AUS", tactical: "Physical Low Block", form: ["D", "W", "L", "W", "D"], gd: 1, pts: 5, rating: 75, qual: 68, stats: { Attack: 72, Midfield: 75, Defense: 77 }, players: [{num: 15, name: "Mitchell Duke", role: "Striker"}, {num: 19, name: "Harry Souttar", role: "Center Back"}, {num: 22, name: "Jackson Irvine", role: "Central Mid"}] },
        { name: "Türkiye", code: "TUR", tactical: "Technical Possession", form: ["L", "W", "W", "D", "L"], gd: 0, pts: 4, rating: 79, qual: 62, stats: { Attack: 80, Midfield: 81, Defense: 76 }, players: [{num: 10, name: "Hakan Çalhanoğlu", role: "Playmaker"}, {num: 19, name: "Kenan Yıldız", role: "Winger"}, {num: 4, name: "Arda Güler", role: "Attacking Mid"}] },
        { name: "Paraguay", code: "PAR", tactical: "Compact Low Block", form: ["D", "D", "L", "W", "L"], gd: -6, pts: 0, rating: 73, qual: 24, stats: { Attack: 71, Midfield: 74, Defense: 74 }, players: [{num: 10, name: "Julio Enciso", role: "Winger"}, {num: 19, name: "Miguel Almirón", role: "Forward"}, {num: 15, name: "Gustavo Gómez", role: "Defender"}] }
      ],
      "Group E": [
        { name: "Germany", code: "GER", tactical: "Vertical Overloads", form: ["W", "W", "D", "W", "W"], gd: 9, pts: 9, rating: 91, qual: 95, stats: { Attack: 92, Midfield: 93, Defense: 89 }, players: [{num: 10, name: "Jamal Musiala", role: "Attacking Mid"}, {num: 17, name: "Florian Wirtz", role: "Playmaker"}, {num: 21, name: "Ilkay Gündogan", role: "Midfielder"}] },
        { name: "Ecuador", code: "ECU", tactical: "Fast Transitions", form: ["W", "D", "W", "L", "W"], gd: 2, pts: 6, rating: 80, qual: 78, stats: { Attack: 78, Midfield: 81, Defense: 82 }, players: [{num: 23, name: "Moisés Caicedo", role: "Defensive Mid"}, {num: 13, name: "Enner Valencia", role: "Striker"}, {num: 3, name: "Piero Hincapié", role: "Defender"}] },
        { name: "Cote d'Ivoire", code: "CIV", tactical: "Physical Mid-Block", form: ["L", "W", "D", "W", "L"], gd: -2, pts: 3, rating: 78, qual: 55, stats: { Attack: 79, Midfield: 77, Defense: 77 }, players: [{num: 22, name: "Sébastien Haller", role: "Striker"}, {num: 4, name: "Franck Kessié", role: "Central Mid"}, {num: 7, name: "Simon Adingra", role: "Winger"}] },
        { name: "Curaçao", code: "CUR", tactical: "Deep Zonal block", form: ["D", "L", "L", "W", "D"], gd: -9, pts: 0, rating: 66, qual: 14, stats: { Attack: 65, Midfield: 67, Defense: 66 }, players: [{num: 10, name: "Juninho Bacuna", role: "Midfielder"}, {num: 7, name: "Juriën Gaari", role: "Defender"}, {num: 9, name: "Rangelo Janga", role: "Striker"}] }
      ],
      "Group F": [
        { name: "Netherlands", code: "NED", tactical: "Total Football", form: ["W", "D", "W", "L", "W"], gd: 4, pts: 7, rating: 87, qual: 92, stats: { Attack: 86, Midfield: 88, Defense: 87 }, players: [{num: 4, name: "Virgil van Dijk", role: "Center Back"}, {num: 10, name: "Memphis Depay", role: "Striker"}, {num: 14, name: "Tijjani Reijnders", role: "Midfielder"}] },
        { name: "Japan", code: "JPN", tactical: "High Intensity Press", form: ["W", "W", "D", "W", "D"], gd: 3, pts: 6, rating: 83, qual: 86, stats: { Attack: 84, Midfield: 83, Defense: 82 }, players: [{num: 14, name: "Junya Ito", role: "Winger"}, {num: 20, name: "Takefusa Kubo", role: "Forward"}, {num: 6, name: "Wataru Endo", role: "Defensive Mid"}] },
        { name: "Sweden", code: "SWE", tactical: "Zonal Mid-Block", form: ["L", "W", "D", "W", "L"], gd: -1, pts: 4, rating: 78, qual: 58, stats: { Attack: 81, Midfield: 77, Defense: 76 }, players: [{num: 9, name: "Alexander Isak", role: "Striker"}, {num: 17, name: "Viktor Gyökeres", role: "Striker"}, {num: 10, name: "Dejan Kulusevski", role: "Attacking Mid"}] },
        { name: "Tunisia", code: "TUN", tactical: "Deep Zonal block", form: ["L", "D", "W", "L", "L"], gd: -6, pts: 0, rating: 71, qual: 22, stats: { Attack: 69, Midfield: 72, Defense: 72 }, players: [{num: 10, name: "Hannibal Mejbri", role: "Midfielder"}, {num: 7, name: "Youssef Msakni", role: "Forward"}, {num: 4, name: "Yassine Meriah", role: "Center Back"}] }
      ],
      "Group G": [
        { name: "Belgium", code: "BEL", tactical: "Technical Possession", form: ["W", "W", "D", "L", "W"], gd: 4, pts: 7, rating: 86, qual: 89, stats: { Attack: 87, Midfield: 86, Defense: 84 }, players: [{num: 7, name: "Kevin De Bruyne", role: "Attacking Mid"}, {num: 10, name: "Romelu Lukaku", role: "Striker"}, {num: 11, name: "Jérémy Doku", role: "Winger"}] },
        { name: "Egypt", code: "EGY", tactical: "Direct Wing Play", form: ["W", "D", "W", "W", "L"], gd: 2, pts: 6, rating: 80, qual: 78, stats: { Attack: 83, Midfield: 78, Defense: 79 }, players: [{num: 10, name: "Mohamed Salah", role: "Winger"}, {num: 7, name: "Trézéguet", role: "Winger"}, {num: 17, name: "Mohamed Elneny", role: "Defensive Mid"}] },
        { name: "IR Iran", code: "IRN", tactical: "Compact Low Block", form: ["L", "W", "D", "D", "W"], gd: -2, pts: 3, rating: 74, qual: 42, stats: { Attack: 76, Midfield: 73, Defense: 74 }, players: [{num: 9, name: "Mehdi Taremi", role: "Striker"}, {num: 20, name: "Sardar Azmoun", role: "Forward"}, {num: 6, name: "Saeid Ezatolahi", role: "Midfielder"}] },
        { name: "New Zealand", code: "NZL", tactical: "Physical Mid-Block", form: ["L", "D", "L", "W", "L"], gd: -4, pts: 1, rating: 68, qual: 16, stats: { Attack: 68, Midfield: 67, Defense: 69 }, players: [{num: 9, name: "Chris Wood", role: "Striker"}, {num: 6, name: "Joe Bell", role: "Central Mid"}, {num: 4, name: "Liberato Cacace", role: "Left Back"}] }
      ],
      "Group H": [
        { name: "Spain", code: "ESP", tactical: "Tiki-Taka Overloads", form: ["W", "D", "W", "W", "L"], gd: 6, pts: 7, rating: 89, qual: 93, stats: { Attack: 88, Midfield: 92, Defense: 87 }, players: [{num: 16, name: "Rodri", role: "Defensive Mid"}, {num: 10, name: "Dani Olmo", role: "Attacking Mid"}, {num: 17, name: "Lamine Yamal", role: "Winger"}] },
        { name: "Uruguay", code: "URU", tactical: "High Block Press", form: ["W", "W", "D", "W", "D"], gd: 3, pts: 6, rating: 84, qual: 88, stats: { Attack: 85, Midfield: 84, Defense: 83 }, players: [{num: 15, name: "Federico Valverde", role: "Box-to-box Mid"}, {num: 9, name: "Darwin Núñez", role: "Striker"}, {num: 4, name: "Ronald Araújo", role: "Defender"}] },
        { name: "Saudi Arabia", code: "KSA", tactical: "Compact Low Block", form: ["L", "W", "D", "D", "W"], gd: -4, pts: 3, rating: 73, qual: 38, stats: { Attack: 72, Midfield: 74, Defense: 73 }, players: [{num: 10, name: "Salem Al-Dawsari", role: "Winger"}, {num: 9, name: "Firas Al-Buraikan", role: "Striker"}, {num: 12, name: "Saud Abdulhamid", role: "Right Back"}] },
        { name: "Cabo Verde", code: "CPV", tactical: "Fast Transitions", form: ["L", "D", "L", "W", "L"], gd: -5, pts: 1, rating: 72, qual: 20, stats: { Attack: 73, Midfield: 71, Defense: 71 }, players: [{num: 7, name: "Garry Rodrigues", role: "Winger"}, {num: 10, name: "Jamiro Monteiro", role: "Midfielder"}, {num: 20, name: "Ryan Mendes", role: "Forward"}] }
      ],
      "Group I": [
        { name: "France", code: "FRA", tactical: "Vertical Transitions", form: ["W", "W", "L", "W", "W"], gd: 8, pts: 9, rating: 92, qual: 95, stats: { Attack: 94, Midfield: 91, Defense: 91 }, players: [{num: 10, name: "Kylian Mbappé", role: "Striker"}, {num: 7, name: "Antoine Griezmann", role: "Playmaker"}, {num: 4, name: "Aurélien Tchouaméni", role: "Defensive Mid"}] },
        { name: "Senegal", code: "SEN", tactical: "Physical Low Block", form: ["W", "D", "W", "L", "W"], gd: 2, pts: 6, rating: 81, qual: 78, stats: { Attack: 80, Midfield: 81, Defense: 82 }, players: [{num: 10, name: "Sadio Mané", role: "Winger"}, {num: 26, name: "Nicolas Jackson", role: "Forward"}, {num: 3, name: "Kalidou Koulibaly", role: "Center Back"}] },
        { name: "Norway", code: "NOR", tactical: "Direct Crosses", form: ["L", "W", "L", "W", "D"], gd: -3, pts: 3, rating: 79, qual: 48, stats: { Attack: 86, Midfield: 78, Defense: 73 }, players: [{num: 9, name: "Erling Haaland", role: "Striker"}, {num: 10, name: "Martin Ødegaard", role: "Playmaker"}, {num: 6, name: "Julian Ryerson", role: "Right Back"}] },
        { name: "Iraq", code: "IRQ", tactical: "Deep Zonal block", form: ["L", "L", "W", "D", "L"], gd: -7, pts: 0, rating: 70, qual: 15, stats: { Attack: 70, Midfield: 69, Defense: 70 }, players: [{num: 10, name: "Mohanad Ali", role: "Striker"}, {num: 8, name: "Ibrahim Bayesh", role: "Midfielder"}, {num: 4, name: "Saad Natiq", role: "Defender"}] }
      ],
      "Group J": [
        { name: "Argentina", code: "ARG", tactical: "Tiki-Taka Overloads", form: ["W", "W", "W", "D", "W"], gd: 9, pts: 9, rating: 94, qual: 98, stats: { Attack: 93, Midfield: 96, Defense: 93 }, players: [{num: 10, name: "Lionel Messi", role: "Playmaker"}, {num: 24, name: "Enzo Fernández", role: "Central Mid"}, {num: 11, name: "Alexis Mac Allister", role: "Midfielder"}] },
        { name: "Algeria", code: "ALG", tactical: "Technical Possession", form: ["L", "W", "D", "W", "W"], gd: 0, pts: 4, rating: 79, qual: 65, stats: { Attack: 81, Midfield: 78, Defense: 77 }, players: [{num: 7, name: "Riyad Mahrez", role: "Winger"}, {num: 9, name: "Baghdad Bounedjah", role: "Forward"}, {num: 10, name: "Sofiane Feghouli", role: "Midfielder"}] },
        { name: "Austria", code: "AUT", tactical: "High Intensity Press", form: ["W", "D", "L", "L", "W"], gd: -2, pts: 3, rating: 80, qual: 58, stats: { Attack: 79, Midfield: 81, Defense: 80 }, players: [{num: 7, name: "Marcel Sabitzer", role: "Central Mid"}, {num: 10, name: "Konrad Laimer", role: "Attacking Mid"}, {num: 8, name: "David Alaba", role: "Center Back"}] },
        { name: "Jordan", code: "JOR", tactical: "Deep Zonal block", form: ["L", "D", "L", "W", "L"], gd: -7, pts: 1, rating: 68, qual: 14, stats: { Attack: 68, Midfield: 67, Defense: 68 }, players: [{num: 10, name: "Musa Al-Taamari", role: "Winger"}, {num: 9, name: "Yazan Al-Naimat", role: "Striker"}, {num: 3, name: "Abdallah Nasib", role: "Defender"}] }
      ],
      "Group K": [
        { name: "Portugal", code: "POR", tactical: "Technical Possession", form: ["W", "W", "D", "W", "W"], gd: 5, pts: 7, rating: 88, qual: 92, stats: { Attack: 89, Midfield: 88, Defense: 87 }, players: [{num: 7, name: "Cristiano Ronaldo", role: "Striker"}, {num: 8, name: "Bruno Fernandes", role: "Attacking Mid"}, {num: 10, name: "Bernardo Silva", role: "Playmaker"}] },
        { name: "Colombia", code: "COL", tactical: "Fast Transitions", form: ["W", "W", "L", "D", "W"], gd: 3, pts: 6, rating: 82, qual: 84, stats: { Attack: 83, Midfield: 81, Defense: 82 }, players: [{num: 7, name: "Luis Díaz", role: "Winger"}, {num: 10, name: "James Rodríguez", role: "Playmaker"}, {num: 16, name: "Jefferson Lerma", role: "Defensive Mid"}] },
        { name: "Uzbekistan", code: "UZB", tactical: "Compact Low Block", form: ["L", "W", "D", "W", "L"], gd: -3, pts: 3, rating: 73, qual: 35, stats: { Attack: 74, Midfield: 72, Defense: 73 }, players: [{num: 14, name: "Eldor Shomurodov", role: "Striker"}, {num: 7, name: "Otabek Shukurov", role: "Midfielder"}, {num: 4, name: "Husniddin Aliqulov", role: "Defender"}] },
        { name: "Congo DR", code: "COD", tactical: "Physical Mid-Block", form: ["L", "D", "L", "W", "L"], gd: -5, pts: 1, rating: 71, qual: 25, stats: { Attack: 72, Midfield: 70, Defense: 71 }, players: [{num: 17, name: "Cédric Bakambu", role: "Striker"}, {num: 10, name: "Chancel Mbemba", role: "Defender"}, {num: 8, name: "Yoane Wissa", role: "Winger"}] }
      ],
      "Group L": [
        { name: "England", code: "ENG", tactical: "Balanced Possession", form: ["W", "D", "W", "W", "D"], gd: 5, pts: 7, rating: 89, qual: 93, stats: { Attack: 89, Midfield: 90, Defense: 88 }, players: [{num: 9, name: "Harry Kane", role: "Striker"}, {num: 10, name: "Jude Bellingham", role: "Attacking Mid"}, {num: 7, name: "Bukayo Saka", role: "Winger"}] },
        { name: "Croatia", code: "CRO", tactical: "Technical Midfield Control", form: ["W", "D", "L", "W", "L"], gd: 3, pts: 6, rating: 83, qual: 86, stats: { Attack: 81, Midfield: 86, Defense: 82 }, players: [{num: 10, name: "Luka Modrić", role: "Playmaker"}, {num: 8, name: "Mateo Kovačić", role: "Midfielder"}, {num: 4, name: "Joško Gvardiol", role: "Center Back"}] },
        { name: "Ghana", code: "GHA", tactical: "Fast Transitions", form: ["L", "W", "D", "W", "L"], gd: -2, pts: 3, rating: 76, qual: 48, stats: { Attack: 78, Midfield: 75, Defense: 75 }, players: [{num: 9, name: "Jordan Ayew", role: "Forward"}, {num: 20, name: "Mohammed Kudus", role: "Playmaker"}, {num: 4, name: "Thomas Partey", role: "Midfielder"}] },
        { name: "Panama", code: "PAN", tactical: "Compact Low Block", form: ["L", "D", "L", "W", "L"], gd: -6, pts: 1, rating: 71, qual: 22, stats: { Attack: 70, Midfield: 71, Defense: 71 }, players: [{num: 18, name: "Cecilio Waterman", role: "Striker"}, {num: 10, name: "Edgar Bárcenas", role: "Winger"}, {num: 3, name: "Harold Cummings", role: "Center Back"}] }
      ]
    };
  }, []);

  // 4. Dark Horse Predictions Data
  const darkHorsesData = [
    {
      name: "Morocco",
      code: "MAR",
      upsetIndex: "88%",
      style: "Compact Low Block",
      qualProb: "82%",
      advantage: "Elite Defensive Structure & Counter Transitions",
      stadium: "att",
      summary: "Following their historic semifinal run, Morocco's tactical structure remains one of the hardest blocks to penetrate. Deep defensive lines and explosive transition speeds make them a prime threat to elite favorites."
    },
    {
      name: "Japan",
      code: "JPN",
      upsetIndex: "85%",
      style: "High Intensity Counter-Press",
      qualProb: "86%",
      advantage: "Unmatched Pressing Recovery Rates & Tactical Discipline",
      stadium: "sofi",
      summary: "Japan's tactical evolution features a relentless, synchronized counter-pressing block. Their squad's physical capacity to recover and strike in transitional spaces represents a huge tactical headache for possession-heavy favorites."
    },
    {
      name: "USA",
      code: "USA",
      upsetIndex: "82%",
      style: "High Press & Direct Verticals",
      qualProb: "90%",
      advantage: "Home Pitch Advantage & High Intensity Wing Play",
      stadium: "lumen",
      summary: "Playing on home turf in Seattle and California, the USA's technical core is structured around rapid vertical switches. Direct overloading on the flanks gives them highly explosive match dynamics."
    }
  ];

  // Helper to find team data
  const selectedTeam = useMemo(() => {
    if (!selectedTeamCode) return null;
    for (const groupName in groupsData) {
      const match = groupsData[groupName].find(t => t.code === selectedTeamCode);
      if (match) return match;
    }
    return null;
  }, [selectedTeamCode, groupsData]);

  // Helper to calculate W, D, L from points
  const getWDL = (pts) => {
    if (pts === 9) return { w: 3, d: 0, l: 0 };
    if (pts === 7) return { w: 2, d: 1, l: 0 };
    if (pts === 6) return { w: 2, d: 0, l: 1 };
    if (pts === 5) return { w: 1, d: 2, l: 0 };
    if (pts === 4) return { w: 1, d: 1, l: 1 };
    if (pts === 3) return { w: 1, d: 0, l: 2 };
    if (pts === 2) return { w: 0, d: 2, l: 1 };
    if (pts === 1) return { w: 0, d: 1, l: 2 };
    return { w: 0, d: 0, l: 3 };
  };

  const handleOpenModal = (code) => {
    setSelectedTeamCode(code);
    setModalActive(true);
  };

  const handleCloseModal = () => {
    setModalActive(false);
    setSelectedTeamCode(null);
  };

  const handleAnalyzeTeamDossier = (code) => {
    // Navigate to Team Analysis page
    navigate(`/team-analysis?team=${code}`);
  };

  // Set Pitch Tag Area based on style in modal
  const pitchTagText = useMemo(() => {
    if (!selectedTeam) return "";
    const tactical = selectedTeam.tactical.toLowerCase();
    if (tactical.includes('wing')) return "Overloading Flanks Focus";
    if (tactical.includes('low block')) return "Compact Box Containment";
    if (tactical.includes('press')) return "High-Line Opponent Half Recovery";
    return "Central Passing Networks";
  }, [selectedTeam]);

  return (
    <>
      {/* Dotted Vector Dot Map Background */}
      <div className="world-map-svg-bg">
        <svg viewBox="0 0 1000 500" fill="none" stroke="var(--primary-accent)" strokeWidth="1.2" strokeLinecap="round">
          {/* North America */}
          <path d="M 120 100 L 220 100 L 260 180 L 200 240 L 180 200 Z" strokeDasharray="2,6" />
          <path d="M 100 120 L 200 120 L 230 180 L 190 220 Z" strokeDasharray="1,5" />
          {/* South America */}
          <path d="M 210 250 L 260 270 L 290 350 L 240 430 L 220 400 Z" strokeDasharray="2,6" />
          <path d="M 220 270 L 260 290 L 270 360 L 240 400 Z" strokeDasharray="1,5" />
          {/* Europe */}
          <path d="M 450 110 L 520 100 L 540 160 L 480 180 Z" strokeDasharray="2,6" />
          {/* Africa */}
          <path d="M 460 200 L 530 210 L 570 280 L 530 380 L 490 340 L 470 240 Z" strokeDasharray="2,6" />
          <path d="M 480 220 L 530 230 L 550 290 L 520 340 Z" strokeDasharray="1,5" />
          {/* Asia */}
          <path d="M 540 100 L 750 90 L 820 180 L 790 260 L 680 280 L 580 200 Z" strokeDasharray="2,6" />
          <path d="M 580 120 L 730 110 L 780 180 L 740 250 L 640 240 Z" strokeDasharray="1,5" />
          {/* Australia */}
          <path d="M 760 330 L 830 340 L 820 400 L 750 380 Z" strokeDasharray="2,6" />
        </svg>
      </div>

      {/* Floating Particles Overlay Container */}
      <div className="teams-page-particles" id="particles-container">
        {particles.map((p, idx) => (
          <div 
            key={idx}
            className="floating-particle"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: p.left,
              top: p.top,
              animationDelay: p.delay,
              animationDuration: p.duration
            }}
          ></div>
        ))}
      </div>

      {/* Compact Hero Section */}
      <section className="teams-hero-section">
        {/* Image Slideshow Background */}
        <div className="hero-slideshow">
          <div className="slide" style={{ backgroundImage: `url(${teamWinning1})` }}></div>
          <div className="slide" style={{ backgroundImage: `url(${teamWinning2})` }}></div>
          <div className="slide" style={{ backgroundImage: `url(${teamWinning3})` }}></div>
          <div className="slide" style={{ backgroundImage: `url(${teamWinning4})` }}></div>
          <div className="slide" style={{ backgroundImage: `url(${teamWinning5})` }}></div>
        </div>
        
        <div className="teams-hero-glow"></div>
        <div className="section-container" style={{ position: 'relative', zIndex: 3 }}>
          <div className="hero-content" style={{ textAlign: 'left', maxWidth: '800px', margin: 0 }}>
            <h1 className="hero-title" style={{ fontSize: '2.8rem', fontWeight: 850, color: '#fff', marginBottom: '16px', letterSpacing: '-0.5px', textShadow: '0 4px 20px rgba(0,0,0,0.65)', textAlign: 'left' }}>
              World Cup Teams Intelligence
            </h1>
            <p className="hero-description" style={{ fontSize: '1.05rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.85)', margin: 0, textShadow: '0 2px 10px rgba(0,0,0,0.5)', textAlign: 'left' }}>
              Explore AI-powered tactical profiles, qualification projections, team strength analysis, and tournament intelligence for every nation competing in the 2026 FIFA World Cup.
            </p>
          </div>
        </div>
      </section>

      {/* AI Power Rankings */}
      <section className="rankings-section">
        <div className="section-container">
          <div className="section-header" style={{ marginBottom: '24px' }}>
            <div className="header-left">
              <h2 className="section-title" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginBottom: '6px', textAlign: 'left' }}>AI Power Rankings</h2>
              <p className="section-subtitle" style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0, textAlign: 'left' }}>Projected strongest contenders based on tactical balance, squad depth, form, and AI simulation models.</p>
            </div>
          </div>

          <div className="rankings-glass-card">
            <div className="rankings-header-row">
              <span>Rank</span>
              <span>Flag</span>
              <span>Nation</span>
              <span>AI Rating</span>
              <span>Title Prob</span>
              <span>Tactical Style</span>
              <span>Recent Form</span>
            </div>
            <div className="rankings-list" id="rankings-list-container">
              {rankingsError && (
                <div style={{ padding: '8px 14px', marginBottom: '8px', borderRadius: '8px', background: 'rgba(255,180,0,0.08)', border: '1px solid rgba(255,180,0,0.15)', color: 'rgba(255,200,50,0.8)', fontSize: '0.78rem', textAlign: 'center' }}>
                  ⚠ {rankingsError}
                </div>
              )}
              {rankingsLoading ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 0', gap: '12px' }}>
                  <div style={{ width: '32px', height: '32px', border: '3px solid rgba(0,255,255,0.12)', borderTop: '3px solid var(--primary-accent, #00e5ff)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}></div>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>Loading Power Rankings...</span>
                  <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                </div>
              ) : (
              powerRankingsData.map((team) => {
                const isTopThree = team.rank <= 3 ? 'top-three' : '';
                return (
                  <div key={team.rank} className={`ranking-row ${isTopThree}`} onClick={() => handleOpenModal(team.code)} style={{ cursor: 'pointer' }}>
                    <span className="ranking-num">{team.rank}</span>
                    <div className="ranking-flag-wrapper" dangerouslySetInnerHTML={{ __html: generateFlagSVG(team.code) }}></div>
                    <span className="ranking-name">{team.name}</span>
                    <span className="ranking-score">{team.score}</span>
                    <span className="ranking-prob">{team.prob}</span>
                    <div><span className="ranking-identity">{team.style}</span></div>
                    <div className="ranking-trend-container">
                      {team.form.map((f, i) => (
                        <span key={i} className={`mini-form-badge m-badge-${f.toLowerCase()}`}>{f}</span>
                      ))}
                    </div>
                  </div>
                );
              })
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Group Standings Grid */}
      <section className="groups-section">
        <div className="section-container">
          <div className="section-header-left" style={{ marginBottom: '32px', textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
            <h2 className="section-title" style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginBottom: '8px', textAlign: 'left' }}>World Cup Groups & Standings</h2>
            <p className="section-subtitle" style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: 0, textAlign: 'left' }}>Explore the qualification prospects, tactical configurations, and AI ratings for all 48 participating countries.</p>
          </div>

          <div className="groups-grid" id="groups-grid-container">
            {Object.keys(groupsData).sort().map((groupName) => {
              const teams = groupsData[groupName];

              return (
                <div key={groupName} className="group-card">
                  <div className="group-card-header">
                    <h3 className="group-title-name">{groupName}</h3>
                    <div className="group-meta-stats">
                      <span>W</span>
                      <span>D</span>
                      <span>L</span>
                      <span>GD</span>
                      <span>Pts</span>
                      <span className="qual-header">Q%</span>
                      <span style={{ textAlign: 'right' }}>Tactics</span>
                    </div>
                  </div>
                  <div className="group-teams-stack">
                    {teams.map((team, index) => {
                      const isProjectedQualify = index < 2 ? 'projected-qualify' : '';
                      const { w, d, l } = getWDL(team.pts);

                      return (
                        <div key={team.code} className={`team-row-card ${isProjectedQualify}`}>
                          <div className="team-info-left" onClick={() => handleOpenModal(team.code)} style={{ cursor: 'pointer' }}>
                            <div className="team-flag-holder" dangerouslySetInnerHTML={{ __html: generateFlagSVG(team.code) }}></div>
                            <div className="team-name-wrapper">
                              <span className="team-display-name">{team.name}</span>
                              <span className="team-ai-pill">AI {team.rating}</span>
                            </div>
                          </div>
                          
                          <div className="team-details-right">
                            <span className="team-metric-val">{w}</span>
                            <span className="team-metric-val">{d}</span>
                            <span className="team-metric-val">{l}</span>
                            <span className="team-metric-val gd-val">{team.gd > 0 ? '+' + team.gd : team.gd}</span>
                            <span className="team-metric-val points-val">{team.pts}</span>
                            <span className="team-metric-val prob-val">{team.qual}%</span>
                            
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                              <button className="btn-analyze-team" onClick={() => handleAnalyzeTeamDossier(team.code)}>
                                <span className="btn-text">Analyze</span> <span>→</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dark Horse Predictions */}
      <section className="dark-horse-section">
        <div className="section-container">
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <div className="header-left">
              <h2 className="section-title" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', marginBottom: '6px', textAlign: 'left' }}>Dark Horse Predictions</h2>
              <p className="section-subtitle" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0, textAlign: 'left' }}>Teams with the highest upset potential according to WCai’s tactical intelligence engine.</p>
            </div>
          </div>

          <div className="dark-horse-grid" id="dark-horse-grid-container">
            {darkHorsesData.map((team) => (
              <div 
                key={team.code} 
                className={`dark-horse-card stadium-${team.stadium}`}
                onClick={() => handleOpenModal(team.code)}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-stadium-bg"></div>
                <div className="card-glow-overlay"></div>
                
                <div className="dh-header">
                  <div className="dh-flag-wrapper" dangerouslySetInnerHTML={{ __html: generateFlagSVG(team.code) }}></div>
                  <span className="dh-upset-badge">Upset potential</span>
                </div>
                
                <div className="dh-title-row">
                  <h3 className="dh-name">{team.name}</h3>
                  <span className="dh-identity-label">{team.style}</span>
                </div>
                
                <p className="dh-summary">{team.summary}</p>
                
                <div className="dh-metrics-stack">
                  <div className="dh-metric-item">
                    <span className="dh-metric-lbl">AI Upset Index</span>
                    <span className="dh-metric-val cyan">{team.upsetIndex}</span>
                  </div>
                  <div className="dh-metric-item">
                    <span className="dh-metric-lbl">Qual Probability</span>
                    <span className="dh-metric-val green">{team.qualProb}</span>
                  </div>
                  <div className="dh-metric-item">
                    <span className="dh-metric-lbl">Key Advantage</span>
                    <span className="dh-metric-val" style={{ fontSize: '0.8rem', fontWeight: 500, textAlign: 'right', maxWidth: '180px' }}>
                      {team.advantage}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Tactical Breakdown Modal */}
      {selectedTeam && (
        <div 
          className={`tactical-modal-overlay ${modalActive ? 'active' : ''}`} 
          id="tactical-profile-modal"
          onClick={(e) => { if (e.target.id === 'tactical-profile-modal') handleCloseModal(); }}
        >
          <div className="tactical-modal-card">
            <button className="modal-close-btn" id="modal-close-btn" aria-label="Close modal" onClick={handleCloseModal}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style={{ width: '18px', height: '18px' }}>
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="modal-header-section">
              <div className="modal-flag-box" dangerouslySetInnerHTML={{ __html: generateFlagSVG(selectedTeam.code) }}></div>
              <div className="modal-title-text">
                <h3 className="modal-team-title" id="modal-team-name">{selectedTeam.name}</h3>
                <span className="modal-tactical-label" id="modal-tactical-style">{selectedTeam.tactical}</span>
              </div>
            </div>

            <div className="modal-grid-layout">
              {/* Left: Squad Ratings */}
              <div className="modal-column-box">
                <h4 className="modal-heading">Squad Ratings</h4>
                <div className="modal-bars-stack" id="modal-squad-ratings">
                  {Object.keys(selectedTeam.stats).map((key) => {
                    const ratingVal = selectedTeam.stats[key];
                    return (
                      <div key={key} className="modal-bar-wrapper">
                        <div className="modal-bar-header">
                          <span>{key} Rating</span>
                          <span>{ratingVal}%</span>
                        </div>
                        <div className="modal-bar-track">
                          <div className="modal-bar-fill" style={{ width: `${ratingVal}%` }}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Center: Attack Focus Zone */}
              <div className="modal-column-box">
                <h4 className="modal-heading">AI Attack Focus zones</h4>
                <div className="heatmap-pitch-small" style={{ height: '180px', width: '100%' }}>
                  <div className="heat-glow-node" id="modal-heat-node-1" style={{ top: '30%', left: '75%', width: '45px', height: '45px', background: 'radial-gradient(circle, rgba(0,209,255,0.3) 0%, transparent 70%)' }}></div>
                  <div className="heat-glow-node" id="modal-heat-node-2" style={{ top: '65%', left: '70%', width: '35px', height: '35px', background: 'radial-gradient(circle, rgba(0,209,255,0.2) 0%, transparent 70%)' }}></div>
                  <span className="pitch-tag" id="modal-pitch-tag" style={{ bottom: '8px', left: '8px' }}>
                    {pitchTagText}
                  </span>
                </div>
              </div>

              {/* Right: Key Players */}
              <div className="modal-column-box">
                <h4 className="modal-heading">AI Key Players</h4>
                <div className="modal-key-players-list" id="modal-key-players">
                  {selectedTeam.players.map((p) => (
                    <div key={p.num} className="key-player-row">
                      <div className="kp-number-circle">{p.num}</div>
                      <div className="kp-details">
                        <span className="kp-name">{p.name}</span>
                        <span className="kp-role">{p.role}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
