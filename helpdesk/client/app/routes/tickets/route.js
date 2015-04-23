import Ember from 'ember';

export default Ember.Route.extend({
  helpdesk: Ember.inject.service(),

  model() {
    return this.get('helpdesk').find();
  },

  actions: {
    addTicket(ticket) {
      this.get('helpdesk').save(ticket);
    }
  }

});
