angular.module('jobModule.services', [])

.factory('Skills', function() {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
   
var skills = [{
        id: 0,
        name: '综述',
        lastText: '简单概括所掌握技能',
        face: 'img/zongshulogo.png'
    }, {
        id: 1,
        name: 'HTML4、HTML5',
        lastText: '了解html规范',
        face: 'img/htmllogo.png',
        intro:'超文本标记语言（英语：HyperText Markup Language，简称：HTML）是一种用于创建网页的标准标记语言。HTML是一种基础技术，常与CSS、JavaScript一起被众多网站用于设计令人赏心悦目的网页、网页应用程序以及移动应用程序的用户界面[1]。网页浏览器可以读取HTML文件，并将其渲染成可视化网页。HTML描述了一个网站的结构语义随着线索的呈现，使之成为一种标记语言而非编程语言。',
        introEn:'HyperText Markup Language, commonly abbreviated as HTML, is the standard markup language used to create web pages. Along with CSS, and JavaScript, HTML is a cornerstone technology used to create web pages,[1] as well as to create user interfaces for mobile and web applications.'
    },
    {
        id: 2,
        name: 'CSS2/CSS3',
        lastText: '熟悉css2,css3规范',
        face: 'img/c3.jpg',
        intro:'层叠样式表（英语：Cascading Style Sheets，简写CSS），又称串样式列表、级联样式表、串接样式表、层叠样式表、階層式樣式表，一种用来为结构化文档（如HTML文档或XML应用）添加样式（字体、间距和颜色等）的计算机语言，由W3C定义和维护。目前最新版本是CSS2.1，为W3C的推荐标准。CSS3现在已被大部分现代浏览器支持，而下一版的CSS4仍在开发过程中。',
        introEn:'Cascading Style Sheets (CSS) is a style sheet language used for describing the presentation of a document written in a markup language.[1] Although most often used to set the visual style of web pages and user interfaces written in HTML and XHTML, the language can be applied to any XML document, including plain XML, SVG and XUL, and is applicable to rendering in speech, or on other media. Along with HTML and JavaScript, CSS is a cornerstone technology used by most websites to create visually engaging webpages, user interfaces for web applications, and user interfaces for many mobile applications.'
    }, 
    {id:3,
        name: 'ES5、ES6',
        lastText: '了解常用ECMAscript规范',
        face: 'img/jslogo.png',
        intro:'ECMAScript是一种由Ecma国际（前身为欧洲计算机制造商协会）通过ECMA-262标准化的脚本程序设计语言。这种语言在万维网上应用广泛，它往往被称为JavaScript或JScript，但实际上后两者是ECMA-262标准的实现和扩展。',
       introEn:''

    },{
        id: 4,
        name: 'Jquery',
        lastText: '熟练运用jquery完成项目的开发。',
        face: 'img/jquerylogo.png',
        intro:'jQuery是一套跨浏览器的JavaScript库，简化HTML与JavaScript之间的操作。[2]由约翰·雷西格（John Resig）在2006年1月的BarCamp NYC上发布第一个版本。目前是由Dave Methvin领导的开发团队进行开发。全球前10,000个访问最高的网站中，有65%使用了jQuery，是目前最受欢迎的JavaScript库',
        introEn:''
    },{
        id: 5,
        name: 'Zepto',
        lastText: '熟练运用',
        face: 'img/zepto.png',
        intro:'Zepto的设计目的是提供 jQuery 的类似的API，但并不是100%覆盖 jQuery 。Zepto设计的目的是有一个5-10k的通用库、下载并快速执行、有一个熟悉通用的API，所以你能把你主要的精力放到应用开发上。',
        introEn:''
    },{
        id:6,
        name: 'AngularJs',
        lastText: '灵活运用众多的框架内容',
        face: 'img/angularjslogo.png',
        intro:'AngularJS是Google开发的纯客户端JavaScript技术的WEB框架,用于扩展、增强HTML功能,它专为构建强大的WEB应用而设计。',
        introEn:''
    },{ id: 7,
        name: 'ionic',
        lastText: '熟悉ionic的使用',
        face: 'img/ionic.png',
        intro: 'ionic 是一个强大的 HTML5 应用程序开发框架(HTML5 Hybrid Mobile App Framework )。 可以帮助您使用 Web 技术，比如 HTML、CSS 和 Javascript 构建接近原生体验的移动应用程序。',
        introEn: 'Ionic is a complete open-source SDK for hybrid mobile app development.[4] Built on top of AngularJS and Apache Cordova, Ionic provides tools and services for developing hybrid mobile apps using Web technologies like CSS, HTML5, and Sass. Apps can be built with these Web technologies and then distributed through native app stores to be installed on devices by leveraging Cordova.'

    }, {
        id: 8,
        name: 'Swiper',
        lastText: '熟练使用Swiper',
        face: 'img/swiperlogo.png',
        intro:'Swiper(Swiper master)是目前应用较广泛的移动端网页触摸内容滑动js插件。',
        introEn:''
    }, {
        id: 9,
        name: 'Bootstrap',
        lastText: '熟悉Bootstrap框架',
        face: 'img/bootstraplogo.png',
        intro:'Bootstrap是Twitter推出的一个用于前端开发的开源工具包。它由Twitter的设计师Mark Otto和Jacob Thornton合作开发，是一个CSS/HTML框架。',
        introEn:''
    },{
        id: 10,
        name: 'Iscroll',
        lastText: '熟练使用Iscroll框架',
        face: 'img/iscrolllogo.png',
        intro:'iScroll是一个高性能，资源占用少，无依赖，多平台的javascript滚动插件。它可以在桌面，移动设备和智能电视平台上工作。它一直在大力优化性能和文件大小以便在新旧设备上提供最顺畅的体验。',
        introEn:''
    },{
        id: 11,
        name: 'Gulp',
        lastText: '熟练使用Gulp自动化工具。',
        face: 'img/gulp.jpg',
        intro:'gulp.js 是一种基于流的，代码优于配置的新一代构建工具。Gulp 和 Grunt 类似。但相比于 Grunt 的频繁的 IO 操作，Gulp 的流操作，能更快地完成构建。',
        introEn:''
    }, {
        id: 12,
        name: 'git',
        lastText: '熟练使用git版本控制工具',
        face: 'img/gitlogo.png',
        intro:'git是一个分布式版本控制软件，最初由林纳斯·托瓦兹（Linus Torvalds）创作，于2005年以GPL发布。最初目的是为更好地管理Linux内核开发而设计',
        introEn:''
    },  {
        id: 13,
        name: 'Hbuilder',
        lastText: '用过Hbuilder编辑器',
        face: 'img/hbuilderlogo.png',
        intro:'HBuilder 是DCloud（数字天堂）推出一款支持HTML5的Web开发IDE。“快，是HBuilder的最大优势，通过完整的语法提示和代码输入法、代码块及很多配套，HBuilder能大幅提升HTML、js、css的开发效率。',
        introEn:''
    }, {
        id: 14,
        name: 'phonegap',
        lastText: '常用的打包工具',
        face: 'img/phonegaplogo.png',
        intro:'PhoneGap 是一款HTML5平台，通过它，开发商可以使用HTML、CSS及JavaScript来开发本地移动应用程序。因此，目前开发商可以只 编写一次应用程序，然后在7个主要的移动平台和应用程序商店(app store)里进行发布，这些移动平台和应用程序商店包括：iOS、Android、BlackBerry、webOS、bada、Winodws Phone以及Symbian。',
        introEn:''
    },  {
        id: 15,
        name: 'sublime',
        lastText: 'Hey, it\'s me,原生JavaScript框架',
        face: 'img/sublimelogo.png',
        intro:'Sublime Text 是一个轻量、简洁、高效、跨平台的编辑器。插件很齐全，很灵活。最主要的还是速度快。',
    } ,{
        id: 16,
        name: 'English',
        lastText: '熟悉',
        face: 'img/Englishlogo.png',
        intro:'能流畅的读懂基本的英文文档，看简单点的美剧可以不看字幕，大学6级水平。但一直在坚持学习',
        introEn:''
    },{
      id:17,
      name:'普通话',
      lastText:'二级甲等',
      face:'img/chineselogo.png',
      intro:'大学时候考的',
      introEn:''
    },{
      id:18,
      name:'驾照',
      lastText:'c证',
      face:'img/driverlogo.png',
      intro:'将近一年了',
      introEn:''
    }];




    return {
        all: function() {
            return skills;
        },
        remove: function(skill) {
            skills.splice(skills.indexOf(skill), 1);
        },
        get: function(skillId) {
            for (var i = 0; i < skills.length; i++) {
                if (skills[i].id === parseInt(skillId)) {
                    return skills[i];
                }
            }
            return null;
        }
    };
})

.factory('Projects', function() {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var projects = [{
        id: 0,
        name: '果敢时代大V店',
        describing: '简介：大V店是MAMA+旗下主打产品，定位为妈妈社群电商。以让妈妈轻松开店、随时随地学习，是目前国内妈妈创业、学习、社交、购物的首选平台。',
        position:'职位：Html5开发工程师',
        job:'本项目是团队开发，个人负责大V店微商首页页面开发，代码迭代与优化。',
        skill:'所用技术：Html5 +CSS3响应排版，轮播动画，无缝滚动，js交互，倒计时，图片懒加载技术，ajax数据交互。',
        face: 'img/davlogo.png'
    },{
        id: 1,
        name: '肝胆相照',
        describing: '简介：肝胆相照项目解决医生患者交流的移动互联网平台，有效解决了当前慢病管理中医生和患者信息沟通不畅，专家医生资源短缺的问题。',
        position:'职位：Html5开发工程师',
        job:'本项目团队开发，个人负责App跨平台页面开发，调试维护。',
        skill:'所用技术：Html5 +CSS3响应式排版，SPA前端MVC框架的使用，ajax数据交互，上拉刷新，      下拉加载更多等',
        face: 'img/gdxzlogo.png'
    }, {
        id: 2,
        name: '波奇网',
        describing: '简介：波奇网为养宠爱宠人士提供线上线下的一站式服务，全方位打造海量养宠资讯、精致爱宠服务和琳琅满目的商品，全面关爱宠物生活，相当有趣的宠物网站。',
        position:'职位：前端开发工程师',
        job:'本项目团队开发，商品首页，登录、注册等页面开发，后期代码优化与维护。',
        skill:'所用技术：Html5+CSS3固定布局，图片懒加载，ajax数据交互，锚点，放大镜，焦点轮播效果，tab切换。',
        face: 'img/bqwlogo.png'
    },{
        id: 3,
        name: '大朴网',
        describing: '简介：大朴定位于安全、舒适、高质量的“贴身纺织品”，无甲醛棉品，成为智能家居设备领域里的现象级产品。',
        position:'职位：前端开发工程师',
        job:'本项目团队开发，个人负责首页和商品详情等页面固定布局，页面重构，后期代码优化与维护。',
        skill:'所用技术：DIV+CSS布局， 楼层效果，锚点，图片预加载，ajax数据交互加载更多资源，放大镜，运用Jquery进行与用户交互行为。',
        face: 'img/dplogo.png'
    },{
        id: 4,
        name: '新科海官网',
        describing: '简介：济南新科海计算机有限责任公司成立于1997年5月，现位于济南市区洪楼西路紧靠济南市科技一条街，是一家从事计算机及其相关信息技术产品的销售和技术开发的专业化公司。',
        position:'职位：前端开发工程师',
        job:'本项目团队开发，个人负责页面重构，代码优化与维护。',
        skill:'所用技术：DIV+CSS布局，轮播图，ajax数据交互加载更多资源，运用Jquery进行与用户交互行为。',
        face: 'img/xkhlogo.png'
    },{
        id: 5,
        name: '栗香浓',
        describing: '简介： 北京栗香情浓生态食品有限公司成立于2012年，同年国家商标总局注册产品商标“L栗香浓”广告语“栗香情更浓”，公司首家实体店于当年，在北京长安街木樨地（地铁1号线木樨地BI口出，邮政储蓄后10米）正式开业。',
        position:'职位：前端开发工程师',
        job:'本项目团队开发，个人负责首页与惊喜活动等页面布局，页面重构，后期代码优化与维护。',
        skill:'所用技术：轮播图，图片预加载，ajax数据交互加载更多资源，响应式布局，canvas等',
        face: 'img/lxnlogo.png'
    },{
        id: 6,
        name: '3D筛子',
        describing: '简介：业余进修的时候看视频学习制作的小玩意',
      
        skill:'所用技术：css3动画与jquery结合，用到了translate，以及视口',
        face: 'img/3Dlogo.png'
    },{
        id: 7,
        name: 'h5播放器',
        describing: '简介：业余学习制作',
      
        skill:'所用技术：css3动画，h5新标签，jquery',
        face: 'img/audio.png'
    },
    {
        id: 8,
        name: '英语记单词软件',
        describing: '简介：业余做的单词软件',
      
        skill:'localstorage，tab切换，数组去重',
        face: 'img/memorize.png'
    },{
        id: 9,
        name: 'canvas星光闪烁',
        describing: '简介：业余的时候看视频学习制作的小玩意',
       
        skill:'所用技术：canvas、jquery',
        face: 'img/canvas.png'
    },{
        id: 10,
        name: '嗨淘模仿',
        describing: '简介：业余练习的时候写的一个电商网站',
        
        skill:'所用技术：轮播图，json数据交互，放大镜，css sprites，cookie，瀑布流，三级联动',
        face: 'img/ht.png'
    },{
        id: 11,
        name: '南阳理工官网模仿',
        describing: '简介：业余练习的时候写的一个网站',
       
        skill:'所用技术：div+css布局，轮播图',
        face: 'img/ligonglogo.png'
    }];

    return {
        all: function() {
            return projects;
        },
        remove: function(project) {
            projects.splice(projects.indexOf(project), 1);
        },
        get: function(projectId) {
            for (var i = 0; i < projects.length; i++) {
                if (projects[i].id === parseInt(projectId)) {
                    return projects[i];
                }
            }
            return null;
        }
    };
})
