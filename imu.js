const mpu = require('mpu6050-dmp')
const sleep = require('./sleepAsync')

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
      this.heading -= this.headingOffset
    }
    
    async calibrate() {
        console.log('starting calibration...')

        const telemetryInterval = setInterval(() => {
            this.updateTelemetry()
        }, 200)

        await sleep(() => {
            clearInterval(telemetryInterval)
            this.setHeadingOffset()
        }, 20000)
        
        console.log('finished calibration')
    }

    setHeadingOffset() {
      this.headingOffset = Math.round(this.heading)
    }

    
}

module.exports = IMU