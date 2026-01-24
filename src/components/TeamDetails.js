import React from 'react';
import MatchCard from './MatchCard';
import '../styles/TeamDetails.css';

/**
 * TeamDetails Component
 * Props အသီးသီးကို Default value (Array အလွတ်) များ သတ်မှတ်ပေးထားခြင်းဖြင့်
 * Data မရောက်လာမီ Filter လုပ်ရာတွင် Error တက်ခြင်းကို ကာကွယ်ပေးသည်။
 */
const TeamDetails = ({ 
  team, 
  matches = [], 
  allPlayers = [], 
  allTeams = [], 
  onClose 
}) => {
  
  // အကယ်၍ team data မရှိလျှင် Modal ကို မပြဘဲ ပြန်ထွက်မည်
  if (!team) return null;

  // ၁။ ကစားသမားစာရင်းအား စစ်ဆေးခြင်း (Defensive Programming)
  const safePlayers = Array.isArray(allPlayers) ? allPlayers : [];
  const teamPlayers = safePlayers.filter(p => String(p.teamId) === String(team.id));

  // ၂။ ပွဲစဉ်များအား စစ်ဆေးခြင်း (Error တက်နေသည့် အဓိကနေရာအား ပြင်ဆင်ထားသည်)
  const safeMatches = Array.isArray(matches) ? matches : [];
  const teamMatches = safeMatches.filter(
    (m) => String(m.homeId) === String(team.id) || String(m.awayId) === String(team.id)
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="team-modal glass-panel" onClick={e => e.stopPropagation()}>
        
        {/* ပိတ်ရန်ခလုတ် */}
        <button className="close-btn" onClick={onClose} aria-label="Close">×</button>
        
        {/* Header Section: အသင်းအမည်နှင့် အမှတ်တံဆိပ် */}
        <div className="modal-header">
           <div className="team-badge">{team.id}</div>
           <div className="header-text">
             <h2>{team.name}</h2>
             <span className="group-tag">Group {team.group}</span>
           </div>
        </div>

        <div className="modal-grid">
          {/* ဘယ်ဘက်ခြမ်း: Squad List (၁၈ ယောက်စာရင်း) */}
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
                  // တစ်ဘက်အသင်းများ၏ Data ကို ရှာဖွေခြင်း
                  const homeTeamObj = allTeams.find(t => String(t.id) === String(match.homeId));
                  const awayTeamObj = allTeams.find(t => String(t.id) === String(match.awayId));

                  return (
                    <MatchCard 
                      key={match.id} 
                      match={match} 
                      homeTeam={homeTeamObj}
                      awayTeam={awayTeamObj}
                      // Modal ပေါ်က MatchCard တွင်လည်း အသင်းနှိပ်လျှင် ပြောင်းလဲနိုင်ရန် (Optional)
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
  );
};

export default TeamDetails;