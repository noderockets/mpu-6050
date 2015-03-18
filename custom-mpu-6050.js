var mpu6050 = require('./custom-driver/mpu6050');
var nano = require('nano')('http://localhost:5984');

var flightData = nano.db.use('flight_data', createOnError);

var mpu = new mpu6050();
mpu.initialize();
var guid = generateGuid();

mpu.testConnection(function(err, isDeviceConnected) {
  if (isDeviceConnected) {
    var count = 0;
    var timer = setInterval(function() {
      mpu.getMotion6(err, function(err, data) {
        flightData.insert(adaptData(guid, data));
      });
      if (++count >= 300) {
        clearInterval(timer);
        mpu.setSleepEnabled(1, function() {
          console.log('Sleep Enabled Set -> 1');
        });
      }
    }, 100);
  }
});


// --- Private Functions -------------------------------------------------------

function adaptData(guid, data) {
  return {
    session: guid,
    dt: +new Date,
    ax: data[0],
    ay: data[1],
    az: data[2],
    temp: data[3],
    gx: data[4],
    gy: data[5],
    gz: data[6]
  }
}

function createOnError(err) {
  if (!err) return;
  nano.db.create('flight_data', function() {
    flightData = nano.db.use('flight_data');
  });
}

function generateGuid() {
  var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
  return guid;
}