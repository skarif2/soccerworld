import React, { Component } from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'

import { PlayersCollection } from '../../collections/players_collection.js'

export default class PlayerSingle extends TrackerReact(Component) {
  constructor() {
    super();
    let id = FlowRouter.getParam('id');
    this.state = {
      subscription: {
        player: Meteor.subscribe('singlePlayer', id)
      }
    }
  }

  componentWillUnmount() {
      this.state.subscription.player.stop();
  }

  player() {
    return PlayersCollection.findOne(this.props.id);
  }

  deletePlayer(){
    Meteor.call('deletePlayer', this.props.player);
  }
  
  render() {
    let player = this.player();
    if(!player) {
      return(
        <div>
          <h3>Player Details</h3>
          <p>Loading...</p>
        </div>
      )
    }

    const editPlayerButton = Meteor.userId() ? <a href={`/player/edit/${player._id}`}>Edit Player</a> : ''
    const deletePlayerButton = Meteor.userId() ? <button onClick={this.deletePlayer.bind(this)}>Delete</button> : ''

    return(
      <div>
        <h2>{player.name}</h2>

        <strong>Age:</strong> {player.age}<br />
        <strong>Nationality:</strong> {player.nationality}<br />
        <strong>Teamname:</strong> {player.teamname}<br />
        <strong>Position:</strong> {player.position}<br />
        <strong>Rating:</strong> {player.rating}<br />
        <strong>Weakness:</strong> {player.weakness}<br />

        {editPlayerButton}
        {deletePlayerButton}

        <a href={'/'}>
      		Go Back
      	</a>
      </div>
    )
  }
}
