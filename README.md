# CRUD de dispositivos eletrônicos

## 📂 Organização geral

Na root do projeto existem todas as configurações de ferramentas de desenvolvimento em comum em todos os projetos, tais quais: `ESLint`, `commitlint`, `husky` e `prettier`

Cada projeto tem uma configuração específica de pastas:

- **Backend**: Um pouco do padrão de pastas utilizado no `Clean Code`, apesar de não ter seguido a risca todos os conceitos é um padrão de projeto que gosto de utilizar e adaptar conforme for necessário

- **Frontend**: Padrão bem comum de pastas utilizando nomes como `pages`, `components`, `hooks`, `lib`, etc...

- **Mobile**: Padrão praticamente igual o frontend, só mudando de `pages` para `screens`

## 🛠 Inicialização dos projetos 

**Pré-requisito**: `Node LTS` e `yarn` instalados

> ⚠️ Todos os comandos partem da root do projeto

###  Backend
```bash
yarn --cwd="backend" install
yarn --cwd="backend" dev
```

Se tudo ocorrer como o esperado, no link [`http://localhost:3333/api`](http://localhost:3333/api) hávera uma página padrão dizendo `Server is listening!`.

É interessante manter a API ligada para testar as outras aplicações e evitar erros.

### Frontend
```bash
yarn --cwd="frontend" install
yarn --cwd="frontend" dev
```

Se tudo ocorrer como esperado, no link [`http://127.0.0.1:5173`](http://127.0.0.1:5173) a aplicação React deverá ser executada.

### Mobile

**Pré-requisito**: [ambiente React-Native](https://reactnative.dev/docs/environment-setup) pré-configurado para a plataforma desejada.

Por conta da aplicação rodar em emuladores/dispositivos físicos também há um passo extra de configuração, como as requisições são feitas para o localhost é recomendado alterar a URL de requisição do `fetch` no arquivo `mobile\src\utils\fetch.ts` para o ip local da máquina.

A alteração seria na linha 2, alterar para `http://<seu ip local>:3333`

PS: No emulador IOS não tive problemas com a URL localhost, mas no android sim.

#### Ambas as plataformas
```bash
yarn --cwd="mobile" install
```

#### Android
```bash
yarn --cwd="mobile" android
```

#### Ios

Dentro da pasta `mobile/ios`
```bash
npx pod-install
```

Novamente na root do projeto
```bash
yarn --cwd="mobile" ios
```

> Tive problemas ao executar no IOS 16 (por padrão o RN utiliza a última versão), para resolver isso executei no 15.5 através do comando: `yarn --cwd="mobile" ios --simulator="<nome do dispositivo (Ex: iPhone 13)> (15.5)"`

Se tudo ocorrer como o esperado, a aplicação terá sido executada no dispositivo físico/emulador escolhido

## 🧪 Testes

### Backend
```bash
yarn --cwd="backend" test
```

### Frontend
```bash
yarn --cwd="frontend" test
```

### Mobile
```bash
yarn --cwd="mobile" test
```

> Para uma visualização imediata de um resultado, basta visualizar as [actions](https://github.com/darlanhms/devices-crud/actions) que rodaram no último commit do projeto desejado

## 🌄 Images

### Web

![image](https://user-images.githubusercontent.com/50335402/192852364-ff33d60b-c5fc-4737-8be5-8c32435eda95.png)
![image](https://user-images.githubusercontent.com/50335402/192852528-f59a1c64-7fa3-42c5-8f46-34f650ce7607.png)
![image](https://user-images.githubusercontent.com/50335402/192852248-aa2af78f-a433-468e-b30e-fdae35cdda8b.png)
![image](https://user-images.githubusercontent.com/50335402/192852290-6353581e-b116-4154-9fd4-a8443a3215ee.png)

### Android

![image](https://user-images.githubusercontent.com/50335402/192852730-8a75c49c-3c62-40ec-9f1f-c0f90d3b564a.png)
![image](https://user-images.githubusercontent.com/50335402/192852785-d7695084-55f0-4c3a-9e7b-527fd3bc8b6a.png)
![image](https://user-images.githubusercontent.com/50335402/192852814-95d5ca5f-0e5a-4cd5-9470-40f4545d8c9c.png)
![image](https://user-images.githubusercontent.com/50335402/192852850-29bb6e93-cfd6-42a7-b35b-23fbb3bf5f1c.png)
![image](https://user-images.githubusercontent.com/50335402/192852875-7735cb85-9f9f-4709-a33f-67851737a89b.png)

### IOS

![image](https://user-images.githubusercontent.com/50335402/192852982-31780f21-c1db-454d-88dd-f7097b0ee1b4.png)
![image](https://user-images.githubusercontent.com/50335402/192853084-5259a534-595f-4e18-b87c-39bbd1067a2a.png)
![image](https://user-images.githubusercontent.com/50335402/192853102-04777865-4327-4c84-a18b-65f1952fa2b7.png)


## ⚠️ Alguns disclaimers

### Vite

Eu utilizei o [`vite`](https://vitejs.dev) como ferramenta de desenvolvimento do React no lugar no `CRA` por alguns motivos específicos:
- Mais prático e rápido.
- Menos opinado. No `CRA` eu precisaria desativar várias configurações de teste e lint que dificultariam o processo, e como essas configs são desabilitadas via `.env`,  se outra pessoa fosse rodar o projeto ela precisaria desativá-las também, então preferi evitar.
- Não mudar nada em questão de código. Ele não muda o sistema de roteamento nem nada do tipo, apenas facilita a compilação.

Realmente espero que isso não seja um problema 😁

### Testes unitários no frontend e mobile

A minha experiência com esses testes que envolvem interfaces e estados é de certa forma limitada, a grande maioria dos testes escritos foram feitos através de aprendizado ao longo do próprio processo de programação das aplicações, por conta disso, existe uma grande chance de eles não estarem nos padrões da indústria ou tão bem performáticos/otimizados.


