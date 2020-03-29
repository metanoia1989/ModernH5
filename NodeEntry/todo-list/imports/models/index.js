// import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

// 实例化 lists 集合
const Lists = new Mongo.Collection('lists');

if (Meteor.isServer) {
  Meteor.publish('lists', () => {
    return Lists.find();
  });
}

// 定义操作这个集合的方法
Meteor.methods({
  // 新建任务
  'lists.insert'(text){
    Lists.insert({
      content: text,
      createdAt: new Date(),
      completed: false,
    });
  },
  // 删除任务
  'lists.delete'(id){
    Lists.remove({_id: id});
  },
  // 更新任务是否完成
  'lists.update'(id, completed){
    Lists.update(id, {$set: {completed: completed}});
  }
});

export default Lists;