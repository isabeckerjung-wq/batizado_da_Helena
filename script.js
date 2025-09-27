document.addEventListener('DOMContentLoaded', function() {
  const esquerda = document.querySelector('.porta.esquerda');
  const direita  = document.querySelector('.porta.direita');
  const container = document.getElementById('porta');
  const conteudo  = document.getElementById('conteudo');
  const audio     = document.getElementById('openAudio');

  const AUDIO_PLAY_TIME_MS = null;

  function abrirPorta() {
    esquerda.classList.add('aberta');
    direita.classList.add('aberta');

    if (audio && audio.src) {
      try {
        audio.currentTime = 0;
        audio.loop = false;
        audio.play().catch(err => {
          console.log('Não foi possível tocar o áudio automaticamente:', err);
        });
      } catch (e) {
        console.warn('Erro ao tocar áudio:', e);
      }
    }

    setTimeout(() => {
      container.style.display = 'none';
      document.body.classList.add('unlocked');
      conteudo.style.opacity = '1';
    }, 1500);
  }

  const clickHandler = (e) => {
    abrirPorta();
    container.removeEventListener('click', clickHandler);
  };

  container.addEventListener('click', clickHandler);

  const form = document.getElementById('rsvpForm');
  const resposta = document.getElementById('respostaMensagem');
  if (form) {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const nome = form.nome.value.trim();
      const presenca = form.presenca.options[form.presenca.selectedIndex].text;
      resposta.textContent = `Obrigado${nome ? ', ' + nome : ''}! Registramos sua escolha: ${presenca}.`;
      form.reset();
    });
  }
});
