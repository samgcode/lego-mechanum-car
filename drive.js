class Drive {
    constructor(controller) {
        this.motorA = controller.motorA
        this.motorB = controller.motorB
        this.motorC = controller.motorC
        this.motorD = controller.motorD
        
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.turnSpeed = 0;
    }

    start() {

    }

    loop() {





        this.motorA.setPower((this.ySpeed - this.xSpeed) + this.turnSpeed)
        this.motorB.setPower((this.ySpeed - this.xSpeed) - this.turnSpeed)
        this.motorC.setPower((this.ySpeed + this.xSpeed) + this.turnSpeed)
        this.motorD.setPower((this.ySpeed + this.xSpeed) - this.turnSpeed)
    }
}

/*
    Y

A  ^^^  B

>       >   X

C  ^^^  D

*/