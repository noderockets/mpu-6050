var Cylon = require('cylon');

Cylon.robot({
  connections: {
    raspi: {
      adaptor: 'raspi'
    }
  },

  devices: {
    mpu6050: {
      driver: 'mpu6050'
    }
  },

  work: function(my) {

    every((1).seconds(), function() {
      my.mpu6050.getMotionAndTemp(function(err, data) {
        if (err) {
          Cylon.Logger.error('Err ===>', err);
        } else {
          Cylon.Logger.info('Data ===>', data);
        }
      });

    });

    //var count = 0;
    //var timer = setInterval(function() {
    //  my.mpu6050.getMotionAndTemp(function(err, data) {
    //    console.log(data);
    //  });
    //  if (++count >= 20) {
    //    clearInterval(timer);
    //    console.log('No longer polling, but device is still active');
    //  }
    //}, 500);

    //every((3).seconds(), function() {
    //  my.mpu6050.getMotionAndTemp(function(err, data) {
    //    console.log(data);
    //  });
    //});
  }
}).start();
