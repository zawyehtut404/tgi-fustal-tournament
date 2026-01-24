import React from 'react';
import '../styles/MatchCard.css';

const MatchCard = ({ match, homeTeam, awayTeam, onTeamClick }) => {
  // ၁။ ပွဲပြီး/မပြီး စစ်ဆေးခြင်း (Score ရှိလျှင် ပွဲပြီးပြီဟု သတ်မှတ်သည်)
  const isFinished = match.scoreHome !== null && match.scoreAway !== null;

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
        {/* ၃။ Home Team (နှိပ်လျှင် Team Details ပွင့်မည်) */}
        <div 
          className="team-info home clickable" 
          onClick={() => onTeamClick(match.homeId)}
          title="View Team Details"
        >
          <span className="team-name">{homeTeam?.name || 'TGi'}</span>
        </div>
        
        {/* ၄။ Score Display Area */}
        <div className="score-display">
          {isFinished ? (
            <h3 className="score-text">{match.scoreHome} - {match.scoreAway}</h3>
          ) : (
            <div className="vs-badge">VS</div>
          )}
        </div>

        {/* ၅။ Away Team (နှိပ်လျှင် Team Details ပွင့်မည်) */}
        <div 
          className="team-info away clickable" 
          onClick={() => onTeamClick(match.awayId)}
          title="View Team Details"
        >
          <span className="team-name">{awayTeam?.name || 'TGi'}</span>
        </div>
      </div>

      {/* ၆။ Stage & Group Footer */}
      <div className="match-footer">
        <span className="match-stage">{match.stage}</span>
        {match.group && <span className="match-group"> • Group {match.group}</span>}
        {match.location && <span className="match-location"> • {match.location}</span>}
      </div>
    </div>
  );
};

export default MatchCard;