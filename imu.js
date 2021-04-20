//https://www.npmjs.com/package/mpu6050-gyro
const Gyro = require("mpu6050-gyro")
 
const address = 0x68 //MPU6050 address
const bus = 1 //i2c bus used
 
const gyro = new Gyro( bus,address )
 
async function update_telemetry() {
    
    const gyro_xyz = gyro.get_gyro_xyz()
    const accel_xyz = gyro.get_accel_xyz()
    
    const gyro_data = {
        gyro_xyz: gyro_xyz,
        accel_xyz: accel_xyz,
        rollpitch: gyro.get_roll_pitch( gyro_xyz, accel_xyz )
    }
    
    console.log('gyro_data', gyro_data)
}
 
if ( gyro ) {
    update_telemetry()
}