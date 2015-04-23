import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    createTicket() {
      var ticket = {
        requestedBy: this.get('name'),
        description: this.get('description'),
        createdAt: new Date()
      };

      this.sendAction('action', ticket);
      this.setProperties({
        name: '',
        description: ''
      });
    }
  }
});
