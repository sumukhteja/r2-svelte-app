<script lang="ts">
  import { onMount } from 'svelte';

  let questions = [];
  let answers: { [key: number]: number } = {};
  let submitted = false;
  let timeLeft = 600;
  let timer: any;

  const fetchQuestions = () => {
    questions = [
      {
        id: "Q001",
        question: "Which Article of the Indian Constitution deals with Right to Equality?",
        image: "https://pub-1da654696bda4ecd8cdaf5fdd220de8f.r2.dev/31.jpg",
        options: ["Article 14", "Article 19", "Article 21", "Article 32"],
        correct: 0
      },
      {
        id: "Q002",
        question: "Who was the first President of India?",
        image: "https://pub-1da654696bda4ecd8cdaf5fdd220de8f.r2.dev/3.jpg",
        options: ["Dr. Rajendra Prasad", "S. Radhakrishnan", "Zakir Husain", "APJ Abdul Kalam"],
        correct: 0
      }
    ];
  };

  const handleSubmit = async () => {
    submitted = true;

    const response = {
      id: "response-" + Date.now(),
      subject: "Polity",
      filename: "quiz-response.json",
      userAnswers: answers,
      submittedAt: new Date().toISOString()
    };

    await fetch("https://my-dynamo-api.sunny-vanamala4.workers.dev/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(response)
    });
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  onMount(() => {
    fetchQuestions();
    timer = setInterval(() => {
      if (timeLeft > 0) timeLeft--;
      else {
        clearInterval(timer);
        handleSubmit();
      }
    }, 1000);
  });
</script>

<main class="p-6 max-w-2xl mx-auto font-sans">
  <h1 class="text-2xl font-bold mb-4">📝 UPSC Mock Quiz</h1>
  <p class="mb-4 text-red-600 font-semibold">Time Left: {formatTime(timeLeft)}</p>

  {#if questions.length === 0}
    <p>Loading questions...</p>
  {:else}
    {#each questions as q, i}
      <div class="mb-6 p-4 border rounded-lg shadow">
        <p class="font-medium">{i + 1}. {q.question}</p>
        <img src={q.image} alt="Question image" class="w-full max-h-72 object-contain my-3 rounded border" />
        {#each q.options as opt, j}
          <div class="mt-1">
            <label>
              <input
                type="radio"
                bind:group={answers[i]}
                value={j}
                disabled={submitted}
              />
              {opt}
            </label>
          </div>
        {/each}
        {#if submitted}
          <p class="mt-2 text-sm text-green-700">
            Correct answer: <strong>{q.options[q.correct]}</strong>
          </p>
        {/if}
      </div>
    {/each}

    {#if !submitted}
      <button
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        on:click={handleSubmit}
      >
        Submit
      </button>
    {/if}
  {/if}
</main>

<style>
  body {
    font-family: sans-serif;
    background-color: #f9f9f9;
  }
</style>
