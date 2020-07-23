import React, { useState, useEffect } from "react";
import "./App.css";
import * as ReactBootStrap from "react-bootstrap";
import Axios from "axios";
import BootStrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

const App = () => {
  const [playersTable2, setPlayersTable2] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPlayerData = async () => {
    try {
      const data = await Axios.get(
        "https://nba-players.herokuapp.com/players-stats"
      );
      console.log(data);
      setPlayersTable2(data.data);
      setLoading(true); // if the data is received, set loading to true
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { dataField: "name", text: "Player Name" },
    { dataField: "points_per_game", text: "Points Per Game" },
    { dataField: "team_name", text: "Player Team" },
  ];

  useEffect(() => {
    getPlayerData();
  }, []);

  const players = [
    { position: "Forward", name: "Leborn", team: "Lakers" },
    { position: "B", name: "fgsfdg", team: "weewr" },
    { position: "sdfdsf", name: "fdgdfdfg", team: "fgfdg" },
    { position: "dsfgsd", name: "vadfg2", team: "adfg" },
    { position: "4356tfg", name: "ret", team: "afdgfadgg" },
  ];

  const renderPlayer = (player, index) => {
    return (
      <tr key={index}>
        <td>{player.name}</td>
        <td>{player.position}</td>
        <td>{player.team}</td>
      </tr>
    );
  };

  return (
    <div className="App">
      <h1>
        <ReactBootStrap.Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Team</th>
            </tr>
          </thead>
          <tbody>{players.map(renderPlayer)}</tbody>
        </ReactBootStrap.Table>
      </h1>

      {loading ? (
        <BootStrapTable
          keyField="name"
          data={playersTable2}
          columns={columns}
          pagination={paginationFactory()}
        />
      ) : (
        <ReactBootStrap.Spinner animation="border" />
      )}
    </div>
  );
};

export default App;
