$(document).ready(function() {
    
    // Ocultar loader após carregamento
    setTimeout(() => {
        $('#loader').fadeOut(300);
    }, 500);

    // ===== FUNÇÕES PARA COPIAR CREDENCIAIS =====
    
    // Inicializar template de credenciais
    function initializeCredentialsTemplate() {
        if (!$('#credentialsTemplate').length) {
            $('body').append(`
                <div id="credentialsTemplate" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 hidden">
                    <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-auto overflow-hidden">
                        <div class="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
                            <div class="flex items-center justify-between">
                                <div>
                                    <h2 class="text-2xl font-bold"> Usuário Criado com Sucesso!</h2>
                                    <p class="text-blue-100 mt-1">Credenciais de acesso</p>
                                </div>
                                <div class="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                    <i class="fas fa-user-shield text-xl"></i>
                                </div>
                            </div>
                        </div>

                        <div class="p-6">
                            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded">
                                <div class="flex">
                                    <div class="flex-shrink-0">
                                        <i class="fas fa-exclamation-triangle text-yellow-400"></i>
                                    </div>
                                    <div class="ml-3">
                                        <p class="text-sm text-yellow-700">
                                            <strong>Copie!</strong> mande para o usuário 
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div class="space-y-4">
                                <div class="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                    <div class="flex items-center justify-between">
                                        <div class="flex-1">
                                            <label class="block text-sm font-medium text-gray-500 mb-1">
                                                <i class="fas fa-envelope mr-2"></i>E-mail
                                            </label>
                                            <input type="text" 
                                                   id="userEmail" 
                                                   readonly 
                                                   class="bg-transparent border-0 p-0 text-gray-800 font-mono text-sm w-full focus:outline-none focus:ring-0">
                                        </div>
                                        <button onclick="copyToClipboard('userEmail', this)" 
                                                class="copy-btn ml-3 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-all duration-300">
                                            <i class="fas fa-copy"></i>
                                        </button>
                                    </div>
                                </div>

                                <div class="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                    <div class="flex items-center justify-between">
                                        <div class="flex-1">
                                            <label class="block text-sm font-medium text-gray-500 mb-1">
                                                <i class="fas fa-lock mr-2"></i>Senha
                                            </label>
                                            <div class="flex items-center">
                                                <input type="password" 
                                                       id="userPassword" 
                                                       readonly 
                                                       class="bg-transparent border-0 p-0 text-gray-800 font-mono text-sm w-full focus:outline-none focus:ring-0">
                                                <button onclick="togglePasswordVisibility()" 
                                                        class="ml-2 text-gray-400 hover:text-gray-600 transition-colors">
                                                    <i class="fas fa-eye" id="passwordIcon"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <button onclick="copyToClipboard('userPassword', this)" 
                                                class="copy-btn ml-3 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-all duration-300">
                                            <i class="fas fa-copy"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <button onclick="copyAllCredentials()" 
                                    class="w-full mt-6 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                                <i class="fas fa-copy mr-2"></i>
                                Copiar Todas as Credenciais
                            </button>

                            <div class="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">

                                <ul class="text-sm text-blue-700 space-y-1">
                                    <li class="flex items-center">
                                
                                        Admin Bruxos Do Aviator 
                                    </li>
                                  
                                </ul>
                            </div>
                        </div>

                        <div class="bg-gray-50 px-6 py-4 border-t border-gray-200">
                            <button onclick="closeCredentialsTemplate()" 
                                    class="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors">
                                Fechar
                            </button>
                        </div>
                    </div>
                </div>
            `);
        }
    }

    // Mostrar template de credenciais
    function showCredentialsTemplate(email, password) {
        initializeCredentialsTemplate();
        
        $('#userEmail').val(email);
        $('#userPassword').val(password);
        
        $('#credentialsTemplate').fadeIn(300);
    }

    // Copiar para área de transferência
    window.copyToClipboard = function(elementId, button) {
        const element = document.getElementById(elementId);
        element.select();
        element.setSelectionRange(0, 99999);
        
        try {
            navigator.clipboard.writeText(element.value).then(() => {
                const $button = $(button);
                const originalHTML = $button.html();
                $button.html('<i class="fas fa-check"></i>');
                $button.addClass('bg-green-500');
                
                setTimeout(() => {
                    $button.html(originalHTML);
                    $button.removeClass('bg-green-500');
                }, 2000);
                
                showToast('Copiado para a área de transferência!', 'success');
            });
        } catch (err) {
            try {
                document.execCommand('copy');
                const $button = $(button);
                const originalHTML = $button.html();
                $button.html('<i class="fas fa-check"></i>');
                $button.addClass('bg-green-500');
                
                setTimeout(() => {
                    $button.html(originalHTML);
                    $button.removeClass('bg-green-500');
                }, 2000);
                
                showToast('Copiado para a área de transferência!', 'success');
            } catch (fallbackErr) {
                showToast('Erro ao copiar. Tente novamente.', 'error');
            }
        }
    }

    // Copiar todas as credenciais
    window.copyAllCredentials = function() {
        const email = $('#userEmail').val();
        const password = $('#userPassword').val();
        const credentials = `
        ->{Acesso robô Bruxos Do Aviator}<-
╭━━•𖧹꧁᭼⸼◍ཻꢀ᮪⸱ᨗᨗᨗ💰⸱ᨗᨗᨗꢀ᮪ཻ◍⸼᭼꧂𖧹•━━╮
•📧 E-mail: ${email}
•🗝️ Senha: ${password}
•📲Site:https://bruxos-do-aviator.netlify.app/
╰━━•𖧹꧁᭼⸼◍ཻꢀ᮪⸱ᨗᨗᨗ💰⸱ᨗᨗᨗꢀ᮪ཻ◍⸼᭼꧂𖧹•━━╯
        `;
        
        try {
            navigator.clipboard.writeText(credentials).then(() => {
                showToast('Todas as credenciais copiadas!', 'success');
                
                const $button = $(event.target);
                const originalText = $button.html();
                $button.html('<i class="fas fa-check mr-2"></i>Copiado!');
                $button.addClass('bg-green-500');
                
                setTimeout(() => {
                    $button.html(originalText);
                    $button.removeClass('bg-green-500');
                }, 2000);
            });
        } catch (err) {
            showToast('Erro ao copiar. Tente novamente.', 'error');
        }
    }

    // Mostrar/ocultar senha
    window.togglePasswordVisibility = function() {
        const $passwordField = $('#userPassword');
        const $icon = $('#passwordIcon');
        
        if ($passwordField.attr('type') === 'password') {
            $passwordField.attr('type', 'text');
            $icon.removeClass('fa-eye').addClass('fa-eye-slash');
        } else {
            $passwordField.attr('type', 'password');
            $icon.removeClass('fa-eye-slash').addClass('fa-eye');
        }
    }

    // Fechar template
    window.closeCredentialsTemplate = function() {
        $('#credentialsTemplate').fadeOut(300);
    }

    // Mostrar toast notification
    function showToast(message, type = 'info') {
        const bgColor = type === 'success' ? 'bg-green-500' : 
                       type === 'error' ? 'bg-red-500' : 'bg-blue-500';
        
        const toast = $(`
            <div class="fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-xl shadow-lg transform transition-all duration-300 translate-x-64 z-50">
                <div class="flex items-center">
                    <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'} mr-3"></i>
                    <span>${message}</span>
                </div>
            </div>
        `);
        
        $('body').append(toast);
        
        setTimeout(() => {
            toast.removeClass('translate-x-64').addClass('translate-x-0');
        }, 10);
        
        setTimeout(() => {
            toast.removeClass('translate-x-0').addClass('translate-x-64');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }

    // Inicializar template ao carregar
    initializeCredentialsTemplate();

    // ===== FUNÇÕES EXISTENTES =====

    // Função para mostrar alertas
    function showAlert(message, type) {
        const alertClass = type === 'success' 
            ? 'bg-green-100 border-green-400 text-green-700' 
            : 'bg-red-100 border-red-400 text-red-700';
        
        const alertHtml = `
            <div class="border-l-4 ${alertClass} p-4 rounded-lg" role="alert">
                <p class="font-semibold">${message}</p>
            </div>
        `;
        
        $('#alertMessage').html(alertHtml);
        
        setTimeout(() => {
            $('#alertMessage').fadeOut(300, function() {
                $(this).html('').show();
            });
        }, 5000);
    }

    // Função para carregar usuários
    function loadUsers() {
        const usersRef = db.ref('users');
        
        usersRef.on('value', (snapshot) => {
            const users = snapshot.val();
            
            if (users) {
                const usersArray = Object.entries(users);
                $('#userCount').text(usersArray.length);
                
                $('#usersList').empty();
                
                usersArray.forEach(([uid, userData]) => {
                    const userItem = `
                        <div class="border-b border-gray-200 py-4 hover:bg-gray-50 transition-colors px-4 rounded-lg">
                            <div class="flex justify-between items-center">
                                <div>
                                    <p class="font-bold text-gray-800 text-lg">${userData.name}</p>
                                    <p class="text-gray-600 text-sm">${userData.email}</p>
                                </div>
                                <div class="text-gray-400 text-sm">
                                    ${new Date(userData.createdAt).toLocaleDateString('pt-BR')}
                                </div>
                            </div>
                        </div>
                    `;
                    $('#usersList').append(userItem);
                });
            } else {
                $('#userCount').text('0');
                $('#usersList').html('<div class="text-center py-10 text-gray-400">Nenhum usuário registrado ainda.</div>');
            }
        });
    }

    // Registrar novo usuário
    $('#registerForm').on('submit', async function(e) {
        e.preventDefault();
        
        const name = $('#name').val().trim();
        const email = $('#email').val().trim();
        const password = $('#password').val();
        
        // Validações
        if (password.length < 6) {
            showAlert('A senha deve ter no mínimo 6 caracteres.', 'error');
            return;
        }
        
        // Mostrar loader
        $('#loader').fadeIn(300);
        
        try {
            // Criar usuário no Firebase Authentication
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;
            
            // Salvar dados adicionais no Realtime Database
            await db.ref('users/' + user.uid).set({
                name: name,
                email: email,
                createdAt: new Date().toISOString()
            });
            
            showAlert('Usuário adicionado com sucesso!', 'success');
            $('#registerForm')[0].reset();
            
            // MOSTRAR TEMPLATE COM CREDENCIAIS
            showCredentialsTemplate(email, password);
            
            // Fazer logout do usuário recém-criado
            await auth.signOut();
            
        } catch (error) {
            console.error('Erro ao adicionar usuário:', error);
            
            let errorMessage = 'Erro ao adicionar usuário. ';
            switch (error.code) {
                case 'auth/email-already-in-use':
                    errorMessage += 'Este email já está em uso.';
                    break;
                case 'auth/invalid-email':
                    errorMessage += 'Email inválido.';
                    break;
                case 'auth/weak-password':
                    errorMessage += 'Senha muito fraca.';
                    break;
                default:
                    errorMessage += error.message;
            }
            
            showAlert(errorMessage, 'error');
        } finally {
            $('#loader').fadeOut(300);
        }
    });

    // Carregar usuários ao iniciar
    loadUsers();
});