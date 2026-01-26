import React from 'react';
import MatchCard from './MatchCard';
import '../styles/TeamDetails.css';

/**
 * TeamDetails Component
 */
const TeamDetails = ({ 
  team, 
  matches = [], 
  allPlayers = [], 
  allTeams = [], 
  onClose 
}) => {
  
  if (!team) return null;

  // ၁။ ကစားသမားစာရင်းအား စစ်ဆေးခြင်း
  const safePlayers = Array.isArray(allPlayers) ? allPlayers : [];
  const teamPlayers = safePlayers.filter(p => String(p.teamId) === String(team.id));

  // ၂။ ပွဲစဉ်များအား စစ်ဆေးခြင်း
  const safeMatches = Array.isArray(matches) ? matches : [];
  const teamMatches = safeMatches.filter(
    (m) => String(m.homeId) === String(team.id) || String(m.awayId) === String(team.id)
  );

  // ID ကို 01, 02 ပုံစံပြောင်းရန် (Team Badge အရောင်အတွက်)
  const formatId = (id) => String(id).padStart(2, '0');

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="team-modal glass-panel" onClick={e => e.stopPropagation()}>
        
        {/* ပိတ်ရန်ခလုတ် */}
        <button className="close-btn" onClick={onClose} aria-label="Close">×</button>
        
        {/* Header Section (အပေါ်မှာ အငြိမ်ထားမည်) */}
        <div className="modal-header">
           {/* Team badge ကို class dynamic ထည့်ပေးထားသည် */}
           <div className={`team-badge team-${formatId(team.id)}`}>{team.id}</div>
           <div className="header-text">
             <h2>{team.name}</h2>
             <span className="group-tag">Group {team.group}</span>
           </div>
        </div>

        {/* Content Section: 
            ဒီ modal-content-wrapper သည် Mobile မှာ Scroll အဆင်ပြေစေရန် 
            အဓိက ထည့်သွင်းထားသော အပိုင်းဖြစ်သည်
        */}
        <div className="modal-content-wrapper">
          <div className="modal-grid">
            
            {/* ဘယ်ဘက်ခြမ်း: Squad List */}
            <div className="squad-section">
              <h3>Squad List ({teamPlayers.length})</h3>
              <div className="players-scroll">
                {teamPlayers.length > 0 ? (
                  teamPlayers.map((player, index) => (
                    <div key={index} className="player-row">
                      <span className="p-num">{player.number || (index + 1)}</span>
                      <div className="p-info">
                        <span className="p-name">{player.name}</span>
                        <span className="p-pos">{player.position || 'Player'}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-data-box">
                    <p>No player data available</p>
                    <small>Please check "players" tab in Google Sheet</small>
                  </div>
                )}
              </div>
            </div>

            {/* ညာဘက်ခြမ်း: Match History */}
            <div className="history-section">
              <h3>Match History</h3>
              <div className="history-scroll">
                {teamMatches.length > 0 ? (
                  teamMatches.map((match) => {
                    const homeTeamObj = allTeams.find(t => String(t.id) === String(match.homeId));
                    const awayTeamObj = allTeams.find(t => String(t.id) === String(match.awayId));

                    return (
                      <MatchCard 
                        key={match.id} 
                        match={match} 
                        homeTeam={homeTeamObj}
                        awayTeam={awayTeamObj}
                        onTeamClick={() => {}} 
                      />
                    );
                  })
                ) : (
                  <p className="no-data">No matches scheduled.</p>
                )}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDetails;