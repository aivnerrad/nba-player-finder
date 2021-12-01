import './App.css';
import { useEffect, useState } from 'react'


function App() {
const [playerId, setPlayerId] = useState(1)
const [player, setPlayer] = useState({})
const [playerImg, setPlayerImg] = useState("")
const [playerStats, setPlayerStats] = useState({})


useEffect(() => {
  const getPlayer = async() => {
    fetch(`https://www.balldontlie.io/api/v1/players/${playerId}`)
    .then(response => response.json())
    .then(data => setPlayer(data));
  }
  getPlayer()
}, [playerId])

useEffect(() => {
  if(Object.keys(player).length > 0){
    const getPlayerImage = async() => {
      fetch(`https://nba-players.herokuapp.com/players/${player.last_name}/${player.first_name}`)
      .then(response => {
        console.log(response)
        return response.blob()
      })
      .then(blob => {
        const imageObjectURL = URL.createObjectURL(blob);
        setPlayerImg(imageObjectURL);
      })
    }
    getPlayerImage()
    const getPlayerStats = async() => {
      fetch(`https://nba-players.herokuapp.com/players-stats/${player.last_name}/${player.first_name}`)
      .then(response => response.json())
      .then(data => setPlayerStats(data))
    }
    getPlayerStats()
  }
}, [player, playerId])

 const playerSearch = (e, value) => {
   e.preventDefault()
   if(value){
     setPlayerId(value)
   }
   else{
     setPlayerId(1)
   }
 }
  return (
    <div className="App">
      <input onChange={(e) => playerSearch(e, e.target.value)} type="number"/>
      {Object.keys(player).length > 0 &&
      <div>
        <div id="player-image" style={{backgroundImage: "url(" + playerImg + ")"}}>
        </div>
        <div>Name: {player.first_name}, {player.last_name}</div>
        <div>Team: {player.team.full_name}</div>
        <div>Points Per Game(PPG): {playerStats.points_per_game}</div>
      </div>}
    </div>
  );
}

export default App;
