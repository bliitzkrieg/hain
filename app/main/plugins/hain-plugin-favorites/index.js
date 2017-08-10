'use strict';

module.exports = (context) => {
  const shell = context.shell;
  const app = context.app;
  const indexer = context.indexer;

  const favorites = [
      {
          key: 'MMO',
          id: 'http://www.mmo-champion.com/content/',
          primaryText: 'http://www.mmo-champion.com/content/',
          secondaryText: 'World Of Warcraft News',
      },
      {
          key: 'EMAIL',
          id: 'https://mail.google.com/mail/u/0/',
          primaryText: 'https://mail.google.com/mail/u/0/',
          secondaryText: 'Personal Email',
      },
      {
          key: 'WORK',
          id: 'https://mail.google.com/mail/u/2/',
          primaryText: 'https://mail.google.com/mail/u/2/',
          secondaryText: 'Work Email',
      },
      {
          key: 'YT',
          id: 'https://www.youtube.com/feed/subscriptions',
          primaryText: 'https://www.youtube.com/feed/subscriptions',
          secondaryText: 'YouTube Videos',
      },
      {
          key: 'GITHUB',
          id: 'https://github.com/',
          primaryText: 'https://github.com/',
          secondaryText: 'Github',
      },
      {
          key: 'HACKER',
          id: 'https://news.ycombinator.com/',
          primaryText: 'https://news.ycombinator.com/',
          secondaryText: 'Hacker News',
      }
  ];

  function startup() {
    indexer.set('favorite-fetcher', parseFavoriteForIndexer);
  }

  function parseFavoriteForIndexer(query) {
    const search = query.toUpperCase();
    return {
        group: 'Favorite',
        ...favorites.filter(favorite => favorite.key === search)
    };
  }

  function execute(id) {
    const protocol_re = /https?:\/\//i;
    let url = id;
    if (protocol_re.test(url) === false) {
      url = `http://${url}`;
    }
    shell.openExternal(url);
    app.close();
  }

  return { startup, execute };
};
