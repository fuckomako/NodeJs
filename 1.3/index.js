const EventEmitter = require('events');

const ChatApp = require('./chatapp');

let webinarChat =  new ChatApp('webinar');
let facebookChat = new ChatApp('=========facebook');
let vkChat =       new ChatApp('---------vk');

let chatOnMessage = (message) => {
  console.log(message);
};

let preparingForAnswer = () => {
  console.log('Готовлюсь к ответу');
};

let vkChatOnClose = () => {
  console.log('Чат вконтакте закрылся :(');
};

webinarChat.on('message', chatOnMessage);
facebookChat.on('message', chatOnMessage);
vkChat.on('message', chatOnMessage);

webinarChat.on('message', preparingForAnswer);
vkChat.setMaxListeners(2);
vkChat.on('message', preparingForAnswer);
vkChat.on('close', vkChatOnClose);

// Закрыть вконтакте
setTimeout( ()=> {
  console.log('Закрываю вконтакте...');
  vkChat.removeListener('message', chatOnMessage);
  vkChat.removeListener('message', preparingForAnswer);
  vkChat.close();
}, 10000 );


// Закрыть фейсбук
setTimeout( ()=> {
  console.log('Закрываю фейсбук, все внимание — вебинару!');
  facebookChat.removeListener('message', chatOnMessage);
}, 15000 );

// Через 30 секунд отписать chatOnMessage от вебинара webinarChat
setTimeout( ()=> {
  webinarChat.removeListener('message', chatOnMessage);
}, 30000 );
