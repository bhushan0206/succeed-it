/**
* succeedIT Module
*
* Description
*/
angular.module('succeedIT')
	.factory('Messages', function($firebaseArray, FirebaseUrl){
		var projectMessagesRef = new Firebase(FirebaseUrl + 'projectMessages');
		var userMessagesRef = new Firebase(FirebaseUrl+'userMessages')

		return{
			forProject: function(projectId){
				return $firebaseArray(projectMessagesRef.child(projectId));
			},
			forUsers: function(uid1, uid2){
				var path = uid1 < uid2 ? uid1+'/'+uid2 : uid2+'/'+uid1;

				return $firebaseArray(userMessagesRef.child(path));
			}
		};

	});