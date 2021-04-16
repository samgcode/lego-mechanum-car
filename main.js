import PhidgetController from './PhidgetContoller'
import Drive from './drive'

async function main() {
    let phidgetController = new PhidgetController()
    const drive = new Drive()

    await phidgetController.init()

    drive.start()
}

main()
    .catch((err) => {
        throw err
    })