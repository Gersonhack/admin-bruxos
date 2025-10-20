$(document).ready(function() {
    
    // Ocultar loader após carregamento
    setTimeout(() => {
        $('#loader').fadeOut(300);
    }, 500);

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

