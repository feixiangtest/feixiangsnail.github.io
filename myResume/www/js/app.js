angular.module('jobModule', ['ionic', 'jobModule.controllers', 'jobModule.services','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
//把图标从下移动到上面。
$ionicConfigProvider.scrolling.jsScrolling(true);//添加页面弹性效果
$ionicConfigProvider.tabs.position('bottom');
$ionicConfigProvider.tabs.style("standard");
$ionicConfigProvider.navBar.alignTitle('center');
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

 .state('intro', {
    url: '/',
    templateUrl: 'templates/intro.html',
    controller: 'IntroCtrl',
    resolve: {
        changeState: function($state, $window ,$q ,$timeout) {
          if($window.localStorage.hasIntro != undefined){
            console.log('fuckme')
           

            $timeout(function() {
               $state.go('tab.me')
            },0);
            return $q.reject();

          }
        }
      }
  })


  .state('tab.me', {
    url: '/me',
    views: {
      'tab-me': {
        templateUrl: 'templates/tab-me.html',
        controller: 'MeCtrl'
      }
    }
  })

  .state('tab.skill', {
      url: '/skill',
      views: {
        'tab-skill': {
          templateUrl: 'templates/tab-skill.html',
          controller: 'SkillCtrl'
        }
      }
    })
    .state('tab.skill-detail', {
      url: '/skill/:skillId',
      views: {
        'tab-skill': {
          templateUrl: 'templates/skill-detail.html',
          controller: 'SkillDetailCtrl'
        }
      }
    })

  .state('tab.project', {
    url: '/project',
    views: {
      'tab-project': {
        templateUrl: 'templates/tab-project.html',
        controller: 'ProjectCtrl'
      }
    }
  })
  .state('tab.project-detail', {
      url: '/project/:projectId',
      views: {
        'tab-project': {
          templateUrl: 'templates/project-detail.html',
          controller: 'ProjectDetailCtrl'
        }
      }
    })

 .state('tab.work', {
    url: '/work',
    views: {
      'tab-work': {
        templateUrl: 'templates/tab-work.html',
        controller: 'WorkCtrl'
      }
    }
  })
 .state('tab.work-detail', {
      url: '/work/:workId',
      views: {
        'tab-work': {
          templateUrl: 'templates/work-detail.html',
          controller: 'WorkDetailCtrl'
        }
      }
    })

  $urlRouterProvider.otherwise('/');

});
