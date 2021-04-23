const PhidgetController = require('./PhidgetContoller')
const Drive = require('./drive')
const IMU = require('./imu')
const imuCalibTime = 20;

async function main() {
    const phidgetController = new PhidgetController()
    await phidgetController.init()

    const imu = new IMU()
    setTimeout(() => {
        imu.setHeadingOffset()

        const drive = new Drive(phidgetController, imu)
    
        drive.start()
    }, imuCalibTime*1000)
    
}

main()
    .catch((err) => {
        throw err
    })