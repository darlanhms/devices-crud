# CRUD de dispositivos eletrônicos

## 📂 Organização geral

Na root do projeto existem todas as configurações de ferramentas de desenvolvimento em comum em todos os projetos, tais quais: `ESLint`, `commitlint`, `husky` e `prettier`

Cada projeto tem uma configuração específica de pastas:

- **Backend**: Um pouco do padrão de pastas utilizado no `Clean Code`, apesar de não ter seguido a risca todos os conceitos é um padrão de projeto que gosto de utilizar e adaptar conforme for necessário

- **Frontend**: Padrão bem comum de pastas utilizando nomes como `pages`, `components`, `hooks`, `lib`, etc...

## 🛠 Inicialização dos projetos 

**Pré-requisitos**: `Node LTS` e `yarn` instalados e [ambiente React-Native](https://reactnative.dev/docs/environment-setup) pré-configurado.

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

## 🧪 Testes

### Backend
```bash
yarn --cwd="backend" test
```

### Frontend
```bash
yarn --cwd="frontend" test
```

> Para uma visualização imediata de um resultado, basta visualizar as [actions](https://github.com/darlanhms/devices-crud/actions) que rodaram no último commit do projeto desejado

## ⚠️ Alguns disclaimers

### Vite

Eu utilizei o [`vite`](https://vitejs.dev) como ferramenta de desenvolvimento do React no lugar no `CRA` por alguns motivos específicos:
- Mais prático e rápido.
- Menos opinado. No `CRA` eu precisaria desativar várias configurações de teste e lint que dificultariam o processo, e como essas configs são desabilitadas via `.env`,  se outra pessoa fosse rodar o projeto ela precisaria desativá-las também, então preferi evitar.
- Não mudar nada em questão de código. Ele não muda o sistema de roteamento nem nada do tipo, apenas facilita a compilação.

Realmente espero que isso não seja um problema 😁

### Testes unitários no frontend e mobile

A minha experiência com esses testes que envolvem interfaces e estados é de certa forma limitada, a grande maioria dos testes escritos foram feitos através de aprendizado ao longo do próprio processo de programação das aplicações, por conta disso, existe uma grande chance de eles não estarem nos padrões da indústria ou tão bem performáticos/otimizados.


