export default function AppHome() {
  return (
    <div style={{ padding: '1.5rem', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      <h1 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>
        App Doação Arredondar
      </h1>

      <p style={{ marginBottom: '1rem', color: '#444' }}>
        Este é o painel administrativo do app de doações para o Instituto Arredondar.
      </p>

      <section style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Status do app</h2>
        <ul style={{ paddingLeft: '1.2rem' }}>
          <li>App instalado na loja de desenvolvimento ✅</li>
          <li>Extensão de checkout criada ✅</li>
          <li>Banner de doação exibido no checkout ✅ (quando configurado no editor)</li>
          <li>Integração com split (Asaas) – em implementação ⚠️</li>
        </ul>
      </section>

      <section>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Próximos passos</h2>
        <ol style={{ paddingLeft: '1.2rem' }}>
          <li>Garantir que a extensão está adicionada ao layout do checkout.</li>
          <li>Configurar webhook para ler a doação do pedido.</li>
          <li>Chamar a API da Asaas para fazer o split entre loja e Arredondar.</li>
        </ol>
      </section>
    </div>
  );
}
