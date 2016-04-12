angular.module('succeedIT')
  .controller('ProjectsCtrl', function($state, Auth, Users, profile, projects){
    var projectsCtrl = this;

    projectsCtrl.profile = profile;
		projectsCtrl.projects = projects;
		projectsCtrl.getDisplayName = Users.getDisplayName;
		projectsCtrl.getGravatar = Users.getGravatar;		
		projectsCtrl.users = Users.all;
		Users.setOnline(profile.$id);

		projectsCtrl.newProject = {
		  name: '',
		  clientName: '',
		  projectManager: ''
		};		

		projectsCtrl.logout = function(){
			projectsCtrl.profile.online = null;
			projectsCtrl.profile.$save().then(function(){
		  	Auth.$unauth();
		  	$state.go('home');
		  });
		};	

		projectsCtrl.createProject = function(){
		  projectsCtrl.projects.$add(projectsCtrl.newProject).then(function(ref){
		  	$state.go('projects.messages', {projectId: ref.key()});
		  });
		};			
  });