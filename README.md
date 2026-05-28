# Vitor Rodrigues — Portfólio

Portfólio pessoal desenvolvido com Next.js, TypeScript e TailwindCSS. Apresenta serviços, projetos e formas de contato de maneira moderna e cinematográfica.

## Stack

- **Framework:** Next.js 16 (App Router)
- **Linguagem:** TypeScript
- **Estilização:** TailwindCSS v4
- **Animações:** Framer Motion
- **Deploy:** Vercel

## Estrutura

```
├── app/               # Layout raiz, metadados e estilos globais
├── components/        # Componentes reutilizáveis (Navbar, Cards, Cursor…)
│   └── cards/         # Cards de serviço com animações interativas
├── sections/          # Seções da landing page (Hero, About, Services…)
├── lib/               # Utilitários (cn, formatWhatsAppUrl)
├── types/             # Tipos TypeScript compartilhados
└── public/
    └── images/        # Fotos, logos e vídeos
```

## Funcionalidades

- Intro cinematográfico com animação de texto
- Cursor personalizado com efeito magnético
- Alternância de tema claro/escuro (sem flash no carregamento)
- Carousel de fotos com Ken Burns e progresso automático
- Bento grid de serviços com modais animados
- Scroll suave com indicador de seção ativa na navbar
- SEO completo com Open Graph e Twitter Cards
- Totalmente responsivo (mobile-first)

## Rodando localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## Scripts disponíveis

| Comando         | Descrição                          |
|-----------------|------------------------------------|
| `npm run dev`   | Servidor de desenvolvimento        |
| `npm run build` | Build de produção                  |
| `npm run start` | Inicia o servidor de produção      |
| `npm run lint`  | Executa o linter (next lint)       |

## Deploy

O projeto está configurado para deploy na [Vercel](https://vercel.com). Cada push na branch `main` dispara um novo deploy automaticamente.

## Contato

- **LinkedIn:** [Vitor Rodrigues](https://www.linkedin.com/in/vitor-rodrigues-da-silva/)
- **GitHub:** [@vitorrodrigues-dev](https://github.com/vitorrodrigues-dev)
- **Instagram:** [@devvitor7](https://www.instagram.com/devvitor7/)
