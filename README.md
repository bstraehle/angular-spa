Generic SPA using generic REST API (https://github.com/bstraehle/dotnet-rest-api).  Implements CRUD operations via API calls.  

Build image and run container:  
```
docker build -t spa-image .  
docker run --name spa-container -d -p 8080:80 spa-image  
```
URL:  
```
localhost:8080  
```
Tag image and upload to Docker Hub:  
```
docker tag spa-image bstraehle/spa:latest  
docker push bstraehle/spa:latest  
```
For Docker orchestration using this container, see https://github.com/bstraehle/docker  
For Kubernetes orchestration using this container, see https://github.com/bstraehle/kubernetes  
