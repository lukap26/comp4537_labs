class Reader {
    constructor() {
        this.noteArea = document.getElementById("rnotes")
        this.timestamp = document.getElementById("timestamp");
        this.key = "writer"
        this.init()

    }

    init() {
        this.load();
        setInterval(() => this.load(), 2000);
    }


    addNote(content = "") {
        const newRow = `
        <tr>
            <td><textarea readonly> </textarea></td>
        </tr>
        
        `;


        this.noteArea.insertAdjacentHTML('beforeend', newRow);

    
        const tr = this.noteArea.lastElementChild;
        const textarea = tr.querySelector("textarea")
      
        
        textarea.value = content;

       
       
    }

    load() {
        this.timestamp.textContent = `retrived at: ${new Date().toLocaleTimeString()}`;
        
        const newnotes = JSON.parse(localStorage.getItem(this.key));
        this.noteArea.innerHTML = "";
        if (!newnotes) return;
        newnotes.forEach(text => {
            this.addNote(text);
        });
    }


}

new Reader();
