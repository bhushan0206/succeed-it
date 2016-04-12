/**
* succeedIT Module
*
* Description
*/
angular.module('succeedIT')
	.controller('MessagesCtrl', function(profile, projectName, messages){
		var messagesCtrl = this;

		messagesCtrl.messages = messages;
		messagesCtrl.projectName = projectName;
		messagesCtrl.message = '';

		messagesCtrl.sendMessage = function (){
		  if(messagesCtrl.message.length > 0){
		    messagesCtrl.messages.$add({
		      uid: profile.$id,
		      body: messagesCtrl.message,
		      timestamp: Firebase.ServerValue.TIMESTAMP
		    }).then(function (){
		      messagesCtrl.message = '';
		    });
		  }
		};
	});