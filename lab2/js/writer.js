class Writer {
    constructor() {
        this.noteArea = document.getElementById("wnotes");
        this.btn = document.getElementById("addBtnw");
        this.timestamp = document.getElementById("timestamp");
        this.key = "writer"
        this.init()

    }

    init() {
        this.load();

        this.btn.addEventListener('click', () => this.addNote());

        setInterval(() => this.save(), 2000);
    }


    addNote(content = "") {
        const newRow = `
        <tr>
            <td><textarea> </textarea></td>
            <td><button class="remove"> remove </button></td>
        </tr>
        
        `;


        this.noteArea.insertAdjacentHTML('beforeend', newRow);

    
        const tr = this.noteArea.lastElementChild;
        const textarea = tr.querySelector("textarea")
        const removeBtn = tr.querySelector('.remove');
        
        textarea.value = content;

       
        removeBtn.addEventListener('click', () => { tr.remove(); this.save(); });
    }

    load() {
        const notes = JSON.parse(localStorage.getItem(this.key));
        if (!notes) return;
        notes.forEach(text => {
            this.addNote(text);
        });
    }

    save() {
        this.timestamp.textContent = `saved at: ${new Date().toLocaleTimeString()}`;

        const textareas = this.noteArea.querySelectorAll('textarea');
        const notes = Array.from(textareas).map(ta => ta.value);

        localStorage.setItem(this.key, JSON.stringify(notes))


    }




}

new Writer();
