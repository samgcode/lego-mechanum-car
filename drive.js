const readline = require('readline')

class Drive {
    constructor(controller, imu) {
        
        this.imu = imu

        this.motorA = controller.motorA
        this.motorB = controller.motorB
        this.motorC = controller.motorC
        this.motorD = controller.motorD
        
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.turnSpeed = 0;
        this.setupKeypressHandler()
    }
    
    start() {
        console.log('start')
        this.looper = setInterval(() => {
            this.loop()
        }, 400)
    }
    
    loop() {
        
        this.imu.updateTelemetry()
        this.heading = Math.round(this.imu.heading)
        console.log(`Heading: ${this.heading}`)
        console.log(`Speed: ${this.xSpeed}, ${this.ySpeed}, ${this.turnSpeed}`)

        this.normalizeSpeed(this.xSpeed, this.ySpeed)
        
        
        const powerA = -((this.ySpeed - this.xSpeed) + this.turnSpeed) // \\
        const powerB = ((this.ySpeed + this.xSpeed) - this.turnSpeed)  // //
        const powerC = -((this.ySpeed + this.xSpeed) + this.turnSpeed) // //
        const powerD = ((this.ySpeed - this.xSpeed) - this.turnSpeed)  // \\
        
        console.log(`Motors: ${this.clip(powerA, -1, 1)}, ${this.clip(powerB, -1, 1)}, ${this.clip(powerC, -1, 1)}, ${this.clip(powerD, -1, 1)}`)
        this.motorA.setPower(this.clip(powerA, -1, 1))
        this.motorB.setPower(this.clip(powerB, -1, 1))
        this.motorC.setPower(this.clip(powerC, -1, 1))
        this.motorD.setPower(this.clip(powerD, -1, 1))

        this.xSpeed = 0
        this.ySpeed = 0
        this.turnSpeed = 0
    }

    normalizeSpeed(x, y) {
        const headingRadians = this.heading * (Math.PI / 180)
        const xSpeed = x*Math.cos(headingRadians) - y*Math.sin(headingRadians)
        const ySpeed = x*Math.sin(headingRadians) + y*Math.cos(headingRadians)

        this.xSpeed = Number.parseFloat(xSpeed.toFixed(1))
        this.ySpeed = Number.parseFloat(ySpeed.toFixed(1))
    }

    clip(val, min, max) {
        return Math.min(Math.max(min, val), max)
    }

    setupKeypressHandler() {
        readline.emitKeypressEvents(process.stdin)
        process.stdin.setRawMode(true)

        var input = ''

        process.stdin.on('keypress', (str, key) => {
            if (key.ctrl && key.name === 'c') {
                process.exit()
            } else {
                input = key.name
                this.detectButton(input)
            }
        })
    }

    detectButton(key) {
        switch(key) {
            case 'q':
                this.turnSpeed = -1
                break
            case 'w':
                this.ySpeed = 1
                break
            case 'e':
                this.turnSpeed = 1
                break
            case 'a':
                this.xSpeed = -1
                break
            case 's':
                this.ySpeed = -1
                break
            case 'd':
                this.xSpeed = 1
                break
        }
    }
}

/*
    Y -------
            v
A  ^^^  B

>       >   X

C  ^^^  D

*/

module.exports = Drive