var mpu6050 = require('mpu6050');

var mpu = new mpu6050();
mpu.initialize();

if (mpu.testConnection()) {
  console.log(mpu.getMotion6());
}

mpu.setSleepEnabled(1);
