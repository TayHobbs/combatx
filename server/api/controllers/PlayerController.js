
module.exports = {

  leaderboard: function(req, res) {
    var yesterday = new Date().setDate(new Date().getDate() - 1);
    Player.find({ createdAt: { '>': new Date(yesterday) }}, function(err, players) {
      return res.json(players);
    });
  },

};
