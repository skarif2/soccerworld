import { check } from 'meteor/check'
import { PlayersCollection } from '../imports/collections/players_collection.js'

Meteor.publish('allPlayers', function(){
	return PlayersCollection.find({});
})

Meteor.publish('singlePlayer', function(id){
	check(id, String);
	return PlayersCollection.find({_id:id});
})
