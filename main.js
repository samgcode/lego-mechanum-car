const PhidgetController = require('./PhidgetContoller')
const Drive = require('./drive')
const IMU = require('./imu')

async function main() {
    const phidgetController = new PhidgetController()
    await phidgetController.init()

    const imu = new IMU()

    await imu.calibrate()

    const drive = new Drive(phidgetController, imu)

    drive.start()
}

main()
    .catch((err) => {
        throw err
    })