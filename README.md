# Instagram Clone

Este projeto foi feito seguindo aulas na plataforma scrimba feitas por Karl Hadwen, nele  utilizamoss tailwind para estilizar a interface, e os serviços da firebase para autenticar o usuario e armazenar os dados, armazenados em 2 coleções, users e photos. A projeto só foi utilizado localmente até então.

O projeto foi iniciado com [Create React App](https://github.com/facebook/create-react-app).

## Faltando Funcionalidades

As aulas finalizaram com o projeto faltando alguns requisitos funcionais para ser considerado um produto pronto para produção, estes devem ser trabalhados localmente.

- [x] Avatar padrão para novos usuários
- Migração local para firebase storage
-- [x] Avatars 
-- [ ] Posts / Static files
- [ ] Habilidade de criar novos posts
- [x] Habilidade de alterar avatar
- [ ] Habilidade de abrir um post especifíco em um Modal/Popup
- [X] Habilidade de ver listas de followers / followings em um Modal/Popup
- [X] Responsividade da UI



## Bugs

Estes são os bugs que foram encontrados e ainda precisam ser corrigidos

- [x] O botão de follow / unfollow persiste na página após o usuário apertar o botão de sign out. Isso não deve ser possivel porque não temos nenhum usuário logado.
- [x] O perfil do usuário não atualiza a imagem após o upload, só depois de um reload na página que o usuário consegue ver a mudança. Descobrir como fazer a mudança ocorrer sem necessidade de F5.
- [ ] O header não atualiza a imagem do usuário após alteração de avatar.
- [x] Background meio bugado em alguns lugares, descobrir o que está causando isso no CSS
- [ ] Ao criar uma nova conta não existe nada no following[], mas quando o usuário clica para seguir alguem a pagina continua sem posts para exibir.