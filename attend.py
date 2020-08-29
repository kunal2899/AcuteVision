import numpy as np
import cv2
import face_recognition
import os
from datetime import datetime

images = []
names = []

dirList = os.listdir('fmodels')

for i in dirList:
    curImg = cv2.imread(f'fmodels/{i}')
    images.append(curImg)
    names.append(i.split('.')[0])

def findEncodings(images):
    encodings = []
    for img in images:
        img = cv2.cvtColor(img,cv2.COLOR_BGR2RGB)
        encode = face_recognition.face_encodings(img)[0]
        encodings.append(encode)
    return encodings

def markAttendance(name):
    with open('attendance.csv','r+') as f:
        data = f.readlines()
        names = []
        for line in data:
            names.append(line.split(',')[0])
        if name not in data:
            now = datetime.now()
            dtstr = now.strftime('%H:%M:%S')
            f.writelines(f'\n{name},{dtstr}')


encodeKnown = findEncodings(images)
print('Encoding Complete')

cap = cv2.VideoCapture(0)
# cap.set(cv2.CAP_PROP_FRAME_WIDTH,640)
# cap.set(cv2.CAP_PROP_FRAME_HEIGHT,480)

while True:
    _,img = cap.read()
    simg = cv2.resize(img,(0,0),None,0.25,0.25)
    simg = cv2.cvtColor(simg,cv2.COLOR_BGR2RGB)

    facesCurFrame = face_recognition.face_locations(simg)
    encodesCurFrame = face_recognition.face_encodings(simg,facesCurFrame)

    for e,f in zip(encodesCurFrame,facesCurFrame):
        matches = face_recognition.compare_faces(encodeKnown,e)
        faceDis = face_recognition.face_distance(encodeKnown,e)
        matchIndex = np.argmin(faceDis)

        if matches[matchIndex]:
            name = names[matchIndex].upper()
            y1,x2,y2,x1 = f
            y1,x2,y2,x1 = y1*4,x2*4,y2*4,x1*4
            cv2.rectangle(img,(x1,y1),(x2,y2),(255,0,0),2)
            cv2.rectangle(img,(x1,y2-35),(x2,y2),(255,0,0),cv2.FILLED)
            cv2.putText(img,name,(x1+6,y2+6),cv2.FONT_HERSHEY_PLAIN,0.7,(255,255,255),1)
            markAttendance(name)

    cv2.imshow('Camera',img)
    cv2.waitKey(1)