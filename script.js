const form = document.querySelector("#tableForm");
const input = document.querySelector("#cardInput");
const output = document.querySelector("#tableOutput");

let number;
let question = 1;
let correct = 0;
let incorrect = 0;

form.addEventListener("submit", (event) => {
    event.preventDefault();

    number = Number(input.value);
    if (!Number.isFinite(number)) return;

    question = 1;
    correct = 0;
    incorrect = 0;
    form.hidden = true;

    showQuestion();
});

function showQuestion(message = "") {
    if (question > 10) {
        output.innerHTML = `
            <h6>Oefening klaar!</h6>
            <p>Goed: ${correct} · Fout: ${incorrect}</p>
            <button id="restart" class="btn btn-secondary">Opnieuw</button>
        `;

        document.querySelector("#restart").addEventListener("click", () => {
            output.replaceChildren();
            form.hidden = false;
            input.value = "";
        });
        return;
    }

    const multiplier = Math.floor(Math.random() * 10) + 1;

    output.innerHTML = `
        ${message}
        <form id="answerForm">
            <div class="mb-3">
                <label for="answer" class="form-label">
                    Vraag ${question} van 10: <strong>${number} × ${multiplier} = ?</strong>
                </label>
                <input type="number" class="form-control mb-2" id="answer" placeholder="Nummer" required>
                <button type="submit" class="btn btn-primary">
                    Controleer
                </button>
            </div>
        </form>
    `;
    
    document.querySelector("#answerForm").addEventListener("submit", (event) => {
        event.preventDefault();

        const isCorrect =
            Number(document.querySelector("#answer").value) === number * multiplier;

        if (isCorrect) correct++;
        else incorrect++;

        question++;

        showQuestion(`
            <p class="alert ${isCorrect ? "alert-success" : "alert-danger"} py-2">
                ${isCorrect ? "Goed gedaan!" : `Helaas, het juiste antwoord is ${number * multiplier}.`}
            </p>
        `);
    });
}