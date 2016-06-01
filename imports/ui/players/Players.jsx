import React, { Component } from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'

import { PlayersCollection } from '../../collections/players_collection.js'

import Player from './Player.jsx'

export default class Players extends TrackerReact(Component) {

  constructor() {
    super();

    this.state = {
      subscription: {
        players: Meteor.subscribe('allPlayers')
      }
    }
  }

  componentWillUnmount() {
      this.state.subscription.players.stop();
  }

  players() {
    return PlayersCollection.find().fetch();
  }

  renderPlayer() {
    console.log(this.refs.teamname);
    if(this.refs.teamname === 'allteams'){
      this.players().map((player) => {
        return <Player key={player._id} player={player} />;
      })
    } else {
      this.players().filter((player) => {
        return player && player.teamname === 'this.refs.teamname';
      }).map((player) => {
        return <Player key={player._id} player={player} />;
      })
    }
  }

  render() {
    const addPlayerButton = Meteor.userId() ? <a href={'/player/add'}>Add Player</a> : ''

    return (
      <div>
        <h1>Players</h1>

        {addPlayerButton}
        <div>
          <select ref='teamname' defaultValue='allteams'>
            <option value="allteams">All Teams</option>
            <option value="barcelona">Barcelona</option>
            <option value="realmadrid">Real Madrid C.F.</option>
            <option value="arsenal">Arsenal F.C.</option>
            <option value="liverpool">Liverpool F.C.</option>
          </select>
        </div>
        <div>
          {this.renderPlayer.bind(this)}
          {this.players().map((player) => {
            return <Player key={player._id} player={player} />;
          })}
        </div>
      </div>
    )
  }
}
