<template>
  <div id="Store">
    <div class="connectInfo" v-show="showConnectPanel">
      <span class="apiInstructions">For now we use REST api calls to Alice. As your Alice instance is not running on https, it is considered insecure and you need to enable Mixed Content for this website. Follow the steps for you browser: <a href="https://docs.adobe.com/content/help/en/target/using/experiences/vec/troubleshoot-composer/mixed-content.html">How-to</a></span>
      <i class="fad fa-times fa-4x button" @click="showConnectPanel = false" v-show="!connected"></i>
      <span v-show="connected">Connected</span>
      <form @submit="connect" method="post" class="connectForm">
        <input v-model="ip" type="text" placeholder="Alice' ip address" v-show="!connected">
        <input v-model="username" type="text" placeholder="Username" v-show="!connected">
        <input v-model="pin" type="password" placeholder="Pin code" v-show="!connected">
        <input type="submit" value="Connect" v-show="!connecting && !connected && !connectingFailed">
      </form>
      <i class="fad fa-spinner-third fa-spin fa-2x" v-show="connecting"></i>
      <i class="fad fa-link fa-4x" v-show="connected"></i>
      <i class="fad fa-wifi-slash fa-2x" v-show="connectingFailed"></i>
    </div>
    <header>
      <div class="title">
        Project Alice skill store
      </div>
      <div class="description">
        For every task there's a skill and if not, we can make it
      </div>
      <div class="optionsContainer">
        <select id="orderBy" name="orderBy" @change="changeOrder($event.target.value)" v-bind:value="orderBy">
          <option value="name" selected>Order by name</option>
          <option value="author">Order by author</option>
        </select>
        <select id="direction" name="direction" @change="changeSortingDirection($event.target.value)" v-bind:value="sortDirection">
          <option value="asc" selected>A-Z</option>
          <option value="desc">Z-A</option>
        </select>
        <input type="text" name="filterSkill" id="filterSkill" placeholder="Search..." @input="setFilter($event.target.value)" v-bind:value="skillFilter">
      </div>
      <div class="tools">
        <div class="connector" title="Connect to Alice" @click="showConnectPanel = !showConnectPanel">
          <i :class="connectIcon"></i>
        </div>
        <div class=menu>
        <i class="fad fa-bars fa-2x fa-fw" v-on:click="menuOpen = !menuOpen" :class="[menuOpen ? 'fad fa-times fa-2x fa-fw' : 'fad fa-bars fa-2x fa-fw']"></i>
          <div class="menuContainer" v-show="menuOpen">
            <div class="menuItem">
              <a class="menuLink" href="https://github.com/project-alice-assistant" title="Github">
                <i class="fab fa-github fa-2x fa-fw"></i>
              </a>
              <a class="menuLink" href="https://discord.gg/C6HNtzV" title="Discord">
                <i class="fab fa-discord fa-2x fa-fw"></i>
              </a>
              <a class="menuLink" href="https://docs.projectalice.io/" title="Documentation">
                <i class="fad fa-book-alt fa-2x fa-fw"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div class="storeContainer">
      <ul id="storeSkills">
        <li v-for="skill in skills" :key="skill.name">
          <div class="skillIcon">
            <i :class="skill.icon"></i>
          </div>
          <div class="skillInfos">
            <div class="skillInfosInner">
              <div class="cardFront">
                <div class="skillName">{{ skill.name }}</div>
              </div>
              <div class="cardBack">
                <div class="skillDescription">{{ skill.desc }}</div>
                <div class="skillTechInfo">
                  <div class="skillAuthor" @click="authorLinkClicked(skill.author)">
                    <i class="fad fa-at"></i> {{ skill.author }}
                  </div>
                  <div class="skillDownload" @click="downloadLinkClicked(skill.name)" v-show="connected">
                    <i class="fad fa-cloud-download fa-2x" :id="`downloadIcon_${skill.name}`"></i>
                  </div>
                  <div class="skillConnectToDownload" @click="showConnectPanel = !showConnectPanel" v-show="!connected">
                    Connect to download
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <transition name="fade">
      <div class="footer" v-show="showCookiesWarning">
        <div class="cookies">
          <i :class="cookieIcon"></i>
          <span class="textWithMargin">We do not use cookies but we can, if you wish so, to make your experience better. <span class="acceptCookies" @click="acceptCookies" title="Accept cookies">Yummi!</span></span>
          <i :class="cookieIcon"></i>
        </div>
        <div class="tracking">
          <i class="fad fa-user-secret"></i>
          <span class="textWithMargin">Alice doesn't track you or access/keep/share/sell any of your data, with us your privacy is safe.</span>
          <i class="fad fa-user-secret"></i>
        </div>
        <div class="noCookies" @click="refuseCookies" title="Refuse cookies. We'll add one cookie to remember this though!">
          <span class="fa-stack fa-lg">
            <i class="fad fa-wheat fa-stack-1x"></i>
            <i class="fal fa-ban fa-stack-2x"></i>
          </span>
        </div>
      </div>
    </transition>
  </div>
</template>

<style src="./Store.css"></style>
<script src="./Store.js"></script>
