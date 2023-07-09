# AFourathon-Nekoma
Admin Only Library Management System application that can be run as a container on the cloud for creating/updating/deleting a student

# Frontend can be accessed by 2 ways
## 1. Through Docker

To run the container and application:

`docker run -d -p 8080:80 --name <image_name> prachetshah/afourathon-nekoma-app`
<br/>Ex Output: <br>
c4306b91abcf576c9af69247628c3165581261955fc321a26603d72ad6e214a2

Once command runs go to `http://localhost:8080/` to check the running library management application

To stop the image running: <br>
`docker stop <image_name>`
afourathon

## 2 using Create-react-app or through deployed site: https://nekoma-library-student-detail.netlify.app/
