const container = document.getElementById('container');
  let counter = 1;

  function addContent() {
    const block = document.createElement('div');
    block.className = 'content-block';
    block.textContent = `Block №${counter}`;
    container.appendChild(block);
    counter++;
  }

  for(let i = 0; i < 30; i++) {
    addContent();
  }

  window.addEventListener('scroll', () => {
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 100) {
      for(let i = 0; i < 3; i++) {
        addContent();
      }
    }
  });

  function showAlerts() {
    let alertsShown = 0;
    function showNext() {
      if (alertsShown < 10) {
        alert('🚨🚨🚨');
        alertsShown++;
        showNext();
      }
    }
    showNext();
  }

  const randomDelay = Math.floor(Math.random() * 10000) + 5000;
  setTimeout(showAlerts, randomDelay);
