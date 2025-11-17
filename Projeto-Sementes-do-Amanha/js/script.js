// Função para carregar o menu
function carregarMenu() {
    fetch('html/menu.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar o menu');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('menu-container').innerHTML = data;
        })
        .catch(error => {
            console.error('Erro:', error);
            document.getElementById('menu-container').innerHTML = 
                '<p style="color: red;">Erro ao carregar o menu</p>';
        });
}

// Executar quando a página carregar
window.addEventListener('DOMContentLoaded', function() {
    carregarMenu();
    
    // Outras funções podem ser adicionadas aqui
    console.log('Página carregada com sucesso!');
});

// Exemplo de função adicional
function scrollSuave() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const destino = document.querySelector(this.getAttribute('href'));
            if (destino) {
                destino.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Chamar a função de scroll suave após carregar o menu
setTimeout(scrollSuave, 500);


// ==================== Cadastro ====================
function handleSubmit(event) {
    event.preventDefault();
    const form = document.getElementById('VoluntarioForm');
    if(!form) return;

    // Evita duplicidade da gravação
    if(form.dataset.submitting === 'true') return;
    form.dataset.submitting = 'true';

    const nome = form.nome.value.trim();
    const email = form.email.value.trim();

    // Verifica campos obrigatórios
    if (!nome || !email) {
        alert('Por favor, preencha os campos Nome e Email.');
        return;
    }


    // Coleta os valores do formulário
    const formData = {
        nome: form.nome.value.trim(),  
        email: form.email.value.trim(),
        telefone: form.telefone.value.trim(),
        idade: form.idade.value.trim(),
        disponibilidade: form.disponibilidade.value.trim(),
        areaInteresse: form['area-interesse'].value.trim(),
        experiencia: form.experiencia.value.trim(),
        motivacao: form.motivacao.value.trim(),
        dataCadastro: new Date().toLocaleString()
    };

    let voluntarios = JSON.parse(localStorage.getItem('voluntarios')) || [];
    
    voluntarios.push(formData);
    localStorage.setItem('voluntarios', JSON.stringify(voluntarios));
                
    //Mostra mensagem de sucesso
    const successMessage = document.getElementById('successMessage');
    successMessage.classList.add('show');
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Limpa formulário após 2 segundos
    setTimeout(() => form.reset(), 2000);

    // Esconde mensagem após 5 segundos
    setTimeout(() => successMessage.classList.remove('show'), 5000);

    // Permite nova submissão
    form.dataset.submitting = 'false';

    // Atualiza a tabela de voluntários
    exibirVoluntarios();
}

// ==================== Exibir Voluntários ====================
function exibirVoluntarios() {
    const voluntarios = JSON.parse(localStorage.getItem('voluntarios') || '[]');
    const tabelaContainer = document.getElementById('tabelaVoluntarios');

    if (!tabelaContainer) return;

    if (voluntarios.length === 0) {
        tabelaContainer.innerHTML = '<p>Nenhum voluntário cadastrado ainda.</p>';
        return;
    }

    let html = '<table border="1" cellpadding="5" cellspacing="0">';
    html += '<tr><th>Nome</th><th>Email</th><th>Telefone</th><th>Idade</th><th>Disponibilidade</th><th>Área de Interesse</th><th>Data Cadastro</th></tr>';

    voluntarios.forEach(v => {
        html += `<tr>
            <td>${v.nome}</td>
            <td>${v.email}</td>
            <td>${v.telefone}</td>
            <td>${v.idade}</td>
            <td>${v.disponibilidade}</td>
            <td>${v.areaInteresse}</td>
            <td>${v.dataCadastro}</td>
        </tr>`;
    });

    html += '</table>';
    tabelaContainer.innerHTML = html;
}

// ==================== Animação ao Scroll ====================
window.addEventListener('scroll', () => {
    const cards = document.querySelectorAll('.card, .project-card');
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (cardTop < windowHeight - 100) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
});

// Inicializa animações e mostra voluntários ao carregar
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card, .project-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Mostra voluntários já cadastrados
    exibirVoluntarios();
});

// ==================== Máscara de Telefone ====================

///telefoneInput.addEventListener('input', function(e) {
 //let value = e.target.value.replace(/\D/g, '');
//Limpa qualquer caractere que não seja número.
//Limita a 11 dígitos.
//Formata como (XX) XXXXX-XXXX conforme o usuário digita.

const telefoneInput = document.getElementById('telefone');
if (telefoneInput) {
    telefoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');//Limpa qualquer caractere que não seja número.
//Limita a 11 dígitos.
        if (value.length > 11) value = value.slice(0, 11);

        if (value.length > 6) {
            value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
        } else if (value.length > 2) {
            value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        } else if (value.length > 0) {
            value = `(${value}`;
        }

        e.target.value = value;
    });
}

// ==================== Limpa a tabela ====================
function limparTabela(){
    const tabelaContainer = document.getElementById('tabelaVoluntarios');

    if(tabelaContainer){
        tabelaContainer.innerHTML = '<p>Nenhum voluntário cadastrado.</p>';
    }

    //se vc quiser apagar o localStorage tbm 
    localStorage.removeItem('voluntarios');    
}

//mostrando a função para usar no html
//windows = janela
// Disponibiliza para ser chamado no HTML via onclick="limparTabela()".
window.limparTabela = limparTabela;