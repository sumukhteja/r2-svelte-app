<script lang="ts">
  import { onMount } from 'svelte';

  let questions = [
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

  let answers: { [id: string]: number } = {};
  let submitted = false;
  let timeLeft = 600;
  let timer: any;

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async () => {
    submitted = true;
    clearInterval(timer);

    const submission = {
      id: "submission-" + Date.now(),
      subject: "Polity",
      responses: answers,
      submittedAt: new Date().toISOString()
    };

    const res = await fetch("https://my-dynamo-api.sunny-vanamala4.workers.dev/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submission)
    });

    console.log("Submitted to DB:", await res.text());
  };

  onMount(() => {
    timer = setInterval(() => {
      if (timeLeft > 0) timeLeft--;
      else handleSubmit();
    }, 1000);
  });
</script>

<main class="p-6 max-w-2xl mx-auto">
  <h1 class="text-3xl font-bold mb-4">📝 UPSC Quiz</h1>
  <p class="text-lg text-red-600 mb-4">Time Left: {formatTime(timeLeft)}</p>

  {#each questions as q, i}
    <div class="mb-6 p-4 border rounded shadow bg-white">
      <p class="mb-2 font-medium">{i + 1}. {q.question}</p>
      <img src={q.image} alt="Question image" class="w-full max-h-72 object-contain my-3 rounded" />
      
      {#each q.options as opt, j}
        <div class="mt-1">
          <label>
            <input
              type="radio"
              name={q.id}
              value={j}
              on:change={() => answers[q.id] = j}
              disabled={submitted}
            />
            {opt}
          </label>
        </div>
      {/each}

      {#if submitted}
        <p class="mt-2 text-green-600">
          ✅ Correct Answer: <strong>{q.options[q.correct]}</strong>
        </p>
        <p class="text-blue-700">
          🧠 Your Answer: {q.options[answers[q.id]] || "Not answered"}
        </p>
      {/if}
    </div>
  {/each}

  {#if !submitted}
    <button
      on:click={handleSubmit}
      class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Submit
    </button>
  {/if}
</main>

<style>
  body {
    font-family: sans-serif;
    background-color: #f3f4f6;
  }
</style>
