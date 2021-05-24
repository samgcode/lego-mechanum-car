const PhidgetController = require('./setup/PhidgetContoller')
const Drive = require('./drive')
const IMU = require('./input/imu')

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