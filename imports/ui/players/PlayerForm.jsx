import React, { Component } from 'react'

export default class PlayerForm extends Component {

  addPlayer(event) {
    event.preventDefault();
    let name = this.refs.name.value.trim();
    let age = this.refs.age.value.trim();
    let nationality = this.refs.nationality.value.trim();
    let teamname = this.refs.teamname.value.trim();
    let position = this.refs.position.value.trim();
    let rating = this.refs.rating.value.trim();
    let weakness = this.refs.weakness.value.trim();

    Meteor.call('addPlayer', name, age, nationality, teamname, position, rating, weakness, (error, data) => {
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
    return (
      <div>
        <h1>Add Player</h1>
        <div>
          <form className='new-resolution' onSubmit={this.addPlayer.bind(this)}>
            <span>Name</span>
            <input type='text' ref='name' placeholder='Name' />
            <br />
            <span>Age</span>
            <input type='number' ref='age' placeholder='age' />
            <br />
            <span>Nationality</span>
            <input type='text' ref='nationality' placeholder='Nationality' />
            <br />
            <span>Team Name</span>
            <select ref='teamname'>
              <option value="barcelona">Barcelona</option>
              <option value="realmadrid">Real Madrid C.F.</option>
              <option value="arsenal">Arsenal F.C.</option>
              <option value="liverpool">Liverpool F.C.</option>
            </select>
            <br />
            <span>Position</span>
            <input type='text' ref='position' placeholder='Position' />
            <br />
            <span>Rating</span>
            <input type='text' ref='rating' placeholder='Rating' />
            <br />
            <span>Weakness</span>
            <input type='text' ref='weakness' placeholder='Weakness' />
            <br />
            <button>Add Player</button>
          </form>
        </div>
      </div>
    )
  }
}
