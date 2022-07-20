const btnAdd = document.querySelector('.add-note');

const notes = JSON.parse(localStorage.getItem('notes') || '[]');
let Update = false, updateId;

btnAdd.addEventListener('click', () => {
    let id = notes.length;
    let title = prompt('Ingrese un titulo:');
    let content = prompt('Ingrese el contenido de la nota:');
    let date = getDate();
    let note = {
        id,
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
    notes.forEach((note, id) => {
        let noteContainer = document.createElement('div');
        noteContainer.classList.add('note-container');
        noteContainer.innerHTML = `
        <div class="note-header">
            <p class="note-title">${note.title}</p>
            <p class="note-date">${note.date}</p>
        </div>
        <div class="note">
            <p class="note-${id}">${note.content}</p>
        </div>
        <div class="note-buttons">
            
            <button class="view-note btn-${id}" onclick="viewNote(${id});" style="display: none;"><i class="fa-solid fa-eye"></i></button>
            <button class="edit-note" onclick="editNote(${id});"><i class="fa-solid fa-pen"></i></button>
            <button class="delete-note" onclick="deleteNote(${id});"><i class="fa-solid fa-trash"></i></button>
        </div>
        `;
        document.querySelector('.wrapper').appendChild(noteContainer);
        let btnTemp = document.querySelector('.btn-' + id);
        if(note.content.length > 100) {
            btnTemp.style.removeProperty('display');
        }

    });
}

function viewNote(id)
{
    let note = document.querySelector('.note-' + id);
    let btnView = document.querySelector('.btn-' + id);

    if(note.classList.contains('expanded'))
    {
        note.classList.remove('expanded');
        btnView.innerHTML = `<i class="fa-solid fa-eye"></i>`;
    }
    else
    {
        note.classList.add('expanded');
        btnView.innerHTML = `<i class="fa-solid fa-eye-slash"></i>`;
    }
}

function editNote(id)
{
    let note = notes.find(note => note.id == id);
    let title = prompt('Ingrese el nuevo titulo:', note.title);
    let content = prompt('Ingrese el nuevo contenido de la nota:', note.content);
    let date = getDate();
    note.title = title;
    note.content = content;
    note.date = date;
    localStorage.setItem('notes', JSON.stringify(notes));
    showNotes();
}

function deleteNote(id)
{
    let confirmDel = confirm("Are you sure you want to delete this note?");
    if(!confirmDel) return;
    notes.splice(id, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
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

window.onload = showNotes();