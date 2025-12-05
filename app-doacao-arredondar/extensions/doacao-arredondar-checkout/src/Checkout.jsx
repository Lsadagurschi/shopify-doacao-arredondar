import '@shopify/ui-extensions/preact';
import {render} from 'preact';
import {useState} from 'preact/hooks';

// 1. Exporta a extensão
export default function extension() {
  render(<Extension />, document.body);
}

function Extension() {
  // 2. Verifica se esse checkout permite atualizar atributos do carrinho
  if (!shopify.instructions.value.attributes.canUpdateAttributes) {
    return (
      <s-banner heading="Doações indisponíveis" tone="warning">
        Neste tipo de checkout não é possível adicionar doações.
      </s-banner>
    );
  }

  const [donationValue, setDonationValue] = useState('5.00'); // valor inicial
  const [status, setStatus] = useState('idle');
  const [loading, setLoading] = useState(false);

  const attributeKey = 'doacao_arredondar_valor';

  async function handleApplyDonation() {
    setLoading(true);
    setStatus('idle');

    try {
      const result = await shopify.applyAttributeChange({
        type: 'updateAttribute',
        key: attributeKey,
        value: donationValue,
      });

      if (result.type === 'success') {
        setStatus('applied');
      } else {
        console.log('applyAttributeChange result', result);
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  }

  async function handleRemoveDonation() {
    setLoading(true);
    setStatus('idle');

    try {
      const result = await shopify.applyAttributeChange({
        type: 'updateAttribute',
        key: attributeKey,
        value: '',
      });

      if (result.type === 'success') {
        setStatus('idle');
      } else {
        console.log('applyAttributeChange result', result);
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <s-banner heading="Doe para o Instituto Arredondar">
      <s-stack gap="base">
        <s-text>
          Ajude a apoiar mais de 200 ONGs com uma doação única junto à sua compra.
        </s-text>

        <s-stack direction="inline" gap="base">
          <s-text-field
            label="Valor da doação (R$)"
            value={donationValue}
            onInput={(event) => setDonationValue((event.target instanceof HTMLInputElement ? event.target.value : ''))}
          ></s-text-field>
a
          <s-button
            variant="primary"
            onClick={handleApplyDonation}
            loading={loading}
          >
            Incluir doação
          </s-button>

          <s-button
            variant="secondary"
            onClick={handleRemoveDonation}
            disabled={loading}
          >
            Remover
          </s-button>
        </s-stack>

        {status === 'applied' && (
          <s-text tone="success">
            Sua doação de R$ {donationValue} será somada ao valor total da
            compra.
          </s-text>
        )}

        {status === 'error' && (
          <s-text tone="critical">
            Não foi possível aplicar a doação. Tente novamente.
          </s-text>
        )}
      </s-stack>
    </s-banner>
  );
}
