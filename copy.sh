zip -r lego_mechanum_car.zip ../lego-mechanum-car/ -x */node_modules/**\* -x *package-lock.json* -x */.git/*
scp -r lego_mechanum_car.zip pi@192.168.0.134:/home/pi/