const NotificationRepository = require('../repositories/NotificationsRepository');

const notifyUser = async (userId, message) => {
  console.log(`NOTIFICATION → User ${userId} : ${message}`);
  return NotificationRepository.create({ user_id: userId, message });
};

const getUserNotifications = async (userId) => {
  return NotificationRepository.findByUser(userId);
};

module.exports = { notifyUser, getUserNotifications };
