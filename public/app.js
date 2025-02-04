function confirmEdit(){
    return confirm("Are you sure you want to edit this chat?");
}

function confirmDelete(){
    return confirm("Are you sure you want to delete this chat?");
}

document.querySelectorAll('.chat-card').forEach(chat => {
    chat.addEventListener('mouseenter', () => {
        chat.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
    });

    chat.addEventListener('mouseleave', () => {
        chat.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    });
});
