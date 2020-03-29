import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import Lists from './../models/index';

// 定义事件
Template.listInput.events({
  /** 提交任务的事件处理 */
  'submit form'(event) {
    console.log(this);
    event.preventDefault();
    const text = event.target.text.value;
    if (text.trim().length > 0) {
      // 调用lists.insert方法
      Meteor.call('lists.insert', text);
      event.target.text.value = '';
    }
  },
});