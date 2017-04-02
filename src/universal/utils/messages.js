export const getParticipants = (messages) => {
  let participants = [];

  for (var i = 0; i < messages.length; i++) {
    let message = messages[i];
    let from = message.from.split(' ')[0];

    if (participants.indexOf(from) === -1) {
      participants.push(from);
    }
  }

  return participants;
}

export const getReciepients = (message) => {
  const to = message.to;
  let reciepients = [];

  for (var i = 0; i < to.length; i++) {
    let name = to[i].split(' ')[0];
    reciepients.push(name);
  }

  return reciepients.join(', ');
}


export const getMessageSender = (messages) => {
  let firstMessage = messages[0];
  return firstMessage.from.split(' ')[0];
}

export const getReciepientCount = (messages) => {
  let toList = [];

  for (var i = 0; i < messages.length; i++) {
    let message = messages[i];
    for (var j = 0; j < message.to.length; j++) {
      let to = message.to[j];
      if (toList.indexOf(to) === -1) {
        toList.push(to);
      }
    }
  }

  return toList;
}

export const hasUnreadMessages = (messages) => {
  for (var i = 0; i < messages.length; i++) {
    let message = messages[i];
    if (!message.read) {
      return true;
    }
  }

  return false;
}
