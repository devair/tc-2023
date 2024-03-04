
# Sistema de Pedidos 📝  
  
Projeto exemplo de um sistema para gestão de pedidos de uma lanchonete utilizando os conceitos de Arquitetura Limpa (Clean Architecture)
  
## 1) Rodar localmente no Docker 

Para executar a aplicação é necesssário ter o Docker instalado localmente

### a) Clonar o projeto 

~~~bash
  git https://github.com/devair/tc-2023.git
~~~

### b) Acessar o diretório do projeto

~~~bash  
  cd tc-2023
~~~

### c) Rodar no Docker

### 
~~~bash  
docker compose up
~~~  

## 2) Rodar aplicação em Kubernetes

Ter o Minikube instalado localmente

### a) Iniciar o cluster do Minikube

###
~~~bash
minikube start
~~~

### b) Implantar Pods, Services, ConfigMaps
Acessar a pasta kubernetes e executar para cada arquivo o seguinte comando

Implantar ConfigMaps
~~~bash
kubectl apply -f ./kubernetes/cm-app.yaml        
~~~

~~~bash
kubectl apply -f ./kubernetes/cm-postgres.yaml   
~~~

Implantar Volume

~~~bash
kubectl apply -f ./kubernetes/pv-postgres.yaml   
~~~

~~~bash
kubectl apply -f ./kubernetes/vc-postgres.yaml
~~~


Implantar Pods

~~~bash
kubectl apply -f ./kubernetes/pod-app.yaml
~~~

~~~bash
kubectl apply -f ./kubernetes/pod-postgres.yml   
~~~

Implantar Services

~~~bash
kubectl apply -f ./kubernetes/svc-postgres.yaml
~~~

~~~bash       
kubectl apply -f ./kubernetes/svc-app.yaml
~~~


### c) Redirecionar portas para acesso via localhost

Para acessar a aplicação via local host na porta 3333, executar o comando abaixo:

~~~
bash
kubectl port-forward service/svc-app 3333:80
~~~