const Notification = require('../../src/models/notification');
const {
  createNotification,
  listNotifications,
  updateNotifications,
} = require('../../src/controllers/notification');

test('create_Notification_success', async () => {
  const mockOwner = 'abc';
  const mockSender = 'xyz';
  const mockRead = true;
  const mockReq = buildMockRequest();
  mockReq.body = {
    owner: mockOwner,
    sender: mockSender,
    read: mockRead,
  };

  const mockRes = buildMockResponse();

  jest.spyOn(Notification, 'create').mockResolvedValue({});

  await createNotification(mockReq, mockRes);

  expect(mockRes.status).toBeCalledWith(200);
  expect(mockRes.json).toBeCalledWith({
    successful: true,
    notification: {},
  });
});

test('create_Notification_returns_400', async () => {
  const mockOwner = 'abc';
  const mockSender = 'xyz';
  const mockRead = true;
  const mockReq = buildMockRequest();
  mockReq.body = {
    owner: mockOwner,
    sender: mockSender,
    read: mockRead,
  };
  const mockRes = buildMockResponse();

  jest.spyOn(Notification, 'create').mockRejectedValue(new Error());

  await createNotification(mockReq, mockRes);

  expect(mockRes.status).toBeCalledWith(400);
  expect(mockRes.json).toBeCalledWith({
    successful: false,
    notification: null,
  });
});

test('list_Notifications_Success', async () => {
  const mockUsername = 'abcd';
  const mockReq = buildMockRequest();
  mockReq.params = { username: mockUsername };
  mockReq.query = { pageSize: 10, page: 1 };

  const mockRes = buildMockResponse();

  jest.spyOn(Notification, 'find').mockResolvedValue([{}]);

  Notification.find = jest.fn(() => Notification);
  Notification.skip = jest.fn(() => Notification);
  Notification.limit = jest.fn(() => [{}]);

  await listNotifications(mockReq, mockRes);

  expect(mockRes.status).toBeCalledWith(200);
  expect(mockRes.json).toBeCalledWith({
    successful: true,
    notifications: [{}],
  });
});

test('update_Notification_Success', async () => {
  const mockUsername = 'abcd';
  const mockReq = { params: { username: mockUsername } };
  const mockRes = buildMockResponse();

  jest.spyOn(Notification, 'updateMany').mockResolvedValue([{}]);
  jest.spyOn(Notification, 'find').mockResolvedValue([{}]);

  await updateNotifications(mockReq, mockRes);

  expect(mockRes.status).toBeCalledWith(200);
  expect(mockRes.json).toBeCalledWith({
    successful: true,
    notifications: [{}],
  });
});

const buildMockResponse = () => {
  const mockRes = {};
  mockRes.json = jest.fn();
  mockRes.status = jest.fn(() => mockRes);

  return mockRes;
};

const buildMockRequest = () => {
  const mockReq = { metrics: {}, logger: {} };
  mockReq.logger.getLogGroup = jest.fn(() => mockReq.logger);
  mockReq.logger.info = jest.fn();

  mockReq.metrics.createNotificationRequestCount = {};
  mockReq.metrics.createNotificationLatency = {};

  const { createNotificationRequestCount, createNotificationLatency } =
    mockReq.metrics;

  createNotificationRequestCount.bind = jest.fn(
    () => createNotificationRequestCount
  );
  createNotificationRequestCount.add = jest.fn();
  createNotificationLatency.bind = jest.fn(() => createNotificationLatency);
  createNotificationLatency.set = jest.fn();

  return mockReq;
};
