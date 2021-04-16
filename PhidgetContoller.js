const phidget22 = require('phidget22')

class PhidgetController {
    constructor() {
        this.SERVER_PORT = 5661

        this.motorA = new phidget22.DCMotor()
        this.motorB = new phidget22.DCMotor()
        this.motorC = new phidget22.DCMotor()
        this.motorD = new phidget22.DCMotor()

        this.attachedMotors = 0
        this.motorsAttached = false
    }

    async init() {
        if (process.argv.length != 3) {
            console.log('usage: node runFile.js <server address>')
            process.exit(1)
        }
        var hostname = process.argv[2]

        console.log('connecting to:' + hostname)
        var conn = new phidget22.Connection(this.SERVER_PORT, hostname, { name: 'Server Connection', passwd: '' })
        try {
            await conn.connect()
            await this.setupMotorFunctions()
            await this.initMotors()
            await this.timeout(1000)
        } catch (err) {
            console.error('Error running example:', err.message)
            process.exit(1)
        }

    }

    //<DCMotor functions>

    motorAttachHandler(ch) {
        console.log(ch + ' attached')
    }

    motorDetachHandler(ch) {
        console.log(ch + ' detached')
    }

    onVelocityUpdate(velocity) {
        // console.log('velocity:' + velocity + ' (' + this.getVelocity() + ')')
    }

    onBackEMFChange(backEMF) {
        console.log('backEMF:' + backEMF + ' (' + this.getBackEMF() + ')')
    }

    onBrakingStrengthUpdate(brakingStrength) {
        console.log('brakingStrength:' + brakingStrength + ' (' + this.getBrakingStrength() + ')')
    }

    onError(code, description) {
        console.log('Code: ' + code)
        console.log('Description: ' + description)
    }

    motorOpen(ch) {
        console.log('channel open')
    }

    motorOpenError(err) {
        console.log('error')
        console.log('failed to open the channel:' + err)
    }

    //</DCMotor functions>

    async setupMotorFunctions() {

        console.log('connected to server')

        this.motorA = this.createMotor(0, 0)
        this.motorB = this.createMotor(0, 1)
        this.motorC = this.createMotor(1, 0)
        this.motorD = this.createMotor(1, 1)
        
    }

    async createMotor(hubPort, channel) {
        motor = new phidget22.DCMotor()
        
        motor.setChannel(channel)
        motor.setHubPort(hubPort)

        motor.onAttach = this.motorAttachHandler
        motor.onDetach = this.motorDetachHandler
        motor.onError = this.onError

        motor.onVelocityUpdate = this.onVelocityUpdate
        motor.onBackEMFChange = this.onBackEMFChange
        motor.onBrakingStrengthUpdate = this.onBrakingStrengthUpdate

        motor.setPower = motor.setTargetVelocity

        try {
            await motor.open()
            await this.motorOpen
        } catch (err) {
            this.motorOpenError(err)
        }

        motor.setPower(0)
        motor.setAcceleration(100)

        return motor
    }

    //promise based setTimeout replacment
    async timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
    async sleep(fn, time, ...args) {
        await this.timeout(time)
        return fn(...args)
    }
}

export default PhidgetController