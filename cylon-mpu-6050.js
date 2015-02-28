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
        console.log(data);
      });
    });
  }
}).start();
