(function () {
'use strict';

domready(function () {
  var sideNavItem = document.querySelectorAll('.sidebar-nav span');

  if (sideNavItem[0] && sideNavItem[1]) {
    var postToc = document.querySelector('.post-toc');
    var siteOverview = document.querySelector('.site-overview');

    // click post toc
    sideNavItem[0].onclick = function () {
      this.classList.add('current');
      sideNavItem[1].classList.remove('current');

      anime({
        targets: siteOverview,
        opacity: 0,
        easing: 'linear',
        duration: 200,
        complete: function () {
          siteOverview.style.display = 'none';
        }
      });
      
      anime({
        targets: postToc,
        opacity: 1,
        easing: 'linear',
        duration: 200,
        complete: function () {
          postToc.style.display = 'block';
        }
      });
    };
    
    // click site overview
    sideNavItem[1].onclick = function () {
      this.classList.add('current');
      sideNavItem[0].classList.remove('current');

      anime({
        targets: postToc,
        opacity: 0,
        easing: 'linear',
        duration: 200,
        complete: function () {
          postToc.style.display = 'none';
        }
      });

      anime({
        targets: siteOverview,
        opacity: 1,
        easing: 'linear',
        duration: 200,
        complete: function () {
          siteOverview.style.display = 'block';
        }
      });
    }; 
  }
});
})();