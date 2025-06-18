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

<main class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6 font-sans">
  <div class="max-w-3xl mx-auto">
    <div class="text-center mb-6">
      <h1 class="text-4xl font-extrabold text-blue-700 mb-2">📝 UPSC Quiz Challenge</h1>
      <p class="text-lg text-gray-600">Test your knowledge with visuals and a timer</p>
      <div class="mt-2 text-red-600 font-bold text-xl">⏳ {formatTime(timeLeft)}</div>
    </div>

    {#each questions as q, i}
      <div class="mb-6 bg-white rounded-xl shadow-lg p-5 border-l-4 border-blue-500">
        <p class="text-lg font-semibold text-gray-800 mb-2">{i + 1}. {q.question}</p>
        <img src={q.image} alt="Question image" class="w-full max-h-72 object-contain rounded-lg mb-4" />
        <div class="grid gap-2">
          {#each q.options as opt, j}
            <label class="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-md cursor-pointer hover:bg-blue-100 transition">
              <input
                type="radio"
                name={q.id}
                value={j}
                on:change={() => answers[q.id] = j}
                disabled={submitted}
                class="accent-blue-600"
              />
              <span class="text-gray-700">{opt}</span>
            </label>
          {/each}
        </div>

        {#if submitted}
          <div class="mt-3 text-sm text-green-700">
            ✅ Correct: <strong>{q.options[q.correct]}</strong>
          </div>
          <div class="text-sm text-blue-700">
            🧠 You picked: {q.options[answers[q.id]] || "No answer"}
          </div>
        {/if}
      </div>
    {/each}

    {#if !submitted}
      <div class="text-center">
        <button
          on:click={handleSubmit}
          class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow transition-all"
        >
          🚀 Submit Quiz
        </button>
      </div>
    {/if}
  </div>
</main>

<style>
  body {
    margin: 0;
    font-family: 'Inter', sans-serif;
    background-color: #f0f4f8;
  }
</style>