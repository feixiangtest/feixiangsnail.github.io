module.exports = {
  rules: [{
    pattern: /\/api\/liveList.do/,
    respondwith: './livelist.json'
  }, {
    pattern: /\/api\/moreLivelist.do/,
    respondwith: './more-livelist.json'
  }, {
    pattern: /\/api\/refreshLivelist.do/,
    respondwith: './refresh-livelist.json'
  }, {
    pattern: /\/api\/waterfall.do/,
    respondwith: './waterfall.json'
  }, {
    pattern: /\/api\/beauty.do/,
    respondwith: './beautylist.json'
  }, {
    pattern: /\/api\/search.do/,
    respondwith: './searchlist.json'
  }]
};
