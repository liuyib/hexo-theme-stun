$(document).ready(function () {
  $('.header-nav-search').on('click', function (e) {
    e.stopPropagation();

    $('body').css('overflow', 'hidden');
    $('.algolia-popup')
      .velocity('stop')
      .velocity('transition.expandIn', {
        duration: 300,
        complete: function () {
          $('.algolia-popup input').focus();
        }
      });
    $('.algolia-mask')
      .velocity('stop')
      .velocity('transition.fadeIn', {
        duration: 300
      });
  });

  $('.algolia-mask, .algolia-close').on('click', function () {
    closeSearch();
  });

  $(document).on('keydown', function (e) {
    // Escape <=> 27
    if (e.keyCode === Stun.utils.codeToKeyCode('Escape')) {
      closeSearch();
    }
  });

  var algolia = CONFIG.algolia;

  if (!(algolia.appId && algolia.apiKey && algolia.indexName)) {
    return console.error('Algolia setting is invalid.');
  }

  var search = instantsearch({
    appId: algolia.appId,
    apiKey: algolia.apiKey,
    indexName: algolia.indexName,
    searchParameters: {
      hitsPerPage: algolia.hits.per_page || 10
    },
    searchFunction: function (helper) {
      var searchInput = $('.algolia-input-wrapper').find('input');

      if (searchInput.val()) {
        helper.search();
      }
    }
  });

  search.addWidget(
    instantsearch.widgets.searchBox({
      container: '.algolia-input-wrapper',
      reset: false,
      magnifier: false,
      placeholder: algolia.languages.input_placeholder
    })
  );

  // The hits of search results.
  search.addWidget(
    instantsearch.widgets.hits({
      container: '#algolia-hits',
      templates: {
        item: function (data) {
          var link = data.permalink ? data.permalink : CONFIG.root + data.path;
          return (
            '<a href="' + link + '" class="algolia-hit-item-link">' +
              data._highlightResult.title.value +
            '</a>'
          );
        },
        empty: function (data) {
          return (
            '<div id="algolia-hits-empty">' +
              algolia.languages.hits_empty.replace(/\$\{query}/, data.query) +
            '</div>'
          );
        }
      },
      cssClasses: {
        item: 'algolia-hit-item'
      }
    })
  );

  // The stats of search results.
  if ($('#algolia-stats')[0]) {
    search.addWidget(
      instantsearch.widgets.stats({
        container: '#algolia-stats',
        templates: {
          body: function (data) {
            var stats = algolia.languages.hits_stats
              .replace(/\$\{hits}/, data.nbHits)
              .replace(/\$\{time}/, data.processingTimeMS);
            return (
              stats +
              '<span class="algolia-logo pull-right">' +
                '<img src="' + CONFIG.root +
                'images/algolia.svg" alt="Algolia" />' +
              '</span>'
            );
          }
        }
      })
    );
  }

  // The pagination of the results.
  search.addWidget(
    instantsearch.widgets.pagination({
      container: '#algolia-pagination',
      scrollTo: false,
      showFirstLast: false,
      labels: {
        first: '<i class="fa fa-angle-double-left"></i>',
        last: '<i class="fa fa-angle-double-right"></i>',
        previous: '<i class="fa fa-angle-left"></i>',
        next: '<i class="fa fa-angle-right"></i>'
      },
      cssClasses: {
        root: 'pagination',
        item: 'pagination-item',
        link: 'page-number',
        active: 'current',
        disabled: 'disabled-item'
      }
    })
  );

  search.start();

  function closeSearch () {
    $('body').css('overflow', 'auto');
    $('.algolia-popup')
      .velocity('stop')
      .velocity('transition.expandOut', {
        duration: 300
      });
    $('.algolia-mask')
      .velocity('stop')
      .velocity('transition.fadeOut', {
        duration: 300
      });
  }
});
