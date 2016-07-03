angular.module('jobModule.controllers', [])
.controller('IntroCtrl', function($scope, $state, $ionicSlideBoxDelegate,$rootScope) {
$rootScope.key=true;
  // if(localStorage.getItem("a")==null){
// setTimeout(function(){},10);
// $("#s0").load('templates/intro0.html');
  
  // Called to navigate to the main app
  $scope.startApp = function() {
  $rootScope.key=false;

    $state.go('tab.me');
    localStorage.setItem("a", true)
  };
  $scope.startApp2 = function() {
    $rootScope.key=true;

    $state.go('tab.me');
    localStorage.setItem("a", true)
  };
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
// $("#s"+index).load("templates/intro"+index+".html")
node=document.getElementById('s'+index)
var html=node.innerHTML;
while(node.hasChildNodes()){
  node.removeChild(node.firstChild);
}
node.innerHTML=html;
    $scope.slideIndex = index;
  };
  
   // }
   // else{
   //  $state.go('tab.me');
   // }
})



.controller('MeCtrl', function($scope,$state,$rootScope, $ionicActionSheet) {
$rootScope.share=function(){

   var hideSheet = $ionicActionSheet.show({
     buttons: [
       { text: 'qq空间' },
       { text: '朋友圈' }
     ],
     destructiveText: '微信',
     titleText: '分享到',
     cancelText: 'Cancel',
     cancel: function() {
          // add cancel code..
        },
     buttonClicked: function(index) {
       return true;
     }
   });


  }
})


.controller('SkillCtrl', function($scope, Skills) {
 
  $scope.skills = Skills.all();
  $scope.remove = function(skill) {
    Skills.remove(skill);
  };
})

.controller('SkillDetailCtrl', function($scope, $stateParams, Skills) {
  $scope.skill = Skills.get($stateParams.skillId);
 

})

.controller('ProjectCtrl', function($scope, Projects) {
 
  $scope.projects = Projects.all();
  
})

.controller('ProjectDetailCtrl', function($scope, $stateParams, Projects) {
  $scope.project = Projects.get($stateParams.projectId);
})

.controller('WorkCtrl', function($scope) {
 
 
})

.controller('WorkDetailCtrl', function($scope, $stateParams) {
  
})