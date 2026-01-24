import React from 'react';
import MatchCard from './MatchCard';
import '../styles/Knockout.css';

const KnockoutStage = ({ knockoutMatches = [], allTeams = [], onTeamClick }) => {
  
  const filterByStage = (stage) => (knockoutMatches || []).filter(m => m.stage === stage);

  const renderMatch = (match, index, stageClass) => {
    const homeTeam = allTeams.find(t => String(t.id) === String(match.homeId));
    const awayTeam = allTeams.find(t => String(t.id) === String(match.awayId));
    
    const connectorType = index % 2 === 0 ? "top-line" : "bottom-line";
    const stageConnector = stageClass === "qf" ? "qf-connector" : "sf-connector";

    return (
      <div className="match-item" key={match.id}>
        <div className="card-wrapper">
          <MatchCard 
            match={match} 
            homeTeam={homeTeam} 
            awayTeam={awayTeam} 
            onTeamClick={typeof onTeamClick === 'function' ? onTeamClick : () => {}} 
          />
        </div>

        {stageClass !== "f" && (
          <div className={`vertical-connector ${stageConnector} ${connectorType}`}></div>
        )}
      </div>
    );
  };

  const thirdPlaceMatches = (knockoutMatches || []).filter(m => 
    m.stage === '3rd Place' || m.stage === 'Third Place' || m.stage.includes('3rd')
  );

  return (
    <div className="knockout-wrapper">
      
      {/* Quarter-finals Column */}
      <div className="bracket-column qf">
        <h3 className="stage-title">Quarter-finals</h3>
        <div className="matches-column">
          {filterByStage('Quarter-final').length > 0 ? (
            filterByStage('Quarter-final').map((m, i) => renderMatch(m, i, "qf"))
          ) : (
            <div className="no-data">TBD</div>
          )}
        </div>
      </div>

      {/* Semi-finals Column */}
      <div className="bracket-column sf">
        <h3 className="stage-title">Semi-finals</h3>
        <div className="matches-column">
          {filterByStage('Semi-final').length > 0 ? (
            filterByStage('Semi-final').map((m, i) => renderMatch(m, i, "sf"))
          ) : (
            <div className="no-data">TBD</div>
          )}
        </div>
      </div>

      {/* Finals Column */}
      <div className="bracket-column f">
        <h3 className="stage-title">Finals</h3>
        <div className="matches-column">
          <div className="match-group">
            {/* စာသားကို <span> လေးနဲ့ အုပ်လိုက်ပါပြီ */}
            <div className="mini-label">
              <span className="label-text">Grand Final</span>
            </div>
            {filterByStage('Final').map((m, i) => renderMatch(m, i, "f"))}
          </div>
          
          {thirdPlaceMatches.length > 0 && (
            <div className="match-group">
              {/* စာသားကို <span> လေးနဲ့ အုပ်လိုက်ပါပြီ */}
              <div className="mini-label">
                <span className="label-text">3rd Place Match</span>
              </div>
              {thirdPlaceMatches.map((m, i) => renderMatch(m, i, "f"))}
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default KnockoutStage;