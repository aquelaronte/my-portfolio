<template>
  <header>
    <a href="https://github.com/aquelaronte" target="_blank">
      <img src="./assets/github.png" alt="" />
    </a>
    <a style="font-weight: 500; font-size: 0.8rem" href="#title-box">Home</a>
    <a style="font-weight: 500; font-size: 0.8rem" href="#title-box"
      >Projects</a
    >
  </header>
  <main>
    <div id="title-box">
      <p style="font-size: 1.8rem; letter-spacing: 1.1px; line-height: 2.5rem">
        <span style="font-size: 3rem; font-weight: 900" class="amazing-color"
          >Hello World!</span
        ><br />I'm Brahian Arias Roldán from Colombia 🇨🇴<br />Full Stack web and
        mobile developer
      </p>
      <img
        id="avatar"
        src="https://avatars.githubusercontent.com/u/122481669?s=400&u=8a8fc92f36a4579ee6b3ab0b40671666d8783a9d&v=4"
        alt="github avatar"
      />
    </div>
    <div id="projects-box">
      <p style="font-size: 2.2rem; font-weight: 900; margin-bottom: 40px">
        Current projects
      </p>
      <div class="project-box">
        <img
          src="./assets/dream-academy.png"
          alt=""
          class="project-presentation"
        />
        <div>
          <h2 style="margin-bottom: 20px">Dream Academy</h2>
          <p style="margin-bottom: 120px">
            It's a page that allows to users for create courses, upload pdf and
            image files and subscribe to any course, is inspired on udemy and
            khan academy <br /><br />(See source code and deployment of dream
            academy in my github repo)
          </p>
          <p>Technologies used: NuxtJS, Supabase, PostGreSQL</p>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
header {
  padding: 15px 60px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.336);
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
}

a {
  color: white;
  text-decoration: none;
  transition: color, 0.3s;
}

a:hover {
  color: #e99a9a;
}

main {
  padding: 30px 13%;
}

.amazing-color {
  background: -webkit-linear-gradient(
    200deg,
    var(--primary-text-custom-color) 25%,
    var(--secondary-text-custom-color)
  );
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0px 0px 110px var(--secondary-text-custom-color),
    40px 0 110px var(--primary-text-custom-color);
}

#title-box {
  display: flex;
  flex-direction: row;
  gap: 35px;
  justify-content: center;
  align-items: center;
  margin-top: 90px;
}

#avatar {
  border-radius: 100%;
  height: 35%;
  width: 35%;
  border: 2px solid white;
}

#projects-box {
  margin-top: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.project-presentation {
  width: 480px;
  border-radius: 15px;
}

.project-box {
  display: flex;
  flex-direction: row;
  gap: 15px;
  border: 1px solid white;
  padding: 25px;
  border-radius: 10px;
}

@media screen and (max-width: 780px) {
  main {
    padding: 30px 80px;
  }

  #avatar {
    height: 70%;
    width: 70%;
  }

  #title-box {
    flex-direction: column;
  }
}
</style>
