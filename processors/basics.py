import numpy as np
import cv2
import face_recognition

img = face_recognition.load_image_file('fmodels/Kunal.jpg')
img = cv2.cvtColor(img,cv2.COLOR_BGR2RGB)

img1 = face_recognition.load_image_file('fmodels/Nikhil.jpg')
img1 = cv2.cvtColor(img1,cv2.COLOR_BGR2RGB)

faceLoc = face_recognition.face_locations(img)[0]
encode = face_recognition.face_encodings(img)[0]
cv2.rectangle(img,(faceLoc[3]+1,faceLoc[0]),(faceLoc[1]-1,faceLoc[2]),(255,0,0),2)
cv2.rectangle(img,(faceLoc[3],faceLoc[2]+35),(faceLoc[1],faceLoc[2]),(255,0,0),cv2.FILLED)
cv2.putText(img,'KUNAL',(faceLoc[3]+6,faceLoc[2]+22),cv2.FONT_HERSHEY_COMPLEX,0.8,(255,255,255),1)

faceLoc1 = face_recognition.face_locations(img1)[0]
encode1 = face_recognition.face_encodings(img1)[0]
cv2.rectangle(img1,(faceLoc1[3]-1,faceLoc1[0]),(faceLoc1[1]+1,faceLoc1[2]),(255,0,0),2)
cv2.rectangle(img1,(faceLoc[3],faceLoc[2]-35),(faceLoc[1],faceLoc[2]),(255,0,0),cv2.FILLED)
cv2.putText(img1,'NIKHIL',(faceLoc[3]+6,faceLoc[2]+22),cv2.FONT_HERSHEY_COMPLEX,0.8,(255,255,255),1)

results = face_recognition.compare_faces([encode],encode1)
print(results[0])  #false

cv2.imshow('Kunal Jain',img)
cv2.imshow('Nikhil Singh',img1)

cv2.waitKey(0)