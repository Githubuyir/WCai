export const matchesData = [
    {
      id: 1,
      date: "Jun 12 2026, Fri - 00:30 (IST)",
      group: "Group A",
      stadium: "Estadio Azteca, Mexico City",
      stadiumAtmosphere: "azteca",
      team1: { name: "Mexico", code: "MEX", prob: 52 },
      team2: { name: "South Africa", code: "RSA", prob: 24 },
      drawProb: 24,
      xG1: 1.8,
      xG2: 1.1,
      aiConfidence: 78,
      intensity: 82,
      form1: ["W", "D", "W", "W", "L"],
      form2: ["L", "W", "D", "D", "W"],
      insight: "Mexico's high press at altitude expected to disrupt South Africa's midfield build-up.",
      isTopGame: true,
      status: "Completed",
      goals1: 2,
      goals2: 0,
      scorers1: ["Quiñones 9'", "Jiménez 67'"],
      scorers2: [],
      matchNote: "Mexico made light work of a lacklustre South Africa in the opening game of the 2026 World Cup, which featured three straight red cards.",
      predictionVsReality: {
        probabilities: { homeWin: 52, draw: 13, awayWin: 35 },
        aiOutcome: "Prediction Correct",
        why: "Mexico’s pressing advantage and attacking efficiency matched the pre-match model expectation."
      },
      summaryText: "Mexico opened their World Cup campaign with a composed 2-0 win over South Africa. Their defensive shape stayed compact throughout the match, while quick transitions and wide attacking movements created the decisive moments.",
      timelineEvents: [
        { minute: "9'", type: "goal", team: "MEX", player: "Julián Quiñones", detail: "Goal — Mexico" },
        { minute: "50'", type: "red_card", team: "RSA", player: "Yaya Sithole", detail: "Red Card — South Africa" },
        { minute: "67'", type: "goal", team: "MEX", player: "Raúl Jiménez", detail: "Goal — Mexico" },
        { minute: "84'", type: "red_card", team: "RSA", player: "Themba Zwane", detail: "Red Card — South Africa" },
        { minute: "90+2'", type: "red_card", team: "MEX", player: "César Montes", detail: "Red Card — Mexico" },
        { minute: "FT", type: "full_time", score: "Mexico 2-0 South Africa", detail: "FT — Mexico 2-0 South Africa" }
      ],
      statsDetails: [
        { name: "Ball Possession", team1: "60%", team2: "40%", ratio1: 60, ratio2: 40 },
        { name: "Expected Goals (xG)", team1: "1.46", team2: "0.07", ratio1: 95, ratio2: 5 },
        { name: "Total Shots", team1: "16", team2: "3", ratio1: 84, ratio2: 16 },
        { name: "Shots on Target", team1: "4", team2: "2", ratio1: 67, ratio2: 33 },
        { name: "Touches in Opposition Box", team1: "20", team2: "2", ratio1: 91, ratio2: 9 },
        { name: "Big Chances", team1: "2", team2: "0", ratio1: 100, ratio2: 0 },
        { name: "Big Chances Missed", team1: "0", team2: "0", ratio1: 50, ratio2: 50 },
        { name: "Accurate Passes", team1: "467 (90%)", team2: "272 (81%)", ratio1: 63, ratio2: 37 },
        { name: "Yellow Cards", team1: "1", team2: "2", ratio1: 33, ratio2: 67 },
        { name: "Corners", team1: "3", team2: "1", ratio1: 75, ratio2: 25 }
      ],
      lineupDetails: {
        team1: {
          name: "Mexico",
          formation: "4-1-4-1",
          coach: "Javier Aguirre",
          players: [
            { number: 1, name: "Rangel", rating: 7.5, events: [] },
            { number: 15, name: "Reyes", rating: 7.4, events: [] },
            { number: 3, name: "Montes", rating: 6.1, isCaptain: true, events: [{ type: "red_card", minute: "90+2'" }] },
            { number: 5, name: "Vásquez", rating: 7.2, events: [] },
            { number: 23, name: "Gallardo", rating: 7.2, events: [] },
            { number: 6, name: "Lira", rating: 7.9, events: [{ type: "sub_off", minute: "76'" }] },
            { number: 25, name: "Alvarado", rating: 8.2, events: [] },
            { number: 26, name: "Gutiérrez", rating: 6.7, events: [{ type: "yellow_card" }, { type: "sub_off", minute: "66'" }] },
            { number: 8, name: "Fidalgo", rating: 7.2, events: [{ type: "sub_off", minute: "66'" }] },
            { number: 16, name: "Quiñones", rating: 8.8, isPotm: true, events: [{ type: "goal", minute: "9'" }, { type: "sub_off", minute: "79'" }] },
            { number: 9, name: "Jiménez", rating: 8.0, events: [{ type: "goal", minute: "67'" }, { type: "sub_off", minute: "76'" }] }
          ]
        },
        team2: {
          name: "South Africa",
          formation: "5-3-2",
          coach: "Hugo Broos",
          players: [
            { number: 1, name: "Williams", rating: 6.2, isCaptain: true, events: [] },
            { number: 6, name: "Modiba", rating: 5.9, events: [{ type: "sub_off", minute: "76'" }] },
            { number: 14, name: "Mbokazi", rating: 6.1, events: [] },
            { number: 21, name: "Okon", rating: 6.0, events: [] },
            { number: 19, name: "Sibisi", rating: 5.8, events: [{ type: "yellow_card" }] },
            { number: 20, name: "Mudau", rating: 6.5, events: [] },
            { number: 23, name: "Adams", rating: 6.2, events: [{ type: "sub_off", minute: "61'" }] },
            { number: 13, name: "Sithole", rating: 3.5, events: [{ type: "red_card", minute: "50'" }] },
            { number: 4, name: "Mokoena", rating: 6.5, events: [{ type: "yellow_card" }] },
            { number: 9, name: "Foster", rating: 5.6, events: [{ type: "sub_off", minute: "56'" }] },
            { number: 15, name: "Rayners", rating: 5.5, events: [{ type: "sub_off", minute: "76'" }] }
          ]
        }
      },
      substitutesList: {
        team1: [
          { number: 19, name: "Gilberto Mora", rating: 6.3, role: "Midfielder", minute: "66'", events: [] },
          { number: 24, name: "Luis Chávez", rating: 6.5, role: "Midfielder", minute: "66'", events: [] },
          { number: 4, name: "Edson Álvarez", rating: 6.6, role: "Midfielder", minute: "76'", events: [] },
          { number: 14, name: "Armando González", rating: 5.9, role: "Attacker", minute: "76'", events: [] },
          { number: 10, name: "Alexis Vega", rating: 6.0, role: "Attacker", minute: "79'", events: [] }
        ],
        team2: [
          { number: 5, name: "Thalente Mbatha", rating: 6.2, role: "Midfielder", minute: "56'", events: [] },
          { number: 11, name: "Themba Zwane", rating: 4.9, role: "Midfielder", minute: "61'", events: [{ type: "red_card" }] },
          { number: 17, name: "Evidence Makgopa", rating: 6.3, role: "Attacker", minute: "76'", events: [] },
          { number: 7, name: "Oswin Appollis", rating: 6.3, role: "Attacker", minute: "76'", events: [] }
        ]
      },
      playerOfTheMatch: {
        name: "Julián Quiñones",
        rating: 8.8,
        reason: "Goal Scored, Took the most shots (5), Completed the most dribbles (5)."
      },
      tacticalReviews: {
        team1: {
          title: "Mexico: Solid But Proved Inconsistent Against a Low Block",
          positives: [
            "Coached by Javier Aguirre, Mexico controlled possession and looked incredibly dangerous in transition, particularly through Quiñones, who earned Man of the Match honors with 5 shots and 5 successful dribbles.",
            "The early goal was crucial in settling the team’s nerves on opening night."
          ],
          improvements: [
            "Despite enjoying a significant statistical advantage and playing with an extra man for much of the second half, Mexico’s buildup play occasionally lacked creativity against South Africa’s 5-back system.",
            "The attack looked stagnant in patches before Jiménez finally sealed the result.",
            "Furthermore, captain César Montes’ late red card for a reckless challenge deprives the squad of a key defensive starter for their next fixture against South Korea."
          ]
        },
        team2: {
          title: "South Africa: Overwhelmed by Self-Inflicted Errors",
          positives: [
            "South Africa showed defensive resilience in stretches by deploying a five-man backline, which temporarily slowed Mexico’s momentum in the first half.",
            "However, attacking threats were nearly nonexistent as they struggled to test Mexican goalkeeper Raúl Rangel."
          ],
          negatives: [
            "Bafana Bafana was heavily criticized for sloppiness and ill-discipline.",
            "Sithole struggled significantly, turning the ball over for the first goal and later taking a red card as the last defender in the 49th minute.",
            "Themba Zwane was also dismissed late in the game after a VAR review for violent conduct.",
            "Finishing with nine men means South Africa will be critically short-handed for their next game against Czechia."
          ]
        }
      }
    },
    {
      id: 2,
      date: "Jun 12 2026, Fri - 07:30 (IST)",
      group: "Group A",
      stadium: "Estadio Akron, Guadalajara",
      stadiumAtmosphere: "akron",
      team1: { name: "Korea Republic", code: "KOR", prob: 48 },
      team2: { name: "Czech Republic", code: "CZE", prob: 28 },
      drawProb: 24,
      xG1: 1.5,
      xG2: 1.2,
      aiConfidence: 71,
      intensity: 85,
      form1: ["W", "W", "L", "D", "W"],
      form2: ["D", "L", "W", "W", "D"],
      insight: "High-intensity wing transitions from Korea will test Czech Republic's central low block.",
      isTopGame: false,
      status: "Completed",
      goals1: 2,
      goals2: 1,
      scorers1: ["I. Hwang 67'", "Oh 80'"],
      scorers2: ["Krejčí 59'"],
      matchNote: "South Korea 2-1 Czechia: Oh and Hwang strike in impressive comeback win.",
      predictionVsReality: {
        probabilities: { homeWin: 48, draw: 24, awayWin: 28 },
        aiOutcome: "Prediction Correct",
        why: "Korea Republic’s superior possession control, midfield progression, and late attacking substitutions matched the pre-match model’s expectation of a Korean advantage."
      },
      summaryText: "South Korea rallied to defeat the Czech Republic 2-1 in their opening match of the FIFA World Cup. Czech captain Ladislav Krejčí opened the scoring against the run of play in the 59th minute, but Hwang In-beom equalized for South Korea shortly after. Substitute Oh Hyeon-gyu then netted the decisive winner in the 80th minute to secure all three points.",
      timelineEvents: [
        { minute: "59'", type: "goal", team: "CZE", player: "Ladislav Krejčí", detail: "Goal — Czech Republic" },
        { minute: "67'", type: "goal", team: "KOR", player: "Hwang In-beom", detail: "Goal — Korea Republic" },
        { minute: "80'", type: "goal", team: "KOR", player: "Oh Hyeon-gyu", detail: "Goal — Korea Republic" },
        { minute: "FT", type: "full_time", score: "Korea Republic 2-1 Czech Republic", detail: "FT — Korea Republic 2-1 Czech Republic" }
      ],
      statsDetails: [
        { name: "Ball Possession", team1: "62%", team2: "38%", ratio1: 62, ratio2: 38 },
        { name: "Expected Goals (xG)", team1: "2.30", team2: "0.83", ratio1: 73, ratio2: 27 },
        { name: "Total Shots", team1: "15", team2: "7", ratio1: 68, ratio2: 32 },
        { name: "Shots on Target", team1: "6", team2: "4", ratio1: 60, ratio2: 40 },
        { name: "Touches in Opposition Box", team1: "24", team2: "12", ratio1: 67, ratio2: 33 },
        { name: "Big Chances", team1: "4", team2: "1", ratio1: 80, ratio2: 20 },
        { name: "Big Chances Missed", team1: "2", team2: "0", ratio1: 100, ratio2: 0 },
        { name: "Accurate Passes", team1: "469 (87%)", team2: "230 (70%)", ratio1: 67, ratio2: 33 },
        { name: "Yellow Cards", team1: "1", team2: "0", ratio1: 100, ratio2: 0 },
        { name: "Corners", team1: "4", team2: "5", ratio1: 44, ratio2: 56 }
      ],
      lineupDetails: {
        team1: {
          name: "Korea Republic",
          formation: "4-2-3-1",
          coach: "Myung-Bo Hong",
          players: [
            { number: 1, name: "Kim", rating: 7.7, events: [] },
            { number: 4, name: "Kim", rating: 7.4, events: [] },
            { number: 22, name: "Seol", rating: 6.9, events: [] },
            { number: 2, name: "Lee", rating: 7.1, events: [] },
            { number: 3, name: "Lee", rating: 7.6, events: [{ type: "yellow_card" }] },
            { number: 13, name: "Lee", rating: null, events: [{ type: "sub_off", minute: "69'" }] },
            { number: 10, name: "Lee", rating: 7.4, events: [{ type: "sub_off", minute: "62'" }] },
            { number: 8, name: "Paik", rating: 7.3, events: [{ type: "sub_off", minute: "84'" }] },
            { number: 6, name: "Hwang", rating: 8.9, isPotm: true, events: [{ type: "goal", minute: "67'" }, { type: "assist" }, { type: "sub_off", minute: "84'" }] },
            { number: 7, name: "Son", rating: 6.9, isCaptain: true, events: [] },
            { number: 19, name: "Lee", rating: 8.4, events: [] }
          ]
        },
        team2: {
          name: "Czech Republic",
          formation: "3-4-2-1",
          coach: "Miroslav Koubek",
          players: [
            { number: 1, name: "Kovář", rating: 6.8, events: [] },
            { number: 4, name: "Hranáč", rating: 5.7, events: [] },
            { number: 6, name: "Chaloupek", rating: 5.7, events: [] },
            { number: 5, name: "Coufal", rating: 6.9, events: [{ type: "assist" }] },
            { number: 17, name: "Provod", rating: 6.8, events: [{ type: "sub_off", minute: "63'" }] },
            { number: 22, name: "Souček", rating: 6.1, events: [] },
            { number: 24, name: "Sojka", rating: 6.6, events: [{ type: "sub_off", minute: "84'" }] },
            { number: 20, name: "Zelený", rating: 6.8, events: [] },
            { number: 15, name: "Šulc", rating: 7.2, events: [{ type: "sub_off", minute: "63'" }] },
            { number: 10, name: "Schick", rating: 5.9, events: [{ type: "sub_off", minute: "63'" }] },
            { number: 7, name: "Krejčí", rating: 7.4, isCaptain: true, events: [{ type: "goal", minute: "59'" }] }
          ]
        }
      },
      substitutesList: {
        team1: [
          { number: 11, name: "Hee-Chan Hwang", rating: 6.5, role: "Attacker", minute: "62'", events: [] },
          { number: 18, name: "Hyun-Gyu Oh", rating: 7.5, role: "Attacker", minute: "69'", events: [{ type: "goal", minute: "80'" }] },
          { number: 25, name: "Ji-Sung Eom", rating: 6.6, role: "Attacker", minute: "69'", events: [] },
          { number: 24, name: "Jin-Gyu Kim", rating: null, role: "Midfielder", minute: "84'", events: [] },
          { number: 16, name: "Jin-Seob Park", rating: null, role: "Midfielder", minute: "84'", events: [] }
        ],
        team2: [
          { number: 9, name: "Adam Hložek", rating: 6.1, role: "Midfielder", minute: "63'", events: [] },
          { number: 18, name: "Michal Sadílek", rating: 6.0, role: "Midfielder", minute: "63'", events: [] },
          { number: 19, name: "Tomáš Chorý", rating: 5.9, role: "Attacker", minute: "63'", events: [] },
          { number: 13, name: "Mojmír Chytil", rating: null, role: "Attacker", minute: "84'", events: [] }
        ]
      },
      playerOfTheMatch: {
        name: "In-Beom Hwang",
        rating: 8.9,
        reason: "A goal and an assist, joint-most touches in the opposition box (5), and the most touches overall (93)."
      },
      tacticalReviews: {
        team1: {
          title: "Korea Republic: Creative Resilience Overcomes Physical Strain",
          positives: [
            "Coached by Hong Myung-bo, Korea Republic showed strong emotional and structural discipline after falling behind against a highly physical Czech side.",
            "They dominated possession with 62% and looked secure building through the lines, supported by a controlled midfield structure.",
            "Hwang In-beom was the catalyst, scoring the equalizer and delivering the decisive assist.",
            "Hong Myung-bo’s decision to bring on Oh Hyeon-gyu proved decisive, as his fresh vertical runs disrupted a tiring Czech defence and produced the winning goal."
          ],
          improvements: [
            "Despite controlling the tempo, Korea Republic struggled against physical and direct aerial sequences.",
            "The back line looked uncomfortable during chaotic second-ball situations inside their own box.",
            "The starting front line lacked vertical penetration for long periods, with Son Heung-min heavily marked and isolated before the second-half tactical changes opened the game."
          ]
        },
        team2: {
          title: "Czech Republic: Rigid and Direct But Lacked Late-Game Adaptability",
          positives: [
            "Coached by Ivan Hašek, Czech Republic executed a disciplined defensive plan for the first hour.",
            "They clogged central channels effectively and limited Korea Republic’s attacking rhythm early in the match.",
            "Their direct aerial approach paid off in the 59th minute when Ladislav Krejčí scored from a Coufal long-throw sequence.",
            "The midfield structure led by Tomáš Souček and Alexandr Sojka was effective early at disrupting central transitions and winning second balls."
          ],
          improvements: [
            "Once Korea Republic equalized, Czech Republic lacked technical nuance and alternative tactical ideas.",
            "Their heavy reliance on direct long balls left Patrik Schick isolated and limited their attacking quality.",
            "As the match progressed, the wing-backs failed to sustain pressure and the defensive line dropped too deep.",
            "Korea Republic’s late substitutes exploited the deeper block and changed the rhythm of the match."
          ]
        }
      }
    },
    {
      id: 3,
      date: "Jun 13 2026, Sat - 00:30 (IST)",
      group: "Group B",
      stadium: "BMO Field, Toronto",
      stadiumAtmosphere: "bmo",
      team1: { name: "Canada", code: "CAN", prob: 45 },
      team2: { name: "Bosnia and Herzegovina", code: "BIH", prob: 31 },
      drawProb: 24,
      xG1: 1.23,
      xG2: 0.96,
      aiConfidence: 65,
      intensity: 79,
      form1: ["L", "W", "W", "D", "L"],
      form2: ["W", "L", "D", "L", "W"],
      insight: "Canada's home support and direct vertical attacking lines favor their opening match.",
      isTopGame: false,
      status: "Completed",
      goals1: 1,
      goals2: 1,
      scorers1: ["Larin 78'"],
      scorers2: ["Lukić 21'"],
      matchNote: "Canada have avoided defeat for the first time at the World Cup, with super-sub Cyle Larin getting the equaliser against Bosnia-Herzegovina.",
      predictionVsReality: {
        probabilities: { homeWin: 45, draw: 24, awayWin: 31 },
        aiOutcome: "Close Prediction",
        why: "Canada’s territorial dominance matched the model’s expectation, but Bosnia & Herzegovina’s set-piece threat and compact defensive shape turned the match into a balanced result."
      },
      summaryText: "Co-host Canada salvaged a 1-1 draw against Bosnia and Herzegovina in their opening Group B match in Toronto, securing the country's first-ever point in a World Cup finals. Bosnia took the lead in the 21st minute with a Jovo Lukić header, but Canadian substitute Cyle Larin quickly found the equalizer in the 78th minute.",
      timelineEvents: [
        { minute: "21'", type: "goal", team: "BIH", player: "Jovo Lukić", detail: "Goal — Bosnia & Herzegovina" },
        { minute: "78'", type: "goal", team: "CAN", player: "Cyle Larin", detail: "Goal — Canada" },
        { minute: "FT", type: "full_time", score: "Canada 1-1 Bosnia & Herzegovina", detail: "FT — Canada 1-1 Bosnia & Herzegovina" }
      ],
      statsDetails: [
        { name: "Ball Possession", team1: "61%", team2: "39%", ratio1: 61, ratio2: 39 },
        { name: "Expected Goals (xG)", team1: "1.23", team2: "0.96", ratio1: 56, ratio2: 44 },
        { name: "Total Shots", team1: "13", team2: "8", ratio1: 62, ratio2: 38 },
        { name: "Shots on Target", team1: "4", team2: "3", ratio1: 57, ratio2: 43 },
        { name: "Touches in Opposition Box", team1: "37", team2: "15", ratio1: 71, ratio2: 29 },
        { name: "Big Chances", team1: "2", team2: "2", ratio1: 50, ratio2: 50 },
        { name: "Big Chances Missed", team1: "2", team2: "1", ratio1: 67, ratio2: 33 },
        { name: "Accurate Passes", team1: "310 (74%)", team2: "172 (63%)", ratio1: 64, ratio2: 36 },
        { name: "Yellow Cards", team1: "2", team2: "3", ratio1: 40, ratio2: 60 },
        { name: "Corners", team1: "9", team2: "4", ratio1: 69, ratio2: 31 }
      ],
      lineupDetails: {
        team1: {
          name: "Canada",
          formation: "4-4-2",
          coach: "Jesse Marsch",
          players: [
            { number: 16, name: "Crépeau", rating: 7.5, events: [] },
            { number: 2, name: "Johnston", rating: 7.2, events: [{ type: "yellow_card" }] },
            { number: 4, name: "De Fougerolles", rating: 7.1, events: [{ type: "yellow_card" }] },
            { number: 13, name: "Cornelius", rating: 7.4, events: [] },
            { number: 22, name: "Laryea", rating: 8.2, events: [] },
            { number: 17, name: "Buchanan", rating: 5.7, events: [{ type: "sub_off", minute: "61'" }] },
            { number: 8, name: "Koné", rating: 6.0, events: [] },
            { number: 7, name: "Eustaquio", rating: 7.5, isCaptain: true, events: [{ type: "sub_off", minute: "90'" }] },
            { number: 11, name: "Millar", rating: 6.8, events: [{ type: "sub_off", minute: "61'" }] },
            { number: 10, name: "David", rating: 6.6, events: [{ type: "sub_off", minute: "61'" }] },
            { number: 12, name: "Oluwaseyi", rating: 6.6, events: [{ type: "sub_off", minute: "76'" }] }
          ]
        },
        team2: {
          name: "Bosnia & Herzegovina",
          formation: "4-4-2",
          coach: "Sergej Barbarez",
          players: [
            { number: 1, name: "Vasilj", rating: 6.8, events: [] },
            { number: 5, name: "Kolašinac", rating: 8.0, isCaptain: true, events: [{ type: "injury" }, { type: "sub_off", minute: "83'" }] },
            { number: 15, name: "Memić", rating: 6.1, events: [{ type: "sub_off", minute: "74'" }] },
            { number: 4, name: "Muharemović", rating: 8.3, events: [] },
            { number: 18, name: "Katić", rating: 8.4, events: [{ type: "yellow_card" }] },
            { number: 13, name: "Bašić", rating: 7.2, events: [{ type: "yellow_card" }, { type: "sub_off", minute: "61'" }] },
            { number: 6, name: "Tahirović", rating: 6.6, events: [] },
            { number: 25, name: "Lukić", rating: 8.0, events: [{ type: "goal", minute: "21'" }, { type: "yellow_card" }] },
            { number: 10, name: "Demirović", rating: 6.6, events: [{ type: "yellow_card" }] },
            { number: 20, name: "Bajraktarević", rating: 6.3, events: [{ type: "sub_off", minute: "74'" }] },
            { number: 7, name: "Dedić", rating: 7.0, events: [] }
          ]
        }
      },
      substitutesList: {
        team1: [
          { number: 20, name: "Ali Ahmed", rating: 6.2, role: "Attacker", minute: "61'", events: [] },
          { number: 14, name: "Jacob Shaffelburg", rating: 6.1, role: "Attacker", minute: "61'", events: [] },
          { number: 24, name: "Promise David", rating: 6.6, role: "Attacker", minute: "61'", events: [{ type: "assist" }] },
          { number: 9, name: "Cyle Larin", rating: 7.5, role: "Attacker", minute: "76'", events: [{ type: "goal", minute: "78'" }] },
          { number: 21, name: "Jonathan Osorio", rating: null, role: "Midfielder", minute: "90'", events: [] }
        ],
        team2: [
          { number: 8, name: "Armin Gigović", rating: 6.9, role: "Midfielder", minute: "61'", events: [] },
          { number: 9, name: "Samed Baždar", rating: 6.0, role: "Attacker", minute: "61'", events: [] },
          { number: 14, name: "Ivan Šunjić", rating: 6.2, role: "Midfielder", minute: "74'", events: [] },
          { number: 19, name: "Kerim Alajbegović", rating: 6.3, role: "Attacker", minute: "74'", events: [] },
          { number: 17, name: "Dženis Burnić", rating: null, role: "Midfielder", minute: "83'", events: [] }
        ]
      },
      playerOfTheMatch: {
        name: "Ismael Koné",
        rating: 7.0,
        reason: "Completed the joint-most passes (50) and showed impressive midfield control."
      },
      tacticalReviews: {
        team1: {
          title: "Canada: High-Octane Press Rescues Historic Point Under Heavy Strain",
          positives: [
            "Coached by Jesse Marsch, Canada displayed remarkable grit to bounce back from an early deficit and claim the first World Cup point in their men's program history.",
            "Operating in an aggressive 4-4-2 setup, they dominated territory with 61% possession and pinned the visitors back with an intense front-foot pressing style.",
            "The second-half tactical switches completely changed the match, with Promise David adding directness and Cyle Larin scoring the historic equalizer shortly after coming on."
          ],
          improvements: [
            "Despite the energized home crowd at Toronto Stadium, Canada’s tactical setup looked compromised without the vertical pace of the injured Alphonso Davies.",
            "Tajon Buchanan and Liam Millar struggled to break down Bosnia’s rigid low block, often funnelling play into crowded central zones.",
            "Jonathan David was starved of clean service for long stretches.",
            "Defensively, Canada looked vulnerable from static situations, losing markers on the short-corner sequence that led to Bosnia’s opening goal.",
            "Canada also failed to capitalize on nine corner kicks, showing a clear need to improve offensive dead-ball execution."
          ]
        },
        team2: {
          title: "Bosnia & Herzegovina: Rigid, Direct, and Relentless Set-Piece Engineers",
          positives: [
            "Coached by Sergej Barbarez, Bosnia & Herzegovina executed a strong blueprint for frustrating a tournament co-host on opening night.",
            "Their disciplined and compact 4-4-2 shape narrowed the pitch, forced Canada into low-percentage wide areas, and limited central transition threats.",
            "Their physical aerial plan paid off in the 21st minute when Sead Kolašinac met an Ivan Bašić corner with a near-post flick, allowing Jovo Lukić to head home from close range.",
            "Benjamin Tahirović was excellent at anchoring the midfield pivot and breaking up waves of Canadian buildup."
          ],
          improvements: [
            "Bosnia lacked the tactical flexibility and technical nuance to relieve pressure once Canada began overloading the half-spaces.",
            "Their reliance on bypass-midfield long balls left Ermedin Demirović isolated for long stretches.",
            "They generated almost no sustained possession phases in the final hour.",
            "As fatigue set in during the final 20 minutes, the side dropped into a desperate, reactive low block.",
            "The injury to captain Sead Kolašinac further weakened the defensive structure and opened space for Canada’s late equalizer."
          ]
        }
      }
    },
    {
      id: 4,
      date: "Jun 13 2026, Sat - 06:30 (IST)",
      group: "Group D",
      stadium: "SoFi Stadium, Inglewood, California",
      stadiumAtmosphere: "sofi",
      team1: { name: "USA", code: "USA", prob: 62 },
      team2: { name: "Paraguay", code: "PAR", prob: 18 },
      drawProb: 20,
      xG1: 2.1,
      xG2: 0.9,
      aiConfidence: 85,
      intensity: 88,
      form1: ["W", "W", "W", "L", "W"],
      form2: ["D", "D", "L", "W", "L"],
      insight: "USA's fluid front three and progressive counter-press expected to dominate Paraguay.",
      isTopGame: true,
      status: "Completed",
      goals1: 4,
      goals2: 1,
      scorers1: ["Bobadilla 7' (OG)", "Balogun 31'", "Balogun 45+5'", "Reyna 90+8'"],
      scorers2: ["Mauricio 73'"],
      matchNote: "Balogun stars as Pochettino's men produce statement win against Paraguay. It was a perfect start for the US campaign.",
      predictionVsReality: {
        probabilities: { homeWin: 62, draw: 20, awayWin: 18 },
        aiOutcome: "Prediction Correct",
        why: "USA’s pressing intensity, midfield control, and attacking depth matched the pre-match model’s expectation of a strong American advantage."
      },
      summaryText: "The United States men's national team dominated Paraguay with a 4-1 victory in their opening match of the 2026 FIFA World Cup. A relentless first half saw the U.S. take an early lead via a Paraguay own goal, followed by a brace from striker Folarin Balogun. Paraguay substitute Mauricio clawed a goal back in the second half, but Gio Reyna capped off the dream performance with a stoppage-time strike to seal the win.",
      timelineEvents: [
        { minute: "7'", type: "goal", team: "USA", player: "Bobadilla (OG)", detail: "Goal — USA — Bobadilla own goal" },
        { minute: "31'", type: "goal", team: "USA", player: "Folarin Balogun", detail: "Goal — USA — Balogun" },
        { minute: "45+5'", type: "goal", team: "USA", player: "Folarin Balogun", detail: "Goal — USA — Balogun" },
        { minute: "73'", type: "goal", team: "PAR", player: "Mauricio", detail: "Goal — Paraguay — Mauricio" },
        { minute: "90+8'", type: "goal", team: "USA", player: "Giovanni Reyna", detail: "Goal — USA — Reyna" },
        { minute: "FT", type: "full_time", score: "USA 4-1 Paraguay", detail: "FT — USA 4-1 Paraguay" }
      ],
      statsDetails: [
        { name: "Ball Possession", team1: "65%", team2: "35%", ratio1: 65, ratio2: 35 },
        { name: "Expected Goals (xG)", team1: "1.34", team2: "0.47", ratio1: 74, ratio2: 26 },
        { name: "Total Shots", team1: "16", team2: "9", ratio1: 64, ratio2: 36 },
        { name: "Shots on Target", team1: "6", team2: "1", ratio1: 86, ratio2: 14 },
        { name: "Touches in Opposition Box", team1: "53", team2: "9", ratio1: 85, ratio2: 15 },
        { name: "Big Chances", team1: "4", team2: "1", ratio1: 80, ratio2: 20 },
        { name: "Big Chances Missed", team1: "2", team2: "0", ratio1: 100, ratio2: 0 },
        { name: "Accurate Passes", team1: "510 (85%)", team2: "230 (72%)", ratio1: 69, ratio2: 31 },
        { name: "Yellow Cards", team1: "1", team2: "5", ratio1: 17, ratio2: 83 },
        { name: "Corners", team1: "3", team2: "1", ratio1: 75, ratio2: 25 }
      ],
      lineupDetails: {
        team1: {
          name: "USA",
          formation: "4-2-3-1",
          coach: "Mauricio Pochettino",
          players: [
            { number: 24, name: "Freese", rating: 6.2, events: [] },
            { number: 16, name: "Freeman", rating: 8.1, events: [{ type: "assist" }] },
            { number: 3, name: "Richards", rating: 7.2, events: [] },
            { number: 13, name: "Ream", rating: 7.5, isCaptain: true, events: [] },
            { number: 5, name: "Robinson", rating: 7.5, events: [] },
            { number: 4, name: "Adams", rating: 7.8, events: [{ type: "yellow_card" }] },
            { number: 8, name: "McKennie", rating: 7.4, events: [] },
            { number: 17, name: "Tillman", rating: 8.1, events: [{ type: "assist" }, { type: "sub_off", minute: "82'" }] },
            { number: 10, name: "Pulisic", rating: 7.8, events: [{ type: "assist" }, { type: "sub_off", minute: "46'" }] },
            { number: 20, name: "Balogun", rating: 8.9, isPotm: true, events: [{ type: "goal", minute: "31'" }, { type: "goal", minute: "45+5'" }, { type: "injury" }, { type: "sub_off", minute: "72'" }] },
            { number: 2, name: "Dest", rating: 6.9, events: [{ type: "sub_off", minute: "72'" }] }
          ]
        },
        team2: {
          name: "Paraguay",
          formation: "4-2-3-1",
          coach: "Gustavo Alfaro",
          players: [
            { number: 12, name: "Gill", rating: 5.5, events: [] },
            { number: 6, name: "Alonso", rating: 5.3, events: [{ type: "yellow_card" }] },
            { number: 3, name: "Alderete", rating: 5.5, events: [] },
            { number: 15, name: "Gómez", rating: 5.2, isCaptain: true, events: [] },
            { number: 4, name: "Cáceres", rating: 6.3, events: [{ type: "yellow_card" }, { type: "sub_off", minute: "79'" }] },
            { number: 8, name: "Gómez", rating: 6.5, events: [{ type: "yellow_card" }, { type: "sub_off", minute: "80'" }] },
            { number: 14, name: "Cubas", rating: 6.3, events: [] },
            { number: 10, name: "Almirón", rating: 7.1, events: [{ type: "yellow_card" }, { type: "sub_off", minute: "79'" }] },
            { number: 16, name: "Bobadilla", rating: 4.9, events: [{ type: "own_goal", minute: "7'" }, { type: "sub_off", minute: "46'" }] },
            { number: 19, name: "Enciso", rating: 7.8, events: [{ type: "assist" }] },
            { number: 9, name: "Sanabria", rating: 5.7, events: [{ type: "sub_off", minute: "62'" }] }
          ]
        }
      },
      substitutesList: {
        team1: [
          { number: 14, name: "Sebastian Berhalter", rating: 6.7, role: "Midfielder", minute: "46'", events: [] },
          { number: 21, name: "Timothy Weah", rating: 6.2, role: "Midfielder", minute: "72'", events: [] },
          { number: 9, name: "Ricardo Pepi", rating: 6.1, role: "Attacker", minute: "72'", events: [] },
          { number: 7, name: "Giovanni Reyna", rating: null, role: "Midfielder", minute: "82'", events: [{ type: "goal", minute: "90+8'" }] }
        ],
        team2: [
          { number: 11, name: "Mauricio", rating: 7.6, role: "Midfielder", minute: "46'", events: [{ type: "goal", minute: "73'" }] },
          { number: 18, name: "Álex Arce", rating: 5.9, role: "Attacker", minute: "62'", events: [{ type: "yellow_card" }] },
          { number: 2, name: "Gustavo Velázquez", rating: 6.0, role: "Defender", minute: "79'", events: [] },
          { number: 7, name: "Ramón Sosa", rating: 6.3, role: "Attacker", minute: "79'", events: [] },
          { number: 17, name: "Alejandro Romero", rating: 6.2, role: "Midfielder", minute: "80'", events: [] }
        ]
      },
      playerOfTheMatch: {
        name: "F. Balogun",
        rating: 8.9,
        reason: "Scored two goals, had the most touches in the opposition box (11), and took the joint-most shots (5)."
      },
      tacticalReviews: {
        team1: {
          title: "USA: Overwhelming Press Blunts South American Counter-Threat",
          positives: [
            "Coached by Mauricio Pochettino, the United States opened their campaign with a dominant 4-1 victory, executing a high-octane tactical blueprint that overwhelmed Paraguay early.",
            "Operating in a fluid 4-2-3-1 system, USA aggressively forced central turnovers through Tyler Adams and Weston McKennie, cutting off Paraguay’s supply lines.",
            "The relentless mid-block press forced an own goal inside seven minutes and allowed Christian Pulisic to drop deep, drag double-teams, and expose Paraguay’s defensive line.",
            "Folarin Balogun showed elite off-the-ball spatial intelligence, scoring a superb first-half brace by finding pockets between the centre-backs.",
            "Pochettino’s substitutions helped maintain late-game momentum, ending with Gio Reyna’s stoppage-time goal."
          ],
          improvements: [
            "Despite an assertive statistical display with 65% possession, the American backline showed brief signs of complacency during sustained defensive transitions.",
            "In the second half, Chris Richards and Tim Ream struggled to handle secondary movements after dropping deep, allowing Paraguay to pull a goal back in the 73rd minute.",
            "Managing high-friction physical altercations remains a discipline concern, as late emotional flare-ups occasionally distracted the tactical block.",
            "Against stronger opponents, similar moments could create structural errors and unnecessary pressure."
          ]
        },
        team2: {
          title: "Paraguay: Structural Breakdown Exposed by Direct Mobility",
          positives: [
            "Coached by Gustavo Alfaro, Paraguay initially tried to absorb possession and transition quickly through Julio Enciso and Miguel Almirón.",
            "Tactical changes at half-time briefly stabilized the team after a difficult opening period.",
            "Introducing Maurício added direct vertical running and changed the rhythm of the attack.",
            "The shift paid off in the 73rd minute when Enciso played a line-breaking pass for Maurício to finish clinically.",
            "Goalkeeper Orlando Gill fought hard under pressure, making key saves to prevent the scoreline from becoming even heavier."
          ],
          negatives: [
            "Paraguay’s low-block plan backfired almost immediately as the midfield double-pivot failed to track lateral movement, creating chaos before the early own goal.",
            "Antonio Sanabria was isolated as a lone target man and was cut off by the American press.",
            "The back four lacked the mobility to handle quick transitions, repeatedly giving Pulisic and Tillman space between the lines.",
            "The team lacked late-game stamina and discipline, collecting five yellow cards and losing structure in stoppage time."
          ]
        }
      }
    },
    {
      id: 5,
      date: "Jun 14 2026, Sun - 00:30 (IST)",
      group: "Group B",
      stadium: "Levi's Stadium, Santa Clara, California",
      stadiumAtmosphere: "levis",
      team1: { name: "Qatar", code: "QAT", prob: 25 },
      team2: { name: "Switzerland", code: "SUI", prob: 55 },
      drawProb: 20,
      xG1: 0.8,
      xG2: 1.9,
      aiConfidence: 74,
      intensity: 76,
      form1: ["L", "D", "W", "L", "L"],
      form2: ["W", "W", "D", "W", "D"],
      insight: "Switzerland's disciplined zonal structure should stifle Qatar's central counters.",
      isTopGame: false,
      status: "Completed",
      goals1: 1,
      goals2: 1,
      scorers1: ["Muheim 90+4' (OG)"],
      scorers2: ["Embolo 17' (Pen)"],
      matchNote: "Qatar have won their first point at the World Cup, clinching a draw against Switzerland. Khoukhi snatches dramatic equaliser in stoppage time.",
      predictionVsReality: {
        probabilities: { homeWin: 25, draw: 20, awayWin: 55 },
        aiOutcome: "Prediction Missed",
        why: "Switzerland’s dominance matched the model’s expectation, but Qatar’s defensive resilience and late set-piece pressure turned the match into a draw."
      },
      summaryText: "Switzerland heavily dominated possession and took a 17th-minute lead through a Breel Embolo penalty. Despite waves of Swiss attacks, Qatar stayed resilient and struck a shocking equaliser in the 94th minute. The late goal—initially credited to captain Boualem Khoukhi's header but later confirmed as a Miro Muheim own goal—secured Qatar's first-ever World Cup point.",
      timelineEvents: [
        { minute: "17'", type: "goal", team: "SUI", player: "Breel Embolo", detail: "Goal — Switzerland — Embolo penalty" },
        { minute: "90+4'", type: "own_goal", team: "QAT", player: "Miro Muheim", detail: "Goal — Qatar — Muheim own goal" },
        { minute: "FT", type: "full_time", score: "Qatar 1-1 Switzerland", detail: "FT — Qatar 1-1 Switzerland" }
      ],
      statsDetails: [
        { name: "Ball Possession", team1: "32%", team2: "68%", ratio1: 32, ratio2: 68 },
        { name: "Expected Goals (xG)", team1: "0.60", team2: "3.20", ratio1: 16, ratio2: 84 },
        { name: "Total Shots", team1: "6", team2: "26", ratio1: 19, ratio2: 81 },
        { name: "Shots on Target", team1: "3", team2: "7", ratio1: 30, ratio2: 70 },
        { name: "Touches in Opposition Box", team1: "8", team2: "42", ratio1: 16, ratio2: 84 },
        { name: "Big Chances", team1: "1", team2: "6", ratio1: 14, ratio2: 86 },
        { name: "Big Chances Missed", team1: "1", team2: "5", ratio1: 17, ratio2: 83 },
        { name: "Accurate Passes", team1: "200 (72%)", team2: "527 (91%)", ratio1: 28, ratio2: 72 },
        { name: "Yellow Cards", team1: "2", team2: "1", ratio1: 67, ratio2: 33 },
        { name: "Corners", team1: "3", team2: "10", ratio1: 23, ratio2: 77 }
      ],
      lineupDetails: {
        team1: {
          name: "Qatar",
          formation: "4-3-3",
          coach: "Tintín Márquez",
          players: [
            { number: 1, name: "Abunada", rating: 7.7, events: [{ type: "yellow_card" }] },
            { number: 13, name: "Al Oui", rating: 6.4, events: [{ type: "sub_off", minute: "60'" }] },
            { number: 2, name: "Miguel", rating: 7.3, events: [] },
            { number: 16, name: "Khoukhi", rating: 6.9, isCaptain: true, events: [] },
            { number: 14, name: "Elamin", rating: 7.2, events: [] },
            { number: 23, name: "Madibo", rating: 6.4, events: [{ type: "sub_off", minute: "78'" }] },
            { number: 5, name: "Gaber", rating: 6.1, events: [{ type: "yellow_card" }, { type: "sub_off", minute: "60'" }] },
            { number: 8, name: "Junior", rating: 6.3, events: [{ type: "sub_off", minute: "88'" }] },
            { number: 4, name: "Laye", rating: 6.8, events: [] },
            { number: 11, name: "Afif", rating: 6.9, events: [] },
            { number: 15, name: "Abdurisag", rating: 6.8, events: [{ type: "sub_off", minute: "60'" }] }
          ]
        },
        team2: {
          name: "Switzerland",
          formation: "3-4-2-1",
          coach: "Murat Yakin",
          players: [
            { number: 1, name: "Kobel", rating: 7.5, events: [] },
            { number: 5, name: "Akanji", rating: 7.4, events: [] },
            { number: 4, name: "Elvedi", rating: 7.3, events: [] },
            { number: 11, name: "Ndoye", rating: 7.2, events: [{ type: "sub_off", minute: "65'" }] },
            { number: 20, name: "Aebischer", rating: 7.2, events: [{ type: "sub_off", minute: "65'" }] },
            { number: 10, name: "Xhaka", rating: 7.3, isCaptain: true, events: [] },
            { number: 8, name: "Freuler", rating: 7.1, events: [{ type: "sub_off", minute: "89'" }] },
            { number: 13, name: "Rodríguez", rating: 7.8, events: [{ type: "sub_off", minute: "89'" }] },
            { number: 17, name: "Vargas", rating: 8.1, isHighlight: true, events: [{ type: "sub_off", minute: "79'" }] },
            { number: 7, name: "Embolo", rating: 8.0, events: [{ type: "goal", minute: "17'" }] },
            { number: 6, name: "Zakaria", rating: 7.5, events: [{ type: "yellow_card" }] }
          ]
        }
      },
      substitutesList: {
        team1: [
          { number: 20, name: "Ahmed Fathi", rating: 6.9, role: "Midfielder", minute: "60'", events: [] },
          { number: 12, name: "Karim Boudiaf", rating: 6.3, role: "Midfielder", minute: "60'", events: [] },
          { number: 7, name: "Ahmed Alaaeldin", rating: 6.4, role: "Attacker", minute: "60'", events: [] },
          { number: 26, name: "Mohamed Al Mannai", rating: 5.9, role: "Midfielder", minute: "78'", events: [] },
          { number: 10, name: "Hassan Al Haidos", rating: null, role: "Attacker", minute: "88'", events: [] }
        ],
        team2: [
          { number: 22, name: "Fabian Rieder", rating: 6.1, role: "Midfielder", minute: "65'", events: [] },
          { number: 9, name: "Johan Manzambi", rating: 5.9, role: "Midfielder", minute: "65'", events: [] },
          { number: 23, name: "Zeki Amdouni", rating: 6.6, role: "Attacker", minute: "79'", events: [] },
          { number: 14, name: "Ardon Jashari", rating: null, role: "Midfielder", minute: "89'", events: [] },
          { number: 2, name: "Miro Muheim", rating: null, role: "Midfielder", minute: "89'", events: [{ type: "own_goal", minute: "90+4'" }] }
        ]
      },
      playerOfTheMatch: {
        name: "Mahmud Abunada",
        rating: 7.7,
        reason: "Top saves and solid goalkeeping under heavy Swiss pressure."
      },
      tacticalReviews: {
        team1: {
          title: "Qatar: Resolute Low Block Secures a Historic Stoppage-Time Point",
          positives: [
            "Coached by Tintín Márquez, Qatar executed a disciplined “hang around” game plan that ultimately secured the nation’s first-ever FIFA World Cup point.",
            "Set up in a defensively minded 4-2-3-1 / 4-3-3 shape, Qatar absorbed a relentless wave of Swiss pressure while staying compact.",
            "Goalkeeper Mahmud Abunada recovered strongly after conceding an early penalty, producing crucial saves to keep Qatar within reach.",
            "Pedro Miguel and Ayoub Al-Oui repeatedly protected the box, with Qatar’s defensive unit blocking wave after wave of Swiss attacks.",
            "The dramatic equaliser arrived in stoppage time after late pressure from Qatar forced Switzerland into a costly own goal."
          ],
          improvements: [
            "Qatar’s defensive resilience was impressive, but their tactical setup left them suffocated for long stretches.",
            "They registered only 32% possession and six total shots compared to Switzerland’s 26, struggling to progress the ball beyond their own half.",
            "Akram Afif was forced too deep to support the defensive shell, limiting his influence in the final third.",
            "Qatar’s transition play lacked speed and accuracy, with rare attacking chances not converted cleanly.",
            "They will need a more reliable outlet if they want to compete against stronger pressing sides in the next fixtures."
          ]
        },
        team2: {
          title: "Switzerland: Utter Positional Dominance Unraveled by Wayward Finishing",
          positives: [
            "Coached by Murat Yakin, Switzerland dictated the entire match through an aggressive, fluid 3-4-3 structure.",
            "They dominated the ball with 68% possession and produced 26 total shots with a massive 3.20 xG.",
            "Granit Xhaka controlled the tempo from deep, while Dan Ndoye and Rubén Vargas repeatedly attacked wide channels and overloaded the box.",
            "Switzerland’s pressing paid off early when Breel Embolo converted a 17th-minute penalty.",
            "Manuel Akanji and Nico Elvedi stepped high to prevent Qatar from building sustained counterattacks."
          ],
          improvements: [
            "Switzerland’s inability to kill off a match they dominated is a major warning sign.",
            "Despite creating several premium chances, their finishing was wasteful and allowed Qatar to stay alive.",
            "The tempo dropped late in the match, with Switzerland becoming too casual instead of pushing for a second goal.",
            "Under the late pressure, the defensive structure switched off at the back post.",
            "Miro Muheim’s own goal in stoppage time turned a dominant performance into two dropped points."
          ]
        }
      }
    },
    {
      id: 6,
      date: "Jun 14 2026, Sun - 03:30 (IST)",
      group: "Group C",
      stadium: "MetLife Stadium, East Rutherford, New Jersey",
      stadiumAtmosphere: "metlife",
      team1: { name: "Brazil", code: "BRA", prob: 71 },
      team2: { name: "Morocco", code: "MAR", prob: 14 },
      drawProb: 15,
      xG1: 2.4,
      xG2: 0.8,
      aiConfidence: 89,
      intensity: 90,
      form1: ["W", "W", "W", "W", "D"],
      form2: ["W", "D", "L", "W", "W"],
      insight: "Brazil's overload in the half-spaces will challenge Morocco's organized double pivot.",
      isTopGame: true,
      status: "Completed",
      goals1: 1,
      goals2: 1,
      scorers1: ["Vinícius 32'"],
      scorers2: ["Saibari 21'"],
      matchNote: "Ismael Saibari and Vinicius Junior traded first-half goals, but it was a late Alisson intervention that ensured the points were shared.",
      predictionVsReality: {
        probabilities: { homeWin: 71, draw: 15, awayWin: 14 },
        aiOutcome: "Prediction Missed",
        why: "Brazil’s individual attacking quality matched the model’s expectation, but Morocco’s aggressive pressing, midfield intensity, and disciplined defensive phases made the result far more balanced."
      },
      summaryText: "Brazil and Morocco fought to a hard-earned 1-1 draw in their opening Group C match of the 2026 FIFA World Cup at MetLife Stadium. Ismael Saibari opened the scoring for Morocco in the 21st minute after capitalizing on a defensive error. Vinícius Júnior equalized for Brazil before halftime with a spectacular solo strike, and both teams ultimately shared the points after a tight, cautious second half.",
      timelineEvents: [
        { minute: "21'", type: "goal", team: "MAR", player: "Ismael Saibari", detail: "Goal — Morocco — Saibari" },
        { minute: "32'", type: "goal", team: "BRA", player: "Vinícius Júnior", detail: "Goal — Brazil — Vinícius" },
        { minute: "FT", type: "full_time", score: "Brazil 1-1 Morocco", detail: "FT — Brazil 1-1 Morocco" }
      ],
      statsDetails: [
        { name: "Ball Possession", team1: "51%", team2: "49%", ratio1: 51, ratio2: 49 },
        { name: "Expected Goals (xG)", team1: "1.26", team2: "1.37", ratio1: 48, ratio2: 52 },
        { name: "Total Shots", team1: "12", team2: "14", ratio1: 46, ratio2: 54 },
        { name: "Shots on Target", team1: "5", team2: "3", ratio1: 63, ratio2: 37 },
        { name: "Touches in Opposition Box", team1: "22", team2: "13", ratio1: 63, ratio2: 37 },
        { name: "Big Chances", team1: "1", team2: "2", ratio1: 33, ratio2: 67 },
        { name: "Big Chances Missed", team1: "1", team2: "1", ratio1: 50, ratio2: 50 },
        { name: "Accurate Passes", team1: "449 (87%)", team2: "419 (86%)", ratio1: 52, ratio2: 48 },
        { name: "Yellow Cards", team1: "2", team2: "0", ratio1: 100, ratio2: 0 },
        { name: "Corners", team1: "6", team2: "2", ratio1: 75, ratio2: 25 }
      ],
      lineupDetails: {
        team1: {
          name: "Brazil",
          formation: "4-3-3",
          coach: "Carlo Ancelotti",
          players: [
            { number: 1, name: "Alisson", rating: 6.5, events: [] },
            { number: 24, name: "Ibañez", rating: 6.7, events: [{ type: "yellow_card" }, { type: "sub_off", minute: "46'" }] },
            { number: 4, name: "Marquinhos", rating: 6.9, isCaptain: true, events: [] },
            { number: 3, name: "Gabriel", rating: 6.9, events: [] },
            { number: 16, name: "Santos", rating: 7.7, events: [] },
            { number: 5, name: "Casemiro", rating: 6.5, events: [{ type: "yellow_card" }, { type: "sub_off", minute: "46'" }] },
            { number: 20, name: "Paquetá", rating: 7.1, events: [{ type: "sub_off", minute: "61'" }] },
            { number: 8, name: "Guimarães", rating: 7.0, events: [{ type: "assist" }, { type: "sub_off", minute: "80'" }] },
            { number: 25, name: "Thiago", rating: 6.5, events: [{ type: "sub_off", minute: "61'" }] },
            { number: 11, name: "Raphinha", rating: 6.8, events: [] },
            { number: 7, name: "Vinícius", rating: 7.3, events: [{ type: "goal", minute: "32'" }] }
          ]
        },
        team2: {
          name: "Morocco",
          formation: "3-4-2-1",
          coach: "Tarik Sektioui",
          players: [
            { number: 1, name: "Bono", rating: 7.4, events: [] },
            { number: 3, name: "Mazraoui", rating: 7.4, events: [{ type: "sub_off", minute: "80'" }] },
            { number: 14, name: "Diop", rating: 6.6, events: [] },
            { number: 8, name: "Ounahi", rating: 7.3, events: [{ type: "sub_off", minute: "64'" }] },
            { number: 10, name: "Brahim Díaz", rating: 7.1, events: [{ type: "assist" }, { type: "sub_off", minute: "64'" }] },
            { number: 24, name: "El Aynaoui", rating: 7.4, events: [] },
            { number: 6, name: "Bouaddi", rating: 7.1, events: [] },
            { number: 2, name: "Hakimi", rating: 7.5, isCaptain: true, events: [] },
            { number: 23, name: "El Khannouss", rating: 7.6, events: [{ type: "sub_off", minute: "80'" }] },
            { number: 11, name: "Saibari", rating: 7.7, isHighlight: true, events: [{ type: "goal", minute: "21'" }, { type: "sub_off", minute: "89'" }] },
            { number: 18, name: "Riad", rating: 7.2, events: [] }
          ]
        }
      },
      substitutesList: {
        team1: [
          { number: 13, name: "Danilo", rating: 6.4, role: "Defender", minute: "46'", events: [] },
          { number: 17, name: "Fabinho", rating: 6.3, role: "Midfielder", minute: "46'", events: [] },
          { number: 21, name: "Luiz Henrique", rating: 6.5, role: "Attacker", minute: "61'", events: [] },
          { number: 9, name: "Matheus Cunha", rating: 6.3, role: "Attacker", minute: "61'", events: [] },
          { number: 18, name: "Danilo", rating: 6.1, role: "Midfielder", minute: "80'", events: [] }
        ],
        team2: [
          { number: 15, name: "Samir El Mourabet", rating: 6.2, role: "Midfielder", minute: "64'", events: [] },
          { number: 7, name: "Chemsdine Talbi", rating: 6.1, role: "Attacker", minute: "64'", events: [] },
          { number: 26, name: "Anass Salah-Eddine", rating: 5.9, role: "Defender", minute: "80'", events: [] },
          { number: 21, name: "Ayoube Amaimouni-Echghouyab", rating: 6.2, role: "Attacker", minute: "80'", events: [] },
          { number: 9, name: "Soufiane Rahimi", rating: null, role: "Attacker", minute: "89'", events: [] }
        ]
      },
      playerOfTheMatch: {
        name: "Vinicius Junior",
        rating: 7.3,
        reason: "Goal scored and joint-most touches in the opposition box (5)."
      },
      tacticalReviews: {
        team1: {
          title: "Brazil: Ragged Midfield Exposes Backline to Aggressive Pressing",
          positives: [
            "Coached by Carlo Ancelotti, Brazil showcased individual brilliance to rescue a 1-1 draw after a slow and uncomfortable start.",
            "Vinícius Júnior provided the decisive spark, equalizing with a brilliant curling finish after sharp combination play with Bruno Guimarães.",
            "After the hydration break and Ancelotti’s halftime change, with Casemiro removed for Fabinho, Brazil gained better structural balance.",
            "The adjustment helped quiet central spaces, reduce Morocco’s counterattacking threat, and gave the Seleção stronger territorial control during the early second half."
          ],
          improvements: [
            "Brazil’s initial 4-2-3-1 structure looked uncoordinated, with large gaps between Casemiro, Bruno Guimarães, and Lucas Paquetá.",
            "The midfield failed to consistently win second balls, leaving Gabriel and Marquinhos exposed against direct Moroccan runners.",
            "Raphinha was isolated on the right flank and often had to drop deep just to receive touches, reducing his final-third impact.",
            "The lack of a true central focal point up front was clear, raising questions about why Endrick remained unused for the full match."
          ]
        },
        team2: {
          title: "Morocco: Fearless Intensity Stuns the Heavyweights Early",
          positives: [
            "Coached by Tarik Sektioui, Morocco showed that their 2022 World Cup run was no fluke, matching Brazil with a brave and high-energy tactical plan.",
            "Their compact mid-block and aggressive central pressing dominated the opening spell, with Morocco producing five shots in the first ten minutes.",
            "The pressure paid off in the 21st minute when Brahim Díaz won a loose midfield ball and slipped a line-breaking pass into Ismael Saibari, who finished calmly over Alisson.",
            "Ayyoub Bouaddi was a major revelation in midfield, showing composure and defensive intelligence alongside Neil El Aynaoui.",
            "Morocco’s intensity repeatedly disrupted Brazil’s passing rhythm and denied them easy central progression."
          ],
          improvements: [
            "Morocco’s front-foot press created danger early, but the physical demands became clear after halftime.",
            "Around the hour mark, they dropped into a reactive low block and surrendered more possession to Brazil.",
            "Once fatigue set in, Morocco lacked the tactical flexibility to retain possession and control transitions.",
            "After Brahim Díaz was substituted, the frontline became more isolated and less able to relieve pressure.",
            "Late defensive substitutions helped stabilize the side, but Morocco still needed major saves from Bono in the final minutes to preserve the draw."
          ]
        }
      }
    },
    {
      id: 7,
      date: "Jun 14 2026, Sun - 06:30 (IST)",
      group: "Group C",
      stadium: "Gillette Stadium, Foxborough, Massachusetts",
      stadiumAtmosphere: "gillette",
      team1: { name: "Haiti", code: "HAI", prob: 20 },
      team2: { name: "Scotland", code: "SCO", prob: 58 },
      drawProb: 22,
      xG1: 0.7,
      xG2: 1.8,
      aiConfidence: 79,
      intensity: 81,
      form1: ["L", "L", "W", "D", "L"],
      form2: ["W", "D", "W", "L", "D"],
      insight: "Scotland's physical aerial presence and crossing volume should overload Haiti's box defense.",
      isTopGame: false,
      status: "Completed",
      goals1: 0,
      goals2: 1,
      scorers1: [],
      scorers2: ["McGinn 29'"],
      matchNote: "Scotland's first World Cup game since 1998 was far from straightforward, but they clung on to defeat Haiti 1-0 and go top of Group C.",
      predictionVsReality: {
        probabilities: { homeWin: 20, draw: 22, awayWin: 58 },
        aiOutcome: "Prediction Correct",
        why: "Scotland’s defensive structure and set-piece resilience matched the model’s expectation, but Haiti’s possession control and attacking pressure made the win far more difficult than predicted."
      },
      summaryText: "Scotland defeated Haiti 1-0 in their FIFA World Cup 2026 Group C opener in Boston. John McGinn scored the lone goal in the 28th minute via a deflected shot following a cross from Ben Doak. Despite relentless attacking pressure from Haiti and several late close calls, a disciplined Scottish defense held firm to secure their first World Cup win in 36 years.",
      timelineEvents: [
        { minute: "29'", type: "goal", team: "SCO", player: "John McGinn", detail: "Goal — Scotland — McGinn" },
        { minute: "FT", type: "full_time", score: "Haiti 0-1 Scotland", detail: "FT — Haiti 0-1 Scotland" }
      ],
      statsDetails: [
        { name: "Ball Possession", team1: "54%", team2: "46%", ratio1: 54, ratio2: 46 },
        { name: "Expected Goals (xG)", team1: "1.05", team2: "1.05", ratio1: 50, ratio2: 50 },
        { name: "Total Shots", team1: "15", team2: "9", ratio1: 63, ratio2: 37 },
        { name: "Shots on Target", team1: "2", team2: "2", ratio1: 50, ratio2: 50 },
        { name: "Touches in Opposition Box", team1: "22", team2: "21", ratio1: 51, ratio2: 49 },
        { name: "Big Chances", team1: "1", team2: "2", ratio1: 33, ratio2: 67 },
        { name: "Big Chances Missed", team1: "1", team2: "2", ratio1: 33, ratio2: 67 },
        { name: "Accurate Passes", team1: "367 (85%)", team2: "307 (82%)", ratio1: 54, ratio2: 46 },
        { name: "Yellow Cards", team1: "1", team2: "3", ratio1: 25, ratio2: 75 },
        { name: "Corners", team1: "4", team2: "3", ratio1: 57, ratio2: 43 }
      ],
      lineupDetails: {
        team1: {
          name: "Haiti",
          formation: "4-4-2",
          coach: "Sébastien Migné",
          players: [
            { number: 1, name: "Placide", rating: 6.4, isCaptain: true, events: [] },
            { number: 2, name: "Arcus", rating: 6.4, events: [] },
            { number: 4, name: "Adé", rating: 6.7, events: [] },
            { number: 5, name: "Delcroix", rating: 6.9, events: [] },
            { number: 8, name: "Expérience", rating: 7.1, events: [] },
            { number: 18, name: "Isidor", rating: 5.9, events: [{ type: "sub_off", minute: "75'" }] },
            { number: 11, name: "Louicius", rating: 6.5, events: [{ type: "sub_off", minute: "61'" }] },
            { number: 17, name: "Jacques", rating: 7.3, events: [] },
            { number: 10, name: "Bellegarde", rating: 7.3, events: [{ type: "yellow_card" }] },
            { number: 15, name: "Providence", rating: 6.5, events: [{ type: "sub_off", minute: "85'" }] },
            { number: 20, name: "Pierrot", rating: 6.0, events: [] }
          ]
        },
        team2: {
          name: "Scotland",
          formation: "3-4-2-1",
          coach: "Steve Clarke",
          players: [
            { number: 1, name: "Gunn", rating: 7.7, events: [] },
            { number: 13, name: "Hendry", rating: 6.8, events: [] },
            { number: 5, name: "Hanley", rating: 6.8, events: [] },
            { number: 2, name: "Hickey", rating: 7.3, events: [{ type: "yellow_card" }, { type: "sub_off", minute: "75'" }] },
            { number: 17, name: "Gannon-Doak", rating: 7.0, events: [{ type: "sub_off", minute: "75'" }] },
            { number: 4, name: "McTominay", rating: 6.8, events: [] },
            { number: 19, name: "Ferguson", rating: 7.3, events: [] },
            { number: 7, name: "McGinn", rating: 7.8, isHighlight: true, events: [{ type: "goal", minute: "29'" }, { type: "sub_off", minute: "82'" }] },
            { number: 20, name: "Shankland", rating: 6.8, events: [{ type: "sub_off", minute: "82'" }] },
            { number: 10, name: "Adams", rating: 6.4, events: [{ type: "sub_off", minute: "75'" }] },
            { number: 3, name: "Robertson", rating: 7.3, isCaptain: true, events: [] }
          ]
        }
      },
      substitutesList: {
        team1: [
          { number: 21, name: "Josué Casimir", rating: 6.2, role: "Midfielder", minute: "61'", events: [] },
          { number: 16, name: "Lenny Joseph", rating: 6.0, role: "Attacker", minute: "75'", events: [] },
          { number: 19, name: "Yassin Fortuné", rating: null, role: "Attacker", minute: "85'", events: [] }
        ],
        team2: [
          { number: 22, name: "Nathan Patterson", rating: 6.2, role: "Defender", minute: "75'", events: [] },
          { number: 11, name: "Ryan Christie", rating: 6.4, role: "Midfielder", minute: "75'", events: [] },
          { number: 9, name: "Lyndon Dykes", rating: 6.1, role: "Attacker", minute: "75'", events: [] },
          { number: 25, name: "Findlay Curtis", rating: null, role: "Midfielder", minute: "82'", events: [{ type: "yellow_card" }] },
          { number: 23, name: "Kenny McLean", rating: null, role: "Midfielder", minute: "82'", events: [{ type: "yellow_card" }] }
        ]
      },
      playerOfTheMatch: {
        name: "J. McGinn",
        rating: 7.8,
        reason: "Scored the only goal."
      },
      tacticalReviews: {
        team1: {
          title: "Haiti: Courageous and Fluid Progressions Ruined by Wayward Finishing",
          positives: [
            "Coached by Sébastien Migné, Haiti challenged expectations with a brave, high-energy 4-4-2 setup that out-possessed and out-shot Scotland.",
            "Jean-Ricner Bellegarde and Danley Jean Jacques dominated midfield phases in the second half, helping Haiti reach 85% passing accuracy.",
            "Frantzdy Pierrot was a constant physical threat, using his aerial strength to create pressure and unsettle the Scottish backline.",
            "Hannes Delcroix was excellent in individual defensive duels, cutting out central transitions before they reached danger zones.",
            "Haiti showed strong territorial dominance and technical confidence despite the narrow defeat."
          ],
          improvements: [
            "Haiti’s final-third execution was poor despite their territorial control and attacking volume.",
            "Their crossing accuracy was weak, and too many shot attempts missed the target.",
            "Louicius Deedson and Ruben Providence repeatedly beat defenders but failed to deliver the final ball with enough quality.",
            "A single defensive lapse around Scotland’s goal punished them heavily.",
            "The match showed that at World Cup level, execution matters as much as tactical bravery."
          ]
        },
        team2: {
          title: "Scotland: Historical Result Masked by Passive Terrorball",
          positives: [
            "Coached by Steve Clarke, Scotland earned a historic 1-0 victory in Boston, marking their first FIFA World Cup win since 1990.",
            "Operating in a structured 4-4-2 framework, Scotland’s main attacking spark came through John McGinn, whose left-sided positioning produced the decisive goal.",
            "Grant Hanley and Jack Hendry were immense in traditional defensive metrics, absorbing repeated late pressure and winning key aerial duels.",
            "Ben Doak’s first-half burst down the right showed how Scotland’s youth can stretch defensive lines when given space to attack vertically."
          ],
          improvements: [
            "Despite the win, Scotland’s second-half display became extremely passive, dropping into a nervous block and surrendering 54% possession to Haiti.",
            "Scott McTominay and Lewis Ferguson lost control of the match tempo after the break, struggling with Haiti’s physical transition sequences.",
            "Ché Adams and Lawrence Shankland were starved of service because of poor final-third distribution.",
            "Scotland were fortunate to survive a major 79th-minute handball appeal against Hanley that was not penalized.",
            "Against stronger opponents, this level of passivity could become a major tactical weakness."
          ]
        }
      }
    },
    {
      id: 8,
      date: "Jun 14 2026, Sun - 09:30 (IST)",
      group: "Group D",
      stadium: "BC Place, Vancouver",
      stadiumAtmosphere: "bcplace",
      team1: { name: "Australia", code: "AUS", prob: 40 },
      team2: { name: "Turkiye", code: "TUR", prob: 36 },
      drawProb: 24,
      xG1: 1.3,
      xG2: 1.2,
      aiConfidence: 61,
      intensity: 83,
      form1: ["D", "W", "L", "W", "D"],
      form2: ["L", "W", "W", "D", "L"],
      insight: "A highly competitive physical contest expected; Turkey's technical depth vs Australia's endurance.",
      isTopGame: false,
      status: "Completed",
      goals1: 2,
      goals2: 0,
      scorers1: ["Irankunda 27'", "Metcalfe 75'"],
      scorers2: [],
      matchNote: "Australia caused an upset at the World Cup on Saturday, beating Turkiye 2-0 scoring stunners, to join the United States on three points at the top of Group D.",
      predictionVsReality: {
        probabilities: { homeWin: 40, draw: 24, awayWin: 36 },
        aiOutcome: "Prediction Correct",
        why: "Turkiye controlled possession and chance volume as expected, but Australia’s compact defensive block, clinical transitions, and decisive finishing completely changed the outcome."
      },
      summaryText: "Australia stunned Türkiye with a 2-0 victory in their opening 2026 FIFA World Cup Group D match in Vancouver. Nestory Irankunda opened the scoring with a brilliant first-half breakaway goal, and Connor Metcalfe secured the win with a powerful long-range strike in the second half. Goalkeeper Patrick Beach was named the player of the match, making crucial saves to preserve a clean sheet against intense Turkish pressure.",
      timelineEvents: [
        { minute: "27'", type: "goal", team: "AUS", player: "Nestory Irankunda", detail: "Goal — Australia — Irankunda" },
        { minute: "75'", type: "goal", team: "AUS", player: "Connor Metcalfe", detail: "Goal — Australia — Metcalfe" },
        { minute: "FT", type: "full_time", score: "Australia 2-0 Turkiye", detail: "FT — Australia 2-0 Turkiye" }
      ],
      statsDetails: [
        { name: "Ball Possession", team1: "28%", team2: "72%", ratio1: 28, ratio2: 72 },
        { name: "Expected Goals (xG)", team1: "1.18", team2: "1.36", ratio1: 46, ratio2: 54 },
        { name: "Total Shots", team1: "9", team2: "30", ratio1: 23, ratio2: 77 },
        { name: "Shots on Target", team1: "4", team2: "8", ratio1: 33, ratio2: 67 },
        { name: "Touches in Opposition Box", team1: "18", team2: "51", ratio1: 26, ratio2: 74 },
        { name: "Big Chances", team1: "1", team2: "2", ratio1: 33, ratio2: 67 },
        { name: "Big Chances Missed", team1: "0", team2: "2", ratio1: 0, ratio2: 100 },
        { name: "Accurate Passes", team1: "201 (74%)", team2: "635 (90%)", ratio1: 24, ratio2: 76 },
        { name: "Yellow Cards", team1: "0", team2: "1", ratio1: 0, ratio2: 100 },
        { name: "Corners", team1: "5", team2: "8", ratio1: 38, ratio2: 62 }
      ],
      lineupDetails: {
        team1: {
          name: "Australia",
          formation: "5-4-1",
          coach: "Tony Popovic",
          players: [
            { number: 18, name: "Beach", rating: 8.9, isHighlight: true, events: [] },
            { number: 4, name: "Italiano", rating: 7.1, events: [{ type: "sub_off", minute: "74'" }] },
            { number: 3, name: "Circati", rating: 7.2, events: [] },
            { number: 21, name: "Burgess", rating: 7.3, events: [] },
            { number: 5, name: "Bos", rating: 6.8, events: [{ type: "sub_off", minute: "83'" }] },
            { number: 19, name: "Souttar", rating: 7.8, isCaptain: true, events: [] },
            { number: 8, name: "Metcalfe", rating: 8.0, events: [{ type: "goal", minute: "75'" }] },
            { number: 13, name: "O'Neill", rating: 7.4, events: [] },
            { number: 24, name: "Okon-Engstler", rating: 8.1, events: [{ type: "assist" }, { type: "sub_off", minute: "83'" }] },
            { number: 17, name: "Irankunda", rating: 7.6, events: [{ type: "goal", minute: "27'" }, { type: "sub_off", minute: "61'" }] },
            { number: 9, name: "Touré", rating: 6.6, events: [{ type: "sub_off", minute: "74'" }] }
          ]
        },
        team2: {
          name: "Turkiye",
          formation: "3-4-2-1",
          coach: "Vincenzo Montella",
          players: [
            { number: 23, name: "Çakir", rating: 6.0, events: [] },
            { number: 3, name: "Demiral", rating: 6.5, events: [] },
            { number: 14, name: "Bardakci", rating: 7.0, events: [] },
            { number: 20, name: "Kadioglu", rating: 7.6, events: [] },
            { number: 8, name: "Güler", rating: 7.4, events: [] },
            { number: 16, name: "Yüksek", rating: 7.0, events: [{ type: "sub_off", minute: "81'" }] },
            { number: 6, name: "Kökçü", rating: 6.9, events: [{ type: "sub_off", minute: "62'" }] },
            { number: 2, name: "Çelik", rating: 6.4, events: [{ type: "sub_off", minute: "81'" }] },
            { number: 21, name: "Yilmaz", rating: 5.6, events: [{ type: "sub_off", minute: "46'" }] },
            { number: 7, name: "Aktürkoglu", rating: 6.1, events: [{ type: "sub_off", minute: "85'" }] },
            { number: 10, name: "Çalhanoğlu", rating: 7.4, isCaptain: true, events: [] }
          ]
        }
      },
      substitutesList: {
        team1: [
          { number: 23, name: "Nishan Velupillay", rating: 6.1, role: "Attacker", minute: "61'", events: [] },
          { number: 6, name: "Jason Geria", rating: 6.4, role: "Defender", minute: "74'", events: [] },
          { number: 26, name: "Tete Yengi", rating: 6.2, role: "Attacker", minute: "74'", events: [] },
          { number: 16, name: "Aziz Behich", rating: null, role: "Defender", minute: "83'", events: [] },
          { number: 22, name: "Jackson Irvine", rating: null, role: "Midfielder", minute: "83'", events: [] }
        ],
        team2: [
          { number: 11, name: "Kenan Yildiz", rating: 7.2, role: "Midfielder", minute: "46'", events: [] },
          { number: 19, name: "Yunus Akgün", rating: 6.6, role: "Midfielder", minute: "62'", events: [{ type: "yellow_card" }] },
          { number: 18, name: "Mert Müldür", rating: null, role: "Defender", minute: "81'", events: [] },
          { number: 5, name: "Salih Özcan", rating: null, role: "Midfielder", minute: "81'", events: [] },
          { number: 9, name: "Deniz Gül", rating: null, role: "Attacker", minute: "85'", events: [] }
        ]
      },
      playerOfTheMatch: {
        name: "N. Irankunda",
        rating: 7.6,
        reason: "Scored a goal."
      },
      tacticalReviews: {
        team1: {
          title: "Australia: Gritty Haramball and Lethal Counters Stage a Massive Upset",
          positives: [
            "Coached by Tony Popovic, Australia produced the biggest tactical shock of the opening round by leaning into pure efficiency to beat a heavily favored Turkiye side.",
            "Popovic made a bold selection call by starting 22-year-old Patrick Beach in goal, and the goalkeeper responded with a heroic 8-save clean-sheet performance.",
            "Australia’s rigid 5-4-1 defensive block crowded central lanes and forced Turkiye into wide areas and low-probability shooting zones.",
            "In transition, Australia were ruthless. A superb ball over the top from Paul Okon-Engstler released Nestory Irankunda, who used his pace to score a clinical opener.",
            "After the second-half break, Connor Metcalfe sealed the win with a powerful low strike from the edge of the box."
          ],
          improvements: [
            "Although the tactical plan worked, Australia survived on a very thin margin statistically.",
            "They allowed 30 total shots and 8 shots on target, showing that the defensive block was frequently bypassed.",
            "The central midfield had very little presence in possession, with Australia holding only 28% of the ball and completing just 201 accurate passes.",
            "Mohamed Touré was isolated for long periods, receiving almost no progressive service.",
            "Against a more clinical elite opponent, conceding this much territory and box pressure could become unsustainable."
          ]
        },
        team2: {
          title: "Turkiye: Dominant Passing Suffocated by Arrogance and Wasteful Execution",
          positives: [
            "Coached by Vincenzo Montella, Turkiye controlled the geography of the match through a fluid 4-2-3-1 structure.",
            "They dominated possession with 72%, completed 635 accurate passes, and produced 30 total shots.",
            "Arda Güler was a constant creative threat, drifting between the lines and influencing the final third.",
            "Hakan Çalhanoğlu controlled possession from deep and repeatedly recycled play into wide areas.",
            "Their territorial press was effective in preventing standard Australian buildup from progressing beyond midfield."
          ],
          improvements: [
            "Turkiye’s dominance was undone by tactical hubris and poor execution in the final third.",
            "Their possession lacked enough lateral speed to disorganize Australia’s compact five-back defensive shell.",
            "Too many attacks ended in predictable crosses or shots that suited Australia’s defensive strengths.",
            "Defensive transition tracking was poor, with the back line caught sleeping on the direct sequence that led to Australia’s opener.",
            "Despite creating high shot volume, Turkiye’s finishing was toothless, leaving their highly rated squad empty-handed on opening night."
          ]
        }
      }
    },
    {
      id: 9,
      date: "Jun 14 2026, Sun - 22:30 (IST)",
      group: "Group E",
      stadium: "NRG Stadium, Houston, Texas",
      stadiumAtmosphere: "nrg",
      team1: { name: "Germany", code: "GER", prob: 78 },
      team2: { name: "Curaçao", code: "CUR", prob: 8 },
      drawProb: 14,
      xG1: 2.8,
      xG2: 0.5,
      aiConfidence: 92,
      intensity: 84,
      form1: ["W", "W", "D", "W", "W"],
      form2: ["D", "L", "L", "W", "D"],
      insight: "Germany's vertical overload and ball-recovery speeds will keep Curacao in their defensive third.",
      isTopGame: false,
      status: "Completed",
      goals1: 7,
      goals2: 1,
      scorers1: ["Nmecha 6'", "Schlotterbeck 38'", "Havertz 45+5' (Pen)", "Musiala 47'", "Brown 68'", "Undav 78'", "Havertz 88'"],
      scorers2: ["Comenencia 21'"],
      matchNote: "Germany made a statement in their World Cup opener, registering their biggest win at the tournament since the 2014 semi-final versus Brazil.",
      predictionVsReality: {
        probabilities: { homeWin: 78, draw: 14, awayWin: 8 },
        aiOutcome: "Prediction Correct",
        why: "Germany's attacking depth, positional rotations, and final-third efficiency matched the pre-match model's expectation of a dominant German win."
      },
      summaryText: "Germany comfortably routed World Cup debutants Curaçao 7-1 in their opening Group E match at Houston Stadium. Felix Nmecha opened the scoring early, but Curaçao briefly shocked the Germans when Livano Comenencia equalized to score his country's first-ever tournament goal. From there, Germany relentlessly took control with a header from Nico Schlotterbeck, two goals from Kai Havertz, and finishes by Jamal Musiala, Nathaniel Brown, and Deniz Undav to seal a comprehensive victory.",
      timelineEvents: [
        { minute: "6'", type: "goal", team: "GER", player: "Felix Nmecha", detail: "Goal — Germany — Nmecha" },
        { minute: "21'", type: "goal", team: "CUR", player: "Livano Comenencia", detail: "Goal — Curaçao — Comenencia" },
        { minute: "38'", type: "goal", team: "GER", player: "Nico Schlotterbeck", detail: "Goal — Germany — Schlotterbeck" },
        { minute: "45+5'", type: "goal", team: "GER", player: "Kai Havertz", detail: "Goal — Germany — Havertz (Pen)" },
        { minute: "47'", type: "goal", team: "GER", player: "Jamal Musiala", detail: "Goal — Germany — Musiala" },
        { minute: "68'", type: "goal", team: "GER", player: "Nathaniel Brown", detail: "Goal — Germany — Brown" },
        { minute: "78'", type: "goal", team: "GER", player: "Deniz Undav", detail: "Goal — Germany — Undav" },
        { minute: "88'", type: "goal", team: "GER", player: "Kai Havertz", detail: "Goal — Germany — Havertz" },
        { minute: "FT", type: "full_time", score: "Germany 7-1 Curaçao", detail: "FT — Germany 7-1 Curaçao" }
      ],
      statsDetails: [
        { name: "Ball Possession", team1: "65%", team2: "35%", ratio1: 65, ratio2: 35 },
        { name: "Expected Goals (xG)", team1: "4.22", team2: "0.41", ratio1: 91, ratio2: 9 },
        { name: "Total Shots", team1: "26", team2: "8", ratio1: 76, ratio2: 24 },
        { name: "Shots on Target", team1: "12", team2: "2", ratio1: 86, ratio2: 14 },
        { name: "Touches in Opposition Box", team1: "63", team2: "10", ratio1: 86, ratio2: 14 },
        { name: "Big Chances", team1: "6", team2: "0", ratio1: 100, ratio2: 0 },
        { name: "Big Chances Missed", team1: "2", team2: "0", ratio1: 100, ratio2: 0 },
        { name: "Accurate Passes", team1: "554 (87%)", team2: "282 (82%)", ratio1: 66, ratio2: 34 },
        { name: "Corners", team1: "8", team2: "1", ratio1: 89, ratio2: 11 }
      ],
      lineupDetails: {
        team1: {
          name: "Germany",
          formation: "4-2-3-1",
          coach: "Julian Nagelsmann",
          players: [
            { number: 1, name: "Neuer", rating: 6.6, events: [] },
            { number: 4, name: "Tah", rating: 6.9, events: [{ type: "sub_off", minute: "72'" }] },
            { number: 6, name: "Kimmich", rating: 8.8, isCaptain: true, events: [{ type: "assist" }, { type: "assist" }, { type: "sub_off", minute: "83'" }] },
            { number: 15, name: "Schlotterbeck", rating: 8.9, isHighlight: true, events: [{ type: "goal", minute: "38'" }] },
            { number: 5, name: "Pavlovic", rating: 7.6, events: [] },
            { number: 23, name: "Nmecha", rating: 8.6, events: [{ type: "goal", minute: "6'" }, { type: "sub_off", minute: "72'" }] },
            { number: 19, name: "Sané", rating: 7.2, events: [] },
            { number: 10, name: "Musiala", rating: 8.3, events: [{ type: "goal", minute: "47'" }, { type: "sub_off", minute: "64'" }] },
            { number: 17, name: "Wirtz", rating: 8.4, events: [] },
            { number: 7, name: "Havertz", rating: 8.9, events: [{ type: "goal", minute: "45+5'" }, { type: "goal", minute: "88'" }] },
            { number: 18, name: "Brown", rating: 8.5, events: [{ type: "goal", minute: "68'" }, { type: "assist" }, { type: "sub_off", minute: "72'" }] }
          ]
        },
        team2: {
          name: "Curaçao",
          formation: "4-2-3-1",
          coach: "Dick Advocaat",
          players: [
            { number: 1, name: "Room", rating: 4.1, events: [] },
            { number: 24, name: "Fonville", rating: 4.8, events: [] },
            { number: 18, name: "Obispo", rating: 5.3, events: [] },
            { number: 23, name: "Bazoer", rating: 4.1, events: [] },
            { number: 5, name: "Floranus", rating: 4.9, events: [] },
            { number: 7, name: "Bacuna", rating: 7.4, events: [] },
            { number: 10, name: "Bacuna", rating: 5.8, isCaptain: true, events: [] },
            { number: 21, name: "Chong", rating: 7.0, events: [{ type: "sub_off", minute: "82'" }] },
            { number: 8, name: "Comenencia", rating: 8.1, events: [{ type: "goal", minute: "21'" }, { type: "sub_off", minute: "65'" }] },
            { number: 9, name: "Locadia", rating: 6.0, events: [{ type: "sub_off", minute: "65'" }] },
            { number: 12, name: "Hansen", rating: 6.6, events: [{ type: "sub_off", minute: "46'" }] }
          ]
        }
      },
      substitutesList: {
        team1: [
          { number: 26, name: "Deniz Undav", rating: 8.8, role: "Attacker", minute: "64'", events: [{ type: "goal", minute: "78'" }, { type: "assist" }, { type: "assist" }] },
          { number: 2, name: "Antonio Rüdiger", rating: 6.3, role: "Defender", minute: "72'", events: [] },
          { number: 22, name: "David Raum", rating: 6.3, role: "Defender", minute: "72'", events: [] },
          { number: 8, name: "Leon Goretzka", rating: 6.0, role: "Midfielder", minute: "72'", events: [] },
          { number: 3, name: "Waldemar Anton", rating: null, role: "Defender", minute: "83'", events: [] }
        ],
        team2: [
          { number: 11, name: "Jeremy Antonisse", rating: 6.4, role: "Attacker", minute: "46'", events: [] },
          { number: 16, name: "Jearl Margaritha", rating: 5.8, role: "Attacker", minute: "65'", events: [] },
          { number: 19, name: "Gervane Kastaneer", rating: null, role: "Attacker", minute: "82'", events: [] }
        ]
      },
      playerOfTheMatch: {
        name: "Kai Havertz",
        rating: 8.9,
        reason: "Scored two goals, had the most touches in the opposition box (11), and took the joint-most shots (4)."
      },
      tacticalReviews: {
        team1: {
          title: "Germany: Ruthless Attacking Machine Marred by Transition Flaws",
          positives: [
            "Coached by Julian Nagelsmann, Germany launched their Group E campaign with a resounding 7-1 demolition at Houston Stadium.",
            "Operating in a creative 4-2-3-1 setup, Germany overwhelmed Curaçao through a fluid narrow attacking midfield line where Florian Wirtz and Jamal Musiala rotated constantly to create central pockets.",
            "Kai Havertz led the attack with a clinical brace, including a penalty and a late finish.",
            "Nathaniel Brown produced a sensational breakout performance, contributing with aggressive overlapping runs, a goal, and an assist from a corner.",
            "Nagelsmann's tactical flexibility stood out during the first-half hydration break, as Joshua Kimmich was adjusted into a right-sided center-half role to stabilize defensive geometry and reduce counters."
          ],
          improvements: [
            "Despite the seven-goal output, Germany's ultra-high defensive line and incomplete counter-press exposed dangerous transition gaps.",
            "The counter-press took too long to recover loose balls, leaving large spaces behind the backline.",
            "Curaçao's equalizer in the 21st minute came from one of their first real attacking phases, showing how quickly Germany can be punished when their structure opens up.",
            "The asymmetric midfield shape left an empty defensive pocket on the right side of the pitch that stronger opponents could exploit.",
            "Against elite sides, Germany must tighten their rest defence and improve recovery speed after turnovers."
          ]
        },
        team2: {
          title: "Curaçao: Historic Moment Erased by Late-Game Physical Collapse",
          positives: [
            "Coached by Dick Advocaat, Curaçao played with bravery and aggression early despite facing one of the tournament's strongest teams.",
            "Their narrow 4-2-3-1 counter-attacking shape refused to sit passively and tried to attack Germany's wide spaces through Tahith Chong and Juninho Bacuna.",
            "The approach produced a historic moment in the 21st minute when Livano Comenencia scored Curaçao's first-ever World Cup goal.",
            "Goalkeeper Eloy Room showed individual resilience under heavy pressure, making key saves during Germany's early barrage.",
            "For the first half-hour, Curaçao's boldness caused Germany real defensive discomfort."
          ],
          improvements: [
            "Curaçao's attempt to play an open front-foot game against Germany became physically unsustainable.",
            "Their aggressive structure created early promise but collapsed badly once fatigue set in.",
            "Around the hour mark, the defensive lines dropped into an unorganized low block and surrendered 65% possession.",
            "They struggled to track Germany's lateral movement and repeatedly lost marking assignments on set pieces and central combinations.",
            "The match showed that tactical bravery must be supported by endurance, compactness, and better defensive discipline across 90 minutes."
          ]
        }
      }
    },
    {
      id: 10,
      date: "Jun 15 2026, Mon - 01:30 (IST)",
      group: "Group F",
      stadium: "AT&T Stadium, Arlington, Texas",
      stadiumAtmosphere: "att",
      team1: { name: "Netherlands", code: "NED", prob: 54 },
      team2: { name: "Japan", code: "JPN", prob: 22 },
      drawProb: 24,
      xG1: 1.7,
      xG2: 1.0,
      aiConfidence: 75,
      intensity: 87,
      form1: ["W", "D", "W", "L", "W"],
      form2: ["W", "W", "D", "W", "D"],
      insight: "Netherlands' possession control vs Japan's high-efficiency counter-pressing system.",
      isTopGame: true,
      status: "Completed",
      goals1: 2,
      goals2: 2,
      scorers1: ["van Dijk 50'", "Summerville 64'"],
      scorers2: ["Nakamura 57'", "Kamada 88'"],
      matchNote: "Netherlands looked set to clinch all three points in their World Cup opener, but Daichi Kamada and Japan had other ideas.",
      predictionVsReality: {
        probabilities: { homeWin: 54, draw: 24, awayWin: 22 },
        aiOutcome: "Prediction Missed",
        why: "Netherlands controlled possession and created strong phases as expected, but Japan's tactical discipline, substitutions, and late set-piece pressure turned the match into a draw."
      },
      summaryText: "The Netherlands and Japan played out an entertaining 2-2 draw in their opening Group F match of the 2026 FIFA World Cup. Virgil van Dijk and Crysencio Summerville scored for the Dutch, but the Samurai Blue showed great resilience, equalizing twice through Keito Nakamura and a late Daichi Kamada deflection.",
      timelineEvents: [
        { minute: "50'", type: "goal", team: "NED", player: "Virgil van Dijk", detail: "Goal — Netherlands — van Dijk" },
        { minute: "57'", type: "goal", team: "JPN", player: "Keito Nakamura", detail: "Goal — Japan — Nakamura" },
        { minute: "64'", type: "goal", team: "NED", player: "Crysencio Summerville", detail: "Goal — Netherlands — Summerville" },
        { minute: "88'", type: "goal", team: "JPN", player: "Daichi Kamada", detail: "Goal — Japan — Kamada" },
        { minute: "FT", type: "full_time", score: "Netherlands 2-2 Japan", detail: "FT — Netherlands 2-2 Japan" }
      ],
      statsDetails: [
        { name: "Ball Possession", team1: "60%", team2: "40%", ratio1: 60, ratio2: 40 },
        { name: "Expected Goals (xG)", team1: "0.78", team2: "0.59", ratio1: 57, ratio2: 43 },
        { name: "Total Shots", team1: "10", team2: "10", ratio1: 50, ratio2: 50 },
        { name: "Shots on Target", team1: "6", team2: "3", ratio1: 67, ratio2: 33 },
        { name: "Touches in Opposition Box", team1: "33", team2: "19", ratio1: 63, ratio2: 37 },
        { name: "Big Chances", team1: "0", team2: "0", ratio1: 50, ratio2: 50 },
        { name: "Big Chances Missed", team1: "0", team2: "0", ratio1: 50, ratio2: 50 },
        { name: "Accurate Passes", team1: "463 (88%)", team2: "286 (84%)", ratio1: 62, ratio2: 38 },
        { name: "Yellow Cards", team1: "3", team2: "0", ratio1: 100, ratio2: 0 },
        { name: "Corners", team1: "5", team2: "4", ratio1: 56, ratio2: 44 }
      ],
      lineupDetails: {
        team1: {
          name: "Netherlands",
          formation: "4-3-3",
          coach: "Ronald Koeman",
          players: [
            { number: 1, name: "Verbruggen", rating: 5.8, events: [] },
            { number: 22, name: "Dumfries", rating: 6.7, events: [] },
            { number: 6, name: "van Hecke", rating: 7.3, events: [] },
            { number: 4, name: "van Dijk", rating: 7.9, isCaptain: true, events: [{ type: "goal", minute: "50'" }] },
            { number: 15, name: "Van de Ven", rating: 6.6, events: [{ type: "yellow_card" }] },
            { number: 8, name: "Gravenberch", rating: 8.4, isHighlight: true, events: [{ type: "assist" }, { type: "assist" }, { type: "sub_off", minute: "81'" }] },
            { number: 21, name: "de Jong", rating: 7.9, events: [] },
            { number: 14, name: "Reijnders", rating: 6.8, events: [{ type: "sub_off", minute: "70'" }] },
            { number: 24, name: "Summerville", rating: 7.8, events: [{ type: "goal", minute: "64'" }, { type: "yellow_card" }, { type: "sub_off", minute: "70'" }] },
            { number: 18, name: "Malen", rating: 6.8, events: [{ type: "sub_off", minute: "70'" }] },
            { number: 11, name: "Gakpo", rating: 7.2, events: [{ type: "sub_off", minute: "84'" }] }
          ]
        },
        team2: {
          name: "Japan",
          formation: "3-4-2-1",
          coach: "Hajime Moriyasu",
          players: [
            { number: 1, name: "Suzuki", rating: 6.7, events: [] },
            { number: 21, name: "Ito", rating: 5.8, events: [] },
            { number: 3, name: "Taniguchi", rating: 6.7, events: [] },
            { number: 10, name: "Doan", rating: 6.4, isCaptain: true, events: [{ type: "sub_off", minute: "75'" }] },
            { number: 13, name: "Nakamura", rating: 8.1, events: [{ type: "goal", minute: "57'" }] },
            { number: 24, name: "Sano", rating: 6.2, events: [] },
            { number: 15, name: "Kamada", rating: 8.1, events: [{ type: "goal", minute: "88'" }] },
            { number: 11, name: "Maeda", rating: 6.0, events: [{ type: "sub_off", minute: "66'" }] },
            { number: 8, name: "Kubo", rating: 7.2, events: [{ type: "assist" }, { type: "sub_off", minute: "75'" }] },
            { number: 18, name: "Ueda", rating: 6.5, events: [{ type: "sub_off", minute: "84'" }] },
            { number: 16, name: "Watanabe", rating: 6.6, events: [{ type: "sub_off", minute: "75'" }] }
          ]
        }
      },
      substitutesList: {
        team1: [
          { number: 26, name: "Quinten Timber", rating: 6.5, role: "Midfielder", minute: "70'", events: [] },
          { number: 20, name: "Teun Koopmeiners", rating: 6.1, role: "Midfielder", minute: "70'", events: [] },
          { number: 10, name: "Memphis Depay", rating: 6.1, role: "Attacker", minute: "70'", events: [{ type: "yellow_card" }] },
          { number: 5, name: "Nathan Aké", rating: null, role: "Defender", minute: "81'", events: [] },
          { number: 19, name: "Brian Brobbey", rating: null, role: "Attacker", minute: "84'", events: [] }
        ],
        team2: [
          { number: 14, name: "Junya Ito", rating: 6.7, role: "Attacker", minute: "66'", events: [] },
          { number: 22, name: "Takehiro Tomiyasu", rating: 6.4, role: "Defender", minute: "75'", events: [] },
          { number: 2, name: "Yukinari Sugawara", rating: 6.5, role: "Defender", minute: "75'", events: [] },
          { number: 19, name: "Koki Ogawa", rating: 6.8, role: "Attacker", minute: "75'", events: [{ type: "assist" }] },
          { number: 26, name: "Kento Shiogai", rating: null, role: "Attacker", minute: "84'", events: [] }
        ]
      },
      playerOfTheMatch: {
        name: "Virgil van Dijk",
        rating: 7.9,
        reason: "Scored a goal, had the joint-most defensive contributions (9), and had the most touches (114)."
      },
      tacticalReviews: {
        team1: {
          title: "Netherlands: Dominant Possession Undone by Static Tempo and Lead Management",
          positives: [
            "Coached by Ronald Koeman, the Netherlands controlled the baseline geography of their Group F opener by commanding 60% possession and pinning Japan back for long stretches.",
            "Operating in a fluid 4-1-2-3 shape, the Dutch used their physical profile to create direct chances and aerial threat.",
            "Ryan Gravenberch's accurate delivery helped Virgil van Dijk power home a commanding header.",
            "Crysencio Summerville provided electric individual quality from the wing, cutting inside the box and curling home a superb second-half goal.",
            "Frenkie de Jong stabilized deep recycling phases and allowed the full-backs to push high."
          ],
          improvements: [
            "Despite twice taking the lead, the Dutch approach was hurt by slow, sterile possession and poor lead management.",
            "The central midfield lacked quick lateral circulation, often reducing final-third attacks to predictable wing sequences.",
            "Jan Paul van Hecke and Virgil van Dijk looked uncoordinated against Japan's swift low-to-the-ground transitions.",
            "The defensive line failed to close down the edge of the box for Japan's first equalizer.",
            "Late substitutions disrupted defensive shape, with the team dropping too deep and losing a crucial back-post assignment during Japan's late equalizer."
          ]
        },
        team2: {
          title: "Japan: Exceptional Tactical Solidarity and Clutch In-Game Adjustments",
          positives: [
            "Coached by Hajime Moriyasu, Japan again showed their elite giant-killing reputation through technical discipline and tactical resilience.",
            "Their organized 3-4-3 defensive structure kept the central block compact while waiting patiently for transition triggers.",
            "Japan responded immediately after falling behind, with Takefusa Kubo releasing Keito Nakamura for a brilliant low finish.",
            "Moriyasu's second-half game management was excellent, using bold substitutions to completely alter Japan's movement patterns.",
            "The late equalizer came from tactical bravery, as Junya Ito's corner created the decisive deflection involving Koki Ogawa and Daichi Kamada."
          ],
          improvements: [
            "Japan's initial passivity forced them to operate on very fine margins for long stretches.",
            "By surrendering midfield control early and holding only 40% possession, Ayase Ueda was left isolated without reliable service.",
            "The back three struggled with the Dutch frontline's physical size during aerial and static situations.",
            "Wide defenders had difficulty managing inside-out movement, leaving half-spaces open for Dutch attackers.",
            "Japan will need more sustained possession phases if they want to avoid constantly chasing matches against elite teams."
          ]
        }
      }
    },
    {
      id: 11,
      date: "Jun 15 2026, Mon - 04:30 (IST)",
      group: "Group F",
      stadium: "Estadio BBVA, Guadalupe",
      stadiumAtmosphere: "bbva",
      team1: { name: "Sweden", code: "SWE", prob: 50 },
      team2: { name: "Tunisia", code: "TUN", prob: 25 },
      drawProb: 25,
      xG1: 1.6,
      xG2: 0.9,
      aiConfidence: 72,
      intensity: 78,
      form1: ["W", "D", "L", "W", "D"],
      form2: ["L", "W", "D", "L", "W"],
      insight: "Sweden's set-piece designs and structural defensive width should limit Tunisia's key avenues.",
      isTopGame: false,
      status: "Completed",
      goals1: 5,
      goals2: 1,
      scorers1: ["Ayari 7'", "Isak 30'", "Gyökeres 59'", "Svanberg 84'", "Ayari 90+6'"],
      scorers2: ["Rekik 43'"],
      matchNote: "Sweden got their World Cup campaign off to an emphatic start as they dispatched Tunisia in Group F, with their star strikers on target.",
      predictionVsReality: {
        probabilities: { homeWin: 50, draw: 25, awayWin: 25 },
        aiOutcome: "Prediction Correct",
        why: "Sweden's attacking efficiency, direct transition threat, and striker movement matched the pre-match model's expectation of a Swedish advantage."
      },
      summaryText: "Sweden thrashed Tunisia 5-1 at Estadio Monterrey to take early control of Group F in their opening match of the FIFA World Cup 2026. Midfielder Yasin Ayari stole the headlines by scoring two spectacular long-range goals against his father's native country. Sweden's star attacking duo of Alexander Isak and Viktor Gyökeres combined brilliantly, each scoring a goal and providing assists, while Mattias Svanberg added a fifth goal just 16 seconds after coming on as a substitute. Tunisia's solitary response came from an Omar Rekik header right before halftime, which briefly cut the deficit to 2-1 before Sweden completely dominated the second half.",
      timelineEvents: [
        { minute: "7'", type: "goal", team: "SWE", player: "Yasin Ayari", detail: "Goal — Sweden — Ayari" },
        { minute: "30'", type: "goal", team: "SWE", player: "Alexander Isak", detail: "Goal — Sweden — Isak" },
        { minute: "43'", type: "goal", team: "TUN", player: "Omar Rekik", detail: "Goal — Tunisia — Rekik" },
        { minute: "59'", type: "goal", team: "SWE", player: "Viktor Gyökeres", detail: "Goal — Sweden — Gyökeres" },
        { minute: "84'", type: "goal", team: "SWE", player: "Mattias Svanberg", detail: "Goal — Sweden — Svanberg" },
        { minute: "90+6'", type: "goal", team: "SWE", player: "Yasin Ayari", detail: "Goal — Sweden — Ayari" },
        { minute: "FT", type: "full_time", score: "Sweden 5-1 Tunisia", detail: "FT — Sweden 5-1 Tunisia" }
      ],
      statsDetails: [
        { name: "Ball Possession", team1: "49%", team2: "51%", ratio1: 49, ratio2: 51 },
        { name: "Expected Goals (xG)", team1: "1.33", team2: "0.28", ratio1: 83, ratio2: 17 },
        { name: "Total Shots", team1: "13", team2: "6", ratio1: 68, ratio2: 32 },
        { name: "Shots on Target", team1: "7", team2: "2", ratio1: 78, ratio2: 22 },
        { name: "Touches in Opposition Box", team1: "22", team2: "10", ratio1: 69, ratio2: 31 },
        { name: "Big Chances", team1: "4", team2: "0", ratio1: 100, ratio2: 0 },
        { name: "Big Chances Missed", team1: "2", team2: "0", ratio1: 100, ratio2: 0 },
        { name: "Accurate Passes", team1: "278 (78%)", team2: "292 (79%)", ratio1: 49, ratio2: 51 },
        { name: "Yellow Cards", team1: "0", team2: "1", ratio1: 0, ratio2: 100 },
        { name: "Corners", team1: "4", team2: "2", ratio1: 67, ratio2: 33 }
      ],
      lineupDetails: {
        team1: {
          name: "Sweden",
          formation: "3-4-1-2",
          coach: "Graham Potter",
          players: [
            { number: 23, name: "Nordfeldt", rating: 6.3, events: [] },
            { number: 2, name: "Lagerbielke", rating: 6.7, events: [] },
            { number: 4, name: "Hien", rating: 7.1, events: [] },
            { number: 3, name: "Lindelöf", rating: 7.0, isCaptain: true, events: [] },
            { number: 21, name: "Bernhardsson", rating: 6.9, events: [{ type: "sub_off", minute: "90'" }] },
            { number: 16, name: "Karlström", rating: 6.9, events: [{ type: "sub_off", minute: "84'" }] },
            { number: 10, name: "Nygren", rating: 6.7, events: [{ type: "sub_off", minute: "64'" }] },
            { number: 18, name: "Ayari", rating: 8.9, isHighlight: true, events: [{ type: "goal", minute: "7'" }, { type: "goal", minute: "90+6'" }] },
            { number: 5, name: "Gudmundsson", rating: 7.2, events: [{ type: "sub_off", minute: "64'" }] },
            { number: 17, name: "Gyökeres", rating: 8.7, events: [{ type: "goal", minute: "59'" }, { type: "assist" }] },
            { number: 9, name: "Isak", rating: 8.8, events: [{ type: "goal", minute: "30'" }, { type: "assist" }, { type: "assist" }, { type: "sub_off", minute: "90'" }] }
          ]
        },
        team2: {
          name: "Tunisia",
          formation: "4-2-3-1",
          coach: "Sabri Lamouchi",
          players: [
            { number: 1, name: "Chamakh", rating: 1.9, events: [] },
            { number: 2, name: "Abdi", rating: 4.6, events: [] },
            { number: 3, name: "Talbi", rating: 5.4, events: [] },
            { number: 4, name: "Rekik", rating: 6.1, events: [{ type: "goal", minute: "43'" }] },
            { number: 17, name: "Skhiri", rating: 5.8, isCaptain: true, events: [] },
            { number: 13, name: "Khedira", rating: 5.7, events: [{ type: "yellow_card" }, { type: "sub_off", minute: "84'" }] },
            { number: 25, name: "Ben Slimane", rating: 6.4, events: [{ type: "sub_off", minute: "84'" }] },
            { number: 10, name: "Hannibal", rating: 8.0, events: [{ type: "assist" }] },
            { number: 21, name: "Ben Hamida", rating: 6.0, events: [] },
            { number: 8, name: "Saad", rating: 6.3, events: [{ type: "sub_off", minute: "72'" }] },
            { number: 20, name: "Valery", rating: 5.4, events: [{ type: "sub_off", minute: "72'" }] }
          ]
        }
      },
      substitutesList: {
        team1: [
          { number: 24, name: "Elliot Stroud", rating: 6.2, role: "Midfielder", minute: "64'", events: [] },
          { number: 7, name: "Lucas Bergvall", rating: 7.4, role: "Midfielder", minute: "64'", events: [{ type: "assist" }] },
          { number: 19, name: "Mattias Svanberg", rating: null, role: "Midfielder", minute: "84'", events: [{ type: "goal", minute: "84'" }] },
          { number: 8, name: "Daniel Svensson", rating: null, role: "Midfielder", minute: "90'", events: [] },
          { number: 11, name: "Anthony Elanga", rating: null, role: "Attacker", minute: "90'", events: [] }
        ],
        team2: [
          { number: 7, name: "Elias Achouri", rating: 6.2, role: "Midfielder", minute: "72'", events: [] },
          { number: 15, name: "Hadj Mahmoud", rating: 6.5, role: "Midfielder", minute: "72'", events: [] },
          { number: 26, name: "Sebastian Tounekti", rating: 5.8, role: "Attacker", minute: "72'", events: [] },
          { number: 11, name: "Ismaël Gharbi", rating: null, role: "Midfielder", minute: "84'", events: [] },
          { number: 19, name: "Firas Chaouat", rating: null, role: "Attacker", minute: "84'", events: [] }
        ]
      },
      playerOfTheMatch: {
        name: "Alexander Isak",
        rating: 8.8,
        reason: "One goal and two assists."
      },
      tacticalReviews: {
        team1: {
          title: "Sweden: Ruthless Efficiency and Direct Striking Synergy",
          positives: [
            "Coached by Graham Potter, Sweden surged to the top of Group F with an emphatic 5-1 win at Estadio Monterrey.",
            "Operating from a fluid 3-4-1-2 shape, Sweden maximized space by bypassing unnecessary midfield circulation and attacking directly through transition moments.",
            "Yasin Ayari was the catalyst, opening and closing the scoring with two spectacular long-range strikes.",
            "Alexander Isak and Viktor Gyökeres combined brilliantly, with both forwards constantly stretching Tunisia through physicality, movement, and overlapping runs.",
            "Potter's late introduction of Mattias Svanberg paid off immediately, with the substitute scoring almost instantly after entering the pitch."
          ],
          improvements: [
            "Despite the five-goal margin, Sweden's defensive unit showed vulnerability against static crosses and aerial set-piece sequences.",
            "The back three briefly switched off before halftime, allowing Omar Rekik to head Tunisia back into the match.",
            "Sweden sacrificed sustained possession for verticality, finishing with only 49% possession.",
            "The central midfield occasionally looked overrun during middle phases of the first half.",
            "Against elite possession-heavy teams, surrendering the engine room could expose the backline more severely."
          ]
        },
        team2: {
          title: "Tunisia: Catastrophic Defensive Blunders Undo Set-Piece Resilience",
          positives: [
            "Coached by Sabri Lamouchi, Tunisia showed brief competitive fire during the closing stages of the first half.",
            "Their midfield line, led by Hannibal Mejbri and Anis Ben Slimane, helped Tunisia edge possession with 51%.",
            "Tunisia's set-piece focus produced their only goal, with Hannibal delivering a dangerous free-kick for Omar Rekik to head home in the 43rd minute.",
            "That goal briefly cut the deficit to 2-1 and gave Tunisia momentum heading into halftime."
          ],
          improvements: [
            "Tunisia's defensive discipline collapsed under Sweden's direct and relentless attacking pressure.",
            "The team committed damaging errors in their own defensive third, especially before Sweden's third goal.",
            "Ellyes Skhiri was caught over-dribbling near his own box, allowing Isak to win possession and set up Gyökeres.",
            "After the third goal, Tunisia's 4-2-3-1 structure disintegrated badly.",
            "The backline lacked the pace and tracking discipline to handle Sweden's vertical runners, while the forward line received very little clean service."
          ]
        }
      }
    },
    {
      id: 12,
      date: "Jun 15 2026, Mon - 07:30 (IST)",
      group: "Group E",
      stadium: "Lincoln Financial Field, Philadelphia",
      stadiumAtmosphere: "lincoln",
      team1: { name: "Cote d'Ivoire", code: "CIV", prob: 38 },
      team2: { name: "Ecuador", code: "ECU", prob: 36 },
      drawProb: 26,
      xG1: 1.2,
      xG2: 1.2,
      aiConfidence: 58,
      intensity: 80,
      form1: ["W", "L", "W", "D", "L"],
      form2: ["D", "W", "L", "W", "W"],
      insight: "Tactical battle in midfield; Ecuador's athletic pressing vs Cote d'Ivoire's individual flair.",
      isTopGame: false,
      status: "Completed",
      goals1: 1,
      goals2: 0,
      scorers1: ["Amad 90'"],
      scorers2: [],
      matchNote: "Ivory Coast and Ecuador looked set for a point apiece in their Group E opener at the 2026 World Cup, but super sub Amad Diallo had other ideas.",
      predictionVsReality: {
        probabilities: { homeWin: 38, draw: 26, awayWin: 36 },
        aiOutcome: "Prediction Correct",
        why: "Ivory Coast’s physical resilience, late substitution impact, and transition threat ultimately outweighed Ecuador’s possession control and early territorial dominance."
      },
      summaryText: "Amad Diallo scored a dramatic 90th-minute winner to give the Ivory Coast a 1-0 victory over Ecuador in their opening 2026 World Cup Group E match in Philadelphia. Ecuador dominated large stretches of the game but was denied multiple times by the woodwork. A strong run and cross from Wilfried Singo ultimately set up the late breakthrough to seal the vital points for the West Africans.",
      timelineEvents: [
        { minute: "90'", type: "goal", team: "CIV", player: "Amad", detail: "Goal — Ivory Coast — Amad" },
        { minute: "FT", type: "full_time", score: "Ivory Coast 1-0 Ecuador", detail: "FT — Ivory Coast 1-0 Ecuador" }
      ],
      statsDetails: [
        { name: "Ball Possession", team1: "48%", team2: "52%", ratio1: 48, ratio2: 52 },
        { name: "Expected Goals (xG)", team1: "1.52", team2: "1.01", ratio1: 60, ratio2: 40 },
        { name: "Total Shots", team1: "15", team2: "12", ratio1: 56, ratio2: 44 },
        { name: "Shots on Target", team1: "4", team2: "1", ratio1: 80, ratio2: 20 },
        { name: "Touches in Opposition Box", team1: "39", team2: "16", ratio1: 71, ratio2: 29 },
        { name: "Big Chances", team1: "2", team2: "1", ratio1: 67, ratio2: 33 },
        { name: "Big Chances Missed", team1: "2", team2: "1", ratio1: 67, ratio2: 33 },
        { name: "Accurate Passes", team1: "397 (84%)", team2: "419 (85%)", ratio1: 49, ratio2: 51 },
        { name: "Yellow Cards", team1: "3", team2: "1", ratio1: 75, ratio2: 25 },
        { name: "Corners", team1: "3", team2: "5", ratio1: 38, ratio2: 62 }
      ],
      lineupDetails: {
        team1: {
          name: "Cote d'Ivoire",
          formation: "4-4-2",
          coach: "Emerse Faé",
          players: [
            { number: 1, name: "Fofana", rating: 7.6, events: [] },
            { number: 17, name: "Doué", rating: 7.6, events: [{ type: "yellow_card" }, { type: "sub_off", minute: "89'" }] },
            { number: 20, name: "Agbadou", rating: 7.7, events: [] },
            { number: 3, name: "Konan", rating: 7.0, events: [] },
            { number: 5, name: "Singo", rating: 8.3, isHighlight: true, events: [{ type: "assist" }] },
            { number: 8, name: "Kessié", rating: 7.5, isCaptain: true, events: [{ type: "yellow_card" }] },
            { number: 6, name: "Fofana", rating: 6.9, events: [{ type: "yellow_card" }, { type: "sub_off", minute: "77'" }] },
            { number: 11, name: "Diomandé", rating: 8.3, events: [] },
            { number: 24, name: "Touré", rating: 6.2, events: [{ type: "sub_off", minute: "56'" }] },
            { number: 19, name: "Pépé", rating: 6.7, events: [{ type: "sub_off", minute: "77'" }] },
            { number: 12, name: "Wahi", rating: 6.6, events: [{ type: "sub_off", minute: "56'" }] }
          ]
        },
        team2: {
          name: "Ecuador",
          formation: "3-5-2",
          coach: "Sebastián Beccacece",
          players: [
            { number: 1, name: "Galíndez", rating: 6.5, events: [] },
            { number: 3, name: "Hincapié", rating: 6.5, events: [] },
            { number: 6, name: "Pacho", rating: 6.9, events: [] },
            { number: 4, name: "Ordóñez", rating: 6.9, events: [] },
            { number: 14, name: "Minda", rating: 6.6, events: [{ type: "sub_off", minute: "56'" }] },
            { number: 15, name: "Vite", rating: 7.3, events: [] },
            { number: 23, name: "Caicedo", rating: 6.9, events: [] },
            { number: 21, name: "Franco", rating: 6.9, events: [{ type: "sub_off", minute: "62'" }] },
            { number: 9, name: "Yeboah", rating: 6.9, events: [{ type: "sub_off", minute: "62'" }] },
            { number: 19, name: "Plata", rating: 7.3, events: [] },
            { number: 13, name: "Valencia", rating: 6.6, isCaptain: true, events: [{ type: "sub_off", minute: "77'" }] }
          ]
        }
      },
      substitutesList: {
        team1: [
          { number: 15, name: "Amad Diallo", rating: 8.1, role: "Midfielder", minute: "56'", events: [{ type: "goal", minute: "90'" }] },
          { number: 9, name: "Ange-Yoan Bonny", rating: 6.3, role: "Attacker", minute: "56'", events: [] },
          { number: 26, name: "Christ Inao Oulaï", rating: 6.6, role: "Midfielder", minute: "77'", events: [] },
          { number: 18, name: "Ibrahim Sangaré", rating: 6.3, role: "Midfielder", minute: "77'", events: [] },
          { number: 7, name: "Odilon Kossounou", rating: null, role: "Defender", minute: "89'", events: [] }
        ],
        team2: [
          { number: 20, name: "Nilson Angulo", rating: 6.1, role: "Attacker", minute: "56'", events: [] },
          { number: 25, name: "Jackson Porozo", rating: 5.8, role: "Defender", minute: "62'", events: [{ type: "yellow_card" }] },
          { number: 17, name: "Ángelo Preciado", rating: 6.0, role: "Midfielder", minute: "62'", events: [] },
          { number: 11, name: "Kevin Rodríguez", rating: 5.7, role: "Attacker", minute: "77'", events: [] }
        ]
      },
      playerOfTheMatch: {
        name: "Yan Diomandé",
        rating: 8.3,
        reason: "Created the most chances (5) and had the most touches in the opposition box (12)."
      },
      tacticalReviews: {
        team1: {
          title: "Ivory Coast: Elite Substitution Strategy and Physical Resilience Wear Down the Opposition",
          positives: [
            "Coached by Emerse Faé, Ivory Coast marked their World Cup return with a dramatic 1-0 last-gasp triumph at Philadelphia Stadium.",
            "Operating in a balanced 4-4-2 block, the Elephants showed maturity by absorbing heavy early pressure without breaking.",
            "Franck Kessié and Seko Fofana anchored midfield with physical authority, limiting central entries and buying time for the backline.",
            "Faé’s second-half adjustments were decisive, with Amad Diallo introduced as a super-sub to increase vertical threat and change the rhythm of the match.",
            "The winning goal arrived in the 90th minute after Wilfried Singo launched a powerful transition run and cut the ball back for Amad to finish first time."
          ],
          improvements: [
            "Despite the win, Ivory Coast’s first-half structure was vulnerable to rapid lateral ball movement.",
            "The wide defensive pairings allowed early crosses and box entries that repeatedly threatened the back line.",
            "Possession phases in the first hour were sluggish and lacked vertical progression.",
            "The starting strike duo of Elye Wahi and Nicolas Pépé were largely starved of clean central service.",
            "Early yellow cards to Seko Fofana, Kessié, and Guéla Doué forced the defensive block to play with restricted aggression for long periods."
          ]
        },
        team2: {
          title: "Ecuador: Intense Strategic Pressing Ruined by Fatal Woodwork Woes",
          positives: [
            "Coached by Sebastián Beccacece, Ecuador dominated the tactical script for much of the first half with an aggressive, fluid 3-5-2 system.",
            "Their front-foot counter-press unsettled Ivory Coast, with Moisés Caicedo recycling loose balls and controlling midfield tempo.",
            "John Yeboah and Alan Minda were livewires early on, repeatedly attacking the flanks and creating dangerous moments.",
            "The back three, led by Willian Pacho and Piero Hincapié, stayed strong inside the box for almost the entire match.",
            "Ecuador’s defensive structure neutralized Ivory Coast’s physical target play for long stretches."
          ],
          improvements: [
            "Ecuador’s biggest failure was converting territorial dominance into clinical finishing.",
            "Despite creating quality shooting volume, they struggled to register meaningful shots on target.",
            "The woodwork denied them multiple times, but their final-third execution still lacked killer instinct.",
            "Substituting Enner Valencia in the 77th minute removed their main focal outlet and reduced attacking presence.",
            "Late fatigue caused tracking discipline from the wing-backs to collapse, leaving space at the edge of the box for Amad’s decisive winner."
          ]
        }
      }
    },
    {
      id: 13,
      date: "Jun 15 2026, Mon - 21:30 (IST)",
      group: "Group H",
      stadium: "Mercedes-Benz Stadium, Atlanta, Georgia",
      stadiumAtmosphere: "mercedes",
      team1: { name: "Spain", code: "ESP", prob: 74 },
      team2: { name: "Cabo Verde", code: "CPV", prob: 10 },
      drawProb: 16,
      xG1: 2.5,
      xG2: 0.6,
      aiConfidence: 88,
      intensity: 82,
      form1: ["W", "W", "W", "D", "W"],
      form2: ["W", "L", "D", "W", "L"],
      insight: "Spain's positional play and high passing accuracy will restrict Cabo Verde's possession options.",
      isTopGame: false,
      status: "Completed",
      goals1: 0,
      goals2: 0,
      scorers1: ["No scorers"],
      scorers2: ["No scorers"],
      matchNote: "Despite 65 places separating them in the world rankings, Vozinha helped Cape Verde mark their World Cup debut by holding tournament favourites Spain.",
      predictionVsReality: {
        probabilities: { homeWin: 74, draw: 16, awayWin: 10 },
        aiOutcome: "Upset",
        why: "Spain dominated possession, territory, and shot volume as expected, but Cabo Verde’s compact defensive block and Vozinha’s elite goalkeeping turned the match into a historic draw."
      },
      summaryText: "Tournament favorites Spain were held to a shocking 0-0 draw by World Cup debutants Cape Verde in their opening Group H match. Despite registering 27 shots and dominating possession, Spain was continually denied by a resolute defensive line and a spectacular string of saves from 40-year-old Cape Verde goalkeeper Vozinha.",
      timelineEvents: [
        { minute: "Info", type: "info", detail: "No goals scored" },
        { minute: "Highlight", type: "highlight", detail: "Player Highlight — Vozinha preserves clean sheet" },
        { minute: "FT", type: "full_time", detail: "Spain held to 0-0 by Cabo Verde" }
      ],
      statsDetails: [
        { name: "Ball Possession", team1: "74%", team2: "26%", ratio1: 74, ratio2: 26 },
        { name: "Expected Goals (xG)", team1: "2.10", team2: "0.20", ratio1: 91, ratio2: 9 },
        { name: "Total Shots", team1: "27", team2: "6", ratio1: 82, ratio2: 18 },
        { name: "Shots on Target", team1: "7", team2: "1", ratio1: 88, ratio2: 12 },
        { name: "Touches in Opposition Box", team1: "51", team2: "6", ratio1: 89, ratio2: 11 },
        { name: "Big Chances", team1: "2", team2: "1", ratio1: 67, ratio2: 33 },
        { name: "Big Chances Missed", team1: "2", team2: "1", ratio1: 67, ratio2: 33 },
        { name: "Accurate Passes", team1: "734 (92%)", team2: "205 (74%)", ratio1: 78, ratio2: 22 },
        { name: "Yellow Cards", team1: "1", team2: "1", ratio1: 50, ratio2: 50 },
        { name: "Corners", team1: "11", team2: "1", ratio1: 92, ratio2: 8 }
      ],
      lineupDetails: {
        team1: {
          name: "Spain",
          formation: "4-1-2-3",
          coach: "Luis de la Fuente",
          players: [
            { number: 23, name: "Simón", rating: 7.4, events: [] },
            { number: 5, name: "Llorente", rating: 7.9, events: [] },
            { number: 22, name: "Cubarsí", rating: 7.9, events: [] },
            { number: 14, name: "Laporte", rating: 7.5, events: [] },
            { number: 24, name: "Cucurella", rating: 7.4, events: [] },
            { number: 16, name: "Rodri", rating: 7.8, isCaptain: true, events: [{ type: "sub_off", minute: "87'" }] },
            { number: 8, name: "Ruiz", rating: 7.5, events: [{ type: "sub_off", minute: "71'" }] },
            { number: 20, name: "Pedri", rating: 8.6, events: [{ type: "yellow_card" }] },
            { number: 7, name: "Ferran", rating: 6.6, events: [{ type: "sub_off", minute: "81'" }] },
            { number: 21, name: "Oyarzabal", rating: 6.2, events: [] },
            { number: 9, name: "Gavi", rating: 6.8, events: [{ type: "sub_off", minute: "71'" }] }
          ]
        },
        team2: {
          name: "Cabo Verde",
          formation: "4-2-3-1",
          coach: "Bubista",
          players: [
            { number: 1, name: "Vozinha", rating: 9.0, isHighlight: true, events: [] },
            { number: 13, name: "Cabral", rating: 7.2, events: [{ type: "yellow_card" }, { type: "sub_off", minute: "76'" }] },
            { number: 3, name: "Borges", rating: 7.8, events: [] },
            { number: 4, name: "Lopes", rating: 7.1, events: [] },
            { number: 22, name: "Moreira", rating: 6.5, events: [] },
            { number: 20, name: "Mendes", rating: 6.5, isCaptain: true, events: [] },
            { number: 15, name: "Duarte", rating: 6.0, events: [{ type: "sub_off", minute: "61'" }] },
            { number: 6, name: "Pina", rating: 6.7, events: [] },
            { number: 7, name: "Cabral", rating: 7.0, events: [{ type: "sub_off", minute: "61'" }] },
            { number: 19, name: "Livramento", rating: 6.0, events: [{ type: "sub_off", minute: "61'" }] },
            { number: 10, name: "Monteiro", rating: 7.2, events: [{ type: "sub_off", minute: "79'" }] }
          ]
        }
      },
      substitutesList: {
        team1: [
          { number: 6, name: "Mikel Merino", rating: 6.7, role: "Midfielder", minute: "71'", events: [{ type: "sub_on", minute: "71'" }] },
          { number: 19, name: "Lamine Yamal", rating: 6.4, role: "Attacker", minute: "71'", events: [{ type: "sub_on", minute: "71'" }] },
          { number: 10, name: "Dani Olmo", rating: null, role: "Midfielder", minute: "81'", events: [{ type: "sub_on", minute: "81'" }] },
          { number: 17, name: "Nico Williams", rating: null, role: "Attacker", minute: "87'", events: [{ type: "sub_on", minute: "87'" }] }
        ],
        team2: [
          { number: 14, name: "Deroy Duarte", rating: 6.6, role: "Midfielder", minute: "61'", events: [{ type: "sub_on", minute: "61'" }] },
          { number: 21, name: "Nuno da Costa", rating: 6.1, role: "Attacker", minute: "61'", events: [{ type: "sub_on", minute: "61'" }] },
          { number: 17, name: "Willy Semedo", rating: 5.9, role: "Attacker", minute: "61'", events: [{ type: "sub_on", minute: "61'" }] },
          { number: 8, name: "João Paulo", rating: 6.6, role: "Midfielder", minute: "76'", events: [{ type: "sub_on", minute: "76'" }] },
          { number: 18, name: "Telmo Arcanjo", rating: 6.3, role: "Attacker", minute: "79'", events: [{ type: "sub_on", minute: "79'" }] }
        ]
      },
      playerOfTheMatch: {
        name: "Vozinha",
        rating: 9.0,
        reason: "Made 7 saves to keep Spain scoreless."
      },
      tacticalReviews: {
        team1: {
          title: "Spain: Suffocating Possession Stagnates Against a Resolute Wall",
          positives: [
            "Coached by Luis de la Fuente, Spain completely controlled the geographical boundaries of their Group H opener, dictating the game with 74% possession.",
            "Operating in a fluid 4-1-2-3 base shape, Spain’s counter-press was effective and restricted Cabo Verde to just one shot on target.",
            "Rodri and Pedri recycled possession cleanly, allowing Spain to sustain pressure for long periods.",
            "Pau Cubarsí and Aymeric Laporte maintained an aggressive defensive line past halfway to choke out early counterattacks.",
            "Lamine Yamal’s late introduction changed Spain’s attacking profile, adding vertical dynamism and isolation threat in the final twenty minutes."
          ],
          improvements: [
            "Spain’s decision to bench starting wingers Lamine Yamal and Nico Williams backfired, exposing a lack of penetration and lateral ball speed.",
            "Ferran Torres and Mikel Oyarzabal struggled to create separation against Cabo Verde’s dense defensive crowd.",
            "The system lacked a clear Plan B, with limited long-range shooting variation and predictable crossing phases.",
            "When premium chances arrived, Spain lacked the clinical accuracy needed to break the deadlock.",
            "Their immense passing volume did not translate into enough ruthless final-third execution against a compact low block."
          ]
        },
        team2: {
          title: "Cabo Verde: Immaculate Low Block Script Generates Historic Shock",
          positives: [
            "Coached by Bubista, Cabo Verde produced one of the great tactical shocks by securing a historic debut 0-0 draw against tournament favourites Spain.",
            "Their ultra-disciplined 4-2-3-1 defensive shape conceded wide territory while protecting the central corridors.",
            "Kevin Pina and Deroy Duarte worked tirelessly to cut off vertical passing lanes into Pedri and Gavi.",
            "Vozinha delivered a historic goalkeeping performance, making seven saves and denying Spain repeatedly.",
            "The backline, led by Roberto Lopes and Diney Borges, stayed composed under heavy pressure and built an unbreakable defensive wall."
          ],
          improvements: [
            "Cabo Verde’s defensive execution was excellent, but their extreme passivity made it very difficult to relieve pressure.",
            "They held only 26% possession and completed just 205 accurate passes, surrendering the central transition zones.",
            "Dailon Livramento was isolated for most of the match with very little forward support.",
            "Ryan Mendes and Jovane Cabral were forced so deep that Cabo Verde offered minimal vertical counterattacking threat.",
            "As fatigue increased late on, the defensive block dropped dangerously close to the six-yard box.",
            "A rare late corner chance could have turned the draw into an even greater shock, but the finish lacked conviction."
          ]
        }
      }
    },
    {
      id: 14,
      date: "Jun 16 2026, Tue - 00:30 (IST)",
      group: "Group G",
      stadium: "Lumen Field, Seattle, Washington",
      stadiumAtmosphere: "lumen",
      team1: { name: "Belgium", code: "BEL", prob: 66 },
      team2: { name: "Egypt", code: "EGY", prob: 16 },
      drawProb: 18,
      xG1: 2.2,
      xG2: 0.8,
      aiConfidence: 81,
      intensity: 83,
      form1: ["W", "D", "W", "W", "L"],
      form2: ["W", "W", "L", "D", "W"],
      insight: "Belgium's dynamic attacking lines vs Egypt's high defensive line marshaled by veteran structure.",
      isTopGame: true,
      status: "Completed",
      goals1: 1,
      goals2: 1,
      scorers1: ["Hany 66' (OG)"],
      scorers2: ["Ashour 19'"],
      matchNote: "Egypt looked set to win their first-ever match at the World Cup, but the introduction of Romelu Lukaku salvaged a point for Belgium.",
      predictionVsReality: {
        probabilities: { homeWin: 66, draw: 18, awayWin: 16 },
        aiOutcome: "Upset",
        why: "Belgium controlled longer possession phases as expected, but Egypt’s compact defensive structure, Salah-led transition threat, and disciplined midfield pressure made the match far more balanced."
      },
      summaryText: "Egypt and Belgium played to a hard-fought 1-1 draw in their opening Group G match of the 2026 FIFA World Cup. Emam Ashour opened the scoring for Egypt in the first half following a brilliant assist from Mohamed Salah. Belgium salvaged a point in the second half when substitute Romelu Lukaku forced a Mohamed Hany own goal.",
      timelineEvents: [
        { minute: "19'", type: "goal", team: "EGY", player: "Emam Ashour", detail: "Goal — Egypt" },
        { minute: "66'", type: "own_goal", team: "BEL", player: "Mohamed Hany", detail: "Own Goal — Belgium — Hany own goal" },
        { minute: "FT", type: "full_time", detail: "FT — Belgium 1-1 Egypt" }
      ],
      statsDetails: [
        { name: "Ball Possession", team1: "54%", team2: "46%", ratio1: 54, ratio2: 46 },
        { name: "Expected Goals (xG)", team1: "1.35", team2: "1.08", ratio1: 56, ratio2: 44 },
        { name: "Total Shots", team1: "15", team2: "14", ratio1: 52, ratio2: 48 },
        { name: "Shots on Target", team1: "3", team2: "3", ratio1: 50, ratio2: 50 },
        { name: "Touches in Opposition Box", team1: "31", team2: "27", ratio1: 53, ratio2: 47 },
        { name: "Big Chances", team1: "2", team2: "2", ratio1: 50, ratio2: 50 },
        { name: "Big Chances Missed", team1: "2", team2: "2", ratio1: 50, ratio2: 50 },
        { name: "Accurate Passes", team1: "391 (86%)", team2: "323 (81%)", ratio1: 55, ratio2: 45 },
        { name: "Yellow Cards", team1: "2", team2: "2", ratio1: 50, ratio2: 50 },
        { name: "Corners", team1: "2", team2: "7", ratio1: 22, ratio2: 78 }
      ],
      lineupDetails: {
        team1: {
          name: "Belgium",
          formation: "4-2-3-1",
          coach: "Domenico Tedesco",
          players: [
            { number: 1, name: "Courtois", rating: 7.0, events: [] },
            { number: 15, name: "Meunier", rating: 6.3, events: [] },
            { number: 25, name: "Ngoy", rating: 7.4, events: [] },
            { number: 4, name: "Mechele", rating: 7.6, events: [] },
            { number: 21, name: "Castagne", rating: 7.5, events: [{ type: "yellow_card" }, { type: "sub_off", minute: "56'" }] },
            { number: 24, name: "Onana", rating: 6.9, events: [{ type: "sub_off", minute: "56'" }] },
            { number: 8, name: "Tielemans", rating: 7.5, isCaptain: true, events: [] },
            { number: 7, name: "De Bruyne", rating: 7.0, events: [{ type: "sub_off", minute: "85'" }] },
            { number: 10, name: "Trossard", rating: 6.7, events: [] },
            { number: 11, name: "Doku", rating: 6.4, events: [{ type: "sub_off", minute: "85'" }] },
            { number: 17, name: "De Ketelaere", rating: 7.5, events: [{ type: "sub_off", minute: "66'" }] }
          ]
        },
        team2: {
          name: "Egypt",
          formation: "4-2-3-1",
          coach: "Hossam Hassan",
          players: [
            { number: 23, name: "Shobeir", rating: 7.7, events: [] },
            { number: 13, name: "El Fotouh", rating: 6.8, events: [{ type: "yellow_card" }, { type: "sub_off", minute: "88'" }] },
            { number: 14, name: "Fathi", rating: 7.1, events: [{ type: "sub_off", minute: "88'" }] },
            { number: 2, name: "Ibrahim", rating: 6.7, events: [] },
            { number: 3, name: "Hany", rating: 6.5, events: [{ type: "own_goal", minute: "66'" }] },
            { number: 19, name: "Ateya", rating: 6.9, events: [{ type: "yellow_card" }] },
            { number: 10, name: "Salah", rating: 7.2, isCaptain: true, events: [{ type: "assist" }] },
            { number: 8, name: "Ashour", rating: 7.9, isHighlight: true, events: [{ type: "goal", minute: "19'" }, { type: "sub_off", minute: "71'" }] },
            { number: 17, name: "Lasheen", rating: 7.5, events: [] },
            { number: 11, name: "Ziko", rating: 6.1, events: [{ type: "sub_off", minute: "76'" }] },
            { number: 22, name: "Marmoush", rating: 7.2, events: [] }
          ]
        }
      },
      substitutesList: {
        team1: [
          { number: 5, name: "Maxim De Cuyper", rating: 6.7, role: "Defender", minute: "56'", events: [{ type: "sub_on", minute: "56'" }, { type: "yellow_card" }] },
          { number: 23, name: "Nicolas Raskin", rating: 6.8, role: "Midfielder", minute: "56'", events: [{ type: "sub_on", minute: "56'" }] },
          { number: 9, name: "Romelu Lukaku", rating: 5.8, role: "Attacker", minute: "66'", events: [{ type: "sub_on", minute: "66'" }] },
          { number: 20, name: "Hans Vanaken", rating: null, role: "Midfielder", minute: "85'", events: [{ type: "sub_on", minute: "85'" }] },
          { number: 26, name: "Matias Fernandez-Pardo", rating: null, role: "Attacker", minute: "85'", events: [{ type: "sub_on", minute: "85'" }] }
        ],
        team2: [
          { number: 5, name: "Rami Rabia", rating: 6.7, role: "Defender", minute: "71'", events: [{ type: "sub_on", minute: "71'" }] },
          { number: 9, name: "Hamza Abdelkarim", rating: 6.1, role: "Attacker", minute: "76'", events: [{ type: "sub_on", minute: "76'" }] },
          { number: 25, name: "Zizo", rating: 5.7, role: "Attacker", minute: "76'", events: [{ type: "sub_on", minute: "76'" }] },
          { number: 15, name: "Karim Hafez", rating: null, role: "Defender", minute: "88'", events: [{ type: "sub_on", minute: "88'" }] },
          { number: 20, name: "Ibrahim Adel", rating: null, role: "Attacker", minute: "88'", events: [{ type: "sub_on", minute: "88'" }] }
        ]
      },
      playerOfTheMatch: {
        name: "Emam Ashour",
        rating: 7.9,
        reason: "Scored a goal."
      },
      tacticalReviews: {
        team1: {
          title: "Belgium: Sterile Midfield Dominance Stagnates Before a Substitute Rescue",
          positives: [
            "Coached by Domenico Tedesco, Belgium controlled the flow of their Group G opener at Seattle Stadium, using 54% possession to dictate the match’s baseline rhythm.",
            "Youri Tielemans recycled possession cleanly in deeper phases, helping Belgium sustain pressure.",
            "Jérémy Doku offered individual isolation threat on the flank and attempted to stretch Egypt’s compact defensive block.",
            "Tedesco’s second-half management rescued the match, with Romelu Lukaku introduced to give Belgium a true physical focal point.",
            "Lukaku’s presence in the six-yard box immediately disrupted Egypt’s backline and forced the Mohamed Hany own goal that salvaged the draw."
          ],
          improvements: [
            "Belgium’s starting 4-2-3-1 structure looked uncoordinated and lacked spatial urgency.",
            "The midfield pairing of Amadou Onana and Tielemans struggled to move the ball laterally at the speed required to disorganize Egypt.",
            "Kevin De Bruyne was often isolated and starved of clean service in dangerous central zones.",
            "The centre-back pairing of Nathan Ngoy and Brandon Mechele looked vulnerable to vertical transition patterns.",
            "Belgium’s high full-back positioning left large spaces behind the backline that a sharper opponent could have punished more severely."
          ]
        },
        team2: {
          title: "Egypt: Disciplined Counter-Press and Tactical Bravery Shock the Favorites",
          positives: [
            "Coached by Hossam Hassan, Egypt executed a strong tactical blueprint for unsettling a heavyweight opponent on opening night.",
            "Their compact 4-2-3-1 structure closed central lanes and limited Belgium to just three shots on target.",
            "Mohamed Salah’s intelligence created the breakthrough, dragging pressure before threading a clever pass into Emam Ashour.",
            "Ashour finished clinically in the 19th minute to give Egypt a historic first-half lead.",
            "Marwan Attia and Mohanad Lasheen worked tirelessly in midfield to disrupt Belgium’s passing rhythm, while Mostafa Shobeir produced important saves."
          ],
          improvements: [
            "Egypt’s defensive organization was strong for an hour, but they struggled to adapt once Belgium changed their frontline profile.",
            "As fatigue set in late, the side dropped into a reactive low block and surrendered too much pressure.",
            "The backline lost marking assignments on a basic lateral cross, triggering the own goal from Mohamed Hany.",
            "Egypt completely surrendered midfield possession phases in the final stretch.",
            "Omar Marmoush became isolated as the outlet forward, leaving Egypt unable to relieve pressure in the dying minutes."
          ]
        }
      }
    },
    {
      id: 15,
      date: "Jun 16 2026, Tue - 03:30 (IST)",
      group: "Group H",
      stadium: "Hard Rock Stadium, Miami Gardens, Florida",
      stadiumAtmosphere: "hardrock",
      team1: { name: "Saudi Arabia", code: "KSA", prob: 22 },
      team2: { name: "Uruguay", code: "URU", prob: 56 },
      drawProb: 22,
      xG1: 0.9,
      xG2: 1.8,
      aiConfidence: 77,
      intensity: 86,
      form1: ["L", "W", "D", "L", "W"],
      form2: ["W", "W", "D", "W", "L"],
      insight: "Uruguay's intense physical counter-pressing and box strikers are heavily favored.",
      isTopGame: false,
      status: "Completed",
      goals1: 1,
      goals2: 1,
      scorers1: ["Al Amri 41'"],
      scorers2: ["Araújo 80'"],
      matchNote: "Uruguay's persistence paid off at Miami Stadium as Bielsa's men earned a draw in their World Cup opener against Saudi Arabia.",
      predictionVsReality: {
        probabilities: { homeWin: 22, draw: 22, awayWin: 56 },
        aiOutcome: "Upset",
        why: "Uruguay’s possession dominance and attacking volume matched the model’s expectation, but Saudi Arabia’s compact defensive block, set-piece threat, and elite goalkeeping turned the match into a draw."
      },
      summaryText: "Saudi Arabia and Uruguay battled to a hard-fought 1-1 draw in their opening Group H match. Abdulelah Al-Amri opened the scoring for Saudi Arabia in the first half, but Maxi Araujo salvaged a point for Uruguay in the 80th minute. The result was largely defined by a heroic performance from Saudi goalkeeper Mohammed Al-Owais, who made eight crucial saves to frustrate the South Americans.",
      timelineEvents: [
        { minute: "41'", type: "goal", team: "KSA", player: "Abdulelah Al-Amri", detail: "Goal — Saudi Arabia" },
        { minute: "80'", type: "goal", team: "URU", player: "Maxi Araujo", detail: "Goal — Uruguay" },
        { minute: "FT", type: "full_time", detail: "FT — Saudi Arabia 1-1 Uruguay" }
      ],
      statsDetails: [
        { name: "Ball Possession", team1: "33%", team2: "67%", ratio1: 33, ratio2: 67 },
        { name: "Expected Goals (xG)", team1: "0.66", team2: "1.72", ratio1: 28, ratio2: 72 },
        { name: "Total Shots", team1: "7", team2: "27", ratio1: 21, ratio2: 79 },
        { name: "Shots on Target", team1: "3", team2: "10", ratio1: 23, ratio2: 77 },
        { name: "Touches in Opposition Box", team1: "10", team2: "41", ratio1: 20, ratio2: 80 },
        { name: "Big Chances", team1: "1", team2: "2", ratio1: 33, ratio2: 67 },
        { name: "Big Chances Missed", team1: "0", team2: "1", ratio1: 0, ratio2: 100 },
        { name: "Accurate Passes", team1: "236 (73%)", team2: "540 (88%)", ratio1: 30, ratio2: 70 },
        { name: "Yellow Cards", team1: "1", team2: "0", ratio1: 100, ratio2: 0 },
        { name: "Corners", team1: "4", team2: "14", ratio1: 22, ratio2: 78 }
      ],
      lineupDetails: {
        team1: {
          name: "Saudi Arabia",
          formation: "4-4-2",
          coach: "Georgios Donis",
          players: [
            { number: 21, name: "Al Owais", rating: 7.4, events: [] },
            { number: 12, name: "Abdulhamid", rating: 6.9, events: [{ type: "sub_off", minute: "90'" }] },
            { number: 4, name: "Al Amri", rating: 8.0, events: [{ type: "goal", minute: "41'" }, { type: "yellow_card" }] },
            { number: 5, name: "Al Tambakti", rating: 6.3, events: [] },
            { number: 24, name: "Al-Harbi", rating: 7.0, events: [{ type: "sub_off", minute: "90'" }] },
            { number: 26, name: "Al Shamat", rating: 6.3, events: [{ type: "sub_off", minute: "81'" }] },
            { number: 23, name: "Kanno", rating: 7.3, events: [] },
            { number: 15, name: "Alkhaibari", rating: 6.5, events: [] },
            { number: 10, name: "Al-Dawsari", rating: 6.4, isCaptain: true, events: [] },
            { number: 7, name: "Al-Juwayr", rating: 6.8, events: [{ type: "sub_off", minute: "63'" }] },
            { number: 9, name: "Al-Buraikan", rating: 6.4, events: [{ type: "sub_off", minute: "90'" }] }
          ]
        },
        team2: {
          name: "Uruguay",
          formation: "4-4-2",
          coach: "Marcelo Bielsa",
          players: [
            { number: 23, name: "Muslera", rating: 5.6, events: [] },
            { number: 17, name: "Viña", rating: 6.4, events: [{ type: "sub_off", minute: "46'" }] },
            { number: 16, name: "Olivera", rating: 7.9, events: [] },
            { number: 3, name: "Cáceres", rating: 6.9, events: [] },
            { number: 13, name: "Varela", rating: 7.5, events: [] },
            { number: 6, name: "Bentancur", rating: 8.0, events: [] },
            { number: 5, name: "Ugarte", rating: 7.1, events: [{ type: "sub_off", minute: "72'" }] },
            { number: 20, name: "Araújo", rating: 8.1, isHighlight: true, events: [{ type: "goal", minute: "80'" }, { type: "sub_off", minute: "81'" }] },
            { number: 8, name: "Valverde", rating: 6.8, isCaptain: true, events: [] },
            { number: 9, name: "Núñez", rating: 6.3, events: [{ type: "sub_off", minute: "46'" }] },
            { number: 21, name: "Viñas", rating: 6.9, events: [{ type: "sub_off", minute: "90'" }] }
          ]
        }
      },
      substitutesList: {
        team1: [
          { number: 6, name: "Nasser Al-Dawsari", rating: 6.5, role: "Midfielder", minute: "63'", events: [{ type: "sub_on", minute: "63'" }] },
          { number: 13, name: "Nawaf Al-Boushail", rating: null, role: "Defender", minute: "81'", events: [{ type: "sub_on", minute: "81'" }] },
          { number: 3, name: "Ali Lajami", rating: null, role: "Defender", minute: "90'", events: [{ type: "sub_on", minute: "90'" }] },
          { number: 18, name: "Alaa Hajji", rating: null, role: "Midfielder", minute: "90'", events: [{ type: "sub_on", minute: "90'" }] },
          { number: 19, name: "Abdullah Al-Hamdan", rating: null, role: "Attacker", minute: "90'", events: [{ type: "sub_on", minute: "90'" }] }
        ],
        team2: [
          { number: 25, name: "Juan Sanabria", rating: 6.7, role: "Defender", minute: "46'", events: [{ type: "sub_on", minute: "46'" }] },
          { number: 14, name: "Agustín Canobbio", rating: 6.6, role: "Attacker", minute: "46'", events: [{ type: "sub_on", minute: "46'" }] },
          { number: 7, name: "Nicolás de la Cruz", rating: 7.2, role: "Midfielder", minute: "72'", events: [{ type: "sub_on", minute: "72'" }] },
          { number: 18, name: "Brian Rodríguez", rating: null, role: "Attacker", minute: "81'", events: [{ type: "sub_on", minute: "81'" }] },
          { number: 19, name: "Rodrigo Aguirre", rating: null, role: "Attacker", minute: "90'", events: [{ type: "sub_on", minute: "90'" }] }
        ]
      },
      playerOfTheMatch: {
        name: "F. Valverde",
        rating: 7.0,
        reason: "Had the joint-most touches in the opposition box (7)."
      },
      tacticalReviews: {
        team1: {
          title: "Saudi Arabia: Dogged Low Block and Lethal Set-Pieces Stun the Heavyweights",
          positives: [
            "Coached by Georgios Donis, Saudi Arabia produced a disciplined defensive masterclass to hold Uruguay to a 1-1 draw at Miami Stadium.",
            "Operating in a compact 4-4-2 block, the Green Falcons crowded central channels and forced Uruguay into lower-percentage crossing phases.",
            "Mohammed Al-Owais delivered a heroic goalkeeping display, repeatedly denying Uruguay’s high-volume attack.",
            "Donis’ set-piece emphasis paid off in the 41st minute when Abdulelah Al-Amri reacted quickest after a chaotic corner sequence to score the opener.",
            "Saud Abdulhamid and Moteb Al-Harbi showed strong recovery speed in wide areas, helping Saudi Arabia survive early transition pressure."
          ],
          improvements: [
            "Saudi Arabia survived on a very thin margin by retreating into a passive defensive shell after halftime.",
            "They held only 33% possession and offered very little attacking threat in the second half.",
            "Mohamed Kanno and Abdullah Al-Khaibari lost control of midfield tempo as Uruguay increased pressure.",
            "Firas Al-Buraikan became isolated without progressive service.",
            "The side eventually cracked in the 80th minute after a back-post marking error during a chaotic rebound phase."
          ]
        },
        team2: {
          title: "Uruguay: Relentless Second-Half Barrage Marred by Wasteful Early Hubris",
          positives: [
            "Coached by Marcelo Bielsa, Uruguay showed their fighting spirit by producing a relentless second-half barrage to rescue a group-stage point.",
            "Bielsa’s halftime adjustments added verticality through Agustín Canobbio and Juan Sanabria.",
            "Uruguay shifted into a hyper-pressing 4-4-2 / 4-3-3 shape, suffocating Saudi Arabia for long spells.",
            "They dominated the match with 67% possession, 27 total shots, and 14 corners.",
            "Their pressure finally broke through in the 80th minute when Maximiliano Araújo reacted sharply to a rebound and finished clinically.",
            "Federico Valverde helped orchestrate deep recycling phases and kept Saudi Arabia pinned back."
          ],
          improvements: [
            "Uruguay lacked urgency in the first half and allowed Saudi Arabia to grow into the match.",
            "Their lateral ball circulation was too slow early on, playing directly into Saudi Arabia’s compact low block.",
            "Darwin Núñez and Federico Viñas looked uncoordinated when attacking central channels.",
            "Uruguay wasted too many premium shooting opportunities and repeatedly fired straight at Al-Owais.",
            "Defensively, the backline switched off during the 41st-minute corner sequence and conceded an avoidable opener.",
            "Turning 27 total shots into only one goal is a warning sign for future fixtures."
          ]
        }
      }
    },
    {
      id: 16,
      date: "Jun 16 2026, Tue - 06:30 (IST)",
      group: "Group G",
      stadium: "SoFi Stadium, Inglewood, California",
      stadiumAtmosphere: "sofi",
      team1: { name: "Iran", code: "IRN", prob: 45 },
      team2: { name: "New Zealand", code: "NZL", prob: 28 },
      drawProb: 27,
      xG1: 1.4,
      xG2: 1.0,
      aiConfidence: 68,
      intensity: 75,
      form1: ["D", "W", "L", "W", "D"],
      form2: ["L", "D", "W", "L", "W"],
      insight: "Iran's tactical maturity and physical defense give them the edge over New Zealand's aerial targets.",
      isTopGame: false,
      status: "Completed",
      goals1: 2,
      goals2: 2,
      scorers1: ["Rezaeian 32'", "Mohebi 64'"],
      scorers2: ["Just 7'", "Just 54'"],
      matchNote: "All four teams in Group G at the World Cup are level on one point, after New Zealand were twice pegged back by Iran in a 2-2 draw.",
      predictionVsReality: {
        probabilities: { homeWin: 45, draw: 27, awayWin: 28 },
        aiOutcome: "Close Prediction",
        why: "Iran’s attacking responses matched the model’s expectation of strong final-third threat, but New Zealand’s direct target-man mechanics and clinical transitions made the match far more balanced."
      },
      summaryText: "Iran and New Zealand played out a thrilling 2-2 draw in their opening FIFA World Cup 2026 Group G match in Los Angeles. New Zealand took the lead twice through an Elijah Just brace, but Iran responded immediately each time with goals from Ramin Rezaeian and Mohammad Mohebbi to secure a well-deserved point.",
      timelineEvents: [
        { minute: "7'", type: "goal", team: "NZL", player: "Elijah Just", detail: "Goal — New Zealand" },
        { minute: "32'", type: "goal", team: "IRN", player: "Ramin Rezaeian", detail: "Goal — Iran" },
        { minute: "54'", type: "goal", team: "NZL", player: "Elijah Just", detail: "Goal — New Zealand" },
        { minute: "64'", type: "goal", team: "IRN", player: "Mohammad Mohebi", detail: "Goal — Iran" },
        { minute: "FT", type: "full_time", detail: "FT — Iran 2-2 New Zealand" }
      ],
      statsDetails: [
        { name: "Ball Possession", team1: "48%", team2: "52%", ratio1: 48, ratio2: 52 },
        { name: "Expected Goals (xG)", team1: "1.50", team2: "1.24", ratio1: 55, ratio2: 45 },
        { name: "Total Shots", team1: "17", team2: "14", ratio1: 55, ratio2: 45 },
        { name: "Shots on Target", team1: "4", team2: "8", ratio1: 33, ratio2: 67 },
        { name: "Touches in Opposition Box", team1: "25", team2: "21", ratio1: 54, ratio2: 46 },
        { name: "Big Chances", team1: "2", team2: "2", ratio1: 50, ratio2: 50 },
        { name: "Big Chances Missed", team1: "0", team2: "0", ratio1: 0, ratio2: 0 },
        { name: "Accurate Passes", team1: "314 (77%)", team2: "376 (84%)", ratio1: 45, ratio2: 55 },
        { name: "Yellow Cards", team1: "1", team2: "0", ratio1: 100, ratio2: 0 },
        { name: "Corners", team1: "4", team2: "1", ratio1: 80, ratio2: 20 }
      ],
      lineupDetails: {
        team1: {
          name: "Iran",
          formation: "4-4-2",
          coach: "Amir Ghalenoei",
          players: [
            { number: 1, name: "Beiranvand", rating: 6.1, events: [] },
            { number: 23, name: "Rezaeian", rating: 8.6, events: [{ type: "goal", minute: "32'" }, { type: "assist" }] },
            { number: 4, name: "Khalilzadeh", rating: 6.4, events: [] },
            { number: 19, name: "Nemati", rating: 6.4, events: [] },
            { number: 5, name: "Mohammadi", rating: 6.0, events: [] },
            { number: 8, name: "Mohebi", rating: 8.0, events: [{ type: "goal", minute: "64'" }] },
            { number: 14, name: "Ghoddos", rating: 7.3, events: [{ type: "sub_off", minute: "65'" }] },
            { number: 6, name: "Ezatolahi", rating: 7.1, events: [] },
            { number: 17, name: "Yousefi", rating: 6.5, events: [{ type: "sub_off", minute: "46'" }] },
            { number: 20, name: "Moghanlou", rating: 7.2, events: [{ type: "sub_off", minute: "53'" }] },
            { number: 9, name: "Taremi", rating: 7.5, isCaptain: true, events: [{ type: "sub_off", minute: "80'" }] }
          ]
        },
        team2: {
          name: "New Zealand",
          formation: "4-2-3-1",
          coach: "Darren Bazeley",
          players: [
            { number: 1, name: "Crocombe", rating: 6.1, events: [] },
            { number: 13, name: "Cacace", rating: 6.3, events: [{ type: "sub_off", minute: "68'" }] },
            { number: 5, name: "Boxall", rating: 6.3, events: [] },
            { number: 16, name: "Surman", rating: 7.1, events: [] },
            { number: 2, name: "Payne", rating: 6.3, events: [{ type: "sub_off", minute: "77'" }] },
            { number: 8, name: "Stamenic", rating: 6.4, events: [{ type: "sub_off", minute: "90'" }] },
            { number: 6, name: "Bell", rating: 6.8, events: [] },
            { number: 20, name: "McCowatt", rating: 7.2, events: [{ type: "sub_off", minute: "68'" }] },
            { number: 10, name: "Singh", rating: 6.9, events: [{ type: "sub_off", minute: "90'" }] },
            { number: 11, name: "Just", rating: 8.9, isHighlight: true, events: [{ type: "goal", minute: "7'" }, { type: "goal", minute: "54'" }] },
            { number: 9, name: "Wood", rating: 8.2, isCaptain: true, events: [{ type: "assist" }, { type: "assist" }] }
          ]
        }
      },
      substitutesList: {
        team1: [
          { number: 10, name: "Mehdi Ghayedi", rating: 6.1, role: "Attacker", minute: "46'", events: [{ type: "sub_on", minute: "46'" }] },
          { number: 11, name: "Ali Alipour", rating: 6.4, role: "Attacker", minute: "53'", events: [{ type: "sub_on", minute: "53'" }] },
          { number: 3, name: "Ehsan Haji Safi", rating: 6.1, role: "Defender", minute: "65'", events: [{ type: "sub_on", minute: "65'" }, { type: "yellow_card" }] },
          { number: 18, name: "Amirhossein Hosseinzadeh", rating: 6.3, role: "Attacker", minute: "80'", events: [{ type: "sub_on", minute: "80'" }] }
        ],
        team2: [
          { number: 19, name: "Benjamin Old", rating: 5.9, role: "Defender", minute: "68'", events: [{ type: "sub_on", minute: "68'" }] },
          { number: 23, name: "Ryan Thomas", rating: 5.8, role: "Midfielder", minute: "68'", events: [{ type: "sub_on", minute: "68'" }] },
          { number: 24, name: "Callan Elliot", rating: 6.3, role: "Defender", minute: "77'", events: [{ type: "sub_on", minute: "77'" }] },
          { number: 4, name: "Tyler Bindon", rating: null, role: "Defender", minute: "90'", events: [{ type: "sub_on", minute: "90'" }] },
          { number: 21, name: "Jesse Randall", rating: null, role: "Attacker", minute: "90'", events: [{ type: "sub_on", minute: "90'" }] }
        ]
      },
      playerOfTheMatch: {
        name: "R. Rezaeian",
        rating: 8.6,
        reason: "Scored one goal and provided one assist."
      },
      tacticalReviews: {
        team1: {
          title: "Iran: Dynamic Response Rescues Political and Structural Fragility",
          positives: [
            "Coached by Amir Ghalenoei, Iran showed strong character and mental resilience to fight back from behind twice and secure a 2-2 draw in Los Angeles.",
            "Operating from a traditional 4-4-2 base shape, Iran’s immediate attacking responses after conceding were impressive.",
            "Ramin Rezaeian delivered a tactical masterclass from right-back, equalizing with an outside-of-the-foot finish and later assisting the second equalizer.",
            "Mohammad Mohebi timed his box entry perfectly to power home Iran’s second goal off the inside of the post.",
            "Mehdi Taremi’s spatial movement dragged centre-backs away and opened lanes for late midfield runners."
          ],
          improvements: [
            "Iran’s defensive coordination was chaotic and will concern Ghalenoei.",
            "The backline switched off badly for New Zealand’s early opener after just seven minutes.",
            "Shojae Khalilzadeh and Ali Nemati repeatedly struggled to track blind-side runs and simple direct combinations.",
            "Iran’s possession phases were often slow horizontally, limiting their ability to control tempo.",
            "The aging profile of the starting XI meant their pressing intensity faded badly after the 70-minute mark.",
            "Shahriyar Moghanlou looked uncoordinated alongside Taremi, often occupying the same spaces before being replaced early."
          ]
        },
        team2: {
          title: "New Zealand: Efficient Target-Man Mechanics Shock the Heavyweights",
          positives: [
            "Coached by Darren Bazeley, New Zealand executed a direct and effective tactical blueprint that pushed Iran to the limit.",
            "Their disciplined 4-2-3-1 counter-attacking structure bypassed midfield congestion and maximized physical advantages up front.",
            "Elijah Just was the star, scoring a brilliant brace by exploiting spaces behind Iran’s trailing full-backs.",
            "Captain Chris Wood delivered a textbook target-man performance, assisting both goals through hold-up play and clever line-breaking passes.",
            "Joe Bell and Marko Stamenić screened the backline aggressively and forced Iran wide for long spells."
          ],
          improvements: [
            "New Zealand’s direct transitional threat was strong, but they struggled badly to manage leads.",
            "After both goals, the All Whites dropped into a passive low block and invited sustained Iranian pressure.",
            "The back four lacked communication when defending crosses, with both Iranian equalizers coming from wide deliveries.",
            "Full-backs Tim Payne and Liberato Cacace failed to stop crosses or track runners at the back post.",
            "Their heavy reliance on long balls left Sarpreet Singh and Callum McCowatt chasing second balls rather than creating sustained combinations.",
            "New Zealand need better possession control if they want to protect advantages against stronger opponents."
          ]
        }
      }
    },
    {
      id: 17,
      date: "Jun 17 2026, Wed - 00:30 (IST)",
      group: "Group I",
      stadium: "MetLife Stadium, East Rutherford, New Jersey",
      stadiumAtmosphere: "metlife",
      team1: { name: "France", code: "FRA", prob: 68 },
      team2: { name: "Senegal", code: "SEN", prob: 14 },
      drawProb: 18,
      xG1: 2.3,
      xG2: 0.7,
      aiConfidence: 84,
      intensity: 89,
      form1: ["W", "W", "L", "W", "W"],
      form2: ["W", "D", "W", "L", "D"],
      insight: "France's speed on the wings will challenge Senegal's defensive shifting mechanisms.",
      isTopGame: true,
      status: "Completed",
      goals1: 3,
      goals2: 1,
      scorers1: ["Mbappé 66'", "Barcola 82'", "Mbappé 90+6'"],
      scorers2: ["Mbaye 90+5'"],
      matchNote: "Kylian Mbappe has written his name into France's history books, with his double against Senegal breaking another couple of records.",
      predictionVsReality: {
        probabilities: { homeWin: 68, draw: 18, awayWin: 14 },
        aiOutcome: "Prediction Correct",
        why: "France’s superior attacking quality and second-half tactical adjustments matched the pre-match model expectation, with Mbappé’s central movement and late finishing deciding the match."
      },
      summaryText: "France defeated Senegal 3-1 in their opening FIFA World Cup match, overcoming a resilient first-half defensive effort. Captain Kylian Mbappé broke the deadlock and later sealed the win with a stunning stoppage-time strike, becoming France’s all-time leading scorer with 58 goals. Substitute Bradley Barcola added a second for Les Bleus, while Ibrahim Mbaye netted a late consolation goal for Senegal.",
      timelineEvents: [
        { minute: "66'", type: "goal", team: "FRA", player: "Mbappé", detail: "Goal — France" },
        { minute: "82'", type: "goal", team: "FRA", player: "Barcola", detail: "Goal — France" },
        { minute: "90+5'", type: "goal", team: "SEN", player: "Mbaye", detail: "Goal — Senegal" },
        { minute: "90+6'", type: "goal", team: "FRA", player: "Mbappé", detail: "Goal — France" },
        { minute: "FT", type: "full_time", detail: "FT — France 3-1 Senegal" }
      ],
      statsDetails: [
        { name: "Ball Possession", team1: "53%", team2: "47%", ratio1: 53, ratio2: 47 },
        { name: "Expected Goals (xG)", team1: "1.79", team2: "0.53", ratio1: 77, ratio2: 23 },
        { name: "Total Shots", team1: "11", team2: "6", ratio1: 65, ratio2: 35 },
        { name: "Shots on Target", team1: "8", team2: "2", ratio1: 80, ratio2: 20 },
        { name: "Touches in Opposition Box", team1: "19", team2: "13", ratio1: 59, ratio2: 41 },
        { name: "Big Chances", team1: "4", team2: "2", ratio1: 67, ratio2: 33 },
        { name: "Big Chances Missed", team1: "2", team2: "2", ratio1: 50, ratio2: 50 },
        { name: "Accurate Passes", team1: "505 (88%)", team2: "430 (86%)", ratio1: 54, ratio2: 46 },
        { name: "Corners", team1: "6", team2: "4", ratio1: 60, ratio2: 40 }
      ],
      lineupDetails: {
        team1: {
          name: "France",
          formation: "4-2-3-1",
          coach: "Didier Deschamps",
          players: [
            { number: 16, name: "Maignan", rating: 6.2, events: [] },
            { number: 5, name: "Koundé", rating: 7.4, events: [] },
            { number: 4, name: "Upamecano", rating: 8.2, events: [] },
            { number: 17, name: "Saliba", rating: 7.0, events: [] },
            { number: 19, name: "Hernández", rating: 6.9, events: [] },
            { number: 8, name: "Tchouaméni", rating: 7.5, events: [] },
            { number: 14, name: "Rabiot", rating: 7.7, events: [{ type: "assist" }] },
            { number: 11, name: "Olise", rating: 8.3, events: [{ type: "assist" }] },
            { number: 7, name: "Dembélé", rating: 7.1, events: [{ type: "sub_off", minute: "80'" }] },
            { number: 20, name: "Doué", rating: 7.4, events: [{ type: "sub_off", minute: "87'" }] },
            { number: 10, name: "Mbappé", rating: 9.0, isCaptain: true, isHighlight: true, events: [{ type: "goal", minute: "66'" }, { type: "goal", minute: "90+6'" }] }
          ]
        },
        team2: {
          name: "Senegal",
          formation: "4-3-3",
          coach: "Pape Thiaw",
          players: [
            { number: 16, name: "Mendy", rating: 5.5, events: [] },
            { number: 25, name: "Diouf", rating: 6.0, events: [] },
            { number: 19, name: "Niakhaté", rating: 5.6, events: [] },
            { number: 3, name: "Koulibaly", rating: 6.0, isCaptain: true, events: [] },
            { number: 15, name: "Diatta", rating: 6.9, events: [] },
            { number: 26, name: "Gueye", rating: 6.2, events: [{ type: "sub_off", minute: "83'" }] },
            { number: 5, name: "Gueye", rating: 6.3, events: [{ type: "sub_off", minute: "88'" }] },
            { number: 8, name: "Camara", rating: 6.0, events: [{ type: "sub_off", minute: "75'" }] },
            { number: 18, name: "Sarr", rating: 6.2, events: [{ type: "sub_off", minute: "75'" }] },
            { number: 10, name: "Mané", rating: 6.4, events: [] },
            { number: 11, name: "Jackson", rating: 6.2, events: [{ type: "sub_off", minute: "83'" }] }
          ]
        }
      },
      substitutesList: {
        team1: [
          { number: 12, name: "Bradley Barcola", rating: 7.4, role: "Attacker", minute: "80'", events: [{ type: "sub_on", minute: "80'" }, { type: "goal", minute: "82'" }] },
          { number: 24, name: "Rayan Cherki", rating: null, role: "Midfielder", minute: "87'", events: [{ type: "sub_on", minute: "87'" }] }
        ],
        team2: [
          { number: 21, name: "Habib Diarra", rating: 6.1, role: "Midfielder", minute: "75'", events: [{ type: "sub_on", minute: "75'" }] },
          { number: 20, name: "Ibrahim Mbaye", rating: 7.1, role: "Attacker", minute: "75'", events: [{ type: "sub_on", minute: "75'" }, { type: "goal", minute: "90+5'" }] },
          { number: 9, name: "Bamba Dieng", rating: null, role: "Attacker", minute: "83'", events: [{ type: "sub_on", minute: "83'" }] },
          { number: 13, name: "Iliman Ndiaye", rating: null, role: "Attacker", minute: "83'", events: [{ type: "sub_on", minute: "83'" }, { type: "assist" }] },
          { number: 6, name: "Pathé Ciss", rating: null, role: "Midfielder", minute: "88'", events: [{ type: "sub_on", minute: "88'" }] }
        ]
      },
      playerOfTheMatch: {
        name: "M. Olise",
        rating: 8.3,
        reason: "Provided an assist and created the most chances (4)."
      },
      tacticalReviews: {
        team1: {
          title: "France: Tactical Adjustments and Individual Brilliance Rescue a Sluggish Start",
          positives: [
            "Coached by Didier Deschamps, France recovered from a passive opening period to begin their Group I campaign with a 3-1 win at the New York New Jersey Stadium.",
            "France initially operated in a flexible 4-2-3-1 structure but improved significantly after second-half tactical adjustments.",
            "Moving Kylian Mbappé into more central pockets allowed him to exploit gaps and take control of the decisive attacking phases.",
            "Mbappé opened the scoring in the 66th minute from a precise Michael Olise through ball before sealing the win with a stoppage-time strike.",
            "Deschamps’ substitution strategy worked perfectly, with Bradley Barcola adding immediate verticality and scoring shortly after entering the match."
          ],
          improvements: [
            "France’s first half was flat and uncoordinated, with the midfield struggling to generate rhythm.",
            "Aurélien Tchouaméni and Adrien Rabiot did not circulate the ball quickly enough to break Senegal’s compact structure early.",
            "Désiré Doué was isolated for long spells, while Mbappé had to drop too deep to influence play.",
            "The high defensive line looked vulnerable to long balls over the top, especially during Senegal’s early transition chances.",
            "Late tracking discipline from the full-backs dropped, allowing Senegal to score a 90+5' consolation goal and deny France a clean sheet."
          ]
        },
        team2: {
          title: "Senegal: High-Intensity Transition Game Erased by Finishing Woes",
          positives: [
            "Coached by Pape Thiaw, Senegal executed a fearless and organized plan for the first hour, matching France physically and tactically.",
            "Their aggressive 4-3-3 structure used central pressing traps to disrupt French progression lines.",
            "Lamine Camara, Idrissa Gueye, and Pape Gueye won several early second-ball phases and fed vertical transitions.",
            "Sadio Mané and Ismaïla Sarr gave Senegal direct outlets in transition and repeatedly threatened France’s high defensive line.",
            "Substitute Ibrahim Mbaye showed sharp movement in stoppage time, attacking the box and finishing Senegal’s late goal."
          ],
          improvements: [
            "Senegal’s biggest issue was failing to convert first-half territorial dominance into goals.",
            "The frontline wasted clear chances that could have changed the psychological momentum of the match.",
            "Their high pressing became physically difficult to sustain after the 70th minute.",
            "The back four dropped into a disorganized low block, leaving too much space at the edge of the area.",
            "Individual marking assignments collapsed late, giving Mbappé and Barcola the openings needed to punish Senegal decisively."
          ]
        }
      }
    },
    {
      id: 18,
      date: "Jun 17 2026, Wed - 03:30 (IST)",
      group: "Group I",
      stadium: "Gillette Stadium, Foxborough, Massachusetts",
      stadiumAtmosphere: "gillette",
      team1: { name: "Iraq", code: "IRQ", prob: 32 },
      team2: { name: "Norway", code: "NOR", prob: 46 },
      drawProb: 32,
      xG1: 1.1,
      xG2: 1.5,
      aiConfidence: 62,
      intensity: 80,
      form1: ["W", "D", "L", "D", "W"],
      form2: ["L", "W", "W", "L", "D"],
      insight: "Norway's physical forward power is expected to stretch Iraq's central defenders.",
      isTopGame: false,
      status: "Completed",
      goals1: 1,
      goals2: 4,
      scorers1: ["Hussein 39'"],
      scorers2: ["Haaland 29', 43'", "Østigard 76'", "Hussein 90+6' (OG)"],
      matchNote: "Erling Haaland bags brace and was inevitably the star of the show in Norway's World Cup opener, helping secure a 4-1 win over Iraq at Boston Stadium.",
      predictionVsReality: {
        probabilities: { homeWin: 32, draw: 32, awayWin: 46 },
        aiOutcome: "Prediction Correct",
        why: "Norway’s vertical attacking threat, crossing overloads, and Haaland-led finishing matched the pre-match model expectation, while Iraq’s defensive errors widened the final margin."
      },
      summaryText: "Norway secured a dominant 4-1 victory over Iraq in their opening 2026 FIFA World Cup fixture. Erling Haaland starred with a brace, scoring either side of Aymen Hussein’s equalizer for Iraq. Second-half goals from Leo Østigård and an own goal from Hussein sealed all three points for the Norwegians.",
      timelineEvents: [
        { minute: "29'", type: "goal", team: "NOR", player: "Haaland", detail: "Goal — Norway" },
        { minute: "39'", type: "goal", team: "IRQ", player: "Hussein", detail: "Goal — Iraq" },
        { minute: "43'", type: "goal", team: "NOR", player: "Haaland", detail: "Goal — Norway" },
        { minute: "76'", type: "goal", team: "NOR", player: "Østigard", detail: "Goal — Norway" },
        { minute: "90+6'", type: "own_goal", team: "NOR", player: "Hussein", detail: "Goal — Norway — Hussein own goal" },
        { minute: "FT", type: "full_time", detail: "FT — Iraq 1-4 Norway" }
      ],
      statsDetails: [
        { name: "Ball Possession", team1: "39%", team2: "61%", ratio1: 39, ratio2: 61 },
        { name: "Expected Goals (xG)", team1: "0.80", team2: "2.52", ratio1: 24, ratio2: 76 },
        { name: "Total Shots", team1: "11", team2: "12", ratio1: 48, ratio2: 52 },
        { name: "Shots on Target", team1: "1", team2: "5", ratio1: 17, ratio2: 83 },
        { name: "Touches in Opposition Box", team1: "18", team2: "25", ratio1: 42, ratio2: 58 },
        { name: "Big Chances", team1: "1", team2: "5", ratio1: 17, ratio2: 83 },
        { name: "Big Chances Missed", team1: "1", team2: "2", ratio1: 33, ratio2: 67 },
        { name: "Accurate Passes", team1: "271 (81%)", team2: "477 (89%)", ratio1: 36, ratio2: 64 },
        { name: "Yellow Cards", team1: "1", team2: "0", ratio1: 100, ratio2: 0 },
        { name: "Corners", team1: "2", team2: "5", ratio1: 29, ratio2: 71 }
      ],
      lineupDetails: {
        team1: {
          name: "Iraq",
          formation: "4-4-2",
          coach: "Graham Arnold",
          players: [
            { number: 12, name: "Hassan", rating: 5.2, isCaptain: true, events: [] },
            { number: 3, name: "Ali", rating: 5.7, events: [{ type: "sub_off", minute: "73'" }] },
            { number: 4, name: "Tahseen", rating: 3.6, events: [{ type: "yellow_card" }] },
            { number: 5, name: "Hashem", rating: 5.5, events: [] },
            { number: 23, name: "Doski", rating: 6.4, events: [] },
            { number: 8, name: "Bayesh", rating: 6.7, events: [{ type: "sub_off", minute: "78'" }] },
            { number: 24, name: "Ismael", rating: 6.6, events: [{ type: "sub_off", minute: "59'" }] },
            { number: 16, name: "Al-Ammari", rating: 6.9, events: [{ type: "assist" }] },
            { number: 17, name: "Jasim", rating: 6.6, events: [{ type: "injury" }, { type: "sub_off", minute: "73'" }] },
            { number: 9, name: "Al Hamadi", rating: 6.9, events: [{ type: "sub_off", minute: "59'" }] },
            { number: 18, name: "Hussein", rating: 6.2, events: [{ type: "goal", minute: "39'" }, { type: "own_goal", minute: "90+6'" }] }
          ]
        },
        team2: {
          name: "Norway",
          formation: "4-3-3",
          coach: "Ståle Solbakken",
          players: [
            { number: 1, name: "Nyland", rating: 6.5, events: [] },
            { number: 5, name: "Møller Wolfe", rating: 7.3, events: [{ type: "assist" }, { type: "sub_off", minute: "73'" }] },
            { number: 17, name: "Heggem", rating: 7.2, events: [] },
            { number: 3, name: "Ajer", rating: 7.2, events: [] },
            { number: 26, name: "Ryerson", rating: 7.5, events: [] },
            { number: 14, name: "Aursnes", rating: 6.8, events: [{ type: "sub_off", minute: "73'" }] },
            { number: 8, name: "Berge", rating: 7.7, events: [] },
            { number: 20, name: "Nusa", rating: 6.7, events: [{ type: "sub_off", minute: "73'" }] },
            { number: 10, name: "Ødegaard", rating: 7.5, isCaptain: true, events: [{ type: "assist" }, { type: "sub_off", minute: "81'" }] },
            { number: 7, name: "Sørloth", rating: 6.4, events: [{ type: "sub_off", minute: "73'" }] },
            { number: 9, name: "Haaland", rating: 9.2, isHighlight: true, events: [{ type: "goal", minute: "29'" }, { type: "goal", minute: "43'" }] }
          ]
        }
      },
      substitutesList: {
        team1: [
          { number: 14, name: "Zidane Iqbal", rating: 6.4, role: "Midfielder", minute: "59'", events: [{ type: "sub_on", minute: "59'" }] },
          { number: 21, name: "Marko Lawk Farji", rating: 6.4, role: "Attacker", minute: "59'", events: [{ type: "sub_on", minute: "59'" }] },
          { number: 25, name: "Mustafa Saadoun", rating: 6.2, role: "Defender", minute: "73'", events: [{ type: "sub_on", minute: "73'" }] },
          { number: 11, name: "Ahmed Qasem", rating: 6.1, role: "Midfielder", minute: "73'", events: [{ type: "sub_on", minute: "73'" }] },
          { number: 10, name: "Mohanad Ali", rating: 6.0, role: "Attacker", minute: "78'", events: [{ type: "sub_on", minute: "78'" }] }
        ],
        team2: [
          { number: 4, name: "Leo Østigard", rating: 7.3, role: "Defender", minute: "73'", events: [{ type: "sub_on", minute: "73'" }, { type: "goal", minute: "76'" }] },
          { number: 18, name: "Kristian Thorstvedt", rating: 6.2, role: "Midfielder", minute: "73'", events: [{ type: "sub_on", minute: "73'" }] },
          { number: 21, name: "Andreas Schjelderup", rating: 6.1, role: "Attacker", minute: "73'", events: [{ type: "sub_on", minute: "73'" }] },
          { number: 22, name: "Oscar Bobb", rating: 6.3, role: "Attacker", minute: "73'", events: [{ type: "sub_on", minute: "73'" }] },
          { number: 6, name: "Patrick Berg", rating: null, role: "Midfielder", minute: "81'", events: [{ type: "sub_on", minute: "81'" }] }
        ]
      },
      playerOfTheMatch: {
        name: "E. Haaland",
        rating: 9.2,
        reason: "Scored two goals, had the most touches in the opposition box (7), and took the most shots (5)."
      },
      tacticalReviews: {
        team1: {
          title: "Iraq: Valiant Aerial Resilience Ruined by Catastrophic Defensive Blunders",
          positives: [
            "Coached by Graham Arnold, Iraq showed courage and organization despite facing a major technical gap.",
            "Their narrow 4-4-2 block aimed to congest central zones and launch rapid direct counters.",
            "The target-man plan worked in the 39th minute when Amir Al-Ammari delivered a looping cross for Aymen Hussein to power home the equalizer.",
            "Merchas Doski was strong in defensive containment phases, helping limit Norway’s wide channel attacks for stretches.",
            "Iraq’s physical approach gave them a brief foothold before Norway’s individual quality and pressing forced mistakes."
          ],
          improvements: [
            "Iraq’s execution was ultimately undone by catastrophic self-inflicted errors.",
            "Goalkeeper Jalal Hassan’s hesitation before Norway’s second goal allowed Haaland to press and score directly.",
            "After that psychological blow, Iraq dropped too deep and surrendered territory.",
            "The second-half introduction of Zidane Iqbal did not establish midfield control.",
            "Iraq’s zonal set-piece structure failed badly for Norway’s third goal, leaving Østigard completely free.",
            "A late stoppage-time tracking collapse ended with an unfortunate Hussein own goal, making the final scoreline even harsher."
          ]
        },
        team2: {
          title: "Norway: Lethal Vertical Mechanics and Crossing Overloads Crush the Underdogs",
          positives: [
            "Coached by Ståle Solbakken, Norway made a roaring return to the global stage with a dominant 4-1 victory at Boston Stadium.",
            "Operating in a fluid 4-3-3 shape, Norway leaned on crossing overloads, vertical pressing lanes, and fast box occupation.",
            "Erling Haaland was the crown jewel of the blueprint, marking his World Cup debut with a ruthless first-half brace.",
            "Haaland finished a 14-pass move initiated by David Møller Wolfe before later punishing a goalkeeper error for his second goal.",
            "Solbakken’s late tactical changes worked perfectly, with Leo Østigard coming on and scoring from a Martin Ødegaard corner.",
            "Antonio Nusa delivered strong left-sided spatial threat, repeatedly pulling defenders out of shape with his movement and footwork."
          ],
          improvements: [
            "Despite the comfortable scoreline, Norway’s defensive unit showed tracking issues that could become dangerous against stronger teams.",
            "Torbjørn Heggem and Kristoffer Ajer looked uncoordinated early when defending direct aerial sequences.",
            "The backline failed to close the wide half-space before Iraq’s equalizer, allowing a routine cross to become a major threat.",
            "Before the hydration break, Sander Berge and Fredrik Aursnes operated with a passive midfield tempo.",
            "Norway must improve early urgency and defensive recovery speed if they want to avoid giving better opponents easy transition openings."
          ]
        }
      }
    },
    {
      id: 19,
      date: "Jun 17 2026, Wed - 06:30 (IST)",
      group: "Group J",
      stadium: "Arrowhead Stadium, Kansas City, Missouri",
      stadiumAtmosphere: "arrowhead",
      team1: { name: "Argentina", code: "ARG", prob: 72 },
      team2: { name: "Algeria", code: "ALG", prob: 12 },
      drawProb: 16,
      xG1: 2.4,
      xG2: 0.7,
      aiConfidence: 87,
      intensity: 85,
      form1: ["W", "W", "W", "W", "D"],
      form2: ["D", "W", "L", "W", "D"],
      insight: "Argentina's fluid central rotations will challenge Algeria's narrow compact shape.",
      isTopGame: true,
      status: "Completed",
      goals1: 3,
      goals2: 0,
      scorers1: ["Messi 17', 60', 76'"],
      scorers2: [],
      matchNote: "Lionel Messi's marvellous hat-trick, his first at a World Cup, propelled reigning champions Argentina to an emphatic victory over Algeria. Magical Messi matches Klose's record of most goals scored.",
      predictionVsReality: {
        probabilities: { homeWin: 72, draw: 16, awayWin: 12 },
        aiOutcome: "Prediction Correct",
        why: "Argentina’s superior individual quality, central control, and Messi-led attacking efficiency matched the pre-match model expectation, turning a balanced possession game into a comfortable win."
      },
      summaryText: "Argentina kicked off their 2026 FIFA World Cup campaign with a commanding 3-0 victory over Algeria in their Group J opener in Kansas City. Lionel Messi was the undisputed star, scoring his first-ever World Cup hat-trick with clinical finishes in the 17th, 60th, and 76th minutes. Despite Algeria seeing plenty of possession, their attack lacked penetration and they failed to break down a solid Argentine defense. The dominant result gave the defending champions a perfect start to the tournament while allowing Messi to tie Miroslav Klose's all-time record of 16 World Cup goals.",
      timelineEvents: [
        { minute: "17'", type: "goal", team: "ARG", player: "Messi", detail: "Goal — Argentina" },
        { minute: "60'", type: "goal", team: "ARG", player: "Messi", detail: "Goal — Argentina" },
        { minute: "76'", type: "goal", team: "ARG", player: "Messi", detail: "Goal — Argentina" },
        { minute: "FT", type: "full_time", detail: "FT — Argentina 3-0 Algeria" }
      ],
      statsDetails: [
        { name: "Ball Possession", team1: "48%", team2: "52%", ratio1: 48, ratio2: 52 },
        { name: "Expected Goals (xG)", team1: "1.26", team2: "0.32", ratio1: 80, ratio2: 20 },
        { name: "Total Shots", team1: "10", team2: "7", ratio1: 59, ratio2: 41 },
        { name: "Shots on Target", team1: "6", team2: "0", ratio1: 100, ratio2: 0 },
        { name: "Touches in Opposition Box", team1: "12", team2: "14", ratio1: 46, ratio2: 54 },
        { name: "Big Chances", team1: "1", team2: "0", ratio1: 100, ratio2: 0 },
        { name: "Big Chances Missed", team1: "0", team2: "0", ratio1: 0, ratio2: 0 },
        { name: "Accurate Passes", team1: "504 (90%)", team2: "563 (92%)", ratio1: 47, ratio2: 53 },
        { name: "Corners", team1: "2", team2: "2", ratio1: 50, ratio2: 50 }
      ],
      lineupDetails: {
        team1: {
          name: "Argentina",
          formation: "4-3-3",
          coach: "Lionel Scaloni",
          players: [
            { number: 23, name: "Martínez", rating: 7.0, events: [] },
            { number: 4, name: "Montiel", rating: 6.8, events: [{ type: "sub_off", minute: "46'" }] },
            { number: 13, name: "Romero", rating: 7.2, events: [{ type: "sub_off", minute: "80'" }] },
            { number: 6, name: "Martínez", rating: 7.7, events: [] },
            { number: 25, name: "Medina", rating: 7.2, events: [] },
            { number: 7, name: "De Paul", rating: 8.1, events: [{ type: "assist" }] },
            { number: 20, name: "Mac Allister", rating: 7.2, events: [] },
            { number: 24, name: "Fernández", rating: 7.6, events: [] },
            { number: 16, name: "Almada", rating: 7.0, events: [{ type: "sub_off", minute: "55'" }] },
            { number: 22, name: "Martínez", rating: 6.5, events: [{ type: "sub_off", minute: "55'" }] },
            { number: 10, name: "Messi", rating: 9.7, isCaptain: true, isHighlight: true, events: [{ type: "goal", minute: "17'" }, { type: "goal", minute: "60'" }, { type: "goal", minute: "76'" }, { type: "sub_off", minute: "80'" }] }
          ]
        },
        team2: {
          name: "Algeria",
          formation: "4-3-3",
          coach: "Vladimir Petković",
          players: [
            { number: 23, name: "Zidane", rating: 5.5, events: [] },
            { number: 15, name: "Aït Nouri", rating: 6.3, events: [] },
            { number: 21, name: "Bensebaini", rating: 6.5, events: [] },
            { number: 2, name: "Mandi", rating: 6.5, isCaptain: true, events: [] },
            { number: 17, name: "Belghali", rating: 6.1, events: [] },
            { number: 10, name: "Chaïbi", rating: 6.6, events: [] },
            { number: 19, name: "Bentaleb", rating: 6.8, events: [{ type: "sub_off", minute: "82'" }] },
            { number: 14, name: "Boudaoui", rating: 6.3, events: [{ type: "sub_off", minute: "64'" }] },
            { number: 22, name: "Maza", rating: 6.3, events: [{ type: "sub_off", minute: "82'" }] },
            { number: 11, name: "Hadj Moussa", rating: 6.2, events: [{ type: "sub_off", minute: "64'" }] },
            { number: 9, name: "Gouiri", rating: 5.8, events: [{ type: "sub_off", minute: "64'" }] }
          ]
        }
      },
      substitutesList: {
        team1: [
          { number: 26, name: "Nahuel Molina", rating: 7.0, role: "Defender", minute: "46'", events: [{ type: "sub_on", minute: "46'" }] },
          { number: 15, name: "Nicolás González", rating: 7.1, role: "Midfielder", minute: "55'", events: [{ type: "sub_on", minute: "55'" }, { type: "assist" }] },
          { number: 9, name: "Julián Álvarez", rating: 6.0, role: "Attacker", minute: "55'", events: [{ type: "sub_on", minute: "55'" }] },
          { number: 19, name: "Nicolás Otamendi", rating: 6.7, role: "Defender", minute: "80'", events: [{ type: "sub_on", minute: "80'" }] },
          { number: 18, name: "Nico Paz", rating: 6.2, role: "Midfielder", minute: "80'", events: [{ type: "sub_on", minute: "80'" }] }
        ],
        team2: [
          { number: 8, name: "Houssem Aouar", rating: 6.0, role: "Midfielder", minute: "64'", events: [{ type: "sub_on", minute: "64'" }] },
          { number: 18, name: "Mohamed Amoura", rating: 6.1, role: "Attacker", minute: "64'", events: [{ type: "sub_on", minute: "64'" }] },
          { number: 7, name: "Riyad Mahrez", rating: 6.4, role: "Attacker", minute: "64'", events: [{ type: "sub_on", minute: "64'" }] },
          { number: 6, name: "Ramiz Zerrouki", rating: null, role: "Midfielder", minute: "82'", events: [{ type: "sub_on", minute: "82'" }] },
          { number: 20, name: "Adil Boulbina", rating: null, role: "Attacker", minute: "82'", events: [{ type: "sub_on", minute: "82'" }] }
        ]
      },
      playerOfTheMatch: {
        name: "L. Messi",
        rating: 9.7,
        reason: "Scored a hat-trick and took the most shots (6)."
      },
      tacticalReviews: {
        team1: {
          title: "Argentina: Masterclass in Direct Central Orchestration and Historic Efficiency",
          positives: [
            "Coached by Lionel Scaloni, the defending champions opened Group J with a commanding 3-0 victory at Kansas City Stadium.",
            "Argentina operated in a fluid, possession-based 4-3-3 shape and used central channels through Rodrigo De Paul and Alexis Mac Allister to break down Algeria’s mid-block.",
            "Lionel Messi was the undisputed protagonist, marking another historic night with a World Cup hat-trick.",
            "Messi opened the scoring in the 17th minute with a long-range left-footed strike, added a clinical finish at the hour mark, and completed the hat-trick with a trademark curled effort.",
            "Scaloni’s halftime adjustment helped stabilize the right flank, with Nahuel Molina coming on and Nicolás González later providing the cross for Messi’s second goal.",
            "Cristian Romero and Lisandro Martínez were rock-solid defensively, helping restrict Algeria to zero shots on target."
          ],
          improvements: [
            "Despite the clean scoreline, Argentina showed early rhythm-management issues.",
            "In the opening 15 minutes, buildup looked sluggish and disconnected against Algeria’s compact central press.",
            "Lautaro Martínez was isolated for long stretches and received limited clean service.",
            "The high defensive line looked vulnerable to deep blind-side runs early on.",
            "With Nicolás Tagliafico unavailable, Facundo Medina occasionally looked slow when tracking lateral transition patterns.",
            "Against more clinical opponents, those wide half-space gaps could become dangerous."
          ]
        },
        team2: {
          title: "Algeria: Disciplined Low-Block Rigidity Evaporates Under Elite Pressure",
          positives: [
            "Coached by Vladimir Petković, Algeria showed bravery and organization during the early phases.",
            "Their compact 4-3-3 counter-attacking framework created early central pressure and disrupted Argentina’s recycling rhythm.",
            "Farès Chaïbi was lively in transition and delivered dangerous service during Algeria’s better spells.",
            "Aissa Mandi marshaled the penalty box well aerially and helped Algeria stay competitive for long periods.",
            "Goalkeeper Luca Zidane made important interventions to prevent the match from becoming even more one-sided."
          ],
          improvements: [
            "Algeria’s biggest weakness was their inability to sustain focus after Messi’s opening goal.",
            "The defensive line dropped too deep after the 17th-minute breakthrough and surrendered too much territory.",
            "The midfield engine room faded badly after the hour mark, failing to track lateral Argentine movement.",
            "Algeria managed possession volume but lacked penetration and failed to register a shot on target.",
            "Amine Gouiri was neutralized by Romero and became isolated as the central forward.",
            "Substitute Riyad Mahrez was unable to change the final-third rhythm after entering in the second half."
          ]
        }
      }
    },
    {
      id: 20,
      date: "Jun 17 2026, Wed - 09:30 (IST)",
      group: "Group J",
      stadium: "Levi's Stadium, Santa Clara, California",
      stadiumAtmosphere: "levis",
      team1: { name: "Austria", code: "AUT", prob: 52 },
      team2: { name: "Jordan", code: "JOR", prob: 22 },
      drawProb: 26,
      xG1: 1.6,
      xG2: 0.8,
      aiConfidence: 73,
      intensity: 81,
      form1: ["W", "L", "W", "D", "W"],
      form2: ["D", "W", "L", "D", "L"],
      insight: "Austria's aggressive counter-pressing will limit Jordan's transition escape routes.",
      isTopGame: false,
      status: "Completed",
      goals1: 3,
      goals2: 1,
      scorers1: ["Schmid 20'", "Al-Arab 76' (OG)", "Arnautovic 90+12' (Pen)"],
      scorers2: ["Olwan 50'"],
      matchNote: "Jordan continued the trend of World Cup debutants impressing in 2026, but they were ultimately beaten 3-1 by Austria in Group J.",
      predictionVsReality: {
        probabilities: { homeWin: 52, draw: 26, awayWin: 22 },
        aiOutcome: "Prediction Correct",
        why: "Austria’s pressing structure, territorial control, and late set-piece pressure matched the pre-match model expectation, even though Jordan’s counter-attacking threat made the result competitive for long spells."
      },
      summaryText: "Austria defeated World Cup debutants Jordan 3-1 in their opening Group J match at the FIFA World Cup. Romano Schmid opened the scoring with a brilliant first-half strike, but Jordan equalized shortly after the break through Ali Olwan. Austria ultimately secured the win late in the game when a corner deflected in off Jordan's Yazan Al-Arab and substitute Marko Arnautovic converted a stoppage-time penalty.",
      timelineEvents: [
        { minute: "20'", type: "goal", team: "AUT", player: "Schmid", detail: "Goal — Austria" },
        { minute: "50'", type: "goal", team: "JOR", player: "Olwan", detail: "Goal — Jordan" },
        { minute: "76'", type: "goal", team: "AUT", player: "Al-Arab (OG)", detail: "Goal — Austria (Own Goal)" },
        { minute: "90+12'", type: "goal", team: "AUT", player: "Arnautovic (Pen)", detail: "Goal — Austria (Penalty)" },
        { minute: "FT", type: "full_time", detail: "FT — Austria 3-1 Jordan" }
      ],
      statsDetails: [
        { name: "Ball Possession", team1: "63%", team2: "37%", ratio1: 63, ratio2: 37 },
        { name: "Expected Goals (xG)", team1: "1.69", team2: "0.46", ratio1: 79, ratio2: 21 },
        { name: "Total Shots", team1: "11", team2: "11", ratio1: 50, ratio2: 50 },
        { name: "Shots on Target", team1: "4", team2: "4", ratio1: 50, ratio2: 50 },
        { name: "Touches in Opposition Box", team1: "28", team2: "21", ratio1: 57, ratio2: 43 },
        { name: "Big Chances", team1: "4", team2: "0", ratio1: 100, ratio2: 0 },
        { name: "Big Chances Missed", team1: "3", team2: "0", ratio1: 100, ratio2: 0 },
        { name: "Accurate Passes", team1: "487 (84%)", team2: "241 (73%)", ratio1: 67, ratio2: 33 },
        { name: "Yellow Cards", team1: "1", team2: "0", ratio1: 100, ratio2: 0 },
        { name: "Corners", team1: "4", team2: "3", ratio1: 57, ratio2: 43 }
      ],
      lineupDetails: {
        team1: {
          name: "Austria",
          formation: "4-2-3-1",
          coach: "Ralf Rangnick",
          players: [
            { number: 1, name: "Schlager", rating: 7.4, events: [] },
            { number: 5, name: "Posch", rating: 6.8, events: [] },
            { number: 15, name: "Lienhart", rating: 7.7, events: [] },
            { number: 8, name: "Alaba", rating: 7.4, isCaptain: true, events: [{ type: "sub_off", minute: "59'" }] },
            { number: 16, name: "Mwene", rating: 6.4, events: [{ type: "sub_off", minute: "59'" }] },
            { number: 6, name: "Seiwald", rating: 7.5, events: [] },
            { number: 20, name: "Laimer", rating: 6.7, events: [] },
            { number: 18, name: "Schmid", rating: 7.6, events: [{ type: "goal", minute: "20'" }, { type: "sub_off", minute: "83'" }] },
            { number: 4, name: "Schlager", rating: 8.0, isHighlight: true, events: [{ type: "assist" }, { type: "sub_off", minute: "59'" }] },
            { number: 9, name: "Sabitzer", rating: 7.6, events: [{ type: "yellow_card" }] },
            { number: 14, name: "Kalajdzic", rating: 6.5, events: [{ type: "sub_off", minute: "46'" }] }
          ]
        },
        team2: {
          name: "Jordan",
          formation: "3-4-3",
          coach: "Jamal Sellami",
          players: [
            { number: 1, name: "Abulaila", rating: 5.6, events: [] },
            { number: 20, name: "Taha", rating: 7.2, events: [] },
            { number: 5, name: "Al-Arab", rating: 6.5, events: [{ type: "own_goal", minute: "76'" }] },
            { number: 3, name: "Nasib", rating: 6.4, events: [{ type: "injury" }, { type: "sub_off", minute: "81'" }] },
            { number: 23, name: "Haddad", rating: 6.5, isCaptain: true, events: [{ type: "sub_off", minute: "81'" }] },
            { number: 16, name: "Abualnadi", rating: 6.3, events: [{ type: "sub_off", minute: "72'" }] },
            { number: 8, name: "Al-Rawabdeh", rating: 7.9, events: [{ type: "assist" }] },
            { number: 21, name: "Al Rashdan", rating: 6.9, events: [] },
            { number: 11, name: "Fakhouri", rating: 6.8, events: [{ type: "sub_off", minute: "88'" }] },
            { number: 9, name: "Olwan", rating: 7.7, events: [{ type: "goal", minute: "50'" }] },
            { number: 10, name: "Tamari", rating: 6.4, events: [{ type: "sub_off", minute: "88'" }] }
          ]
        }
      },
      substitutesList: {
        team1: [
          { number: 7, name: "Marko Arnautovic", rating: 7.6, role: "Attacker", minute: "46'", events: [{ type: "sub_on", minute: "46'" }, { type: "goal", minute: "90+12'" }] },
          { number: 3, name: "Kevin Danso", rating: 6.8, role: "Defender", minute: "59'", events: [{ type: "sub_on", minute: "59'" }] },
          { number: 17, name: "Carney Chukwuemeka", rating: 5.9, role: "Midfielder", minute: "59'", events: [{ type: "sub_on", minute: "59'" }] },
          { number: 24, name: "Paul Wanner", rating: 6.4, role: "Midfielder", minute: "59'", events: [{ type: "sub_on", minute: "59'" }] },
          { number: 21, name: "Patrick Wimmer", rating: null, role: "Attacker", minute: "83'", events: [{ type: "sub_on", minute: "83'" }] }
        ],
        team2: [
          { number: 17, name: "Saleem Obaid", rating: 5.9, role: "Defender", minute: "72'", events: [{ type: "sub_on", minute: "72'" }] },
          { number: 19, name: "Saed Al-Rosan", rating: null, role: "Defender", minute: "81'", events: [{ type: "sub_on", minute: "81'" }] },
          { number: 13, name: "Mahmoud Al Mardi", rating: null, role: "Midfielder", minute: "81'", events: [{ type: "sub_on", minute: "81'" }] },
          { number: 25, name: "Mohammad Al-Daoud", rating: null, role: "Midfielder", minute: "88'", events: [{ type: "sub_on", minute: "88'" }] },
          { number: 24, name: "Ali Al-Azaizeh", rating: null, role: "Attacker", minute: "88'", events: [{ type: "sub_on", minute: "88'" }] }
        ]
      },
      playerOfTheMatch: {
        name: "Ali Olwan",
        rating: 7.7,
        reason: "Scored a goal and took the joint-most shots (4)."
      },
      tacticalReviews: {
        team1: {
          title: "Austria: Relentless Suffocation and Super-Sub Impact End a 36-Year Drought",
          positives: [
            "Coached by Ralf Rangnick, Austria marked their return to the global stage with a hard-fought 3-1 victory over tournament debutants Jordan.",
            "Austria successfully unleashed their Gegenpressing identity through an intensive 4-2-3-1 framework.",
            "They dominated territorial geography with 63% possession and compressed central avenues to choke Jordan’s early buildup phases.",
            "The opening breakthrough in the 20th minute was excellent: Xaver Schlager split lines to feed Romano Schmid, who produced a curling long-range strike.",
            "Rangnick’s halftime decision to introduce Marko Arnautović changed the physical dynamic of the match.",
            "Arnautović pinned Jordan’s low block, disrupted defensive spacing, helped force late pressure, and converted a 90+12' penalty to seal the win."
          ],
          improvements: [
            "Austria’s biggest concern was their vulnerability to sudden vertical counterattacks.",
            "In the opening phase of the second half, Nicolas Seiwald and Xaver Schlager lacked structural positioning.",
            "Jordan’s equalizer exposed Austria’s weak defensive transition tracking, especially in wide half-spaces.",
            "Stefan Posch and Phillipp Mwene failed to contain the rapid lateral break before Ali Olwan’s goal.",
            "Until late set-piece pressure tilted the game back in Austria’s favor, the starting frontline struggled to generate clear separation inside a crowded penalty area.",
            "Saša Kalajdžić looked disconnected from Austria’s attacking rhythm before being replaced."
          ]
        },
        team2: {
          title: "Jordan: Brave Structural Low Block Ruined by Costly Dead-Ball Naivety",
          positives: [
            "Coached by Jamal Sellami, Jordan delivered a brave and organized performance on their historic World Cup debut.",
            "Their 3-4-3 base shape shifted into a compact 5-4-1 defensive shell, forcing Austria into lower-percentage wide attacks.",
            "Jordan restricted Austria’s dynamic midfield for long spells and stayed competitive beyond the hour mark.",
            "Their counter-attacking plan paid off in the 50th minute after Noor Al-Rawabdeh helped launch a fast transition.",
            "Ali Olwan produced a brilliant driving run into the penalty box and finished calmly to score Jordan’s historic equalizer.",
            "Musa Al-Taamari was a dangerous vertical outlet early on, using acceleration to drag defenders out of position."
          ],
          improvements: [
            "Jordan’s open-play defensive structure was strong, but set-piece defending ultimately cost them the match.",
            "The key breakdown came in the 76th minute when their zonal corner-marking system failed and Yazan Al-Arab turned the ball into his own net.",
            "As fatigue increased, the midfield pivot lost intensity and Jordan retreated too deep.",
            "The team became passive inside their own box and invited repeated late pressure.",
            "Defensive concentration dropped badly in stoppage time, leading to a reckless handball and Arnautović’s penalty.",
            "Jordan showed promise, but must improve late-game stamina and dead-ball discipline to convert competitive performances into points."
          ]
        }
      }
    },
    {
      id: 21,
      date: "Jun 17 2026, Wed - 22:30 (IST)",
      group: "Group K",
      stadium: "NRG Stadium, Houston, Texas",
      stadiumAtmosphere: "nrg",
      team1: { name: "Portugal", code: "POR", prob: 70 },
      team2: { name: "Congo DR", code: "COD", prob: 12 },
      drawProb: 18,
      xG1: 2.3,
      xG2: 0.6,
      aiConfidence: 86,
      intensity: 84,
      form1: ["W", "W", "D", "W", "L"],
      form2: ["L", "W", "D", "L", "W"],
      insight: "Portugal's technical superiority in half-spaces will bypass Congo DR's mid block.",
      isTopGame: false,
      status: "Upcoming"
    },
    {
      id: 22,
      date: "Jun 18 2026, Thu - 07:30 (IST)",
      group: "Group K",
      stadium: "Estadio Azteca, Mexico City",
      stadiumAtmosphere: "azteca",
      team1: { name: "Uzbekistan", code: "UZB", prob: 28 },
      team2: { name: "Colombia", code: "COL", prob: 48 },
      drawProb: 24,
      xG1: 1.0,
      xG2: 1.6,
      aiConfidence: 67,
      intensity: 78,
      form1: ["W", "D", "W", "L", "D"],
      form2: ["W", "W", "D", "W", "W"],
      insight: "Colombia's tactical wing depth will test Uzbekistan's low block transition speeds.",
      isTopGame: false,
      status: "Upcoming"
    },
    {
      id: 23,
      date: "Jun 18 2026, Thu - 21:30 (IST)",
      group: "Group A",
      stadium: "Mercedes-Benz Stadium, Atlanta, Georgia",
      stadiumAtmosphere: "mercedes",
      team1: { name: "Czech Republic", code: "CZE", prob: 45 },
      team2: { name: "South Africa", code: "RSA", prob: 28 },
      drawProb: 27,
      xG1: 1.4,
      xG2: 1.0,
      aiConfidence: 64,
      intensity: 75,
      form1: ["D", "L", "W", "W", "D"],
      form2: ["L", "W", "D", "D", "W"],
      insight: "Czech physical pressing will challenge South Africa's ball progression from the back.",
      isTopGame: false,
      status: "Upcoming"
    },
    {
      id: 24,
      date: "Jun 19 2026, Fri - 00:30 (IST)",
      group: "Group B",
      stadium: "SoFi Stadium, Inglewood, California",
      stadiumAtmosphere: "sofi",
      team1: { name: "Switzerland", code: "SUI", prob: 52 },
      team2: { name: "Bosnia and Herzegovina", code: "BIH", prob: 24 },
      drawProb: 24,
      xG1: 1.6,
      xG2: 0.9,
      aiConfidence: 73,
      intensity: 77,
      form1: ["W", "W", "D", "W", "D"],
      form2: ["W", "L", "D", "L", "W"],
      insight: "Switzerland's structured backline is expected to neutralize Bosnia's direct aerial service.",
      isTopGame: false,
      status: "Upcoming"
    },
    {
      id: 25,
      date: "Jun 19 2026, Fri - 03:30 (IST)",
      group: "Group B",
      stadium: "BC Place, Vancouver",
      stadiumAtmosphere: "bcplace",
      team1: { name: "Canada", code: "CAN", prob: 58 },
      team2: { name: "Qatar", code: "QAT", prob: 18 },
      drawProb: 24,
      xG1: 1.9,
      xG2: 0.8,
      aiConfidence: 79,
      intensity: 81,
      form1: ["L", "W", "W", "D", "L"],
      form2: ["L", "D", "W", "L", "L"],
      insight: "Canada's speed through transition lanes will force Qatar into a deep defensive containment.",
      isTopGame: false,
      status: "Upcoming"
    },
    {
      id: 26,
      date: "Jun 19 2026, Fri - 06:30 (IST)",
      group: "Group A",
      stadium: "Estadio Akron, Guadalajara",
      stadiumAtmosphere: "akron",
      team1: { name: "Mexico", code: "MEX", prob: 48 },
      team2: { name: "Korea Republic", code: "KOR", prob: 28 },
      drawProb: 24,
      xG1: 1.5,
      xG2: 1.0,
      aiConfidence: 70,
      intensity: 85,
      form1: ["W", "D", "W", "W", "L"],
      form2: ["W", "W", "L", "D", "W"],
      insight: "Guadalajara's support will lift Mexico; a high pressing battle in the central third.",
      isTopGame: true,
      status: "Upcoming"
    },
    {
      id: 27,
      date: "Jun 20 2026, Sat - 00:30 (IST)",
      group: "Group D",
      stadium: "Lumen Field, Seattle, Washington",
      stadiumAtmosphere: "lumen",
      team1: { name: "USA", code: "USA", prob: 58 },
      team2: { name: "Australia", code: "AUS", prob: 20 },
      drawProb: 22,
      xG1: 1.8,
      xG2: 0.8,
      aiConfidence: 81,
      intensity: 86,
      form1: ["W", "W", "W", "L", "W"],
      form2: ["D", "W", "L", "W", "D"],
      insight: "USA's progressive midfield carries will challenge Australia's narrow shape block.",
      isTopGame: true,
      status: "Upcoming"
    },
    {
      id: 28,
      date: "Jun 20 2026, Sat - 03:30 (IST)",
      group: "Group C",
      stadium: "Gillette Stadium, Foxborough, Massachusetts",
      stadiumAtmosphere: "gillette",
      team1: { name: "Scotland", code: "SCO", prob: 35 },
      team2: { name: "Morocco", code: "MAR", prob: 38 },
      drawProb: 27,
      xG1: 1.1,
      xG2: 1.2,
      aiConfidence: 60,
      intensity: 80,
      form1: ["W", "D", "W", "L", "D"],
      form2: ["W", "D", "L", "W", "W"],
      insight: "A close physical matchup; Morocco's technical recovery vs Scotland's direct set-pieces.",
      isTopGame: false,
      status: "Upcoming"
    },
    {
      id: 29,
      date: "Jun 20 2026, Sat - 06:00 (IST)",
      group: "Group C",
      stadium: "Lincoln Financial Field, Philadelphia",
      stadiumAtmosphere: "lincoln",
      team1: { name: "Brazil", code: "BRA", prob: 76 },
      team2: { name: "Haiti", code: "HAI", prob: 8 },
      drawProb: 16,
      xG1: 2.8,
      xG2: 0.4,
      aiConfidence: 93,
      intensity: 82,
      form1: ["W", "W", "W", "W", "D"],
      form2: ["L", "L", "W", "D", "L"],
      insight: "Brazil's individual technical superiority will restrict Haiti deep in their own third.",
      isTopGame: false,
      status: "Upcoming"
    },
    {
      id: 30,
      date: "Jun 20 2026, Sat - 08:30 (IST)",
      group: "Group D",
      stadium: "Levi's Stadium, Santa Clara, California",
      stadiumAtmosphere: "levis",
      team1: { name: "Turkey", code: "TUR", prob: 48 },
      team2: { name: "Paraguay", code: "PAR", prob: 24 },
      drawProb: 28,
      xG1: 1.4,
      xG2: 0.9,
      aiConfidence: 68,
      intensity: 79,
      form1: ["L", "W", "W", "D", "L"],
      form2: ["D", "D", "L", "W", "L"],
      insight: "Turkey's midfield playmakers will look to break down Paraguay's structured low block.",
      isTopGame: false,
      status: "Upcoming"
    },
    {
      id: 31,
      date: "Jun 21 2026, Sun - 00:30 (IST)",
      group: "Group E",
      stadium: "BMO Field, Toronto",
      stadiumAtmosphere: "bmo",
      team1: { name: "Germany", code: "GER", prob: 64 },
      team2: { name: "Ecuador", code: "ECU", prob: 18 },
      drawProb: 18,
      xG1: 2.1,
      xG2: 0.9,
      aiConfidence: 81,
      intensity: 84,
      form1: ["W", "W", "D", "W", "W"],
      form2: ["D", "W", "L", "W", "W"],
      insight: "Germany's positional fluid play is expected to bypass Ecuador's direct mid block.",
      isTopGame: true,
      status: "Upcoming"
    },
    {
      id: 32,
      date: "Jun 21 2026, Sun - 03:30 (IST)",
      group: "Group F",
      stadium: "AT&T Stadium, Arlington, Texas",
      stadiumAtmosphere: "att",
      team1: { name: "Netherlands", code: "NED", prob: 48 },
      team2: { name: "Sweden", code: "SWE", prob: 28 },
      drawProb: 24,
      xG1: 1.5,
      xG2: 1.0,
      aiConfidence: 70,
      intensity: 79,
      form1: ["W", "D", "W", "L", "W"],
      form2: ["W", "D", "L", "W", "D"],
      insight: "Netherlands' dynamic rotations in the final third will challenge Sweden's low block width.",
      isTopGame: false,
      status: "Upcoming"
    },
    {
      id: 33,
      date: "Jun 21 2026, Sun - 06:30 (IST)",
      group: "Group F",
      stadium: "Estadio BBVA, Guadalupe",
      stadiumAtmosphere: "bbva",
      team1: { name: "Japan", code: "JPN", prob: 55 },
      team2: { name: "Tunisia", code: "TUN", prob: 20 },
      drawProb: 25,
      xG1: 1.8,
      xG2: 0.8,
      aiConfidence: 74,
      intensity: 81,
      form1: ["W", "W", "D", "W", "D"],
      form2: ["L", "W", "D", "L", "W"],
      insight: "Japan's quick vertical transitions will look to catch Tunisia's backline out of structure.",
      isTopGame: false,
      status: "Upcoming"
    },
    {
      id: 34,
      date: "Jun 21 2026, Sun - 21:30 (IST)",
      group: "Group H",
      stadium: "Lincoln Financial Field, Philadelphia",
      stadiumAtmosphere: "lincoln",
      team1: { name: "Spain", code: "ESP", prob: 52 },
      team2: { name: "Uruguay", code: "URU", prob: 24 },
      drawProb: 24,
      xG1: 1.6,
      xG2: 1.1,
      aiConfidence: 72,
      intensity: 88,
      form1: ["W", "W", "W", "D", "W"],
      form2: ["W", "W", "D", "W", "L"],
      insight: "A tactical masterclass expected; Spain's tiki-taka possession control vs Uruguay's high intensity pressing.",
      isTopGame: true,
      status: "Upcoming"
    },
    {
      id: 35,
      date: "Jun 22 2026, Mon - 00:30 (IST)",
      group: "Group H",
      stadium: "Gillette Stadium, Foxborough, Massachusetts",
      stadiumAtmosphere: "gillette",
      team1: { name: "Cabo Verde", code: "CPV", prob: 35 },
      team2: { name: "Saudi Arabia", code: "KSA", prob: 38 },
      drawProb: 27,
      xG1: 1.2,
      xG2: 1.3,
      aiConfidence: 61,
      intensity: 75,
      form1: ["W", "L", "D", "W", "L"],
      form2: ["L", "W", "D", "L", "W"],
      insight: "A very balanced mid-tier game; Saudi technical execution vs Cabo Verde's physical transition speed.",
      isTopGame: false,
      status: "Upcoming"
    },
    {
      id: 36,
      date: "Jun 22 2026, Mon - 03:30 (IST)",
      group: "Group G",
      stadium: "Lumen Field, Seattle, Washington",
      stadiumAtmosphere: "lumen",
      team1: { name: "Belgium", code: "BEL", prob: 58 },
      team2: { name: "Iran", code: "IRN", prob: 20 },
      drawProb: 22,
      xG1: 1.9,
      xG2: 0.9,
      aiConfidence: 77,
      intensity: 80,
      form1: ["W", "D", "W", "W", "L"],
      form2: ["D", "W", "L", "W", "D"],
      insight: "Belgium's progressive midfield carries are expected to break through Iran's narrow low block.",
      isTopGame: false,
      status: "Upcoming"
    },
    {
      id: 37,
      date: "Jun 22 2026, Mon - 06:30 (IST)",
      group: "Group G",
      stadium: "Hard Rock Stadium, Miami Gardens, Florida",
      stadiumAtmosphere: "hardrock",
      team1: { name: "Egypt", code: "EGY", prob: 45 },
      team2: { name: "New Zealand", code: "NZL", prob: 28 },
      drawProb: 27,
      xG1: 1.4,
      xG2: 1.0,
      aiConfidence: 66,
      intensity: 76,
      form1: ["W", "W", "L", "D", "W"],
      form2: ["L", "D", "W", "L", "W"],
      insight: "Egypt's wing transitions led by star players will test New Zealand's backline shift speed.",
      isTopGame: false,
      status: "Upcoming"
    },
    {
      id: 38,
      date: "Jun 22 2026, Mon - 22:30 (IST)",
      group: "Group I",
      stadium: "MetLife Stadium, East Rutherford, New Jersey",
      stadiumAtmosphere: "metlife",
      team1: { name: "France", code: "FRA", prob: 66 },
      team2: { name: "Norway", code: "NOR", prob: 18 },
      drawProb: 16,
      xG1: 2.2,
      xG2: 0.8,
      aiConfidence: 83,
      intensity: 85,
      form1: ["W", "W", "L", "W", "W"],
      form2: ["L", "W", "W", "L", "D"],
      insight: "France's speed on the counter will put pressure on Norway's central defense, despite Haaland's presence.",
      isTopGame: true,
      status: "Upcoming"
    },
    {
      id: 39,
      date: "Jun 23 2026, Tue - 01:30 (IST)",
      group: "Group I",
      stadium: "Gillette Stadium, Foxborough, Massachusetts",
      stadiumAtmosphere: "gillette",
      team1: { name: "Senegal", code: "SEN", prob: 52 },
      team2: { name: "Iraq", code: "IRQ", prob: 22 },
      drawProb: 26,
      xG1: 1.6,
      xG2: 0.8,
      aiConfidence: 71,
      intensity: 78,
      form1: ["W", "D", "W", "L", "D"],
      form2: ["W", "D", "L", "D", "W"],
      insight: "Senegal's athletic dominance in midfield is expected to yield control over Iraq's build-up options.",
      isTopGame: false,
      status: "Upcoming"
    },
    {
      id: 40,
      date: "Jun 23 2026, Tue - 04:30 (IST)",
      group: "Group J",
      stadium: "Arrowhead Stadium, Kansas City, Missouri",
      stadiumAtmosphere: "arrowhead",
      team1: { name: "Argentina", code: "ARG", prob: 65 },
      team2: { name: "Austria", code: "AUT", prob: 18 },
      drawProb: 17,
      xG1: 2.1,
      xG2: 0.9,
      aiConfidence: 82,
      intensity: 87,
      form1: ["W", "W", "W", "W", "D"],
      form2: ["W", "L", "W", "D", "W"],
      insight: "Argentina's fluid central rotations will challenge Austria's high intensity counter-pressing shape.",
      isTopGame: true,
      status: "Upcoming"
    },
    {
      id: 41,
      date: "Jun 23 2026, Tue - 07:30 (IST)",
      group: "Group J",
      stadium: "Levi's Stadium, Santa Clara, California",
      stadiumAtmosphere: "levis",
      team1: { name: "Algeria", code: "ALG", prob: 48 },
      team2: { name: "Jordan", code: "JOR", prob: 24 },
      drawProb: 28,
      xG1: 1.5,
      xG2: 0.9,
      aiConfidence: 68,
      intensity: 79,
      form1: ["D", "W", "L", "W", "D"],
      form2: ["D", "W", "L", "D", "L"],
      insight: "Algeria's experience in midfield spaces will help them control Jordan's transitions.",
      isTopGame: false,
      status: "Upcoming"
    },
    {
      id: 42,
      date: "Jun 23 2026, Tue - 21:30 (IST)",
      group: "Group K",
      stadium: "NRG Stadium, Houston, Texas",
      stadiumAtmosphere: "nrg",
      team1: { name: "Portugal", code: "POR", prob: 54 },
      team2: { name: "Colombia", code: "COL", prob: 24 },
      drawProb: 22,
      xG1: 1.8,
      xG2: 1.1,
      aiConfidence: 75,
      intensity: 86,
      form1: ["W", "W", "D", "W", "L"],
      form2: ["W", "W", "D", "W", "W"],
      insight: "A heavyweight fixture; Portugal's technical quality vs Colombia's high pressing energy.",
      isTopGame: true,
      status: "Upcoming"
    },
    {
      id: 43,
      date: "Jun 24 2026, Wed - 00:30 (IST)",
      group: "Group K",
      stadium: "Estadio Azteca, Mexico City",
      stadiumAtmosphere: "azteca",
      team1: { name: "Congo DR", code: "COD", prob: 36 },
      team2: { name: "Uzbekistan", code: "UZB", prob: 36 },
      drawProb: 28,
      xG1: 1.1,
      xG2: 1.1,
      aiConfidence: 56,
      intensity: 75,
      form1: ["L", "W", "D", "L", "W"],
      form2: ["W", "D", "W", "L", "D"],
      insight: "Highly matched fixture; physical wing play from Congo DR vs Uzbekistan's disciplined tactical lines.",
      isTopGame: false,
      status: "Upcoming"
    },
    {
      id: 44,
      date: "Jun 18 2026, Thu - 01:30 (IST)",
      group: "Group L",
      stadium: "Mercedes-Benz Stadium, Atlanta, Georgia",
      stadiumAtmosphere: "mercedes",
      team1: { name: "England", code: "ENG", prob: 55 },
      team2: { name: "Croatia", code: "CRO", prob: 22 },
      drawProb: 23,
      xG1: 1.7,
      xG2: 0.9,
      aiConfidence: 76,
      intensity: 84,
      form1: ["W", "W", "D", "W", "W"],
      form2: ["W", "D", "L", "W", "L"],
      insight: "England's attacking pace out wide is predicted to challenge Croatia's veteran midfield control.",
      isTopGame: true,
      status: "Upcoming"
    },
    {
      id: 45,
      date: "Jun 18 2026, Thu - 04:30 (IST)",
      group: "Group L",
      stadium: "Lincoln Financial Field, Philadelphia",
      stadiumAtmosphere: "lincoln",
      team1: { name: "Ghana", code: "GHA", prob: 45 },
      team2: { name: "Panama", code: "PAN", prob: 28 },
      drawProb: 27,
      xG1: 1.3,
      xG2: 0.9,
      aiConfidence: 64,
      intensity: 78,
      form1: ["L", "W", "D", "W", "L"],
      form2: ["W", "L", "D", "W", "L"],
      insight: "Ghana's direct attacking transition speed should test Panama's narrow defensive shape.",
      isTopGame: false,
      status: "Upcoming"
    },
    {
      id: 46,
      date: "Jun 24 2026, Wed - 22:30 (IST)",
      group: "Group A",
      stadium: "Estadio Akron, Guadalajara",
      stadiumAtmosphere: "akron",
      team1: { name: "Korea Republic", code: "KOR", prob: 50 },
      team2: { name: "South Africa", code: "RSA", prob: 24 },
      drawProb: 26,
      xG1: 1.5,
      xG2: 0.9,
      aiConfidence: 71,
      intensity: 81,
      form1: ["W", "W", "L", "D", "W"],
      form2: ["L", "W", "D", "D", "W"],
      insight: "Korea Republic's energetic high pressing will look to stifle South Africa's short build-up.",
      isTopGame: false,
      status: "Upcoming"
    },
    {
      id: 47,
      date: "Jun 25 2026, Thu - 01:30 (IST)",
      group: "Group A",
      stadium: "Estadio Azteca, Mexico City",
      stadiumAtmosphere: "azteca",
      team1: { name: "Mexico", code: "MEX", prob: 48 },
      team2: { name: "Czech Republic", code: "CZE", prob: 26 },
      drawProb: 26,
      xG1: 1.5,
      xG2: 1.0,
      aiConfidence: 68,
      intensity: 83,
      form1: ["W", "D", "W", "W", "L"],
      form2: ["D", "L", "W", "W", "D"],
      insight: "Azteca stadium atmosphere is a major factor; Mexico's wing overloads vs Czech physical presence.",
      isTopGame: true,
      status: "Upcoming"
    },
    {
      id: 48,
      date: "Jun 25 2026, Thu - 04:30 (IST)",
      group: "Group B",
      stadium: "BMO Field, Toronto",
      stadiumAtmosphere: "bmo",
      team1: { name: "Canada", code: "CAN", prob: 32 },
      team2: { name: "Switzerland", code: "SUI", prob: 42 },
      drawProb: 26,
      xG1: 1.1,
      xG2: 1.3,
      aiConfidence: 64,
      intensity: 80,
      form1: ["L", "W", "W", "D", "L"],
      form2: ["W", "W", "D", "W", "D"],
      insight: "Switzerland's structural stability will test Canada's direct vertical counter-attacking lines.",
      isTopGame: false,
      status: "Upcoming"
    },
    {
      id: 49,
      date: "Jun 25 2026, Thu - 07:30 (IST)",
      group: "Group B",
      stadium: "SoFi Stadium, Inglewood, California",
      stadiumAtmosphere: "sofi",
      team1: { name: "Bosnia and Herzegovina", code: "BIH", prob: 48 },
      team2: { name: "Qatar", code: "QAT", prob: 24 },
      drawProb: 28,
      xG1: 1.4,
      xG2: 0.9,
      aiConfidence: 68,
      intensity: 76,
      form1: ["W", "L", "D", "L", "W"],
      form2: ["L", "D", "W", "L", "L"],
      insight: "Bosnia's physical presence on set-pieces should give them the edge against Qatar's back three.",
      isTopGame: false,
      status: "Upcoming"
    },
    {
      id: 50,
      date: "Jun 25 2026, Thu - 21:30 (IST)",
      group: "Group C",
      stadium: "MetLife Stadium, East Rutherford, New Jersey",
      stadiumAtmosphere: "metlife",
      team1: { name: "Brazil", code: "BRA", prob: 68 },
      team2: { name: "Scotland", code: "SCO", prob: 14 },
      drawProb: 18,
      xG1: 2.2,
      xG2: 0.7,
      aiConfidence: 85,
      intensity: 84,
      form1: ["W", "W", "W", "W", "D"],
      form2: ["W", "D", "W", "L", "D"],
      insight: "Brazil's individual superiority is expected to control the game, testing Scotland's deep block.",
      isTopGame: true,
      status: "Upcoming"
    },
    {
      id: 51,
      date: "Jun 26 2026, Fri - 00:30 (IST)",
      group: "Group C",
      stadium: "Gillette Stadium, Foxborough, Massachusetts",
      stadiumAtmosphere: "gillette",
      team1: { name: "Morocco", code: "MAR", prob: 56 },
      team2: { name: "Haiti", code: "HAI", prob: 18 },
      drawProb: 26,
      xG1: 1.8,
      xG2: 0.8,
      aiConfidence: 78,
      intensity: 79,
      form1: ["W", "D", "L", "W", "W"],
      form2: ["L", "L", "W", "D", "L"],
      insight: "Morocco's organized defensive transitions will limit Haiti's forward progression speeds.",
      isTopGame: false,
      status: "Upcoming"
    },
    {
      id: 52,
      date: "Jun 26 2026, Fri - 03:30 (IST)",
      group: "Group D",
      stadium: "Lumen Field, Seattle, Washington",
      stadiumAtmosphere: "lumen",
      team1: { name: "USA", code: "USA", prob: 50 },
      team2: { name: "Turkey", code: "TUR", prob: 26 },
      drawProb: 24,
      xG1: 1.6,
      xG2: 1.0,
      aiConfidence: 71,
      intensity: 86,
      form1: ["W", "W", "W", "L", "W"],
      form2: ["L", "W", "W", "D", "L"],
      insight: "A high-intensity midfield battle is predicted; USA's counter-press vs Turkish build-up efficiency.",
      isTopGame: true,
      status: "Upcoming"
    },
    {
      id: 53,
      date: "Jun 26 2026, Fri - 06:30 (IST)",
      group: "Group D",
      stadium: "Levi's Stadium, Santa Clara, California",
      stadiumAtmosphere: "levis",
      team1: { name: "Australia", code: "AUS", prob: 45 },
      team2: { name: "Paraguay", code: "PAR", prob: 26 },
      drawProb: 29,
      xG1: 1.3,
      xG2: 0.9,
      aiConfidence: 65,
      intensity: 80,
      form1: ["D", "W", "L", "W", "D"],
      form2: ["D", "D", "L", "W", "L"],
      insight: "A tight physical encounter with high defensive discipline expected on both ends.",
      isTopGame: false,
      status: "Upcoming"
    },
    {
      id: 54,
      date: "Jun 26 2026, Fri - 22:30 (IST)",
      group: "Group E",
      stadium: "NRG Stadium, Houston, Texas",
      stadiumAtmosphere: "nrg",
      team1: { name: "Germany", code: "GER", prob: 60 },
      team2: { name: "Cote d'Ivoire", code: "CIV", prob: 18 },
      drawProb: 22,
      xG1: 2.0,
      xG2: 0.8,
      aiConfidence: 79,
      intensity: 82,
      form1: ["W", "W", "D", "W", "W"],
      form2: ["W", "L", "W", "D", "L"],
      insight: "Germany's high passing accuracy and recovery rate will limit Cote d'Ivoire's attack options.",
      isTopGame: false,
      status: "Upcoming"
    },
    {
      id: 55,
      date: "Jun 27 2026, Sat - 01:30 (IST)",
      group: "Group E",
      stadium: "BMO Field, Toronto",
      stadiumAtmosphere: "bmo",
      team1: { name: "Ecuador", code: "ECU", prob: 62 },
      team2: { name: "Curacao", code: "CUR", prob: 14 },
      drawProb: 24,
      xG1: 1.9,
      xG2: 0.7,
      aiConfidence: 80,
      intensity: 75,
      form1: ["D", "W", "L", "W", "W"],
      form2: ["D", "L", "L", "W", "D"],
      insight: "Ecuador's physical wing-backs are predicted to overload Curacao's defensive lines.",
      isTopGame: false,
      status: "Upcoming"
    },
    {
      id: 56,
      date: "Jun 27 2026, Sat - 04:30 (IST)",
      group: "Group F",
      stadium: "SoFi Stadium, Inglewood, California",
      stadiumAtmosphere: "sofi",
      team1: { name: "Netherlands", code: "NED", prob: 56 },
      team2: { name: "Tunisia", code: "TUN", prob: 18 },
      drawProb: 26,
      xG1: 1.8,
      xG2: 0.8,
      aiConfidence: 77,
      intensity: 80,
      form1: ["W", "D", "W", "L", "W"],
      form2: ["L", "W", "D", "L", "W"],
      insight: "Netherlands' positional control will keep Tunisia structured deep in their defensive third.",
      isTopGame: false,
      status: "Upcoming"
    },
    {
      id: 57,
      date: "Jun 27 2026, Sat - 07:30 (IST)",
      group: "Group F",
      stadium: "Estadio BBVA, Guadalupe",
      stadiumAtmosphere: "bbva",
      team1: { name: "Sweden", code: "SWE", prob: 38 },
      team2: { name: "Japan", code: "JPN", prob: 36 },
      drawProb: 26,
      xG1: 1.2,
      xG2: 1.2,
      aiConfidence: 61,
      intensity: 84,
      form1: ["W", "D", "L", "W", "D"],
      form2: ["W", "W", "D", "W", "D"],
      insight: "A highly competitive tactical game; Sweden's physical structure vs Japan's high-efficiency transitions.",
      isTopGame: true,
      status: "Upcoming"
    },
    {
      id: 58,
      date: "Jun 27 2026, Sat - 21:30 (IST)",
      group: "Group G",
      stadium: "Lumen Field, Seattle, Washington",
      stadiumAtmosphere: "lumen",
      team1: { name: "Belgium", code: "BEL", prob: 64 },
      team2: { name: "New Zealand", code: "NZL", prob: 14 },
      drawProb: 22,
      xG1: 2.1,
      xG2: 0.7,
      aiConfidence: 81,
      intensity: 78,
      form1: ["W", "D", "W", "W", "L"],
      form2: ["L", "D", "W", "L", "W"],
      insight: "Belgium's creative link play in half-spaces is expected to yield high scoring chances.",
      isTopGame: false,
      status: "Upcoming"
    },
    {
      id: 59,
      date: "Jun 28 2026, Sun - 00:30 (IST)",
      group: "Group G",
      stadium: "Hard Rock Stadium, Miami Gardens, Florida",
      stadiumAtmosphere: "hardrock",
      team1: { name: "Egypt", code: "EGY", prob: 38 },
      team2: { name: "Iran", code: "IRN", prob: 36 },
      drawProb: 26,
      xG1: 1.2,
      xG2: 1.1,
      aiConfidence: 60,
      intensity: 81,
      form1: ["W", "W", "L", "D", "W"],
      form2: ["D", "W", "L", "W", "D"],
      insight: "A tactical battle in midfield; Egypt's individual flair vs Iran's structural maturity.",
      isTopGame: false,
      status: "Upcoming"
    },
    {
      id: 60,
      date: "Jun 28 2026, Sun - 03:30 (IST)",
      group: "Group H",
      stadium: "Lincoln Financial Field, Philadelphia",
      stadiumAtmosphere: "lincoln",
      team1: { name: "Spain", code: "ESP", prob: 58 },
      team2: { name: "Saudi Arabia", code: "KSA", prob: 18 },
      drawProb: 24,
      xG1: 1.8,
      xG2: 0.8,
      aiConfidence: 78,
      intensity: 81,
      form1: ["W", "W", "W", "D", "W"],
      form2: ["L", "W", "D", "L", "W"],
      insight: "Spain's central numerical superiority is expected to dominate Saudi Arabia's low mid block.",
      isTopGame: false,
      status: "Upcoming"
    },
    {
      id: 61,
      date: "Jun 28 2026, Sun - 06:30 (IST)",
      group: "Group E",
      stadium: "Lincoln Financial Field, Philadelphia",
      stadiumAtmosphere: "lincoln",
      team1: { name: "Cote d'Ivoire", code: "CIV", prob: 48 },
      team2: { name: "Curacao", code: "CUR", prob: 24 },
      drawProb: 28,
      xG1: 1.5,
      xG2: 0.9,
      aiConfidence: 68,
      intensity: 75,
      form1: ["W", "L", "W", "D", "L"],
      form2: ["D", "L", "L", "W", "D"],
      insight: "Cote d'Ivoire's direct wing transitions will challenge Curacao's backline shift speed.",
      isTopGame: false,
      status: "Upcoming"
    },
    {
      id: 62,
      date: "Jun 28 2026, Sun - 09:30 (IST)",
      group: "Group H",
      stadium: "Gillette Stadium, Foxborough, Massachusetts",
      stadiumAtmosphere: "gillette",
      team1: { name: "Uruguay", code: "URU", prob: 62 },
      team2: { name: "Cabo Verde", code: "CPV", prob: 14 },
      drawProb: 24,
      xG1: 1.9,
      xG2: 0.7,
      aiConfidence: 80,
      intensity: 83,
      form1: ["W", "W", "D", "W", "L"],
      form2: ["W", "L", "D", "W", "L"],
      insight: "Uruguay's intense physical counter-pressing is predicted to restrict Cabo Verde's exit lanes.",
      isTopGame: false,
      status: "Upcoming"
    },
    {
      id: 63,
      date: "Jun 29 2026, Mon - 00:30 (IST)",
      group: "Group I",
      stadium: "MetLife Stadium, East Rutherford, New Jersey",
      stadiumAtmosphere: "metlife",
      team1: { name: "France", code: "FRA", prob: 70 },
      team2: { name: "Iraq", code: "IRQ", prob: 12 },
      drawProb: 18,
      xG1: 2.3,
      xG2: 0.6,
      aiConfidence: 86,
      intensity: 80,
      form1: ["W", "W", "L", "W", "W"],
      form2: ["W", "D", "L", "D", "W"],
      insight: "France's high pressing line will look to stifle Iraq's ball progression from deep areas.",
      isTopGame: false,
      status: "Upcoming"
    },
    {
      id: 64,
      date: "Jun 29 2026, Mon - 03:30 (IST)",
      group: "Group I",
      stadium: "Lumen Field, Seattle, Washington",
      stadiumAtmosphere: "lumen",
      team1: { name: "Senegal", code: "SEN", prob: 38 },
      team2: { name: "Norway", code: "NOR", prob: 38 },
      drawProb: 24,
      xG1: 1.2,
      xG2: 1.2,
      aiConfidence: 61,
      intensity: 85,
      form1: ["W", "D", "W", "L", "D"],
      form2: ["L", "W", "W", "L", "D"],
      insight: "A highly intensive physical clash; Norway's central targets vs Senegal's athletic recovery speeds.",
      isTopGame: true,
      status: "Upcoming"
    },
    {
      id: 65,
      date: "Jun 29 2026, Mon - 06:30 (IST)",
      group: "Group J",
      stadium: "AT&T Stadium, Arlington, Texas",
      stadiumAtmosphere: "att",
      team1: { name: "Argentina", code: "ARG", prob: 66 },
      team2: { name: "Jordan", code: "JOR", prob: 14 },
      drawProb: 20,
      xG1: 2.2,
      xG2: 0.7,
      aiConfidence: 83,
      intensity: 82,
      form1: ["W", "W", "W", "W", "D"],
      form2: ["D", "W", "L", "D", "L"],
      insight: "Argentina's fluid midfield rotations are expected to break down Jordan's compact low block.",
      isTopGame: true,
      status: "Upcoming"
    },
    {
      id: 66,
      date: "Jun 29 2026, Mon - 09:30 (IST)",
      group: "Group J",
      stadium: "Lincoln Financial Field, Philadelphia",
      stadiumAtmosphere: "lincoln",
      team1: { name: "Algeria", code: "ALG", prob: 36 },
      team2: { name: "Austria", code: "AUT", prob: 38 },
      drawProb: 26,
      xG1: 1.2,
      xG2: 1.2,
      aiConfidence: 58,
      intensity: 81,
      form1: ["D", "W", "L", "W", "D"],
      form2: ["W", "L", "W", "D", "W"],
      insight: "Tactical battle in midfield; Austria's counter-pressing vs Algeria's individual wing play.",
      isTopGame: false,
      status: "Upcoming"
    },
    {
      id: 67,
      date: "Jun 30 2026, Tue - 00:30 (IST)",
      group: "Group K",
      stadium: "NRG Stadium, Houston, Texas",
      stadiumAtmosphere: "nrg",
      team1: { name: "Portugal", code: "POR", prob: 66 },
      team2: { name: "Uzbekistan", code: "UZB", prob: 14 },
      drawProb: 20,
      xG1: 2.1,
      xG2: 0.7,
      aiConfidence: 82,
      intensity: 80,
      form1: ["W", "W", "D", "W", "L"],
      form2: ["W", "D", "W", "L", "D"],
      insight: "Portugal's technical link-ups are predicted to unlock Uzbekistan's organized defensive line.",
      isTopGame: false,
      status: "Upcoming"
    },
    {
      id: 68,
      date: "Jun 30 2026, Tue - 03:30 (IST)",
      group: "Group K",
      stadium: "Estadio BBVA, Guadalupe",
      stadiumAtmosphere: "bbva",
      team1: { name: "Colombia", code: "COL", prob: 52 },
      team2: { name: "Congo DR", code: "COD", prob: 22 },
      drawProb: 26,
      xG1: 1.6,
      xG2: 0.8,
      aiConfidence: 71,
      intensity: 83,
      form1: ["W", "W", "D", "W", "W"],
      form2: ["L", "W", "D", "L", "W"],
      insight: "Colombia's high pressing lines will test Congo DR's transition structure from deep zones.",
      isTopGame: false,
      status: "Upcoming"
    },
    {
      id: 69,
      date: "Jun 24 2026, Wed - 01:30 (IST)",
      group: "Group L",
      stadium: "Mercedes-Benz Stadium, Atlanta, Georgia",
      stadiumAtmosphere: "mercedes",
      team1: { name: "England", code: "ENG", prob: 58 },
      team2: { name: "Ghana", code: "GHA", prob: 20 },
      drawProb: 22,
      xG1: 1.9,
      xG2: 0.8,
      aiConfidence: 78,
      intensity: 82,
      form1: ["W", "W", "D", "W", "W"],
      form2: ["L", "W", "D", "W", "L"],
      insight: "England's technical depth in the half-spaces is expected to yield control over Ghana's defense.",
      isTopGame: true,
      status: "Upcoming"
    },
    {
      id: 70,
      date: "Jun 24 2026, Wed - 04:30 (IST)",
      group: "Group L",
      stadium: "Arrowhead Stadium, Kansas City, Missouri",
      stadiumAtmosphere: "arrowhead",
      team1: { name: "Croatia", code: "CRO", prob: 45 },
      team2: { name: "Panama", code: "PAN", prob: 28 },
      drawProb: 27,
      xG1: 1.4,
      xG2: 0.9,
      aiConfidence: 65,
      intensity: 76,
      form1: ["W", "D", "L", "W", "L"],
      form2: ["W", "L", "D", "W", "L"],
      insight: "Croatia's experienced midfield possession is expected to regulate Panama's physical counter-attacks.",
      isTopGame: false,
      status: "Upcoming"
    },
    {
      id: 71,
      date: "Jun 28 2026, Sun - 02:30 (IST)",
      group: "Group L",
      stadium: "SoFi Stadium, Inglewood, California",
      stadiumAtmosphere: "sofi",
      team1: { name: "England", code: "ENG", prob: 62 },
      team2: { name: "Panama", code: "PAN", prob: 16 },
      drawProb: 22,
      xG1: 2.0,
      xG2: 0.7,
      aiConfidence: 81,
      intensity: 79,
      form1: ["W", "W", "D", "W", "W"],
      form2: ["W", "L", "D", "W", "L"],
      insight: "England's fluid front lines should drag Panama's defenders out of position in SoFi stadium.",
      isTopGame: false,
      status: "Upcoming"
    },
    {
      id: 72,
      date: "Jun 28 2026, Sun - 05:30 (IST)",
      group: "Group L",
      stadium: "Lumen Field, Seattle, Washington",
      stadiumAtmosphere: "lumen",
      team1: { name: "Croatia", code: "CRO", prob: 42 },
      team2: { name: "Ghana", code: "GHA", prob: 32 },
      drawProb: 26,
      xG1: 1.3,
      xG2: 1.0,
      aiConfidence: 62,
      intensity: 82,
      form1: ["W", "D", "L", "W", "L"],
      form2: ["L", "W", "D", "W", "L"],
      insight: "A tight and crucial final group match; Croatia's shape structure vs Ghana's athletic wing plays.",
      isTopGame: true,
      status: "Upcoming"
    }
  ];

  // 2. Team Color Maps & SVGs Helper for Flags
  export const teamColors = {
    MEX: ['#006847', '#FFFFFF', '#CE1126'],
    RSA: ['#007A4D', '#FFB612', '#000000'],
    KOR: ['#CD2E3A', '#0047A0', '#FFFFFF'],
    CZE: ['#11457E', '#D7141A', '#FFFFFF'],
    CAN: ['#FF0000', '#FFFFFF'],
    BIH: ['#002F6C', '#FECB00'],
    QAT: ['#8A1538', '#FFFFFF'],
    SUI: ['#DA291C', '#FFFFFF'],
    BRA: ['#009739', '#FFDF00', '#002776'],
    MAR: ['#C1272D', '#006233'],
    HAI: ['#00209F', '#D21034'],
    SCO: ['#005EB8', '#FFFFFF'],
    USA: ['#0A2540', '#E01931', '#FFFFFF'],
    PAR: ['#D11919', '#FFFFFF', '#1931A8'],
    AUS: ['#00008B', '#FFD700'],
    TUR: ['#E30A17', '#FFFFFF'],
    GER: ['#000000', '#DD0000', '#FFCC00'],
    CUR: ['#002B7F', '#F9E814'],
    CIV: ['#F77F00', '#FFFFFF', '#009E60'],
    ECU: ['#FFD200', '#003893', '#D5111B'],
    NED: ['#21468B', '#FFFFFF', '#AE1C28'],
    JPN: ['#BC002D', '#FFFFFF'],
    SWE: ['#006AA7', '#FECC00'],
    TUN: ['#E20919', '#FFFFFF'],
    BEL: ['#000000', '#FFD300', '#EF3340'],
    EGY: ['#C0930C', '#E20A16', '#000000'],
    IRN: ['#239B56', '#FFFFFF', '#D32F2F'],
    NZL: ['#000000', '#FFFFFF'],
    ESP: ['#AD1519', '#FABD00'],
    CPV: ['#002F6C', '#FFFFFF', '#D21034'],
    KSA: ['#006C35', '#FFFFFF'],
    URU: ['#0081C6', '#FFFFFF'],
    FRA: ['#002395', '#FFFFFF', '#ED2939'],
    SEN: ['#00853F', '#FDEF42', '#E31B23'],
    IRQ: ['#FF0000', '#FFFFFF', '#000000', '#008000'],
    NOR: ['#BA0C2F', '#00205B', '#FFFFFF'],
    ARG: ['#74ACDF', '#FFFFFF', '#F6B426'],
    ALG: ['#006633', '#FFFFFF', '#D21034'],
    AUT: ['#EF3340', '#FFFFFF'],
    JOR: ['#000000', '#FFFFFF', '#007A3D', '#E20A16'],
    POR: ['#006600', '#FF0000', '#FFCC00'],
    COD: ['#007FFF', '#FAD201', '#E50000'],
    UZB: ['#0099B5', '#FFFFFF', '#1EB53A'],
    COL: ['#FCD116', '#003893', '#CE1126'],
    ENG: ['#E60000', '#FFFFFF'],
    CRO: ['#C8102E', '#FFFFFF', '#003D88'],
    GHA: ['#D21034', '#FCD116', '#006B3F'],
    PAN: ['#DA121A', '#072357', '#FFFFFF']
  };

  export const horizontalFlags = ['GER', 'NED', 'ARG', 'ESP', 'COL', 'CRO', 'CZE', 'CIV', 'ECU', 'EGY', 'IRN', 'CPV', 'SEN', 'COD', 'UZB', 'GHA', 'IRQ', 'AUT'];

  export function generateFlagSVG(code) {
    const colors = teamColors[code] || ['#FFFFFF', '#CCCCCC'];
    const clipId = `clip-${code}-${Math.random().toString(36).substr(2, 9)}`;
    
    if (code === 'JPN') {
      return `<svg viewBox="0 0 100 100" class="flag-svg"><circle cx="50" cy="50" r="50" fill="#FFFFFF" stroke="rgba(255,255,255,0.1)" stroke-width="1"/><circle cx="50" cy="50" r="22" fill="#BC002D"/></svg>`;
    }
    if (code === 'KOR') {
      return `<svg viewBox="0 0 100 100" class="flag-svg"><circle cx="50" cy="50" r="50" fill="#FFFFFF" stroke="rgba(255,255,255,0.1)" stroke-width="1"/><path d="M 30 50 A 20 20 0 0 1 70 50 A 10 10 0 0 1 50 50 A 10 10 0 0 0 30 50" fill="#CD2E3A" /><path d="M 70 50 A 20 20 0 0 1 30 50 A 10 10 0 0 1 50 50 A 10 10 0 0 0 70 50" fill="#0047A0" /></svg>`;
    }
    if (code === 'BRA') {
      return `<svg viewBox="0 0 100 100" class="flag-svg"><circle cx="50" cy="50" r="50" fill="#009739" /><polygon points="50,15 85,50 50,85 15,50" fill="#FFDF00" /><circle cx="50" cy="50" r="18" fill="#002776" /></svg>`;
    }
    if (code === 'ENG') {
      return `<svg viewBox="0 0 100 100" class="flag-svg"><circle cx="50" cy="50" r="50" fill="#FFFFFF" /><rect x="42" y="0" width="16" height="100" fill="#E60000" /><rect x="0" y="42" width="100" height="16" fill="#E60000" /></svg>`;
    }
    if (code === 'USA') {
      return `<svg viewBox="0 0 100 100" class="flag-svg"><clipPath id="${clipId}"><circle cx="50" cy="50" r="50" /></clipPath><g clip-path="url(#${clipId})"><rect x="0" y="0" width="100" height="100" fill="#FFFFFF" /><rect x="0" y="0" width="100" height="7.69" fill="#B22234" /><rect x="0" y="15.38" width="100" height="7.69" fill="#B22234" /><rect x="0" y="30.77" width="100" height="7.69" fill="#B22234" /><rect x="0" y="46.15" width="100" height="7.69" fill="#B22234" /><rect x="0" y="61.54" width="100" height="7.69" fill="#B22234" /><rect x="0" y="76.92" width="100" height="7.69" fill="#B22234" /><rect x="0" y="92.31" width="100" height="7.69" fill="#B22234" /><rect x="0" y="0" width="45" height="53.85" fill="#3C3B6E" /><circle cx="9" cy="11" r="1.5" fill="#FFFFFF" /><circle cx="22" cy="11" r="1.5" fill="#FFFFFF" /><circle cx="35" cy="11" r="1.5" fill="#FFFFFF" /><circle cx="15" cy="22" r="1.5" fill="#FFFFFF" /><circle cx="29" cy="22" r="1.5" fill="#FFFFFF" /><circle cx="9" cy="33" r="1.5" fill="#FFFFFF" /><circle cx="22" cy="33" r="1.5" fill="#FFFFFF" /><circle cx="35" cy="33" r="1.5" fill="#FFFFFF" /><circle cx="15" cy="44" r="1.5" fill="#FFFFFF" /><circle cx="29" cy="44" r="1.5" fill="#FFFFFF" /></g></svg>`;
    }
    
    if (colors.length === 2) {
      return `<svg viewBox="0 0 100 100" class="flag-svg">
        <clipPath id="${clipId}"><circle cx="50" cy="50" r="50" /></clipPath>
        <g clip-path="url(#${clipId})">
          <rect x="0" y="0" width="50" height="100" fill="${colors[0]}" />
          <rect x="50" y="0" width="50" height="100" fill="${colors[1]}" />
        </g>
      </svg>`;
    } else if (colors.length >= 3) {
      const isHorizontal = horizontalFlags.includes(code);
      if (isHorizontal) {
        return `<svg viewBox="0 0 100 100" class="flag-svg">
          <clipPath id="${clipId}"><circle cx="50" cy="50" r="50" /></clipPath>
          <g clip-path="url(#${clipId})">
            <rect x="0" y="0" width="100" height="33.3" fill="${colors[0]}" />
            <rect x="0" y="33.3" width="100" height="33.4" fill="${colors[1]}" />
            <rect x="0" y="66.7" width="100" height="33.3" fill="${colors[2]}" />
          </g>
        </svg>`;
      } else {
        return `<svg viewBox="0 0 100 100" class="flag-svg">
          <clipPath id="${clipId}"><circle cx="50" cy="50" r="50" /></clipPath>
          <g clip-path="url(#${clipId})">
            <rect x="0" y="0" width="33.3" height="100" fill="${colors[0]}" />
            <rect x="33.3" y="0" width="33.4" height="100" fill="${colors[1]}" />
            <rect x="66.7" y="0" width="33.3" height="100" fill="${colors[2]}" />
          </g>
        </svg>`;
      }
    }
  }

  // Real recent forms of the 48 teams
  const realTeamForms = {
    'MEX': ["W", "W", "W", "D", "W"],
    'KOR': ["W", "W", "D", "D", "D"],
    'RSA': ["W", "D", "D", "W", "W"],
    'CZE': ["W", "W", "W", "L", "D"],
    'SUI': ["D", "W", "D", "W", "W"],
    'CAN': ["L", "W", "D", "W", "W"],
    'BIH': ["W", "W", "D", "W", "D"],
    'QAT': ["W", "D", "L", "W", "L"],
    'BRA': ["L", "W", "W", "D", "L"],
    'MAR': ["W", "W", "W", "W", "D"],
    'SCO': ["W", "L", "W", "W", "W"],
    'HAI': ["W", "W", "L", "W", "D"],
    'USA': ["L", "W", "W", "W", "W"],
    'AUS': ["W", "W", "W", "W", "D"],
    'TUR': ["W", "W", "D", "W", "W"],
    'PAR': ["W", "D", "L", "W", "D"],
    'GER': ["W", "W", "W", "W", "W"],
    'ECU': ["W", "D", "D", "D", "D"],
    'CIV': ["W", "W", "D", "W", "W"],
    'CUR': ["D", "W", "D", "W", "W"],
    'NED': ["W", "D", "W", "W", "W"],
    'JPN': ["W", "L", "D", "W", "W"],
    'SWE': ["W", "W", "D", "L", "L"],
    'TUN': ["W", "W", "W", "W", "W"],
    'BEL': ["W", "D", "W", "D", "W"],
    'IRN': ["W", "L", "D", "W", "W"],
    'EGY': ["L", "L", "W", "W", "D"],
    'NZL': ["W", "W", "W", "W", "W"],
    'ESP': ["D", "W", "W", "W", "W"],
    'URU': ["D", "W", "W", "L", "D"],
    'KSA': ["D", "L", "W", "L", "W"],
    'CPV': ["W", "D", "W", "W", "W"],
    'FRA': ["W", "W", "D", "W", "W"],
    'SEN': ["L", "W", "W", "W", "W"],
    'NOR': ["W", "W", "W", "W", "W"],
    'IRQ': ["W", "W", "D", "D", "W"],
    'ARG': ["L", "W", "D", "W", "W"],
    'ALG': ["L", "W", "W", "W", "W"],
    'AUT': ["D", "W", "L", "W", "W"],
    'JOR': ["L", "W", "W", "W", "W"],
    'POR': ["W", "L", "D", "W", "W"],
    'COL': ["W", "W", "D", "D", "L"],
    'UZB': ["W", "D", "D", "W", "L"],
    'COD': ["W", "W", "W", "W", "W"],
    'ENG': ["W", "W", "W", "W", "W"],
    'CRO': ["W", "W", "W", "D", "W"],
    'GHA': ["W", "W", "W", "D", "W"],
    'PAN': ["W", "W", "D", "W", "D"]
  };

  // Override forms in matchesData dynamically
  matchesData.forEach(m => {
    if (realTeamForms[m.team1.code]) {
      m.form1 = [...realTeamForms[m.team1.code]];
    }
    if (realTeamForms[m.team2.code]) {
      m.form2 = [...realTeamForms[m.team2.code]];
    }
  });


