import React from 'react';
import '../styles/MatchCard.css';

const MatchCard = ({ match, homeTeam, awayTeam, onTeamClick }) => {
  // ၁။ ပွဲပြီး/မပြီး စစ်ဆေးခြင်း
  const isFinished = match.scoreHome !== null && match.scoreAway !== null;

  // ID ကို 01, 02 ပုံစံပြောင်းရန် Helper Function
  const formatId = (id) => String(id).padStart(2, '0');

  return (
    <div className={`match-card glass-panel ${isFinished ? 'finished' : 'upcoming'}`}>
      
      {/* ၂။ Date & Time Header */}
      <div className="match-header">
        <span className="match-date">{match.date || 'TBD'}</span>
        <span className="match-time">
          {isFinished ? <span className="status-badge">Finished</span> : match.time}
        </span>
      </div>

      <div className="match-body">
        {/* ၃။ Home Team */}
        <div 
          className="team-info home clickable" 
          onClick={() => onTeamClick(match.homeId)}
          title="View Team Details"
        >
          {/* Dynamic Class: team-01, team-02 စသည်ဖြင့် ဖြစ်သွားပါမည် */}
          <span className={`team-name team-${formatId(match.homeId)}`}>
            {homeTeam?.name || 'TGi'}
          </span>
        </div>
        
        {/* ၄။ Score Display Area */}
        <div className="score-display">
          {isFinished ? (
            <h3 className="score-text">{match.scoreHome} - {match.scoreAway}</h3>
          ) : (
            <div className="vs-badge">VS</div>
          )}
        </div>

        {/* ၅။ Away Team */}
        <div 
          className="team-info away clickable" 
          onClick={() => onTeamClick(match.awayId)}
          title="View Team Details"
        >
          {/* Dynamic Class: team-01, team-02 စသည်ဖြင့် ဖြစ်သွားပါမည် */}
          <span className={`team-name team-${formatId(match.awayId)}`}>
            {awayTeam?.name || 'TGi'}
          </span>
        </div>
      </div>

      {/* ၆။ Stage & Group Footer */}
      <div className="match-footer">
        <div className="match-stage">{match.stage}</div>
        
        <div className="footer-bottom">
          <div className="match-group">
            {match.group ? `• Group ${match.group}` : '• Knockout Stage'}
          </div>
          {match.location && (
            <div className="match-location">{match.location}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchCard;