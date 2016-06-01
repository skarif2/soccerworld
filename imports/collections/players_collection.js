import { Mongo } from 'meteor/mongo'
import { check } from 'meteor/check'

export const PlayersCollection = new Mongo.Collection('players');

Meteor.methods({
	addPlayer(name, age, nationality, teamname, position, rating, weakness) {
		check(name, String);
    check(age, String);
    check(nationality, String);
    check(teamname, String);
    check(position, String);
    check(rating, String);
    check(weakness, String);

		if(!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

		PlayersCollection.insert({
      name: name,
      age: age,
      nationality: nationality,
      teamname: teamname,
      position: position,
      rating: rating,
      weakness: weakness,
      owner: Meteor.userId(),
      createdAt: new Date(),
    });
	},
  updatePlayer(player, name, age, nationality, teamname, position, rating, weakness) {
    check(player, String);
    check(name, String);
    check(age, String);
    check(nationality, String);
    check(teamname, String);
    check(position, String);
    check(rating, String);
    check(weakness, String);

   	if( Meteor.userId() !== player.owner) {
      throw new Meteor.Error('not-authorized');
    }

    PlayersCollection.update(player._id, {
      $set: {
        name: name,
        age: age,
        nationality: nationality,
        teamname: teamname,
        position: position,
        rating: rating,
        weakness: weakness
      }
    });
  },
  deletePlayer(player) {
		check(player, Object);
		if( Meteor.userId() !== player.owner) {
      throw new Meteor.Error('not-authorized');
    }
		PlayersCollection.remove(player._id);

  }
})
