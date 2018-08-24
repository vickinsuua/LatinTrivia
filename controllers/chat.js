const Chatkit = require('@pusher/chatkit-server');
const mongoose = require('mongoose');
const User = require('../models/user');

const chatkit = new Chatkit.default({
    instanceLocator: "v1:us1:8c31d173-b797-4deb-b2aa-b3c7c6087ec3",
    key: "061b7c3d-1001-48de-b1e8-75985a991265:7PuAdA8f43rzIW+0DypFzfoQF1vor9cIzwNVVjAVblI=",
  });

chatkit.createUser({
    id: 'userId',
    name: 'Some Name',
  }).then(() => {
      console.log('User created successfully');
    }).catch((err) => {
      console.log(err);
    });

chatkit.getUsers().then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    });

chatkit.updateUser({
    id: 'someId',
    name: 'New Name',
    avatarURL: 'https://some.url',
    customData: {
        age: 21,
    },
    }).then(() => {
        console.log('User updated successfully');
    }).catch((err) => {
        console.log(err);
    });

chatkit.deleteUser({ userId: 'someId' }).then(() => {
        console.log('User deleted successfully');
    }).catch((err) => {
        console.log(err);
    });

chatkit.createRoom({
    creatorId: 'userId',
    name: 'my room',
    }).then(() => {
        console.log('Room created successfully');
    }).catch((err) => {
        console.log(err);
    });
        
chatkit.getUserRooms({
    userId: 'user1',
    }).then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    });

chatkit.createRoomRole({
    name: 'mycoolroomrole',
    permissions: ['room:join'],
    })
    .then(() => {
        console.log('Room role created successfully');
    }).catch((err) => {
        console.log(err);
    });

chatkit.assignRoomRoleToUser({
    userId: 'userId',
    roleName: 'mycoolroomrole',
    roomId: 234,
    })
    .then(() => {
        console.log('Assigned room role successfully');
    }).catch((err) => {
        console.log(err);
    });