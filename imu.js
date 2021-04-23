const mpu = require('mpu6050-dmp')

class IMU {
    constructor() {
        mpu.initialize()

        this.heading = 0
        this.headingOffset = 0;
    }

    updateTelemetry() {
      const rotation = mpu.getRotation()
      const attitude = mpu.getAttitude()

      this.heading = attitude.yaw
    }
    
    ssetHeadingOffset() {

    }
}

module.exports = IMU