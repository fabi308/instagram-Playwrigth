const { test, expect } = require('@playwright/test');

// Configuração de câmera lenta
test.use({
  launchOptions: {
    slowMo: 3000,
  },
});

test('Deve fazer login no Instagram', async ({ page }) => {
  
  // ==============================
  // 1. Acessar o Instagram
  // ==============================
  console.log('🎬 Abrindo Instagram...');
  
  await page.goto('https://www.instagram.com/');

  // ==============================
  // 2. Seletores
  // ==============================
  const inputUsuario = page.locator('input[name="username"]');
  const inputSenha = page.locator('input[name="password"]');

  // ==============================
  // 3. Preencher Login
  // ==============================
  console.log('✍️ Inserindo usuário e senha...');

  await inputUsuario.fill('fabi.ns6');
  await inputSenha.fill('Mariaraimunda1@');

  // ==============================
  // 4. Clicar no botão Entrar
  // ==============================
  const botaoEntrar = page.getByRole('button', { name: /entrar|log in/i });

  console.log('🔐 Fazendo login...');
  await botaoEntrar.click();

  // ==============================
  // 5. Aguardar carregamento
  // ==============================
  console.log('🔄 Aguardando carregamento da página inicial...');

  await page.waitForLoadState('networkidle');

  // ==============================
  // 6. Fechar popup "Salvar informações"
  // ==============================
  const botaoAgoraNao = page.getByRole('button', { name: /agora não|not now/i });

  if (await botaoAgoraNao.isVisible()) {
    console.log('❌ Fechando popup...');
    await botaoAgoraNao.click();
  }

  // ==============================
  // 7. Screenshot
  // ==============================
  await page.screenshot({
    path: 'instagram_logado.png',
    fullPage: true,
  });

  console.log('📸 Screenshot salvo com sucesso!');

  // ==============================
  // 8. Pausa final
  // ==============================
  console.log('👀 Pausa final...');
  await page.waitForTimeout(5000);
});