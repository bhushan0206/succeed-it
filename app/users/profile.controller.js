angular.module('succeedIT')
  .controller('ProfileCtrl', function($state, md5, auth, profile){
    var profileCtrl = this;

    profileCtrl.profile = profile;
    profileCtrl.profile.projectsAssigned = {};

		profileCtrl.updateProfile = function(){
		  profileCtrl.profile.emailHash = md5.createHash(auth.password.email);
		  profileCtrl.profile.$save().then(function(){
		    $state.go('channels');
		  });
		};

		profileCtrl.assignProject = function(){

		};
  });