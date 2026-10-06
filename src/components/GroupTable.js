import React from 'react';
import '../styles/Table.css';

const GroupTable = ({ groupName, teams, matches, onTeamClick }) => {
  
  // Logic: အမှတ်တွက်ချက်ခြင်း
  const calculateStats = (teamId) => {
    let stats = { mp: 0, w: 0, d: 0, 0: 0, gf: 0, ga: 0, gd: 0, pts: 0 };

    matches.forEach(match => {
      // ပွဲရလဒ် ရှိမရှိ စစ်ဆေးခြင်း
      if (match.scoreHome !== null && match.scoreAway !== null) {
        const isHome = match.homeId === teamId;
        const isAway = match.awayId === teamId;

        if (isHome || isAway) {
          stats.mp += 1;
          const myScore = isHome ? match.scoreHome : match.scoreAway;
          const oppScore = isHome ? match.scoreAway : match.scoreHome;

          stats.gf += myScore;
          stats.ga += oppScore;

          if (myScore > oppScore) {
            stats.w += 1;
            stats.pts += 3;
          } else if (myScore === oppScore) {
            stats.d += 1;
            stats.pts += 1;
          } else {
            stats.l += 1;
          }
        }
      }
    });
    stats.gd = stats.gf - stats.ga;
    return stats;
  };

  // အသင်းစာရင်းကို အမှတ်အလိုက် စီခြင်း (Ranking Logic)
  const sortedTeams = teams
    .map(team => ({ ...team, ...calculateStats(team.id) }))
    .sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf);

  return (
    <div className="group-container">
      <h3>Group {groupName}</h3>
      <table className="futsal-table">
        <thead>
          <tr>
            <th>Team</th>
            <th>MP</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>GD</th>
            <th>Pts</th>
          </tr>
        </thead>
        <tbody>
          {sortedTeams.map((team, index) => (
            <tr key={team.id} className={index < 2 ? 'top-two' : ''}>
              {/* အသင်းနာမည်ကို နှိပ်လို့ရအောင် ပြင်ဆင်ထားသော နေရာ */}
              <td 
                className="team-name clickable-team" 
                onClick={() => onTeamClick(team.id)}
              >
                {team.name}
              </td>
              <td>{team.mp}</td>
              <td>{team.w}</td>
              <td>{team.d}</td>
              <td>{team.l}</td>
              <td>{team.gd}</td>
              <td><strong>{team.pts}</strong></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GroupTable;
