import React, { Component } from 'react'

export default class Player extends Component {
  deletePlayer(){
    Meteor.call('deletePlayer', this.props.player);
  }

  render() {

    const editPlayerButton = Meteor.userId() ? <a href={`/player/edit/${this.props.player._id}`}>Edit Player</a> : ''
    const deletePlayerButton = Meteor.userId() ? <button onClick={this.deletePlayer.bind(this)}>Delete</button> : ''
    return(
      <li >
        <h3>{this.props.player.name}</h3>
        <strong>Age:</strong> {this.props.player.age}<br />
        <strong>Nationality:</strong> {this.props.player.nationality}<br />
        <strong>Teamname:</strong> {this.props.player.teamname}<br />
        <strong>Position:</strong> {this.props.player.position}<br />
        <strong>Rating:</strong> {this.props.player.rating}<br />
        <strong>Weakness:</strong> {this.props.player.weakness}<br />

        <a href={`/player/${this.props.player._id}`}>
      		Show Details
      	</a>

        {editPlayerButton}
        {deletePlayerButton}

        <br />
      </li>
    )
  }
}
