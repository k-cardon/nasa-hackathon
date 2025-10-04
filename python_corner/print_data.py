import h5py
import csv

f = h5py.File('python_corner/OMPS.h5', 'r')

print(type(f))

longitude = f['GEOLOCATION_DATA']['Longitude']

latitude = f['GEOLOCATION_DATA']['Latitude']

cloud_pressure = f['ANCILLARY_DATA']['CloudPressure']


with open('python_corner/latitude.csv', 'w', newline='') as file:
    mappoint = csv.writer(file, delimiter=' ', quoting=csv.QUOTE_MINIMAL)

    for row in latitude:
        row_to_write = ""
        for i in range(0, len(row)):
            row_to_write = row_to_write + str(row[i]) + ","
        mappoint.writerow([row_to_write])


with open('python_corner/longitude.csv', 'w', newline='') as file:
    mappoint = csv.writer(file, delimiter=' ', quoting=csv.QUOTE_MINIMAL)
    
    for row in longitude:
        row_to_write = ""
        for i in range(0, len(row)):
            row_to_write = row_to_write + str(row[i]) + ","
        mappoint.writerow([row_to_write])


with open('python_corner/cloudpressure.csv', 'w', newline='') as file:
    mappoint = csv.writer(file, delimiter=' ', quotechar='|', quoting=csv.QUOTE_MINIMAL)
    for row in cloud_pressure:
        row_to_write = []
        for i in range(0, len(row)):
            row_to_write.append(row[i])
        mappoint.writerow([row_to_write])    