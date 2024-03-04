
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
kubectl apply ./kubernetes/cm-app.yaml        
~~~

~~~bash
kubectl apply ./kubernetes/cm-postgres.yaml   
~~~

Implantar Volume

~~~bash
kubectl apply ./kubernetes/pv-postgres.yaml   
~~~

~~~bash
kubectl apply ./kubernetes/vc-postgres.yaml
~~~


Implantar Pods

~~~bash
kubectl apply ./kubernetes/pod-app.yaml
~~~

~~~bash
kubectl apply ./kubernetes/pod-postgres.yml   
~~~

Implantar Services

~~~bash
kubectl apply ./kubernetes/svc-postgres.yaml
~~~

~~~bash       
kubectl apply ./kubernetes/svc-app.yaml
~~~
