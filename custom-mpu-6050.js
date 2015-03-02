var mpu6050 = require('./custom-driver/mpu6050');

var mpu = new mpu6050();
mpu.initialize();

mpu.testConnection(function(err, isDeviceConnected) {
  if (isDeviceConnected) {
    var count = 0;
    var timer = setInterval(function() {
      mpu.getMotion6(err, function(err, data) {
        console.log(data);
      });
      if (++count >= 20) {
        clearInterval(timer);
        mpu.setSleepEnabled(1, function() {
          console.log('Sleep Enabled Set -> 1');
        });
      }
    }, 500);
  }
});