
# Sistema de Pedidos 📝  
  
Projeto exemplo de um sistema para gestão de pedidos de uma lanchonete utilizando os conceitos de Arquitetura Limpa (Clean Architecture)
  
## 1) Rodar localmente no Docker for Windows

Para executar a aplicação é necesssário ter o Docker instalado localmente com o Kubernetes ativado

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

### a) Iniciar o cluster do Minikube para Windows

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

~~~bash
kubectl port-forward service/svc-app 3333:80
~~~

### d) Verificar o estado da aplicação
Executar o comando abaixo no prompt e obter o retorno 'Ok' indicando que a aplicação está em execução

~~~bash
curl http://localhost:3333/health
~~~

## 3) Utilizaçãp da aplicação

Para utilizar a aplicação precisa-se seguir a sequência de chamadas de APIs abaixo.

### a) Cadastro de Categorias

Utilizar a API abaixo para cadastro de categorias.

POST http://localhost:3333/api/v1/categories

Content-Type: application/json

Body Request:
~~~json
{
    "name": "<CATEGORY NAME>",
    "description": "<CATEGORY DESCRIPTION>"
}
~~~

Response Status Code: 201

Body Response:
~~~json
{
    "id": <CATEGORY ID>,
    "name": "<CATEGORY NAME>",
    "description": "<CATEGORY DESCRIPTION>"
}
~~~


### b) Cadastro de Produtos

Utilizar a API abaixo para cadastro de produtos.

POST http://localhost:3333/api/v1/products

Content-Type: application/json

Body Request:
~~~json
{
    "name": "<PRODUCT NAME>",
    "code": "<PRODUCT CODE>",
    "categoryId": <CATEGORY ID>,
    "image": "<PRODUCT IMAGE>",
    "price": <PRODUCT PRICE>,
    "description": "<PRODUCT DESCRIPTION>"
}
~~~

Response Status Code: 201

Body Response:
~~~json
{
    "name": "<PRODUCT NAME>",
    "code": "<PRODUCT CODE>",    
    "image": "<PRODUCT IMAGE>",
    "price": <PRODUCT PRICE>,
    "description": "<PRODUCT DESCRIPTION>"
    "category": {
        "id": <CATEGORY ID>,
        "name": "<CATEGORY NAME>",
        "description": "<CATEGORY DESCRIPTION>"
    }
}
~~~

### c) Cadastro de Clientes

Opcionalmente um cliente pode ser cadastado, neste caso, utilizar a API abaixo para cadastro de clientes.

POST http://localhost:3333/api/v1/customers

Content-Type: application/json

Body Request:
~~~json
{
    "name": "<CUSTOMER NAME>",
    "email": "<CUSTOMER EMAIL>",
    "phone": "<CUSTOMER MOBILE>",
    "cpf": "<CUSTOMER CPF>"
}
~~~

Response Status Code: 201

Body Response:
~~~json
{
    "id": <CUSTOMER ID>,
    "name": "<CUSTOMER NAME>",
    "email": "<CUSTOMER EMAIL>",
    "phone": "<CUSTOMER MOBILE>",
    "cpf": "<CUSTOMER CPF>"
}
~~~

### d) Inclusão de pedidos

Utilizar a API abaixo para inclusão de pedidos.
O atributo customer é opcional.

POST http://localhost:3333/api/v1/orders

Content-Type: application/json

Body Request:
~~~json
{
    "customer": {
        "cpf": "<CUSTOMER CPF>"
    },
    "orderItems": [
        {
            "product": {
                "code": "<PRODUCT CODE>"
            },
            "quantity": <REQUESTED QUANTITY>,
            "unitPrice": <SOLD PRICE>
        }
    ]
}
~~~

Response Status Code: 201

Body Response:
~~~json
{
    "id": <ORDER ID>,
    "status": "<ORDER STATUS>",
    "amount": <ORDER AMOUNT>
}
~~~

### e) Inclusão de pagamento para um pedido

Utilizar a API abaixo para inclusão de pagamento para um pedido.

Utilizar a data no formato: "yyyy-MM-ddThh:mm:ss"


POST http://localhost:3333/api/v1/payments

Content-Type: application/json

Body Request:
~~~json
{
    "orderId": <ORDER ID>,
    "amount": <AMOUNT PAID>,
    "paymentDate": "<PAYMENT DATE>",
    "paymentUniqueNumber": "<PAYMENT UNIQUE NUMBER>"
}
~~~

Response Status Code: 201

Body Response:
~~~json
{
    "id": <PAYMENT ID>,
    "orderId": <ORDER ID>,
    "amount": <AMOUNT PAID>,
    "paymentDate": "<PAYMENT DATE>",
    "paymentUniqueNumber": "<PAYMENT UNIQUE NUMBER>"
}
~~~