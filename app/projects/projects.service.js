angular.module('succeedIT')
  .factory('Projects', function($firebaseArray, FirebaseUrl){
    var ref = new Firebase(FirebaseUrl+'projects');
    var projects = $firebaseArray(ref);

    return projects;
  });