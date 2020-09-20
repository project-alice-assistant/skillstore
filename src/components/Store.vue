<template>
  <div id="Store">
    <div class="connectInfo" v-show="showConnectPanel">
      <input v-bind:value="ip" type="text" placeholder="Alice' ip address">
      <input v-bind:value="username" type="text" placeholder="Username">
      <input v-bind:value="pin" type="password" placeholder="Pin code">
      <input type="button" value="Connect" @click="connect">
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
                  <div class="skillDownloads" @click="downloadsLinkClicked(skill.downloads)">
                    <i class="fad fa-cloud-download"></i> {{ skill.downloads }}
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
