import React, { useState } from 'react';
import GroupTable from '../components/GroupTable';
import MatchCard from '../components/MatchCard';
import KnockoutStage from '../components/KnockoutStage';
import TeamDetails from '../components/TeamDetails';

const Home = ({ allTeams, allMatches, allPlayers, loading }) => {
  const [activeTab, setActiveTab] = useState('fixtures');
  const [selectedTeam, setSelectedTeam] = useState(null);

  // --- Loading State Handling ---
  if (loading) {
    return (
     <div className="loading-screen">
  <div className="loader-container">
    <div className="ball-loader"></div>
    <div className="ball-shadow"></div> {/* ဤနေရာတွင် အရိပ်ထည့်ရန် */}
  </div>
  <h2 className="loading-text">TGi Tournament</h2>
  <p className="loading-sub">Data Loading...</p>
</div>
    );
  }

  const getTeamsByGroup = (groupName) => {
    return allTeams.filter(team => team.group === groupName);
  };

  // Stage အလိုက် matches များကို ခွဲထုတ်ခြင်း
  const groupStageMatches = allMatches.filter(m => m.stage === 'Group Stage');
  const knockoutMatches = allMatches.filter(m => m.stage !== 'Group Stage');

  const handleTeamClick = (teamId) => {
    const team = allTeams.find(t => String(t.id) === String(teamId));
    if (team) {
      setSelectedTeam(team);
    }
  };

  return (
    <div className="home-page">
      {/* Tab Navigation Area */}
      <nav className="tab-nav glass-panel">
        <button 
          className={activeTab === 'fixtures' ? 'active' : ''} 
          onClick={() => setActiveTab('fixtures')}
        >
          Fixtures
        </button>
        <button 
          className={activeTab === 'standings' ? 'active' : ''} 
          onClick={() => setActiveTab('standings')}
        >
          Standings
        </button>
        <button 
          className={activeTab === 'knockout' ? 'active' : ''} 
          onClick={() => setActiveTab('knockout')}
        >
          Knockout
        </button>
      </nav>

      {/* Fixtures Tab */}
      {activeTab === 'fixtures' && (
        <section className="section fade-in">
          <h2 className="section-title">Today's Fixtures</h2>
          <div className="match-list">
            {groupStageMatches.length > 0 ? (
              groupStageMatches.map(match => (
                <div key={match.id}> 
                  <MatchCard 
                    match={match}
                    homeTeam={allTeams.find(t => String(t.id) === String(match.homeId))}
                    awayTeam={allTeams.find(t => String(t.id) === String(match.awayId))}
                    onTeamClick={handleTeamClick} 
                  />
                </div>
              ))
            ) : (
              <p style={{ textAlign: 'center', padding: '20px', color: '#8e8e93' }}>
                No fixtures available.
              </p>
            )}
          </div>
        </section>
      )}

      {/* Standings Tab */}
      {activeTab === 'standings' && (
        <section className="section fade-in">
          <h2 className="section-title">Group Stage Standings</h2>
          <div className="group-grid">
            {['A', 'B', 'C', 'D'].map(groupLabel => (
              <GroupTable 
                key={groupLabel}
                groupName={groupLabel} 
                teams={getTeamsByGroup(groupLabel)} 
                matches={groupStageMatches} 
                onTeamClick={handleTeamClick} 
              />
            ))}
          </div>
        </section>
      )}

      {/* Knockout Tab */}
      {activeTab === 'knockout' && (
        <section className="section fade-in">
          <h2 className="section-title">Knockout Stage</h2>
          <div className="glass-panel">
            <KnockoutStage 
              knockoutMatches={knockoutMatches} 
              allTeams={allTeams} 
              onTeamClick={handleTeamClick}
            />
          </div>
        </section>
      )}

      {/* Team Details Modal */}
      {selectedTeam && (
        <TeamDetails 
          team={selectedTeam} 
          matches={allMatches} 
          allTeams={allTeams}
          allPlayers={allPlayers || []} 
          onClose={() => setSelectedTeam(null)} 
        />
      )}
    </div>
  );
};

export default Home;