import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import './styles/Global.css';

function App() {
  const [allTeams, setAllTeams] = useState([]);
  const [allMatches, setAllMatches] = useState([]);
  const [allPlayers, setAllPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sheet.best API URL
  const API_BASE_URL = "https://api.sheetbest.com/sheets/7bed7ef6-46e0-4678-a8ef-f76f85a87f15";

  useEffect(() => {
    const fetchTournamentData = async () => {
      try {
        // Teams, Matches, Knockout နှင့် Players Tab အားလုံးကို တစ်ပြိုင်တည်း ဆွဲယူခြင်း
        const [resTeams, resMatches, resKnockout, resPlayers] = await Promise.all([
          fetch(`${API_BASE_URL}/tabs/teams`),
          fetch(`${API_BASE_URL}/tabs/matches`),
          fetch(`${API_BASE_URL}/tabs/knockout`),
          fetch(`${API_BASE_URL}/tabs/players`)
        ]);

        const teamsData = resTeams.ok ? await resTeams.json() : [];
        const matchesData = resMatches.ok ? await resMatches.json() : [];
        const knockoutData = resKnockout.ok ? await resKnockout.json() : [];
        const playersData = resPlayers.ok ? await resPlayers.json() : [];

        /**
         * Match Data Formatting
         */
        const formatMatch = (m) => ({
          ...m,
          id: String(m.id || Math.random()),
          homeId: m.homeId ? String(m.homeId) : null,
          awayId: m.awayId ? String(m.awayId) : null,
          scoreHome: (m.scoreHome === "" || m.scoreHome === undefined || m.scoreHome === null) ? null : Number(m.scoreHome),
          scoreAway: (m.scoreAway === "" || m.scoreAway === undefined || m.scoreAway === null) ? null : Number(m.scoreAway),
          date: m.date || ""
        });

        const formattedTeams = Array.isArray(teamsData) 
          ? teamsData.map(t => ({ ...t, id: String(t.id) })) 
          : [];

        const formattedMatches = Array.isArray(matchesData) ? matchesData.map(formatMatch) : [];
        const formattedKnockout = Array.isArray(knockoutData) ? knockoutData.map(formatMatch) : [];

        const formattedPlayers = Array.isArray(playersData) 
          ? playersData.map(p => ({ ...p, teamId: String(p.teamId) })) 
          : [];

        setAllTeams(formattedTeams);
        setAllMatches([...formattedMatches, ...formattedKnockout]);
        setAllPlayers(formattedPlayers);
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data from Google Sheets:", error);
        setLoading(false);
      }
    };

    fetchTournamentData();
  }, []);

  // --- Loading Screen (ဘောလုံး Bounce Animation ပုံစံ) ---
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader-container">
          <div className="ball-loader"></div>
          <div className="ball-shadow"></div>
        </div>
        <h2 className="loading-text">TGi Tournament</h2>
        <p className="loading-sub">Data Loading...</p>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="header">
        <h1>TGi Futsal Tournament</h1>
        <p>TGi Japanese Language School | TGi NIHONGOGAKKOU Co., Ltd.</p>
      </header>

      <main className="container">
        {/* Home Component */}
        <Home 
          allTeams={allTeams} 
          allMatches={allMatches} 
          allPlayers={allPlayers} 
          loading={loading}
        />
        
        {/* Prize Pools Section */}
        <div className="prize-pool-section fade-in">
          <h2 className="prize-title">Tournament Prize Pools</h2>
          <div className="prize-grid">
            
            <div className="prize-card champion">
              <div className="medal">🥇</div>
              <h3>Champion</h3>
              <p className="amount">1000,000 MMK</p>
            </div>
            
            <div className="prize-card runner-up">
              <div className="medal">🥈</div>
              <h3>Runner-up</h3>
              <p className="amount">600,000 MMK</p>
            </div>
            
            <div className="prize-card third-place">
              <div className="medal">🥉</div>
              <h3>3rd Place</h3>
              <p className="amount">400,000 MMK</p>
            </div>

            <div className="prize-card consolation">
              <div className="medal">🏅</div>
              <h3>Consolation</h3>
              <p className="amount">200,000 MMK</p>
            </div>

          </div>
        </div>
      </main>

      {/* --- Footer Section --- */}
      <footer className="footer fade-in">
        <div className="footer-content">
          <p>© 2026 TGI Japanese Language School. All rights reserved.</p>
          <div className="dev-credit">
            Developed By <span>Htut</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
