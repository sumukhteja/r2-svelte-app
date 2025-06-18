<script lang="ts">
  let timer = 300; // 5 minutes
  let interval: number;

  const questions = [
    {
      id: "Q1",
      question: "What is the capital of India?",
      options: ["Mumbai", "New Delhi", "Chennai", "Kolkata"],
      correct: 1
    },
    {
      id: "Q2",
      question: "Which Article deals with Right to Equality?",
      options: ["Article 14", "Article 19", "Article 21", "Article 370"],
      correct: 0
    },
    // 👇 Add more questions (up to 10)
  ];

  let selected: Record<string, number> = {};
  let submitted = false;
  let showResults = false;

  function startTimer() {
    interval = setInterval(() => {
      if (timer > 0) timer--;
      else {
        clearInterval(interval);
        handleSubmit();
      }
    }, 1000);
  }

  function handleSubmit() {
    clearInterval(interval);
    submitted = true;
    showResults = true;

    // 📤 Send to backend
    fetch("https://my-dynamo-api.sunny-vanamala4.workers.dev/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: "attempt-" + Date.now(),
        filename: "user-quiz-attempt",
        subject: "General",
        responses: selected
      })
    });
  }

  startTimer();
</script>

<main>
  <h1>🧠 UPSC Quiz</h1>
  <p>Time Left: {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, "0")}</p>

  {#each questions as q, i}
    <div class="question-block">
      <h3>{i + 1}. {q.question}</h3>
      <ul>
        {#each q.options as opt, j}
          <li>
            <label>
              <input
                type="radio"
                name={q.id}
                value={j}
                bind:group={selected[q.id]}
                disabled={submitted}
              />
              {opt}
            </label>
            {#if submitted && showResults}
              {#if j === q.correct}
                <span>✔️</span>
              {:else if j === selected[q.id]}
                <span>❌</span>
              {/if}
            {/if}
          </li>
        {/each}
      </ul>
    </div>
  {/each}

  {#if !submitted}
    <button on:click={handleSubmit}>Submit</button>
  {:else}
    <p><strong>Results submitted!</strong></p>
  {/if}
</main>

<style>
  main {
    padding: 2rem;
    font-family: sans-serif;
    max-width: 800px;
    margin: auto;
  }
  .question-block {
    margin-bottom: 1.5rem;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    margin-bottom: 0.5rem;
  }
  button {
    margin-top: 2rem;
    padding: 0.75rem 2rem;
    font-size: 1rem;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 6px;
    cursor: pointer;
  }
</style>
