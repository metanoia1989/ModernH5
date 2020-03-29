import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import Lists from './../models/index';
import '../views/listContent.html'

/** 定义listContent的数据 */
Template.listContent.helpers({
  lists() {
    // 取出session中listType的值
    const listType = Session.get('listType');
    // 根据listType的值来显示不同的任务内容
    if (listType) {
      if (listType === 1) {
        // 显示所有已经完成的任务
        return Lists.find({completed: true}, {sort:{createdAt: -1}});
      } else if (listType === 2) {
        // 显示所有未完成的任务
        return Lists.find({completed: false}, {sort:{createdAt: -1}});
      }
    }
    // 倒序排列任务 显示所有任务
    return Lists.find({}, {sort:{createdAt: -1}});
  }
});


/** 定义相应的事件 */
Template.body.events({
  /** 更新任务是否完成的事件处理函数 */
  'change .listContainer li'(event) {
    // 调用 lists.update 函数
    Meteor.call('lists.update', this._id, !this.completed);
  }
});

// 订阅服务端数据
Template.body.onCreated(() => {
  Meteor.subscribe('lists');
});