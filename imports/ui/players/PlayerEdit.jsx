import React, { Component } from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'

import { PlayersCollection} from '../../collections/players_collection.js'

export default class PlayerEdit extends TrackerReact(Component) {

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

  updatePlayer(event) {
    event.preventDefault();
    let name = this.refs.name.value.trim();
    let age = this.refs.age.value.trim();
    let nationality = this.refs.nationality.value.trim();
    let teamname = this.refs.teamname.value.trim();
    let position = this.refs.position.value.trim();
    let rating = this.refs.rating.value.trim();
    let weakness = this.refs.weakness.value.trim();

    Meteor.call('updatePlayer', this.player(), name, age, nationality, teamname, position, rating, weakness, (error, data) => {
      if(error && error.error === 'not-authorized') {
        console.log('Please login before submitting', 'danger', 'fixed-top', 'fa-frown-o');
      } else {
          this.refs.name.value = '';
          this.refs.age.value = '';
          this.refs.nationality.value = '';
          this.refs.teamname.value = '';
          this.refs.position.value = '';
          this.refs.rating.value = '';
          this.refs.weakness.value = '';
          FlowRouter.go('/');
      }
    });
  }

  render() {
    if(!Meteor.userId()) {
      return(
        <div>
          <p>Please Login to add player</p>
        </div>
      )
    }
    let player = this.player();
    if(!player) {
      return(
        <div>
          <h3>Player Details</h3>
          <p>Loading...</p>
        </div>
      )
    }

    return (
      <div>
        <h1>Edit Player</h1>
        <div>
          <form className='new-resolution' onSubmit={this.updatePlayer.bind(this)}>
            <span>Name: </span>
            <input type='text' ref='name' defaultValue={player.name} />
            <br />
            <span>Age: </span>
            <input type='number' ref='age' defaultValue={player.age} />
            <br />
            <span>Nationality: </span>
            <input type='text' ref='nationality' defaultValue={player.nationality} />
            <br />
            <span>Team Name: </span>
            <select ref='teamname'>
              <option value="barcelona">Barcelona</option>
              <option value="realmadrid">Real Madrid C.F.</option>
              <option value="arsenal">Arsenal F.C.</option>
              <option value="liverpool">Liverpool F.C.</option>
            </select>
            <br />
            <span>Position: </span>
            <input type='text' ref='position' defaultValue={player.position} />
            <br />
            <span>Rating: </span>
            <input type='text' ref='rating' defaultValue={player.rating} />
            <br />
            <span>Weakness: </span>
            <input type='text' ref='weakness' defaultValue={player.weakness} />
            <br />
            <button>Update Player</button>
          </form>
        </div>
      </div>
    )
  }
}
