import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

Template.listItem.events({
  'click .delete'(){
    Meteor.call('lists.delete',this._id);
  },
});
