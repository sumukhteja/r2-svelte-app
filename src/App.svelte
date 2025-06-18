<script lang="ts">
  import { onMount } from 'svelte';

  let questions = [
    {
      id: "Q001",
      question: "Which Article of the Indian Constitution deals with the Right to Equality?",
      image: "https://your-cdn.com/article14.jpg",
      options: ["Article 14", "Article 19", "Article 21", "Article 32"],
      correct: 0,
      explanation: "Article 14 ensures equality before the law and equal protection of laws in India."
    },
    {
      id: "Q002",
      question: "Who was the first President of India?",
      options: ["Rajendra Prasad", "Jawaharlal Nehru", "S. Radhakrishnan", "V.V. Giri"],
      correct: 0,
      explanation: "Dr. Rajendra Prasad was the first President of independent India."
    }
  ];

  let answers: { [key: string]: number } = {};
  let submitted = false;
  let timeLeft = 600;
  let timer: any;

  onMount(() => {
    timer = setInterval(() => {
      if (timeLeft > 0) timeLeft--;
      else submitTest();
    }, 1000);
  });

  function formatTime(seconds: number) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' + s : s}`;
  }

  function submitTest() {
    clearInterval(timer);
    submitted = true;
  }
</script>

<main class="p-6 max-w-4xl mx-auto">
  <header class="flex justify-between items-center mb-6">
    <h1 class="text-2xl font-bold">UPSC Master Mock Test</h1>
    <div class="text-xl font-mono">⏱ {formatTime(timeLeft)}</div>
  </header>

  {#each questions as q, index}
    <div class="mb-8 border p-4 rounded shadow">
      <div class="mb-2 font-semibold">Q{index + 1}: {q.question}</div>
      {#if q.image}
        <img src={q.image} alt="question image" class="mb-2 max-w-sm" />
      {/if}
      <div class="space-y-2">
        {#each q.options as opt, i}
          <label class="block">
            <input
              type="radio"
              name={q.id}
              value={i}
              on:change={() => answers[q.id] = i}
              disabled={submitted}
              checked={answers[q.id] === i}
            />
            <span class="ml-2">{opt}</span>
          </label>
        {/each}
      </div>

      {#if submitted}
        <div class="mt-2">
          {#if answers[q.id] === q.correct}
            <span class="text-green-600">✅ Correct</span>
          {:else if answers[q.id] != null}
            <span class="text-red-600">❌ Wrong</span>
          {:else}
            <span class="text-yellow-600">⚠️ Not Attempted</span>
          {/if}
          <div class="mt-1 text-sm">Explanation: {q.explanation}</div>
        </div>
      {/if}
    </div>
  {/each}

  {#if !submitted}
    <button
      class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
      on:click={submitTest}>
      Submit Test
    </button>
  {:else}
    <div class="text-lg font-bold mt-6">
      You scored {Object.keys(answers).filter(id => answers[id] === questions.find(q => q.id === id)?.correct).length}/{questions.length}
    </div>
  {/if}
</main>

<style>
  body {
    font-family: system-ui, sans-serif;
    background-color: #f7f7f7;
  }
</style>