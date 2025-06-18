<script lang="ts">
  const images = [
    "https://pub-1da654696bda4ecd8cdaf5fdd220de8f.r2.dev/terrapin_108547091.jpg",
    "https://pub-1da654696bda4ecd8cdaf5fdd220de8f.r2.dev/3.jpg",
    "https://pub-1da654696bda4ecd8cdaf5fdd220de8f.r2.dev/31.jpg"
  ];

  const features = [
    {
      title: "Lightning Fast",
      desc: "Blazing fast image delivery powered by Cloudflare R2 CDN.",
    },
    {
      title: "Cost Efficient",
      desc: "No egress fees means you serve content without worrying about bills.",
    },
    {
      title: "Fully Static",
      desc: "Runs without a backend — safe, simple, and scalable.",
    },
  ];
</script>

<main>
  <!-- HERO SECTION -->
  <section class="hero">
    <h1>🧠 QuizImageHost</h1>
    <p>Your static UPSC image hosting powered by Cloudflare R2.</p>
    <button on:click={() => window.scrollTo({ top: 600, behavior: 'smooth' })}>
      View Gallery ↓
    </button>
  </section>

  <!-- FEATURES -->
  <section class="features">
    {#each features as feat}
      <div class="feature-card">
        <h2>{feat.title}</h2>
        <p>{feat.desc}</p>
      </div>
    {/each}
  </section>

  <!-- IMAGE GALLERY -->
  <section class="gallery">
    <h2>📸 Quiz Gallery</h2>
    <div class="image-grid">
      {#each images as url}
        <div class="image-card">
          <img src={url} alt="Quiz image" />
        </div>
      {/each}
    </div>
  </section>

  <!-- FOOTER -->
  <footer>
    <p>© 2025 QuizImageHost. Built with 💙 using Svelte & Cloudflare R2.</p>
  </footer>
</main>

<style>
  main {
    font-family: 'Segoe UI', sans-serif;
    margin: 0;
    padding: 0;
    color: #333;
  }

  .hero {
    padding: 4rem 2rem;
    text-align: center;
    background: linear-gradient(to right, #4facfe, #00f2fe);
    color: white;
  }

  .hero h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  .hero p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }

  .hero button {
    background: white;
    color: #0077ff;
    border: none;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    transition: all 0.3s ease;
  }

  .hero button:hover {
    background: #f0f0f0;
  }

  .features {
    display: flex;
    justify-content: space-around;
    padding: 3rem 1rem;
    background-color: #f9f9f9;
    flex-wrap: wrap;
  }

  .feature-card {
    width: 250px;
    margin: 1rem;
    padding: 1.5rem;
    border-radius: 10px;
    background: white;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    text-align: center;
  }

  .feature-card h2 {
    margin-bottom: 0.5rem;
    color: #0077ff;
  }

  .gallery {
    padding: 3rem 1rem;
    text-align: center;
  }

  .gallery h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  .image-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.5rem;
    padding: 0 2rem;
  }

  .image-card {
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    background: white;
  }

  .image-card img {
    width: 100%;
    height: auto;
    display: block;
  }

  footer {
    background: #f1f1f1;
    text-align: center;
    padding: 1rem;
    margin-top: 3rem;
    font-size: 0.9rem;
  }
</style>
