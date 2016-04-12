/**
* succeedIT Module
*
* Description
*/
angular.module('succeedIT')
	.controller('DashboardCtrl', function(profile, projectName, messages){
		var dashboardCtrl = this;

		dashboardCtrl.messages = messages;
		dashboardCtrl.projectName = projectName;
		dashboardCtrl.message = '';

		dashboardCtrl.sendMessage = function (){
		  if(dashboardCtrl.message.length > 0){
		    dashboardCtrl.messages.$add({
		      uid: profile.$id,
		      body: dashboardCtrl.message,
		      timestamp: Firebase.ServerValue.TIMESTAMP
		    }).then(function (){
		      dashboardCtrl.message = '';
		    });
		  }
		};
	});