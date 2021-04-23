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
        }, 200)
    }
    
    loop() {
        // console.log(`Speed: ${this.xSpeed}, ${this.ySpeed}, ${this.turnSpeed}`)

        this.imu.updateTelemetry()

        this.motorA.setPower(-((this.ySpeed - this.xSpeed) + this.turnSpeed))
        this.motorB.setPower(((this.ySpeed - this.xSpeed) - this.turnSpeed))
        this.motorC.setPower(-((this.ySpeed + this.xSpeed) + this.turnSpeed))
        this.motorD.setPower(((this.ySpeed + this.xSpeed) - this.turnSpeed))

        this.xSpeed = 0
        this.ySpeed = 0
        this.turnSpeed = 0
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
    Y

A  ^^^  B

>       >   X

C  ^^^  D

*/

module.exports = Drive