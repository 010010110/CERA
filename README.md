# CERA
Repositório do desafio tecnico CERA


clone o repositorio

```bash
    git clone https://github.com/010010110/CERA
```

Abra o diretorio no terminal e instale as dependencias

```bash
    npm install
```

Para rodar utilize 
```bash
    npm start
```

Para rodar em dev utilize 

```bash
    npm run dev
```

## API

Há os seguintes metodos expostos nessa api

- POST - htt://localhost:3333/perfil/entrar
    Responsavel por realizar login, esperar receber via body um JSON com o seguinte contrato
```javascript
    {
    "email": "some.email@gmail.com",
    "senha": "password"
    }
```


- GET - htt://localhost:3333/perfil/:id
    Precisa enviar um Bearer TOKEN (gerado na rota de login) via Headers com a chave 'authorization'

    Reponsavel por trazer informações de um unico usuário passando como parametro o ID na URL

- POST - htt://localhost:3333/perfil/registrar
    Precisa enviar um Bearer TOKEN (gerado na rota de login) via Headers com a chave 'authorization'
    Responsavel por cadastrar usuários no sistema, espera receber via body um JSON com o seguinte contrato:

```javascript
    {
    "email": "mail",
    "senha": "pass",
    "nome": "teste",
    "contato": {
        "whatsapp": "+55 99 9999-9999" 
        }
    }
```
- PATCH - htt://localhost:3333/perfil/senha/alterar/:id
    Precisa enviar um Bearer TOKEN (gerado na rota de login) via Headers com a chave 'authorization'
     Responsavel por editar senha de usuário, espera receber via body um JSON com o seguinte contrato:
```javascript
    {
    "senha": "new password",
    }
```

## Necessario

Sera necessario uma instancia do MongoDB com um cluster para realizar a coneção, após obter esse cluster deve ser inserido no arquivo ./src/database a URL de coneção, Ex: 

```javascript
    mongoose.connect(
  "mongodb+srv://<user>:<password>g@clustercera.12dialj.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);
```

## notas: 

Esse projeto não segui as especificações REST por se tratar de um teste técnico onde é especificado que devo criar os endpoints com a nomeclatura acima.