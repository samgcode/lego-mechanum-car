//https://www.npmjs.com/package/mpu6050-gyro
const Gyro = require("mpu6050-gyro")
 
class IMU {
    constructor() {
        this.address = 0x68 //MPU6050 address
        this.bus = 1 //i2c bus used

        this.gyro = new Gyro(this.bus, this.address)
    }
    
    
    async update_telemetry() {
        if (this.gyro) {    
            const gyro_xyz = this.gyro.get_gyro_xyz()
            const accel_xyz = this.gyro.get_accel_xyz()
            const acZ = accel_xyz.z/16384.0
            
            const gyro_data = {
                gyro_xyz: gyro_xyz,
                accel_xyz: accel_xyz,
                rollpitch: this.gyro.get_roll_pitch( gyro_xyz, accel_xyz ),
                yaw: acZ*-100
            }
            
            console.log('gyro_data', gyro_data)
        }
    }
    
}

module.exports = IMU

/*
averaging 10000 readings each time  
....................	XAccel			              YAccel				    ZAccel			                XGyro			YGyro		    	ZGyro
                     [-2235,-2233] --> [-12,2]	[973,974] --> [0,17]	[3900,3902] --> [16381,16397]	[45,46] --> [-4,1]	[12,13] --> [0,4]	[63,64] --> [0,4]
.................... [-2234,-2233] --> [0,2]	[973,974] --> [0,17]	[3901,3902] --> [16380,16397]	[45,46] --> [-5,1]	[12,13] --> [0,4]	[63,63] --> [0,1]
.................... [-2234,-2233] --> [-3,2]	[973,973] --> [0,2]	    [3901,3902] --> [16381,16397]	[45,46] --> [-6,1]	[12,13] --> [0,4]	[63,63] --> [0,2]
-------------- done --------------

averaging 10000 readings each time
....................	XAccel			            YAccel				                ZAccel			            XGyro			  YGyro			    ZGyro
                     [-2215,-2214] --> [-13,3]	[937,937] --> [0,2]	       [3904,3906] --> [16370,16388]	[46,47] --> [0,3]	[13,14] --> [0,3]	[64,65] --> [-2,1]
.................... [-2215,-2214] --> [-15,3]	[937,937] --> [0,2]	       [3905,3906] --> [16369,16388]	[46,47] --> [-1,3]	[13,14] --> [0,3]	[64,65] --> [-1,1]
.................... [-2215,-2214] --> [-15,3]	[937,937] --> [-1,2}       [3905,3906] --> [16369,16388]	[46,47] --> [-1,3]	[13,14] --> [0,3]	[64,65] --> [0,1]
-------------- done --------------

xAccel:-2220
yAccel: +950
zAccel: +3905

xGyro: +46
yGyro: +13
zGyro: +64
*/