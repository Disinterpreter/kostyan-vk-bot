import eventEmitter from './eventEmitter'

eventEmitter.on('message_new', data => {
  console.log(data)
})
