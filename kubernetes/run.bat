echo "Implantar ConfigMaps"
kubectl apply -f cm-app.yaml        
kubectl apply -f cm-postgres.yaml   

echo "Implantar Volume"
kubectl apply -f pv-postgres.yaml   
kubectl apply -f vc-postgres.yaml

echo "Implantar Pods"
kubectl apply -f pod-app.yaml
kubectl apply -f pod-postgres.yml   

echo "Implantar Services"

kubectl apply -f svc-postgres.yaml
kubectl apply -f svc-app.yaml
