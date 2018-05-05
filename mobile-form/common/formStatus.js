
const status = {};

status.NOTPUBLIC = 0;
status.COLLECTING = 1;
status.END = 2;
status.ERROR = 3;
status.canVisit = (state) => {
  if (state === 1) return true;
  return false;
};

module.exports = status;
