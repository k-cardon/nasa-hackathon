import h5py
import csv

f = h5py.File('python_corner/OMPS.h5', 'r')

print(type(f))

longitude = f['GEOLOCATION_DATA']['Longitude'][0][1]

latitude = f['GEOLOCATION_DATA']['Latitude'][0][1]


with open('python_corner/coords.csv', 'w', newline='') as file:
    mappoint = csv.writer(file, delimiter=' ', quotechar='|', quoting=csv.QUOTE_MINIMAL)
    mappoint.writerow(['Longitude', 'Latitude'])
    mappoint.writerow([longitude, latitude])
