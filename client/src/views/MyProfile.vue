<template>
  <main id="myprofile">
    <header>
      <div class="profileLogo">
        <p class="logoPlaceholder"><span>LOGO</span></p>
      </div>
      <div class="profilePhoto">
        <img src="@/assets/profilephoto.png" alt="Profile Picture" />
      </div>
      <section class="profileHeader">
        <h2>JOHN DOE</h2>
        <h3>REALLY AWESOME WEB DESIGNER</h3>
        <hr />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in.
        </p>
      </section>
      <!-- Links to Social network accounts -->
      <aside class="socialNetworkNavBar">
        <div class="socialNetworkNav">
          <!-- Add a Anchor tag with nested img tag here -->
          <img src="@/assets/social.png" alt="sample" />
        </div>
        <div class="socialNetworkNav">
          <!-- Add a Anchor tag with nested img tag here -->
          <img src="@/assets/social.png" alt="sample" />
        </div>
        <div class="socialNetworkNav">
          <!-- Add a Anchor tag with nested img tag here -->
          <img src="@/assets/social.png" alt="sample" />
        </div>
        <div class="socialNetworkNav">
          <!-- Add a Anchor tag with nested img tag here -->
          <img src="@/assets/social.png" alt="sample" />
        </div>
      </aside>
    </header>
  </main>
</template>

<style lang="scss">
#myprofile {
  margin: 0 auto;
  width: 92%;
  max-width: 960px;
  padding: 1em;

  header {
    text-align: center;
    display: grid;
    grid-template-columns: 260px 1fr;
    grid-template-rows: 70px 1fr 80px;
    grid-gap: 1em;

    grid-template-areas:
      'logo   logo'
      'photo  info'
      'photo  media';

    .profileLogo {
      grid-area: logo;

      .logoPlaceholder {
        background-color: rgba(208, 207, 207, 1);
        width: 187px;
        text-align: center;

        span {
          width: 80px;
          height: 22px;
          color: rgba(255, 255, 255, 1);
          font-size: 30px;
          font-weight: 700;
          line-height: 53px;
        }
      }
    }

    .profilePhoto {
      grid-area: photo;
      background-color: rgba(237, 237, 237, 1);
      width: 259px;
      border-radius: 50%;
      height: 259px;
    }

    .profileHeader {
      text-align: left;
      grid-area: info;

      h2 {
        color: rgba(146, 146, 146, 1);
        font-size: 30px;
        font-weight: 700;
        line-height: 24px;
        margin-bottom: 0.5em;
      }

      h3 {
        font-family: sans-serif;
        color: rgba(146, 146, 146, 1);
        font-size: 16px;
        font-weight: 700;
        line-height: 24px;
      }

      hr {
        background-color: rgba(208, 207, 207, 1);
        height: 1px;
        margin-bottom: 1em;
      }

      p {
        font-family: sans-serif;
        color: rgba(146, 146, 146, 1);
        font-size: 14px;
        font-weight: 400;
        line-height: 1.8;
        overflow-y: auto;
      }
    }
    .socialNetworkNavBar {
      grid-area: media;
      text-align: left;

      .socialNetworkNav {
        border-radius: 50%;
        cursor: pointer;
        display: inline;
        padding: 1em;

        img:hover {
          opacity: 0.5;
        }
      }
    }
  }
}
</style>
