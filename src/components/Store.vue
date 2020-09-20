<template>
  <div id="Store">
    <div class="connectInfo" v-show="connectPanelHidden">
      <input v-model="ip" type="text" placeholder="Alice' ip address">
      <input v-model="username" type="text" placeholder="Username">
      <input v-model="pin" type="password" placeholder="Pin code">
      <input type="button" value="Connect" @click="connect">
    </div>
    <header>
      <div class="title">
        Project Alice skill store
      </div>
      <div class="description">
        For every task there's a skill and if not, we can make it
      </div>
      <div class="connector" title="Connect to Alice" @click="connectPanelHidden = ! connectPanelHidden">
        <i class="fad fa-plug fa-2x"></i>
      </div>
      <div class="optionsContainer">
        <select id="orderBy" name="orderBy" @change="changeOrder($event.target.value)" v-bind:value="orderBy">
          <option value="name" selected>Order by</option>
          <option value="name">Name</option>
          <option value="author">Author</option>
          <option value="downloads">Downloads</option>
        </select>
        <select id="direction" name="direction" @change="changeSortingDirection($event.target.value)" v-bind:value="sortDirection">
          <option value="asc" selected>A-Z</option>
          <option value="desc">Z-A</option>
        </select>
        <input type="text" name="filterSkill" id="filterSkill" placeholder="Search..." @input="setFilter($event.target.value)" v-bind:value="skillFilter">
      </div>
      <div class="menu">
        <i class="fad fa-bars " v-on:click="menuOpen = !menuOpen" :class="[menuOpen ? 'fad fa-times' : 'fad fa-bars']"></i>
        <transition name="expandMenu" mode="out-in">
          <div class="menuContainer" v-bind:class="{menuContainerOpen: menuOpen}">
            <div class="menuItem">
              <a class="menuLink" href="https://github.com/project-alice-assistant" title="Github">
                <i class="fab fa-github"></i>
              </a>
              <a class="menuLink" href="https://discord.gg/C6HNtzV" title="Discord">
                <i class="fab fa-discord"></i>
              </a>
              <a class="menuLink" href="https://docs.projectalice.io/" title="Documentation">
                <i class="fad fa-book-alt"></i>
              </a>
            </div>
          </div>
        </transition>
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
          <i :class="cookieIcon"></i> We do not use cookies but we can, if you wish so, to make your experience better. <span class="acceptCookies" @click="acceptCookies" title="Accept cookies">Yummi!</span> <i :class="cookieIcon"></i>
        </div>
        <div class="noCookies" @click="refuseCookies" title="Refuse cookies">
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
