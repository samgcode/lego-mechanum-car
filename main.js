const PhidgetController = require('./PhidgetContoller')
const Drive = require('./drive')

async function main() {
    let phidgetController = new PhidgetController()
    await phidgetController.init()
    
    const drive = new Drive(phidgetController)

    drive.start()
}

main()
    .catch((err) => {
        throw err
    })