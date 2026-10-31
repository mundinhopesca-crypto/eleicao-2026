# SEEKER

Aplicação web pessoal (PWA) para pesquisar páginas, guardar links e reproduzir vídeos compatíveis. Interface responsiva em português, sem login obrigatório.

## O que funciona

- Layout premium e navegação mobile/tablet/desktop
- Player HTML5 com MP4, WebM e HLS quando o navegador aceita e HLS.js está disponível
- Upload de vídeo local e legenda WebVTT, Picture-in-Picture quando suportado, tela cheia, velocidade, avanço e progresso salvo
- Favoritos, histórico e vídeos salvos em localStorage; exportação e importação em JSON
- Página de pesquisa com filtros e classificação básica dos resultados quando há API configurada
- Botões de busca externa funcionando mesmo sem API, com consultas orientadas à reprodução
- Prévia de sites via iframe onde permitido, com botão para abrir em nova aba
- PWA com manifest e cache do shell (necessita HTTPS para instalação)

## Limitações importantes

A interface web NÃO é um navegador Chromium completo. Sites podem bloquear iframes usando CSP/X-Frame-Options. O SEEKER não intercepta tráfego de outras páginas, não extrai vídeo arbitrário e não contorna DRM, autenticação ou CORS. Links HTML comuns não são automaticamente vídeos. O player pode depender de suporte do servidor e dos codecs. O app não hospeda filmes.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra o endereço do Vite. Para build estático: `npm run build`; os arquivos ficam em `dist/`. Para usar GitHub Pages, é possível hospedar os arquivos da raiz diretamente via Pages (sem build), pois o site usa referências relativas.

## Publicar na Vercel (recomendado para busca dentro do app)

1. Importe este repositório no Vercel.
2. Framework preset **Other** (Static), e configure build command vazio e output directory `.` para publicação dos arquivos da raiz; ou adapte o projeto para usar o Vite build.
3. Para ativar `/api/search`, adicione **BRAVE_SEARCH_API_KEY** nas variáveis de ambiente da Vercel. A rota serverless consulta a Brave Search API e retorna dados reais. Sem chave, a aplicação oferece botões para motores externos.
4. Faça o deploy em HTTPS e abra no Chrome Android. Use "Instalar app" ou "Adicionar à tela inicial".

Em hosts puramente estáticos (como GitHub Pages), `/api/search` não executa: o fallback externo funciona normalmente. Nunca exponha a chave no JavaScript do navegador.

## Segurança e privacidade

URLs são validadas para HTTP e HTTPS. Site externo em iframe recebe sandbox; ainda assim, trate sites externos como conteúdo não confiável. As preferências e biblioteca são armazenadas somente no navegador; limpar dados do site pode apagá-las. Se publicar a API de busca, configure limites de uso/rate limiting no provedor ou na hospedagem para controlar custos e abuso. Não use um proxy aberto para fontes de terceiros.

## Próximos passos

- Refinar verificação de disponibilidade de mídia com fontes consentidas
- Melhorar a detecção de falhas de iframe (não há API genérica confiável para isso)
- Testes automatizados e CI
- Ícones PNG extras para compatibilidade máxima de PWA
