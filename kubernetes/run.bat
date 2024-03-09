echo "Cleaning old Pods"
kubectl delete pods --all

echo "Deploying ConfigMaps"
kubectl apply -f cm-app.yaml        
kubectl apply -f cm-postgres.yaml   

echo "Deploying Volume"
kubectl apply -f pv-postgres.yaml   
kubectl apply -f vc-postgres.yaml

echo "Deploying Pods"
kubectl apply -f pod-app.yaml
kubectl apply -f pod-postgres.yml   

echo "Deploying Services"

kubectl apply -f svc-postgres.yaml
kubectl apply -f svc-app.yaml
