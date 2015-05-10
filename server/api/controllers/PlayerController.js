
module.exports = {

  leaderboard: function(req, res) {
    Player.find({ createdAt: { '>': new Date().setDate(new Date().getDate()-1) }}, function(err, players) {
      return res.json(players);
    });
  },

};
