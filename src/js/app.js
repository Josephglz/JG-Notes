const btnAdd = document.querySelector('.add-note');

const notes = JSON.parse(localStorage.getItem('notes') || '[]');
let Update = false, updateId;

btnAdd.addEventListener('click', () => {
    let title = prompt('Ingrese un titulo:');
    let content = prompt('Ingrese el contenido de la nota:');
    let date = getDate();
    let note = {
        title,
        content,
        date
    };
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
    showNotes();
});

function showNotes() {
    if(!notes) {
        return;
    }
    document.querySelectorAll(".note-container").forEach(note => note.remove());
    notes.forEach(note => {
        let noteContainer = document.createElement('div');
        noteContainer.classList.add('note-container');
        noteContainer.innerHTML = `
        <div class="note-container">
        <div class="note-header">
            <p class="note-title">${note.title}</p>
            <p class="note-date">${note.date}</p>
        </div>
        <div class="note">
            <p class="note text">${note.content}</p>
        </div>
        <div class="note-buttons">
            <button class="edit-note"><i class="fa-solid fa-pen"></i></button>
            <button class="delete-note"><i class="fa-solid fa-trash"></i></button>
        </div>
    </div>
        `;
        document.querySelector('.wrapper').appendChild(noteContainer);
    });
}
/////////////////////////////////////////////////////////
function getDate() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    return `${day}/${month}/${year} - ${hour}:${minute}:${second}`;
}