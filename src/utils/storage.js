const USER_KEY = 'user';
// 存储localStorage信息
function getItem() {
  return JSON.parse(localStorage.getItem(USER_KEY));
};

function setItem(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
};

function removeItem(user) {
  localStorage.removeItem(USER_KEY);
};

export {
  getItem,
  setItem,
  removeItem
}