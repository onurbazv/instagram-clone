# Instagram Clone

Este projeto foi feito seguindo aulas na plataforma scrimba feitas por Karl Hadwen, nele  utilizamoss tailwind para estilizar a interface, e os serviços da firebase para autenticar o usuario e armazenar os dados, armazenados em 2 coleções, users e photos. A projeto só foi utilizado localmente até então.

O projeto foi iniciado com [Create React App](https://github.com/facebook/create-react-app).

## Faltando Funcionalidades

As aulas finalizaram com o projeto faltando alguns requisitos funcionais para ser considerado um produto pronto para produção, estes devem ser trabalhados localmente.

- [ ] Avatar padrão para novos usuários
- [ ] Habilidade de criar novos posts
- [ ] Habilidade de alterar avatar
- [ ] Habilidade de abrir um post especifíco em um Modal/Popup
- [ ] Habilidade de ver listas de followers / followings em um Modal/Popup

Após estas funcionalidades serem implementadas, para que o projeto seja considerado realmente em modo de produção só faltará migrar os arquivos estaticos (imagens) para o serviço storage do firebase.

## Bugs

Estes são os bugs que foram encontrados e ainda precisam ser corrigidos

- [ ] O botão de follow / unfollow persiste na página após o usuário apertar o botão de sign out. Isso não deve ser possivel porque não temos nenhum usuário logado.